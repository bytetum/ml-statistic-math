import { TOPICS } from './topics';
import { state, isLessonComplete, markLessonComplete, getTopicProgress, getGlobalProgress, setCurrentTopic, setCurrentLesson } from './state';
import { loadNote, saveNote } from './api';
import { renderInteractive } from './interactive';
import { openQuiz } from './quiz';

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

  loadNote(topic.id, lesson.id).then(text => {
    const ta = document.getElementById('lesson-notes') as HTMLTextAreaElement | null;
    if (ta) ta.value = text;
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

  if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
    MathJax.typesetPromise([content]).catch(console.error);
  }
}

export function closeMobileMenu(): void {
  document.getElementById('sidebar')!.classList.remove('open');
}
