import type { ChatMessage, ChatResponse } from './types';

declare const MathJax: { typesetPromise?: (nodes: Element[]) => Promise<void> };

let messages: ChatMessage[] = [];
let currentTopicId = '';
let currentLessonId = '';

const panel = document.getElementById('chat-panel')!;
const messagesEl = document.getElementById('chat-messages')!;
const input = document.getElementById('chat-input') as HTMLTextAreaElement;
const sendBtn = document.getElementById('chat-send-btn')!;
const toggleBtn = document.getElementById('chat-toggle-btn')!;
const closeBtn = document.getElementById('chat-close-btn')!;

function openChat(): void {
  panel.classList.add('open');
  document.body.classList.add('chat-open');
  input.focus();
}

function closeChat(): void {
  panel.classList.remove('open');
  document.body.classList.remove('chat-open');
}

function scrollToBottom(): void {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function appendBubble(role: 'user' | 'assistant', content: string): HTMLElement {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;
  bubble.innerHTML = content.replace(/\n/g, '<br>');
  messagesEl.appendChild(bubble);
  scrollToBottom();

  if (role === 'assistant' && typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
    MathJax.typesetPromise([bubble]).catch(() => {});
  }

  return bubble;
}

async function sendMessage(): Promise<void> {
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';
  messages.push({ role: 'user', content: text });
  appendBubble('user', text);

  const typing = document.createElement('div');
  typing.className = 'chat-typing';
  typing.textContent = 'Thinking...';
  messagesEl.appendChild(typing);
  scrollToBottom();

  sendBtn.setAttribute('disabled', '');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        topic_id: currentTopicId,
        lesson_id: currentLessonId,
      }),
    });
    const data = (await res.json()) as ChatResponse;
    messages.push({ role: 'assistant', content: data.reply });
    typing.remove();
    appendBubble('assistant', data.reply);
  } catch {
    typing.remove();
    appendBubble('assistant', 'Sorry, something went wrong. Please try again.');
  } finally {
    sendBtn.removeAttribute('disabled');
  }
}

export function resetChatForLesson(topicId: string, lessonId: string): void {
  currentTopicId = topicId;
  currentLessonId = lessonId;
  messages = [];

  // Keep only the welcome message
  messagesEl.innerHTML = '';
  const welcome = document.createElement('div');
  welcome.className = 'chat-bubble assistant';
  welcome.textContent = `Ask me anything about this lesson — I can explain concepts, check your work, or help brainstorm.`;
  messagesEl.appendChild(welcome);

  // Load previous chat history
  fetch(`/api/chat?topic_id=${topicId}&lesson_id=${lessonId}`)
    .then(r => r.json())
    .then((history: ChatMessage[]) => {
      if (history.length > 0) {
        history.forEach(msg => {
          messages.push(msg);
          appendBubble(msg.role, msg.content);
        });
      }
    })
    .catch(() => {});
}

export function initChat(): void {
  toggleBtn.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';
  });
}
