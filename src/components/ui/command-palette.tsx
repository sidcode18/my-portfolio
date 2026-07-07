"use client";

import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Login", href: "/login" },
  { label: "Admin", href: "/admin" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/15 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <Command
        className="glass-panel mx-auto mt-24 w-full max-w-xl overflow-hidden rounded-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Command.Input
          className="w-full border-b border-foreground/10 bg-transparent px-4 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted"
          placeholder="Type a command or search..."
        />
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-2 font-mono text-sm text-muted">
            No results found.
          </Command.Empty>
          <Command.Group heading="Navigation" className="font-mono text-xs uppercase tracking-widest text-muted">
            {navItems.map((item) => (
              <Command.Item
                key={item.href}
                className="cursor-pointer rounded-md px-3 py-2 font-mono text-sm text-foreground hover:bg-white/50"
                onSelect={() => {
                  setOpen(false);
                  router.push(item.href);
                }}
              >
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
