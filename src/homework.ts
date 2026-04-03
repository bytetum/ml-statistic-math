import type { HomeworkProblem } from './types';
import { getAIFeedback } from './api';

declare const MathJax: { typesetPromise?: (nodes: Element[]) => Promise<void> };

export function renderHomeworkSection(
  problems: HomeworkProblem[],
  container: HTMLElement,
  topicId: string,
  lessonId: string,
): void {
  const section = document.createElement('div');
  section.className = 'homework-section';
  section.innerHTML = `<h3>📝 Homework Problems</h3>`;

  problems.forEach((problem, index) => {
    const card = document.createElement('div');
    card.className = 'homework-card';

    let inputHTML = '';
    if (problem.type === 'numeric') {
      inputHTML = `<input type="number" step="any" class="hw-input" placeholder="Your answer..." data-idx="${index}">`;
    } else if (problem.type === 'multiple-choice' && problem.options) {
      inputHTML = `<div class="hw-options">${problem.options.map((opt, i) =>
        `<label style="display:block;margin:0.3rem 0;cursor:pointer;">
          <input type="radio" name="hw-${index}" value="${i}" style="margin-right:0.5rem;">${opt}
        </label>`
      ).join('')}</div>`;
    } else {
      inputHTML = `<textarea class="hw-input" placeholder="Write your answer..." data-idx="${index}"></textarea>`;
    }

    card.innerHTML = `
      <div class="hw-header">
        <span style="font-weight:600;font-size:0.8rem;color:var(--text-dim)">Problem ${index + 1}</span>
        <span class="hw-difficulty ${problem.difficulty}">${problem.difficulty}</span>
      </div>
      <div class="hw-prompt">${problem.prompt}</div>
      ${inputHTML}
      <div class="hw-actions">
        <button class="btn primary hw-check-btn" style="font-size:0.8rem;padding:0.4rem 0.8rem;">Check Answer</button>
        ${problem.hint ? `<button class="btn hw-hint-btn" style="font-size:0.8rem;padding:0.4rem 0.8rem;">Show Hint</button>` : ''}
      </div>
    `;

    // Hint toggle
    if (problem.hint) {
      const hintBtn = card.querySelector('.hw-hint-btn')!;
      hintBtn.addEventListener('click', () => {
        let hintEl = card.querySelector('.hw-hint');
        if (hintEl) {
          hintEl.remove();
        } else {
          hintEl = document.createElement('div');
          hintEl.className = 'hw-hint';
          hintEl.textContent = `💡 ${problem.hint}`;
          card.appendChild(hintEl);
        }
      });
    }

    // Check answer
    const checkBtn = card.querySelector('.hw-check-btn')!;
    checkBtn.addEventListener('click', async () => {
      let userAnswer = '';

      if (problem.type === 'numeric') {
        const numInput = card.querySelector('input[type="number"]') as HTMLInputElement | null;
        userAnswer = numInput?.value || '';
      } else if (problem.type === 'multiple-choice') {
        const selected = card.querySelector(`input[name="hw-${index}"]:checked`) as HTMLInputElement | null;
        if (selected && problem.options) {
          userAnswer = problem.options[parseInt(selected.value)];
        }
      } else {
        const textarea = card.querySelector('textarea') as HTMLTextAreaElement | null;
        userAnswer = textarea?.value || '';
      }

      if (!userAnswer.trim()) return;

      // Remove old feedback
      card.querySelector('.hw-feedback')?.remove();

      const feedbackEl = document.createElement('div');
      feedbackEl.className = 'hw-feedback';
      feedbackEl.style.background = 'var(--bg)';
      feedbackEl.style.color = 'var(--text-dim)';
      feedbackEl.textContent = 'Checking with AI...';
      card.appendChild(feedbackEl);

      // Quick local check for numeric
      if (problem.type === 'numeric' && problem.answer !== undefined) {
        const expected = Number(problem.answer);
        const actual = Number(userAnswer);
        const tol = problem.tolerance ?? 0.01;
        if (Math.abs(actual - expected) <= tol) {
          feedbackEl.style.background = 'var(--green-dim)';
          feedbackEl.style.color = 'var(--green)';
          feedbackEl.textContent = '✓ Correct!';
          return;
        }
      }

      // AI feedback for free-response or wrong numeric
      try {
        const result = await getAIFeedback(problem.prompt, userAnswer, topicId, lessonId);
        feedbackEl.style.background =
          result.rating === 'correct' ? 'var(--green-dim)' :
          result.rating === 'partial' ? 'rgba(253,203,110,0.15)' : 'rgba(225,112,85,0.15)';
        feedbackEl.style.color =
          result.rating === 'correct' ? 'var(--green)' :
          result.rating === 'partial' ? 'var(--orange)' : 'var(--red)';
        feedbackEl.textContent = result.feedback;
        if (result.hint) {
          feedbackEl.textContent += ` 💡 ${result.hint}`;
        }
      } catch {
        feedbackEl.textContent = 'Could not get feedback. Check your answer manually.';
      }
    });

    section.appendChild(card);
  });

  container.appendChild(section);

  if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
    MathJax.typesetPromise([section]).catch(() => {});
  }
}
