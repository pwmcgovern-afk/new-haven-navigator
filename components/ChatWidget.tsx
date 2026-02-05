'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useChat } from 'ai/react'
import { useLanguage } from '@/components/LanguageContext'

function parseMarkdownLinks(text: string) {
  const parts: (string | { text: string; href: string })[] = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push({ text: match[1], href: match[2] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function MessageContent({ content }: { content: string }) {
  const parts = parseMarkdownLinks(content)

  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <span key={i}>{part}</span>
        ) : (
          <a
            key={i}
            href={part.href}
            className="underline font-semibold"
            style={{ color: 'inherit' }}
          >
            {part.text}
          </a>
        )
      )}
    </>
  )
}

export default function ChatWidget() {
  const { language, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const bubbleRef = useRef<HTMLButtonElement>(null)
  const prevLanguageRef = useRef(language)

  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant' as const,
    content: t('chatWelcome'),
  }

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    body: { language },
    initialMessages: [welcomeMessage],
  })

  // Reset messages when language changes
  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      prevLanguageRef.current = language
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: t('chatWelcome'),
        },
      ])
    }
  }, [language, t, setMessages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Escape key closes panel
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        bubbleRef.current?.focus()
      }
    },
    [isOpen]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 chat-panel"
          style={{
            width: 'min(24rem, calc(100vw - 2rem))',
            height: 'min(80vh, 600px)',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-panel-title"
        >
          <div
            className="flex flex-col h-full rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-border)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{
                background: 'var(--color-primary)',
                color: 'white',
              }}
            >
              <h2 id="chat-panel-title" className="font-bold text-base" style={{ color: 'white' }}>
                {t('chatAssistant')}
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false)
                  bubbleRef.current?.focus()
                }}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                aria-label={t('chatClose')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              role="log"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                    style={{
                      maxWidth: '85%',
                      background:
                        message.role === 'user'
                          ? 'var(--color-primary)'
                          : 'var(--color-primary-light)',
                      color:
                        message.role === 'user'
                          ? 'white'
                          : 'var(--color-text)',
                    }}
                  >
                    <MessageContent content={message.content} />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl px-4 py-3 flex gap-1.5"
                    style={{ background: 'var(--color-primary-light)' }}
                  >
                    <span className="chat-typing-dot" />
                    <span
                      className="chat-typing-dot"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="chat-typing-dot"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-3 flex-shrink-0"
              style={{ borderTop: '2px solid var(--color-border)' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={t('chatPlaceholder')}
                className="input flex-1"
                style={{ minHeight: '2.75rem' }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="btn-primary"
                style={{
                  minWidth: '2.75rem',
                  minHeight: '2.75rem',
                  padding: '0.5rem',
                }}
                aria-label={t('chatSend')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.94 5.66a1 1 0 0 1 1.13-.2L17.07 9.5a1 1 0 0 1 0 1.82L4.07 15.36a1 1 0 0 1-1.4-1.12L4.2 10.5H9a.5.5 0 0 0 0-1H4.2L2.67 5.76a1 1 0 0 1 .27-.1z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Bubble */}
      <button
        ref={bubbleRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{
          width: '56px',
          height: '56px',
          background: 'var(--color-primary)',
          color: 'white',
        }}
        aria-label={isOpen ? t('chatClose') : t('chatOpen')}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </>
  )
}
