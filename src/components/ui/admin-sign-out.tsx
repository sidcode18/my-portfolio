import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";

export function AdminSignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-muted transition hover:bg-white/40 hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </form>
  );
}
