"use client";

import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { Award, Folder, Home, Lock } from "lucide-react";

const navItems = [
  { label: "About", href: "/", icon: Home },
  { label: "Selected Work", href: "/projects", icon: Folder },
  { label: "Certificates", href: "/certificates", icon: Award },
  { label: "Admin Login", href: "/login", icon: Lock },
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
      if (event.key === "Escape") {
        setOpen(false);
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
      className="fixed inset-0 z-50 bg-[#1f1e1d]/30 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <Command
        className="panel mx-auto mt-24 w-full max-w-xl overflow-hidden rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Command.Input
          className="w-full border-b border-line bg-transparent px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-faint"
          placeholder="Jump to..."
        />
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-faint">
            No results found.
          </Command.Empty>
          <Command.Group
            heading="Navigation"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:text-faint"
          >
            {navItems.map((item) => (
              <Command.Item
                key={item.href}
                className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition data-[selected=true]:bg-surface-muted data-[selected=true]:text-foreground"
                onSelect={() => {
                  setOpen(false);
                  router.push(item.href);
                }}
              >
                <item.icon className="h-4 w-4 text-faint transition-colors group-data-[selected=true]:text-accent-strong" />
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
          <span className="text-[11px] text-faint">Navigate</span>
          <span className="text-[11px] text-faint">Esc to close</span>
        </div>
      </Command>
    </div>
  );
}
