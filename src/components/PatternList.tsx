import type { DesignPattern, Lang } from "../types/patterns";

export function PatternList(props: {
  items: DesignPattern[];
  selectedId: string;
  onSelect: (id: string) => void;
  lang: Lang;
}) {
  const { items, selectedId, onSelect, lang } = props;

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{lang === "es" ? "Patrones" : "Patterns"}</h3>
        </div>

        <ul className="menu bg-base-100 rounded-box">
          {items.map((p) => {
            const active = p.id === selectedId;
            const title = p.content[lang].title;
            const summary = p.content[lang].summary;

            return (
              <li key={p.id}>
                <button className={active ? "active" : ""} onClick={() => onSelect(p.id)}>
                  <span className="font-medium">{title}</span>

                  <span className="text-xs opacity-70 flex items-center gap-2">
                    <span
                      className={`badge badge-xs badge-outline ${
                        p.category === "Creational"
                          ? "badge-primary"
                          : p.category === "Structural"
                          ? "badge-secondary"
                          : "badge-accent"
                      }`}
                    >
                      {p.category}
                    </span>
                    {summary}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
