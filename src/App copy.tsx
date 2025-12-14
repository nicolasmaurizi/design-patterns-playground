import { useMemo, useState } from "react";
import type { Lang, DesignPattern } from "./types/patterns";
import { patterns } from "./data/patterns";
import { CodeBlock } from "./components/CodeBlock";

import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

type Tab = "about" | "dotnet" | "react";

function PatternList(props: {
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
					<h3 className="font-semibold">
						{lang === "es" ? "Patrones" : "Patterns"}
					</h3>
				</div>

				<ul className="menu bg-base-100 rounded-box">
					{items.map((p) => {
						const active = p.id === selectedId;
						const title = p.content[lang].title;
						const summary = p.content[lang].summary;

						return (
							<li key={p.id}>
								<button
									className={active ? "active" : ""}
									onClick={() => onSelect(p.id)}
								>
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

function CodeBlockView(props: {
	title: string;
	code: string;
	language: "csharp" | "tsx" | "ts" | "js";
	lang: Lang;
}) {
	const { title, code, language, lang } = props;
	const [showToast, setShowToast] = useState(false);

	const copy = async () => {
		await navigator.clipboard.writeText(code);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 1200);
	};

	return (
		<div className="relative space-y-2">
			<div className="flex items-center justify-between">
				<h4 className="font-semibold">{title}</h4>

				<button
					className="btn btn-sm btn-outline tooltip"
					data-tip={
						lang === "es" ? "Copiar al portapapeles" : "Copy to clipboard"
					}
					onClick={copy}
				>
					{lang === "es" ? "Copiar" : "Copy"}
				</button>
			</div>

			<CodeBlock code={code} language={language as any} />

			{showToast && (
				<div className="toast toast-end fixed z-[9999]">
					<div className="alert alert-success shadow-lg">
						<span>
							{lang === "es"
								? "Copiado al portapapeles"
								: "Copied to clipboard"}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}

function PatternDetail(props: { pattern: DesignPattern; lang: Lang }) {
	const { pattern, lang } = props;
	const [tab, setTab] = useState<Tab>("about");

	const c = pattern.content[lang];

	return (
		<div className="card bg-base-100 shadow">
			<div className="card-body gap-4">
				<div className="flex items-start justify-between gap-3">
					<div>
						<div className="flex items-center gap-2">
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

					<div className="flex flex-wrap gap-2 sm:join sm:gap-0">
						<button
							className={`btn btn-sm sm:join-item ${
								tab === "about" ? "btn-active" : ""
							}`}
							onClick={() => setTab("about")}
						>
							{lang === "es" ? "Explicación" : "About"}
						</button>

						<button
							className={`btn btn-sm sm:join-item ${
								tab === "dotnet" ? "btn-active" : ""
							}`}
							onClick={() => setTab("dotnet")}
						>
							.NET
						</button>

						<button
							className={`btn btn-sm sm:join-item ${
								tab === "react" ? "btn-active" : ""
							}`}
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
							<h3 className="font-semibold">
								{lang === "es" ? "Problema" : "Problem"}
							</h3>
							<p className="opacity-80">{c.problem}</p>
						</div>

						<div>
							<h3 className="font-semibold">
								{lang === "es" ? "Solución" : "Solution"}
							</h3>
							<p className="opacity-80">{c.solution}</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
							<div className="rounded-box bg-base-200 p-4">
								<h4 className="font-semibold">
									{lang === "es" ? "Cuándo usar" : "When to use"}
								</h4>
								<ul className="list-disc pl-5 mt-2 space-y-1 opacity-80">
									{c.whenToUse.map((x) => (
										<li key={x}>{x}</li>
									))}
								</ul>
							</div>

							<div className="rounded-box bg-base-200 p-4">
								<h4 className="font-semibold">
									{lang === "es" ? "Pros / Contras" : "Pros / Cons"}
								</h4>
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

export default function App() {
	const [lang, setLang] = useState<Lang>("es");
	const [selectedId, setSelectedId] = useState<string>(
		patterns[0]?.id ?? "singleton"
	);

	const selected = useMemo(
		() => patterns.find((p) => p.id === selectedId) ?? patterns[0],
		[selectedId]
	);

	return (
		<div className="min-h-screen bg-base-200">
			<div className="navbar bg-base-100 shadow-sm">
				<div className="flex-1 px-2">
					<span className="text-lg font-semibold">Design Patterns</span>
				</div>

				<div className="flex-none px-2">
					<div className="join">
						<button
							className={`btn btn-sm join-item ${
								lang === "es" ? "btn-active" : ""
							}`}
							onClick={() => setLang("es")}
						>
							ES
						</button>
						<button
							className={`btn btn-sm join-item ${
								lang === "en" ? "btn-active" : ""
							}`}
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
						<PatternList
							items={patterns}
							selectedId={selected?.id ?? ""}
							onSelect={setSelectedId}
							lang={lang}
						/>
					</aside>

					<main className="col-span-12 md:col-span-8 lg:col-span-9">
						{selected ? <PatternDetail pattern={selected} lang={lang} /> : null}
					</main>
				</div>
			</div>
		</div>
	);
}
