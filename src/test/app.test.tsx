import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { projects } from "../data/projects";
import { profile, skillGroups, techOverview } from "../data/site";

const renderAt = (path: string) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

describe("navigation", () => {
  it("exposes every page and navigates", async () => {
    renderAt("/");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const name of ["Work", "Skills", "Journey", "About", "Resume", "Contact"]) expect(within(nav).getByRole("link", { name })).toBeInTheDocument();
    await userEvent.click(within(nav).getByRole("link", { name: "Skills" }));
    expect(screen.getByRole("heading", { level: 1, name: /what i know/i })).toBeInTheDocument();
  });

  it("opens and closes the mobile menu", async () => {
    renderAt("/");
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const m = screen.getByRole("navigation", { name: "Mobile" });
    await userEvent.click(within(m).getByRole("link", { name: /About/ }));
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });
});

describe("home", () => {
  it("shows identity, resume download and all six projects", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Vijay\s*Kardak/);
    expect(screen.getAllByRole("link", { name: /Download resume/ })[0]).toHaveAttribute("href", "/resume.pdf");
    for (const p of projects) expect(screen.getByRole("link", { name: p.title })).toHaveAttribute("href", `/projects/${p.id}`);
  });
  it("tech overview only references known skills", () => {
    expect(techOverview).toHaveLength(6);
    const known = new Set(skillGroups.flatMap((g) => g.items.map((i) => i.name)));
    for (const g of techOverview) for (const i of g.items) expect(known.has(i.name)).toBe(true);
  });
});

describe("projects", () => {
  it("filters by tag", async () => {
    renderAt("/projects");
    expect(screen.getByText("6 of 6 projects")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "CI/CD" }));
    expect(screen.getByText("1 of 6 projects")).toBeInTheDocument();
  });
  it.each(projects.map((p) => [p.id, p.title]))("detail route %s renders", (id, title) => {
    renderAt(`/projects/${id}`);
    expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View repository/ })).toHaveAttribute("href", expect.stringContaining("github.com/vijaykardak96k-dev/"));
  });
  it("omits sections without data instead of showing placeholders", () => {
    renderAt(`/projects/${projects[0].id}`);
    expect(screen.queryByText(/not documented/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Implementation steps/ })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Architecture/ })).toBeInTheDocument();
  });
  it("shows not-found for unknown projects", () => {
    renderAt("/projects/nope");
    expect(screen.getByRole("heading", { name: "Not found" })).toBeInTheDocument();
  });
});

describe("contact", () => {
  it("offers plain links and no form", () => {
    renderAt("/contact");
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    for (const h of [`mailto:${profile.email}`, profile.github, profile.linkedin, profile.dockerhub, profile.whatsapp]) expect(hrefs).toContain(h);
    expect(document.querySelector("form")).toBeNull();
  });
});
