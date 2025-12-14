import { useMemo, useState } from "react";
import type { Lang } from "../types/patterns";
import { patterns } from "../data/patterns";
import { getSelectedPattern } from "../utils/patterns";
import { PatternList } from "../components/PatternList";
import { PatternDetail } from "../components/PatternDetails";

export function PatternsPage() {
  const [lang, setLang] = useState<Lang>("es");
  const [selectedId, setSelectedId] = useState(patterns[0]?.id ?? "singleton");

  const selected = useMemo(() => getSelectedPattern(patterns, selectedId), [selectedId]);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1 px-2">
          <span className="text-lg font-semibold">Design Patterns</span>
        </div>
        <div className="flex-none px-2">
          <div className="join">
            <button
              className={`btn btn-sm join-item ${lang === "es" ? "btn-active" : ""}`}
              onClick={() => setLang("es")}
            >
              ES
            </button>
            <button
              className={`btn btn-sm join-item ${lang === "en" ? "btn-active" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-12 gap-4">
          <aside className="col-span-12 md:col-span-4 lg:col-span-3">
            <PatternList items={patterns} selectedId={selectedId} onSelect={setSelectedId} lang={lang} />
          </aside>

          <main className="col-span-12 md:col-span-8 lg:col-span-9">
            {selected ? <PatternDetail pattern={selected} lang={lang} /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}
