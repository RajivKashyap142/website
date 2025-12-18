import { useEffect, useMemo, useRef, useState } from 'react';

const SYSTEM_PROMPT = `You are Shravo's customer success copilot. Provide helpful, clear answers about Shravo's voice automation services, delivery capabilities, pricing models, compliance, and rollout timelines. When appropriate, offer to connect them with the Shravo team for deeper discussions.`;

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content:
      'Hi there! I’m Shravo’s customer success copilot. Ask me about deliveries, pricing, compliance or how we can launch voice automation for your organisation.',
    timestamp: new Date()
  }
];

const formatTime = (value) =>
  new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).format(value);

function TypingIndicator() {
  return (
    <span className="chat-typing" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}

function Message({ role, content, timestamp }) {
  return (
    <article className={`chat-message ${role}`}>
      <p>{content}</p>
      <time>{formatTime(timestamp)}</time>
    </article>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef(null);

  const canSend = input.trim().length > 0 && !isSending;

  const historyPayload = useMemo(
    () => ({
      systemPrompt: SYSTEM_PROMPT,
      history: messages.slice(-8).map(({ role, content }) => ({ role, content }))
    }),
    [messages]
  );

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const node = listRef.current;
      if (node) {
        node.scrollTop = node.scrollHeight;
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const sendMessage = async () => {
    const prompt = input.trim();
    if (!prompt || isSending) return;

    const outgoing = { role: 'user', content: prompt, timestamp: new Date() };
    setMessages((prev) => [...prev, outgoing]);
    setInput('');
    setIsSending(true);

    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Always show the fallback message since there's no backend
    const errorMessage = {
      role: 'assistant',
      content: 'Our server is down. Please send us your query on hello@shravo.com',
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, errorMessage]);
    setIsSending(false);
  };

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="chat-launcher"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setTimeout(scrollToBottom, 150);
        }}
        aria-expanded={isOpen}
        aria-controls="Shravo-chat-panel"
      >
        <span className="launcher-icon">💬</span>
        <span className="launcher-text">Chat with Shravo</span>
      </button>

      <div className="chat-panel" id="Shravo-chat-panel" role="dialog" aria-label="Shravo customer success chat">
        <header className="chat-header">
          <div className="chat-header-bar">
            <div className="chat-header-body">
              <h3>Shravo Customer Success</h3>
              <p>Ask us about delivery pods, compliance, pricing, or funding partnerships.</p>
            </div>
            <div className="chat-controls">
              <button type="button" className="chat-control chat-control--close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                ×
              </button>
            </div>
          </div>
        </header>

        <div className="chat-body" ref={listRef}>
          {messages.map((message, index) => (
            <Message key={`${message.role}-${index}-${message.timestamp}`} {...message} />
          ))}
          {isSending && <TypingIndicator />}
        </div>

        <form
          className="chat-footer"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <label className="sr-only" htmlFor="Shravo-chat-input">
            Ask Shravo a question
          </label>
          <div className="chat-form">
            <textarea
              id="Shravo-chat-input"
              placeholder="How can we help you today?"
              value={input}
              rows={2}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
            />
          </div>
            <button type="submit" className="chat-send" disabled={!canSend}>
              {isSending ? 'Sending…' : 'SEND'}
            </button>
        </form>
      </div>
    </div>
  );
}
