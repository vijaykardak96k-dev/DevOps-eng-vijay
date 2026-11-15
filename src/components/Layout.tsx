import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { profile } from "../data/site";

const nav = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/journey", label: "Journey" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const { pathname } = useLocation();
  // Menu state is tied to the path it was opened on, so navigating closes it without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const cls = ({ isActive }: { isActive: boolean }) =>
    `block py-1 text-sm ${isActive ? "text-accent border-b border-accent" : "text-ink hover:text-accent"}`;

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-ink focus:text-paper focus:px-3 focus:py-2">Skip to content</a>
      <header className="border-b border-ink">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-tight">Vijay Kardak<span className="label ml-3 hidden sm:inline">DevOps / Cloud</span></Link>
          <button className="md:hidden label border border-ink px-3 py-1.5" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpenFor(open ? null : pathname)}>
            {open ? "Close" : "Menu"}
          </button>
          <nav id="site-nav" aria-label="Primary" className={`${open ? "block" : "hidden"} absolute left-0 right-0 top-[57px] z-40 bg-paper border-b border-ink px-5 py-4 md:static md:block md:border-0 md:p-0 md:bg-transparent`}>
            <ul className="flex flex-col gap-2 md:flex-row md:gap-7">
              {nav.map((n, i) => (
                <li key={n.to}><NavLink to={n.to} className={cls}><span className="label mr-1.5">{String(i + 1).padStart(2, "0")}</span>{n.label}</NavLink></li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="flex-1"><Outlet /></main>
      <footer className="border-t border-ink mt-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-8 grid gap-6 md:grid-cols-3 text-sm">
          <p className="text-graphite">Vijay Kardak. Entry-level DevOps &amp; Cloud Engineer, {profile.location}.</p>
          <ul className="flex gap-5">
            <li><a className="link" href={profile.github} rel="noopener noreferrer">GitHub</a></li>
            <li><a className="link" href={profile.linkedin} rel="noopener noreferrer">LinkedIn</a></li>
            <li><a className="link" href={`mailto:${profile.email}`}>Email</a></li>
          </ul>
          <p className="label md:text-right">Set in Fraunces, Inter &amp; JetBrains Mono</p>
        </div>
      </footer>
    </div>
  );
}
