// === API Helper ===
const API = {
  async get(path) {
    const res = await fetch(`/api/${path}`);
    return res.json();
  },
  async post(path, data) {
    const res = await fetch(`/api/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

// === State ===
const state = {
  currentTopic: null,
  currentLesson: 0,
  progress: {},
};

async function loadProgress() {
  try {
    const data = await API.get('progress');
    state.progress = {};
    for (const [key, val] of Object.entries(data)) {
      state.progress[key] = val.completed;
    }
  } catch {
    // Fallback to localStorage if server is down
    state.progress = JSON.parse(localStorage.getItem('ml-math-progress') || '{}');
  }
}

function isLessonComplete(topicId, lessonId) {
  return state.progress[`${topicId}/${lessonId}`] === true;
}

async function markLessonComplete(topicId, lessonId) {
  state.progress[`${topicId}/${lessonId}`] = true;
  try {
    await API.post('progress', { topic_id: topicId, lesson_id: lessonId, completed: true });
  } catch {
    // Fallback: save to localStorage
    localStorage.setItem('ml-math-progress', JSON.stringify(state.progress));
  }
}

async function saveQuizResult(topicId, lessonId, score, total) {
  try {
    await API.post('quiz', { topic_id: topicId, lesson_id: lessonId, score, total });
  } catch { /* ignore */ }
}

async function saveNote(topicId, lessonId, content) {
  try {
    await API.post('notes', { topic_id: topicId, lesson_id: lessonId, content });
  } catch { /* ignore */ }
}

async function loadNote(topicId, lessonId) {
  try {
    const data = await API.get(`notes?topic_id=${topicId}&lesson_id=${lessonId}`);
    return data.content || '';
  } catch { return ''; }
}

function getTopicProgress(topicId) {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) return 0;
  const done = topic.lessons.filter(l => isLessonComplete(topicId, l.id)).length;
  return done / topic.lessons.length;
}

function getGlobalProgress() {
  let total = 0, done = 0;
  TOPICS.forEach(t => {
    t.lessons.forEach(l => {
      total++;
      if (isLessonComplete(t.id, l.id)) done++;
    });
  });
  return total ? done / total : 0;
}

// === Render ===
function renderSidebar() {
  const nav = document.getElementById('nav-list');
  nav.innerHTML = '';
  TOPICS.forEach(topic => {
    const li = document.createElement('li');
    const progress = getTopicProgress(topic.id);
    const isActive = state.currentTopic?.id === topic.id;
    li.innerHTML = `
      <div class="nav-item ${isActive ? 'active' : ''} ${progress === 1 ? 'completed' : ''}" data-topic="${topic.id}">
        <span class="nav-icon">${topic.icon}</span>
        <span>${topic.title}</span>
        ${progress === 1 ? '<span class="nav-check">&#10003;</span>' : progress > 0 ? `<span class="nav-check" style="color:var(--text-dim)">${Math.round(progress * 100)}%</span>` : ''}
      </div>
    `;
    li.querySelector('.nav-item').addEventListener('click', () => openTopic(topic.id));
    nav.appendChild(li);
  });
  updateGlobalProgress();
}

function updateGlobalProgress() {
  const p = getGlobalProgress();
  document.getElementById('global-progress').style.width = `${p * 100}%`;
  document.getElementById('global-progress-text').textContent = `${Math.round(p * 100)}% complete`;
}

function renderLanding() {
  const grid = document.getElementById('topic-grid');
  grid.innerHTML = '';
  TOPICS.forEach(topic => {
    const progress = getTopicProgress(topic.id);
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.dataset.topic = topic.id;
    card.innerHTML = `
      <span class="card-icon">${topic.icon}</span>
      <h3>${topic.title}</h3>
      <p>${topic.description}</p>
      <div class="card-meta">
        <span class="card-lessons">${topic.lessons.length} lessons</span>
        ${progress > 0 ? `<span style="color:${progress === 1 ? 'var(--green)' : 'var(--accent-light)'}">${Math.round(progress * 100)}%</span>` : '<span>Start &rarr;</span>'}
      </div>
    `;
    card.addEventListener('click', () => openTopic(topic.id));
    grid.appendChild(card);
  });
}

function openTopic(topicId) {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) return;
  state.currentTopic = topic;
  state.currentLesson = 0;
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('quiz-view').classList.add('hidden');
  document.getElementById('topic-view').classList.remove('hidden');
  renderLessonNav();
  renderLesson();
  renderSidebar();
  window.scrollTo(0, 0);
  closeMobileMenu();
}

function showLanding() {
  state.currentTopic = null;
  document.getElementById('landing').classList.remove('hidden');
  document.getElementById('topic-view').classList.add('hidden');
  document.getElementById('quiz-view').classList.add('hidden');
  renderLanding();
  renderSidebar();
  window.scrollTo(0, 0);
}

function renderLessonNav() {
  const nav = document.getElementById('lessons-nav');
  const topic = state.currentTopic;
  nav.innerHTML = '';
  topic.lessons.forEach((lesson, i) => {
    const pill = document.createElement('span');
    pill.className = `lesson-pill ${i === state.currentLesson ? 'active' : ''} ${isLessonComplete(topic.id, lesson.id) ? 'completed' : ''}`;
    pill.textContent = lesson.title;
    pill.addEventListener('click', () => {
      state.currentLesson = i;
      renderLessonNav();
      renderLesson();
      window.scrollTo(0, 0);
    });
    nav.appendChild(pill);
  });

  // Topic progress
  const done = topic.lessons.filter(l => isLessonComplete(topic.id, l.id)).length;
  document.getElementById('topic-progress-label').textContent = `${done}/${topic.lessons.length} lessons`;
  document.getElementById('topic-progress-bar').style.width = `${(done / topic.lessons.length) * 100}%`;
}

function renderLesson() {
  const topic = state.currentTopic;
  const lesson = topic.lessons[state.currentLesson];
  const content = document.getElementById('lesson-content');

  content.innerHTML = lesson.content;

  // Interactive demo
  if (lesson.interactive) {
    const container = document.createElement('div');
    container.className = 'interactive-container';
    container.id = 'interactive-demo';
    content.appendChild(container);
    requestAnimationFrame(() => renderInteractive(lesson.interactive, container));
  }

  // Notes section
  const notesDiv = document.createElement('div');
  notesDiv.className = 'concept-box';
  notesDiv.style.marginTop = '2rem';
  notesDiv.innerHTML = `
    <div class="box-label" style="color:var(--accent-light)">Your Notes</div>
    <textarea id="lesson-notes" placeholder="Write your notes here... they are saved to the database automatically."
      style="width:100%; min-height:80px; background:var(--bg); color:var(--text); border:1px solid var(--border);
      border-radius:6px; padding:0.6rem; font-family:var(--font); font-size:0.85rem; resize:vertical; margin-top:0.4rem;"></textarea>
    <div id="notes-status" style="font-size:0.7rem; color:var(--text-dim); margin-top:0.3rem;"></div>
  `;
  content.appendChild(notesDiv);

  // Load existing notes
  loadNote(topic.id, lesson.id).then(text => {
    const ta = document.getElementById('lesson-notes');
    if (ta) ta.value = text;
  });

  // Auto-save notes on typing (debounced)
  let noteTimer;
  const notesArea = notesDiv.querySelector('textarea');
  notesArea.addEventListener('input', () => {
    clearTimeout(noteTimer);
    document.getElementById('notes-status').textContent = 'typing...';
    noteTimer = setTimeout(() => {
      saveNote(topic.id, lesson.id, notesArea.value);
      document.getElementById('notes-status').textContent = 'saved';
    }, 800);
  });

  // Quiz button
  if (lesson.quiz) {
    const quizBtn = document.createElement('button');
    quizBtn.className = 'btn primary';
    quizBtn.style.marginTop = '1.5rem';
    quizBtn.textContent = 'Take Quiz';
    quizBtn.addEventListener('click', () => openQuiz());
    content.appendChild(quizBtn);
  }

  // Footer buttons
  document.getElementById('prev-lesson-btn').disabled = state.currentLesson === 0;
  document.getElementById('next-lesson-btn').disabled = state.currentLesson === topic.lessons.length - 1;

  const markBtn = document.getElementById('mark-complete-btn');
  if (isLessonComplete(topic.id, lesson.id)) {
    markBtn.textContent = 'Completed';
    markBtn.classList.add('completed-btn');
  } else {
    markBtn.textContent = 'Mark as Complete';
    markBtn.classList.remove('completed-btn');
  }

  // Typeset math
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([content]).catch(console.error);
  }
}

// === Quiz ===
function openQuiz() {
  const topic = state.currentTopic;
  const lesson = topic.lessons[state.currentLesson];
  if (!lesson.quiz) return;

  document.getElementById('topic-view').classList.add('hidden');
  document.getElementById('quiz-view').classList.remove('hidden');
  document.getElementById('quiz-title').textContent = `Quiz: ${lesson.title}`;
  document.getElementById('quiz-results').classList.add('hidden');

  const container = document.getElementById('quiz-content');
  container.innerHTML = '';

  lesson.quiz.forEach((q, qi) => {
    const div = document.createElement('div');
    div.className = 'quiz-question';
    div.innerHTML = `<h4>${qi + 1}. ${q.q}</h4>`;
    q.options.forEach((opt, oi) => {
      const label = document.createElement('label');
      label.className = 'quiz-option';
      label.innerHTML = `<input type="radio" name="quiz-${qi}" value="${oi}"> <span>${opt}</span>`;
      div.appendChild(label);
    });
    container.appendChild(div);
  });

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn primary quiz-submit-btn';
  submitBtn.textContent = 'Submit Answers';
  submitBtn.addEventListener('click', () => gradeQuiz(lesson.quiz));
  container.appendChild(submitBtn);

  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([container]).catch(console.error);
  }
  window.scrollTo(0, 0);
}

function gradeQuiz(quiz) {
  let correct = 0;
  quiz.forEach((q, qi) => {
    const selected = document.querySelector(`input[name="quiz-${qi}"]:checked`);
    const options = document.querySelectorAll(`input[name="quiz-${qi}"]`);
    options.forEach(opt => {
      const label = opt.closest('.quiz-option');
      if (parseInt(opt.value) === q.answer) {
        label.classList.add('correct');
      }
      if (opt.checked && parseInt(opt.value) !== q.answer) {
        label.classList.add('incorrect');
      }
      opt.disabled = true;
    });
    if (selected && parseInt(selected.value) === q.answer) correct++;
  });

  document.querySelector('.quiz-submit-btn').style.display = 'none';
  const results = document.getElementById('quiz-results');
  results.classList.remove('hidden');
  document.getElementById('quiz-score').textContent = `${correct}/${quiz.length} correct (${Math.round(correct / quiz.length * 100)}%)`;

  const topic = state.currentTopic;
  const lesson = topic.lessons[state.currentLesson];
  saveQuizResult(topic.id, lesson.id, correct, quiz.length);

  if (correct === quiz.length) {
    markLessonComplete(topic.id, lesson.id).then(() => {
      renderSidebar();
      renderLessonNav();
    });
  }
}

// === Interactive Visualizations ===
function renderInteractive(type, container) {
  const interactives = {
    vectorPlot,
    matMul,
    eigenTransform,
    derivativePlot,
    gradientField,
    distributionPlot,
    bayesViz,
    biasVariance,
    gradientDescent2D,
  };
  if (interactives[type]) interactives[type](container);
}

function createCanvas(container, w, h) {
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { canvas, ctx, w, h };
}

function drawAxes(ctx, w, h, ox, oy, scaleX, scaleY) {
  ctx.strokeStyle = '#2d3148';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, oy); ctx.lineTo(w, oy);
  ctx.moveTo(ox, 0); ctx.lineTo(ox, h);
  ctx.stroke();

  ctx.fillStyle = '#555';
  ctx.font = '10px sans-serif';
  for (let i = -10; i <= 10; i++) {
    if (i === 0) continue;
    const x = ox + i * scaleX;
    if (x > 0 && x < w) {
      ctx.beginPath(); ctx.moveTo(x, oy - 3); ctx.lineTo(x, oy + 3); ctx.stroke();
      ctx.fillText(i, x - 3, oy + 14);
    }
    const y = oy - i * scaleY;
    if (y > 0 && y < h) {
      ctx.beginPath(); ctx.moveTo(ox - 3, y); ctx.lineTo(ox + 3, y); ctx.stroke();
      ctx.fillText(i, ox + 6, y + 4);
    }
  }
}

function vectorPlot(container) {
  container.innerHTML = '<div class="controls"><label>x: <input type="range" id="vx" min="-5" max="5" value="3" step="0.5"><span id="vx-val">3</span></label><label>y: <input type="range" id="vy" min="-5" max="5" value="2" step="0.5"><span id="vy-val">2</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 300);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function draw() {
    const vx = parseFloat(document.getElementById('vx').value);
    const vy = parseFloat(document.getElementById('vy').value);
    document.getElementById('vx-val').textContent = vx;
    document.getElementById('vy-val').textContent = vy;

    const ox = w / 2, oy = h / 2, s = 35;
    ctx.clearRect(0, 0, w, h);
    drawAxes(ctx, w, h, ox, oy, s, s);

    // Draw vector
    const px = ox + vx * s, py = oy - vy * s;
    ctx.strokeStyle = '#6c5ce7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Arrowhead
    const angle = Math.atan2(oy - py, px - ox);
    ctx.fillStyle = '#6c5ce7';
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px - 10 * Math.cos(angle - 0.3), py + 10 * Math.sin(angle - 0.3));
    ctx.lineTo(px - 10 * Math.cos(angle + 0.3), py + 10 * Math.sin(angle + 0.3));
    ctx.fill();

    // Dot at vector tip
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();

    const norm = Math.sqrt(vx * vx + vy * vy).toFixed(2);
    caption.textContent = `Vector [${vx}, ${vy}], L2 norm = ${norm}`;
  }

  document.getElementById('vx').addEventListener('input', draw);
  document.getElementById('vy').addEventListener('input', draw);
  draw();
}

function matMul(container) {
  container.innerHTML = '<div class="caption">2x2 Matrix Multiplication: A * B = C</div>';
  const table = document.createElement('div');
  table.style.cssText = 'display:flex; gap:1rem; align-items:center; justify-content:center; flex-wrap:wrap; font-family:var(--mono); font-size:0.85rem; padding:0.5rem;';

  function makeMatrix(label, ids, editable = true) {
    const div = document.createElement('div');
    div.style.textAlign = 'center';
    div.innerHTML = `<div style="color:var(--text-dim); margin-bottom:0.3rem; font-size:0.75rem">${label}</div>`;
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:4px;';
    ids.forEach(id => {
      const inp = document.createElement('input');
      inp.type = 'number';
      inp.id = id;
      inp.value = Math.floor(Math.random() * 5) + 1;
      inp.style.cssText = 'width:50px; padding:0.3rem; text-align:center; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:4px; font-family:var(--mono);';
      if (!editable) { inp.readOnly = true; inp.style.borderColor = 'var(--accent)'; inp.style.color = 'var(--accent-light)'; }
      if (editable) inp.addEventListener('input', compute);
      grid.appendChild(inp);
    });
    div.appendChild(grid);
    return div;
  }

  table.appendChild(makeMatrix('A', ['a11','a12','a21','a22']));
  const times = document.createElement('span');
  times.textContent = '×';
  times.style.cssText = 'font-size:1.2rem; color:var(--text-dim);';
  table.appendChild(times);
  table.appendChild(makeMatrix('B', ['b11','b12','b21','b22']));
  const eq = document.createElement('span');
  eq.textContent = '=';
  eq.style.cssText = 'font-size:1.2rem; color:var(--text-dim);';
  table.appendChild(eq);
  table.appendChild(makeMatrix('C', ['c11','c12','c21','c22'], false));
  container.appendChild(table);

  function compute() {
    const v = id => parseFloat(document.getElementById(id).value) || 0;
    document.getElementById('c11').value = v('a11')*v('b11') + v('a12')*v('b21');
    document.getElementById('c12').value = v('a11')*v('b12') + v('a12')*v('b22');
    document.getElementById('c21').value = v('a21')*v('b11') + v('a22')*v('b21');
    document.getElementById('c22').value = v('a21')*v('b12') + v('a22')*v('b22');
  }
  compute();
}

function eigenTransform(container) {
  container.innerHTML = '<div class="controls"><label>a₁₁: <input type="range" id="e11" min="-3" max="3" value="2" step="0.5"><span id="e11v">2</span></label><label>a₁₂: <input type="range" id="e12" min="-3" max="3" value="1" step="0.5"><span id="e12v">1</span></label><label>a₂₁: <input type="range" id="e21" min="-3" max="3" value="0" step="0.5"><span id="e21v">0</span></label><label>a₂₂: <input type="range" id="e22" min="-3" max="3" value="1" step="0.5"><span id="e22v">1</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 300);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function draw() {
    const a = parseFloat(document.getElementById('e11').value);
    const b = parseFloat(document.getElementById('e12').value);
    const c = parseFloat(document.getElementById('e21').value);
    const d = parseFloat(document.getElementById('e22').value);
    ['e11','e12','e21','e22'].forEach(id => document.getElementById(id+'v').textContent = document.getElementById(id).value);

    const ox = w / 2, oy = h / 2, s = 40;
    ctx.clearRect(0, 0, w, h);
    drawAxes(ctx, w, h, ox, oy, s, s);

    // Draw unit circle transformed
    ctx.strokeStyle = 'rgba(108,92,231,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let t = 0; t <= Math.PI * 2; t += 0.02) {
      const x = Math.cos(t), y = Math.sin(t);
      const tx = a * x + b * y, ty = c * x + d * y;
      const px = ox + tx * s, py = oy - ty * s;
      t === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();

    // Unit circle
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.arc(ox, oy, s, 0, Math.PI * 2);
    ctx.stroke();

    // Compute eigenvalues of 2x2
    const tr = a + d;
    const det = a * d - b * c;
    const disc = tr * tr - 4 * det;

    if (disc >= 0) {
      const l1 = (tr + Math.sqrt(disc)) / 2;
      const l2 = (tr - Math.sqrt(disc)) / 2;

      // Draw eigenvectors
      [[l1, '#00b894'], [l2, '#fdcb6e']].forEach(([lam, color]) => {
        let vx, vy;
        if (Math.abs(b) > 0.01) { vx = b; vy = lam - a; }
        else if (Math.abs(c) > 0.01) { vx = lam - d; vy = c; }
        else { vx = 1; vy = 0; }
        const len = Math.sqrt(vx * vx + vy * vy);
        if (len > 0.01) { vx /= len; vy /= len; }

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ox - vx * s * 3, oy + vy * s * 3);
        ctx.lineTo(ox + vx * s * 3, oy - vy * s * 3);
        ctx.stroke();
      });

      caption.textContent = `Eigenvalues: λ₁ = ${l1.toFixed(2)} (green), λ₂ = ${l2.toFixed(2)} (yellow) | det = ${det.toFixed(2)}`;
    } else {
      const re = tr / 2;
      const im = Math.sqrt(-disc) / 2;
      caption.textContent = `Complex eigenvalues: ${re.toFixed(2)} ± ${im.toFixed(2)}i (rotation) | det = ${det.toFixed(2)}`;
    }
  }

  ['e11','e12','e21','e22'].forEach(id => document.getElementById(id).addEventListener('input', draw));
  draw();
}

function derivativePlot(container) {
  container.innerHTML = '<div class="controls"><label>Function: <select id="dfn"><option value="x2">x²</option><option value="x3">x³</option><option value="sin">sin(x)</option><option value="sigmoid">sigmoid(x)</option></select></label><label>x = <input type="range" id="dx" min="-4" max="4" value="1" step="0.1"><span id="dxv">1</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 280);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  const fns = {
    x2: { f: x => x*x, df: x => 2*x, label: 'f(x)=x², f\'(x)=2x' },
    x3: { f: x => x*x*x, df: x => 3*x*x, label: 'f(x)=x³, f\'(x)=3x²' },
    sin: { f: Math.sin, df: Math.cos, label: 'f(x)=sin(x), f\'(x)=cos(x)' },
    sigmoid: { f: x => 1/(1+Math.exp(-x)), df: x => { const s = 1/(1+Math.exp(-x)); return s*(1-s); }, label: 'f(x)=σ(x), f\'(x)=σ(x)(1-σ(x))' },
  };

  function draw() {
    const fn = fns[document.getElementById('dfn').value];
    const xv = parseFloat(document.getElementById('dx').value);
    document.getElementById('dxv').textContent = xv.toFixed(1);

    const ox = w / 2, oy = h / 2, sx = 40, sy = 40;
    ctx.clearRect(0, 0, w, h);
    drawAxes(ctx, w, h, ox, oy, sx, sy);

    // Plot function
    ctx.strokeStyle = '#6c5ce7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px < w; px++) {
      const x = (px - ox) / sx;
      const y = fn.f(x);
      const py = oy - y * sy;
      px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Tangent line at x
    const yv = fn.f(xv);
    const slope = fn.df(xv);
    const tpx = ox + xv * sx, tpy = oy - yv * sy;

    ctx.strokeStyle = '#00b894';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tpx - 60, tpy + slope * 60);
    ctx.lineTo(tpx + 60, tpy - slope * 60);
    ctx.stroke();

    // Point
    ctx.fillStyle = '#e17055';
    ctx.beginPath();
    ctx.arc(tpx, tpy, 5, 0, Math.PI * 2);
    ctx.fill();

    caption.textContent = `${fn.label} | At x=${xv.toFixed(1)}: f(x)=${yv.toFixed(3)}, f'(x)=${slope.toFixed(3)}`;
  }

  document.getElementById('dfn').addEventListener('change', draw);
  document.getElementById('dx').addEventListener('input', draw);
  draw();
}

function gradientField(container) {
  container.innerHTML = '<div class="caption">Gradient field of f(x,y) = x² + y² — arrows point uphill, gradient descent goes opposite</div>';
  const { ctx, w, h } = createCanvas(container, 400, 300);

  const ox = w / 2, oy = h / 2, s = 30;
  drawAxes(ctx, w, h, ox, oy, s, s);

  for (let gx = -6; gx <= 6; gx++) {
    for (let gy = -4; gy <= 4; gy++) {
      const dx = 2 * gx, dy = 2 * gy;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 0.01) continue;
      const nx = dx / len * 12, ny = dy / len * 12;
      const px = ox + gx * s, py = oy - gy * s;
      const intensity = Math.min(len / 10, 1);

      ctx.strokeStyle = `rgba(108,92,231,${0.3 + intensity * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + nx, py + ny);
      ctx.stroke();

      // tiny arrowhead
      const a = Math.atan2(ny, nx);
      ctx.beginPath();
      ctx.moveTo(px + nx, py + ny);
      ctx.lineTo(px + nx - 4 * Math.cos(a - 0.5), py + ny - 4 * Math.sin(a - 0.5));
      ctx.moveTo(px + nx, py + ny);
      ctx.lineTo(px + nx - 4 * Math.cos(a + 0.5), py + ny - 4 * Math.sin(a + 0.5));
      ctx.stroke();
    }
  }

  // Contours
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  [1, 2, 3, 4, 5].forEach(r => {
    ctx.beginPath();
    ctx.arc(ox, oy, r * s, 0, Math.PI * 2);
    ctx.stroke();
  });
}

function distributionPlot(container) {
  container.innerHTML = '<div class="controls"><label>μ: <input type="range" id="dmu" min="-3" max="3" value="0" step="0.5"><span id="dmuv">0</span></label><label>σ: <input type="range" id="dsig" min="0.3" max="3" value="1" step="0.1"><span id="dsigv">1</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 250);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function gauss(x, mu, sig) {
    return (1 / (sig * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sig) ** 2);
  }

  function draw() {
    const mu = parseFloat(document.getElementById('dmu').value);
    const sig = parseFloat(document.getElementById('dsig').value);
    document.getElementById('dmuv').textContent = mu;
    document.getElementById('dsigv').textContent = sig;

    ctx.clearRect(0, 0, w, h);

    const padL = 30, padB = 30, pw = w - padL - 10, ph = h - padB - 10;

    // axes
    ctx.strokeStyle = '#2d3148';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, h - padB);
    ctx.lineTo(padL + pw, h - padB);
    ctx.moveTo(padL, h - padB);
    ctx.lineTo(padL, 10);
    ctx.stroke();

    // x labels
    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    for (let x = -4; x <= 4; x++) {
      const px = padL + (x + 5) / 10 * pw;
      ctx.fillText(x, px - 3, h - padB + 14);
    }

    // Standard normal (reference)
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let px = 0; px < pw; px++) {
      const x = (px / pw) * 10 - 5;
      const y = gauss(x, 0, 1);
      const py = h - padB - y * ph * 2.2;
      px === 0 ? ctx.moveTo(padL + px, py) : ctx.lineTo(padL + px, py);
    }
    ctx.stroke();

    // Filled distribution
    ctx.fillStyle = 'rgba(108,92,231,0.2)';
    ctx.beginPath();
    ctx.moveTo(padL, h - padB);
    for (let px = 0; px < pw; px++) {
      const x = (px / pw) * 10 - 5;
      const y = gauss(x, mu, sig);
      ctx.lineTo(padL + px, h - padB - y * ph * 2.2);
    }
    ctx.lineTo(padL + pw, h - padB);
    ctx.fill();

    // Distribution line
    ctx.strokeStyle = '#6c5ce7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px < pw; px++) {
      const x = (px / pw) * 10 - 5;
      const y = gauss(x, mu, sig);
      const py = h - padB - y * ph * 2.2;
      px === 0 ? ctx.moveTo(padL + px, py) : ctx.lineTo(padL + px, py);
    }
    ctx.stroke();

    // Mean line
    const meanPx = padL + (mu + 5) / 10 * pw;
    ctx.strokeStyle = '#e17055';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(meanPx, h - padB);
    ctx.lineTo(meanPx, 10);
    ctx.stroke();
    ctx.setLineDash([]);

    caption.textContent = `Normal Distribution N(${mu}, ${sig}²) — red dashed = mean, gray = N(0,1) reference`;
  }

  document.getElementById('dmu').addEventListener('input', draw);
  document.getElementById('dsig').addEventListener('input', draw);
  draw();
}

function bayesViz(container) {
  container.innerHTML = '<div class="controls"><label>Base rate (%): <input type="range" id="brate" min="0.1" max="20" value="1" step="0.1"><span id="bratev">1</span></label><label>Sensitivity (%): <input type="range" id="bsens" min="50" max="100" value="99" step="1"><span id="bsensv">99</span></label><label>Specificity (%): <input type="range" id="bspec" min="50" max="100" value="95" step="1"><span id="bspecv">95</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 200);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function draw() {
    const br = parseFloat(document.getElementById('brate').value) / 100;
    const sens = parseFloat(document.getElementById('bsens').value) / 100;
    const spec = parseFloat(document.getElementById('bspec').value) / 100;
    document.getElementById('bratev').textContent = (br * 100).toFixed(1);
    document.getElementById('bsensv').textContent = (sens * 100).toFixed(0);
    document.getElementById('bspecv').textContent = (spec * 100).toFixed(0);

    const pPos = sens * br + (1 - spec) * (1 - br);
    const posterior = (sens * br) / pPos;

    ctx.clearRect(0, 0, w, h);
    const barY = 40, barH = 50;

    // Prior bar
    ctx.fillStyle = '#e17055';
    ctx.fillRect(20, barY, br * (w - 40), barH);
    ctx.fillStyle = '#2d3148';
    ctx.fillRect(20 + br * (w - 40), barY, (1 - br) * (w - 40), barH);
    ctx.fillStyle = '#fff';
    ctx.font = '11px sans-serif';
    ctx.fillText(`Prior: ${(br*100).toFixed(1)}% have disease`, 20, barY - 8);

    // Posterior bar
    const barY2 = barY + barH + 35;
    ctx.fillStyle = '#00b894';
    ctx.fillRect(20, barY2, posterior * (w - 40), barH);
    ctx.fillStyle = '#2d3148';
    ctx.fillRect(20 + posterior * (w - 40), barY2, (1 - posterior) * (w - 40), barH);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Posterior: ${(posterior*100).toFixed(1)}% actually have disease given positive test`, 20, barY2 - 8);

    caption.textContent = `P(Disease | Positive Test) = ${(posterior * 100).toFixed(1)}% — Even with a good test, low base rates mean most positives are false!`;
  }

  ['brate', 'bsens', 'bspec'].forEach(id => document.getElementById(id).addEventListener('input', draw));
  draw();
}

function biasVariance(container) {
  container.innerHTML = '<div class="controls"><label>Model complexity: <input type="range" id="bvcomp" min="1" max="15" value="3"><span id="bvcompv">3</span></label></div>';
  const { ctx, w, h } = createCanvas(container, 400, 250);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  function draw() {
    const comp = parseInt(document.getElementById('bvcomp').value);
    document.getElementById('bvcompv').textContent = comp;

    ctx.clearRect(0, 0, w, h);
    const padL = 40, padB = 30, pw = w - padL - 20, ph = h - padB - 20;

    // Axes
    ctx.strokeStyle = '#2d3148';
    ctx.beginPath();
    ctx.moveTo(padL, h - padB);
    ctx.lineTo(padL + pw, h - padB);
    ctx.moveTo(padL, h - padB);
    ctx.lineTo(padL, 15);
    ctx.stroke();

    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    ctx.fillText('Model Complexity →', padL + pw / 2 - 40, h - 5);
    ctx.save();
    ctx.translate(12, h / 2 + 15);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Error →', 0, 0);
    ctx.restore();

    // Curves
    const points = 100;
    const bias2 = [], variance = [], total = [];
    for (let i = 0; i < points; i++) {
      const x = (i / points);
      const b = 0.8 * Math.exp(-3 * x) + 0.05;
      const v = 0.05 + 0.7 * (1 - Math.exp(-2.5 * x));
      bias2.push(b);
      variance.push(v);
      total.push(b + v + 0.05);
    }

    function plotLine(data, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((y, i) => {
        const px = padL + (i / points) * pw;
        const py = h - padB - y * ph;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    plotLine(bias2, '#6c5ce7');
    plotLine(variance, '#fdcb6e');
    plotLine(total, '#e17055');

    // Current position
    const cx = (comp - 1) / 14;
    const cpx = padL + cx * pw;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cpx, h - padB);
    ctx.lineTo(cpx, 15);
    ctx.stroke();
    ctx.setLineDash([]);

    // Legend
    const ly = 15;
    [[' Bias²', '#6c5ce7'], [' Variance', '#fdcb6e'], [' Total Error', '#e17055']].forEach(([label, color], i) => {
      ctx.fillStyle = color;
      ctx.fillRect(padL + 10 + i * 100, ly, 12, 12);
      ctx.fillStyle = '#aaa';
      ctx.font = '11px sans-serif';
      ctx.fillText(label, padL + 24 + i * 100, ly + 10);
    });

    const zone = comp <= 4 ? 'Underfitting zone (high bias)' : comp >= 12 ? 'Overfitting zone (high variance)' : 'Sweet spot';
    caption.textContent = `Complexity = ${comp} → ${zone}`;
  }

  document.getElementById('bvcomp').addEventListener('input', draw);
  draw();
}

function gradientDescent2D(container) {
  container.innerHTML = '<div class="controls"><label>Learning rate: <input type="range" id="gdlr" min="0.01" max="0.5" value="0.1" step="0.01"><span id="gdlrv">0.1</span></label><button class="btn" id="gd-run" style="padding:0.25rem 0.8rem; font-size:0.78rem;">Run GD</button><button class="btn" id="gd-reset" style="padding:0.25rem 0.8rem; font-size:0.78rem;">Reset</button></div>';
  const { ctx, w, h } = createCanvas(container, 400, 300);
  const caption = document.createElement('div');
  caption.className = 'caption';
  container.appendChild(caption);

  const ox = w / 2, oy = h / 2, s = 30;
  let path = [{ x: 4, y: 3 }];
  let animating = false;

  function f(x, y) { return 0.5 * x * x + 2 * y * y; }
  function gx(x) { return x; }
  function gy(y) { return 4 * y; }

  function drawScene() {
    ctx.clearRect(0, 0, w, h);

    // Contours
    [0.5, 2, 5, 10, 18, 30].forEach(level => {
      ctx.strokeStyle = 'rgba(108,92,231,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let t = 0; t <= Math.PI * 2; t += 0.05) {
        const rx = Math.sqrt(2 * level);
        const ry = Math.sqrt(level / 2);
        const px = ox + rx * Math.cos(t) * s;
        const py = oy - ry * Math.sin(t) * s;
        t === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    });

    drawAxes(ctx, w, h, ox, oy, s, s);

    // Minimum
    ctx.fillStyle = '#00b894';
    ctx.beginPath();
    ctx.arc(ox, oy, 5, 0, Math.PI * 2);
    ctx.fill();

    // Path
    if (path.length > 1) {
      ctx.strokeStyle = '#e17055';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      path.forEach((p, i) => {
        const px = ox + p.x * s, py = oy - p.y * s;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Points
    path.forEach((p, i) => {
      const px = ox + p.x * s, py = oy - p.y * s;
      ctx.fillStyle = i === path.length - 1 ? '#e17055' : 'rgba(225,112,85,0.4)';
      ctx.beginPath();
      ctx.arc(px, py, i === path.length - 1 ? 5 : 3, 0, Math.PI * 2);
      ctx.fill();
    });

    const last = path[path.length - 1];
    caption.textContent = `Step ${path.length - 1} | Position: (${last.x.toFixed(3)}, ${last.y.toFixed(3)}) | Loss: ${f(last.x, last.y).toFixed(4)}`;
  }

  function step() {
    const lr = parseFloat(document.getElementById('gdlr').value);
    const last = path[path.length - 1];
    const nx = last.x - lr * gx(last.x);
    const ny = last.y - lr * gy(last.y);
    path.push({ x: nx, y: ny });
  }

  function runGD() {
    if (animating) return;
    animating = true;
    let i = 0;
    function tick() {
      if (i >= 30 || !animating) { animating = false; return; }
      step();
      drawScene();
      i++;
      requestAnimationFrame(tick);
    }
    tick();
  }

  document.getElementById('gd-run').addEventListener('click', runGD);
  document.getElementById('gd-reset').addEventListener('click', () => {
    animating = false;
    path = [{ x: 4, y: 3 }];
    drawScene();
  });
  document.getElementById('gdlr').addEventListener('input', () => {
    document.getElementById('gdlrv').textContent = document.getElementById('gdlr').value;
  });

  drawScene();
}

// === Navigation Events ===
document.getElementById('back-btn').addEventListener('click', showLanding);
document.getElementById('quiz-back-btn').addEventListener('click', () => {
  document.getElementById('quiz-view').classList.add('hidden');
  document.getElementById('topic-view').classList.remove('hidden');
});

document.getElementById('prev-lesson-btn').addEventListener('click', () => {
  if (state.currentLesson > 0) {
    state.currentLesson--;
    renderLessonNav();
    renderLesson();
    window.scrollTo(0, 0);
  }
});

document.getElementById('next-lesson-btn').addEventListener('click', () => {
  if (state.currentLesson < state.currentTopic.lessons.length - 1) {
    state.currentLesson++;
    renderLessonNav();
    renderLesson();
    window.scrollTo(0, 0);
  }
});

document.getElementById('mark-complete-btn').addEventListener('click', async () => {
  const topic = state.currentTopic;
  const lesson = topic.lessons[state.currentLesson];
  await markLessonComplete(topic.id, lesson.id);
  renderLesson();
  renderLessonNav();
  renderSidebar();
});

document.getElementById('retry-quiz-btn').addEventListener('click', openQuiz);

// Mobile menu
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

function closeMobileMenu() {
  document.getElementById('sidebar').classList.remove('open');
}

// Vietnamese toggle
const viToggle = document.getElementById('vi-toggle');
const viVisible = localStorage.getItem('ml-math-vi') !== 'hidden';
if (!viVisible) {
  document.body.classList.add('hide-vi');
  viToggle.classList.remove('active');
}
viToggle.addEventListener('click', () => {
  const hiding = !document.body.classList.contains('hide-vi');
  document.body.classList.toggle('hide-vi', hiding);
  viToggle.classList.toggle('active', !hiding);
  localStorage.setItem('ml-math-vi', hiding ? 'hidden' : 'visible');
});

// === Init ===
(async () => {
  await loadProgress();
  renderLanding();
  renderSidebar();
})();
