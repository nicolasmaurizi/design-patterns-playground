import { useState } from "react";
import type { DesignPattern, Lang } from "../types/patterns";
import { CodeBlockView } from "./CodeBlockView";

type Tab = "about" | "dotnet" | "react";

export function PatternDetail(props: { pattern: DesignPattern; lang: Lang }) {
  const { pattern, lang } = props;
  const [tab, setTab] = useState<Tab>("about");

  const c = pattern.content[lang];

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="card-title">{c.title}</h2>

              <span
                className={`badge badge-outline ${
                  pattern.category === "Creational"
                    ? "badge-primary"
                    : pattern.category === "Structural"
                    ? "badge-secondary"
                    : "badge-accent"
                }`}
              >
                {pattern.category}
              </span>
            </div>

            <p className="text-sm opacity-70">{c.summary}</p>
          </div>

          {/* Responsive: wrap en mobile, join en sm+ */}
          <div className="flex flex-wrap gap-2 sm:join sm:gap-0">
            <button
              className={`btn btn-sm sm:join-item tooltip transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md ${
                tab === "about" ? "btn-active" : ""
              }`}
              data-tip={lang === "es" ? "Explicación del patrón" : "Pattern explanation"}
              onClick={() => setTab("about")}
            >
              {lang === "es" ? "Explicación" : "About"}
            </button>

            <button
              className={`btn btn-sm sm:join-item tooltip transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md ${
                tab === "dotnet" ? "btn-active" : ""
              }`}
              data-tip={lang === "es" ? "Ejemplo en C#/.NET" : "C#/.NET example"}
              onClick={() => setTab("dotnet")}
            >
              .NET
            </button>

            <button
              className={`btn btn-sm sm:join-item tooltip transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md ${
                tab === "react" ? "btn-active" : ""
              }`}
              data-tip={lang === "es" ? "Ejemplo en React/TS" : "React/TS example"}
              onClick={() => setTab("react")}
            >
              React
            </button>
          </div>
        </div>

        <div className="divider my-0" />

        {tab === "about" ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{lang === "es" ? "Problema" : "Problem"}</h3>
              <p className="opacity-80">{c.problem}</p>
            </div>

            <div>
              <h3 className="font-semibold">{lang === "es" ? "Solución" : "Solution"}</h3>
              <p className="opacity-80">{c.solution}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="rounded-box bg-base-200 p-4">
                <h4 className="font-semibold">{lang === "es" ? "Cuándo usar" : "When to use"}</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 opacity-80">
                  {c.whenToUse.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-box bg-base-200 p-4">
                <h4 className="font-semibold">{lang === "es" ? "Pros / Contras" : "Pros / Cons"}</h4>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <ul className="list-disc pl-5 space-y-1 opacity-80">
                    {c.pros.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <ul className="list-disc pl-5 space-y-1 opacity-80">
                    {c.cons.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : tab === "dotnet" ? (
          <div className="space-y-6">
            {pattern.examples.dotnet.map((b) => (
              <CodeBlockView
                key={b.title}
                title={b.title}
                code={b.code}
                language={b.language}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {pattern.examples.react.map((b) => (
              <CodeBlockView
                key={b.title}
                title={b.title}
                code={b.code}
                language={b.language}
                lang={lang}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
