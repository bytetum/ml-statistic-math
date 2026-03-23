import type { QuizQuestion } from './types';
import { state, isLessonComplete, markLessonComplete } from './state';
import { saveQuizResult } from './api';
import { renderSidebar, renderLessonNav } from './render';

export function openQuiz(): void {
  const topic = state.currentTopic;
  if (!topic) return;
  const lesson = topic.lessons[state.currentLesson];
  if (!lesson.quiz) return;

  document.getElementById('topic-view')!.classList.add('hidden');
  document.getElementById('quiz-view')!.classList.remove('hidden');
  document.getElementById('quiz-title')!.textContent = `Quiz: ${lesson.title}`;
  document.getElementById('quiz-results')!.classList.add('hidden');

  const container = document.getElementById('quiz-content')!;
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
  submitBtn.addEventListener('click', () => gradeQuiz(lesson.quiz!));
  container.appendChild(submitBtn);

  if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
    MathJax.typesetPromise([container]).catch(console.error);
  }
  window.scrollTo(0, 0);
}

function gradeQuiz(quiz: QuizQuestion[]): void {
  let correct = 0;
  quiz.forEach((q, qi) => {
    const selected = document.querySelector(`input[name="quiz-${qi}"]:checked`) as HTMLInputElement | null;
    const options = document.querySelectorAll<HTMLInputElement>(`input[name="quiz-${qi}"]`);
    options.forEach(opt => {
      const label = opt.closest('.quiz-option') as HTMLElement;
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

  const submitBtn = document.querySelector('.quiz-submit-btn') as HTMLElement;
  submitBtn.style.display = 'none';
  const results = document.getElementById('quiz-results')!;
  results.classList.remove('hidden');
  document.getElementById('quiz-score')!.textContent = `${correct}/${quiz.length} correct (${Math.round(correct / quiz.length * 100)}%)`;

  const topic = state.currentTopic!;
  const lesson = topic.lessons[state.currentLesson];
  saveQuizResult(topic.id, lesson.id, correct, quiz.length);

  if (correct === quiz.length) {
    markLessonComplete(topic.id, lesson.id).then(() => {
      renderSidebar();
      renderLessonNav();
    });
  }
}
