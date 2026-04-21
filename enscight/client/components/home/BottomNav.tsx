"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Palette, Shield } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/studio", label: "Studio", icon: Sparkles },
  { href: "/atelier", label: "Atelier", icon: Palette },
  { href: "/sanctuary", label: "Sanctuary", icon: Shield },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-3 py-2 backdrop-blur-xl sm:inset-x-auto sm:left-1/2 sm:w-[520px] sm:-translate-x-1/2">
      <ul className="grid grid-cols-4 items-center">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href} className="flex justify-center">
              <Link
                href={href}
                className="group flex w-full flex-col items-center gap-1 rounded-xl py-2 text-[0.65rem] uppercase tracking-[0.22em] text-ens-platinum/80 transition-colors hover:text-ens-ultraviolet"
              >
                <Icon
                  size={17}
                  strokeWidth={1.7}
                  className={isActive ? "text-ens-ultraviolet" : "text-current"}
                />
                <span>{label}</span>
                <span
                  className={`h-[2px] w-8 rounded-full transition-colors ${
                    isActive ? "bg-ens-ultraviolet" : "bg-transparent group-hover:bg-ens-ultraviolet/70"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
