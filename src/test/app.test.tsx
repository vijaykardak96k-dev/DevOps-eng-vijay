import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "../App";
import { projects } from "../data/projects";
import { validateContact } from "../../shared/validate.js";

const renderAt = (path: string) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

describe("navigation", () => {
  it("exposes every primary page and navigates", async () => {
    renderAt("/");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const name of [/Work/, /About/, /Skills/, /Journey/, /Resume/, /Contact/]) expect(within(nav).getByRole("link", { name })).toBeInTheDocument();
    await userEvent.click(within(nav).getByRole("link", { name: /Skills/ }));
    expect(screen.getByRole("heading", { level: 1, name: /what i know/i })).toBeInTheDocument();
  });
});

describe("projects", () => {
  it("renders all six projects with repo and case-study links", () => {
    renderAt("/projects");
    expect(projects).toHaveLength(6);
    for (const p of projects) {
      expect(screen.getByRole("link", { name: p.title })).toHaveAttribute("href", `/projects/${p.id}`);
    }
    expect(screen.getAllByRole("link", { name: /GitHub repository/ })).toHaveLength(6);
  });

  it("filters by tag", async () => {
    renderAt("/projects");
    await userEvent.click(screen.getByRole("button", { name: "CI/CD" }));
    expect(screen.getByText("1 of 6 projects")).toBeInTheDocument();
  });

  it.each(projects.map((p) => [p.id, p.title]))("detail route %s renders its case study", (id, title) => {
    renderAt(`/projects/${id}`);
    expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(12);
  });

  it("marks unverified sections instead of inventing content", () => {
    renderAt(`/projects/${projects[0].id}`);
    expect(screen.getAllByText(/Not documented yet/).length).toBeGreaterThan(0);
  });

  it("shows not-found for an unknown project", () => {
    renderAt("/projects/does-not-exist");
    expect(screen.getByRole("heading", { name: /doesn't exist/ })).toBeInTheDocument();
  });
});

describe("contact validation", () => {
  const ok = { name: "A", email: "a@b.co", subject: "Hi", message: "Long enough message" };
  it("accepts valid input", () => expect(validateContact(ok)).toEqual({}));
  it("flags each invalid field", () => {
    const e = validateContact({ name: " ", email: "bad", subject: "", message: "short" });
    expect(Object.keys(e).sort()).toEqual(["email", "message", "name", "subject"]);
  });
});

describe("contact form", () => {
  it("shows validation errors and does not call the API", async () => {
    const f = vi.fn(); vi.stubGlobal("fetch", f);
    renderAt("/contact");
    await userEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getAllByRole("alert").length).toBe(4);
    expect(f).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  async function fill() {
    await userEvent.type(screen.getByLabelText("Name"), "Asha");
    await userEvent.type(screen.getByLabelText("Email"), "asha@example.com");
    await userEvent.type(screen.getByLabelText("Subject"), "Hello");
    await userEvent.type(screen.getByLabelText("Message"), "A message that is long enough.");
    await userEvent.click(screen.getByRole("button", { name: "Send message" }));
  }

  it("shows success after a 201 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }));
    renderAt("/contact"); await fill();
    expect(await screen.findByText(/Your message was sent/)).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it("shows the server error message on failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "Temporarily unavailable." }) }));
    renderAt("/contact"); await fill();
    expect(await screen.findByText("Temporarily unavailable.")).toBeInTheDocument();
    vi.unstubAllGlobals();
  });
});
