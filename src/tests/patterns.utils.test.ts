import { describe, it, expect } from "vitest";
import { getSelectedPattern } from "../utils/patterns";
import type { DesignPattern } from "../types/patterns";

const mock: DesignPattern[] = [
  {
    id: "a",
    category: "Creational",
    content: {
      es: { title: "A", summary: "", problem: "", solution: "", whenToUse: [], pros: [], cons: [] },
      en: { title: "A", summary: "", problem: "", solution: "", whenToUse: [], pros: [], cons: [] },
    },
    examples: { dotnet: [], react: [] },
  },
  {
    id: "b",
    category: "Structural",
    content: {
      es: { title: "B", summary: "", problem: "", solution: "", whenToUse: [], pros: [], cons: [] },
      en: { title: "B", summary: "", problem: "", solution: "", whenToUse: [], pros: [], cons: [] },
    },
    examples: { dotnet: [], react: [] },
  },
];

describe("getSelectedPattern", () => {
  it("devuelve el patrón por id", () => {
    expect(getSelectedPattern(mock, "b")?.id).toBe("b");
  });

  it("si no existe, devuelve el primero", () => {
    expect(getSelectedPattern(mock, "x")?.id).toBe("a");
  });

  it("si no hay patrones, devuelve null", () => {
    expect(getSelectedPattern([], "a")).toBeNull();
  });
});
