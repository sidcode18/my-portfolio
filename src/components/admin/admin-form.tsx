"use client";

import { useActionState, useEffect, useRef } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { initialActionState, type ActionState } from "@/lib/action-state";

type AdminFormProps = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  children: ReactNode;
  className?: string;
  resetOnSuccess?: boolean;
};

function FormStatus({ state }: { state: ActionState }) {
  if (state.status === "idle" || !state.message) {
    return null;
  }

  if (state.status === "error") {
    return (
      <p
        role="alert"
        className="flex items-start gap-2 rounded-lg border border-[#b42318]/20 bg-[#fef3f2] px-3 py-2 text-xs leading-relaxed text-[#b42318]"
      >
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {state.message}
      </p>
    );
  }

  return (
    <p
      role="status"
      className="flex items-start gap-2 rounded-lg border border-[#067647]/20 bg-[#ecfdf3] px-3 py-2 text-xs leading-relaxed text-[#067647]"
    >
      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      {state.message}
    </p>
  );
}

export function AdminForm({
  action,
  children,
  className,
  resetOnSuccess = false,
}: AdminFormProps) {
  const [state, formAction] = useActionState(action, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);
  const handledSavedAt = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (
      resetOnSuccess &&
      state.status === "success" &&
      state.savedAt !== undefined &&
      state.savedAt !== handledSavedAt.current
    ) {
      handledSavedAt.current = state.savedAt;
      formRef.current?.reset();
    }
  }, [resetOnSuccess, state]);

  return (
    <form ref={formRef} action={formAction} className={className}>
      {children}
      <FormStatus state={state} />
    </form>
  );
}

export { FormStatus };
