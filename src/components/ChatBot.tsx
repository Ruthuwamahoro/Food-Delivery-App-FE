"use client";

import { useState, useRef, useEffect } from "react";
import { playfair } from "@/data/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Send,
  Loader2,
  X,
  Sparkles,
  ChefHat,
  MessageCircleMore,
  RotateCcw,
  CircleDot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SUGGESTIONS } from "@/data/chatbot";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}



export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hello! I'm your kitchen assistant. Ask me anything about recipes, techniques, substitutions, or cooking tips.",
        },
      ]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function clearChat() {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Chat cleared! Ask me anything about cooking.",
      },
    ]);
  }

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();
      const reply =
        data?.content?.[0]?.text ?? "Sorry, I couldn't get a response.";

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TooltipProvider delayDuration={300}>
      {/* ── Floating pill FAB ── */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close chat" : "Open kitchen assistant"}
            size="lg"
            className={cn(
              "fixed bottom-6 right-6 z-50",
              "h-[52px] rounded-full pl-2 pr-5 gap-2.5",
              "shadow-xl shadow-black/20",
              "hover:scale-105 active:scale-95",
              "transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]",
              open && "pr-3"
            )}
          >
            {/* Icon circle */}
            <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              {open ? (
                <X className="w-4 h-4" />
              ) : (
                <ChefHat className="w-4 h-4" />
              )}
            </span>

            {/* Label animates away when open */}
            <span
              className={cn(
                "text-[13px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                open ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
              )}
            >
              Ask me anything
            </span>

            {/* Live dot */}
            {!open && (
              <CircleDot className="w-3 h-3 text-emerald-400 shrink-0" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{open ? "Close assistant" : "Open kitchen assistant"}</p>
        </TooltipContent>
      </Tooltip>

      {/* ── Chat panel ── */}
      <Card
        className={cn(
          "fixed bottom-[78px] right-6 z-50",
          "w-[360px] flex flex-col border-none",
          "rounded-[20px] overflow-hidden p-0",
          "shadow-2xl shadow-black/10",
          "transition-all duration-300 origin-bottom-right",
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        )}
      >
        {/* ── Header ── */}
        <CardHeader className="flex-row items-center gap-3 px-5 py-4 space-y-0 shrink-0">
          <Avatar className="h-10 w-10 rounded-[13px] shrink-0">
            <AvatarFallback className="rounded-[13px] bg-foreground text-background">
              <ChefHat className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p
              className={`${playfair.className} text-[15px] font-normal text-foreground leading-none mb-1`}
            >
              Kitchen Assistant
            </p>
            <div className="flex items-center gap-1.5">
              <Badge
                variant="secondary"
                className="h-auto py-0 px-1.5 text-[10px] font-medium gap-1 bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950 dark:text-amber-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                Online
              </Badge>
            </div>
          </div>

          {/* Clear chat */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full text-muted-foreground"
                onClick={clearChat}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Clear chat</p>
            </TooltipContent>
          </Tooltip>

          {/* Close */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full text-muted-foreground"
            onClick={() => setOpen(false)}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </CardHeader>

        <Separator />

        {/* ── Messages ── */}
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-[360px] px-4 py-4">
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-end gap-2",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {/* Bot avatar */}
                  {msg.role === "assistant" && (
                    <Avatar className="h-6 w-6 rounded-[8px] shrink-0 mb-0.5">
                      <AvatarFallback className="rounded-[8px] bg-foreground text-background text-[10px]">
                        <ChefHat className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      "max-w-[78%] px-4 py-2.5 text-[13px] leading-relaxed rounded-[18px]",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-[4px]"
                        : "bg-muted text-foreground rounded-bl-[4px]"
                    )}
                  >
                    {msg.content}
                  </div>

                  {/* User avatar */}
                  {msg.role === "user" && (
                    <Avatar className="h-6 w-6 rounded-[8px] shrink-0 mb-0.5">
                      <AvatarFallback className="rounded-[8px] bg-secondary text-secondary-foreground text-[10px] font-medium">
                        U
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <Avatar className="h-6 w-6 rounded-[8px] shrink-0">
                    <AvatarFallback className="rounded-[8px] bg-foreground text-background text-[10px]">
                      <ChefHat className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-[18px] rounded-bl-[4px] px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
                    <span className="text-[12px] text-muted-foreground">
                      Thinking…
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestion chips */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 mt-5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Sparkles className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                    Suggested
                  </span>
                </div>
                {SUGGESTIONS.map((s) => (
                  <Button
                    key={s.text}
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage(s.text)}
                    className="justify-start h-auto py-2.5 px-4 text-[12px] text-muted-foreground font-normal rounded-xl whitespace-normal text-left gap-2.5 hover:text-foreground"
                  >
                    <span className="text-base shrink-0">{s.icon}</span>
                    {s.text}
                  </Button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </ScrollArea>
        </CardContent>

        <Separator />

        {/* ── Input bar ── */}
        <CardFooter className="px-3.5 py-3 gap-2">
          <div className="flex-1 relative">
            <MessageCircleMore className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about any recipe…"
              className="pl-9 h-9 text-[13px] rounded-[10px]"
              disabled={loading}
            />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="h-9 w-9 shrink-0 rounded-[10px]"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Send message</p>
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}