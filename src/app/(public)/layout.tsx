import { ReactNode } from "react";
import { ParallaxBackground } from "@/components/parallax-background";
import { PublicNav } from "@/components/editorial/public-nav";
import { CommandPalette } from "@/components/ui/command-palette";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <ParallaxBackground />
      <PublicNav />
      <main className="relative mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      <CommandPalette />
    </div>
  );
}
