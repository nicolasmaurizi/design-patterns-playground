import type { DesignPattern } from "../types/patterns";

export function getSelectedPattern(patterns: DesignPattern[], selectedId: string) {
  return patterns.find((p) => p.id === selectedId) ?? patterns[0] ?? null;
}
