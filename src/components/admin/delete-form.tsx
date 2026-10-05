"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { initialActionState, type ActionState } from "@/lib/action-state";

type DeleteFormProps = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  id: string;
  label?: string;
  confirmMessage?: string;
};

export function DeleteForm({
  action,
  id,
  label = "Delete",
  confirmMessage = "Delete this item? This cannot be undone.",
}: DeleteFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialActionState);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
      className="flex flex-wrap items-center gap-3"
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={isPending} className="btn btn-danger btn-sm">
        <Trash2 className="h-3.5 w-3.5" />
        {isPending ? "Deleting…" : label}
      </button>
      {state.status === "error" && state.message ? (
        <span className="text-[0.7rem] text-[#b42318]">{state.message}</span>
      ) : null}
    </form>
  );
}
