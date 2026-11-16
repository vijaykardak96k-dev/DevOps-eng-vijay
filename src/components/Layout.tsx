import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Download, Mail, Menu, X } from "lucide-react";
import { profile } from "../data/site";
import { GithubIcon, LinkedinIcon } from "./Icons";

const nav = [
  { to: "/projects", label: "Work" },
  { to: "/skills", label: "Skills" },
  { to: "/journey", label: "Journey" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname; // closes automatically on navigation
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenFor(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cls = ({ isActive }: { isActive: boolean }) =>
    `mono text-xs uppercase tracking-wider py-1 border-b ${isActive ? "text-accent border-accent" : "border-transparent text-mute hover:text-text"}`;

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-accent focus:text-bg focus:px-3 focus:py-2">Skip to content</a>
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 h-16 flex items-center justify-between">
          <Link to="/" aria-label="Vijay Kardak, home" className="flex items-center gap-3">
            <span className="grid place-items-center size-9 bg-accent text-bg font-display font-bold text-xl leading-none">VK</span>
            <span className="hidden sm:block leading-tight"><span className="block font-display text-lg uppercase tracking-wide">Vijay Kardak</span><span className="tag block">DevOps / Cloud</span></span>
          </Link>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex gap-7">{nav.map((n) => <li key={n.to}><NavLink to={n.to} className={cls}>{n.label}</NavLink></li>)}</ul>
          </nav>
          <div className="flex items-center gap-3">
            <a href={profile.resume} download className="btn btn-line hidden md:inline-flex !py-2 text-sm"><Download className="size-4" aria-hidden />Resume</a>
            <button className="lg:hidden grid place-items-center size-10 border border-line" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpenFor(open ? null : pathname)}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-bg z-50 overflow-y-auto px-5 py-8">
            <ul>
              {nav.map((n, i) => (
                <li key={n.to} className="border-b border-line">
                  <NavLink to={n.to} className={({ isActive }) => `flex items-baseline gap-4 py-4 font-display text-4xl uppercase ${isActive ? "text-accent" : ""}`}>
                    <span className="mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>{n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <a href={profile.resume} download className="btn btn-solid mt-8"><Download className="size-4" aria-hidden />Download resume</a>
          </nav>
        )}
      </header>
      <motion.main id="main" key={pathname} className="flex-1" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Outlet />
      </motion.main>
      <footer className="border-t border-line mt-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 py-10 grid gap-8 md:grid-cols-3 items-end">
          <div><p className="font-display text-3xl uppercase">Vijay Kardak</p><p className="text-mute text-sm mt-1">Entry-level DevOps / Cloud Engineer · {profile.location}</p></div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm md:justify-center">
            <li><a className="link inline-flex items-center gap-2" href={profile.github} rel="noopener noreferrer"><GithubIcon />GitHub</a></li>
            <li><a className="link inline-flex items-center gap-2" href={profile.linkedin} rel="noopener noreferrer"><LinkedinIcon />LinkedIn</a></li>
            <li><a className="link inline-flex items-center gap-2" href={profile.dockerhub} rel="noopener noreferrer"><Container className="size-4" aria-hidden />Docker Hub</a></li>
            <li><a className="link inline-flex items-center gap-2" href={`mailto:${profile.email}`}><Mail className="size-4" aria-hidden />Email</a></li>
          </ul>
          <p className="tag md:text-right">Static site · React + Vite</p>
        </div>
      </footer>
    </div>
  );
}
