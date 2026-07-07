import { signIn } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ParallaxBackground } from "@/components/parallax-background";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <ParallaxBackground />
      <div className="glass-panel relative w-full max-w-md rounded-2xl p-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Secure Access</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground">Admin Login</h1>
        <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
          Sign in with GitHub. Only the authorized admin email can access the dashboard.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/admin" });
          }}
          className="mt-8"
        >
          <button type="submit" className="editorial-btn-primary w-full">
            Continue with GitHub
          </button>
        </form>
      </div>
    </div>
  );
}
