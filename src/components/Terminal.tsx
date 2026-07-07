"use client";

import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const TERMINAL_COMMAND = "sid@nit-delhi:~$ cat about_me.txt";
const EMPTY_OUTPUT = "No about_me.txt content configured yet.";

const CHAR_DELAY = 62;
const LINE_PAUSE = 650;
const OUTPUT_CHAR_DELAY = 24;

type TerminalProps = {
  aboutText: string;
};

export function Terminal({ aboutText }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState("");
  const [phase, setPhase] = useState<"command" | "output" | "done">("command");

  const output = useMemo(() => aboutText.trim() || EMPTY_OUTPUT, [aboutText]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || hasEnteredView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          setIsPlaying(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  const restart = useCallback(() => {
    setDisplayedCommand("");
    setDisplayedOutput("");
    setPhase("command");
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    if (phase === "command") {
      if (displayedCommand.length < TERMINAL_COMMAND.length) {
        const timer = setTimeout(() => {
          setDisplayedCommand(TERMINAL_COMMAND.slice(0, displayedCommand.length + 1));
        }, CHAR_DELAY);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("output"), LINE_PAUSE);
      return () => clearTimeout(timer);
    }

    if (phase === "output") {
      if (displayedOutput.length < output.length) {
        const timer = setTimeout(() => {
          setDisplayedOutput(output.slice(0, displayedOutput.length + 1));
        }, OUTPUT_CHAR_DELAY);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => {
        setPhase("done");
        setIsPlaying(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [displayedCommand, displayedOutput, output, phase, isPlaying]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="glass-panel relative rounded-r-xl border-l-[3px] border-l-accent px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">About Me</p>
          <button
            type="button"
            onClick={restart}
            className="editorial-btn-ghost flex items-center gap-1.5 !px-2.5 !py-1.5"
            aria-label="Replay typing animation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline"></span>
          </button>
        </div>

        <div className="mt-3 font-mono text-sm leading-relaxed text-foreground/90">
          <p>
            {displayedCommand}
            {isPlaying && phase === "command" && displayedCommand.length < TERMINAL_COMMAND.length ? (
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent" />
            ) : null}
          </p>
          {displayedOutput || phase !== "command" ? (
            <pre className="mt-3 whitespace-pre-wrap text-foreground/75">
              {displayedOutput}
              {isPlaying && phase === "output" && displayedOutput.length < output.length ? (
                <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent" />
              ) : null}
            </pre>
          ) : null}
          {phase === "done" ? (
            <p className="mt-2 text-accent">
              <span className="animate-pulse">▊</span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
