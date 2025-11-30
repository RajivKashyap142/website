import { useEffect, useMemo, useRef, useState } from 'react';

const SYSTEM_PROMPT = `You are Shrava's customer success copilot. Provide helpful, clear answers about Shrava's voice automation services, delivery capabilities, pricing models, compliance, and rollout timelines. When appropriate, offer to connect them with the Shrava team for deeper discussions.`;

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content:
      'Hi there! I’m Shrava’s customer success copilot. Ask me about deliveries, pricing, compliance or how we can launch voice automation for your organisation.',
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
  const [error, setError] = useState(null);
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

    setError(null);
    const outgoing = { role: 'user', content: prompt, timestamp: new Date() };
    setMessages((prev) => [...prev, outgoing]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...historyPayload, prompt })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantOutput = '';

      if (reader) {
        const streamingMessage = {
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          streaming: true
        };
        setMessages((prev) => [...prev, streamingMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantOutput += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.streaming) {
              next[next.length - 1] = { ...last, content: assistantOutput };
            }
            return next;
          });
        }

        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.streaming) {
            next[next.length - 1] = {
              ...last,
              streaming: false,
              timestamp: new Date(),
              content: assistantOutput || 'Happy to help with anything else you need.'
            };
          }
          return next;
        });
      } else {
        const result = await response.json();
        const finalMessage = result.reply ?? 'Happy to help with anything else you need.';
        setMessages((prev) => [...prev, { role: 'assistant', content: finalMessage, timestamp: new Date() }]);
      }
    } catch (err) {
      console.error(err);
      setError('Could not reach Shrava support right now. Please try again.');
      setMessages((prev) => prev.filter((msg) => !msg.streaming));
    } finally {
      setIsSending(false);
    }
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
        aria-controls="shrava-chat-panel"
      >
        <span className="launcher-icon">💬</span>
        <span className="launcher-text">Chat with Shrava</span>
      </button>

      <div className="chat-panel" id="shrava-chat-panel" role="dialog" aria-label="Shrava customer success chat">
        <header className="chat-header">
          <div>
            <h3>Shrava Customer Success</h3>
            <p>Ask us about delivery pods, compliance, pricing, or funding partnerships.</p>
          </div>
          <button type="button" className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
            ×
          </button>
        </header>

        {error && <div className="chat-error" role="alert">{error}</div>}

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
          <label className="sr-only" htmlFor="shrava-chat-input">
            Ask Shrava a question
          </label>
          <textarea
            id="shrava-chat-input"
            placeholder="How can we help you today?"
            value={input}
            rows={2}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
              }
            }}
          />
          <button type="submit" className="chat-send" disabled={!canSend}>
            {isSending ? 'Sending…' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
