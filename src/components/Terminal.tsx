"use client";

import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const TERMINAL_COMMAND = "cat about_me.txt";
const EMPTY_OUTPUT = "No about_me.txt content configured yet.";

const CHAR_DELAY = 55;
const LINE_PAUSE = 550;
const OUTPUT_CHAR_DELAY = 16;

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
      <div className="overflow-hidden rounded-2xl border border-[#3A3936] bg-[#262624]">
        <div className="flex items-center justify-between border-b border-[#3A3936] px-4 py-2.5">
          <span className="font-mono text-xs text-[#B8B5AD]">about_me.txt — ~/profile</span>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#3A3936] px-2.5 py-1 font-mono text-xs text-[#B8B5AD] transition-colors hover:border-[#55534E] hover:text-[#E8E6DC]"
            aria-label="Replay typing animation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Replay</span>
          </button>
        </div>

        <div className="px-5 py-4 font-mono text-sm leading-relaxed">
          <p className="text-[#E8E6DC]">
            <span className="text-[#E08B6D]">sid@portfolio</span>
            <span className="text-[#7A776E]">:~$</span> {displayedCommand}
            {isPlaying && phase === "command" && displayedCommand.length < TERMINAL_COMMAND.length ? (
              <span className="caret ml-1" />
            ) : null}
          </p>
          {displayedOutput || phase !== "command" ? (
            <pre className="mt-3 whitespace-pre-wrap text-[#C9C6BC]">
              {displayedOutput}
              {isPlaying && phase === "output" && displayedOutput.length < output.length ? (
                <span className="caret ml-1" />
              ) : null}
            </pre>
          ) : null}
          {phase === "done" ? (
            <p className="mt-3">
              <span className="text-[#E08B6D]">sid@portfolio</span>
              <span className="text-[#7A776E]">:~$</span> <span className="caret" />
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
