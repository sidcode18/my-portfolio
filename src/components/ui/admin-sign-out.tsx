import { LogOut } from "lucide-react";
import { signOutAction } from "@/app/admin/auth-actions";

export function AdminSignOut() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] text-muted transition-colors hover:bg-[#fef3f2] hover:text-[#b42318]"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </form>
  );
}
