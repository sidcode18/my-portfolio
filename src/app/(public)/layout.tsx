import { ReactNode } from "react";
import { PublicNav } from "@/components/editorial/public-nav";
import { SiteFooter } from "@/components/editorial/site-footer";
import { CommandPalette } from "@/components/ui/command-palette";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PublicNav />
      <main className="relative mx-auto w-full max-w-6xl flex-1 px-6 py-12">{children}</main>
      <SiteFooter />
      <CommandPalette />
    </div>
  );
}
