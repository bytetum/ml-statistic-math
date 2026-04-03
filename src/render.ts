import { TOPICS } from './topics';
import { state, isLessonComplete, markLessonComplete, getTopicProgress, getGlobalProgress, setCurrentTopic, setCurrentLesson } from './state';
import { loadNote, saveNote } from './api';
import { renderInteractive } from './interactive';
import { openQuiz } from './quiz';
import { renderBloomSection } from './bloom';
import { renderHomeworkSection } from './homework';
import { resetChatForLesson } from './chat';

export function renderSidebar(): void {
  const nav = document.getElementById('nav-list')!;
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
    li.querySelector('.nav-item')!.addEventListener('click', () => openTopic(topic.id));
    nav.appendChild(li);
  });
  updateGlobalProgress();
}

function updateGlobalProgress(): void {
  const p = getGlobalProgress();
  (document.getElementById('global-progress') as HTMLElement).style.width = `${p * 100}%`;
  document.getElementById('global-progress-text')!.textContent = `${Math.round(p * 100)}% complete`;
}

export function renderLanding(): void {
  const grid = document.getElementById('topic-grid')!;
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

export function openTopic(topicId: string): void {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) return;
  setCurrentTopic(topic);
  setCurrentLesson(0);
  document.getElementById('landing')!.classList.add('hidden');
  document.getElementById('quiz-view')!.classList.add('hidden');
  document.getElementById('topic-view')!.classList.remove('hidden');
  renderLessonNav();
  renderLesson();
  renderSidebar();
  window.scrollTo(0, 0);
  closeMobileMenu();
}

export function showLanding(): void {
  setCurrentTopic(null);
  document.getElementById('landing')!.classList.remove('hidden');
  document.getElementById('topic-view')!.classList.add('hidden');
  document.getElementById('quiz-view')!.classList.add('hidden');
  renderLanding();
  renderSidebar();
  window.scrollTo(0, 0);
}

export function renderLessonNav(): void {
  const nav = document.getElementById('lessons-nav')!;
  const topic = state.currentTopic;
  if (!topic) return;
  nav.innerHTML = '';
  topic.lessons.forEach((lesson, i) => {
    const pill = document.createElement('span');
    pill.className = `lesson-pill ${i === state.currentLesson ? 'active' : ''} ${isLessonComplete(topic.id, lesson.id) ? 'completed' : ''}`;
    pill.textContent = lesson.title;
    pill.addEventListener('click', () => {
      setCurrentLesson(i);
      renderLessonNav();
      renderLesson();
      window.scrollTo(0, 0);
    });
    nav.appendChild(pill);
  });

  const done = topic.lessons.filter(l => isLessonComplete(topic.id, l.id)).length;
  document.getElementById('topic-progress-label')!.textContent = `${done}/${topic.lessons.length} lessons`;
  (document.getElementById('topic-progress-bar') as HTMLElement).style.width = `${(done / topic.lessons.length) * 100}%`;
}

export function renderLesson(): void {
  const topic = state.currentTopic;
  if (!topic) return;
  const lesson = topic.lessons[state.currentLesson];
  const content = document.getElementById('lesson-content')!;

  content.innerHTML = lesson.content;

  if (lesson.interactive) {
    const container = document.createElement('div');
    container.className = 'interactive-container';
    container.id = 'interactive-demo';
    content.appendChild(container);
    requestAnimationFrame(() => renderInteractive(lesson.interactive!, container));
  }

  // Bloom activities
  if (lesson.bloom && lesson.bloom.length > 0) {
    renderBloomSection(lesson.bloom, content);
  }

  // Homework problems
  if (lesson.homework && lesson.homework.length > 0) {
    renderHomeworkSection(lesson.homework, content, topic.id, lesson.id);
  }

  // Notes section
  const notesDiv = document.createElement('div');
  notesDiv.className = 'concept-box notes-section';
  notesDiv.style.marginTop = '2rem';
  notesDiv.innerHTML = `
    <div class="box-label" style="color:var(--accent-light)">Your Notes</div>
    <div class="notes-toolbar">
      <button class="notes-tool-btn" data-insert="$" title="Inline math">$x$</button>
      <button class="notes-tool-btn" data-insert="$$" title="Display math">$$x$$</button>
      <button class="notes-tool-btn" data-insert="\\frac{}{}" title="Fraction">½</button>
      <button class="notes-tool-btn" data-insert="\\sum_{i=1}^{n}" title="Summation">∑</button>
      <button class="notes-tool-btn" data-insert="\\int_{a}^{b}" title="Integral">∫</button>
      <button class="notes-tool-btn" data-insert="\\mathbf{}" title="Bold vector">𝐯</button>
      <button class="notes-tool-btn" data-insert="\\sqrt{}" title="Square root">√</button>
      <button class="notes-tool-btn" data-insert="\\nabla" title="Gradient">∇</button>
      <span class="notes-toolbar-sep"></span>
      <button class="notes-tool-btn notes-img-btn" id="notes-img-btn" title="Upload image">📷</button>
      <input type="file" id="notes-img-input" accept="image/*" style="display:none;">
      <span class="notes-toolbar-sep"></span>
      <button class="notes-tool-btn" id="notes-help-btn" title="LaTeX cheat sheet">? Help</button>
    </div>
    <div id="notes-cheatsheet" class="notes-cheatsheet hidden">
      <div class="cheatsheet-header">
        <strong>LaTeX Cheat Sheet</strong>
        <span style="font-size:0.75rem;color:var(--text-dim);">Click any example to insert it</span>
      </div>
      <table class="cheatsheet-table">
        <tr><th>What you type</th><th>What you get</th></tr>
        <tr class="cs-row" data-cs="$x^2$"><td><code>$x^2$</code></td><td>$x^2$ — superscript</td></tr>
        <tr class="cs-row" data-cs="$x_i$"><td><code>$x_i$</code></td><td>$x_i$ — subscript</td></tr>
        <tr class="cs-row" data-cs="$\\frac{a}{b}$"><td><code>$\\frac{a}{b}$</code></td><td>$\\frac{a}{b}$ — fraction</td></tr>
        <tr class="cs-row" data-cs="$\\sqrt{x}$"><td><code>$\\sqrt{x}$</code></td><td>$\\sqrt{x}$ — square root</td></tr>
        <tr class="cs-row" data-cs="$\\sum_{i=1}^{n} x_i$"><td><code>$\\sum_{i=1}^{n} x_i$</code></td><td>$\\sum_{i=1}^{n} x_i$ — summation</td></tr>
        <tr class="cs-row" data-cs="$\\int_0^1 f(x)\\,dx$"><td><code>$\\int_0^1 f(x)\\,dx$</code></td><td>$\\int_0^1 f(x)\\,dx$ — integral</td></tr>
        <tr class="cs-row" data-cs="$\\mathbf{w}$"><td><code>$\\mathbf{w}$</code></td><td>$\\mathbf{w}$ — bold vector</td></tr>
        <tr class="cs-row" data-cs="$\\nabla f$"><td><code>$\\nabla f$</code></td><td>$\\nabla f$ — gradient</td></tr>
        <tr class="cs-row" data-cs="$\\theta$"><td><code>$\\theta$</code></td><td>$\\theta$ — theta</td></tr>
        <tr class="cs-row" data-cs="$\\alpha, \\beta, \\gamma, \\lambda$"><td><code>$\\alpha, \\beta, \\gamma, \\lambda$</code></td><td>$\\alpha, \\beta, \\gamma, \\lambda$ — Greek</td></tr>
        <tr class="cs-row" data-cs="$\\hat{y}$"><td><code>$\\hat{y}$</code></td><td>$\\hat{y}$ — hat (prediction)</td></tr>
        <tr class="cs-row" data-cs="$\\bar{x}$"><td><code>$\\bar{x}$</code></td><td>$\\bar{x}$ — bar (mean)</td></tr>
        <tr class="cs-row" data-cs="$\\partial f / \\partial x$"><td><code>$\\partial f / \\partial x$</code></td><td>$\\partial f / \\partial x$ — partial</td></tr>
        <tr class="cs-row" data-cs="$\\leq, \\geq, \\neq, \\approx$"><td><code>$\\leq, \\geq, \\neq, \\approx$</code></td><td>$\\leq, \\geq, \\neq, \\approx$ — comparisons</td></tr>
        <tr class="cs-row" data-cs="$\\mathbb{R}^n$"><td><code>$\\mathbb{R}^n$</code></td><td>$\\mathbb{R}^n$ — real numbers</td></tr>
        <tr class="cs-row" data-cs="$\\in, \\forall, \\exists$"><td><code>$\\in, \\forall, \\exists$</code></td><td>$\\in, \\forall, \\exists$ — set/logic</td></tr>
        <tr class="cs-row" data-cs="$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$"><td><code>$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$</code></td><td>matrix</td></tr>
      </table>
      <div style="margin-top:0.6rem;font-size:0.8rem;color:var(--text-dim);">
        <strong>Tips:</strong> Use <code>$...$</code> for inline math within text. Use <code>$$...$$</code> on its own line for centered display math. Use <code>**bold**</code> and <code>*italic*</code> for text formatting.
      </div>
    </div>
    <div class="notes-tabs">
      <button class="notes-tab active" data-tab="edit">Edit</button>
      <button class="notes-tab" data-tab="preview">Preview</button>
    </div>
    <textarea id="lesson-notes" placeholder="Write notes here. Use $x^2$ for math. Click ? Help for LaTeX guide."
      class="notes-textarea"></textarea>
    <div id="notes-preview" class="notes-preview hidden"></div>
    <div id="notes-status" style="font-size:0.7rem; color:var(--text-dim); margin-top:0.3rem;"></div>
  `;
  content.appendChild(notesDiv);

  loadNote(topic.id, lesson.id).then(text => {
    const ta = document.getElementById('lesson-notes') as HTMLTextAreaElement | null;
    if (ta) {
      ta.value = text;
      // Also update preview if it's visible
      const preview = document.getElementById('notes-preview')!;
      if (!preview.classList.contains('hidden')) {
        renderNotesPreview(text, preview);
      }
    }
  });

  // Toolbar insert buttons
  notesDiv.querySelectorAll('.notes-tool-btn[data-insert]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ta = document.getElementById('lesson-notes') as HTMLTextAreaElement;
      const snippet = (btn as HTMLElement).dataset.insert!;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = ta.value.substring(start, end);

      let insert = '';
      if (snippet === '$') {
        insert = `$${selected || 'x'}$`;
      } else if (snippet === '$$') {
        insert = `$$\n${selected || 'x'}\n$$`;
      } else if (snippet.includes('{}')) {
        // Place cursor inside first {}
        const parts = snippet.split('{}');
        insert = parts[0] + '{' + (selected || '') + '}' + (parts.length > 2 ? '{}' : '') + (parts.slice(2).join('{}') || '');
      } else {
        insert = snippet + ' ';
      }

      ta.value = ta.value.substring(0, start) + insert + ta.value.substring(end);
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + insert.length;
      ta.dispatchEvent(new Event('input'));
    });
  });

  // Help toggle
  const helpBtn = notesDiv.querySelector('#notes-help-btn')!;
  const cheatsheet = notesDiv.querySelector('#notes-cheatsheet')!;
  helpBtn.addEventListener('click', () => {
    cheatsheet.classList.toggle('hidden');
    if (!cheatsheet.classList.contains('hidden') && typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
      MathJax.typesetPromise([cheatsheet as HTMLElement]).catch(() => {});
    }
  });

  // Clickable cheatsheet rows — insert LaTeX into textarea
  notesDiv.querySelectorAll('.cs-row').forEach(row => {
    (row as HTMLElement).style.cursor = 'pointer';
    row.addEventListener('click', () => {
      const ta = document.getElementById('lesson-notes') as HTMLTextAreaElement;
      const snippet = (row as HTMLElement).dataset.cs!;
      const pos = ta.selectionStart;
      ta.value = ta.value.substring(0, pos) + snippet + ta.value.substring(pos);
      ta.focus();
      ta.selectionStart = ta.selectionEnd = pos + snippet.length;
      ta.dispatchEvent(new Event('input'));
    });
  });

  // Image upload
  const imgBtn = notesDiv.querySelector('#notes-img-btn')!;
  const imgInput = notesDiv.querySelector('#notes-img-input') as HTMLInputElement;
  imgBtn.addEventListener('click', () => imgInput.click());
  imgInput.addEventListener('change', () => {
    const file = imgInput.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image too large (max 5MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const ta = document.getElementById('lesson-notes') as HTMLTextAreaElement;
      const base64 = reader.result as string;
      const imgTag = `\n![image](${base64})\n`;
      const pos = ta.selectionStart;
      ta.value = ta.value.substring(0, pos) + imgTag + ta.value.substring(pos);
      ta.dispatchEvent(new Event('input'));
    };
    reader.readAsDataURL(file);
    imgInput.value = '';
  });

  // Tab switching (Edit / Preview)
  notesDiv.querySelectorAll('.notes-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = (tab as HTMLElement).dataset.tab;
      notesDiv.querySelectorAll('.notes-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const ta = document.getElementById('lesson-notes') as HTMLTextAreaElement;
      const preview = document.getElementById('notes-preview')!;

      if (mode === 'preview') {
        ta.classList.add('hidden');
        preview.classList.remove('hidden');
        renderNotesPreview(ta.value, preview);
      } else {
        ta.classList.remove('hidden');
        preview.classList.add('hidden');
      }
    });
  });

  let noteTimer: ReturnType<typeof setTimeout>;
  const notesArea = notesDiv.querySelector('textarea')!;
  notesArea.addEventListener('input', () => {
    clearTimeout(noteTimer);
    document.getElementById('notes-status')!.textContent = 'typing...';
    noteTimer = setTimeout(() => {
      saveNote(topic.id, lesson.id, notesArea.value);
      document.getElementById('notes-status')!.textContent = 'saved';
    }, 800);
  });

  if (lesson.quiz) {
    const quizBtn = document.createElement('button');
    quizBtn.className = 'btn primary';
    quizBtn.style.marginTop = '1.5rem';
    quizBtn.textContent = 'Take Quiz';
    quizBtn.addEventListener('click', () => openQuiz());
    content.appendChild(quizBtn);
  }

  (document.getElementById('prev-lesson-btn') as HTMLButtonElement).disabled = state.currentLesson === 0;
  (document.getElementById('next-lesson-btn') as HTMLButtonElement).disabled = state.currentLesson === topic.lessons.length - 1;

  const markBtn = document.getElementById('mark-complete-btn')!;
  if (isLessonComplete(topic.id, lesson.id)) {
    markBtn.textContent = 'Completed';
    markBtn.classList.add('completed-btn');
  } else {
    markBtn.textContent = 'Mark as Complete';
    markBtn.classList.remove('completed-btn');
  }

  // Reset chat context for this lesson
  resetChatForLesson(topic.id, lesson.id);

  if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
    MathJax.typesetPromise([content]).catch(console.error);
  }
}

function renderNotesPreview(text: string, container: HTMLElement): void {
  // Convert markdown-like syntax to HTML
  let html = text
    // Escape HTML (but preserve our markdown)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Images: ![alt](src)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:6px;margin:0.5rem 0;">')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n/g, '<br>');

  container.innerHTML = html;

  if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
    MathJax.typesetPromise([container]).catch(() => {});
  }
}

export function closeMobileMenu(): void {
  document.getElementById('sidebar')!.classList.remove('open');
}
