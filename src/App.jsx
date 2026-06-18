import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Zap, Sparkles, CheckCircle2, ChevronDown, Calendar,
  BrainCircuit, Megaphone, AlertTriangle, Star, Menu, X, Plus,
  ShieldCheck, Search, Users, TrendingUp, CheckCircle,
  XCircle, AlertCircle, ArrowRight
} from 'lucide-react';

/* ─── HOOKS ─────────────────────────────────────────────────────────────── */
const useCountUp = (end, duration = 2200) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    let t0 = null;
    const ease = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(ease(p) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end, duration]);
  return [count, ref];
};

const useReveal = (delay = 0) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setVis(true), delay); }, { threshold: 0.07, rootMargin: '0px 0px -50px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, vis];
};

const Stat = ({ val, suffix = '', prefix = '' }) => {
  const [n, r] = useCountUp(val);
  return <span ref={r}>{prefix}{n}{suffix}</span>;
};

/* ─── GLOW CARD (mouse-tracking spotlight) ──────────────────────────────── */
function GlowCard({ children, className = '', amber = false }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--mx', `${x}%`);
    ref.current.style.setProperty('--my', `${y}%`);
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} className={`glow-card ${amber ? 'amber' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ─── WHATSAPP ICON ─────────────────────────────────────────────────────── */
const WaIcon = () => (
  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.748.002-2.607-1.012-5.059-2.859-6.91-1.847-1.851-4.3-2.87-6.917-2.871-5.438 0-9.863 4.37-9.867 9.75-.001 1.773.49 3.512 1.42 5.047l-.995 3.635 3.723-.977zm11.367-7.251c-.26-.13-1.538-.759-1.776-.847-.239-.088-.413-.133-.587.13-.174.26-.674.847-.826 1.02-.152.174-.304.195-.565.065-.26-.13-1.097-.404-2.09-1.288-.772-.689-1.293-1.54-1.445-1.8-.152-.26-.016-.4.115-.53.117-.118.26-.304.39-.456.13-.152.174-.26.26-.434.088-.174.043-.326-.022-.456-.065-.13-.587-1.41-.804-1.93-.213-.513-.448-.443-.615-.443-.16-.003-.343-.003-.527-.003-.184 0-.485.07-.739.348-.254.278-.972.951-.972 2.321 0 1.37.994 2.695 1.135 2.89.141.195 1.958 2.99 4.743 4.193.662.286 1.18.457 1.582.585.665.21 1.27.18 1.748.11.532-.08 1.538-.629 1.756-1.237.217-.609.217-1.13.152-1.237-.065-.109-.239-.152-.499-.283z"/>
  </svg>
);

/* ─── MAIN ──────────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openService, setOpenService] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [pricingTab, setPricingTab] = useState('all');
  const [expandedPlan, setExpandedPlan] = useState({});
  const [wordIdx, setWordIdx] = useState(0);
  const [showFloat, setShowFloat] = useState(false);

  const logo = 'https://res.cloudinary.com/dfj0ckm10/image/upload/q_auto/f_auto/v1778464000/ChatGPT_Image_May_10_2026_08_45_58_PM_fo32bz.png';
  const words = ['con IA.', 'en automático.', 'sin límites.', 'sin anuncios.'];

  /* rotating words */
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, []);

  /* scroll state */
  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 30); setShowFloat(window.scrollY > 700); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* floating cards parallax */
  useEffect(() => {
    const cards = document.querySelectorAll('.float-card');
    const hero = document.getElementById('hero-section');
    if (!hero) return;
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      cards.forEach(c => {
        const depth = parseFloat(c.dataset.depth || 1);
        c.style.setProperty('--px', `${cx * depth * 22}px`);
        c.style.setProperty('--py', `${cy * depth * 14}px`);
      });
    };
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  /* acq-flow step animation */
  useEffect(() => {
    const steps = document.querySelectorAll('.acq-step');
    const fill = document.getElementById('acq-fill');
    if (!steps.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.step);
          e.target.classList.add('lit');
          if (fill) fill.style.width = `${((idx - 1) / (steps.length - 1)) * 84}%`;
        }
      });
    }, { threshold: 0.4 });
    steps.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const goto = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  /* ── DATA ────────────────────────────────────────────────────────────── */
  const services = [
    {
      id: 'ia', tag: 'INTELIGENCIA & RESPUESTA', title: 'Agentes IA Nativa',
      icon: <BrainCircuit size={20} />,
      desc: 'Entrenamos cerebros digitales con el conocimiento de tu empresa. Agentes con razonamiento real que venden, califican leads y agendan citas 24/7.',
      features: ['Venta conversacional WhatsApp 24/7', 'Calificación automática de leads', 'Agendamiento autónomo en Calendly', 'Conexión directa a tu CRM'],
      before: 'Leads que mueren en tu bandeja porque tardas horas en responder.',
      after: 'Agente IA responde en < 10 segundos, califica presupuesto y agenda la cita.',
    },
    {
      id: 'geo', tag: 'VISIBILIDAD & AUTORIDAD', title: 'Contenido Orgánico & GEO',
      icon: <Megaphone size={20} />,
      desc: 'Cero dólares en anuncios. Posicionamiento omnicanal para liderar Google Y ser citado por ChatGPT, Claude y Gemini.',
      features: ['GEO — Generative Engine Optimization', 'Posicionamiento SEO local #1', 'Contenido de alta retención viral', 'Copys persuasivos orientados al ROI'],
      before: 'Dependes de pauta cara que se apaga cuando dejas de pagar.',
      after: 'Eres citado como referente por IAs y buscadores sin costo de pauta.',
    },
    {
      id: 'auto', tag: 'PROCESOS & PRODUCTIVIDAD', title: 'Automatización de Procesos',
      icon: <Zap size={20} />,
      desc: 'Conectamos todo tu software. CRM, pagos, bases de datos y comunicaciones trabajando en sintonía sin intervención humana.',
      features: ['Flujos automatizados Make / Zapier', 'Sincronización de CRM', 'Alertas y webhooks en tiempo real', 'Métricas centralizadas automáticas'],
      before: 'Tu equipo pierde el 40% del día copiando datos entre Excel, WhatsApp y correos.',
      after: 'Un lead entra, se crea en CRM, se genera factura y se notifica al equipo solo.',
    },
  ];

  const faqs = [
    { q: '¿Tengo que pagar anuncios (Ads)?', a: 'No. Nuestro enfoque es 100% orgánico. Construimos infraestructura que genera autoridad y atrae clientes sin depender de pauta pagada.' },
    { q: '¿Cuánto tarda la implementación?', a: 'Un sistema de IA o automatización estándar tarda entre 10 y 15 días en estar totalmente operativo y entrenado con los datos de tu negocio.' },
    { q: '¿Necesito conocimientos técnicos?', a: 'Cero. Nosotros gestionamos toda la arquitectura técnica. Tú solo recibes los leads calificados directamente en tu WhatsApp o CRM.' },
    { q: '¿Cómo sé que funcionará para mí?', a: 'Por eso ofrecemos un diagnóstico gratuito. Solo aceptamos clientes donde la tecnología pueda generar un ROI claro en los primeros 60 días.' },
    { q: '¿Qué pasa si el bot comete un error?', a: 'Tenemos protocolos de escalamiento humano. Si el agente no puede resolver una consulta, escala inmediatamente al equipo responsable sin que el cliente lo note.' },
  ];

  const plans = [
    { id: 'web', type: 'marketing', cat: 'Activo digital', title: 'Página Web Profesional',
      desc: 'Landing page de alta conversión, optimizada para móvil, con botón WhatsApp y Google Maps. El sitio te pertenece para siempre.',
      setup: '$500.000 – $600.000 COP', setupLabel: 'Pago único · El sitio es tuyo',
      rec: '~$50.000 COP / año', recLabel: 'Renovación de dominio (pago directo al proveedor)',
      pills: ['Diseño a medida', 'Mobile first', 'Botón WhatsApp', 'Entrega 7 días'], featured: false },
    { id: 'chatbot', type: 'ia', cat: 'Servicio activo', title: 'Chatbot WhatsApp con IA',
      desc: 'Agente inteligente entrenado con tu negocio. Responde, califica y agenda solo las 24 horas.',
      setup: '$650.000 COP', setupLabel: 'Setup, instalación y entrenamiento inicial',
      rec: '$100.000 COP / mes', recLabel: 'Operación, actualizaciones y soporte continuo',
      pills: ['Respuesta < 30s', 'Calificación leads', 'Agendamiento solo', 'Reporte mensual'], featured: false },
    { id: 'pack', type: 'marketing', cat: 'Pack completo', title: 'Pack Presencia Digital',
      desc: 'Web + Google Maps optimizado + 1 red social gestionada + 5 piezas de contenido mensual.',
      setup: '$1.000.000 COP', setupLabel: 'Setup completo · Mes 1',
      rec: '$50.000 – $100.000 COP / mes', recLabel: 'Gestión de contenido (según volumen)',
      pills: ['Web o rediseño', 'Google Maps #1', '1 red gestionada', '5 piezas/mes', 'SEO local'], featured: true },
    { id: 'flows', type: 'ia', cat: 'Sistemas a medida', title: 'Automatizaciones Custom',
      desc: 'Conexión integral de tus apps. CRM, pagos, bases de datos y comunicaciones autónomas.',
      setup: 'Desde $800.000 COP', setupLabel: 'Según complejidad del flujo técnico',
      rec: 'Sin costo mensual obligatorio', recLabel: 'Soporte & Mantenimiento opcional',
      pills: ['Webhooks & APIs', 'Flujos Make/Zapier', 'Conexión CRM', 'Cero error humano'], featured: false },
  ];

  const [r1,v1]=useReveal(); const [r2,v2]=useReveal(50); const [r3,v3]=useReveal(100);
  const [r4,v4]=useReveal(); const [r5,v5]=useReveal(); const [r6,v6]=useReveal();
  const [r7,v7]=useReveal(); const [r8,v8]=useReveal();

  return (
    <div className="veluz-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;900&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{margin:0;font-family:'Geist',system-ui,sans-serif;background:#030710;color:#fff;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        h1,h2,h3,h4{letter-spacing:-0.02em;text-wrap:balance;}
        p{text-wrap:pretty;}
        .veluz-root{position:relative;}

        /* ── Grid bg ── */
        .grid-bg{background-image:linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px);background-size:64px 64px;}

        /* ── Mesh hero bg ── */
        .mesh-bg{background:
          radial-gradient(ellipse 55% 45% at 20% 0%,rgba(191,255,0,0.28) 0%,transparent 55%),
          radial-gradient(ellipse 45% 40% at 80% 5%,rgba(191,255,0,0.16) 0%,transparent 50%),
          radial-gradient(ellipse 70% 60% at 50% 100%,rgba(191,255,0,0.04) 0%,transparent 60%);}

        /* ── Section glow top ── */
        .section-glow{background:radial-gradient(ellipse 70% 55% at 50% 0%,rgba(191,255,0,0.10) 0%,transparent 60%);}

        /* ── Gradient text ── */
        .gradient-text{background:linear-gradient(180deg,#FFFFFF 0%,rgba(191,255,0,0.85) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

        /* ── Serif italic accent ── */
        .serif-accent{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;color:#BFFF00;letter-spacing:-0.01em;}

        /* ── Mono label ── */
        .mono-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(191,255,0,0.8);}

        /* ── Noise overlay ── */
        .veluz-root::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");opacity:0.022;pointer-events:none;z-index:0;mix-blend-mode:overlay;}

        /* ── Reveal ── */
        .reveal{opacity:0;transform:translateY(22px);transition:opacity 600ms cubic-bezier(0.16,1,0.3,1),transform 600ms cubic-bezier(0.16,1,0.3,1);}
        .reveal.visible{opacity:1;transform:translateY(0);}
        .reveal-1{transition-delay:60ms;} .reveal-2{transition-delay:120ms;} .reveal-3{transition-delay:180ms;} .reveal-4{transition-delay:240ms;}

        /* ── Lift card ── */
        .lift{transition:transform 220ms cubic-bezier(0.16,1,0.3,1),border-color 220ms ease,box-shadow 220ms ease;}
        .lift:hover{transform:translateY(-4px);border-color:rgba(191,255,0,0.3)!important;box-shadow:0 16px 40px -12px rgba(191,255,0,0.15);}

        /* ── Glow card ── */
        .glow-card{position:relative;background:linear-gradient(160deg,rgba(15,28,12,0.6),rgba(8,18,6,0.35));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px 32px;overflow:hidden;transition:border-color 400ms ease,transform 350ms cubic-bezier(0.16,1,0.3,1);}
        .glow-card::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(191,255,0,0.16),rgba(191,255,0,0.05) 30%,transparent 60%);opacity:0;transition:opacity 300ms ease;z-index:0;}
        .glow-card::after{content:'';position:absolute;inset:-1px;border-radius:inherit;pointer-events:none;background:radial-gradient(200px circle at var(--mx,50%) var(--my,50%),rgba(191,255,0,0.45),transparent 70%);opacity:0;transition:opacity 300ms ease;z-index:0;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px;}
        .glow-card:hover{border-color:rgba(255,255,255,0.12);transform:translateY(-3px);}
        .glow-card:hover::before{opacity:1;}
        .glow-card:hover::after{opacity:1;}
        .glow-card>*{position:relative;z-index:1;}
        .glow-card.amber::before{background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(255,210,0,0.14),rgba(255,210,0,0.04) 30%,transparent 60%);}
        .glow-card.amber::after{background:radial-gradient(200px circle at var(--mx,50%) var(--my,50%),rgba(255,210,0,0.45),transparent 70%);}

        /* ── CTA glow button ── */
        .cta-glow{position:relative;cursor:pointer;transition:transform 150ms cubic-bezier(0.16,1,0.3,1);}
        .cta-glow::after{content:'';position:absolute;inset:-2px;border-radius:inherit;background:linear-gradient(45deg,#BFFF00,#a0e000,#BFFF00);z-index:-1;opacity:0.45;filter:blur(14px);transition:opacity 200ms ease;}
        .cta-glow:hover::after{opacity:0.85;}
        .cta-glow:active{transform:scale(0.98);}

        /* ── Comets ── */
        .comets{position:absolute;inset:0;z-index:2;overflow:hidden;pointer-events:none;}
        .comet{position:absolute;width:130px;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(191,255,0,0.45) 60%,rgba(255,255,255,0.9) 100%);transform:rotate(-30deg);opacity:0;filter:blur(0.3px);animation:cometFly linear infinite;}
        .comet::after{content:'';position:absolute;right:0;top:-1.5px;width:4px;height:4px;background:rgba(255,255,255,0.95);border-radius:50%;box-shadow:0 0 8px rgba(191,255,0,0.8),0 0 16px rgba(191,255,0,0.4);}
        .comet:nth-child(1){top:7%;left:95%;animation-duration:5s;animation-delay:0s;}
        .comet:nth-child(2){top:22%;left:92%;animation-duration:7s;animation-delay:4.5s;}
        .comet:nth-child(3){top:11%;left:72%;animation-duration:6s;animation-delay:9s;}
        .comet:nth-child(4){top:38%;left:96%;animation-duration:8s;animation-delay:14s;}
        .comet:nth-child(5){top:58%;left:87%;animation-duration:6.5s;animation-delay:20s;}
        .comet:nth-child(6){top:4%;left:62%;animation-duration:7.5s;animation-delay:25s;}
        @keyframes cometFly{0%{transform:rotate(-30deg) translateX(0);opacity:0;}8%{opacity:0.8;}85%{opacity:0.8;}100%{transform:rotate(-30deg) translateX(-1100px);opacity:0;}}

        /* ── Floating hero cards ── */
        .float-layer{position:absolute;inset:0;pointer-events:none;z-index:5;overflow:hidden;}
        @media(max-width:900px){.float-layer{display:none;}}
        .float-card{position:absolute;pointer-events:auto;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:linear-gradient(135deg,rgba(6,18,4,0.72),rgba(6,18,4,0.45));border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px 16px;box-shadow:0 12px 40px -8px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.05);transition:transform 700ms cubic-bezier(0.16,1,0.3,1);transform:translate(var(--px,0px),var(--py,0px)) rotate(var(--rot,0deg));will-change:transform;}
        .float-card:hover{box-shadow:0 16px 50px -8px rgba(191,255,0,0.25),inset 0 1px 0 rgba(255,255,255,0.1);}
        .float-card .fc-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(191,255,0,0.75);margin-bottom:6px;}
        .float-card .fc-val{font-family:'Instrument Serif',serif;font-style:italic;font-size:28px;line-height:1;color:#fff;margin-bottom:4px;}
        .float-card .fc-sub{font-size:11px;color:rgba(255,255,255,0.5);line-height:1.35;}
        .float-card.lime-border{border-color:rgba(191,255,0,0.28);}
        .float-card.gold-border{border-color:rgba(255,210,0,0.28);}
        .fc-chat-bubble{background:rgba(255,255,255,0.06);border-radius:10px;padding:10px 12px;font-size:12px;color:rgba(255,255,255,0.82);line-height:1.4;}
        .fc-chat-bubble+.fc-chat-bubble{margin-top:6px;background:rgba(191,255,0,0.12);}
        .fc-chat-name{display:flex;align-items:center;gap:6px;font-size:10px;color:rgba(255,255,255,0.45);margin-bottom:8px;}
        .fc-chat-name::before{content:'';width:6px;height:6px;border-radius:50%;background:#34d399;box-shadow:0 0 8px #34d399;}

        /* ── VSL / Video section ── */
        .vsl-wrap{position:relative;max-width:820px;margin:0 auto;}
        .vsl-corner{position:absolute;width:24px;height:24px;}
        .vsl-corner.tl{top:-8px;left:-8px;border-top:2px solid rgba(191,255,0,0.65);border-left:2px solid rgba(191,255,0,0.65);}
        .vsl-corner.tr{top:-8px;right:-8px;border-top:2px solid rgba(191,255,0,0.65);border-right:2px solid rgba(191,255,0,0.65);}
        .vsl-corner.bl{bottom:-8px;left:-8px;border-bottom:2px solid rgba(191,255,0,0.65);border-left:2px solid rgba(191,255,0,0.65);}
        .vsl-corner.br{bottom:-8px;right:-8px;border-bottom:2px solid rgba(191,255,0,0.65);border-right:2px solid rgba(191,255,0,0.65);}
        @keyframes floatVSL{0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}
        .vsl-float{animation:floatVSL 7s ease-in-out infinite;}

        /* ── acq-flow (Método steps) ── */
        .acq-flow{position:relative;padding:44px 0 16px;}
        .acq-line{position:absolute;top:62px;left:8%;right:8%;height:2px;background:rgba(255,255,255,0.05);border-radius:1px;z-index:0;}
        .acq-line-fill{position:absolute;top:62px;left:8%;height:2px;width:0%;background:linear-gradient(90deg,#BFFF00 0%,rgba(191,255,0,0.5) 100%);border-radius:1px;box-shadow:0 0 12px rgba(191,255,0,0.5);transition:width 900ms cubic-bezier(0.16,1,0.3,1);z-index:1;}
        .acq-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;position:relative;z-index:2;}
        .acq-step{position:relative;padding:62px 18px 24px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.06);border-radius:16px;text-align:center;opacity:0.3;transition:opacity 700ms cubic-bezier(0.16,1,0.3,1),transform 700ms cubic-bezier(0.16,1,0.3,1),border-color 500ms ease,background 500ms ease,box-shadow 500ms ease;}
        .acq-step.lit{opacity:1;transform:translateY(-5px);border-color:rgba(191,255,0,0.3);background:rgba(191,255,0,0.03);box-shadow:0 8px 32px -8px rgba(191,255,0,0.15);}
        .acq-num{position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(-50%);width:58px;height:58px;border-radius:50%;background:#030710;border:2px solid rgba(191,255,0,0.2);font-family:'Instrument Serif',serif;font-style:italic;font-size:22px;color:rgba(255,255,255,0.35);display:flex;align-items:center;justify-content:center;transition:all 600ms cubic-bezier(0.16,1,0.3,1);z-index:3;}
        .acq-step.lit .acq-num{background:linear-gradient(135deg,#BFFF00,#8fcc00);border-color:#BFFF00;color:#000;box-shadow:0 0 24px rgba(191,255,0,0.55),0 0 48px rgba(191,255,0,0.25);}
        .acq-step .acq-label{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:8px;transition:color 500ms ease;}
        .acq-step.lit .acq-label{color:rgba(191,255,0,0.8);}
        .acq-step h3{font-size:17px;font-weight:600;letter-spacing:-0.01em;margin:0 0 8px;line-height:1.2;}
        .acq-step p{font-size:13px;line-height:1.55;color:rgba(255,255,255,0.45);margin:0;}
        .acq-step.lit p{color:rgba(255,255,255,0.7);}
        @media(max-width:640px){.acq-grid{grid-template-columns:1fr;gap:36px 0;}.acq-step{opacity:0.92;padding:62px 20px 24px;}.acq-line,.acq-line-fill{display:none;}}

        /* ── Marquee ticker ── */
        @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        .ticker-inner{display:flex;width:max-content;animation:ticker 30s linear infinite;}
        .ticker-mask{mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);}

        /* ── FAQ accordion ── */
        .faq-item{border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;background:rgba(255,255,255,0.015);transition:border-color 250ms ease;}
        .faq-item:hover{border-color:rgba(191,255,0,0.2);}
        .faq-item.open{border-color:rgba(191,255,0,0.25);}

        /* ── Service card ── */
        .svc-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:32px;transition:all 300ms cubic-bezier(0.16,1,0.3,1);cursor:pointer;}
        .svc-card:hover,.svc-card.open{border-color:rgba(191,255,0,0.25);background:rgba(191,255,0,0.02);}

        /* ── Pricing ── */
        .plan-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:28px;display:flex;flex-direction:column;transition:all 300ms ease;}
        .plan-card.featured{border:1px solid rgba(191,255,0,0.35);background:rgba(191,255,0,0.02);box-shadow:0 0 40px -15px rgba(191,255,0,0.12);}
        .plan-card:hover:not(.featured){border-color:rgba(191,255,0,0.2);}

        /* ── Mobile menu ── */
        .mobile-menu{position:fixed;inset:0;z-index:200;background:#030710;transform:translateX(100%);transition:transform 480ms cubic-bezier(0.77,0,0.175,1);}
        .mobile-menu.open{transform:translateX(0);}

        /* ── Hero overlay gradient ── */
        .hero-overlay{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 50% 50%,transparent 0%,rgba(3,7,16,0.4) 60%,rgba(3,7,16,0.95) 100%),linear-gradient(180deg,rgba(3,7,16,0.25) 0%,transparent 30%,transparent 65%,rgba(3,7,16,1) 100%);}

        /* ── Scrollbar ── */
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(191,255,0,0.25);border-radius:2px;}

        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}

        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}.reveal{opacity:1;transform:none;}}
      `}</style>

      {/* ── MOBILE MENU ─────────────────────────────────────────────────── */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-16">
            <img src={logo} alt="Veluz" className="h-10 object-contain" />
            <button onClick={() => setMobileOpen(false)} className="p-2 border border-white/10 rounded-xl text-white">
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-8">
            {[['metodo','Método'],['servicios','Servicios'],['caso-lms','Resultados'],['inversion','Inversión'],['faq','FAQ'],['agendar','Agendar']].map(([id,l]) => (
              <button key={id} onClick={() => goto(id)} className="text-3xl font-bold text-left tracking-tight text-zinc-300 hover:text-white transition-colors">{l}</button>
            ))}
          </nav>
          <a href="https://wa.me/573125923915" target="_blank" rel="noopener noreferrer"
            className="mt-auto flex items-center gap-3 text-zinc-500 hover:text-white transition-colors text-sm">
            <WaIcon /> +57 312 592 3915
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          NAV
      ════════════════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-[#030710]/85 backdrop-blur-xl border-b border-white/[0.06] py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <img src={logo} alt="Veluz" className="h-10 w-auto object-contain cursor-pointer" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} />
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-400">
            {[['metodo','Método'],['servicios','Servicios'],['caso-lms','Resultados'],['inversion','Inversión'],['faq','FAQ']].map(([id,l]) => (
              <button key={id} onClick={() => goto(id)} className="hover:text-white transition-colors">{l}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => goto('agendar')}
              className="hidden md:inline-flex items-center gap-2 cta-glow bg-[#BFFF00] hover:bg-[#d4ff40] text-black font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors">
              Diagnóstico gratis <ArrowRight size={14} />
            </button>
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2.5 border border-white/10 rounded-xl text-white">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section id="hero-section" className="relative overflow-hidden min-h-screen flex items-center grid-bg">
        <div className="absolute inset-0 mesh-bg z-0" />

        {/* Cometas */}
        <div className="comets" aria-hidden="true">
          {[...Array(6)].map((_,i) => <span key={i} className="comet" />)}
        </div>

        <div className="hero-overlay" />

        {/* Floating Cards */}
        <div className="float-layer" aria-hidden="true">
          <div className="float-card lime-border" data-depth="0.5" style={{top:'15%',left:'3%','--rot':'-3deg',width:'200px'}}>
            <div className="fc-label">Negocios escalados</div>
            <div className="fc-val">20+</div>
            <div className="fc-sub">Colombia · LATAM</div>
          </div>
          <div className="float-card lime-border" data-depth="1.4" style={{top:'9%',right:'4%','--rot':'4deg',width:'185px'}}>
            <div className="fc-label">Autonomía IA</div>
            <div className="fc-val">99%</div>
            <div className="fc-sub">atención sin agente humano</div>
          </div>
          <div className="float-card gold-border" data-depth="2.2" style={{top:'50%',right:'2%','--rot':'-4deg',width:'205px'}}>
            <div className="fc-label">Implementación promedio</div>
            <div className="fc-val">15d</div>
            <div className="fc-sub">De cero a sistema activo</div>
          </div>
          <div className="float-card" data-depth="1.8" style={{bottom:'12%',left:'5%','--rot':'3deg',width:'230px'}}>
            <div className="fc-chat-name">Agente IA Veluz · respondiendo</div>
            <div className="fc-chat-bubble">Hola, quiero agendar consulta para el jueves. ¿Tienen cupos?</div>
            <div className="fc-chat-bubble">¡Hola! Claro, tenemos cupos disponibles. ¿Es primera vez o control?</div>
          </div>
          <div className="float-card lime-border" data-depth="0.9" style={{bottom:'16%',right:'7%','--rot':'5deg',width:'175px'}}>
            <div className="fc-label">Ads necesarios</div>
            <div className="fc-val">0</div>
            <div className="fc-sub">Crecimiento 100% orgánico</div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 lg:px-8 py-28 lg:py-36 text-center w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 mb-10">
            <div className="flex gap-0.5 text-[#BFFF00]">
              {[...Array(5)].map((_,i) => <Star key={i} size={10} fill="currentColor" stroke="none" />)}
            </div>
            <span className="mono-label" style={{letterSpacing:'0.22em'}}>+20 negocios con resultados reales</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[82px] font-bold tracking-tight leading-[1.02] mb-8 max-w-4xl mx-auto">
            <span className="block text-white">Digitalizamos tu negocio</span>
            <span className="block" style={{minHeight:'1.1em',position:'relative'}}>
              {words.map((w, i) => (
                <span key={w} className="serif-accent" style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  left: 0, right: 0, top: 0,
                  opacity: wordIdx === i ? 1 : 0,
                  transform: wordIdx === i ? 'translateY(0)' : wordIdx > i ? 'translateY(-120%)' : 'translateY(120%)',
                  transition: 'opacity 500ms ease, transform 700ms cubic-bezier(0.34,1.4,0.64,1)',
                  display: 'block',
                }}>
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
            Convertimos operaciones manuales en <strong className="text-white font-semibold">máquinas de eficiencia autónoma</strong> que cierran ventas sin que estés presente.
          </p>

          {/* ── VSL VIDEO ─────────────────────────────────────────────── */}
          <div className="vsl-wrap mb-12 vsl-float">
            <div className="vsl-corner tl" /><div className="vsl-corner tr" />
            <div className="vsl-corner bl" /><div className="vsl-corner br" />
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#06100a] border border-white/10"
              style={{boxShadow:'0 0 80px -10px rgba(191,255,0,0.35)'}}>
              {/*
                ▼ REEMPLAZA ESTE BLOQUE CON TU VIDEO ▼
                Ejemplo con Loom:
                <iframe
                  src="https://www.loom.com/embed/TU_VIDEO_ID"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#BFFF00]/10 border border-[#BFFF00]/30 flex items-center justify-center cursor-pointer hover:bg-[#BFFF00]/20 transition-colors"
                  onClick={() => goto('agendar')}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#BFFF00] ml-1"><polygon points="5,3 19,12 5,21"/></svg>
                </div>
                <div className="text-center">
                  <p className="mono-label mb-1">Video explicativo</p>
                  <p className="text-zinc-500 text-sm">Reemplaza este bloque con tu iframe de Loom o YouTube en el código</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => goto('agendar')}
              className="cta-glow bg-[#BFFF00] hover:bg-[#d4ff40] text-black font-semibold text-base px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2 min-h-[50px]">
              Agendar diagnóstico gratis <ArrowRight size={16} />
            </button>
            <a href="https://wa.me/573125923915?text=Hola%20Veluz,%20quiero%20informaci%C3%B3n"
              target="_blank" rel="noopener noreferrer"
              className="bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border border-white/15 text-white font-medium text-base px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2 min-h-[50px]">
              <WaIcon /> Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS · glow cards
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={r1} className={`reveal text-center mb-14 ${v1?'visible':''}`}>
            <p className="mono-label mb-3">— Tracción</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              <span className="text-white">Lo que el sistema viene </span>
              <span className="serif-accent">generando.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {v:20,s:'+',l:'Negocios escalados'},
              {v:15,s:'d',l:'Implementación promedio'},
              {v:0,s:'',l:'Ads necesarios',amber:true},
            ].map(({v,s,l,amber},i)=>(
              <GlowCard key={l} amber={amber} className={`text-center reveal reveal-${i+1} ${v1?'visible':''}`}>
                <div className="text-6xl md:text-7xl text-white mb-4 tabular-nums"
                  style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic'}}>
                  <Stat val={v} suffix={s} />
                </div>
                <p className="mono-label" style={{letterSpacing:'0.22em'}}>{l}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.05] py-3 overflow-hidden ticker-mask">
        <div className="ticker-inner">
          {[...Array(2)].map((_,i)=>(
            <div key={i} className="flex items-center">
              {['IA Nativa','Agendamiento Autónomo','0 Ads','GEO Optimization','WhatsApp 24/7','Automatización Total','Make & Zapier','CRM Integrado','SEO Local'].map(t=>(
                <span key={t} className="mono-label px-10 flex items-center gap-4" style={{opacity:0.45}}>
                  <span className="w-1 h-1 bg-[#BFFF00]/60 rounded-full" />{t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          EL PROBLEMA
      ════════════════════════════════════════════════════════════════════ */}
      <section id="problema" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={r2} className={`reveal text-center mb-16 ${v2?'visible':''}`}>
            <p className="mono-label mb-4">— El problema</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight max-w-3xl mx-auto">
              <span className="text-white">Operar manual es </span>
              <span className="serif-accent">quemar dinero.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className={`reveal reveal-1 lift bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-2xl p-8 ${v2?'visible':''}`}>
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <div className="mono-label mb-3" style={{color:'rgba(239,68,68,0.8)'}}>— Sin Veluz</div>
              <ul className="space-y-4">
                {['Procesos lentos dependientes de personas.','Leads fríos que nunca vuelven.','Invisible ante Google y motores de IA.'].map(t=>(
                  <li key={t} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                    <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`reveal reveal-2 lift bg-gradient-to-b from-[#BFFF00]/[0.05] to-transparent border border-[#BFFF00]/20 rounded-2xl p-8 ${v2?'visible':''}`}>
              <div className="w-11 h-11 rounded-xl bg-[#BFFF00]/10 border border-[#BFFF00]/25 flex items-center justify-center mb-6">
                <CheckCircle2 size={20} className="text-[#BFFF00]" />
              </div>
              <div className="mono-label mb-3">— Efecto Veluz</div>
              <ul className="space-y-4">
                {['Operaciones autónomas 24/7 con agentes IA.','Conversión de leads en menos de 30 segundos.','Crecimiento orgánico predecible sin pauta.'].map(t=>(
                  <li key={t} className="flex gap-3 text-zinc-300 text-sm font-medium leading-relaxed">
                    <CheckCircle size={16} className="text-[#BFFF00] shrink-0 mt-0.5" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MÉTODO VELUZ-3X · acq-flow
      ════════════════════════════════════════════════════════════════════ */}
      <section id="metodo" className="relative py-24 lg:py-32 border-y border-white/[0.05]" style={{background:'rgba(6,16,4,0.4)'}}>
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div ref={r3} className={`reveal text-center mb-20 ${v3?'visible':''}`}>
            <p className="mono-label mb-5">— Nuestra ingeniería</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
              <span className="text-white">Método Veluz-3X.</span>{' '}
              <span className="serif-accent">Tres etapas.</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto font-light">
              Un sistema probado para digitalizar negocios con IA. Sin cajas negras — claridad absoluta en cada paso.
            </p>
          </div>
          <div className="acq-flow">
            <div className="acq-line" aria-hidden="true" />
            <div className="acq-line-fill" id="acq-fill" aria-hidden="true" />
            <div className="acq-grid">
              {[
                {n:'01',tag:'Diagnóstico',t:'Auditoría de tu negocio',d:'Mapeamos tus fugas de tiempo y dinero. No asumimos, medimos con datos reales. 25 minutos gratis.'},
                {n:'02',tag:'Arquitectura',t:'Infraestructura a medida',d:'Construimos tu ecosistema: IA, CRM, Funnels y Automatizaciones sincronizadas. Tú apruebas cada paso.'},
                {n:'03',tag:'Ignición',t:'Sistema activo y escalando',d:'Encendemos la máquina. Optimizamos en tiempo real para maximizar el ROI de cada peso invertido.'},
              ].map(({n,tag,t,d},i)=>(
                <article key={n} className="acq-step" data-step={i+1}>
                  <div className="acq-num">{n}</div>
                  <div className="acq-label">{tag}</div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SERVICIOS · lift + accordion
      ════════════════════════════════════════════════════════════════════ */}
      <section id="servicios" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={r4} className={`reveal text-center mb-16 ${v4?'visible':''}`}>
            <p className="mono-label mb-5">— Lo que activamos</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
              <span className="text-white">Tres pilares. </span>
              <span className="serif-accent">Un ecosistema.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {services.map((s, i) => (
              <div key={s.id} className={`svc-card ${openService===s.id?'open':''} reveal reveal-${i+1} ${v4?'visible':''}`}
                onClick={() => setOpenService(prev => prev===s.id ? null : s.id)}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5 flex-wrap">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${openService===s.id ? 'bg-[#BFFF00] text-black shadow-[0_0_20px_rgba(191,255,0,0.4)]' : 'bg-[#BFFF00]/10 text-[#BFFF00]'}`}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="mono-label mb-0.5">{s.tag}</p>
                      <h3 className={`text-xl md:text-2xl font-semibold tracking-tight transition-colors ${openService===s.id?'text-[#BFFF00]':'text-white'}`}>{s.title}</h3>
                    </div>
                  </div>
                  <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${openService===s.id?'border-[#BFFF00]/50 text-[#BFFF00]':'border-white/15 text-zinc-500'}`}>
                    {openService===s.id ? <X size={14}/> : <Plus size={14}/>}
                  </div>
                </div>
                {openService===s.id && (
                  <div className="mt-6">
                    <p className="text-zinc-300 leading-relaxed mb-6 text-[15px] font-light">"{s.desc}"</p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {s.features.map(f=>(
                        <div key={f} className="flex items-center gap-2.5 text-sm text-zinc-300 bg-white/[0.03] border border-white/[0.07] p-3 rounded-xl">
                          <CheckCircle2 size={13} className="text-[#BFFF00] shrink-0" />{f}
                        </div>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 border-t border-white/[0.07] pt-6">
                      <div className="bg-red-500/[0.05] border border-red-500/[0.12] p-4 rounded-xl">
                        <p className="text-red-400 text-[10px] font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5"><XCircle size={11}/>Antes</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">{s.before}</p>
                      </div>
                      <div className="bg-[#BFFF00]/[0.04] border border-[#BFFF00]/[0.12] p-4 rounded-xl">
                        <p className="text-[#BFFF00] text-[10px] font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5"><CheckCircle2 size={11}/>Después</p>
                        <p className="text-zinc-200 text-sm leading-relaxed font-medium">{s.after}</p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <button onClick={e=>{e.stopPropagation();goto('agendar');}}
                        className="cta-glow bg-[#BFFF00] text-black font-semibold text-sm px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:bg-[#d4ff40] transition-colors">
                        Implementar este sistema <ArrowRight size={14}/>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CASO LMS FINANCE
      ════════════════════════════════════════════════════════════════════ */}
      <section id="caso-lms" className="relative py-24 lg:py-32 border-y border-white/[0.05]" style={{background:'rgba(6,16,4,0.35)'}}>
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={r5} className={`reveal max-w-3xl mx-auto text-center mb-16 ${v5?'visible':''}`}>
            <p className="mono-label mb-5">— Caso de éxito</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
              <span className="text-white">LMS Finance:</span>{' '}
              <span className="serif-accent">-92% tiempo operativo.</span>
            </h2>
            <p className="text-lg text-zinc-400 font-light">
              <strong className="text-white font-medium">Primera semana</strong> con el sistema Veluz-3X — sin equipo de marketing previo, sin anuncios pagados.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
            {[
              {v:92,s:'%',l:'Tiempo manual reducido',amber:true},
              {v:5,s:'X',l:'Facturación multiplicada'},
              {v:0,s:'',l:'Fugas de leads'},
              {v:30,s:'d',l:'Implantación'},
            ].map(({v,s,l,amber},i)=>(
              <GlowCard key={l} amber={amber} className={`text-center reveal reveal-${i+1} ${v5?'visible':''}`}>
                <div className="text-5xl md:text-6xl text-white mb-4 tabular-nums"
                  style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic'}}>
                  <Stat val={v} suffix={s} />
                </div>
                <p className="mono-label" style={{letterSpacing:'0.2em',fontSize:'9px'}}>{l}</p>
              </GlowCard>
            ))}
          </div>
          <div className="max-w-2xl mx-auto bg-white/[0.025] border border-white/[0.07] rounded-2xl p-8 md:p-10">
            <p className="text-zinc-300 text-lg leading-relaxed font-light italic mb-6">
              "Veluz no solo instaló software — nos instaló una nueva mentalidad operativa. Hoy crecemos sin miedo al colapso."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#BFFF00]/10 border border-[#BFFF00]/20 flex items-center justify-center">
                <Users size={16} className="text-[#BFFF00]" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Andrés G.</p>
                <p className="mono-label mt-0.5" style={{fontSize:'9px',letterSpacing:'0.2em'}}>CEO · LMS Finance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════════════════════ */}
      <section id="inversion" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={r6} className={`reveal text-center mb-14 ${v6?'visible':''}`}>
            <p className="mono-label mb-5">— Inversión transparente</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              <span className="text-white">Sin letra pequeña.</span>{' '}
              <span className="serif-accent">Sin sorpresas.</span>
            </h2>
            <div className="flex justify-center gap-3 flex-wrap mt-8">
              {[['all','Todos'],['marketing','Marketing'],['ia','Automatizaciones IA']].map(([v,l])=>(
                <button key={v} onClick={()=>setPricingTab(v)}
                  className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all border ${pricingTab===v ? 'bg-[#BFFF00] text-black border-[#BFFF00]' : 'border-white/15 text-zinc-400 hover:text-white hover:border-white/30'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
            {plans.filter(p=>pricingTab==='all'||p.type===pricingTab).map((p,i)=>(
              <div key={p.id} className={`plan-card reveal reveal-${i%4+1} ${v6?'visible':''} ${p.featured?'featured':''}`}>
                {p.featured && (
                  <div className="mono-label mb-4 text-black bg-[#BFFF00] px-3 py-1 rounded-full self-start inline-block" style={{fontSize:'9px'}}>Más popular</div>
                )}
                <p className="mono-label mb-3" style={{fontSize:'9px'}}>{p.cat}</p>
                <h4 className="text-lg font-semibold text-white mb-2 tracking-tight">{p.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">{p.desc}</p>
                <div className="bg-white/[0.03] border border-white/[0.08] p-4 rounded-xl mb-5 space-y-3">
                  <div>
                    <p className="mono-label mb-1" style={{fontSize:'8px'}}>{p.setupLabel}</p>
                    <span className="text-[#BFFF00] font-bold text-lg tracking-tight">{p.setup}</span>
                  </div>
                  <div className="border-t border-white/[0.07] pt-3">
                    <p className="mono-label mb-1" style={{fontSize:'8px'}}>{p.recLabel}</p>
                    <span className="text-white text-sm">{p.rec}</span>
                  </div>
                </div>
                <button onClick={()=>setExpandedPlan(prev=>({...prev,[p.id]:!prev[p.id]}))}
                  className="w-full flex items-center justify-between text-xs text-zinc-500 hover:text-[#BFFF00] transition-colors border-b border-white/[0.07] pb-4 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Plus size={11} className={`text-[#BFFF00] transition-transform duration-300 ${expandedPlan[p.id]?'rotate-45':''}`} />
                    {expandedPlan[p.id]?'Ocultar entregables':'Ver entregables'}
                  </span>
                  <ChevronDown size={12} className={`transition-transform duration-300 ${expandedPlan[p.id]?'rotate-180':''}`} />
                </button>
                {expandedPlan[p.id] && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.pills.map(pill=>(
                      <span key={pill} className="mono-label px-2.5 py-1 bg-white/[0.03] border border-white/[0.07] rounded-lg" style={{fontSize:'8px',letterSpacing:'0.15em'}}>{pill}</span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-2">
                  <button onClick={()=>goto('agendar')}
                    className={`w-full py-3 rounded-lg font-semibold text-xs tracking-wide transition-all ${p.featured ? 'cta-glow bg-[#BFFF00] text-black hover:bg-[#d4ff40]' : 'border border-[#BFFF00]/30 text-[#BFFF00] hover:bg-[#BFFF00]/5'}`}>
                    Empezar ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative py-24 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div ref={r7} className={`reveal text-center mb-14 ${v7?'visible':''}`}>
            <p className="mono-label mb-5">— FAQ</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Preguntas frecuentes</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq,i)=>(
              <div key={i} className={`faq-item ${openFaq===i?'open':''} reveal reveal-${i%4+1} ${v7?'visible':''}`}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left">
                  <span className={`font-medium text-sm md:text-base leading-snug transition-colors ${openFaq===i?'text-[#BFFF00]':'text-white'}`}>{faq.q}</span>
                  <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all border ${openFaq===i?'bg-[#BFFF00] text-black border-[#BFFF00]':'border-white/15 text-zinc-500'}`}>
                    <ChevronDown size={13} className={`transition-transform duration-300 ${openFaq===i?'rotate-180':''}`} />
                  </div>
                </button>
                {openFaq===i && (
                  <p className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed font-light">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CALENDLY · CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section id="agendar" className="relative py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[#BFFF00]/[0.06] blur-[140px] rounded-full pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <div ref={r8} className={`reveal text-center mb-12 ${v8?'visible':''}`}>
            <p className="mono-label mb-5">— Siguiente paso</p>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-semibold tracking-tight mb-6 leading-tight">
              <span className="text-white">¿Hablamos de </span>
              <span className="serif-accent">negocios?</span>
            </h2>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <span className="w-2 h-2 bg-[#BFFF00] rounded-full" style={{boxShadow:'0 0 8px rgba(191,255,0,0.7)',animation:'blink 1.6s ease-in-out infinite'}} />
              <span className="mono-label" style={{color:'rgba(255,255,255,0.7)',letterSpacing:'0.2em'}}>Llamada 30 min · Sin costo · Sin compromiso</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden"
            style={{height:700,boxShadow:'0 0 80px -20px rgba(191,255,0,0.2)',border:'1px solid rgba(191,255,0,0.15)'}}>
            <iframe
              src="https://calendly.com/veluz-agency/30min?hide_landing_page_details=1&primary_color=bfff00"
              width="100%" height="100%" frameBorder="0" title="Agendar con Veluz"
            />
          </div>
          <p className="text-center text-zinc-600 text-xs mt-6 mono-label" style={{letterSpacing:'0.2em'}}>
            ✓ Sin tarjeta &nbsp;·&nbsp; ✓ Sin contrato &nbsp;·&nbsp; ✓ Sin presión de venta
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="py-14 border-t border-white/[0.06] px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <img src={logo} alt="Veluz" className="h-9 opacity-50 hover:opacity-80 transition-opacity" />
          <div className="flex gap-10 mono-label flex-wrap justify-center" style={{opacity:0.3,letterSpacing:'0.28em'}}>
            <a href="https://wa.me/573125923915" target="_blank" rel="noopener noreferrer"
              className="hover:opacity-100 hover:text-[#BFFF00] transition-all">WhatsApp</a>
            <button onClick={()=>goto('agendar')} className="hover:opacity-100 hover:text-[#BFFF00] transition-all">Agendar</button>
            <span>© 2026 Veluz Agency</span>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CTA (mobile) ──────────────────────────────────────── */}
      {showFloat && (
        <div className="fixed bottom-6 right-6 z-[100] md:hidden">
          <button onClick={()=>goto('agendar')}
            className="cta-glow bg-[#BFFF00] text-black p-4 rounded-full shadow-2xl active:scale-90 transition-transform flex items-center justify-center border-4 border-[#030710]">
            <Calendar size={24} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
