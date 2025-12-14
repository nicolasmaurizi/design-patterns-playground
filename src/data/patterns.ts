import type { DesignPattern } from "../types/patterns";

export const patterns: DesignPattern[] = [
  {
    id: "singleton",
    category: "Creational",
    keywords: ["instance", "global", "configuration", "logger"],
    content: {
      es: {
        title: "Singleton",
        summary:
          "Asegura que una clase tenga una única instancia y provee un punto de acceso global a ella.",
        problem:
          "Necesitás un objeto único (config, logger, caché) y querés controlar su creación para evitar múltiples instancias.",
        solution:
          "Encapsular el constructor y exponer un método/propiedad estática para obtener la instancia única.",
        whenToUse: [
          "Cuando una sola instancia es necesaria (configuración, logging).",
          "Cuando querés lazy init y control del ciclo de vida."
        ],
        pros: [
          "Controla la creación de instancia.",
          "Acceso global (cómodo).",
          "Puede inicializarse de forma lazy."
        ],
        cons: [
          "Puede ocultar dependencias (anti-pattern si se abusa).",
          "Dificulta testing si se usa como global.",
          "Puede convertirse en estado compartido acoplante."
        ]
      },
      en: {
        title: "Singleton",
        summary:
          "Ensures a class has only one instance and provides a global access point to it.",
        problem:
          "You need a single shared object (config, logger, cache) and want to control its creation to avoid multiple instances.",
        solution:
          "Hide the constructor and expose a static accessor to retrieve the single instance.",
        whenToUse: [
          "When exactly one instance is needed (configuration, logging).",
          "When you want lazy init and lifecycle control."
        ],
        pros: [
          "Controls instance creation.",
          "Convenient global access.",
          "Can be lazily initialized."
        ],
        cons: [
          "Can hide dependencies (abuse becomes an anti-pattern).",
          "Harder to test when treated as a global.",
          "Shared state can increase coupling."
        ]
      }
    },
    examples: {
      dotnet: [
        {
          title: "C# (.NET) - Lazy Singleton thread-safe",
          language: "csharp",
          code: `using System;

public sealed class AppConfig
{
    private static readonly Lazy<AppConfig> _instance =
        new(() => new AppConfig());

    public static AppConfig Instance => _instance.Value;

    // Ejemplo de config
    public string EnvironmentName { get; private set; } = "Development";

    private AppConfig() { } // Constructor privado

    public void SetEnvironment(string env) => EnvironmentName = env;
}

// Uso:
// var cfg = AppConfig.Instance;
// cfg.SetEnvironment("Production");`
        }
      ],
      react: [
        {
          title: "React/TS - Singleton de servicio (sin estado UI)",
          language: "ts",
          code: `// services/logger.ts
export class Logger {
  private static _instance: Logger | null = null;

  static instance(): Logger {
    if (!Logger._instance) Logger._instance = new Logger();
    return Logger._instance;
  }

  private constructor() {}

  info(message: string) {
    console.log("[INFO]", message);
  }
}

// Uso:
const logger = Logger.instance();
logger.info("Hello");`
        },
        {
          title: "React - Mejor práctica: inyectar por Context (evita 'global')",
          language: "tsx",
          code: `import React, { createContext, useContext, useMemo } from "react";
import { Logger } from "./services/logger";

type LoggerCtx = { logger: Logger };
const LoggerContext = createContext<LoggerCtx | null>(null);

export function LoggerProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => ({ logger: Logger.instance() }), []);
  return <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>;
}

export function useLogger(): Logger {
  const ctx = useContext(LoggerContext);
  if (!ctx) throw new Error("useLogger must be used within LoggerProvider");
  return ctx.logger;
}

// Uso:
// <LoggerProvider><App/></LoggerProvider>
// const logger = useLogger();`
        }
      ]
    }
  }
  
  // 2) Factory Method
  ,{
    id: "factory-method",
    category: "Creational",
    content: {
      es: {
        title: "Factory Method",
        summary: "Crea objetos sin acoplarte a clases concretas.",
        problem: "Necesitás instanciar objetos, pero no querés acoplar la lógica a clases concretas ni ensuciar el código con if/switch por tipo.",
        solution: "Definís un método fábrica en una clase base/interfaz y las subclases deciden qué objeto concreto crear.",
        whenToUse: [
          "Variantes de un producto según contexto",
          "Eliminar if/switch de creación",
          "Extender tipos sin tocar código existente",
        ],
        pros: ["Reduce acoplamiento", "Facilita extensión", "Centraliza creación"],
        cons: ["Más clases/abstracciones", "Puede sobre-ingenierizarse"],
      },
      en: {
        title: "Factory Method",
        summary: "Creates objects without coupling to concrete classes.",
        problem: "You need to instantiate objects but want to avoid coupling creation logic to concrete classes and avoid big if/switch blocks.",
        solution: "Define a factory method in a base type; subclasses decide which concrete product to create.",
        whenToUse: [
          "Multiple product variants",
          "Remove if/switch from creation",
          "Extend types without modifying existing code",
        ],
        pros: ["Lower coupling", "Easy to extend", "Centralized creation"],
        cons: ["More abstractions", "Can be overkill"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Factory Method (.NET)",
          language: "csharp",
          code: `public interface INotification { void Send(string to, string msg); }

public sealed class EmailNotification : INotification {
    public void Send(string to, string msg) => Console.WriteLine($"Email to {to}: {msg}");
}

public sealed class SmsNotification : INotification {
    public void Send(string to, string msg) => Console.WriteLine($"SMS to {to}: {msg}");
}

public abstract class NotificationCreator {
    public abstract INotification Create();
    public void Notify(string to, string msg) => Create().Send(to, msg);
}

public sealed class EmailCreator : NotificationCreator {
    public override INotification Create() => new EmailNotification();
}

public sealed class SmsCreator : NotificationCreator {
    public override INotification Create() => new SmsNotification();
}`,
        },
      ],
      react: [
        {
          title: "Factory Method (TS)",
          language: "ts",
          code: `type Notifier = { send(to: string, msg: string): void };

class EmailNotifier implements Notifier {
  send(to: string, msg: string) { console.log("Email", to, msg); }
}
class SmsNotifier implements Notifier {
  send(to: string, msg: string) { console.log("SMS", to, msg); }
}

abstract class NotifierCreator {
  abstract create(): Notifier;
  notify(to: string, msg: string) { this.create().send(to, msg); }
}

class EmailCreator extends NotifierCreator { create() { return new EmailNotifier(); } }
class SmsCreator extends NotifierCreator { create() { return new SmsNotifier(); } }`,
        },
      ],
    },
    keywords: []
  },

  // 3) Abstract Factory
  {
    id: "abstract-factory",
    category: "Creational",
    content: {
      es: {
        title: "Abstract Factory",
        summary: "Crea familias de objetos relacionados.",
        problem: "Necesitás crear conjuntos de objetos compatibles entre sí (familias) sin acoplarte a implementaciones concretas.",
        solution: "Definís una fábrica abstracta con métodos para cada producto; cada fábrica concreta crea una familia consistente.",
        whenToUse: [
          "Temas/UI (light/dark) con componentes consistentes",
          "Drivers/proveedores intercambiables",
          "Evitar mezclar productos incompatibles",
        ],
        pros: ["Consistencia de familias", "Intercambio de proveedor", "Reduce acoplamiento"],
        cons: ["Más interfaces/clases", "Agregar un producto nuevo es costoso"],
      },
      en: {
        title: "Abstract Factory",
        summary: "Creates families of related objects.",
        problem: "You need to create compatible sets of objects (families) without coupling to concrete implementations.",
        solution: "Define an abstract factory with methods per product; concrete factories create consistent families.",
        whenToUse: [
          "UI themes (light/dark) with consistent components",
          "Swappable providers/drivers",
          "Avoid mixing incompatible products",
        ],
        pros: ["Family consistency", "Swappable provider", "Lower coupling"],
        cons: ["More types", "Adding new products is harder"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Abstract Factory (.NET)",
          language: "csharp",
          code: `public interface IButton { string Render(); }
public interface ITextBox { string Render(); }

public sealed class LightButton : IButton { public string Render() => "LightButton"; }
public sealed class LightTextBox : ITextBox { public string Render() => "LightTextBox"; }

public sealed class DarkButton : IButton { public string Render() => "DarkButton"; }
public sealed class DarkTextBox : ITextBox { public string Render() => "DarkTextBox"; }

public interface IUiFactory {
    IButton CreateButton();
    ITextBox CreateTextBox();
}

public sealed class LightUiFactory : IUiFactory {
    public IButton CreateButton() => new LightButton();
    public ITextBox CreateTextBox() => new LightTextBox();
}

public sealed class DarkUiFactory : IUiFactory {
    public IButton CreateButton() => new DarkButton();
    public ITextBox CreateTextBox() => new DarkTextBox();
}`,
        },
      ],
      react: [
        {
          title: "Abstract Factory (TS)",
          language: "ts",
          code: `type Button = { render(): string };
type TextBox = { render(): string };

type UiFactory = { createButton(): Button; createTextBox(): TextBox };

const lightFactory: UiFactory = {
  createButton: () => ({ render: () => "LightButton" }),
  createTextBox: () => ({ render: () => "LightTextBox" }),
};

const darkFactory: UiFactory = {
  createButton: () => ({ render: () => "DarkButton" }),
  createTextBox: () => ({ render: () => "DarkTextBox" }),
};

// usage
const ui = darkFactory;
console.log(ui.createButton().render(), ui.createTextBox().render());`,
        },
      ],
    },
    keywords: []
  },

  // 4) Builder
  {
    id: "builder",
    category: "Creational",
    content: {
      es: {
        title: "Builder",
        summary: "Construye objetos complejos paso a paso.",
        problem: "Un objeto tiene muchas opciones (constructor enorme) o combinaciones inválidas difíciles de controlar.",
        solution: "Usás un builder con pasos claros para armar el objeto y luego `Build()`/`Create()`.",
        whenToUse: [
          "Configuraciones complejas",
          "Objetos inmutables con muchas opciones",
          "Evitar constructores con 10+ params",
        ],
        pros: ["Legible", "Controla combinaciones", "Facilita inmutabilidad"],
        cons: ["Más código", "Puede ser demasiado para objetos simples"],
      },
      en: {
        title: "Builder",
        summary: "Builds complex objects step by step.",
        problem: "An object has too many options (huge constructor) or invalid combinations are hard to manage.",
        solution: "Use a builder with clear steps and a final `Build()`/`Create()`.",
        whenToUse: [
          "Complex configuration",
          "Immutable objects with many options",
          "Avoid 10+ constructor params",
        ],
        pros: ["Readable", "Controls combinations", "Supports immutability"],
        cons: ["More code", "Overkill for simple objects"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Builder (.NET)",
          language: "csharp",
          code: `public sealed record Report(string Title, bool IncludeCharts, string Format);

public sealed class ReportBuilder {
    private string _title = "Untitled";
    private bool _includeCharts;
    private string _format = "PDF";

    public ReportBuilder Title(string value) { _title = value; return this; }
    public ReportBuilder WithCharts(bool value = true) { _includeCharts = value; return this; }
    public ReportBuilder Format(string value) { _format = value; return this; }

    public Report Build() => new(_title, _includeCharts, _format);
}

// usage: var report = new ReportBuilder().Title("Sales").WithCharts().Format("HTML").Build();`,
        },
      ],
      react: [
        {
          title: "Builder (TS)",
          language: "ts",
          code: `type Report = { title: string; includeCharts: boolean; format: "PDF" | "HTML" };

class ReportBuilder {
  private r: Report = { title: "Untitled", includeCharts: false, format: "PDF" };

  title(v: string) { this.r.title = v; return this; }
  withCharts(v = true) { this.r.includeCharts = v; return this; }
  format(v: Report["format"]) { this.r.format = v; return this; }
  build(): Report { return { ...this.r }; }
}

// const report = new ReportBuilder().title("Sales").withCharts().format("HTML").build();`,
        },
      ],
    },
    keywords: []
  },

  // 5) Prototype
  {
    id: "prototype",
    category: "Creational",
    content: {
      es: {
        title: "Prototype",
        summary: "Crea objetos clonando instancias existentes.",
        problem: "Crear un objeto es costoso o complejo y querés copiarlo rápidamente con pequeñas variaciones.",
        solution: "Definís un método de clonación (shallow/deep) y clonás prototipos preconfigurados.",
        whenToUse: [
          "Objetos costosos de construir",
          "Copias con pequeñas variaciones",
          "Preconfiguraciones (templates)",
        ],
        pros: ["Rápido", "Evita construcción compleja", "Simplifica creación"],
        cons: ["Deep clone puede ser difícil", "Cuidado con referencias compartidas"],
      },
      en: {
        title: "Prototype",
        summary: "Creates objects by cloning existing instances.",
        problem: "Object creation is expensive/complex and you want quick copies with small variations.",
        solution: "Provide a clone method (shallow/deep) and clone preconfigured prototypes.",
        whenToUse: [
          "Expensive objects",
          "Copies with small variations",
          "Preconfigured templates",
        ],
        pros: ["Fast", "Avoid complex construction", "Simplifies creation"],
        cons: ["Deep clone is tricky", "Watch shared references"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Prototype (.NET)",
          language: "csharp",
          code: `public sealed record Invoice(string Customer, decimal Total, string Currency);

public static class InvoicePrototypes {
    public static readonly Invoice UsdTemplate = new("ACME", 0m, "USD");
}

var baseInv = InvoicePrototypes.UsdTemplate;
var inv1 = baseInv with { Total = 120.50m };
var inv2 = baseInv with { Customer = "Globex", Total = 99.99m };`,
        },
      ],
      react: [
        {
          title: "Prototype (TS)",
          language: "ts",
          code: `type Invoice = { customer: string; total: number; currency: "USD" | "ARS" };

const usdTemplate: Invoice = { customer: "ACME", total: 0, currency: "USD" };

const inv1: Invoice = { ...usdTemplate, total: 120.5 };
const inv2: Invoice = { ...usdTemplate, customer: "Globex", total: 99.99 };`,
        },
      ],
    },
    keywords: []
  },

  // 6) Adapter
  {
    id: "adapter",
    category: "Structural",
    content: {
      es: {
        title: "Adapter",
        summary: "Adapta una interfaz a otra compatible.",
        problem: "Tenés una API/servicio con una interfaz incompatible con tu código actual.",
        solution: "Creás un adaptador que traduce llamadas/datos del cliente al formato del servicio existente.",
        whenToUse: [
          "Integrar librerías de terceros",
          "Compatibilidad con sistemas legacy",
          "Unificar interfaces de proveedores",
        ],
        pros: ["Reutiliza código existente", "Aísla cambios", "Mejora integración"],
        cons: ["Agrega capa extra", "Puede ocultar problemas de diseño"],
      },
      en: {
        title: "Adapter",
        summary: "Adapts one interface into another compatible one.",
        problem: "You have an API/service with an incompatible interface with your current code.",
        solution: "Create an adapter translating client calls/data into the existing service format.",
        whenToUse: [
          "Integrate third-party libraries",
          "Legacy compatibility",
          "Unify provider interfaces",
        ],
        pros: ["Reuses existing code", "Isolates changes", "Improves integration"],
        cons: ["Extra layer", "Can hide design issues"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Adapter (.NET)",
          language: "csharp",
          code: `public interface IPaymentGateway {
    void Pay(decimal amount, string currency);
}

// legacy lib
public sealed class LegacyPayApi {
    public void DoPayment(string amountText) => Console.WriteLine($"Paid {amountText}");
}

public sealed class LegacyPayAdapter : IPaymentGateway {
    private readonly LegacyPayApi _legacy = new();
    public void Pay(decimal amount, string currency) =>
        _legacy.DoPayment($"{amount:0.00} {currency}");
}`,
        },
      ],
      react: [
        {
          title: "Adapter (TS)",
          language: "ts",
          code: `type PaymentGateway = { pay(amount: number, currency: string): void };

class LegacyPayApi {
  doPayment(amountText: string) { console.log("Paid", amountText); }
}

class LegacyPayAdapter implements PaymentGateway {
  private legacy = new LegacyPayApi();
  pay(amount: number, currency: string) {
    this.legacy.doPayment(\`\${amount.toFixed(2)} \${currency}\`);
  }
}`,
        },
      ],
    },
    keywords: []
  },

  // 7) Facade
  {
    id: "facade",
    category: "Structural",
    content: {
      es: {
        title: "Facade",
        summary: "Simplifica un subsistema complejo con una API única.",
        problem: "Un flujo requiere coordinar múltiples componentes y el uso se vuelve verboso y frágil.",
        solution: "Creás una fachada que expone métodos de alto nivel ocultando la complejidad interna.",
        whenToUse: [
          "Subsistemas con muchas dependencias",
          "Reducir acoplamiento de capas",
          "Simplificar casos de uso",
        ],
        pros: ["API simple", "Menos acoplamiento", "Más mantenible"],
        cons: ["Puede volverse God object", "Oculta detalle útil en algunos casos"],
      },
      en: {
        title: "Facade",
        summary: "Provides a simple API over a complex subsystem.",
        problem: "A flow requires coordinating many components; usage becomes verbose and fragile.",
        solution: "Create a facade exposing high-level methods and hiding internal complexity.",
        whenToUse: [
          "Subsystems with many dependencies",
          "Reduce layer coupling",
          "Simplify use-cases",
        ],
        pros: ["Simple API", "Lower coupling", "More maintainable"],
        cons: ["Can become a god object", "May hide useful detail"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Facade (.NET)",
          language: "csharp",
          code: `public sealed class Inventory { public bool Reserve(string sku, int qty) => true; }
public sealed class Billing { public void Charge(string customerId, decimal amount) {} }
public sealed class Shipping { public void CreateLabel(string customerId) {} }

public sealed class CheckoutFacade {
    private readonly Inventory _inv = new();
    private readonly Billing _bill = new();
    private readonly Shipping _ship = new();

    public void Checkout(string customerId, string sku, int qty, decimal total) {
        if (!_inv.Reserve(sku, qty)) throw new Exception("No stock");
        _bill.Charge(customerId, total);
        _ship.CreateLabel(customerId);
    }
}`,
        },
      ],
      react: [
        {
          title: "Facade (TS)",
          language: "ts",
          code: `class Inventory { reserve(sku: string, qty: number) { return true; } }
class Billing { charge(customerId: string, amount: number) {} }
class Shipping { createLabel(customerId: string) {} }

class CheckoutFacade {
  private inv = new Inventory();
  private bill = new Billing();
  private ship = new Shipping();

  checkout(customerId: string, sku: string, qty: number, total: number) {
    if (!this.inv.reserve(sku, qty)) throw new Error("No stock");
    this.bill.charge(customerId, total);
    this.ship.createLabel(customerId);
  }
}`,
        },
      ],
    },
    keywords: []
  },

  // 8) Decorator
  {
    id: "decorator",
    category: "Structural",
    content: {
      es: {
        title: "Decorator",
        summary: "Agrega funcionalidades sin modificar la clase original.",
        problem: "Querés sumar comportamiento (logging, cache, métricas) sin herencias explosivas ni cambiar código base.",
        solution: "Envolvés un objeto con decoradores que implementan la misma interfaz y agregan lógica antes/después.",
        whenToUse: [
          "Cross-cutting: logging/métricas",
          "Agregar features en runtime",
          "Evitar herencia múltiple de variantes",
        ],
        pros: ["Composición flexible", "Extensible", "Respeta Open/Closed"],
        cons: ["Más objetos", "Debug puede ser más difícil"],
      },
      en: {
        title: "Decorator",
        summary: "Adds behavior without changing the original class.",
        problem: "You want to add behavior (logging, cache, metrics) without inheritance explosion or changing base code.",
        solution: "Wrap an object with decorators implementing the same interface and adding logic before/after.",
        whenToUse: [
          "Cross-cutting: logging/metrics",
          "Add features at runtime",
          "Avoid inheritance variants",
        ],
        pros: ["Flexible composition", "Extensible", "Open/Closed friendly"],
        cons: ["More objects", "Harder debugging sometimes"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Decorator (.NET)",
          language: "csharp",
          code: `public interface IRepo { string Get(string id); }

public sealed class Repo : IRepo {
    public string Get(string id) => $"data:{id}";
}

public sealed class LoggingRepo : IRepo {
    private readonly IRepo _inner;
    public LoggingRepo(IRepo inner) => _inner = inner;

    public string Get(string id) {
        Console.WriteLine("Get " + id);
        return _inner.Get(id);
    }
}

// usage: IRepo repo = new LoggingRepo(new Repo());`,
        },
      ],
      react: [
        {
          title: "Decorator (TS) - función wrapper",
          language: "ts",
          code: `type Repo = { get(id: string): Promise<string> };

const baseRepo: Repo = {
  async get(id) { return \`data:\${id}\`; }
};

const withLogging = (repo: Repo): Repo => ({
  async get(id) {
    console.log("Get", id);
    return repo.get(id);
  },
});

// const repo = withLogging(baseRepo);`,
        },
      ],
    },
    keywords: []
  },

  // 9) Strategy
  {
    id: "strategy",
    category: "Behavioral",
    content: {
      es: {
        title: "Strategy",
        summary: "Intercambia algoritmos en runtime.",
        problem: "Tenés múltiples formas de calcular/decidir (descuentos, validación) y no querés if/switch gigantes.",
        solution: "Encapsulás cada algoritmo en una estrategia y el contexto la usa según configuración.",
        whenToUse: [
          "Descuentos / pricing",
          "Políticas de validación",
          "Selección de algoritmo por configuración",
        ],
        pros: ["Extensible", "Testable", "Evita condicionales grandes"],
        cons: ["Más objetos", "Puede ser verboso si hay pocas variantes"],
      },
      en: {
        title: "Strategy",
        summary: "Swaps algorithms at runtime.",
        problem: "You have multiple ways to compute/decide and want to avoid huge if/switch blocks.",
        solution: "Encapsulate each algorithm as a strategy and let the context use one based on configuration.",
        whenToUse: [
          "Discount/pricing",
          "Validation policies",
          "Algorithm selection by config",
        ],
        pros: ["Extensible", "Testable", "Avoids big conditionals"],
        cons: ["More objects", "Verbose for few variants"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Strategy (.NET)",
          language: "csharp",
          code: `public interface IDiscountStrategy { decimal Apply(decimal total); }

public sealed class NoDiscount : IDiscountStrategy {
    public decimal Apply(decimal total) => total;
}
public sealed class VipDiscount : IDiscountStrategy {
    public decimal Apply(decimal total) => total * 0.9m;
}

public sealed class Checkout {
    private readonly IDiscountStrategy _discount;
    public Checkout(IDiscountStrategy discount) => _discount = discount;
    public decimal FinalTotal(decimal total) => _discount.Apply(total);
}`,
        },
      ],
      react: [
        {
          title: "Strategy (TS)",
          language: "ts",
          code: `type DiscountStrategy = (total: number) => number;

const noDiscount: DiscountStrategy = (t) => t;
const vipDiscount: DiscountStrategy = (t) => t * 0.9;

const finalTotal = (total: number, strategy: DiscountStrategy) => strategy(total);

// finalTotal(100, vipDiscount) => 90`,
        },
      ],
    },
    keywords: []
  },

  // 10) Observer
  {
    id: "observer",
    category: "Behavioral",
    content: {
      es: {
        title: "Observer",
        summary: "Notifica a suscriptores cuando algo cambia.",
        problem: "Varios componentes necesitan reaccionar a cambios de estado sin acoplarse directamente entre sí.",
        solution: "Definís un subject (publisher) que mantiene observadores y les notifica eventos/cambios.",
        whenToUse: [
          "Eventos de dominio",
          "Notificaciones UI",
          "Pub/Sub simple",
        ],
        pros: ["Bajo acoplamiento", "Extensible", "Eventos claros"],
        cons: ["Orden/efectos secundarios", "Puede complicar debugging"],
      },
      en: {
        title: "Observer",
        summary: "Notifies subscribers when something changes.",
        problem: "Multiple components must react to changes without tightly coupling to each other.",
        solution: "A subject keeps observers and notifies them on events/changes.",
        whenToUse: ["Domain events", "UI notifications", "Simple pub/sub"],
        pros: ["Low coupling", "Extensible", "Clear events"],
        cons: ["Side-effects ordering", "Debugging complexity"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Observer (.NET) - evento",
          language: "csharp",
          code: `public sealed class OrderService {
    public event Action<string>? OrderCreated;

    public void CreateOrder(string orderId) {
        // ... lógica
        OrderCreated?.Invoke(orderId);
    }
}

// usage:
// var svc = new OrderService();
// svc.OrderCreated += id => Console.WriteLine("Created " + id);
// svc.CreateOrder("A-1");`,
        },
      ],
      react: [
        {
          title: "Observer (TS) - pub/sub simple",
          language: "ts",
          code: `type Handler<T> = (payload: T) => void;

class Emitter<T> {
  private subs = new Set<Handler<T>>();
  subscribe(fn: Handler<T>) { this.subs.add(fn); return () => this.subs.delete(fn); }
  emit(payload: T) { this.subs.forEach(fn => fn(payload)); }
}

const orderCreated = new Emitter<string>();
const unsubscribe = orderCreated.subscribe((id) => console.log("Created", id));
orderCreated.emit("A-1");
unsubscribe();`,
        },
      ],
    },
    keywords: []
  },

  // 11) Command
  {
    id: "command",
    category: "Behavioral",
    content: {
      es: {
        title: "Command",
        summary: "Encapsula una acción como objeto.",
        problem: "Querés desacoplar quién pide una acción de quién la ejecuta, soportar colas, logs o undo/redo.",
        solution: "Representás cada acción como un comando con `Execute()` (y opcional `Undo()`), y un invoker lo dispara.",
        whenToUse: [
          "Undo/Redo",
          "Colas de trabajos",
          "Macros / historial de acciones",
        ],
        pros: ["Desacopla invocador/ejecutor", "Soporta undo", "Auditable"],
        cons: ["Más clases", "Puede ser verbose"],
      },
      en: {
        title: "Command",
        summary: "Encapsulates an action as an object.",
        problem: "You want to decouple the requester from the executor, and support queues, logs, or undo/redo.",
        solution: "Represent actions as commands with `Execute()` (optional `Undo()`), triggered by an invoker.",
        whenToUse: ["Undo/Redo", "Job queues", "Macros/history"],
        pros: ["Decouples invoker/executor", "Supports undo", "Auditable"],
        cons: ["More classes", "Can be verbose"],
      },
    },
    examples: {
      dotnet: [
        {
          title: "Command (.NET)",
          language: "csharp",
          code: `public interface ICommand { void Execute(); }

public sealed class CreateUserCommand : ICommand {
    private readonly string _name;
    public CreateUserCommand(string name) => _name = name;
    public void Execute() => Console.WriteLine("Create user: " + _name);
}

public sealed class Invoker {
    private readonly Queue<ICommand> _queue = new();
    public void Enqueue(ICommand cmd) => _queue.Enqueue(cmd);
    public void RunAll() { while (_queue.Count > 0) _queue.Dequeue().Execute(); }
}

// usage: var inv = new Invoker(); inv.Enqueue(new CreateUserCommand("Ana")); inv.RunAll();`,
        },
      ],
      react: [
        {
          title: "Command (TS)",
          language: "ts",
          code: `type Command = { execute(): void };

const createUser = (name: string): Command => ({
  execute() { console.log("Create user:", name); }
});

class Invoker {
  private q: Command[] = [];
  enqueue(c: Command) { this.q.push(c); }
  runAll() { this.q.splice(0).forEach(c => c.execute()); }
}

// const inv = new Invoker(); inv.enqueue(createUser("Ana")); inv.runAll();`,
        },
      ],
    },
    keywords: []
  }
  
];
