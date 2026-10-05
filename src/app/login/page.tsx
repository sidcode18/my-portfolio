import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { auth, signIn } from "@/lib/auth";
import { LinkIcon } from "@/components/icons/link-icon";

const errorMessages: Record<string, string> = {
  AccessDenied: "That GitHub account is not authorized for this dashboard.",
  Configuration: "Authentication is misconfigured — check the GitHub OAuth credentials.",
  Verification: "That sign-in link has expired. Please try again.",
  OAuthSignin: "Could not start the GitHub sign-in flow. Please try again.",
  OAuthCallback: "GitHub rejected the sign-in attempt. Please try again.",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();

  if (session?.user) {
    redirect("/admin");
  }

  const { error } = await searchParams;
  const errorMessage = error
    ? (errorMessages[error] ?? `Sign-in failed (${error}). Please try again.`)
    : null;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to site
        </Link>

        <div className="panel rounded-2xl p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-muted font-mono text-sm font-semibold text-accent">
              &lt;/&gt;
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">sidcode18</p>
              <p className="text-xs text-faint">Admin access</p>
            </div>
          </div>

          <h1 className="mt-6 text-2xl">Sign in to continue</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The dashboard is restricted to the site owner. Authenticate with the authorized GitHub
            account.
          </p>

          {errorMessage ? (
            <p
              role="alert"
              className="mt-5 rounded-lg border border-[#b42318]/20 bg-[#fef3f2] px-3 py-2 text-xs leading-relaxed text-[#b42318]"
            >
              {errorMessage}
            </p>
          ) : null}

          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/admin" });
            }}
            className="mt-6"
          >
            <button type="submit" className="btn btn-primary w-full">
              <LinkIcon name="github" className="h-4 w-4" />
              Continue with GitHub
            </button>
          </form>

          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-faint">
            <ShieldCheck className="h-3.5 w-3.5 text-accent/70" />
            Sessions are JWT-based and email-gated
          </p>
        </div>
      </div>
    </div>
  );
}
