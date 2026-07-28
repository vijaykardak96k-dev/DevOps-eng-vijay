import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-grid">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl glass">
          <Terminal size={26} style={{ color: "var(--color-secondary)" }} />
        </div>
        <h1 className="font-display text-gradient text-7xl font-bold">404</h1>
        <p className="mt-3 font-mono text-sm text-zinc-500">$ kubectl get route --route=this-page</p>
        <p className="mt-1 text-sm text-zinc-500">Error: NotFound — the route you requested doesn't exist in this cluster.</p>
        <Link
          to="/"
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
        >
          <Home size={15} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
