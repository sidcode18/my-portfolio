export type ActionState = {
  status: "idle" | "success" | "error";
  message: string | null;
  savedAt?: number;
};

export const initialActionState: ActionState = { status: "idle", message: null };
