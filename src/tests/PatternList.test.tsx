import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import userEvent from "@testing-library/user-event";
import { PatternList } from "../components/PatternList";
import type { DesignPattern } from "../types/patterns";

const items: DesignPattern[] = [
  {
    id: "singleton",
    category: "Creational",
    content: {
      es: { title: "Singleton", summary: "Uno", problem: "", solution: "", whenToUse: [], pros: [], cons: [] },
      en: { title: "Singleton", summary: "One", problem: "", solution: "", whenToUse: [], pros: [], cons: [] },
    },
    examples: { dotnet: [], react: [] },
  },
  {
    id: "factory",
    category: "Creational",
    content: {
      es: { title: "Factory", summary: "Dos", problem: "", solution: "", whenToUse: [], pros: [], cons: [] },
      en: { title: "Factory", summary: "Two", problem: "", solution: "", whenToUse: [], pros: [], cons: [] },
    },
    examples: { dotnet: [], react: [] },
  },
];

describe("PatternList", () => {
  it("renderiza títulos según idioma", () => {
    render(<PatternList items={items} selectedId="singleton" onSelect={() => {}} lang="es" />);
    expect(screen.getByText("Singleton")).toBeInTheDocument();
    expect(screen.getByText("Factory")).toBeInTheDocument();
    expect(screen.getByText("Patrones")).toBeInTheDocument();
  });

  it("al hacer click llama onSelect con el id", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<PatternList items={items} selectedId="singleton" onSelect={onSelect} lang="es" />);

    await user.click(screen.getByRole("button", { name: /Factory/i }));
    expect(onSelect).toHaveBeenCalledWith("factory");
  });
});
