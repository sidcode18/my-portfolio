import Link from "next/link";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/40 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-foreground transition hover:text-accent"
        >
          Sid.dev
        </Link>
        <nav className="flex items-center gap-5 font-mono text-xs uppercase tracking-widest text-muted">
          <Link href="/" className="transition hover:text-foreground">
            Home
          </Link>
          <Link href="/login" className="transition hover:text-foreground">
            Admin
          </Link>
          <span className="hidden rounded-md border border-neutral-200 bg-white/50 px-2.5 py-1 sm:inline">
            Cmd/Ctrl + K
          </span>
        </nav>
      </div>
    </header>
  );
}
