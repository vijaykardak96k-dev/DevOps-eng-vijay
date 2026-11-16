import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";

export default function NotFound() {
  useSeo("Page not found", "The page you requested does not exist.", "/404");
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-8 pt-24">
      <p className="tag text-accent">404</p>
      <h1 className="text-6xl sm:text-7xl md:text-9xl mt-3">Not found</h1>
      <p className="mt-6"><Link className="link" to="/projects">Browse the projects →</Link></p>
    </div>
  );
}
