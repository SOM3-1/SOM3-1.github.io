"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { routeNav } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

const homeSections = [
  "home",
  "experience-snapshot",
  "work-domains",
  "timeline",
  "detailed-experience",
  "flagship-projects",
  "skills",
  "recommendations",
  "contact",
];

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const observers = homeSections.map((id) => {
      const node = document.getElementById(id);
      if (!node) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: 0.01 },
      );
      observer.observe(node);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [pathname]);

  const links = useMemo(
    () =>
      pathname === "/"
        ? routeNav.map((item) =>
            item.href === "/"
              ? { label: "Home", href: "#home", active: activeSection === "home" }
              : item,
          )
        : routeNav,
    [pathname, activeSection],
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-300/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6"
        aria-label="Main navigation"
      >
        <Link href="/" className="font-semibold tracking-wide text-cyan-700 dark:text-cyan-300">
          DNG
        </Link>

        <button
          className="rounded-md border border-slate-400/40 px-3 py-1.5 text-sm text-slate-800 dark:border-white/20 dark:text-slate-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          Menu
        </button>

        <ul className="hidden items-center gap-5 text-sm text-slate-800 dark:text-slate-200 md:flex">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "transition hover:text-cyan-700 dark:hover:text-cyan-200",
                  pathname === item.href && "text-cyan-700 dark:text-cyan-300",
                  item.href === "#home" && activeSection === "home" && "text-cyan-700 dark:text-cyan-300",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-slate-300/70 bg-white px-4 py-3 text-slate-800 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 md:hidden">
          <ul className="space-y-2 text-sm">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-1.5" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
