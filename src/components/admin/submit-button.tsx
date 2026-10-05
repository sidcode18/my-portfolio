"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

type SubmitButtonProps = {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
};

export function SubmitButton({
  children,
  pendingLabel,
  className = "btn btn-primary",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingLabel ?? "Saving…"}
        </>
      ) : (
        children
      )}
    </button>
  );
}
