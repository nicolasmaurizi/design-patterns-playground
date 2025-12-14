import { useState } from "react";
import type { Lang, CodeLanguage } from "../types/patterns";
import { CodeBlock } from "./CodeBlock";

interface Props {
  title: string;
  code: string;
  language: CodeLanguage;
  lang: Lang;
}

export function CodeBlockView({ title, code, language, lang }: Props) {
  const [showToast, setShowToast] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  return (
    <div className="relative space-y-2">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-semibold truncate">{title}</h4>

        <button
          className="btn btn-sm btn-outline tooltip"
          data-tip={lang === "es" ? "Copiar al portapapeles" : "Copy to clipboard"}
          onClick={copy}
        >
          {lang === "es" ? "Copiar" : "Copy"}
        </button>
      </div>

      {/* CodeBlock ya renderiza <pre><code> */}
      <CodeBlock code={code} language={language} />

      {showToast && (
        <div className="toast toast-end fixed z-[9999]">
          <div className="alert alert-success shadow-lg">
            <span>
              {lang === "es" ? "Copiado al portapapeles" : "Copied to clipboard"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
