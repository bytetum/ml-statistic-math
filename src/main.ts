import { state, loadProgress, markLessonComplete, setCurrentLesson } from './state';
import { renderSidebar, renderLanding, renderLessonNav, renderLesson, showLanding, closeMobileMenu } from './render';
import { openQuiz } from './quiz';

// Navigation events
document.getElementById('back-btn')!.addEventListener('click', showLanding);
document.getElementById('quiz-back-btn')!.addEventListener('click', () => {
  document.getElementById('quiz-view')!.classList.add('hidden');
  document.getElementById('topic-view')!.classList.remove('hidden');
});

document.getElementById('prev-lesson-btn')!.addEventListener('click', () => {
  if (state.currentLesson > 0) {
    setCurrentLesson(state.currentLesson - 1);
    renderLessonNav();
    renderLesson();
    window.scrollTo(0, 0);
  }
});

document.getElementById('next-lesson-btn')!.addEventListener('click', () => {
  if (state.currentTopic && state.currentLesson < state.currentTopic.lessons.length - 1) {
    setCurrentLesson(state.currentLesson + 1);
    renderLessonNav();
    renderLesson();
    window.scrollTo(0, 0);
  }
});

document.getElementById('mark-complete-btn')!.addEventListener('click', async () => {
  const topic = state.currentTopic;
  if (!topic) return;
  const lesson = topic.lessons[state.currentLesson];
  await markLessonComplete(topic.id, lesson.id);
  renderLesson();
  renderLessonNav();
  renderSidebar();
});

document.getElementById('retry-quiz-btn')!.addEventListener('click', openQuiz);

// Mobile menu
document.getElementById('menu-toggle')!.addEventListener('click', () => {
  document.getElementById('sidebar')!.classList.toggle('open');
});

// Vietnamese toggle
const viToggle = document.getElementById('vi-toggle')!;
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

// Init
(async () => {
  await loadProgress();
  renderLanding();
  renderSidebar();
})();
