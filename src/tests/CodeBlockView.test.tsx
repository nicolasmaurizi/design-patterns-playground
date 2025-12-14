import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CodeBlockView } from "../components/CodeBlockView";

describe("CodeBlockView", () => {
  it("renderiza el botón", () => {
    render(
      <CodeBlockView
        title="Ejemplo"
        code="console.log('hola')"
        language="ts"
        lang="es"
      />
    );

    expect(screen.getByRole("button", { name: /Copiar/i })).toBeInTheDocument();
  });
});
