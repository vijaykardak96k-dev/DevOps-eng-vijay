export default function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-20 blur-3xl animate-float"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl animate-float"
        style={{ background: "radial-gradient(circle, var(--color-secondary), transparent 70%)", animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full opacity-10 blur-3xl animate-float"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)", animationDelay: "4s" }}
      />
    </div>
  );
}
