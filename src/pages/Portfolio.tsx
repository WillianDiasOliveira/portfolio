import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Download, Github, Linkedin, Mail, Phone, MapPin, X, AlertTriangle, Lightbulb,
  Sparkles, Bot, Zap, Shield, Cpu, Code2, Rocket, Wrench, Brain,
  ChevronDown, ExternalLink, Puzzle, Layers, Workflow, GitBranch, Maximize2,
  Star, CheckCircle2, Play, PlayCircle, FileText, Briefcase, GraduationCap,
  Terminal, Database, Server, ArrowUpRight, ArrowLeft, Award, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Languages as LanguagesIcon } from "lucide-react";
import { tr, translations, setPortfolioLang } from "@/lib/portfolio-i18n";
import resolveKeyHcaptcha from "@/assets/resolvekey-hcaptcha.png";
import resolveKeyRecaptcha from "@/assets/resolvekey-recaptcha.png";
import resolveKeyImagem from "@/assets/resolvekey-imagem.png";
import smiloPainel from "@/assets/smilo-painel.png";
import smiloMetricas from "@/assets/smilo-metricas.png";
import smiloMovimentacoes from "@/assets/smilo-movimentacoes.png";
import smiloConsulta from "@/assets/smilo-consulta.png";
import smiloConferenciaRpa from "@/assets/smilo-conferencia-rpa.png";
import smiloOverview from "@/assets/smilo-overview.png";
import smiloValidacao from "@/assets/smilo-validacao.png";
import smiloConsultaCpf from "@/assets/smilo-consulta-cpf.png";
import smiloContrato from "@/assets/smilo-contrato.png";
import smiloLovableOverview from "@/assets/smilo-lovable-overview.png";
import smiloGalleryStrip from "@/assets/smilo-gallery-strip.png";
import willianPhoto from "@/assets/willian-photo.jpeg";
import willianGeminiAsset from "@/assets/willian-gemini.jpeg";
import willianGeminiEventAsset from "@/assets/willian-gemini-event.jpeg";
import willianAltAsset from "@/assets/willian-alt.jpeg";
import certHashtagPython from "@/assets/cert-hashtag-jornada-python.png";
import certEngenharia from "@/assets/cert-engenharia-mecatronica.jpg";
import certAlura from "@/assets/cert-alura-backend.jpg";
import resolveKeyDemoAsset from "@/assets/resolvekey-demo.mp4";
import auditCnpjDemoAsset from "@/assets/audit-cnpj-demo.mp4";
import auditCnpjFlow from "@/assets/audit-cnpj-flow.png";
import auditCnpjDatabase from "@/assets/audit-cnpj-database.png";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

const LINKEDIN_URL = "https://www.linkedin.com/in/willian-dias-oliveira/";
const MSLEARN_URL = "https://learn.microsoft.com/pt-br/users/williandiasdeoliveira-5456/";

// Calcula idade automaticamente a partir da data de nascimento (26/05/2002)
const BIRTH_DATE = new Date(2002, 4, 26); // mês 4 = maio
const computeAge = () => {
  const today = new Date();
  let age = today.getFullYear() - BIRTH_DATE.getFullYear();
  const m = today.getMonth() - BIRTH_DATE.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < BIRTH_DATE.getDate())) age--;
  return age;
};
const CURRENT_AGE = computeAge();

// Dynamically register translation keys that depend on CURRENT_AGE so
// the PT->EN translator keeps matching after each birthday.
const ABOUT_PARAGRAPH_PT = `ascido na capital de São Paulo, brasileiro de ${CURRENT_AGE} anos, Willian Dias de Oliveira construiu sua identidade através da curiosidade, da persistência e da busca constante por evolução. Sua trajetória é guiada por uma conexão profunda com tecnologia, engenharia e inovação, mas defini-lo apenas pelo lado técnico seria reduzir a complexidade de quem ele realmente é.`;
const ABOUT_PARAGRAPH_EN = `orn in the city of São Paulo, a ${CURRENT_AGE}-year-old Brazilian, Willian Dias de Oliveira built his identity through curiosity, persistence and a constant pursuit of growth. His path is guided by a deep connection with technology, engineering and innovation, but defining him only by his technical side would shrink the complexity of who he truly is.`;
// Patch the shared translation dictionary at module load.
translations[`${CURRENT_AGE} anos`] = `${CURRENT_AGE} years old`;
translations[ABOUT_PARAGRAPH_PT] = ABOUT_PARAGRAPH_EN;
translations["A história"] = "The story";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function LiveClock() {
  const [now, setNow] = useState<string>(() =>
    new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }) + " BRT"
  );
  useEffect(() => {
    const i = setInterval(() => {
      setNow(
        new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }) + " BRT"
      );
    }, 30_000);
    return () => clearInterval(i);
  }, []);
  return <span data-no-translate>{now}</span>;
}

function SpinningQuestion() {
  // placeholder anchor
  const [spinKey, setSpinKey] = useState(0);
  const [spinning, setSpinning] = useState(true);

  const triggerSpin = () => {
    setSpinKey((k) => k + 1);
    setSpinning(true);
  };

  return (
    <span
      key={spinKey}
      onAnimationEnd={() => setSpinning(false)}
      onMouseEnter={() => { if (!spinning) triggerSpin(); }}
      className={`inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent cursor-default ${
        spinning ? "animate-question-spin" : ""
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      ?
    </span>
  );
}

const skills = [
  { icon: Code2, label: "Python" },
  { icon: Server, label: "FastAPI / APIs REST" },
  { icon: Database, label: "PostgreSQL / Supabase / Firebase" },
  { icon: Bot, label: "RPA & Automação" },
  { icon: GitBranch, label: "Git / GitHub" },
  { icon: Brain, label: "Treinamento de IA / Colab" },
  { icon: Layers, label: "Java / C / TypeScript" },
];

const timeline = [
  {
    period: "Out/2025 — Fev/2026",
    role: "Analista de Sistema de Automação",
    company: "Pensenova Automacional",
    desc: "Programação de robôs Staubli em VAL3, simulação 3D no SRS, otimização de trajetórias e padronização de células robotizadas.",
    icon: Bot,
    highlights: ["Staubli VAL3", "Simulação SRS", "Java / C / HTML", "Células robotizadas"],
    impact: "Padronização de scripts e ganho de ciclo em células de produção.",
  },
  {
    period: "Jun/2024 — Out/2025",
    role: "Técnico de Manutenção",
    company: "OptView (Renovate)",
    desc: "Manutenção preventiva e corretiva de máquinas ópticas Schneider (HSC, XTS, CCL, CCU). Diagnóstico mecânico, elétrico e eletropneumático.",
    icon: Wrench,
    highlights: ["Schneider HSC/XTS", "Diagnóstico elétrico", "Pneumática", "Volpe (CMMS)"],
    impact: "Redução de paradas não programadas via análise de causa raiz.",
  },
  {
    period: "Abr/2023 — Jun/2024",
    role: "Auxiliar de Laboratório",
    company: "M Shimizu",
    desc: "Calibração de torquímetros e transdutores conforme RBC. Validações metrológicas e controle de processos laboratoriais.",
    icon: GraduationCap,
    highlights: ["RBC / metrologia", "Torquímetros", "Validação", "Controle de processo"],
    impact: "Base de rigor analítico que hoje aplico em testes e automações.",
  },
];

const automations = [
  {
    name: "Smilo",
    tag: "Plataforma corporativa",
    desc: "SaaS interno construído com Lovable para gestão de Departamento Pessoal: RPA de validações fiscais, sincronização com Google Sheets, dashboard em tempo real, exportações XLSX e mais de 8 módulos integrados.",
    icon: Rocket,
    tech: ["React", "Lovable Cloud", "Supabase", "Edge Functions", "RPA"],
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "ResolveKey",
    tag: "Extensão Chrome",
    desc: "Extensão proprietária que resolve hCaptcha, reCAPTCHA v2/v3 e txtCaptcha automaticamente, com licenciamento por chave de acesso, Auto-Open e Auto-Solve.",
    icon: Puzzle,
    tech: ["Manifest V3", "TypeScript", "IA local", "Cloudflare bypass"],
    accent: "from-cyan-500 to-blue-500",
  },
  {
    name: "SouSmile AutoFill",
    tag: "RPA municipal",
    desc: "Extensão crítica (v3.8.1) para automação de consultas municipais e federais, CCM SP, validações de CPF no site Smilo",
    icon: Workflow,
    tech: ["Chrome API", "Tab orchestration", "Background sync"],
    accent: "from-emerald-500 to-teal-500",
  },
];

const certificates = [
  {
    title: "Bacharel em Engenharia Mecatrônica",
    issuer: "Universidade Cruzeiro do Sul",
    date: "DEZ 2025",
    desc: "Diploma de Bacharel — colação de grau em 13/02/2026. Base em mecânica, eletrônica, controle e programação.",
    skills: ["Mecatrônica", "Controle", "Eletrônica", "Programação"],
    url: "/certs/diploma-engenharia-mecatronica.pdf",
    image: certEngenharia,
  },
  {
    title: "Formação em Desenvolvimento Back-End com Python",
    issuer: "Alura",
    date: "Dez 2025",
    desc: "Trilha completa de back-end: Python, Banco de dados e APIs.",
    skills: ["Python", "Banco de dados", "APIs"],
    url: LINKEDIN_URL,
    image: certAlura,
  },
  {
    title: "Jornada Python — 8 horas",
    issuer: "Hashtag Treinamentos",
    date: "07/05/2026",
    desc: "Imersão prática em Python com fundamentos, automação e projetos guiados.",
    skills: ["Python", "Automação"],
    url: "/certs/jornada-python-hashtag.pdf",
    image: certHashtagPython,
  },
];

const DEMO_VIDEOS = [
  {
    src: resolveKeyDemoAsset,
    label: "reCAPTCHA em tempo real",
    badge: "Estável",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    accent: "from-emerald-400/60 via-cyan-400/30 to-emerald-400/40",
    glow: "shadow-emerald-500/20",
    desc: "Resolução automática do reCAPTCHA v2/v3 com integração ao fluxo da extensão. A IA identifica o desafio, devolve o token válido e segue o envio do formulário sem intervenção humana reduzindo minutos de fricção a poucos segundos.",
    tags: ["reCAPTCHA v2", "reCAPTCHA v3", "Token instantâneo", "IA local"],
  },
  {
    src: "/portfolio/txtcaptcha-demo.mp4",
    label: "txtCaptcha em tempo real",
    badge: "Em treinamento",
    badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    accent: "from-amber-400/60 via-cyan-400/30 to-amber-400/40",
    glow: "shadow-amber-500/20",
    desc: "Modelo de OCR ainda em fase de treinamento para captchas baseados em texto distorcido. Quando a IA não consegue resolver, o sistema recarrega ou troca automaticamente a imagem do captcha, repetindo a leitura até obter sucesso, sem travar o processo.",
    tags: ["OCR", "Texto distorcido", "Auto-retry", "Em treinamento"],
  },
] as const;

type RevealDirection = "lr" | "rl" | "fade";

function Reveal({
  children,
  direction = "fade",
  delay = 0,
  duration = 1.2,
  rootRef,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  rootRef?: React.RefObject<HTMLElement>;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    let scrollTarget: HTMLElement | Window = window;
    let raf = 0;
    let raf2 = 0;

    const checkVisibility = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= viewportHeight * 0.88 && rect.bottom >= viewportHeight * 0.08) {
        // Double rAF guarantees the hidden state paints before flipping,
        // so the CSS transition is actually observed.
        raf2 = window.requestAnimationFrame(() => {
          raf2 = window.requestAnimationFrame(() => setVisible(true));
        });
      }
    };

    raf = window.requestAnimationFrame(() => {
      scrollTarget = rootRef?.current ?? window;
      checkVisibility();
      scrollTarget.addEventListener("scroll", checkVisibility, { passive: true });
      window.addEventListener("resize", checkVisibility);
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.cancelAnimationFrame(raf2);
      scrollTarget.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [rootRef]);

  const hiddenClip =
    direction === "lr"
      ? "inset(0 100% 0 0)"
      : direction === "rl"
      ? "inset(0 0 0 100%)"
      : "inset(0 0 0 0)";
  const style: React.CSSProperties = {
    clipPath: visible ? "inset(0 0 0 0)" : hiddenClip,
    WebkitClipPath: visible ? "inset(0 0 0 0)" : hiddenClip,
    opacity: visible ? 1 : 0,
    willChange: "opacity, clip-path",
    transition: `clip-path ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, -webkit-clip-path ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity ${duration}s ease-out ${delay}s`,
  };
  return (
    <As ref={ref as any} className={className} style={style}>
      {children}
    </As>
  );
}

export default function Portfolio() {

  const [activeDemo, setActiveDemo] = useState<"hcaptcha" | "recaptcha" | "imagem">("hcaptcha");
  const [autoFillOn, setAutoFillOn] = useState(true);
  const [openDemoIdx, setOpenDemoIdx] = useState<number | null>(null);
  const openDemo = openDemoIdx !== null ? DEMO_VIDEOS[openDemoIdx] : null;
  const [demoVideoReady, setDemoVideoReady] = useState(false);
  const [photoAnimKey, setPhotoAnimKey] = useState(0);
  const [photoFlipped, setPhotoFlipped] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const ids = ["hero", "timeline", "certificates", "projetos", "rpa", "contact"];
    const onScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;
      if (scrollBottom >= pageBottom - 80) {
        setActiveSection("contact");
        return;
      }

      const y = window.scrollY + window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Preload demo videos in background after first paint so the modal opens instantly
  useEffect(() => {
    const sources = [
      ...DEMO_VIDEOS.map((v) => v.src),
      "/portfolio/rpa-challenge.mp4",
    ];
    const onIdle = (cb: () => void) => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
      if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(cb);
      else setTimeout(cb, 1500);
    };
    onIdle(() => {
      sources.forEach((src) => {
        const v = document.createElement("video");
        v.src = src;
        v.preload = "auto";
        v.muted = true;
        v.style.display = "none";
        // Trigger fetch by appending briefly; remove after enough buffered.
        document.body.appendChild(v);
        const cleanup = () => {
          try { v.removeAttribute("src"); v.load(); v.remove(); } catch {}
        };
        v.addEventListener("canplaythrough", cleanup, { once: true });
        // Safety timeout — remove after 30s regardless
        setTimeout(cleanup, 30000);
      });
    });
  }, []);

  // Reset readiness whenever a different demo opens
  useEffect(() => {
    setDemoVideoReady(false);
  }, [openDemoIdx]);
  const [openWhy, setOpenWhy] = useState<null | "smilo" | "lovable">(null);
  const [openAudit, setOpenAudit] = useState<null | "challenge" | "solution">(null);
  const [auditZoom, setAuditZoom] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [automationIdx, setAutomationIdx] = useState(0);
  const TOTAL_AUTOMATIONS = 2;
  const [projectIdx, setProjectIdx] = useState(0);
  const TOTAL_PROJECTS = 2;
  const whyGallery = [
    { src: smiloOverview, label: "Visão geral" },
    { src: smiloPainel, label: "Painel principal" },
    { src: smiloMetricas, label: "Métricas e KPIs" },
    { src: smiloMovimentacoes, label: "Movimentações de RH" },
    { src: smiloValidacao, label: "Validação RPA" },
    { src: smiloConsultaCpf, label: "Consulta de CPF" },
    { src: smiloConferenciaRpa, label: "Conferência RPA" },
    { src: smiloContrato, label: "Documentos legais" },
  ];
  const lovableGallery = [
    { src: smiloOverview, label: "Visão geral" },
    { src: smiloPainel, label: "Painel principal" },
    { src: smiloMetricas, label: "Métricas em tempo real" },
    { src: smiloMovimentacoes, label: "Sincronização contínua" },
    { src: smiloConsulta, label: "Consultas integradas" },
    { src: smiloValidacao, label: "Edge functions + RPA" },
    { src: smiloGalleryStrip, label: "Composição de módulos" },
  ];
  const activeWhyGallery = openWhy === "lovable" ? lovableGallery : whyGallery;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [storyAtTop, setStoryAtTop] = useState(true);
  const storyScrollRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<"pt" | "en">(() => {
    if (typeof window === "undefined") return "pt";
    return (localStorage.getItem("portfolio_lang") as "pt" | "en") || "pt";
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const originalsRef = useRef<WeakMap<Text, string>>(new WeakMap());
  const attrOriginalsRef = useRef<WeakMap<Element, Map<string, string>>>(new WeakMap());

  // Keyboard shortcuts for the demo modal: Esc closes, arrows navigate.
  useEffect(() => {
    if (openDemoIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDemoIdx(null);
      else if (e.key === "ArrowRight")
        setOpenDemoIdx((i) => (i === null ? 0 : Math.min(i + 1, DEMO_VIDEOS.length - 1)));
      else if (e.key === "ArrowLeft")
        setOpenDemoIdx((i) => (i === null ? 0 : Math.max(i - 1, 0)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openDemoIdx]);

  // Why-modal: carousel auto-advance + Esc to close + lock body scroll.
  useEffect(() => {
    if (!openWhy) return;
    setCarouselIdx(0);
    const total = activeWhyGallery.length;
    const id = window.setInterval(() => {
      setCarouselIdx((i) => i + 1);
    }, 2600);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenWhy(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearInterval(id);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openWhy]);

  // Apply translations to the DOM after every render based on `lang`.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    localStorage.setItem("portfolio_lang", lang);
    setPortfolioLang(lang);

    const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT"]);
    const ATTRS = ["aria-label", "alt", "placeholder", "title"];

    // Build a reverse lookup (EN -> PT) so we can translate back even when
    // React-rendered text was already in EN (e.g. inline `lang === "en" ? ... : ...`).
    const reverseMap: Record<string, string> = {};
    for (const pt in translations) {
      const en = translations[pt];
      // Prefer the first PT key per EN value to avoid ambiguity.
      if (en && reverseMap[en] === undefined) reverseMap[en] = pt;
    }

    const isInsideNoTranslate = (node: Node | null): boolean => {
      let n: Node | null = node;
      while (n && n !== root) {
        if (n instanceof Element && n.hasAttribute("data-no-translate")) return true;
        n = n.parentNode;
      }
      return false;
    };

    const apply = () => {
      // Text nodes
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
          const parent = n.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
          if (isInsideNoTranslate(parent)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node as Text;
        const current = text.nodeValue ?? "";
        const leading = current.match(/^\s*/)?.[0] ?? "";
        const trailing = current.match(/\s*$/)?.[0] ?? "";
        const trimmed = current.trim();
        if (!trimmed) continue;
        if (lang === "en") {
          const translated = translations[trimmed];
          if (translated !== undefined && translated !== trimmed) {
            text.nodeValue = leading + translated + trailing;
          }
        } else {
          const ptValue = reverseMap[trimmed];
          if (ptValue !== undefined && ptValue !== trimmed) {
            text.nodeValue = leading + ptValue + trailing;
          }
        }
      }
      // Attributes
      const elements = root.querySelectorAll<HTMLElement>("[aria-label],[alt],[placeholder],[title]");
      elements.forEach((el) => {
        if (isInsideNoTranslate(el)) return;
        for (const attr of ATTRS) {
          if (!el.hasAttribute(attr)) continue;
          const cur = (el.getAttribute(attr) ?? "").trim();
          if (!cur) continue;
          if (lang === "en") {
            const t = translations[cur];
            if (t !== undefined && t !== cur) el.setAttribute(attr, t);
          } else {
            const ptValue = reverseMap[cur];
            if (ptValue !== undefined && ptValue !== cur) el.setAttribute(attr, ptValue);
          }
        }
      });
    };

    let scheduled = false;
    let applying = false;
    const safeApply = () => {
      applying = true;
      apply();
      // Allow microtasks/mutations from our own writes to flush before re-observing.
      queueMicrotask(() => { applying = false; });
    };
    safeApply();
    const mo = new MutationObserver(() => {
      if (applying || scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        safeApply();
      });
    });
    mo.observe(root, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, [lang, storyOpen, activeDemo, isAtBottom, isAtTop]);

  useEffect(() => {
    if (storyOpen) setStoryAtTop(true);
  }, [storyOpen]);

  useEffect(() => {
    document.body.style.overflow = storyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [storyOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      setIsAtTop(y <= 8);
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      setIsAtBottom(y + winH >= docH - 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, []);

  return (
    <div ref={rootRef} className="portfolio-root min-h-screen overflow-x-hidden">
      {/* Language toggle + CTAs — fixed top right */}
      <div className="fixed top-3 right-3 md:top-4 md:right-4 z-[80] flex items-center gap-2 md:gap-3">
        {/* CTA pill — hidden on small screens to avoid overflow */}
        <div
          className={`hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/5 px-1.5 py-1.5 transition-all duration-500 ease-out ${
            isAtTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <a
            href="/portfolio/curriculo_willian_dias_oliveira.pdf"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-[12px] font-semibold hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" /> Currículo
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] text-white/70 hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap"
          >
            Falar comigo <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://github.com/WillianDiasOliveira"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] text-white/70 hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
        </div>

        <button
          data-no-translate
          type="button"
          onClick={() => setLang((l) => (l === "pt" ? "en" : "pt"))}
          aria-label="Toggle language"
          className="group inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl px-2.5 md:px-3.5 py-1.5 md:py-2 text-[11px] md:text-xs font-medium text-white/80 shadow-lg shadow-black/40 hover:bg-white/10 hover:border-violet-400/60 hover:text-white transition-colors"
        >
          <LanguagesIcon className="h-3.5 w-3.5" />
          <span className={lang === "pt" ? "text-white" : "text-white/40"}>PT</span>
          <span className="text-white/30">|</span>
          <span className={lang === "en" ? "text-white" : "text-white/40"}>EN</span>
        </button>
      </div>
      {/* Floating "Quem é Willian Dias?" — bottom CTA variant */}
      <div
        className={`fixed bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 z-[60] w-[min(92vw,420px)] flex justify-center transition-opacity duration-300 ${
          isAtBottom ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-violet-500/40 via-fuchsia-500/40 to-cyan-500/40 blur-2xl opacity-90 animate-pulse"
        />
        <button
          type="button"
          onClick={() => setStoryOpen(true)}
          aria-label="Quem é Willian Dias?"
          className="group relative inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-black/50 backdrop-blur-xl px-4 md:px-7 py-3 md:py-4 text-sm md:text-base text-white shadow-lg shadow-black/40 hover:bg-white/10 hover:border-violet-400/60 transition-colors"
        >
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-violet-300 group-hover:text-fuchsia-300 transition-colors" />
          <span className="font-medium">
            Quem é{" "}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              Willian Dias
            </span>
            ?
          </span>
          <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
      {/* Background — ember glow halos */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[820px] h-[820px] rounded-full blur-[180px]" style={{ background: "radial-gradient(circle, rgba(255,107,74,0.35), transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[560px] h-[560px] rounded-full blur-[160px]" style={{ background: "radial-gradient(circle, rgba(255,107,74,0.18), transparent 70%)" }} />
      </div>
      {/* Film grain texture overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{
          backgroundImage: "url(/__l5e/assets-v1/45dee9eb-6522-45b2-b360-f5a134e973c2/grain.png)",
          backgroundSize: "160px 160px",
          backgroundRepeat: "repeat",
          opacity: 0.09,
          mixBlendMode: "screen",
        }}
      />

      {/* Side index rail */}
      <nav className="pf-rail" aria-label="Section index">
        <a href="#hero" className={activeSection === "hero" ? "is-active" : ""}><span className="pf-rail-dot" /><span className="pf-rail-label">{lang === "en" ? "[00] start" : "[00] início"}</span></a>
        <a href="#timeline" className={activeSection === "timeline" ? "is-active" : ""}><span className="pf-rail-dot" /><span className="pf-rail-label">{lang === "en" ? "[01] journey" : "[01] trajetória"}</span></a>
        <a href="#certificates" className={activeSection === "certificates" ? "is-active" : ""}><span className="pf-rail-dot" /><span className="pf-rail-label">{lang === "en" ? "[02] bachelor's degree & certifications" : "[02] diploma de bacharel & certificações"}</span></a>
        <a href="#projetos" className={activeSection === "projetos" ? "is-active" : ""}><span className="pf-rail-dot" /><span className="pf-rail-label">{lang === "en" ? "[03] projects" : "[03] projetos"}</span></a>
        <a href="#rpa" className={activeSection === "rpa" ? "is-active" : ""}><span className="pf-rail-dot" /><span className="pf-rail-label">{lang === "en" ? "[04] automations" : "[04] automações"}</span></a>
        <a href="#contact" className={activeSection === "contact" ? "is-active" : ""}><span className="pf-rail-dot" /><span className="pf-rail-label">{lang === "en" ? "[05] contact" : "[05] contato"}</span></a>
      </nav>

      {/* HERO — Brutalist Cream */}
      <section
        id="hero"
        ref={heroRef}
        className="relative z-10 min-h-screen max-w-[1360px] mx-auto px-5 sm:px-10 pt-20 sm:pt-24 pb-12"
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full">
          {/* Main brutal grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* LEFT — name block */}
            <div className="lg:col-span-8 relative lg:pt-72">
              <h1 className="text-[clamp(3.6rem,12vw,11rem)] leading-[0.86] tracking-tight">
                <motion.span
                  className="block"
                  initial={{ x: "-110%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  WILLIAN
                </motion.span>
                <motion.span
                  className="block pf-serif pf-name-serif"
                  style={{ marginTop: "-0.06em" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.6, ease: "easeOut", delay: 1.4 }}
                >
                  dias.
                </motion.span>
              </h1>

              <p className="mt-10 max-w-xl text-[15px] sm:text-[17px] leading-[1.55]">
                {"\n\n\n"}
              </p>

            </div>

            {/* RIGHT — photo card + stickers */}
            <div className="lg:col-span-4 relative lg:pt-40">
              <div key={photoAnimKey} className="relative mx-auto max-w-[440px]">
                {/* Ghost copies behind — fly out diagonally from behind main */}
                <motion.img
                  src={photoFlipped ? willianAltAsset : willianPhoto}
                  alt=""
                  aria-hidden="true"
                  className="absolute aspect-[4/5] object-cover pointer-events-none select-none"
                  initial={{ opacity: 0, x: "22%", y: "6%", rotate: 0, scale: 0.9 }}
                  animate={{ opacity: 0.28, x: 0, y: 0, rotate: -4, scale: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
                  style={{
                    top: "-6%",
                    left: "-22%",
                    width: "72%",
                    filter: "grayscale(1) blur(0.5px)",
                    zIndex: 0,
                    objectPosition: photoFlipped ? "center 12%" : "center center",
                  }}
                />
                <motion.img
                  src={photoFlipped ? willianAltAsset : willianPhoto}
                  alt=""
                  aria-hidden="true"
                  className="absolute aspect-[4/5] object-cover pointer-events-none select-none"
                  initial={{ opacity: 0, x: "-22%", y: "3%", rotate: 0, scale: 0.9 }}
                  animate={{ opacity: 0.22, x: 0, y: 0, rotate: 5, scale: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
                  style={{
                    top: "-3%",
                    right: "-22%",
                    width: "72%",
                    filter: "grayscale(1) blur(0.5px)",
                    zIndex: 0,
                    objectPosition: photoFlipped ? "center 12%" : "center center",
                  }}
                />
                <motion.div
                  className="pf-photo-card relative"
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  style={{ zIndex: 1 }}
                >
                  <button
                    type="button"
                    onClick={() => setPhotoFlipped((v) => !v)}
                    aria-label="Trocar foto"
                    className="relative block w-full aspect-[4/5] cursor-pointer overflow-hidden p-0 border-0 bg-transparent"
                  >
                     <img
                       src={willianAltAsset}
                       alt=""
                       aria-hidden="true"
                       loading="lazy"
                       decoding="async"
                       className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${photoFlipped ? "opacity-100" : "opacity-0"}`}
                       style={{ filter: "grayscale(0.1) contrast(1.04)", objectPosition: "center 12%" }}
                     />
                     <img
                       src={willianPhoto}
                       alt="Willian Dias de Oliveira"
                       loading="eager"
                       decoding="async"
                       fetchPriority="high"
                       className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${photoFlipped ? "opacity-0" : "opacity-100"}`}
                       style={{ filter: "grayscale(0.1) contrast(1.04)" }}
                     />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 85%)" }}
                    />
                  </button>
                </motion.div>

                <motion.span
                  className="pf-sticker --ink"
                  style={{ bottom: 40, left: -30, zIndex: 2, transform: "rotate(-3deg)" }}
                  initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                  animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                  transition={{ duration: 1.4, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  o cara que automatiza
                </motion.span>
              </div>

              {/* Mini info card */}
              <motion.button
                type="button"
                onClick={() => setStoryOpen(true)}
                className="mt-24 mx-auto block w-full max-w-[360px] text-left border-2 border-[color:var(--pf-ink)] bg-[color:var(--pf-bone)] p-4 transition-transform hover:-translate-y-0.5 hover:-translate-x-0.5 cursor-pointer group"
                style={{ boxShadow: "5px 5px 0 var(--pf-ink)" }}
                aria-label="Abrir: quem sou"
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{ duration: 1.4, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2 opacity-70">// quem sou</div>
                <div className="text-[14px] leading-snug uppercase font-semibold">
                  CONHEÇA MINHA HISTÓRIA
                </div>
              </motion.button>
            </div>
          </div>

        </motion.div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[340px,1fr] gap-10 lg:gap-12">
          {/* Sticky intro */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="lg:sticky lg:top-24 self-start"
          >
            <motion.div variants={fadeUp}>
              <Badge className="bg-violet-500/15 text-violet-300 border border-violet-500/30 mb-4">
                <Briefcase className="h-3 w-3 mr-1.5" /> Trajetória
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-center">
              Da bancada ao<br />terminal.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-white/70 leading-relaxed text-base md:text-lg text-center">
              Três anos de chão de fábrica, laboratório e robótica industrial agora redirecionados para automação backend e RPA com Python. Cada parada de máquina virou aprendizado sobre processo; cada calibração, sobre rigor; cada robô, sobre lógica.
            </motion.p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: "3+", l: "Anos" },
                { v: "3", l: "Setores" },
                { v: "10+", l: "Tecnologias" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-center">
                  <div className="text-xl font-bold">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/[0.06] via-white/[0.03] to-transparent p-6 shadow-lg shadow-violet-900/10">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-violet-300 mb-5">
                <GraduationCap className="h-4 w-4" /> Formação
              </div>
              <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-violet-500/50">
                  <div className="text-base font-semibold text-white">Engenharia Mecatrônica</div>
                  <div className="text-[11px] uppercase tracking-wider text-violet-300/70 mt-0.5">Concluída</div>
                  <div className="text-sm text-white/60 mt-1.5 leading-relaxed">
                    Base sólida em mecânica, eletrônica e controle.
                  </div>
                </div>
                <div className="relative pl-4 border-l-2 border-fuchsia-500/50">
                  <div className="text-base font-semibold text-white">Alura · Back-End</div>
                  <div className="text-[11px] uppercase tracking-wider text-fuchsia-300/70 mt-0.5">Em andamento</div>
                  <div className="text-sm text-white/60 mt-1.5 leading-relaxed">
                    Python, FastAPI, Bancos de dados, RPA e IA aplicada.
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 -translate-x-1/2 w-px bg-white/10" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.role}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16 sm:pl-20"
                >
                  <div className="absolute left-0 top-0 h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                    <t.icon className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-violet-500/30 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 uppercase tracking-wider mb-2">
                      <span>{t.period}</span>
                      {i === 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 normal-case tracking-normal">
                          Mais recente
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{t.role}</h3>
                    <div className="text-sm text-violet-300 mb-3">{t.company}</div>
                    <p className="text-sm text-white/60 leading-relaxed">{t.desc}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {t.highlights.map((h) => (
                        <span key={h} className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/70">
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2 text-xs text-white/50">
                      <Sparkles className="h-3.5 w-3.5 text-violet-300 mt-0.5 flex-shrink-0" />
                      <span>{t.impact}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight">
            {tr("Diploma de bacharel")} &{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              {tr("certificações")}
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {certificates.map((c, idx) => {
            const initial =
              idx === 0
                ? { opacity: 0, x: -80 }
                : idx === 2
                ? { opacity: 0, x: 80 }
                : { opacity: 0 };
            return (
            <motion.div
              key={c.title}
              initial={initial}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.06 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber-400/40 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_-20px_rgba(251,191,36,0.35)] transition-colors duration-300 overflow-hidden flex flex-col"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              />
              {c.image && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-white/[0.02] cursor-zoom-in text-left"
                    >
                     <img
                       src={c.image}
                       alt={c.title}
                       loading="lazy"
                       decoding="async"
                       className="absolute inset-0 w-full h-full object-cover"
                     />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl p-2 bg-slate-950/95 border-white/10">
                    <DialogTitle className="sr-only">{c.title}</DialogTitle>
                     <img
                       src={c.image}
                       alt={c.title}
                       loading="lazy"
                       decoding="async"
                       className="w-full h-auto rounded-md"
                     />
                    <div className="px-2 py-2 text-[12px] uppercase tracking-wider text-white/60">
                      {c.title} — {c.issuer} · {c.date}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Award className="h-5 w-5 text-amber-200" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white leading-tight">{c.title}</h3>
              <div className="mt-1 text-sm text-amber-300/90">{c.issuer}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-white/40">{c.date}</div>
              {c.desc && (
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{c.desc}</p>
              )}
              {c.skills && c.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-200/90">
                      {s}
                    </span>
                  ))}
                </div>
              )}
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* PROJECTS HEADER */}
      <section id="projetos" className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-16 md:pt-20 pb-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="flex items-center justify-center gap-6 text-5xl md:text-7xl font-bold tracking-tight">
            <span aria-hidden style={{ height: '2px' }} className="block w-16 md:w-32 bg-gradient-to-r from-transparent to-violet-400 shrink-0" />
            <span className="text-violet-400">
              {lang === "en" ? "PROJECTS" : "PROJETOS"}
            </span>
            <span aria-hidden style={{ height: '2px' }} className="block w-16 md:w-32 bg-gradient-to-l from-transparent to-violet-400 shrink-0" />
          </motion.h2>
        </motion.div>
      </section>

      {/* PROJECTS CAROUSEL (Smilo + ResolveKey) */}
      <section id="projects-carousel" className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-16 md:pt-20 pb-12 md:pb-16">
        {/* Prev/Next arrows */}
        <button
          type="button"
          aria-label="Projeto anterior"
          onClick={() => setProjectIdx((i) => (i - 1 + TOTAL_PROJECTS) % TOTAL_PROJECTS)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-6 z-30 items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/[0.04] hover:bg-orange-500/15 border border-white/15 hover:border-orange-400/60 backdrop-blur-md text-white/70 hover:text-white transition-all shadow-[0_8px_30px_-10px_rgba(251,146,60,0.5)] hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          aria-label="Próximo projeto"
          onClick={() => setProjectIdx((i) => (i + 1) % TOTAL_PROJECTS)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 z-30 items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/[0.04] hover:bg-orange-500/15 border border-white/15 hover:border-orange-400/60 backdrop-blur-md text-white/70 hover:text-white transition-all shadow-[0_8px_30px_-10px_rgba(251,146,60,0.5)] hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
        </button>

        <AnimatePresence mode="wait" initial={false}>
        {projectIdx === 0 && (
        <motion.div
          key="smilo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ willChange: "opacity" }}
        >
      {/* SMILO — PROJECT CARD */}
      <div id="smilo" className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative z-20 text-center max-w-3xl mx-auto mb-0 md:-mb-1"
        >
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tight inline-block px-6"
          >
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 bg-clip-text text-transparent">
              Smilo
            </span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex justify-center mt-2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-orange-300/70" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent p-1"
        >
          <div className="rounded-[1.4rem] bg-gradient-to-br from-[#0a0a14] to-[#0f0f1c] p-5 sm:p-8 md:p-12">
            <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 md:gap-10 lg:gap-14 items-center">
              {/* Descritivo */}
              <div className="text-left">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                  <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    {tr("Mais de 8 módulos integrados,")}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-300 via-orange-300 to-orange-200 bg-clip-text text-transparent">
                    {tr("sincronização em tempo real e RPA inteligente.")}
                  </span>
                </h3>
                <p className="text-white/55 leading-relaxed text-[15px] md:text-base mb-8">
                  {tr("Dashboard com métricas ao vivo, jornada de prazos, conferência RPA, consultas fiscais via extensão proprietária, exportações XLSX automatizadas e muito mais. Tudo gerenciado por")}{" "}
                  <span className="text-white/85">{tr("RBAC granular")}</span>{" "}
                  {tr("e")}{" "}
                  <span className="text-white/85">{tr("2FA obrigatório")}</span>.
                </p>

              </div>

              {/* Mock ilustrativo: Smilo AutoFill (extensão proprietária) */}
              <div className="relative flex justify-center lg:justify-end">
                {/* Glow */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-orange-500/20 via-orange-500/15 to-orange-400/10 blur-3xl" />
                </div>

                <div className="relative w-full max-w-[440px]">
                  {/* Floating chip */}
                  <div className="absolute -top-4 -left-4 z-10 flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-[#0a0a14]/90 backdrop-blur px-3 py-1.5 text-[10px] font-medium text-emerald-300 shadow-lg shadow-emerald-900/30 uppercase tracking-wider">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {tr("Extensão proprietária")}
                  </div>

                  {/* Browser frame */}
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e0e1a] to-[#0a0a14] shadow-2xl shadow-orange-900/40 overflow-hidden">
                    {/* Title bar */}
                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-orange-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      <span className="ml-auto text-[10px] text-white/30 uppercase tracking-wider">popup.html</span>
                    </div>

                    {/* Popup content */}
                    <div className="p-6 bg-gradient-to-br from-[#0d0d18] to-[#0a0a14]">
                      {/* Logo + name */}
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-900/40">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                            <path d="M12 3c-1.5 0-2.8.4-4 1.2C6.8 3.4 5.5 3 4 3c-1.7 0-3 1.3-3 3 0 4 3 8 6 11 .8.8 2 1.3 3 1.3 1 0 2.2-.5 3-1.3 3-3 6-7 6-11 0-1.7-1.3-3-3-3-1.5 0-2.8.4-4 1.2C14.8 3.4 13.5 3 12 3z" opacity=".95"/>
                            <circle cx="9" cy="10" r="1" fill="#0a0a14"/>
                            <circle cx="15" cy="10" r="1" fill="#0a0a14"/>
                            <path d="M9 13c1 1.5 2 2 3 2s2-.5 3-2" stroke="#0a0a14" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold bg-gradient-to-r from-orange-300 to-orange-300 bg-clip-text text-transparent">
                          Smilo AutoFill
                        </h4>
                      </div>
                        <p className="text-[12px] text-white/50 leading-relaxed mb-5">
                          {tr("Extensão exclusiva da Smilo para automação de consultas.")}
                        </p>

                          {/* Status row (interativo) */}
                          <button
                            type="button"
                            onClick={() => setAutoFillOn((v) => !v)}
                            aria-pressed={autoFillOn}
                            data-no-translate
                            className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 mb-3 transition-colors ${
                              autoFillOn
                                ? "border-emerald-500/20 bg-emerald-500/[0.06] hover:bg-emerald-500/[0.1]"
                                : "border-rose-500/20 bg-rose-500/[0.06] hover:bg-rose-500/[0.1]"
                            }`}
                          >
                            <span className={`text-sm font-semibold transition-colors ${autoFillOn ? "text-emerald-300" : "text-rose-300"}`}>
                              {lang === "en" ? (autoFillOn ? "On" : "Off") : (autoFillOn ? "Ligado" : "Desligado")}
                            </span>
                            {/* Toggle */}
                            <div
                              className={`relative h-6 w-11 rounded-full shadow-inner transition-colors ${
                                autoFillOn ? "bg-emerald-500 shadow-emerald-700/40" : "bg-white/10 shadow-black/40"
                              }`}
                            >
                              <div
                                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                                  autoFillOn ? "right-0.5" : "left-0.5"
                                }`}
                              />
                            </div>
                          </button>
                          <p data-no-translate className="text-[11px] text-white/40 text-center mb-5">
                            {lang === "en" 
                              ? (autoFillOn ? "The extension is on and ready to look up." : "The extension is off and will not run lookups.")
                              : (autoFillOn ? "A extensão está ligada e pronta para consultar." : "A extensão está desligada e não fará consultas.")}
                          </p>

                      {/* Tip card */}
                      <div className="rounded-xl border border-orange-500/20 bg-orange-500/[0.06] px-3.5 py-3 flex items-start gap-2.5">
                        <Sparkles className="h-3.5 w-3.5 text-orange-300 mt-0.5 shrink-0" />
                        <p className="text-[11px] text-white/70 leading-relaxed">
                          Use junto com <span className="font-semibold text-orange-200">ResolveKey</span> para resolver os captchas automaticamente!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating chip bottom */}
                  <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-[#0a0a14]/90 backdrop-blur px-3 py-1.5 text-[10px] font-medium text-orange-200 shadow-lg shadow-orange-900/30 uppercase tracking-wider">
                    <Zap className="h-3 w-3" />
                    v3.8.1
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery — marquee infinito com capturas reais (nomes censurados) */}
            {(() => {
              const galleryItems = [
                { src: smiloOverview, label: "Acesso restrito · Acesso ao Smilo" },
                { src: smiloMovimentacoes, label: "Movimentações · 6 meses" },
                { src: smiloConferenciaRpa, label: "Conferência RPA · Upload" },
                { src: smiloValidacao, label: "Validação RPA · Tabela" },
                { src: smiloConsultaCpf, label: "Consulta CPF · Receita Federal" },
                { src: smiloConsulta, label: "Consulta Prefeitura · CCM" },
                { src: smiloContrato, label: "Criação de Contrato · Word" },
                { src: smiloMetricas, label: "Painel · Visão geral" },
              ];
              return (
                <div
                  className="mt-12 relative overflow-hidden"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                  }}
                >
                  <style>{`
                    @keyframes smilo-marquee {
                      from { transform: translateX(0); }
                      to { transform: translateX(-50%); }
                    }
                    .smilo-marquee-track { animation: smilo-marquee 80s linear infinite; }
                    .smilo-marquee-track:hover { animation-play-state: paused; }
                  `}</style>
                  <div className="smilo-marquee-track flex gap-5 w-max">
                    {[...galleryItems, ...galleryItems].map((g, i) => (
                      <Dialog key={`${g.label}-${i}`}>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="group w-[460px] shrink-0 rounded-2xl border border-white/10 bg-[#070710] overflow-hidden hover:border-orange-500/40 hover:shadow-[0_0_40px_-12px_rgba(249,115,22,0.5)] transition-all cursor-zoom-in text-left"
                          >
                            <div className="aspect-[16/9] overflow-hidden relative bg-[#05050b]">
                              <img
                                src={g.src}
                                alt={`Smilo — ${g.label}`}
                                className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700"
                                loading="lazy"
                                decoding="async"
                                style={{ imageRendering: "crisp-edges" }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white/90 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                Ampliar
                              </div>
                            </div>
                            <div className="px-4 py-3 text-xs text-white/60 flex items-center justify-between">
                              <span className="truncate">{g.label}</span>
                              <span className="text-[10px] uppercase tracking-wider text-white/30 ml-2 shrink-0">
                                Captura real
                              </span>
                            </div>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl w-[96vw] p-0 bg-gradient-to-br from-[#0a0a14] to-[#0d0817] border border-white/10 overflow-hidden rounded-2xl shadow-2xl shadow-orange-900/40">
                          <DialogTitle className="sr-only">{g.label}</DialogTitle>
                          <div className="relative">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                            <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-white/5">
                              <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                                <span className="text-sm font-medium text-white/90 tracking-wide">{g.label}</span>
                              </div>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Captura real · Smilo</span>
                            </div>
                            <div className="p-4 bg-[#05050b]">
                              <img
                                src={g.src}
                                alt={`Smilo — ${g.label} (visão completa)`}
                                className="w-full h-auto block rounded-xl ring-1 ring-white/5"
                                decoding="async"
                                style={{ imageRendering: "auto" }}
                              />
                            </div>
                            <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
                              <span>Nomes pessoais foram censurados para preservar dados sensíveis.</span>
                              <span className="uppercase tracking-wider">Pressione ESC para fechar</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              );
            })()}
            <p className="mt-3 text-sm text-white/60 text-center font-sans font-normal opacity-100">
              {"\u00A0"}Nomes pessoais foram censurados para preservar dados sensíveis.
            </p>

            {/* Why Smilo */}
            <div className="mt-12 pt-10 border-t border-white/5 grid md:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => setOpenWhy("smilo")}
                className="text-left flex items-start gap-5 group rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/5 to-orange-500/5 p-7 hover:border-orange-500/40 hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.4)] transition-all cursor-pointer"
              >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Brain className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3 group-hover:text-orange-200 transition-colors flex items-center gap-2">
                          {tr("Por que criei o Smilo")}
                        <ArrowUpRight className="h-4 w-4 text-orange-300/60 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h4>
                    </div>
              </button>

              <button
                type="button"
                onClick={() => setOpenWhy("lovable")}
                className="text-left flex items-start gap-5 group rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/5 to-rose-500/5 p-7 hover:border-pink-500/40 hover:shadow-[0_20px_50px_-20px_rgba(236,72,153,0.4)] transition-all cursor-pointer"
              >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3 group-hover:text-pink-200 transition-colors flex items-center gap-2">
                        {tr("Construído com Lovable")}
                        <ArrowUpRight className="h-4 w-4 text-pink-300/60 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h4>
                    </div>
              </button>
            </div>

            {/* Access live site CTA */}
            <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-white/10 flex justify-center">
              <a
                href="https://ssmilo.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-orange-400/40 transition-colors px-5 sm:px-10 py-3 sm:py-5 text-sm sm:text-lg font-semibold text-white text-center"
              >
                <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                <span>{lang === "en" ? "Visit Smilo website" : "Acessar o site do Smilo"}</span>
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
        </motion.div>
        )}

        {projectIdx === 1 && (
        <motion.div
          key="resolvekey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ willChange: "opacity" }}
        >
      {/* RESOLVEKEY — PROJECT CARD */}
      <div id="resolvekey" className="relative">
        {/* Title sitting on top of the wrapping card border, mirroring Smilo */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative z-20 text-center max-w-3xl mx-auto mb-0 md:-mb-1"
        >
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tight inline-block px-6"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">
              ResolveKey
            </span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex justify-center mt-2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-cyan-300/70" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-transparent p-1"
        >
          <div className="rounded-[1.4rem] bg-gradient-to-br from-[#070a14] to-[#0a1020] p-5 sm:p-8 md:p-12">
            {/* Header inside the card: subtitle + badges + description */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed">
                {tr("O")}{" "}
                <span className="text-white">ResolveKey</span>{" "}
                {tr("é uma extensão Chrome que detecta desafios de")}{" "}
                <span className="text-cyan-200">hCaptcha</span>,{" "}
                <span className="text-cyan-200">reCAPTCHA v2/v3</span>{" "}
                {tr("e")}{" "}
                <span className="text-cyan-200">txtCaptcha</span>{" "}
                {tr("diretamente no DOM, executa inferência")}{" "}
                <span className="text-white">{tr("100% local")}</span>{" "}
                {tr("no navegador e devolve o token resolvido em segundos, sem APIs pagas, sem servidores, sem tracking.")}
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Demo card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-5 sm:p-8">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-500/20 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex gap-2 mb-6 flex-wrap">
                  {(["hcaptcha", "recaptcha", "imagem"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setActiveDemo(d)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                        activeDemo === d
                          ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-200"
                          : "bg-white/5 border border-white/10 text-white/50 hover:text-white"
                      }`}
                    >
                      {d === "hcaptcha" ? "hCaptcha" : d === "recaptcha" ? "reCAPTCHA" : "Imagem"}
                    </button>
                  ))}
                </div>
                <motion.img
                  key={activeDemo}
                  src={activeDemo === "hcaptcha" ? resolveKeyHcaptcha : activeDemo === "recaptcha" ? resolveKeyRecaptcha : resolveKeyImagem}
                  alt="Interface do ResolveKey"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm mx-auto rounded-xl shadow-2xl shadow-cyan-500/20"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            {[
              { icon: Brain, title: "Treinamento contínuo de IA", desc: "Modelos sendo treinados e refinados a cada iteração para reconhecer novos padrões de captcha visual e textual." },
              { icon: Bot, title: "Automação ponta a ponta", desc: "Detecta o desafio na página, processa localmente e responde, sem intervenção manual e sem APIs pagas." },
              { icon: Cpu, title: "Inferência 100% local", desc: "Roda no navegador. Sem chaves de terceiros, sem tracking, com foco em privacidade e custo zero." },
              { icon: Wrench, title: "Em construção ativa", desc: "Projeto pessoal e experimental. Auto-Solve, Auto-Open e licenciamento por chave já funcionam. Novos tipos de captcha em desenvolvimento." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <f.icon className="h-5 w-5 text-cyan-300" />
                </div>
                  <div>
                    <h4 className="font-semibold mb-1">{tr(f.title)}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{tr(f.desc)}</p>
                  </div>
              </motion.div>
            ))}
          </div>
            </div>
            {/* Videos de demonstração — dentro do card ResolveKey, após o grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-10 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-6"
            >
              {DEMO_VIDEOS.map((v, idx) => {
                const shortLabel = idx === 0 ? "reCAPTCHA" : "txtCaptcha";
                const theme = idx === 0
                  ? {
                      bg: "from-emerald-500/5 to-cyan-500/5",
                      border: "hover:border-emerald-500/40",
                      icon: "from-emerald-500 to-cyan-500",
                      title: "group-hover:text-emerald-200",
                      arrow: "text-emerald-300/60",
                    }
                  : {
                      bg: "from-amber-500/5 to-orange-500/5",
                      border: "hover:border-amber-500/40",
                      icon: "from-amber-500 to-orange-500",
                      title: "group-hover:text-amber-200",
                      arrow: "text-amber-300/60",
                    };
                return (
                  <motion.button
                    type="button"
                    onClick={() => setOpenDemoIdx(idx)}
                    key={v.src}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className={`text-left flex items-start gap-5 group rounded-2xl border border-white/10 bg-gradient-to-br ${theme.bg} p-7 ${theme.border} transition-all cursor-pointer w-full sm:w-[340px]`}
                  >
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${theme.icon} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      <PlayCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <h4 className={`text-xl font-semibold ${theme.title} transition-colors flex items-center gap-2`}>
                          {tr(shortLabel)}
                          <ArrowUpRight className={`h-4 w-4 ${theme.arrow} opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all`} />
                        </h4>
                      <span className={`text-[10px] uppercase tracking-[0.15em] font-semibold px-2 py-0.5 rounded-full border ${v.badgeClass}`}>
                          {tr(v.badge)}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

      </div>
        </motion.div>
        )}
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: TOTAL_PROJECTS }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para projeto ${i + 1}`}
              onClick={() => setProjectIdx(i)}
              className={`h-2.5 rounded-full transition-all ${
                projectIdx === i
                  ? "w-10 bg-gradient-to-r from-orange-400 to-cyan-400"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Mobile prev/next */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => setProjectIdx((i) => (i - 1 + TOTAL_PROJECTS) % TOTAL_PROJECTS)}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.04] border border-white/15 text-white/70"
            aria-label="Projeto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setProjectIdx((i) => (i + 1) % TOTAL_PROJECTS)}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.04] border border-white/15 text-white/70"
            aria-label="Próximo projeto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* RPA PROJECTS */}
      <section id="rpa" className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-10 md:py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <motion.h2 variants={fadeUp} className="flex items-center justify-center gap-6 text-5xl md:text-7xl font-bold tracking-tight">
            <span aria-hidden style={{ height: '2px' }} className="block w-16 md:w-32 bg-gradient-to-r from-transparent to-violet-400 shrink-0" />
            <span className="text-violet-400">
              {lang === "en" ? "AUTOMATIONS" : "AUTOMAÇÕES"}
            </span>
            <span aria-hidden style={{ height: '2px' }} className="block w-16 md:w-32 bg-gradient-to-l from-transparent to-violet-400 shrink-0" />
          </motion.h2>
        </motion.div>

        {/* Tech marquee */}
        <div className="-mx-5 sm:-mx-6 pf-marquee mb-16">
          <div className="pf-marquee-track">
            <span>
              {["POWER AUTOMATE", "SQL", "SELENIUM", "PYAUTOGUI", "PANDAS"].map((s) => (
                <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 56 }}>
                  {s}<span className="dot" />
                </span>
              ))}
            </span>
            <span aria-hidden>
              {["POWER AUTOMATE", "SQL", "SELENIUM", "PYAUTOGUI", "PANDAS"].map((s) => (
                <span key={s + "b"} style={{ display: "inline-flex", alignItems: "center", gap: 56 }}>
                  {s}<span className="dot" />
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Carousel: Automation projects */}
        <div className="relative">
          {/* Prev/Next arrows */}
          <button
            type="button"
            aria-label="Projeto anterior"
            onClick={() => setAutomationIdx((i) => (i - 1 + TOTAL_AUTOMATIONS) % TOTAL_AUTOMATIONS)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-6 z-30 items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/[0.04] hover:bg-violet-500/15 border border-white/15 hover:border-violet-400/60 backdrop-blur-md text-white/70 hover:text-white transition-all shadow-[0_8px_30px_-10px_rgba(139,92,246,0.5)] hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            aria-label="Próximo projeto"
            onClick={() => setAutomationIdx((i) => (i + 1) % TOTAL_AUTOMATIONS)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 z-30 items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/[0.04] hover:bg-violet-500/15 border border-white/15 hover:border-violet-400/60 backdrop-blur-md text-white/70 hover:text-white transition-all shadow-[0_8px_30px_-10px_rgba(139,92,246,0.5)] hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
          </button>

          <AnimatePresence mode="wait" initial={false}>
          {automationIdx === 1 && (
          <motion.div
            key="rpa-challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ willChange: "opacity" }}
          >
        {/* Featured: RPA Challenge — same style as ResolveKey */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative z-20 text-center max-w-3xl mx-auto mb-0 md:-mb-1"
        >
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tight inline-block px-6"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              RPA Challenge
            </span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex justify-center mt-2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-cyan-300/70" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-violet-500/10 via-cyan-500/5 to-transparent p-1 mb-12"
        >
          <div className="rounded-[1.4rem] bg-gradient-to-br from-[#070a14] to-[#0a1020] p-5 sm:p-8 md:p-12">
            {/* Header inside the card: description */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed">
                {lang === "en" ? (
                  <>
                    Automation built in <span className="text-white">Python</span> that solves the classic{" "}
                    <span className="text-cyan-200">RPA Challenge</span>. The bot reads data from a spreadsheet,
                    dynamically identifies the form fields,{" "}
                    <span className="text-white">which change position on every submit</span>, and fills all{" "}
                    <span className="text-violet-200">10 rounds</span> fully autonomously, demonstrating dynamic
                    mapping logic, DOM manipulation and reliable interaction with web elements.
                  </>
                ) : (
                  <>
                    Automação desenvolvida em <span className="text-white">Python</span> que
                    resolve o clássico desafio do{" "}
                    <span className="text-cyan-200">RPA Challenge</span>. O robô lê os dados
                    de uma planilha, identifica dinamicamente os campos do formulário,{" "}
                    <span className="text-white">que mudam de posição a cada submit</span>, e preenche
                    todas as <span className="text-violet-200">10 rodadas</span> de forma
                    totalmente autônoma, demonstrando lógica de mapeamento dinâmico, manipulação de
                    DOM e interação confiável com elementos web.
                  </>
                )}
              </p>
            </div>

            {/* Video */}
            <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-neutral-900 shadow-2xl">
              <video
                src="/portfolio/rpa-challenge.mp4"
                className="w-full h-auto block"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </div>

            {/* CTA */}
            <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <a
                href="https://github.com/WillianDiasOliveira/RPA_Challenge"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-cyan-400/40 transition-colors px-5 sm:px-10 py-3 sm:py-5 text-sm sm:text-lg font-semibold text-white text-center"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                <span>{lang === "en" ? "View repository on GitHub" : "Acessar repositório no GitHub"}</span>
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 transition-transform group-hover/btn:translate-x-1" />
              </a>
              <a
                href={MSLEARN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-cyan-400/40 transition-colors px-5 sm:px-10 py-3 sm:py-5 text-sm sm:text-lg font-semibold text-white text-center"
              >
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                <span>{lang === "en" ? "My Microsoft Learn track" : "Minha trilha Microsoft Learn"}</span>
                <ExternalLink className="h-4 w-4 shrink-0 opacity-60" />
              </a>
            </div>
          </div>
        </motion.div>

          </motion.div>
          )}

          {automationIdx === 0 && (
          <motion.div
            key="audit-cadastral"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ willChange: "opacity" }}
          >
        {/* Featured: Audit Data Extraction — Power Automate + BrasilAPI + SQLite */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative z-20 text-center max-w-3xl mx-auto mb-0 md:-mb-1"
        >
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight inline-block px-6"
          >
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              {lang === "en" ? "Audit Data Extraction" : "Automação de Auditoria Cadastral"}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-white/55 text-sm sm:text-base tracking-[0.25em] uppercase"
          >
            RPA · Power Automate · Python · SQLite
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center mt-2">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-emerald-300/70" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-1 mb-12"
        >
          <div className="rounded-[1.4rem] bg-gradient-to-br from-[#070a14] to-[#0a1020] p-5 sm:p-8 md:p-12">
            {/* Overview */}
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase bg-emerald-500/10 text-emerald-200 border border-emerald-400/20">
                {lang === "en" ? "Project Overview" : "Visão Geral do Projeto"}
              </span>
              <p className="mt-5 text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                {lang === "en"
                  ? "The video below shows the robot in real execution: it reads pending CNPJs from the local database, automatically queries the official registration status of each company and updates the records one by one, in a continuous and unattended flow."
                  : "O vídeo abaixo mostra o robô em execução real: ele lê os CNPJs pendentes da base local, consulta automaticamente a situação cadastral oficial de cada empresa e atualiza os registros um a um, em um fluxo contínuo e sem intervenção humana."}
              </p>
            </div>

            {/* Live demo video */}
            <div className="mb-12">
              <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-neutral-900 shadow-2xl">
                <video
                  src={auditCnpjDemoAsset}
                  className="w-full h-auto block"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                />
              </div>

              {/* Challenge / Solution — clickable buttons below the video */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <button
                  type="button"
                  onClick={() => setOpenAudit("challenge")}
                  className="text-left flex items-center gap-5 group rounded-2xl border border-white/10 bg-gradient-to-br from-rose-500/5 to-rose-500/5 p-6 hover:border-rose-500/40 hover:shadow-[0_20px_50px_-20px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors flex items-center gap-2">
                    {lang === "en" ? "The Challenge" : "O Desafio"}
                    <ArrowUpRight className="h-4 w-4 text-rose-300/60 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h4>
                </button>

                <button
                  type="button"
                  onClick={() => setOpenAudit("solution")}
                  className="text-left flex items-center gap-5 group rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-6 hover:border-emerald-500/40 hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold group-hover:text-emerald-200 transition-colors flex items-center gap-2">
                    {lang === "en" ? "The Solution" : "A Solução"}
                    <ArrowUpRight className="h-4 w-4 text-emerald-300/60 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h4>
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <a
                href="https://github.com/WillianDiasOliveira/Audit-Data-Extraction"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-emerald-400/40 transition-colors px-5 sm:px-10 py-3 sm:py-5 text-sm sm:text-lg font-semibold text-white text-center"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                <span>{lang === "en" ? "View repository on GitHub" : "Acessar repositório no GitHub"}</span>
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 transition-transform group-hover/btn:translate-x-1" />
              </a>
              <a
                href={MSLEARN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-emerald-400/40 transition-colors px-5 sm:px-10 py-3 sm:py-5 text-sm sm:text-lg font-semibold text-white text-center"
              >
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                <span>{lang === "en" ? "My Microsoft Learn track" : "Minha trilha Microsoft Learn"}</span>
                <ExternalLink className="h-4 w-4 shrink-0 opacity-60" />
              </a>
            </div>
          </div>
        </motion.div>
          </motion.div>
          )}
          </AnimatePresence>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: TOTAL_AUTOMATIONS }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para projeto ${i + 1}`}
                onClick={() => setAutomationIdx(i)}
                className={`h-2.5 rounded-full transition-all ${
                  automationIdx === i
                    ? "w-10 bg-gradient-to-r from-violet-400 to-cyan-400"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Mobile prev/next */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => setAutomationIdx((i) => (i - 1 + TOTAL_AUTOMATIONS) % TOTAL_AUTOMATIONS)}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.04] border border-white/15 text-white/70"
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setAutomationIdx((i) => (i + 1) % TOTAL_AUTOMATIONS)}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.04] border border-white/15 text-white/70"
              aria-label="Próximo projeto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24 mb-24 md:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.02] p-6 sm:p-10 md:p-16"
        >
          <div className="relative grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Vamos<br />conversar?
              </h2>
              <p className="mt-5 text-white/70 text-lg max-w-md">
                {lang === "en" ? "Open to opportunities." : "Aberto para oportunidades."}
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <a href="mailto:willian.dias.oliveira@hotmail.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-white/50" /> willian.dias.oliveira@hotmail.com
                </a>
                <a href="tel:+5511949401744" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-white/50" /> (11) 94940-1744
                </a>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="h-4 w-4 text-white/50" /> São Paulo · SP
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:items-end lg:justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-semibold h-12 px-7 w-full lg:w-auto"
                asChild
              >
                <a href="/portfolio/curriculo_willian_dias_oliveira.pdf" download>
                  <FileText className="h-4 w-4 mr-2" /> Baixar currículo (PDF)
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 px-7 w-full lg:w-auto"
                asChild
              >
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-60" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 px-7 w-full lg:w-auto"
                asChild
              >
                <a href="https://github.com/WillianDiasOliveira" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4 mr-2" /> GitHub
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-60" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 px-7 w-full lg:w-auto"
                asChild
              >
                <a href={MSLEARN_URL} target="_blank" rel="noopener noreferrer">
                  <GraduationCap className="h-4 w-4 mr-2" /> Microsoft Learn
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-60" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <div className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5" />
            <span>© 2026 Willian Dias de Oliveira</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://github.com/WillianDiasOliveira" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={MSLEARN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Microsoft Learn">
              <GraduationCap className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Story Overlay — slide from right */}
      <AnimatePresence>
        {storyOpen && (
          <motion.div
            key="story-overlay"
            ref={storyScrollRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onScroll={(e) => {
              setStoryAtTop((e.target as HTMLDivElement).scrollTop <= 8);
            }}
            className="fixed inset-0 z-[100] bg-[#070710] overflow-y-auto"
          >
            {/* Background — minimal, matches portfolio */}
            <div className="fixed inset-0 pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                }}
              />
            </div>

            <button
              onClick={() => setStoryOpen(false)}
              aria-label={lang === "pt" ? "Voltar" : "Back"}
              className="group fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-[110] inline-flex items-center gap-2 h-12 px-2 text-white/25 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="h-7 w-7 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-sm font-medium opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                {lang === "pt" ? "Voltar" : "Back"}
              </span>
            </button>

            {/* Language toggle inside About Me overlay */}
            <button
              data-no-translate
              type="button"
              onClick={() => setLang((l) => (l === "pt" ? "en" : "pt"))}
              aria-label="Toggle language"
              className={`group fixed top-6 right-6 z-[110] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl px-3.5 py-2 text-xs font-medium text-white/80 shadow-lg shadow-black/40 hover:bg-white/10 hover:border-violet-400/60 hover:text-white transition-all duration-300 ${
                storyAtTop ? "opacity-100" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <LanguagesIcon className="h-3.5 w-3.5" />
              <span className={lang === "pt" ? "text-white" : "text-white/40"}>PT</span>
              <span className="text-white/30">|</span>
              <span className={lang === "en" ? "text-white" : "text-white/40"}>EN</span>
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative z-10"
            >
              {/* Hero — two-column: portrait Gemini + title */}
              <section className="relative w-full pt-[55vh] md:pt-[60vh] pb-16 md:pb-24 overflow-hidden">
                {/* Ghost layer — second photo offset behind */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 60, scale: 1.05 }}
                  animate={{ opacity: 0.35, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 pointer-events-none translate-x-6 md:translate-x-12 -translate-y-6 md:-translate-y-10"
                >
                  <img
                    src={willianGeminiEventAsset}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "grayscale(0.4) blur(2px)" }}
                  />
                </motion.div>
                {/* Main background — big Gemini photo behind the title */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 1.04, y: 40 }}
                  animate={{ opacity: 0.7, scale: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <img
                    src={willianGeminiEventAsset}
                    alt=""
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
                {/* Bottom-up dark fade so the title at the bottom stays readable */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(7,7,16,1) 0%, rgba(7,7,16,0.92) 30%, rgba(7,7,16,0.55) 55%, rgba(7,7,16,0.15) 80%, rgba(7,7,16,0) 100%)",
                  }}
                />

                <div className="relative max-w-6xl mx-auto px-6">
                  {/* Title + badges */}
                  <div className="max-w-2xl">
                    <Reveal direction="fade" duration={0.7} delay={0.5} rootRef={storyScrollRef}>
                      <div className="inline-flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.45em] text-white/55 mb-6">
                        <span className="h-px w-12 bg-gradient-to-r from-white/40 to-transparent" />
                        Sobre mim
                        <span className="h-px w-12 bg-gradient-to-l from-white/40 to-transparent" />
                      </div>
                    </Reveal>
                    <h2 className="font-bold tracking-tight leading-[0.95] text-4xl md:text-6xl lg:text-7xl">
                      <Reveal
                        as="span"
                        direction="lr"
                        duration={0.8}
                        delay={0.75}
                        rootRef={storyScrollRef}
                        className="block text-white/85 font-light italic [font-feature-settings:'ss01'] mb-1 md:mb-2"
                      >
                        Quem é
                      </Reveal>
                      <Reveal
                        as="span"
                        direction="rl"
                        duration={0.9}
                        delay={1.05}
                        rootRef={storyScrollRef}
                        className="block text-white"
                      >
                        Willian Dias de Oliveira <SpinningQuestion />
                      </Reveal>
                    </h2>

                    <Reveal
                      direction="fade"
                      delay={1.5}
                      duration={0.7}
                      rootRef={storyScrollRef}
                      className="mt-8 flex flex-wrap gap-2"
                    >
                      {[
                        { icon: MapPin, label: "São Paulo, BR" },
                        { icon: Sparkles, label: `${CURRENT_AGE} anos` },
                        { icon: Code2, label: "Backend · Python" },
                        { icon: GraduationCap, label: "Eng. Mecatrônica" },
                      ].map((f) => (
                        <span
                          key={f.label}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl px-3.5 py-1.5 text-xs text-white/85 hover:bg-white/[0.1] hover:border-white/30 transition-colors"
                        >
                          <f.icon className="h-3.5 w-3.5 text-white/70" />
                          {f.label}
                        </span>
                      ))}
                    </Reveal>
                  </div>
                </div>
              </section>

              <div className="max-w-6xl mx-auto px-6 pb-20 md:pb-28 pt-4 md:pt-10">
              {/* Ornamental section divider */}
              <Reveal
                direction="fade"
                duration={1.1}
                rootRef={storyScrollRef}
                className="max-w-5xl mx-auto md:mx-0 mb-10 md:mb-14 flex items-center gap-4 text-white/30"
              >
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.5em]">A história</span>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </Reveal>
              {/* Story body */}
              <article className="max-w-5xl mx-auto md:mx-0 text-white/75 text-[1.05rem] md:text-[1.15rem] leading-[1.9] space-y-7 [&_p]:tracking-[0.005em] [&_p:first-letter]:text-white">
                <Reveal as="p" direction="lr" duration={1.3} rootRef={storyScrollRef}>
                  <span className="float-left mr-4 mt-2 text-7xl md:text-8xl font-serif font-bold leading-[0.85] bg-gradient-to-br from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(167,139,250,0.15)]">
                    N
                  </span>
                  {ABOUT_PARAGRAPH_PT}
                </Reveal>

                <Reveal as="p" direction="lr" duration={1.3} rootRef={storyScrollRef}>
                  Sua história profissional começou no ambiente industrial,
                  entre laboratórios, máquinas e processos de alta precisão.
                  Foram anos atuando com calibração de torquímetros,
                  manutenção de máquinas ópticas automatizadas e programação
                  de robôs industriais Stäubli utilizando VAL3. Mais do que
                  experiência técnica, cada desafio trouxe aprendizado sobre
                  lógica, responsabilidade, análise de falhas e resolução de
                  problemas em ambientes onde precisão e eficiência não são
                  opcionais.
                </Reveal>

                <Reveal
                  as="blockquote"
                  direction="fade"
                  duration={1.2}
                  rootRef={storyScrollRef}
                  className="relative my-12 md:my-14 mx-auto md:mx-0 max-w-3xl"
                >
                  <span aria-hidden className="absolute -top-6 -left-2 md:-left-6 text-7xl md:text-8xl leading-none font-serif text-violet-400/30 select-none">
                    “
                  </span>
                  <p className="relative pl-6 md:pl-10 border-l-2 border-violet-400/60 italic text-white/90 text-xl md:text-2xl leading-snug font-light">
                    Não se trata de abandonar uma engenharia para seguir outra,
                    mas de unir duas que convergem naquilo que mais gosto de
                    fazer: resolver problemas complexos com lógica e
                    elegância.
                  </p>
                  <div className="mt-4 ml-6 md:ml-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
                    <span className="h-px w-8 bg-violet-400/40" />
                    Willian Dias
                  </div>
                </Reveal>

                <Reveal as="p" direction="rl" duration={1.3} rootRef={storyScrollRef}>
                  Com o tempo, a curiosidade natural pela tecnologia evoluiu
                  para algo maior: a transição para o desenvolvimento de
                  software. Hoje, direciona sua carreira para o universo
                  backend, com foco em{" "}
                  <span className="text-white/95 font-medium">Python</span>,{" "}
                  <span className="text-white/95 font-medium">FastAPI</span>,
                  automações RPA e desenvolvimento de APIs. A base construída
                  na Engenharia Mecatrônica trouxe uma visão sistêmica rara,
                  a capacidade de compreender tanto o funcionamento físico
                  quanto lógico das tecnologias. Agora, a programação se
                  torna a ferramenta que permite transformar ideias em
                  soluções completas, inteligentes e escaláveis.
                </Reveal>

                <Reveal as="p" direction="rl" duration={1.3} rootRef={storyScrollRef}>
                  Formado em Engenharia Mecatrônica, pretende iniciar uma
                  segunda graduação em{" "}
                  <span className="text-white/95 font-medium">
                    Engenharia de Software
                  </span>{" "}
                  para aprofundar conhecimentos em arquitetura de sistemas,
                  algoritmos e engenharia aplicada ao desenvolvimento
                  moderno. Para ele, não se trata de abandonar uma área para
                  seguir outra, mas de unir duas engenharias que convergem
                  naturalmente em sua principal motivação: criar soluções
                  elegantes para problemas complexos.
                </Reveal>

                <Reveal as="p" direction="lr" duration={1.3} rootRef={storyScrollRef}>
                  Willian é alguém que aprende rápido, possui perfil
                  independente e encara desafios com equilíbrio entre
                  racionalidade técnica e criatividade. Não espera caminhos
                  prontos nem oportunidades perfeitas. Prefere explorar,
                  testar, falhar, corrigir e evoluir através da experiência
                  prática. Sua mentalidade é construída na execução:
                  entender profundamente, adaptar-se rápido e melhorar
                  continuamente.
                </Reveal>

                <Reveal as="p" direction="lr" duration={1.3} rootRef={storyScrollRef}>
                  Mais do que conquistar cargos ou títulos, o que o move é a
                  construção constante de conhecimento, a vontade de sair do
                  comum e a capacidade de transformar ideias em algo real.
                  Com disciplina, visão analítica e ambição por crescimento,
                  acredita que evolução não acontece de forma instantânea,
                  ela é resultado de consistência, curiosidade e coragem para
                  enfrentar novos desafios.
                </Reveal>
              </article>

              {/* Signature */}
              <div className="max-w-5xl mx-auto md:mx-0 mt-20 pt-10 relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-white/40">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="tracking-[0.35em] uppercase text-[11px] text-white/60">— Willian Dias</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/WillianDiasOliveira"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs tracking-wide text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs tracking-wide text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                  <a
                    href={MSLEARN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Microsoft Learn"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs tracking-wide text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all"
                  >
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Microsoft Learn</span>
                  </a>
                  <a
                    href="mailto:willian.dias.oliveira@hotmail.com"
                    aria-label="Email"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs tracking-wide text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Email</span>
                  </a>
                  <a
                    href="/portfolio/curriculo_willian_dias_oliveira.pdf"
                    download
                    aria-label="Currículo"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs tracking-wide text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Currículo</span>
                  </a>
                </div>
                <span className="italic">São Paulo · Brasil</span>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Fullscreen Modal */}
      <AnimatePresence>
        {openDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setOpenDemoIdx(null)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDemoIdx(null);
              }}
              aria-label="Fechar"
              className="sm:hidden fixed right-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-[120] h-11 w-11 inline-flex items-center justify-center rounded-full bg-black/80 backdrop-blur-xl text-white border border-white/20 shadow-lg shadow-black/50 active:scale-95 transition-transform"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-7xl rounded-3xl p-[1.5px] bg-gradient-to-br ${openDemo.accent} shadow-2xl shadow-cyan-500/20`}
            >
              {/* Navigation arrows */}
              <AnimatePresence mode="wait">
                {(openDemoIdx ?? 0) > 0 && (
                  <motion.button
                    key="prev-arrow"
                    initial={{ opacity: 0, x: 12, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 12, scale: 0.8 }}
                    whileHover={{ scale: 1.08, x: -2 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    onClick={() => setOpenDemoIdx((i) => (i === null ? 0 : Math.max(i - 1, 0)))}
                    aria-label="Demonstração anterior"
                    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-5 md:-left-7 z-20 h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-xl text-white border border-white/15 ring-1 ring-white/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] hover:bg-white/[0.12] hover:border-cyan-400/40 hover:text-cyan-200 transition-colors duration-300"
                  >
                    <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} />
                  </motion.button>
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                {(openDemoIdx ?? 0) < DEMO_VIDEOS.length - 1 && (
                  <motion.button
                    key="next-arrow"
                    initial={{ opacity: 0, x: -12, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -12, scale: 0.8 }}
                    whileHover={{ scale: 1.08, x: 2 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    onClick={() =>
                      setOpenDemoIdx((i) => (i === null ? 0 : Math.min(i + 1, DEMO_VIDEOS.length - 1)))
                    }
                    aria-label="Próxima demonstração"
                    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-5 md:-right-7 z-20 h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-xl text-white border border-white/15 ring-1 ring-white/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] hover:bg-white/[0.12] hover:border-cyan-400/40 hover:text-cyan-200 transition-colors duration-300"
                  >
                    <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Outer glow */}
              <div className={`absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br ${openDemo.accent} opacity-20 blur-3xl pointer-events-none -z-10`} />

              <div className="relative rounded-[1.4rem] overflow-hidden bg-gradient-to-b from-[#0a0a14] to-[#06060d] border border-white/5">
                {/* Body: video + side description */}
                <div className="grid lg:grid-cols-[1.7fr_1fr]">
                  <div className="relative aspect-video lg:aspect-auto lg:min-h-[62vh] overflow-hidden bg-[radial-gradient(ellipse_at_center,_#101428_0%,_#06060d_70%)]">
                    {/* Soft accent glow behind the video */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${openDemo.accent} opacity-[0.07] pointer-events-none`} />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(0,0,0,0.55)_100%)]" />
                    {!demoVideoReady && (
                      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
                        <div className="h-10 w-10 rounded-full border-2 border-white/15 border-t-cyan-300 animate-spin" />
                      </div>
                    )}
                    <video
                      key={openDemo.src}
                      className="relative z-[1] w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                      controls
                      autoPlay
                      playsInline
                      preload="auto"
                      onCanPlay={() => setDemoVideoReady(true)}
                      onLoadedData={() => setDemoVideoReady(true)}
                    >
                      <source src={openDemo.src} type="video/mp4" />
                      Seu navegador não suporta vídeo.
                    </video>
                  </div>
                    <div key={openDemo.label} className="relative p-7 md:p-9 border-t lg:border-t-0 lg:border-l border-white/5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent overflow-hidden flex flex-col justify-center">
                      <div className={`pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${openDemo.accent} opacity-20 blur-3xl`} />
                      
                      <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-cyan-200/80 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {tr("Demonstração ao vivo")}
                      </div>
                      
                      <h4 className="relative text-2xl md:text-3xl font-semibold tracking-tight text-white mb-4 leading-tight">
                        {tr(openDemo.label)}
                      </h4>
                      
                      <div className={`relative h-px w-16 bg-gradient-to-r ${openDemo.accent} mb-5`} />
                      
                      <p className="relative text-[14.5px] md:text-[15px] leading-relaxed text-white/75">
                        {tr(openDemo.desc)}
                      </p>
                      
                      <div className="relative mt-6 flex flex-wrap gap-2">
                        {openDemo.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] tracking-wide font-medium text-white/70 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:text-white transition-colors"
                          >
                            {tr(t)}
                          </span>
                        ))}
                      </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Why Smilo / Lovable — fullscreen story modal */}
      <AnimatePresence>
        {openWhy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenWhy(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenWhy(null);
              }}
              aria-label="Fechar"
              className="sm:hidden fixed right-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-[120] h-11 w-11 inline-flex items-center justify-center rounded-full bg-black/80 backdrop-blur-xl text-white border border-white/20 shadow-lg shadow-black/50 active:scale-95 transition-transform"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-7xl rounded-3xl p-[1.5px] shadow-2xl ${
                openWhy === "smilo"
                  ? "bg-gradient-to-br from-orange-400/60 via-orange-400/30 to-orange-400/40 shadow-orange-500/20"
                  : "bg-gradient-to-br from-pink-400/60 via-rose-400/30 to-pink-400/40 shadow-pink-500/20"
              }`}
            >
              {/* Outer glow */}
              <div
                className={`absolute -inset-8 rounded-[2.5rem] opacity-20 blur-3xl pointer-events-none -z-10 ${
                  openWhy === "smilo"
                    ? "bg-gradient-to-br from-orange-500 to-orange-500"
                    : "bg-gradient-to-br from-pink-500 to-rose-500"
                }`}
              />

              <div className="relative rounded-[1.4rem] overflow-hidden bg-gradient-to-b from-[#070713] to-[#04040a] border border-white/5">
                <div className="grid lg:grid-cols-[1.1fr_1fr]">
                  {/* Left: vertical photo carousel */}
                  <div className="relative h-[60vh] lg:h-[72vh] overflow-hidden bg-[radial-gradient(ellipse_at_center,_#0d1024_0%,_#04040a_70%)]">
                    <div
                      className={`absolute inset-0 opacity-[0.08] pointer-events-none ${
                        openWhy === "smilo"
                          ? "bg-gradient-to-br from-orange-500 via-orange-500 to-orange-500"
                          : "bg-gradient-to-br from-pink-500 via-rose-500 to-pink-500"
                      }`}
                    />
                    {/* Top + bottom fade masks */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#04040a] to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04040a] to-transparent z-10" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                          animate={{ y: ((activeWhyGallery.length - 1) / 2 - (carouselIdx % activeWhyGallery.length)) * 280 }}
                          transition={
                            carouselIdx % activeWhyGallery.length === 0
                              ? { duration: 0 }
                              : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
                          }
                          className="flex flex-col items-center"
                        >
                          {activeWhyGallery.map((img, i) => {
                            const isActive = i === carouselIdx % activeWhyGallery.length;
                            return (
                              <motion.div
                                key={img.src + i}
                                animate={{
                                  scale: isActive ? 1.04 : 0.86,
                                  opacity: isActive ? 1 : 0.28,
                                  filter: isActive ? "blur(0px)" : "blur(2px)",
                                }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                                style={{ height: 280 }}
                                className="w-full flex items-center justify-center px-8"
                              >
                                <div
                                  className={`relative rounded-xl overflow-hidden border border-white/10 shadow-2xl ${
                                    isActive
                                      ? openWhy === "smilo"
                                        ? "shadow-orange-500/30 ring-1 ring-orange-400/30"
                                        : "shadow-pink-500/30 ring-1 ring-pink-400/30"
                                      : "shadow-black/40"
                                  }`}
                                >
                                  <img
                                    src={img.src}
                                    alt={img.label}
                                    loading="lazy"
                                    decoding="async"
                                    className="block max-h-[260px] w-auto object-contain bg-black/40"
                                  />
                                  {isActive && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.5, duration: 0.4 }}
                                      className="absolute bottom-0 inset-x-0 px-4 py-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                                    >
                                      <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/90">
                                        {img.label}
                                      </span>
                                    </motion.div>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                      </motion.div>
                    </div>

                    {/* Side dots indicator */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5">
                      {activeWhyGallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCarouselIdx(i)}
                          aria-label={`Ir para imagem ${i + 1}`}
                          className={`w-1.5 rounded-full transition-all duration-300 ${
                            i === carouselIdx % activeWhyGallery.length
                              ? `h-6 ${openWhy === "smilo" ? "bg-orange-300" : "bg-pink-300"}`
                              : "h-1.5 bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: descriptive text */}
                  <div className="relative p-7 md:p-10 border-t lg:border-t-0 lg:border-l border-white/5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent overflow-y-auto max-h-[60vh] lg:max-h-[72vh] flex flex-col">
                    <div
                      className={`pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl ${
                        openWhy === "smilo"
                          ? "bg-gradient-to-br from-orange-500 to-orange-500"
                          : "bg-gradient-to-br from-pink-500 to-rose-500"
                      }`}
                    />
                    <div
                      className={`relative inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-semibold mb-4 ${
                        openWhy === "smilo" ? "text-orange-200/85" : "text-pink-200/85"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          openWhy === "smilo" ? "bg-orange-400" : "bg-pink-400"
                        }`}
                      />
                      {openWhy === "smilo" ? "A origem" : "A construção"}
                    </div>
                    <h4 className="relative text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 leading-[1.15]">
                      {openWhy === "smilo" ? (
                        <>Por que criei o <span className="bg-gradient-to-r from-orange-300 to-orange-300 bg-clip-text text-transparent">Smilo</span></>
                      ) : (
                        <>Construído com <span className="bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">Lovable</span></>
                      )}
                    </h4>
                    <div
                      className={`relative h-px w-16 mb-6 ${
                        openWhy === "smilo"
                          ? "bg-gradient-to-r from-orange-400 to-orange-400"
                          : "bg-gradient-to-r from-pink-400 to-rose-400"
                      }`}
                    />
                      <p className="relative text-[15px] md:text-[15.5px] leading-relaxed text-white/75">
                        {openWhy === "smilo" ? (
                          lang === "en" ? (
                            <>
                              Smilo was born from a real need: optimizing the operation of the HR team at{" "}
                              <span className="text-white font-medium">SouSmile</span>. By mapping repetitive processes that consumed hours of the department, such as tax validations and portal lookups, I built RPA automations focused on efficiency. The outcome? Tasks that used to take up to 2 hours now finish in under 10 minutes. It delivered immediate productivity gains for the company and marked my maturity as an automation engineer.
                            </>
                          ) : (
                            <>
                              O Smilo foi criado a partir de uma necessidade real: otimizar a operação do time de RH da{" "}
                              <span className="text-white font-medium">SouSmile</span>. Ao mapear processos repetitivos que consumiam horas do departamento, como validações fiscais e consultas em portais, desenvolvi automações RPA focadas em eficiência. O resultado? Tarefas que demoravam até 2 horas passaram a ser concluídas em menos de 10 minutos. Foi uma entrega que gerou ganho de produtividade imediato para a empresa e marcou meu amadurecimento como engenheiro de automação.
                            </>
                          )
                        ) : (
                          lang === "en" ? (
                            <>
                              To build Smilo, I used <span className="text-white font-medium">Lovable</span>, a full-stack AI platform I discovered through SouSmile. This technology redefined how I build software, acting as a smart copilot alongside traditional engineering. The result of this combination was a robust architecture delivered in record time: 8 integrated modules, real-time sync, RPA and 10+ edge functions. I turned months of development into weeks — a milestone that became the catalyst for my transition into backend development.
                            </>
                          ) : (
                            <>
                              Para viabilizar o Smilo, utilizei o <span className="text-white font-medium">Lovable</span>, uma plataforma de IA full-stack que conheci através da SouSmile. Essa tecnologia redefiniu minha forma de criar software, atuando como um copiloto inteligente aliado à engenharia tradicional. O resultado dessa união foi a entrega de uma arquitetura robusta em tempo recorde: 8 módulos integrados, sincronização em tempo real, RPA e mais de 10 edge functions. Transformei meses de desenvolvimento em semanas, um marco que serviu como o grande catalisador para a minha transição para o desenvolvimento backend.
                            </>
                          )
                        )}
                      </p>
                    <div className="relative mt-7 grid grid-cols-3 gap-3">
                      {(openWhy === "smilo"
                        ? [
                            { k: "Antes", v: "2h" },
                            { k: "Depois", v: "<10min" },
                            { k: "Ganho", v: "12×" },
                          ]
                        : [
                            { k: "Módulos", v: "8" },
                            { k: "Edge Fns", v: "10+" },
                            { k: "Tempo", v: "Semanas" },
                          ]
                      ).map((s) => (
                        <div
                          key={s.k}
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:bg-white/[0.05] transition-colors"
                        >
                          <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">
                            {s.k}
                          </div>
                          <div className="text-base font-semibold text-white">{s.v}</div>
                        </div>
                      ))}
                    </div>
                    {openAudit === "solution" && (
                      <div className="relative mt-8 pt-7 border-t border-white/10">
                        <div className="mb-5">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-[0.22em] uppercase bg-violet-500/10 text-violet-200 border border-violet-400/20">
                            {lang === "en" ? "Architecture" : "Arquitetura"}
                          </span>
                          <h5 className="mt-2 text-lg md:text-xl font-semibold text-white">
                            {lang === "en" ? "Two technological layers" : "Duas camadas tecnológicas"}
                          </h5>
                          <p className="mt-1.5 text-white/55 text-[13px] leading-relaxed">
                            {lang === "en"
                              ? "Queue-based RPA pattern with a clear split between orchestration and state persistence."
                              : "Padrão Queue-Based RPA, com separação clara entre orquestração e persistência de estado."}
                          </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            {
                              icon: Workflow,
                              ring: "border-emerald-400/20 bg-emerald-500/[0.04]",
                              iconColor: "text-emerald-300",
                              tagColor: "bg-emerald-500/10 text-emerald-200 border-emerald-400/20",
                              tag: lang === "en" ? "Orchestration" : "Orquestração",
                              title: "Power Automate Desktop",
                              desc:
                                lang === "en"
                                  ? "Manages the lifecycle: reads the queue, fires HTTP GET to BrasilAPI and validates status (only 200 OK proceeds)."
                                  : "Gerencia o ciclo: lê a fila, dispara HTTP GET para a BrasilAPI e valida o status (apenas 200 OK avança).",
                            },
                            {
                              icon: Database,
                              ring: "border-violet-400/20 bg-violet-500/[0.04]",
                              iconColor: "text-violet-300",
                              tagColor: "bg-violet-500/10 text-violet-200 border-violet-400/20",
                              tag: lang === "en" ? "Persistence & State" : "Persistência e Estado",
                              title: "SQLite",
                              desc:
                                lang === "en"
                                  ? "PRIMARY KEY uniqueness and strict DML (SELECT/UPDATE) guarantee idempotency — zero duplicate processing."
                                  : "Unicidade por PRIMARY KEY e uso estrito de DML (SELECT/UPDATE) garantem idempotência — zero processamento duplicado.",
                            },
                          ].map((layer, i) => {
                            const Icon = layer.icon;
                            return (
                              <div
                                key={i}
                                className={`relative rounded-xl border ${layer.ring} p-4`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <div className={`shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center ${layer.iconColor}`}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className={`inline-block px-1.5 py-0.5 rounded-full text-[8px] font-semibold tracking-[0.18em] uppercase border ${layer.tagColor}`}>
                                      {layer.tag}
                                    </span>
                                    <h6 className="mt-1 text-sm font-semibold text-white leading-tight">
                                      {layer.title}
                                    </h6>
                                  </div>
                                </div>
                                <p className="mt-2.5 text-white/60 text-[12.5px] leading-relaxed">{layer.desc}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audit — Challenge / Solution story modal */}
      <AnimatePresence>
        {openAudit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenAudit(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenAudit(null);
              }}
              aria-label="Fechar"
              className="sm:hidden fixed right-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-[120] h-11 w-11 inline-flex items-center justify-center rounded-full bg-black/80 backdrop-blur-xl text-white border border-white/20 shadow-lg shadow-black/50 active:scale-95 transition-transform"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-7xl rounded-3xl p-[1.5px] shadow-2xl ${
                openAudit === "challenge"
                  ? "bg-gradient-to-br from-rose-400/60 via-rose-400/30 to-rose-400/40 shadow-rose-500/20"
                  : "bg-gradient-to-br from-emerald-400/60 via-teal-400/30 to-emerald-400/40 shadow-emerald-500/20"
              }`}
            >
              <div
                className={`absolute -inset-8 rounded-[2.5rem] opacity-20 blur-3xl pointer-events-none -z-10 ${
                  openAudit === "challenge"
                    ? "bg-gradient-to-br from-rose-500 to-rose-500"
                    : "bg-gradient-to-br from-emerald-500 to-teal-500"
                }`}
              />
              <div className="relative rounded-[1.4rem] overflow-hidden bg-gradient-to-b from-[#070713] to-[#04040a] border border-white/5">
                <div className="grid lg:grid-cols-[1.1fr_1fr]">
                  {/* Image side */}
                  <div className="relative max-h-[72vh] overflow-hidden bg-[radial-gradient(ellipse_at_center,_#0d1024_0%,_#04040a_70%)] flex items-center justify-center p-6 md:p-10">
                    <button
                      type="button"
                      onClick={() => setAuditZoom(true)}
                      className="group relative block cursor-zoom-in"
                      aria-label={lang === "en" ? "Expand image" : "Ampliar imagem"}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={openAudit === "challenge" ? auditCnpjDatabase : auditCnpjFlow}
                        alt={
                          openAudit === "challenge"
                            ? lang === "en"
                              ? "Pending CNPJs in SQLite database"
                              : "Base de CNPJs pendentes no banco SQLite"
                            : lang === "en"
                            ? "Power Automate Desktop flow"
                            : "Fluxo no Power Automate Desktop"
                        }
                        className={`max-h-[60vh] w-auto max-w-full object-contain rounded-xl border shadow-2xl transition-transform group-hover:scale-[1.02] ${
                          openAudit === "challenge"
                            ? "border-rose-400/20 shadow-rose-500/20"
                            : "border-emerald-400/20 shadow-emerald-500/20"
                        }`}
                      />
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/85 border border-white/15 opacity-80 group-hover:opacity-100">
                        <Maximize2 className="h-3 w-3" />
                        {lang === "en" ? "Expand" : "Ampliar"}
                      </span>
                    </button>
                  </div>

                  {/* Text side */}
                  <div className="relative p-7 md:p-10 border-t lg:border-t-0 lg:border-l border-white/5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent overflow-y-auto max-h-[60vh] lg:max-h-[72vh] flex flex-col">
                    <div
                      className={`pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl ${
                        openAudit === "challenge"
                          ? "bg-gradient-to-br from-rose-500 to-rose-500"
                          : "bg-gradient-to-br from-emerald-500 to-teal-500"
                      }`}
                    />
                    <div
                      className={`relative inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-semibold mb-4 ${
                        openAudit === "challenge" ? "text-rose-200/85" : "text-emerald-200/85"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          openAudit === "challenge" ? "bg-rose-400" : "bg-emerald-400"
                        }`}
                      />
                      {openAudit === "challenge"
                        ? lang === "en" ? "The Challenge" : "O Desafio"
                        : lang === "en" ? "The Solution" : "A Solução"}
                    </div>
                    <h4 className="relative text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 leading-[1.15]">
                      {openAudit === "challenge" ? (
                        lang === "en"
                          ? <>Hundreds of <span className="bg-gradient-to-r from-rose-300 to-rose-300 bg-clip-text text-transparent">CNPJs</span> to validate</>
                          : <>Centenas de <span className="bg-gradient-to-r from-rose-300 to-rose-300 bg-clip-text text-transparent">CNPJs</span> para validar</>
                      ) : (
                        lang === "en"
                          ? <>Queue-based <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">RPA</span></>
                          : <>RPA orientado a <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">fila</span></>
                      )}
                    </h4>
                    <div
                      className={`relative h-px w-16 mb-6 ${
                        openAudit === "challenge"
                          ? "bg-gradient-to-r from-rose-400 to-rose-400"
                          : "bg-gradient-to-r from-emerald-400 to-teal-400"
                      }`}
                    />
                    <div className="relative space-y-4 text-[15px] md:text-[15.5px] leading-relaxed text-white/75">
                      {openAudit === "challenge" ? (
                        lang === "en" ? (
                          <>
                            <p>
                              In a corporate setting, keeping a client or supplier database up to date is critical for fiscal and financial compliance. Manually checking each CNPJ on the Federal Revenue base is an expensive, repetitive process highly prone to human error.
                            </p>
                            <p>
                              The pending records arrive in a relational base with hundreds of rows: each one requires opening the portal, typing the CNPJ, solving validations and copying the result back. A pure data-entry workload that consumes hours and risks duplicate or inconsistent updates — exactly what this automation eliminates.
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              Em cenários corporativos, manter uma base de clientes ou fornecedores atualizada é crítico para o compliance fiscal e financeiro. Consultar manualmente a situação cadastral na Receita Federal para centenas de empresas é um processo operacional oneroso, repetitivo e suscetível a erros humanos.
                            </p>
                            <p>
                              Os registros pendentes chegam em uma base relacional com centenas de linhas: cada um exige abrir o portal, digitar o CNPJ, resolver validações e copiar o retorno. Uma carga pura de <span className="text-white font-medium">Data Entry</span> que consome horas e abre margem para atualizações duplicadas ou inconsistentes — exatamente o que esta automação elimina.
                            </p>
                          </>
                        )
                      ) : (
                        lang === "en" ? (
                          <>
                            <p>
                              The flow reads pending records via <span className="text-white font-medium">ODBC</span> (<code className="text-emerald-200">SELECT ... WHERE Status = 'Pendente'</code>), calls <span className="text-white font-medium">BrasilAPI</span> for each CNPJ and validates the HTTP 200 response before moving on.
                            </p>
                            <p>
                              A Python 3 middleware deserializes the JSON payload, sanitizes the Razão Social and returns the values to Power Automate, which executes a parameterized <span className="text-white font-medium">UPDATE</span> on the SQLite base — closing the loop in a single idempotent pass with transactional integrity (ACID) and zero duplicate processing.
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              O fluxo lê os registros pendentes via <span className="text-white font-medium">ODBC</span> (<code className="text-emerald-200">SELECT ... WHERE Status = 'Pendente'</code>), invoca a <span className="text-white font-medium">BrasilAPI</span> para cada CNPJ e valida a resposta HTTP 200 antes de prosseguir.
                            </p>
                            <p>
                              Um middleware em Python 3 deserializa o payload JSON, sanitiza a Razão Social e devolve os valores para o Power Automate, que executa um <span className="text-white font-medium">UPDATE</span> parametrizado na base SQLite — fechando o ciclo em uma única passada idempotente, com integridade transacional (ACID) e zero processamento duplicado.
                            </p>
                          </>
                        )
                      )}
                    </div>
                    {openAudit === "challenge" && (
                      <div className="relative mt-7 grid grid-cols-2 gap-3">
                        {[
                          { k: lang === "en" ? "Volume" : "Volume", v: "100+" },
                          { k: lang === "en" ? "Time/CNPJ" : "Tempo/CNPJ", v: "~90s" },
                        ].map((s) => (
                          <div
                            key={s.k}
                            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:bg-white/[0.05] transition-colors"
                          >
                            <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">
                              {s.k}
                            </div>
                            <div className="text-base font-semibold text-white">{s.v}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audit image zoom overlay */}
      <AnimatePresence>
        {openAudit && auditZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setAuditZoom(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setAuditZoom(false);
              }}
              aria-label="Fechar"
              className="fixed right-4 top-4 z-[210] h-11 w-11 inline-flex items-center justify-center rounded-full bg-black/80 text-white border border-white/20 shadow-lg hover:bg-black"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              src={openAudit === "challenge" ? auditCnpjDatabase : auditCnpjFlow}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-w-[95vw] max-h-[92vh] w-auto h-auto object-contain rounded-xl border border-white/10 shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}