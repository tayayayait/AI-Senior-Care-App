import * as React from "react"
import { cn } from "@/lib/utils"
import { type Message } from "@/hooks/use-chat"

export interface AIChatProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: Message[]
  isTyping?: boolean
  className?: string
}

const TypingIndicator = () => (
  <div className="flex h-6 items-center space-x-1.5 px-2">
    <div className="typing-dot h-[6px] w-[6px] rounded-full bg-current" />
    <div className="typing-dot h-[6px] w-[6px] rounded-full bg-current" />
    <div className="typing-dot h-[6px] w-[6px] rounded-full bg-current" />
  </div>
)

export function AIChat({ messages, isTyping, className, ...props }: AIChatProps) {
  return (
    <div className={cn("flex flex-col space-y-5 w-full", className)} {...props}>
      {messages.map((message) => {
        const isUser = message.role === "user"
        return (
          <div
            key={message.id}
            className={cn("flex w-full flex-col", isUser ? "items-end" : "items-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-5 py-4 shadow-1 transition-all",
                isUser
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-card-foreground"
              )}
              style={{
                fontSize: "1.25rem",
                lineHeight: "1.9",
                wordBreak: "keep-all",
                whiteSpace: "pre-wrap",
                letterSpacing: "0.01em",
              }}
            >
              {message.text}
            </div>
            <span className="mt-1.5 text-[13px] text-muted-foreground px-1">
              {message.timestamp}
            </span>
          </div>
        )
      })}

      {isTyping && (
        <div className="flex w-full flex-col items-start">
          <div className="max-w-[85%] rounded-2xl border border-border bg-card px-5 py-4 text-card-foreground text-opacity-70 shadow-1 flex items-center h-14">
            <TypingIndicator />
          </div>
          <span className="mt-1.5 text-[13px] text-muted-foreground px-1">
            AI가 답변을 작성하고 있어요...
          </span>
        </div>
      )}
    </div>
  )
}
