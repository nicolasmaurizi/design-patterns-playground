export type Lang = "es" | "en";

export type PatternCategory =
  | "Creational"
  | "Structural"
  | "Behavioral";

export type CodeLanguage = "csharp" | "tsx" | "ts" | "js";

export interface CodeExample {
  title: string;
  language: CodeLanguage;
  code: string;
}

export interface PatternContent {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  whenToUse: string[];
  pros: string[];
  cons: string[];
}

export interface DesignPattern {
  id: string;
  category: PatternCategory;
  keywords?: string[];
  content: Record<Lang, PatternContent>;
  examples: {
    dotnet: CodeExample[];
    react: CodeExample[];
  };
}
