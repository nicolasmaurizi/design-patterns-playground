import { useEffect, useRef } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

import type { CodeLanguage } from "../types/patterns";

export function CodeBlock(props: {
  code: string;
  language: CodeLanguage;
}) {
  const { code, language } = props;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, [code, language]);

  return (
    <pre className="rounded-box bg-neutral text-neutral-content p-4 text-sm overflow-x-auto">
      <code ref={ref} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
}
