import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Zap, CheckCircle2, ChevronDown, Calendar,
  BrainCircuit, Megaphone, AlertTriangle, Star, Menu, X,
  Users, CheckCircle, XCircle, ArrowRight, ExternalLink
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

const Stat = ({ val, suffix = '' }) => {
  const [n, r] = useCountUp(val);
  return <span ref={r}>{n}{suffix}</span>;
};

/* ─── GLOW CARD ──────────────────────────────────────────────────────────── */
function GlowCard({ children, className = '', amber = false }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
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

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const services = [
  {
    id: 'ia', tag: 'INTELIGENCIA & RESPUESTA', title: 'Agentes IA Nativa',
    icon: <BrainCircuit size={20} />,
    desc: 'Entrenamos cerebros digitales con el conocimiento de tu empresa. Agentes con razonamiento real que venden, califican leads y agendan citas 24/7.',
    features: ['Venta conversacional WhatsApp 24/7','Calificación automática de leads','Agendamiento autónomo en Calendly','Conexión directa a tu CRM'],
    before: 'Leads que mueren en tu bandeja porque tardas horas en responder.',
    after: 'Agente IA responde en < 10 segundos, califica presupuesto y agenda la cita.',
  },
  {
    id: 'geo', tag: 'VISIBILIDAD & AUTORIDAD', title: 'Contenido Orgánico & GEO',
    icon: <Megaphone size={20} />,
    desc: 'Cero dólares en anuncios. Posicionamiento omnicanal para liderar Google Y ser citado por ChatGPT, Claude y Gemini.',
    features: ['GEO — Generative Engine Optimization','Posicionamiento SEO local #1','Contenido de alta retención viral','Copys persuasivos orientados al ROI'],
    before: 'Dependes de pauta cara que se apaga cuando dejas de pagar.',
    after: 'Eres citado como referente por IAs y buscadores sin costo de pauta.',
  },
  {
    id: 'auto', tag: 'PROCESOS & PRODUCTIVIDAD', title: 'Automatización de Procesos',
    icon: <Zap size={20} />,
    desc: 'Conectamos todo tu software. CRM, pagos, bases de datos y comunicaciones trabajando en sintonía sin intervención humana.',
    features: ['Flujos automatizados Make / Zapier','Sincronización de CRM','Alertas y webhooks en tiempo real','Métricas centralizadas automáticas'],
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
    rec: '~$50.000 COP / año', recLabel: 'Renovación de dominio',
    pills: ['Diseño a medida','Mobile first','Botón WhatsApp','Entrega 7 días'], featured: false },
  { id: 'chatbot', type: 'ia', cat: 'Servicio activo', title: 'Chatbot WhatsApp con IA',
    desc: 'Agente inteligente entrenado con tu negocio. Responde, califica y agenda solo las 24 horas.',
    setup: '$650.000 COP', setupLabel: 'Setup e instalación',
    rec: '$100.000 COP / mes', recLabel: 'Operación y soporte continuo',
    pills: ['Respuesta < 30s','Calificación leads','Agendamiento solo','Reporte mensual'], featured: false },
  { id: 'pack', type: 'marketing', cat: 'Pack completo', title: 'Pack Presencia Digital',
    desc: 'Web + Google Maps optimizado + 1 red social gestionada + 5 piezas de contenido mensual.',
    setup: '$1.000.000 COP', setupLabel: 'Setup completo · Mes 1',
    rec: '$50.000 – $100.000 COP / mes', recLabel: 'Gestión de contenido',
    pills: ['Web o rediseño','Google Maps #1','1 red gestionada','5 piezas/mes','SEO local'], featured: true },
  { id: 'flows', type: 'ia', cat: 'Sistemas a medida', title: 'Automatizaciones Custom',
    desc: 'Conexión integral de tus apps. CRM, pagos, bases de datos y comunicaciones autónomas.',
    setup: 'Desde $800.000 COP', setupLabel: 'Según complejidad del flujo',
    rec: 'Sin costo mensual obligatorio', recLabel: 'Soporte opcional',
    pills: ['Webhooks & APIs','Flujos Make/Zapier','Conexión CRM','Cero error humano'], featured: false },
];

const testimonials = [
  {
    name: 'Andrés G.',
    role: 'CEO',
    company: 'LMS Finance',
    industry: 'Automatización · Finanzas DIAN',
    url: 'https://lms-finance.vercel.app/',
    quote: 'Veluz automatizó nuestros procesos financieros para la DIAN desde cero. Lo que antes tomaba días de trabajo manual, hoy sucede en minutos sin que nadie toque nada. Fue un cambio radical.',
    metric: '-92%',
    metricLabel: 'tiempo operativo',
  },
  {
    name: 'Ana Molano',
    role: 'Fundadora',
    company: 'Ana Molano Peluquería',
    industry: 'Belleza · Presencia Digital',
    url: 'https://www.anamolanopeluqueria.com/',
    quote: 'Antes solo me conseguían por voz a voz. Hoy Google me encuentra, tengo mi web profesional y el contenido que Veluz crea habla exactamente de mi estilo. Los cupos se llenan solos.',
    metric: '+3×',
    metricLabel: 'visibilidad orgánica',
  },
  {
    name: 'Equipo Origen',
    role: 'Fundadores',
    company: 'Soy Origen',
    industry: 'Restaurante · Pedidos en Línea',
    url: 'https://www.soyorigen.co/',
    quote: 'El sistema que Veluz creó cambió todo. Nuestros clientes piden en línea, el equipo recibe la orden al instante y ya no perdemos pedidos por WhatsApp desordenado. La operación voló.',
    metric: '+60%',
    metricLabel: 'pedidos digitales',
  },
];

const integrations = [
  { name: 'Make', c: '#9b51e0' },
  { name: 'Zapier', c: '#ff4a00' },
  { name: 'WhatsApp', c: '#25d366' },
  { name: 'Google', c: '#4285f4' },
  { name: 'Meta Ads', c: '#0866ff' },
  { name: 'Calendly', c: '#006bff' },
  { name: 'Stripe', c: '#6772e5' },
  { name: 'Notion', c: '#fff' },
  { name: 'n8n', c: '#ea4b71' },
  { name: 'Sheets', c: '#0f9d58' },
];

const words = ['con IA.', 'en automático.', 'sin límites.', 'sin anuncios.'];
const logo = 'https://res.cloudinary.com/ydxi3lng/image/upload/q_auto/f_auto/v1783814504/Remove_black_background_from_image_202607111430-removebg-preview_kxhi8m.png';

/* ═══════════════════════════════════════════════════════════════════════════
   APP
════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [openService, setOpenService]   = useState(null);
  const [openFaq, setOpenFaq]           = useState(null);
  const [wordIdx, setWordIdx]           = useState(0);
  const [showFloat, setShowFloat]       = useState(false);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 30); setShowFloat(window.scrollY > 700); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);


  /* acq-flow */
  useEffect(() => {
    const steps = document.querySelectorAll('.acq-step');
    const fill  = document.getElementById('acq-fill');
    if (!steps.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.step);
          e.target.classList.add('lit');
          if (fill) fill.style.width = `${((idx-1)/(steps.length-1))*84}%`;
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

  const [r1,v1]=useReveal(); const [r2,v2]=useReveal(50); const [r3,v3]=useReveal(100);
  const [r4,v4]=useReveal(); const [r5,v5]=useReveal(); const [r6,v6]=useReveal();
  const [r7,v7]=useReveal(); const [r9,v9]=useReveal();

  return (
    <div className="veluz-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;900&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{margin:0;font-family:'Geist',system-ui,sans-serif;background:#061220;color:#fff;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        h1,h2,h3,h4{letter-spacing:-0.02em;text-wrap:balance;}
        p{text-wrap:pretty;}
        img{max-width:100%;}
        .veluz-root{position:relative;}

        /* ── Grid bg ── */
        .grid-bg{background-image:linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px);background-size:64px 64px;}
        .grid-bg-light{background-image:linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px);background-size:40px 40px;}

        /* ── Mesh hero bg · proporciones Chispa AI, colores Veluz ── */
        .mesh-bg{background:
          radial-gradient(ellipse 55% 45% at 16% 0%,rgba(191,255,0,0.52) 0%,transparent 56%),
          radial-gradient(ellipse 45% 38% at 84% 7%,rgba(150,230,0,0.36) 0%,transparent 52%),
          radial-gradient(ellipse 60% 50% at 50% 100%,rgba(80,150,0,0.08) 0%,transparent 60%);}

        /* ── Section glow ── */
        .section-glow{background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(191,255,0,0.08) 0%,transparent 60%);}

        /* ── Typographic helpers ── */
        .serif-accent{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;color:#BFFF00;letter-spacing:-0.01em;}
        .serif-dark{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;color:#3d7a00;letter-spacing:-0.01em;}
        .mono-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(191,255,0,0.8);}
        .mono-dark{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(0,100,0,0.65);}

        /* ── Noise overlay ── */
        .veluz-root::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");opacity:0.018;pointer-events:none;z-index:0;mix-blend-mode:overlay;}

        /* ── Reveal ── */
        .reveal{opacity:0;transform:translateY(20px);transition:opacity 560ms cubic-bezier(0.16,1,0.3,1),transform 560ms cubic-bezier(0.16,1,0.3,1);}
        .reveal.visible{opacity:1;transform:translateY(0);}
        .reveal-1{transition-delay:60ms;} .reveal-2{transition-delay:120ms;} .reveal-3{transition-delay:180ms;} .reveal-4{transition-delay:240ms;}

        /* ── Lift ── */
        .lift{transition:transform 220ms cubic-bezier(0.16,1,0.3,1),box-shadow 220ms ease;}
        .lift:hover{transform:translateY(-4px);box-shadow:0 20px 40px -12px rgba(0,0,0,0.2);}

        /* ── Glow card (dark) ── */
        .glow-card{position:relative;background:linear-gradient(160deg,rgba(15,28,12,0.6),rgba(8,18,6,0.35));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px 28px;overflow:hidden;transition:border-color 400ms ease,transform 350ms cubic-bezier(0.16,1,0.3,1);}
        .glow-card::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(191,255,0,0.16),rgba(191,255,0,0.05) 30%,transparent 60%);opacity:0;transition:opacity 300ms ease;z-index:0;}
        .glow-card::after{content:'';position:absolute;inset:-1px;border-radius:inherit;pointer-events:none;background:radial-gradient(200px circle at var(--mx,50%) var(--my,50%),rgba(191,255,0,0.45),transparent 70%);opacity:0;transition:opacity 300ms ease;z-index:0;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px;}
        .glow-card:hover{border-color:rgba(255,255,255,0.12);transform:translateY(-3px);}
        .glow-card:hover::before,.glow-card:hover::after{opacity:1;}
        .glow-card>*{position:relative;z-index:1;}
        .glow-card.amber::before{background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(255,210,0,0.14),rgba(255,210,0,0.04) 30%,transparent 60%);}
        .glow-card.amber::after{background:radial-gradient(200px circle at var(--mx,50%) var(--my,50%),rgba(255,210,0,0.45),transparent 70%);}

        /* ── CTA glow button ── */
        .cta-glow{position:relative;cursor:pointer;transition:transform 150ms ease;}
        .cta-glow::after{content:'';position:absolute;inset:-2px;border-radius:inherit;background:linear-gradient(45deg,#BFFF00,#a0e000,#BFFF00);z-index:-1;opacity:0.4;filter:blur(14px);transition:opacity 200ms ease;}
        .cta-glow:hover::after{opacity:0.8;}
        .cta-glow:active{transform:scale(0.98);}


        /* ── VSL video ── */
        .vsl-wrap{position:relative;max-width:780px;margin:0 auto;}
        .vsl-corner{position:absolute;width:22px;height:22px;}
        .vsl-corner.tl{top:-7px;left:-7px;border-top:2px solid rgba(191,255,0,0.65);border-left:2px solid rgba(191,255,0,0.65);}
        .vsl-corner.tr{top:-7px;right:-7px;border-top:2px solid rgba(191,255,0,0.65);border-right:2px solid rgba(191,255,0,0.65);}
        .vsl-corner.bl{bottom:-7px;left:-7px;border-bottom:2px solid rgba(191,255,0,0.65);border-left:2px solid rgba(191,255,0,0.65);}
        .vsl-corner.br{bottom:-7px;right:-7px;border-bottom:2px solid rgba(191,255,0,0.65);border-right:2px solid rgba(191,255,0,0.65);}
        @keyframes floatVSL{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
        @media(min-width:640px){.vsl-float{animation:floatVSL 7s ease-in-out infinite;}}

        /* ── acq-flow ── */
        .acq-flow{position:relative;padding:44px 0 16px;}
        .acq-line{position:absolute;top:62px;left:8%;right:8%;height:2px;background:rgba(255,255,255,0.05);border-radius:1px;}
        .acq-line-fill{position:absolute;top:62px;left:8%;height:2px;width:0%;background:linear-gradient(90deg,#BFFF00 0%,rgba(191,255,0,0.5) 100%);border-radius:1px;box-shadow:0 0 12px rgba(191,255,0,0.5);transition:width 900ms cubic-bezier(0.16,1,0.3,1);}
        .acq-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;position:relative;z-index:2;}
        .acq-step{position:relative;padding:62px 16px 22px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.06);border-radius:16px;text-align:center;opacity:0.3;transition:opacity 700ms cubic-bezier(0.16,1,0.3,1),transform 700ms cubic-bezier(0.16,1,0.3,1),border-color 500ms ease,background 500ms ease,box-shadow 500ms ease;}
        .acq-step.lit{opacity:1;transform:translateY(-5px);border-color:rgba(191,255,0,0.3);background:rgba(191,255,0,0.03);box-shadow:0 8px 32px -8px rgba(191,255,0,0.15);}
        .acq-num{position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(-50%);width:56px;height:56px;border-radius:50%;background:#030710;border:2px solid rgba(191,255,0,0.2);font-family:'Instrument Serif',serif;font-style:italic;font-size:20px;color:rgba(255,255,255,0.35);display:flex;align-items:center;justify-content:center;transition:all 600ms cubic-bezier(0.16,1,0.3,1);z-index:3;}
        .acq-step.lit .acq-num{background:linear-gradient(135deg,#BFFF00,#8fcc00);border-color:#BFFF00;color:#000;box-shadow:0 0 24px rgba(191,255,0,0.55);}
        .acq-step .acq-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:7px;transition:color 500ms;}
        .acq-step.lit .acq-label{color:rgba(191,255,0,0.8);}
        .acq-step h3{font-size:16px;font-weight:600;letter-spacing:-0.01em;margin:0 0 7px;line-height:1.25;}
        .acq-step p{font-size:13px;line-height:1.55;color:rgba(255,255,255,0.45);margin:0;}
        .acq-step.lit p{color:rgba(255,255,255,0.7);}
        @media(max-width:640px){
          .acq-grid{grid-template-columns:1fr;gap:40px 0;}
          .acq-step{opacity:0.92;padding:62px 18px 22px;}
          .acq-line,.acq-line-fill{display:none;}
        }

        /* ── Marquee ── */
        @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        .ticker-inner{display:flex;width:max-content;animation:ticker 28s linear infinite;}
        .ticker-mask{mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);}

        /* ── Testimonial cards (light section) ── */
        .test-card{background:#fff;border:1px solid rgba(0,0,0,0.07);border-radius:20px;padding:32px 28px;display:flex;flex-direction:column;gap:20px;box-shadow:0 4px 24px -8px rgba(0,80,0,0.08),0 1px 0 rgba(0,0,0,0.04);transition:transform 240ms cubic-bezier(0.16,1,0.3,1),box-shadow 240ms ease;}
        .test-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px -12px rgba(0,80,0,0.14),0 1px 0 rgba(0,0,0,0.04);}
        .test-card .test-stars{display:flex;gap:3px;color:#BFFF00;}
        .test-card .test-quote{font-size:15px;line-height:1.68;color:#1a2a0e;font-style:italic;flex:1;}
        .test-card .test-metric{font-family:'Instrument Serif',serif;font-style:italic;font-size:42px;line-height:1;color:#3d7a00;}
        .test-card .test-metric-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(0,80,0,0.55);margin-top:2px;}
        .test-card .test-name{font-weight:700;font-size:14px;color:#0a1a05;}
        .test-card .test-role{font-size:12px;color:rgba(10,26,5,0.5);margin-top:1px;}
        .test-card .test-co{font-size:11px;color:#3d7a00;text-decoration:none;font-family:'JetBrains Mono',monospace;letter-spacing:0.1em;text-transform:uppercase;display:inline-flex;align-items:center;gap:4px;border-bottom:1px solid rgba(61,122,0,0.25);padding-bottom:1px;transition:border-color 200ms,color 200ms;}
        .test-card .test-co:hover{color:#2d5c00;border-color:rgba(45,92,0,0.5);}
        .test-card .test-industry{font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(0,80,0,0.45);padding:3px 8px;background:rgba(191,255,0,0.12);border-radius:20px;display:inline-block;}

        /* ── Service cards (grid style) ── */
        .svc-card-new{background:linear-gradient(160deg,rgba(15,28,12,0.65),rgba(8,18,6,0.4));border:1px solid rgba(255,255,255,0.07);border-radius:24px;padding:32px;display:flex;flex-direction:column;transition:all 300ms cubic-bezier(0.16,1,0.3,1);}
        .svc-card-new:hover{border-color:rgba(191,255,0,0.32);transform:translateY(-5px);box-shadow:0 28px 60px -18px rgba(191,255,0,0.14);}
        .svc-card-new.featured{border-color:rgba(191,255,0,0.38);background:linear-gradient(160deg,rgba(191,255,0,0.06),rgba(8,18,6,0.55));}
        .svc-card-new.featured:hover{border-color:rgba(191,255,0,0.6);box-shadow:0 32px 68px -18px rgba(191,255,0,0.22);}
        .svc-icon-wrap{width:56px;height:56px;border-radius:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .svc-icon-wrap.default{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);}
        .svc-icon-wrap.featured{background:rgba(191,255,0,0.12);border:1px solid rgba(191,255,0,0.25);}

        /* ── FAQ ── */
        .faq-item{border:1px solid rgba(0,0,0,0.07);border-radius:14px;overflow:hidden;background:#fff;transition:border-color 250ms ease,box-shadow 250ms ease;}
        .faq-item:hover{border-color:rgba(61,122,0,0.25);box-shadow:0 4px 16px -4px rgba(0,80,0,0.08);}
        .faq-item.open{border-color:rgba(61,122,0,0.3);}

        /* ── Mobile menu ── */
        .mobile-menu{position:fixed;inset:0;z-index:200;background:#030710;transform:translateX(100%);transition:transform 420ms cubic-bezier(0.77,0,0.175,1);}
        .mobile-menu.open{transform:translateX(0);}

        /* ── Hero overlay ── */
        .hero-overlay{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 50% 50%,transparent 0%,rgba(3,7,16,0.4) 60%,rgba(3,7,16,0.95) 100%),linear-gradient(180deg,rgba(3,7,16,0.25) 0%,transparent 30%,transparent 65%,rgba(3,7,16,1) 100%);}

        /* ── Integration badges ── */
        .int-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 16px 8px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:100px;white-space:nowrap;transition:all 220ms ease;}
        .int-badge:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.18);transform:translateY(-2px);}
        .int-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;flex-shrink:0;}

        /* ── Dark testimonial cards (AgendaPro-inspired) ── */
        .test-dark-card{background:linear-gradient(160deg,rgba(12,24,10,0.8),rgba(6,16,4,0.5));border:1px solid rgba(255,255,255,0.07);border-radius:24px;padding:28px;display:flex;flex-direction:column;transition:all 280ms cubic-bezier(0.16,1,0.3,1);}
        .test-dark-card:hover{border-color:rgba(191,255,0,0.28);transform:translateY(-4px);box-shadow:0 24px 52px -14px rgba(191,255,0,0.1);}
        .test-dark-featured{background:linear-gradient(140deg,rgba(191,255,0,0.06),rgba(6,16,4,0.75));border:1px solid rgba(191,255,0,0.22);border-radius:28px;padding:40px;transition:all 300ms ease;}
        .test-dark-featured:hover{border-color:rgba(191,255,0,0.42);box-shadow:0 32px 64px -16px rgba(191,255,0,0.15);}
        .industry-chip-dark{font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(191,255,0,0.65);padding:4px 10px;background:rgba(191,255,0,0.08);border:1px solid rgba(191,255,0,0.15);border-radius:100px;display:inline-block;white-space:nowrap;}
        .test-metric-big{font-family:'Instrument Serif',serif;font-style:italic;line-height:1;color:#BFFF00;}

        /* ── Clients ticker ── */
        .clients-ticker{border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);padding:16px 0;overflow:hidden;}
        @keyframes scroll-left{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        .clients-ticker-inner{display:flex;width:max-content;animation:scroll-left 30s linear infinite;}
        .clients-ticker-inner:hover{animation-play-state:paused;}
        .client-name{flex-shrink:0;padding:0 48px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.18);display:flex;align-items:center;gap:48px;}
        .client-name::after{content:'·';color:rgba(191,255,0,0.3);}

        /* ── Proof float card (hero) ── */
        @keyframes floatCard{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-8px) rotate(-1deg);}}
        .proof-float{animation:floatCard 5s ease-in-out infinite;background:rgba(6,14,4,0.85);border:1px solid rgba(191,255,0,0.25);border-radius:16px;padding:14px 18px;backdrop-filter:blur(16px);display:inline-flex;align-items:center;gap:12px;box-shadow:0 16px 48px -12px rgba(0,0,0,0.5);}

        /* ── Scrollbar ── */
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(191,255,0,0.25);border-radius:2px;}

        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}

        /* ── Mobile touch improvements ── */
        @media(max-width:640px){
          .cta-glow::after{display:none;}
          .glow-card::before,.glow-card::after{display:none;}
          .test-card:hover,.lift:hover{transform:none;}
        }
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}.reveal{opacity:1;transform:none;}}
      `}</style>

      {/* ── MOBILE MENU ──────────────────────────────────────────────── */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-white/[0.07]">
            <img src={logo} alt="Veluz" className="h-[48px] w-auto max-w-[180px] object-contain" />
            <button onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:border-white/25 transition-all active:scale-95">
              <X size={18} />
            </button>
          </div>
          {/* Nav links */}
          <nav className="flex flex-col gap-1 px-4 pt-6 flex-1">
            {[['metodo','Método'],['servicios','Servicios'],['clientes','Clientes'],['faq','FAQ']].map(([id,l]) => (
              <button key={id} onClick={() => goto(id)}
                className="text-lg font-semibold text-left tracking-tight text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-all px-4 py-3.5 rounded-xl active:scale-[0.98]">
                {l}
              </button>
            ))}
          </nav>
          {/* Bottom CTA */}
          <div className="px-4 pb-10 pt-4 space-y-3 border-t border-white/[0.07] mt-4">
            <button onClick={() => goto('agendar')}
              className="w-full cta-glow bg-[#BFFF00] text-black font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
              Agendar diagnóstico gratis <ArrowRight size={15} />
            </button>
            <a href="https://wa.me/573125923915" target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 text-white font-semibold text-base py-4 rounded-full bg-[#25D366] hover:bg-[#20bb5a] transition-colors active:scale-[0.98]">
              <WaIcon /> WhatsApp · +57 312 592 3915
            </a>
          </div>
        </div>
      </div>

      {/* ══ NAV · estilo Chispa AI ══ */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#030710]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[88px] flex items-center justify-between">
          <img src={logo} alt="Veluz"
            className="h-[80px] w-auto max-w-[300px] object-contain cursor-pointer"
            onClick={() => window.scrollTo({top:0,behavior:'smooth'})} />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            {[['metodo','Método'],['servicios','Servicios'],['clientes','Clientes'],['faq','FAQ']].map(([id,l]) => (
              <button key={id} onClick={() => goto(id)} className="hover:text-white transition-colors">{l}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://calendly.com/veluz-acquisition/30min?hide_landing_page_details=1&primary_color=bfff00"
              target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex cta-glow bg-[#BFFF00] hover:bg-[#d4ff40] text-black font-semibold text-sm px-6 py-3 rounded-lg transition-colors items-center gap-2">
              Agenda tu llamada →
            </a>
            <button onClick={() => setMobileOpen(true)} aria-label="Abrir menú"
              className="md:hidden flex flex-col gap-[5px] p-3 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/[0.04] transition-all active:scale-95">
              <span className="w-[18px] h-[1.5px] bg-white rounded-full block" />
              <span className="w-[14px] h-[1.5px] bg-zinc-400 rounded-full block" />
              <span className="w-[18px] h-[1.5px] bg-white rounded-full block" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <div style={{height:'88px'}} aria-hidden="true" />

      <section id="hero-section" className="relative overflow-hidden min-h-[calc(100vh-88px)] flex items-center grid-bg">
        <div className="absolute inset-0 mesh-bg z-0" />
        <div className="hero-overlay" />

        {/* Hero content */}
        <div className="relative z-20 max-w-4xl mx-auto px-5 lg:px-8 py-16 lg:py-20 text-center w-full">

          {/* Badge de prueba social */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] mb-8">
            <div className="flex gap-0.5 text-[#BFFF00]">
              {[...Array(5)].map((_,i) => <Star key={i} size={11} fill="currentColor" stroke="none" />)}
            </div>
            <span className="mono-label" style={{letterSpacing:'0.16em',fontSize:'10px'}}>+20 negocios escalados en Colombia</span>
          </div>

          {/* H1 — grande y directo, como AgendaPro */}
          <h1 className="text-5xl sm:text-6xl md:text-[78px] lg:text-[96px] font-bold tracking-tight leading-[1.0] mb-6">
            <span className="block text-white">Tu negocio merece crecer</span>
            <span className="serif-accent">sin depender de ti.</span>
          </h1>

          {/* Subheadline — corto, legible, 2 líneas */}
          <p className="text-xl sm:text-2xl text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Ventas, presencia digital y automatización con IA.<br className="hidden sm:block"/>
            Tu operación trabaja 24/7. Sin anuncios. Sin contratar más.
          </p>

          {/* CTAs — pill shape, grandes */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="https://calendly.com/veluz-acquisition/30min?hide_landing_page_details=1&primary_color=bfff00"
              target="_blank" rel="noopener noreferrer"
              className="cta-glow bg-[#BFFF00] hover:bg-[#d4ff40] text-black font-bold text-lg px-10 py-5 rounded-full transition-colors inline-flex items-center justify-center gap-2.5">
              Agenda tu diagnóstico gratis <ArrowRight size={18} />
            </a>
            <a href="https://wa.me/573125923915?text=Hola%20Veluz,%20quiero%20informaci%C3%B3n"
              target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bb5a] text-white font-bold text-lg px-9 py-5 rounded-full transition-colors inline-flex items-center justify-center gap-2.5">
              <WaIcon /> WhatsApp directo
            </a>
          </div>

          {/* Micro-trust */}
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 mb-10">
            {['Implementación en 15 días','Sin conocimientos técnicos','ROI en 60 días'].map(t => (
              <span key={t} className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 size={14} className="text-[#BFFF00] shrink-0"/>{t}
              </span>
            ))}
          </div>

          {/* Proof chips row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <div className="proof-float">
              <div className="w-7 h-7 rounded-full bg-[#BFFF00]/15 flex items-center justify-center shrink-0">
                <span className="w-2 h-2 bg-[#BFFF00] rounded-full block" style={{boxShadow:'0 0 8px rgba(191,255,0,0.8)',animation:'blink 1.6s ease-in-out infinite'}}/>
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-none mb-0.5">-92% tiempo operativo</p>
                <p className="mono-label leading-none" style={{fontSize:'8px',opacity:0.5}}>LMS Finance</p>
              </div>
            </div>
            <div className="proof-float" style={{animationDelay:'1.2s'}}>
              <div className="w-7 h-7 rounded-full bg-[#BFFF00]/15 flex items-center justify-center shrink-0">
                <span className="w-2 h-2 bg-[#BFFF00] rounded-full block" style={{boxShadow:'0 0 8px rgba(191,255,0,0.8)',animation:'blink 1.6s ease-in-out infinite 0.5s'}}/>
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-none mb-0.5">+60% pedidos digitales</p>
                <p className="mono-label leading-none" style={{fontSize:'8px',opacity:0.5}}>Soy Origen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          I — INTEREST: EL PROBLEMA  ·  SECCIÓN BLANCA
      ════════════════════════════════════════════════════════════════════ */}
      <section id="problema" className="relative py-20 lg:py-28 grid-bg-light" style={{background:'#f5faf0'}}>
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div ref={r2} className={`reveal text-center mb-14 ${v2?'visible':''}`}>
            <p className="mono-dark mb-3">— ¿Te identificas?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-[#0a1a05]">
              Cada día sin sistema <span className="serif-dark">es dinero que se va.</span>
            </h2>
            <p className="text-zinc-500 text-base mt-4 max-w-xl mx-auto font-light">
              La mayoría de negocios locales pierden clientes no por falta de calidad, sino por falta de infraestructura.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className={`reveal reveal-1 lift bg-white border border-red-100 rounded-2xl p-7 shadow-sm ${v2?'visible':''}`}>
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-red-400 mb-3">— Lo que vives hoy</div>
              <ul className="space-y-3.5">
                {[
                  'Respondes manualmente y pierdes leads mientras duermes.',
                  'No apareces en Google ni en los buscadores de IA.',
                  'Tu equipo pierde horas en tareas que una IA haría sola.',
                ].map(t=>(
                  <li key={t} className="flex gap-2.5 text-zinc-500 text-sm leading-relaxed">
                    <XCircle size={15} className="text-red-400 shrink-0 mt-0.5"/>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`reveal reveal-2 lift bg-white border border-[#BFFF00]/30 rounded-2xl p-7 shadow-sm ${v2?'visible':''}`}>
              <div className="w-10 h-10 rounded-xl bg-[#f0fce8] border border-[#BFFF00]/40 flex items-center justify-center mb-5">
                <CheckCircle2 size={18} className="text-[#3d7a00]" />
              </div>
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#3d7a00] mb-3">— Lo que pasa con Veluz</div>
              <ul className="space-y-3.5">
                {[
                  'Un agente IA responde en segundos y agenda la cita solo.',
                  'Aparecer primero en Google y ser citado por ChatGPT.',
                  'Tus procesos corren solos — tú te concentras en crecer.',
                ].map(t=>(
                  <li key={t} className="flex gap-2.5 text-[#1a2a0e] text-sm font-medium leading-relaxed">
                    <CheckCircle size={15} className="text-[#3d7a00] shrink-0 mt-0.5"/>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS · prueba social
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 lg:px-8">
          <div ref={r1} className={`reveal text-center mb-12 ${v1?'visible':''}`}>
            <p className="mono-label mb-3" style={{fontSize:'9px'}}>— Resultados comprobados</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              <span className="text-white">Números que </span>
              <span className="serif-accent">hablan solos.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {v:20,s:'+',l:'Negocios escalados'},
              {v:15,s:'d',l:'Tiempo de implementación'},
              {v:0,s:'',l:'Pesos en publicidad necesarios',amber:true},
            ].map(({v,s,l,amber},i)=>(
              <GlowCard key={l} amber={amber} className={`text-center reveal reveal-${i+1} ${v1?'visible':''}`}>
                <div className="text-5xl md:text-6xl text-white mb-3 tabular-nums"
                  style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic'}}>
                  <Stat val={v} suffix={s} />
                </div>
                <p className="mono-label" style={{letterSpacing:'0.2em',fontSize:'9px'}}>{l}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE · clientes ──────────────────────────────────────── */}
      <div className="clients-ticker">
        <div className="ticker-mask">
          <div className="clients-ticker-inner">
            {[...Array(4)].flatMap(() =>
              ['LMS Finance','Ana Molano Peluquería','Soy Origen','Veluz Agency','Studio Wellness','Clínica Norte','Óptica Premium','Centro Fit']
            ).map((n,i) => (
              <span key={i} className="client-name">{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MÉTODO VELUZ-3X · acq-flow
      ════════════════════════════════════════════════════════════════════ */}
      <section id="metodo" className="relative py-20 lg:py-28 border-y border-white/[0.05]" style={{background:'rgba(6,16,4,0.4)'}}>
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div ref={r3} className={`reveal text-center mb-16 ${v3?'visible':''}`}>
            <p className="mono-label mb-4" style={{fontSize:'9px'}}>— D · Cómo lo hacemos</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
              <span className="text-white">Tres pasos. </span>
              <span className="serif-accent">Un sistema completo.</span>
            </h2>
            <p className="text-base text-zinc-400 max-w-md mx-auto font-light">Sin tecnicismos. Sin sorpresas. Sabes exactamente qué pasa en cada etapa.</p>
          </div>
          <div className="acq-flow">
            <div className="acq-line" aria-hidden="true"/>
            <div className="acq-line-fill" id="acq-fill" aria-hidden="true"/>
            <div className="acq-grid">
              {[
                {n:'01',tag:'Diagnóstico',t:'Auditoría de tu negocio',d:'Mapeamos tus fugas de tiempo y dinero. 25 minutos sin costo.'},
                {n:'02',tag:'Arquitectura',t:'Infraestructura a medida',d:'Construimos tu ecosistema de IA, CRM y automatizaciones. Tú apruebas todo.'},
                {n:'03',tag:'Ignición',t:'Sistema activo y escalando',d:'Encendemos la máquina y optimizamos en tiempo real para maximizar el ROI.'},
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
          INTEGRACIONES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-14 border-b border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <p className="mono-label mb-6" style={{fontSize:'9px',opacity:0.45}}>— Se conecta con las herramientas que ya usas</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {integrations.map(({name,c}) => (
              <div key={name} className="int-badge">
                <div className="int-dot" style={{background:`${c}22`,color:c,boxShadow:`inset 0 0 0 1px ${c}44`}}>
                  {name.charAt(0)}
                </div>
                <span className="text-zinc-300 text-xs font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SERVICIOS
      ════════════════════════════════════════════════════════════════════ */}
      <section id="servicios" className="relative py-20 lg:py-28">
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div ref={r4} className={`reveal text-center mb-12 ${v4?'visible':''}`}>
            <p className="mono-label mb-4" style={{fontSize:'9px'}}>— Lo que construimos contigo</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
              <span className="text-white">Elige lo que </span>
              <span className="serif-accent">tu negocio necesita.</span>
            </h2>
            <p className="text-base text-zinc-400 max-w-md mx-auto font-light">Cada servicio es un sistema completo. Puedes empezar por uno o activarlos todos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const isFeatured = s.id === 'ia';
              return (
                <div key={s.id}
                  className={`svc-card-new ${isFeatured ? 'featured' : ''} reveal reveal-${i+1} ${v4 ? 'visible' : ''}`}>
                  {/* Icon + Tag row */}
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className={`svc-icon-wrap ${isFeatured ? 'featured' : 'default'}`}>
                      <div className="text-[#BFFF00]">{s.icon}</div>
                    </div>
                    <span className="mono-label text-right leading-relaxed shrink-0 pt-1" style={{opacity:0.45,fontSize:'7.5px',maxWidth:'100px'}}>{s.tag}</span>
                  </div>

                  {/* Title & desc */}
                  <h3 className="text-xl font-bold tracking-tight text-white mb-3 leading-snug">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5 font-light" style={{flexGrow:1}}>{s.desc}</p>

                  {/* Features list */}
                  <div className="space-y-2.5 mb-6">
                    {s.features.map(f => (
                      <div key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <CheckCircle2 size={13} className="text-[#BFFF00] shrink-0 mt-0.5"/>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Before / After */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6 border-t border-white/[0.06] pt-5">
                    <div className="bg-red-500/[0.06] border border-red-500/[0.1] p-3 rounded-xl">
                      <p className="text-red-400 font-mono uppercase tracking-wider mb-2 flex items-center gap-1" style={{fontSize:'8px'}}>
                        <XCircle size={9}/>Antes
                      </p>
                      <p className="text-zinc-500 leading-relaxed" style={{fontSize:'11px'}}>{s.before}</p>
                    </div>
                    <div className="bg-[#BFFF00]/[0.05] border border-[#BFFF00]/[0.12] p-3 rounded-xl">
                      <p className="text-[#BFFF00] font-mono uppercase tracking-wider mb-2 flex items-center gap-1" style={{fontSize:'8px'}}>
                        <CheckCircle2 size={9}/>Después
                      </p>
                      <p className="text-zinc-200 leading-relaxed font-medium" style={{fontSize:'11px'}}>{s.after}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => goto('agendar')}
                    className={`mt-auto font-semibold text-sm px-5 py-2.5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors w-full ${isFeatured ? 'cta-glow bg-[#BFFF00] text-black hover:bg-[#d4ff40]' : 'bg-white/[0.06] text-white border border-white/10 hover:bg-white/[0.1]'}`}>
                    Implementar este sistema <ArrowRight size={13}/>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TESTIMONIALES  ·  DARK — AgendaPro style
      ════════════════════════════════════════════════════════════════════ */}
      <section id="clientes" className="relative py-24 lg:py-32 overflow-hidden border-y border-white/[0.05]">
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 lg:px-8">

          {/* Header */}
          <div ref={r5} className={`reveal text-center mb-16 ${v5?'visible':''}`}>
            <p className="mono-label mb-4" style={{fontSize:'9px'}}>— Casos reales · Colombia</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-white">Negocios reales.</span><br/>
              <span className="serif-accent">Resultados que se miden.</span>
            </h2>
            <p className="text-zinc-400 text-base mt-5 max-w-md mx-auto font-light">
              Sin promesas vacías. Solo sistemas implementados y métricas concretas.
            </p>
          </div>

          {/* Featured testimonial — LMS Finance */}
          <div className={`reveal mb-5 ${v5?'visible':''}`}>
            <div className="test-dark-featured">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
                {/* Quote side */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="industry-chip-dark">{testimonials[0].industry}</span>
                    <div className="flex gap-1 text-[#BFFF00]">
                      {[...Array(5)].map((_,k)=><Star key={k} size={12} fill="currentColor" stroke="none"/>)}
                    </div>
                  </div>
                  <div style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic',fontSize:'80px',lineHeight:0.8,color:'rgba(191,255,0,0.12)',userSelect:'none'}} aria-hidden="true">"</div>
                  <p className="text-lg lg:text-xl text-zinc-100 leading-relaxed font-light italic mt-2 mb-7">
                    {testimonials[0].quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#BFFF00]/10 border border-[#BFFF00]/20 flex items-center justify-center text-[#BFFF00] font-bold text-sm shrink-0">
                      {testimonials[0].name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm">{testimonials[0].name}</p>
                      <p className="text-zinc-500 text-xs">{testimonials[0].role} · {testimonials[0].company}</p>
                    </div>
                    <a href={testimonials[0].url} target="_blank" rel="noopener noreferrer"
                      className="text-[#BFFF00]/60 hover:text-[#BFFF00] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors">
                      Ver web <ExternalLink size={10}/>
                    </a>
                  </div>
                </div>
                {/* Metric side */}
                <div className="shrink-0 flex flex-row lg:flex-col items-center lg:items-end gap-6 lg:gap-2 border-t lg:border-t-0 lg:border-l border-white/[0.07] pt-5 lg:pt-0 lg:pl-14 w-full lg:w-auto">
                  <div className="text-center lg:text-right">
                    <div className="test-metric-big" style={{fontSize:'clamp(52px,6vw,76px)'}}>{testimonials[0].metric}</div>
                    <p className="mono-label mt-1" style={{opacity:0.5,fontSize:'9px'}}>{testimonials[0].metricLabel}</p>
                  </div>
                  <div className="h-px w-12 bg-[#BFFF00]/15 hidden lg:block self-center" />
                  <p className="text-zinc-600 text-xs leading-relaxed hidden lg:block text-right max-w-[140px]">Implementación en 30 días</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {testimonials.slice(1).map((t, i) => (
              <div key={t.company} className={`test-dark-card reveal reveal-${i+1} ${v5?'visible':''}`}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="industry-chip-dark">{t.industry}</span>
                  <div className="flex gap-1 text-[#BFFF00] shrink-0">
                    {[...Array(5)].map((_,k)=><Star key={k} size={11} fill="currentColor" stroke="none"/>)}
                  </div>
                </div>
                <div style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic',fontSize:'56px',lineHeight:0.8,color:'rgba(191,255,0,0.1)',userSelect:'none'}} aria-hidden="true">"</div>
                <p className="text-zinc-300 text-sm leading-relaxed font-light italic mt-2 mb-5 flex-1">
                  {t.quote}
                </p>
                <div className="border-t border-white/[0.06] pt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/40 text-xs font-bold shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm truncate">{t.name}</p>
                      <p className="text-zinc-600 text-xs truncate">{t.role} · {t.company}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="test-metric-big" style={{fontSize:'28px'}}>{t.metric}</div>
                    <p className="mono-label" style={{opacity:0.4,fontSize:'7.5px'}}>{t.metricLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={r6} className={`reveal text-center ${v6?'visible':''}`}>
            <button onClick={() => goto('agendar')}
              className="cta-glow bg-[#BFFF00] text-black font-semibold text-sm px-7 py-3.5 rounded-lg inline-flex items-center gap-2 hover:bg-[#d4ff40] transition-colors">
              Quiero resultados como estos <ArrowRight size={14}/>
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MÉTRICAS LMS  (compacto, dentro de la sección oscura)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-24 border-y border-white/[0.05]" style={{background:'rgba(6,16,4,0.45)'}}>
        <div className="absolute inset-0 section-glow pointer-events-none"/>
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div ref={r7} className={`reveal text-center mb-10 ${v7?'visible':''}`}>
            <p className="mono-label mb-3" style={{fontSize:'9px'}}>— Caso destacado · LMS Finance</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              <span className="text-white">Automatización financiera </span>
              <span className="serif-accent">para la DIAN.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {v:92,s:'%',l:'Tiempo reducido',amber:true},
              {v:5,s:'X',l:'Facturación'},
              {v:0,s:'',l:'Fugas de leads'},
              {v:30,s:'d',l:'Implantación'},
            ].map(({v,s,l,amber},i)=>(
              <GlowCard key={l} amber={amber} className={`text-center reveal reveal-${i+1} ${v7?'visible':''}`}>
                <div className="text-4xl md:text-5xl text-white mb-2 tabular-nums"
                  style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic'}}>
                  <Stat val={v} suffix={s}/>
                </div>
                <p className="mono-label" style={{letterSpacing:'0.18em',fontSize:'8.5px'}}>{l}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ  ·  SECCIÓN BLANCA
      ════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative py-20" style={{background:'#f5faf0'}}>
        <div className="max-w-2xl mx-auto px-5 lg:px-8">
          <div ref={r9} className={`reveal text-center mb-12 ${v9?'visible':''}`}>
            <p className="mono-dark mb-3">— FAQ</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0a1a05]">Preguntas frecuentes</h2>
          </div>
          <div className="space-y-2.5">
            {faqs.map((faq,i)=>(
              <div key={i} className={`faq-item ${openFaq===i?'open':''}`}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left">
                  <span className={`font-medium text-sm leading-snug transition-colors ${openFaq===i?'text-[#3d7a00]':'text-[#0a1a05]'}`}>{faq.q}</span>
                  <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all border ${openFaq===i?'bg-[#BFFF00] text-black border-[#BFFF00]':'border-black/15 text-zinc-400'}`}>
                    <ChevronDown size={12} className={`transition-transform duration-300 ${openFaq===i?'rotate-180':''}`}/>
                  </div>
                </button>
                {openFaq===i && (
                  <p className="px-5 pb-5 text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA FINAL · agendar
      ════════════════════════════════════════════════════════════════════ */}
      <section id="agendar" className="relative py-24 lg:py-36 overflow-hidden">
        {/* Fondo mesh igual que el hero */}
        <div className="absolute inset-0 grid-bg mesh-bg" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#BFFF00]/[0.04] blur-[140px] rounded-full pointer-events-none"/>

        <div className="relative z-10 max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="mono-label mb-6" style={{fontSize:'9px'}}>— Siguiente paso</p>

          <h2 className="text-4xl md:text-5xl lg:text-[62px] font-bold tracking-tight leading-[1.04] mb-6">
            <span className="block text-white">¿Listo para que tu</span>
            <span className="serif-accent">negocio trabaje solo?</span>
          </h2>

          <p className="text-lg text-zinc-300 leading-relaxed max-w-lg mx-auto mb-8 font-light">
            Agenda una llamada de 30 minutos sin costo. Te mostramos exactamente cómo quedaría tu sistema, con números reales para tu negocio.
          </p>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 mb-10">
            <span className="w-1.5 h-1.5 bg-[#BFFF00] rounded-full shrink-0"
              style={{boxShadow:'0 0 8px rgba(191,255,0,0.8)',animation:'blink 1.6s ease-in-out infinite'}}/>
            <span className="mono-label" style={{color:'rgba(255,255,255,0.6)',letterSpacing:'0.18em',fontSize:'9px'}}>
              Llamada 30 min · Sin costo · Sin presión
            </span>
          </div>

          {/* Checklist */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-zinc-400 mb-12">
            {['Si no encajamos, te lo decimos directo.','Diagnóstico real de tu operación actual.','Propuesta concreta con cifras y tiempos.'].map(t=>(
              <div key={t} className="flex items-start gap-2 text-left">
                <CheckCircle2 size={14} className="text-[#BFFF00] shrink-0 mt-0.5"/>
                <span>{t}</span>
              </div>
            ))}
          </div>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/veluz-acquisition/30min?hide_landing_page_details=1&primary_color=bfff00"
              target="_blank" rel="noopener noreferrer"
              className="cta-glow bg-[#BFFF00] hover:bg-[#d4ff40] text-black font-bold text-xl px-12 py-5 rounded-full inline-flex items-center justify-center gap-2.5 transition-colors">
              <Calendar size={20} strokeWidth={2.5} />
              Agendar diagnóstico gratis
            </a>
            <a
              href="https://wa.me/573125923915?text=Hola%20Veluz%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20gratuito"
              target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bb5a] text-white font-bold text-lg px-8 py-5 rounded-full inline-flex items-center justify-center gap-2.5 transition-colors">
              <WaIcon /> WhatsApp directo
            </a>
          </div>

          <p className="mono-label mt-10" style={{opacity:0.3,letterSpacing:'0.22em',fontSize:'9px'}}>
            ✓ Sin tarjeta &nbsp;·&nbsp; ✓ Sin contrato &nbsp;·&nbsp; ✓ Sin presión
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="py-12 border-t border-white/[0.06] px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={logo} alt="Veluz" className="h-10 w-auto max-w-[160px] object-contain opacity-50 hover:opacity-80 transition-opacity"/>
          <div className="flex gap-8 mono-label flex-wrap justify-center" style={{opacity:0.3,letterSpacing:'0.24em',fontSize:'9px'}}>
            <a href="https://wa.me/573125923915" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-[#BFFF00] transition-all">WhatsApp</a>
            <a href="https://calendly.com/veluz-acquisition/30min?hide_landing_page_details=1&primary_color=bfff00" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-[#BFFF00] transition-all">Agendar</a>
            <span>© 2026 Veluz Agency</span>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CTA (mobile) ──────────────────────────────────────── */}
      {showFloat && (
        <div className="fixed bottom-5 right-5 z-[100] md:hidden">
          <a href="https://calendly.com/veluz-acquisition/30min?hide_landing_page_details=1&primary_color=bfff00"
            target="_blank" rel="noopener noreferrer"
            className="cta-glow bg-[#BFFF00] text-black p-4 rounded-full shadow-2xl active:scale-90 transition-transform flex items-center justify-center border-4 border-[#030710]">
            <Calendar size={20} strokeWidth={2.5}/>
          </a>
        </div>
      )}
    </div>
  );
}
