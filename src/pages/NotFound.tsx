import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";

export default function NotFound() {
  useSeo("Page not found", "The page you requested does not exist.", "/404");
  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8 pt-20">
      <p className="label">404</p>
      <h1 className="text-5xl mt-3">That page doesn't exist.</h1>
      <p className="mt-4"><Link className="link" to="/projects">Browse the projects →</Link></p>
    </div>
  );
}
