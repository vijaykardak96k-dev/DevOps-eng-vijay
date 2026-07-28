import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "var(--color-secondary)" }}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {description && <p className="mt-4 text-zinc-400 leading-relaxed">{description}</p>}
    </motion.div>
  );
}
