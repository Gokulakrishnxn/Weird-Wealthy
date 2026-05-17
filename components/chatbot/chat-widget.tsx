"use client";

import { Send, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { chatQuickReplies, welcomeMessage } from "@/lib/chatbot/responses";
import { MINTY_NAME } from "@/lib/chatbot/minty-prompt";
import {
  chatFabPosition,
  chatPanelPosition,
  chatPanelSize,
  touchTarget,
} from "@/lib/layout";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const CHATBOT_GIF = "/chatbot.gif";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function replyToMessage(content: string, id: string): ChatMessage {
  return { id, role: "assistant", content };
}

function ChatbotAvatar({
  size = "md",
  showStatus,
}: {
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}) {
  return (
    <span className="relative inline-flex shrink-0">
      <span
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full bg-black",
          size === "sm" && "size-8 sm:size-9",
          size === "md" && "size-10 sm:size-11",
          size === "lg" && "size-12 sm:size-14"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHATBOT_GIF}
          alt=""
          className="size-[118%] max-w-none object-cover"
          aria-hidden
        />
      </span>
      {showStatus && (
        <span
          className="absolute bottom-0 right-0 size-2 rounded-full border-2 border-card bg-lime-400 sm:size-2.5"
          aria-hidden
        />
      )}
    </span>
  );
}

export function ChatWidget() {
  const reduceMotion = useReducedMotion();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    replyToMessage(welcomeMessage.text, "welcome"),
  ]);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, messages, typing, scrollToBottom]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = () => {
      if (mq.matches && open) scrollToBottom();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open, scrollToBottom]);

  const sendUserMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;

      const userId = `user-${Date.now()}`;
      const userMessage: ChatMessage = {
        id: userId,
        role: "user",
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setTyping(true);

      const priorTurns = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: priorTurns,
          }),
        });

        const data = (await res.json()) as { reply?: string; error?: string };

        if (!res.ok) {
          throw new Error(data.error ?? "Chat request failed");
        }

        const reply = data.reply?.trim();
        if (!reply) {
          throw new Error("Empty response from assistant");
        }

        setMessages((prev) => [
          ...prev,
          replyToMessage(reply, `bot-${Date.now()}`),
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          replyToMessage(
            "Something glitched on my end. Try again in a sec—or browse the blog while I recover.",
            `bot-err-${Date.now()}`
          ),
        ]);
      } finally {
        setTyping(false);
      }
    },
    [messages, typing]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendUserMessage(input);
  };

  const showQuickReplies =
    !typing && messages.length === 1 && messages[0]?.id === "welcome";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-widget-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-widget-title"
            initial={
              reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }
            }
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed z-[65] flex w-auto max-w-[24rem] flex-col overflow-hidden font-sans",
              "rounded-2xl border border-border bg-card shadow-[0_24px_60px_-16px_rgba(0,0,0,0.45)]",
              "ring-1 ring-foreground/[0.06] sm:rounded-3xl",
              chatPanelPosition,
              chatPanelSize
            )}
          >
            <header className="relative flex shrink-0 items-center gap-2.5 border-b border-border bg-elevated px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent"
                aria-hidden
              />
              <ChatbotAvatar size="sm" showStatus />
              <div className="min-w-0 flex-1">
                <h2
                  id="chat-widget-title"
                  className="truncate text-sm font-semibold tracking-tight"
                >
                  {MINTY_NAME}
                </h2>
                <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
                  {siteConfig.name} · AI guide
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn(
                  touchTarget,
                  "shrink-0 rounded-full text-muted-foreground transition-colors hover:bg-elevated-hover hover:text-foreground"
                )}
                aria-label="Close chat"
              >
                <X className="size-4" strokeWidth={2} />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain bg-background px-3 py-3 sm:gap-3 sm:px-4 sm:py-4"
              aria-live="polite"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex max-w-[min(92%,20rem)] flex-col gap-1.5 sm:max-w-[92%]",
                    msg.role === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-3 py-2 text-[13px] leading-relaxed tracking-tight sm:px-3.5 sm:py-2.5 sm:text-sm",
                      "wrap-break-word [overflow-wrap:anywhere]",
                      msg.role === "user"
                        ? "rounded-br-md bg-inverse text-inverse-foreground"
                        : "rounded-bl-md border border-border bg-elevated text-foreground"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <ChatbotAvatar size="sm" />
                  <span className="rounded-2xl rounded-bl-md border border-border bg-elevated px-3 py-2.5">
                    <span className="inline-flex gap-1">
                      <span className="size-1.5 animate-bounce rounded-full bg-lime-400/80 [animation-delay:0ms]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-lime-400/80 [animation-delay:120ms]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-lime-400/80 [animation-delay:240ms]" />
                    </span>
                  </span>
                </div>
              )}
            </div>

            {showQuickReplies && (
              <div className="flex max-h-28 shrink-0 flex-wrap gap-1.5 overflow-y-auto border-t border-border bg-card px-3 py-2 sm:max-h-none sm:px-4 sm:py-2.5">
                {chatQuickReplies.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => void sendUserMessage(label)}
                    className="min-h-9 rounded-full border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-lime-400/30 hover:bg-lime-400/10 hover:text-foreground sm:min-h-0 sm:py-1 sm:text-xs"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={onSubmit}
              className="flex shrink-0 gap-2 border-t border-border bg-card p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:p-3 sm:pb-3"
            >
              <label htmlFor={inputId} className="sr-only">
                Message {MINTY_NAME}
              </label>
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                enterKeyHint="send"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => {
                  window.setTimeout(scrollToBottom, 100);
                }}
                placeholder={`Ask ${MINTY_NAME}…`}
                autoComplete="off"
                className="min-h-11 min-w-0 flex-1 rounded-full border border-border bg-background px-3.5 text-base tracking-tight outline-none placeholder:text-muted-foreground focus:border-lime-400/40 focus:ring-2 focus:ring-lime-400/15 sm:min-h-10 sm:px-4 sm:text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className={cn(
                  touchTarget,
                  "shrink-0 rounded-full bg-lime-400 text-black transition-opacity hover:opacity-90 disabled:opacity-40"
                )}
                aria-label="Send message"
              >
                <Send className="size-4" strokeWidth={2.25} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-widget-panel"
        aria-label={open ? `Close ${MINTY_NAME} chat` : `Chat with ${MINTY_NAME}`}
        className={cn(
          "fixed z-[55] overflow-hidden rounded-full bg-black",
          "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)]",
          "size-[3.25rem] sm:size-16",
          open && "pointer-events-none opacity-0",
          chatFabPosition
        )}
        animate={
          reduceMotion || open ? undefined : { y: [0, -4, 0] }
        }
        transition={
          reduceMotion || open
            ? undefined
            : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHATBOT_GIF}
          alt=""
          className="relative size-full scale-110 object-cover"
          aria-hidden
        />
        {!open && (
          <span
            className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full bg-lime-400 text-[8px] font-bold text-black sm:size-4 sm:text-[9px]"
            aria-hidden
          >
            ?
          </span>
        )}
      </motion.button>
    </>
  );
}
