'use client';

import { FormEvent, useState } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

const starterMessage: Message = {
  role: 'assistant',
  content: 'Hi, I’m Yash’s Digital Twin. Ask me about his experience, projects, technical strengths, or what he is building next.',
};

const suggestedQuestions = ['What does Yash work on?', 'Tell me about CoinPulse', 'What are his strongest skills?'];

function displayAnswer(content: string) {
  return content.replace(/\*\*/g, '').replace(/(^|\n)\s*\*\s/g, '$1• ');
}

export default function DigitalTwinChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage(event?: FormEvent, suggested?: string) {
    event?.preventDefault();
    const content = (suggested ?? input).trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: 'user' as const, content }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.filter((message) => message !== starterMessage) }),
      });
      const result = await response.json() as { message?: string; error?: string };
      setMessages([...nextMessages, { role: 'assistant', content: result.message ?? result.error ?? 'I could not answer that right now.' }]);
    } catch {
      setMessages([...nextMessages, { role: 'assistant', content: 'I could not connect right now. Please try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <button className={`twin-launcher${open ? ' is-open' : ''}`} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="digital-twin-panel"><span className="twin-orbit">✳</span><span>{open ? 'Close twin' : 'Ask my twin'}</span></button>
    {open && <aside className="twin-panel" id="digital-twin-panel" aria-label="Yash Goyal Digital Twin chat">
      <div className="twin-header"><div><p className="twin-kicker"><span className="twin-status" /> Digital Twin</p><h2>Ask Yash&apos;s<br /><em>other self.</em></h2></div><button className="twin-close" type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button></div>
      <div className="twin-messages" aria-live="polite">{messages.map((message, index) => <div className={`twin-message ${message.role}`} key={`${message.role}-${index}`}><span>{message.role === 'assistant' ? displayAnswer(message.content) : message.content}</span></div>)}{loading && <div className="twin-message assistant"><span className="twin-typing"><i /><i /><i /></span></div>}</div>
      {messages.length === 1 && <div className="twin-suggestions">{suggestedQuestions.map((question) => <button key={question} type="button" onClick={() => sendMessage(undefined, question)}>{question} <span>↗</span></button>)}</div>}
      <form className="twin-form" onSubmit={sendMessage}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about the journey..." aria-label="Ask the Digital Twin a question" disabled={loading} /><button type="submit" aria-label="Send message" disabled={loading || !input.trim()}>↗</button></form>
      <p className="twin-note">Powered by OpenRouter · answers are based on Yash&apos;s profile</p>
    </aside>}
  </>;
}