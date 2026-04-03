import type { BloomActivity, AIFeedbackResponse } from './types';
import { state, isBloomDone, markBloomDone, unmarkBloomDone } from './state';
import { getAIFeedback } from './api';

export const BLOOM_LEVELS = [
  { name: 'Remember',   vi: 'Ghi nh\u1edb',     icon: '\ud83e\udde0', color: '#e17055' },
  { name: 'Understand', vi: 'Hi\u1ec3u',         icon: '\ud83d\udca1', color: '#fdcb6e' },
  { name: 'Apply',      vi: '\u00c1p d\u1ee5ng',  icon: '\ud83d\udd27', color: '#ffeaa7' },
  { name: 'Analyze',    vi: 'Ph\u00e2n t\u00edch', icon: '\ud83d\udd2c', color: '#00b894' },
  { name: 'Evaluate',   vi: '\u0110\u00e1nh gi\u00e1', icon: '\u2696\ufe0f', color: '#0984e3' },
  { name: 'Create',     vi: 'S\u00e1ng t\u1ea1o',  icon: '\ud83c\udfa8', color: '#6c5ce7' },
] as const;

export function renderBloomSection(activities: BloomActivity[], container: HTMLElement): void {
  const topic = state.currentTopic;
  if (!topic) return;
  const lesson = topic.lessons[state.currentLesson];

  const section = document.createElement('div');
  section.className = 'bloom-section';

  // Header with toggle
  const header = document.createElement('div');
  header.className = 'bloom-header';
  header.innerHTML = `
    <div class="bloom-header-left">
      <span class="bloom-header-icon">\ud83c\udf3b</span>
      <span>Practice Activities</span>
      <span class="vi">B\u00e0i t\u1eadp th\u1ef1c h\u00e0nh</span>
    </div>
    <div class="bloom-header-right">
      ${renderBloomMiniBar(activities, topic.id, lesson.id)}
      <span class="bloom-toggle-arrow">\u25bc</span>
    </div>
  `;
  section.appendChild(header);

  const body = document.createElement('div');
  body.className = 'bloom-body';

  // Group activities by level
  const byLevel = new Map<number, Array<{ activity: BloomActivity; index: number }>>();
  activities.forEach((a, i) => {
    if (!byLevel.has(a.level)) byLevel.set(a.level, []);
    byLevel.get(a.level)!.push({ activity: a, index: i });
  });

  // Render each level group
  for (const [level, items] of [...byLevel.entries()].sort((a, b) => a[0] - b[0])) {
    const bl = BLOOM_LEVELS[level];
    const levelDiv = document.createElement('div');
    levelDiv.className = 'bloom-level';

    const levelHeader = document.createElement('div');
    levelHeader.className = 'bloom-level-header';
    levelHeader.innerHTML = `
      <span class="bloom-level-badge" style="background:${bl.color}20; color:${bl.color}; border:1px solid ${bl.color}40">
        ${bl.icon} ${bl.name} <span class="vi">${bl.vi}</span>
      </span>
    `;
    levelDiv.appendChild(levelHeader);

    items.forEach(({ activity, index }) => {
      const card = renderActivityCard(activity, topic.id, lesson.id, index);
      levelDiv.appendChild(card);
    });

    body.appendChild(levelDiv);
  }

  section.appendChild(body);

  // Toggle collapse
  header.addEventListener('click', () => {
    body.classList.toggle('collapsed');
    header.querySelector('.bloom-toggle-arrow')!.textContent = body.classList.contains('collapsed') ? '\u25b6' : '\u25bc';
  });

  container.appendChild(section);
}

function renderBloomMiniBar(activities: BloomActivity[], topicId: string, lessonId: string): string {
  const segments = BLOOM_LEVELS.map((bl, level) => {
    const atLevel = activities.filter(a => a.level === level);
    if (atLevel.length === 0) return '';
    const done = activities.filter((a, i) => a.level === level && isBloomDone(topicId, lessonId, level, i)).length;
    const pct = done / atLevel.length;
    const opacity = pct > 0 ? 0.4 + pct * 0.6 : 0.15;
    return `<span class="bloom-mini-seg" style="background:${bl.color}; opacity:${opacity}" title="${bl.name}: ${done}/${atLevel.length}"></span>`;
  }).join('');
  return `<span class="bloom-mini-bar">${segments}</span>`;
}

function renderActivityCard(activity: BloomActivity, topicId: string, lessonId: string, index: number): HTMLElement {
  const card = document.createElement('div');
  const done = isBloomDone(topicId, lessonId, activity.level, index);
  card.className = `bloom-card ${done ? 'bloom-done' : ''}`;

  const prompt = document.createElement('div');
  prompt.className = 'bloom-prompt';
  prompt.innerHTML = activity.prompt;
  card.appendChild(prompt);

  if (done) {
    const checkRow = document.createElement('div');
    checkRow.className = 'bloom-check';

    const checkText = document.createElement('span');
    checkText.textContent = '\u2713 Completed';
    checkRow.appendChild(checkText);

    if (activity.type === 'explain' || activity.type === 'open') {
      const redoBtn = document.createElement('button');
      redoBtn.className = 'btn bloom-redo-btn';
      redoBtn.textContent = 'Redo';
      redoBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await unmarkBloomDone(topicId, lessonId, activity.level, index);
        // Re-render the card in place
        const newCard = renderActivityCard(activity, topicId, lessonId, index);
        card.replaceWith(newCard);
        // Update mini bar
        const section = newCard.closest('.bloom-section');
        if (section && state.currentTopic) {
          const lesson = state.currentTopic.lessons[state.currentLesson];
          if (lesson.bloom) {
            const miniBar = section.querySelector('.bloom-mini-bar');
            if (miniBar) miniBar.outerHTML = renderBloomMiniBar(lesson.bloom, topicId, lessonId);
          }
        }
      });
      checkRow.appendChild(redoBtn);
    }

    card.appendChild(checkRow);
  }

  const interactionArea = document.createElement('div');
  interactionArea.className = 'bloom-interaction';

  switch (activity.type) {
    case 'choice':
      renderChoice(interactionArea, activity, topicId, lessonId, index, done);
      break;
    case 'numeric':
      renderNumeric(interactionArea, activity, topicId, lessonId, index, done);
      break;
    case 'match':
      renderMatch(interactionArea, activity, topicId, lessonId, index, done);
      break;
    case 'order':
      renderOrder(interactionArea, activity, topicId, lessonId, index, done);
      break;
    case 'explain':
      renderExplain(interactionArea, activity, topicId, lessonId, index, done);
      break;
    case 'open':
      renderOpen(interactionArea, activity, topicId, lessonId, index, done);
      break;
  }

  card.appendChild(interactionArea);

  return card;
}

function markDoneAndUpdate(card: HTMLElement, topicId: string, lessonId: string, level: number, index: number): void {
  markBloomDone(topicId, lessonId, level, index);
  card.closest('.bloom-card')?.classList.add('bloom-done');
  // Update the mini bar in the header
  const section = card.closest('.bloom-section');
  if (section) {
    const miniBar = section.querySelector('.bloom-mini-bar');
    if (miniBar && state.currentTopic) {
      const lesson = state.currentTopic.lessons[state.currentLesson];
      if (lesson.bloom) {
        miniBar.outerHTML = renderBloomMiniBar(lesson.bloom, topicId, lessonId);
      }
    }
  }
}

function renderChoice(area: HTMLElement, activity: BloomActivity, topicId: string, lessonId: string, index: number, done: boolean): void {
  if (!activity.options || activity.answer === undefined) return;
  const name = `bloom-choice-${index}`;

  activity.options.forEach((opt, oi) => {
    const label = document.createElement('label');
    label.className = 'bloom-option';
    if (done) {
      if (oi === activity.answer) label.classList.add('correct');
    }
    label.innerHTML = `<input type="radio" name="${name}" value="${oi}" ${done ? 'disabled' : ''}> <span>${opt}</span>`;
    area.appendChild(label);
  });

  if (!done) {
    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn bloom-check-btn';
    checkBtn.textContent = 'Check';
    checkBtn.addEventListener('click', () => {
      const selected = area.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement | null;
      if (!selected) return;
      const labels = area.querySelectorAll('.bloom-option');
      labels.forEach((lbl, i) => {
        if (i === activity.answer) lbl.classList.add('correct');
        if (parseInt(selected.value) === i && i !== activity.answer) lbl.classList.add('incorrect');
        lbl.querySelector('input')!.setAttribute('disabled', '');
      });
      checkBtn.remove();
      if (parseInt(selected.value) === activity.answer) {
        markDoneAndUpdate(area, topicId, lessonId, activity.level, index);
      }
    });
    area.appendChild(checkBtn);
  }
}

function renderNumeric(area: HTMLElement, activity: BloomActivity, topicId: string, lessonId: string, index: number, done: boolean): void {
  if (activity.correctValue === undefined) return;
  const tolerance = activity.tolerance ?? 0.01;

  const row = document.createElement('div');
  row.className = 'bloom-numeric-row';
  const input = document.createElement('input');
  input.type = 'number';
  input.step = 'any';
  input.className = 'bloom-numeric-input';
  input.placeholder = 'Your answer...';
  input.disabled = done;
  if (done) input.value = String(activity.correctValue);
  row.appendChild(input);

  if (!done) {
    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn bloom-check-btn';
    checkBtn.textContent = 'Check';
    checkBtn.addEventListener('click', () => {
      const val = parseFloat(input.value);
      if (isNaN(val)) return;
      const correct = Math.abs(val - activity.correctValue!) <= tolerance;
      input.classList.add(correct ? 'correct' : 'incorrect');
      input.disabled = true;
      checkBtn.remove();
      const fb = document.createElement('div');
      fb.className = `bloom-feedback ${correct ? 'correct' : 'incorrect'}`;
      fb.textContent = correct ? '\u2713 Correct!' : `\u2717 Answer: ${activity.correctValue}`;
      area.appendChild(fb);
      if (correct) markDoneAndUpdate(area, topicId, lessonId, activity.level, index);
    });
    row.appendChild(checkBtn);
  }
  area.appendChild(row);
}

function renderMatch(area: HTMLElement, activity: BloomActivity, topicId: string, lessonId: string, index: number, done: boolean): void {
  if (!activity.pairs) return;

  const leftItems = activity.pairs.map(p => p[0]);
  const rightItems = [...activity.pairs.map(p => p[1])];
  // Shuffle right side
  if (!done) {
    for (let i = rightItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rightItems[i], rightItems[j]] = [rightItems[j], rightItems[i]];
    }
  }

  const grid = document.createElement('div');
  grid.className = 'bloom-match-grid';

  let selectedLeft: HTMLElement | null = null;
  const matches = new Map<string, string>();

  leftItems.forEach((left, li) => {
    const leftEl = document.createElement('div');
    leftEl.className = 'bloom-match-item left';
    leftEl.innerHTML = left;
    leftEl.dataset.idx = String(li);
    leftEl.dataset.key = left;

    if (!done) {
      leftEl.addEventListener('click', () => {
        grid.querySelectorAll('.bloom-match-item.left').forEach(el => el.classList.remove('selected'));
        leftEl.classList.add('selected');
        selectedLeft = leftEl;
      });
    }

    if (done) {
      leftEl.classList.add('matched');
    }

    grid.appendChild(leftEl);

    const rightEl = document.createElement('div');
    rightEl.className = 'bloom-match-item right';
    rightEl.innerHTML = done ? activity.pairs![li][1] : rightItems[li];
    rightEl.dataset.value = done ? activity.pairs![li][1] : rightItems[li];

    if (!done) {
      rightEl.addEventListener('click', () => {
        if (!selectedLeft) return;
        const leftKey = selectedLeft.dataset.key!;
        const rightKey = rightEl.dataset.value!;
        matches.set(leftKey, rightKey);
        selectedLeft.classList.remove('selected');
        selectedLeft.classList.add('matched');
        rightEl.classList.add('matched');
        selectedLeft = null;

        // Check if all matched
        if (matches.size === leftItems.length) {
          let allCorrect = true;
          activity.pairs!.forEach(([l, r]) => {
            if (matches.get(l) !== r) allCorrect = false;
          });

          grid.querySelectorAll('.bloom-match-item').forEach(el => {
            el.classList.add(allCorrect ? 'correct' : 'show-result');
          });

          const fb = document.createElement('div');
          fb.className = `bloom-feedback ${allCorrect ? 'correct' : 'incorrect'}`;
          if (allCorrect) {
            fb.textContent = '\u2713 All matched correctly!';
            markDoneAndUpdate(area, topicId, lessonId, activity.level, index);
          } else {
            fb.textContent = '\u2717 Some matches are incorrect. Correct pairs shown.';
            // Show correct answers
            grid.innerHTML = '';
            activity.pairs!.forEach(([l, r]) => {
              const lEl = document.createElement('div');
              lEl.className = 'bloom-match-item left correct';
              lEl.innerHTML = l;
              grid.appendChild(lEl);
              const rEl = document.createElement('div');
              rEl.className = 'bloom-match-item right correct';
              rEl.innerHTML = r;
              grid.appendChild(rEl);
            });
          }
          area.appendChild(fb);
        }
      });
    } else {
      rightEl.classList.add('matched');
    }

    grid.appendChild(rightEl);
  });

  area.appendChild(grid);
}

function renderOrder(area: HTMLElement, activity: BloomActivity, topicId: string, lessonId: string, index: number, done: boolean): void {
  if (!activity.correctOrder) return;

  const items = [...activity.correctOrder];
  // Shuffle if not done
  if (!done) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
  }

  const list = document.createElement('div');
  list.className = 'bloom-order-list';

  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'bloom-order-item';
    el.innerHTML = item;
    el.dataset.value = item;
    el.draggable = !done;

    if (!done) {
      el.addEventListener('click', () => {
        const selected = list.querySelector('.bloom-order-item.selected');
        if (selected && selected !== el) {
          // Swap
          const parent = el.parentNode!;
          const elNext = el.nextSibling;
          const selNext = selected.nextSibling;
          if (elNext === selected) {
            parent.insertBefore(selected, el);
          } else if (selNext === el) {
            parent.insertBefore(el, selected);
          } else {
            parent.insertBefore(el, selNext);
            parent.insertBefore(selected, elNext);
          }
          selected.classList.remove('selected');
        } else {
          list.querySelectorAll('.bloom-order-item').forEach(e => e.classList.remove('selected'));
          el.classList.toggle('selected');
        }
      });
    }

    if (done) el.classList.add('correct');
    list.appendChild(el);
  });

  area.appendChild(list);

  if (!done) {
    const hint = document.createElement('div');
    hint.className = 'bloom-hint';
    hint.textContent = 'Click two items to swap their positions';
    area.appendChild(hint);

    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn bloom-check-btn';
    checkBtn.textContent = 'Check Order';
    checkBtn.addEventListener('click', () => {
      const currentOrder = Array.from(list.querySelectorAll<HTMLElement>('.bloom-order-item')).map(el => el.dataset.value!);
      const correct = currentOrder.every((item, i) => item === activity.correctOrder![i]);

      list.querySelectorAll<HTMLElement>('.bloom-order-item').forEach((el, i) => {
        el.classList.remove('selected');
        el.classList.add(el.dataset.value === activity.correctOrder![i] ? 'correct' : 'incorrect');
      });

      checkBtn.remove();
      hint.remove();
      const fb = document.createElement('div');
      fb.className = `bloom-feedback ${correct ? 'correct' : 'incorrect'}`;
      fb.textContent = correct ? '\u2713 Correct order!' : '\u2717 Not quite. Green items are in the right position.';
      area.appendChild(fb);
      if (correct) markDoneAndUpdate(area, topicId, lessonId, activity.level, index);
    });
    area.appendChild(checkBtn);
  }
}

function renderAIFeedback(area: HTMLElement, result: AIFeedbackResponse, textarea: HTMLTextAreaElement, btn: HTMLButtonElement, topicId: string, lessonId: string, level: number, index: number): void {
  const container = document.createElement('div');
  container.className = `bloom-ai-feedback bloom-ai-${result.rating}`;

  const badge = document.createElement('span');
  badge.className = `bloom-ai-badge bloom-ai-badge-${result.rating}`;
  const labels: Record<string, string> = { correct: 'Correct', partial: 'Partial', needs_work: 'Needs Work', self_assessed: 'Self-Assessed' };
  badge.textContent = labels[result.rating] || result.rating;
  container.appendChild(badge);

  const text = document.createElement('p');
  text.className = 'bloom-ai-text';
  text.textContent = result.feedback;
  container.appendChild(text);

  if (result.hint) {
    const hint = document.createElement('p');
    hint.className = 'bloom-ai-hint';
    hint.textContent = `Hint: ${result.hint}`;
    container.appendChild(hint);
  }

  area.appendChild(container);

  if (result.rating === 'correct' || result.rating === 'partial' || result.rating === 'self_assessed') {
    textarea.disabled = true;
    btn.remove();
    markDoneAndUpdate(area, topicId, lessonId, level, index);
  } else {
    // needs_work — allow retry
    btn.textContent = 'Retry AI Feedback';
    btn.disabled = false;
  }
}

async function handleAIFeedbackClick(area: HTMLElement, textarea: HTMLTextAreaElement, btn: HTMLButtonElement, activity: BloomActivity, topicId: string, lessonId: string, index: number): Promise<void> {
  if (textarea.value.trim().length < 10) {
    textarea.classList.add('shake');
    setTimeout(() => textarea.classList.remove('shake'), 500);
    return;
  }

  // Remove any previous feedback
  area.querySelector('.bloom-ai-feedback')?.remove();

  btn.disabled = true;
  btn.textContent = '';
  const spinner = document.createElement('span');
  spinner.className = 'bloom-ai-loading';
  btn.appendChild(spinner);
  const loadingText = document.createTextNode(' Evaluating...');
  btn.appendChild(loadingText);

  const result = await getAIFeedback(activity.prompt, textarea.value, topicId, lessonId);

  btn.textContent = 'Get AI Feedback';
  btn.disabled = false;

  renderAIFeedback(area, result, textarea, btn, topicId, lessonId, activity.level, index);
}

function renderExplain(area: HTMLElement, activity: BloomActivity, topicId: string, lessonId: string, index: number, done: boolean): void {
  const textarea = document.createElement('textarea');
  textarea.className = 'bloom-explain-input';
  textarea.placeholder = 'Write your explanation...';
  textarea.disabled = done;
  area.appendChild(textarea);

  if (!done) {
    const btnRow = document.createElement('div');
    btnRow.className = 'bloom-btn-row';
    const markBtn = document.createElement('button');
    markBtn.className = 'btn bloom-check-btn';
    markBtn.textContent = 'Get AI Feedback';
    markBtn.addEventListener('click', () => {
      handleAIFeedbackClick(area, textarea, markBtn, activity, topicId, lessonId, index);
    });
    btnRow.appendChild(markBtn);
    area.appendChild(btnRow);
  }
}

function renderOpen(area: HTMLElement, activity: BloomActivity, topicId: string, lessonId: string, index: number, done: boolean): void {
  const textarea = document.createElement('textarea');
  textarea.className = 'bloom-explain-input';
  textarea.placeholder = 'Write your response...';
  textarea.rows = 4;
  textarea.disabled = done;
  area.appendChild(textarea);

  if (!done) {
    const btnRow = document.createElement('div');
    btnRow.className = 'bloom-btn-row';
    const markBtn = document.createElement('button');
    markBtn.className = 'btn bloom-check-btn';
    markBtn.textContent = 'Get AI Feedback';
    markBtn.addEventListener('click', () => {
      handleAIFeedbackClick(area, textarea, markBtn, activity, topicId, lessonId, index);
    });
    btnRow.appendChild(markBtn);
    area.appendChild(btnRow);
  }
}
