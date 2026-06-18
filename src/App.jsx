import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, Sparkles, CheckCircle2, ChevronDown, Calendar,
  BrainCircuit, Megaphone, AlertTriangle, Star, Menu, X, Plus,
  ShieldCheck, Search, Users, TrendingUp, CheckCircle,
  ArrowDown, XCircle, AlertCircle
} from 'lucide-react';

// ── Counter animado ───────────────────────────────────────────────────────────
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end, duration]);
  return [count, ref];
};

// ── Reveal on scroll ──────────────────────────────────────────────────────────
const useReveal = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06, rootMargin: '0px 0px -60px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

// ── Stat Counter ──────────────────────────────────────────────────────────────
const Stat = ({ val, suffix = '' }) => {
  const [n, r] = useCountUp(val);
  return <span ref={r}>{n}{suffix}</span>;
};

// ── WhatsApp Icon ─────────────────────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.748.002-2.607-1.012-5.059-2.859-6.91-1.847-1.851-4.3-2.87-6.917-2.871-5.438 0-9.863 4.37-9.867 9.75-.001 1.773.49 3.512 1.42 5.047l-.995 3.635 3.723-.977zm11.367-7.251c-.26-.13-1.538-.759-1.776-.847-.239-.088-.413-.133-.587.13-.174.26-.674.847-.826 1.02-.152.174-.304.195-.565.065-.26-.13-1.097-.404-2.09-1.288-.772-.689-1.293-1.54-1.445-1.8-.152-.26-.016-.4.115-.53.117-.118.26-.304.39-.456.13-.152.174-.26.26-.434.088-.174.043-.326-.022-.456-.065-.13-.587-1.41-.804-1.93-.213-.513-.448-.443-.615-.443-.16-.003-.343-.003-.527-.003-.184 0-.485.07-.739.348-.254.278-.972.951-.972 2.321 0 1.37.994 2.695 1.135 2.89.141.195 1.958 2.99 4.743 4.193.662.286 1.18.457 1.582.585.665.21 1.27.18 1.748.11.532-.08 1.538-.629 1.756-1.237.217-.609.217-1.13.152-1.237-.065-.109-.239-.152-.499-.283z"/>
    </svg>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openService, setOpenService] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [pricingTab, setPricingTab] = useState('all');
  const [expandedPlan, setExpandedPlan] = useState({});
  const [showFloat, setShowFloat] = useState(false);

  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const logo = 'https://res.cloudinary.com/dfj0ckm10/image/upload/q_auto/f_auto/v1778464000/ChatGPT_Image_May_10_2026_08_45_58_PM_fo32bz.png';

  // ── Scroll handler ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowFloat(y > 800);
      if (heroRef.current && window.innerWidth > 768) {
        heroRef.current.style.transform = `translateY(${y * 0.04}px)`;
        heroRef.current.style.opacity = String(Math.max(0, 1 - y / 900));
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // ── Canvas: Liquid Metal Waves ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let phase = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const parent = canvas.parentElement;
    const onMove = (e) => {
      mouse.tx = e.clientX - canvas.getBoundingClientRect().left;
      mouse.ty = e.clientY - canvas.getBoundingClientRect().top;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (mouse.active) {
        mouse.x += (mouse.tx - mouse.x) * 0.07;
        mouse.y += (mouse.ty - mouse.y) * 0.07;
      }

      const lines = window.innerWidth < 768 ? 16 : 28;
      const pts = 45;
      const sx = canvas.width / (pts - 1);

      for (let j = 0; j < lines; j++) {
        const f = j / lines;
        const alpha = 0.03 + Math.sin(f * Math.PI) * 0.22;
        ctx.lineWidth = 1.6 - f * 0.8;
        ctx.strokeStyle = `rgba(191,255,0,${alpha})`;
        ctx.beginPath();

        for (let i = 0; i < pts; i++) {
          const x = i * sx;
          const w1 = Math.sin(i * 0.14 + phase + j * 0.19) * 36;
          const w2 = Math.cos(i * 0.07 - phase * 0.45 + j * 0.11) * 16;
          const w3 = Math.sin(i * 0.22 + phase * 1.3 + j * 0.08) * 8;
          let cy = canvas.height * 0.46 + (j - lines / 2) * (17 + j * 0.35);

          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 260) {
              const pull = Math.cos((dist / 260) * Math.PI * 0.5) * 45 * (1 - f * 0.4);
              cy += (dy > 0 ? -pull : pull) * 0.55;
            }
          }

          const y = cy + w1 + w2 + w3;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      phase += 0.0035;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── Smooth scroll ──────────────────────────────────────────────────────────
  const goto = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const offset = scrolled ? 64 : 80;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  };

  // ── DATA ───────────────────────────────────────────────────────────────────
  const services = [
    {
      id: 'ia',
      tag: 'INTELIGENCIA & RESPUESTA',
      title: 'Agentes IA Nativa',
      icon: <BrainCircuit size={22} />,
      desc: 'Entrenamos cerebros digitales con el conocimiento de tu empresa. No son bots rígidos; son agentes con capacidad de razonamiento que venden, califican leads y agendan citas 24/7.',
      features: ['Venta conversacional WhatsApp 24/7', 'Calificación automática de leads', 'Agendamiento autónomo en Calendar / Calendly', 'Conexión directa a tu CRM en tiempo real'],
      metric: 99, suffix: '%', label: 'Autonomía de atención',
      before: 'Leads fríos que mueren en tu bandeja porque tardas horas en responder.',
      after: 'Agente IA responde en < 10 segundos, califica presupuesto y agenda la cita.',
      visual: (
        <div className="w-full bg-zinc-950 rounded-2xl border border-[#BFFF00]/20 overflow-hidden text-left font-mono text-xs shadow-[0_0_30px_rgba(191,255,0,0.04)]">
          <div className="bg-zinc-900 p-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-sans font-bold text-[11px] text-white">Agente IA Veluz — Activo</span>
            </div>
            <span className="text-[9px] font-sans font-black uppercase tracking-wider text-[#BFFF00] bg-[#BFFF00]/10 px-2 py-0.5 rounded">EN VIVO</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-zinc-800 p-2.5 rounded-r-xl rounded-bl-xl max-w-[85%] border border-white/5">
              <p className="text-zinc-400 text-[10px] mb-0.5 font-sans">Cliente • 09:41</p>
              <p className="text-white font-sans text-xs">Hola, quiero agendar consulta médica para el jueves. ¿Tienen cupos?</p>
            </div>
            <div className="bg-[#BFFF00]/10 p-2.5 rounded-l-xl rounded-br-xl max-w-[85%] ml-auto border border-[#BFFF00]/20">
              <p className="text-[#BFFF00] text-[10px] mb-0.5 text-right font-sans">IA Veluz • 09:41</p>
              <p className="text-white font-sans text-xs">¡Hola! Claro, tenemos cupos el jueves con el Dr. Silva. ¿Es primera vez o control?</p>
            </div>
            <div className="bg-zinc-800 p-2.5 rounded-r-xl rounded-bl-xl max-w-[60%] border border-white/5">
              <div className="flex gap-1 items-center py-1">
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay:'0ms'}} />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay:'150ms'}} />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay:'300ms'}} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'geo',
      tag: 'VISIBILIDAD & AUTORIDAD',
      title: 'Contenido Orgánico & GEO',
      icon: <Megaphone size={22} />,
      desc: 'Cero dólares en anuncios. Construimos tu autoridad de marca mediante posicionamiento omnicanal. Optimizamos para liderar Google Y ser citado por ChatGPT, Claude y Gemini (GEO).',
      features: ['GEO — Generative Engine Optimization', 'Posicionamiento SEO local y Google Maps #1', 'Estrategia de contenido de alta retención viral', 'Copys persuasivos orientados al ROI'],
      metric: 10, suffix: 'X', label: 'Multiplicación de tráfico',
      before: 'Dependes de pauta cara que se apaga cuando dejas de pagar.',
      after: 'Eres citado orgánicamente como referente por IAs y buscadores sin costo de pauta.',
      visual: (
        <div className="w-full bg-zinc-950 rounded-2xl border border-[#BFFF00]/20 p-4 text-left font-sans shadow-[0_0_30px_rgba(191,255,0,0.04)]">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
            <Search size={11} className="text-[#BFFF00]" /> Motor de Respuesta IA (GEO)
          </div>
          <div className="bg-zinc-900 p-3 rounded-xl border border-white/5 mb-3">
            <p className="text-xs text-white/50 mb-1.5 font-mono">Pregunta en ChatGPT / Gemini:</p>
            <p className="text-xs text-white font-semibold">¿Cuál es la mejor clínica de implantes dentales en Bogotá?</p>
          </div>
          <div className="bg-[#BFFF00]/5 border-l-2 border-[#BFFF00] p-3 rounded-r-xl">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={11} className="text-[#BFFF00]" />
              <p className="text-[10px] text-[#BFFF00] font-black uppercase tracking-wider font-mono">Respuesta de IA</p>
            </div>
            <p className="text-xs text-white leading-relaxed">
              Según autoridad orgánica y reseñas verificadas, la opción más recomendada es <strong className="text-[#BFFF00]">tu_empresa.com</strong> por sus procesos digitalizados y atención inmediata...
            </p>
            <div className="mt-2 flex gap-2 items-center">
              <span className="text-[9px] text-zinc-500 font-mono">Fuentes:</span>
              {['Google Maps','tu_empresa.com'].map(s => <span key={s} className="text-[8px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-white/5 font-mono">{s}</span>)}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'auto',
      tag: 'PROCESOS & PRODUCTIVIDAD',
      title: 'Automatización de Procesos',
      icon: <Zap size={22} />,
      desc: 'Conectamos todo tu software. Integramos CRM, pasarelas de pago, bases de datos y comunicaciones para eliminar tareas repetitivas. Si hoy lo hace a mano, lo convertimos en código autónomo.',
      features: ['Flujos automatizados Make / Zapier', 'Sincronización de CRM de ventas', 'Alertas, webhooks e integraciones en tiempo real', 'Métricas centralizadas sin intervención humana'],
      metric: 15, suffix: 'h/s', label: 'Horas operativas ahorradas',
      before: 'Tu equipo pierde el 40% del día copiando datos entre Excel, WhatsApp y correos.',
      after: 'Un lead entra, se crea en CRM, se genera factura y se notifica al equipo automáticamente.',
      visual: (
        <div className="w-full bg-zinc-950 rounded-2xl border border-[#BFFF00]/20 p-4 text-left font-mono text-[10px] shadow-[0_0_30px_rgba(191,255,0,0.04)]">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2 text-zinc-500">
            <span>DIAGRAMA DE FLUJO VELUZ-3X</span>
            <span className="text-[#BFFF00] animate-pulse">ACTIVO</span>
          </div>
          <div className="space-y-3">
            {[
              { n: '1', t: 'Registro de Lead Orgánico', active: false },
              { n: '2', t: 'Asignación automática a CRM', active: true },
              { n: '3', t: 'WhatsApp IA + Factura Generada', active: false },
            ].map(({ n, t, active }) => (
              <React.Fragment key={n}>
                <div className={`flex items-center gap-3 p-2 rounded-xl border ${active ? 'border-[#BFFF00]/30 bg-zinc-900 shadow-[0_0_12px_rgba(191,255,0,0.05)]' : 'border-white/5 bg-zinc-900'}`}>
                  <div className={`w-5 h-5 rounded flex items-center justify-center font-black text-[10px] shrink-0 ${active ? 'bg-[#BFFF00] text-black' : 'bg-[#BFFF00]/10 border border-[#BFFF00]/20 text-[#BFFF00]'}`}>{n}</div>
                  <span className="text-white font-sans font-medium text-xs">{t}</span>
                </div>
                {n !== '3' && <div className="h-3 w-px bg-[#BFFF00]/30 ml-3.5" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      ),
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
    {
      id: 'web', type: 'marketing', cat: 'Activo digital',
      title: 'Página Web Profesional',
      desc: 'Landing page de alta conversión, optimizada para móvil, con botón WhatsApp y conectada a Google Maps. El sitio te pertenece para siempre.',
      setup: '$500.000 – $600.000 COP', setupLabel: 'Pago único · El sitio es tuyo',
      rec: '~$50.000 COP / año', recLabel: 'Renovación de dominio (pago directo al proveedor)',
      pills: ['Diseño a medida', 'Mobile first', 'Botón WhatsApp', 'Entrega 7 días', 'Google Maps'],
      pitch: 'Pagas una vez y el sitio es tuyo. El único costo futuro es el dominio, ~$50k/año directo a GoDaddy.',
      featured: false,
    },
    {
      id: 'chatbot', type: 'ia', cat: 'Servicio activo',
      title: 'Chatbot WhatsApp con IA',
      desc: 'Agente inteligente entrenado con el conocimiento de tu negocio. Responde, califica y agenda solo las 24 horas sin que muevas un dedo.',
      setup: '$650.000 COP', setupLabel: 'Setup, instalación y entrenamiento inicial',
      rec: '$100.000 COP / mes', recLabel: 'Operación, actualizaciones y soporte continuo',
      pills: ['Respuesta < 30s', 'Catálogo automático', 'Calificación leads', 'Agendamiento solo', 'Reporte mensual'],
      pitch: 'Los $100k mensuales cubren servidores y APIs. Si el bot trae 2 clientes extras al mes, ya se pagó solo.',
      featured: false,
    },
    {
      id: 'pack', type: 'marketing', cat: 'Pack completo',
      title: 'Pack Presencia Digital',
      desc: 'Web profesional o rediseño + Google Maps optimizado + 1 red social gestionada + 5 piezas de contenido orgánico mensual.',
      setup: '$1.000.000 COP', setupLabel: 'Setup completo · Mes 1',
      rec: '$50.000 – $100.000 COP / mes', recLabel: 'Gestión de contenido (según volumen)',
      pills: ['Web o rediseño', 'Google Maps #1', '1 red gestionada', '5 piezas/mes', 'SEO local', 'Dashboard'],
      pitch: 'El paquete definitivo para delegar tu visibilidad local. Construimos y mantenemos tu flujo de clientes sin depender de anuncios caros.',
      featured: true,
    },
    {
      id: 'flows', type: 'ia', cat: 'Sistemas a medida',
      title: 'Automatizaciones Custom',
      desc: 'Conexión integral de tus apps. Integramos CRM, pasarelas de pago, bases de datos y comunicaciones para eliminar tareas repetitivas.',
      setup: 'Desde $800.000 COP', setupLabel: 'Según complejidad del flujo técnico',
      rec: 'Sin costo mensual obligatorio', recLabel: 'Soporte & Mantenimiento opcional',
      pills: ['Webhooks & APIs', 'Flujos Make/Zapier', 'Conexión CRM', 'Alertas en vivo', 'Cero error humano'],
      pitch: 'Diseñado para empresas con procesos complejos. Pagas por la infraestructura instalada una sola vez y operas de forma autónoma.',
      featured: false,
    },
  ];

  const [rPr, vPr] = useReveal();
  const [rMe, vMe] = useReveal();
  const [rSe, vSe] = useReveal();
  const [rLm, vLm] = useReveal();
  const [rIn, vIn] = useReveal();
  const [rFq, vFq] = useReveal();

  const activeVis = services.find(s => s.id === openService)?.visual;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e2e1] font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Literata:ital,wght@1,400;1,700&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Outfit', sans-serif; overflow-x: hidden; }
        .serif { font-family: 'Literata', serif; font-style: italic; }
        .glow-btn { box-shadow: 0 8px 32px -8px rgba(191,255,0,0.45); }
        .glow-btn:hover { box-shadow: 0 14px 44px -4px rgba(191,255,0,0.65); transform: translateY(-3px); }
        .card-lift { transition: all 0.38s cubic-bezier(0.34,1.56,0.64,1); }
        .card-lift:hover { transform: translateY(-8px); box-shadow: 0 24px 48px -16px rgba(191,255,0,0.2); border-color: rgba(191,255,0,0.35) !important; }
        .glass-nav { backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
        .reveal-up { opacity: 0; transform: translateY(28px); transition: all 0.75s cubic-bezier(0.22,1,0.36,1); }
        .reveal-up.show { opacity: 1; transform: translateY(0); }
        .acc-content { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease; opacity: 0; }
        .acc-content.open { grid-template-rows: 1fr; opacity: 1; margin-top: 1rem; }
        .acc-inner { overflow: hidden; }
        .subtab { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease; opacity: 0; }
        .subtab.open { grid-template-rows: 1fr; opacity: 1; margin-top: 1rem; }
        .hero-bg { background: #000; position: relative; overflow: hidden; }
        .hero-bg::before { content: ''; position: absolute; inset: 0; opacity: 0.14; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); pointer-events: none; z-index: 1; }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-wrap { overflow: hidden; }
        .ticker-inner { display: flex; width: max-content; animation: ticker 28s linear infinite; }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .spin-slow { animation: spin-slow 9s linear infinite; }
        @keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
        .float-y { animation: float-y 2.2s ease-in-out infinite; }
        @keyframes blink-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .blink { animation: blink-dot 1.6s ease-in-out infinite; }
      `}</style>

      {/* ── FIXED HEADER ─────────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 w-full z-[100] flex flex-col">
        {/* Top bar */}
        <div className="w-full bg-[#BFFF00] text-black py-1.5 px-4 flex items-center justify-center">
          <div className="text-[9px] md:text-[10px] font-black tracking-[0.24em] uppercase flex items-center gap-1.5 sm:gap-2.5 flex-wrap justify-center">
            <AlertCircle size={11} className="blink shrink-0" />
            <span>Cupos limitados por mes</span>
            <span className="w-1 h-1 bg-black/30 rounded-full hidden sm:block" />
            <span>Mayo casi completo</span>
            <span className="w-1 h-1 bg-black/30 rounded-full hidden sm:block" />
            <button onClick={() => goto('agendar')} className="underline font-black hover:text-neutral-800 transition-colors">Reservar Ahora</button>
          </div>
        </div>

        {/* Navbar */}
        <nav className={`w-full transition-all duration-300 glass-nav ${scrolled ? 'py-1.5 bg-black/96 border-b border-white/5' : 'py-3 bg-[#0a0a0a]/88 border-b border-white/8'}`}>
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex justify-between items-center">
            <img src={logo} alt="Veluz" className="h-10 md:h-12 w-auto object-contain cursor-pointer" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} />
            <div className="hidden md:flex items-center gap-7">
              {[['problema','El Problema'],['metodo','Método'],['servicios','Servicios'],['inversion','Inversión'],['faq','Dudas']].map(([id,label]) => (
                <button key={id} onClick={() => goto(id)} className="text-[11px] font-black uppercase tracking-widest text-[#b0b8a0] hover:text-[#BFFF00] transition-colors">{label}</button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => goto('agendar')} className="bg-[#BFFF00] text-black px-5 md:px-7 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest glow-btn transition-all active:scale-95">Diagnóstico</button>
              <button onClick={() => setMobileOpen(true)} className="md:hidden text-[#BFFF00] p-1.5"><Menu size={22} /></button>
            </div>
          </div>
        </nav>
      </div>

      {/* ── MOBILE MENU ──────────────────────────────────────────────────────── */}
      <div className={`fixed inset-0 z-[120] bg-black transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-14">
            <img src={logo} alt="Veluz" className="h-10 object-contain" />
            <button onClick={() => setMobileOpen(false)} className="p-2 bg-white/5 rounded-full text-[#BFFF00]"><X size={22} /></button>
          </div>
          <div className="flex flex-col gap-7">
            {[['problema','El Problema'],['metodo','Método'],['servicios','Servicios'],['inversion','Inversión'],['faq','Dudas'],['agendar','Agendar']].map(([id,label]) => (
              <button key={id} onClick={() => goto(id)} className="text-4xl font-black text-left uppercase tracking-tighter hover:text-[#BFFF00] transition-colors">{label}</button>
            ))}
          </div>
          <a href="https://wa.me/573125923915" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center gap-3 text-sm text-zinc-500 hover:text-[#BFFF00] transition-colors">
            <WhatsAppIcon /> +57 312 592 3915
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="hero-bg relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-36 md:pt-44 pb-16 w-full" ref={heroRef}>
        <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-55" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[520px] h-[240px] sm:h-[360px] bg-[radial-gradient(ellipse,rgba(191,255,0,0.11)_0%,rgba(191,255,0,0.02)_50%,transparent_70%)] blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(191,255,0,0.25)] to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 mb-10 shadow-lg">
            <div className="flex gap-0.5 text-[#BFFF00]">
              {[...Array(5)].map((_,i) => <Star key={i} size={10} fill="currentColor" stroke="none" />)}
            </div>
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.22em] uppercase text-white/85">VALIDADO POR + DE 20 NEGOCIOS CON RESULTADOS</span>
          </div>

          {/* Title */}
          <h1 className="text-[38px] sm:text-[54px] md:text-[88px] font-black tracking-tighter leading-[1.04] text-white uppercase mb-7">
            DIGITALIZAMOS TU<br />
            <span className="serif text-[#BFFF00] font-normal capitalize text-[0.95em]">negocio con IA.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-light leading-relaxed px-2">
            Convertimos operaciones manuales en{' '}
            <span className="serif text-[#BFFF00] text-[1.12em]">máquinas de eficiencia</span>{' '}
            que cierran ventas sin que estés presente.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 px-4">
            <button onClick={() => goto('agendar')} className="w-full sm:w-auto bg-[#BFFF00] text-black px-8 py-4 sm:py-5 rounded-full font-black text-base flex items-center justify-center gap-3 glow-btn transition-all active:scale-95">
              <Calendar size={19} /> Agenda tu cita
            </button>
            <a href="https://wa.me/573125923915?text=Hola%20Veluz,%20quiero%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#075E54] hover:bg-[#128C7E] text-white px-8 py-4 sm:py-5 rounded-full font-black text-base flex items-center justify-center gap-3 transition-colors active:scale-95">
              <WhatsAppIcon /> Hablar por WhatsApp
            </a>
          </div>

          {/* Mini metrics */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10">
            {[['20+','Negocios escalados'],['15d','Tiempo promedio impl.'],['0','Ads necesarios']].map(([v,l]) => (
              <div key={l} className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-black text-[#BFFF00]">{v}</span>
                <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold">{l}</span>
              </div>
            ))}
          </div>

          <button onClick={() => goto('problema')} className="opacity-25 float-y"><ArrowDown size={26} className="mx-auto" /></button>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#BFFF00]/[0.04] border-y border-[#BFFF00]/10 py-3 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-0">
                {['IA Nativa','Agendamiento Autónomo','0 Ads','GEO Optimization','WhatsApp 24/7','Automatización Total','Make & Zapier','CRM Integrado','SEO Local','Chatbot Entrenado'].map(t => (
                  <span key={t} className="text-[11px] font-black uppercase tracking-[0.2em] text-[#BFFF00]/50 px-8 flex items-center gap-3">
                    <span className="w-1 h-1 bg-[#BFFF00]/40 rounded-full" />{t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TARGET AUDIENCE
      ════════════════════════════════════════════════════════════════════════ */}
      <div ref={rPr} className={`reveal-up ${vPr ? 'show' : ''}`}>
        <section className="py-20 md:py-32 bg-[#0e0e0e] border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#BFFF00]/4 to-transparent pointer-events-none" />
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
            <p className="text-[#BFFF00] text-[10px] font-black tracking-widest uppercase text-center mb-3">La Autoselección Consciente</p>
            <p className="text-zinc-400 text-sm md:text-base text-center max-w-lg mx-auto mb-12">¿Te identificas con alguno de estos perfiles? El diagnóstico gratuito de Veluz es exactamente lo que necesitas.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Users size={20} />, t: 'Dueños de Negocio', d: 'Cansados de ser el cuello de botella de su propia operación. El negocio depende de que ellos estén presentes para funcionar.' },
                { icon: <ShieldCheck size={20} />, t: 'Servicios High-Ticket', d: 'Clínicas, firmas o consultores que pierden ventas por falta de respuesta inmediata. Cada lead ignorado vale cientos de miles de pesos.' },
                { icon: <TrendingUp size={20} />, t: 'Negocios Escalables', d: 'Empresas que quieren crecer sin multiplicar su nómina. Escalan con tecnología, no con más empleados.' },
              ].map(({ icon, t, d }) => (
                <div key={t} className="p-8 md:p-10 rounded-2xl bg-zinc-900/60 border border-white/5 group card-lift cursor-default">
                  <div className="w-11 h-11 bg-[#BFFF00]/8 rounded-xl flex items-center justify-center text-[#BFFF00] mb-5 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(191,255,0,0.08)]">
                    {icon}
                  </div>
                  <h3 className="text-xl font-black uppercase text-white mb-3 group-hover:text-[#BFFF00] transition-colors">{t}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          EL PROBLEMA
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="problema" className="py-20 md:py-32 bg-white text-black overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
            <h2 className="text-3xl sm:text-4xl md:text-[78px] font-black tracking-tighter leading-none text-black max-w-2xl">
              Operar manual es<br />
              <span className="text-red-500 font-black uppercase">QUEMAR DINERO</span>
            </h2>
            <p className="text-zinc-600 text-base md:text-lg max-w-sm font-light leading-relaxed">
              Mientras tu equipo pierde tiempo en tareas repetitivas, tu competencia está automatizando — y captando tus clientes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-100 p-8 md:p-12 rounded-3xl border border-zinc-200 card-lift">
              <div className="flex items-center gap-4 mb-8">
                <AlertTriangle className="text-red-500 shrink-0" size={34} />
                <h4 className="text-2xl md:text-3xl font-black uppercase">Sin Veluz</h4>
              </div>
              <ul className="space-y-5">
                {['Procesos lentos y altamente dependientes de personas.','Leads que se enfrían mientras esperas responder.','Invisibilidad total ante Google y motores de IA.'].map(t => (
                  <li key={t} className="flex items-start gap-3 text-zinc-700 text-sm md:text-base font-medium">
                    <XCircle className="text-red-500 shrink-0 mt-0.5" size={20} />{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#BFFF00] text-black p-8 md:p-12 rounded-3xl border border-[#BFFF00]/20 card-lift shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <CheckCircle2 className="text-black shrink-0" size={34} />
                <h4 className="text-2xl md:text-3xl font-black uppercase">Efecto Veluz</h4>
              </div>
              <ul className="space-y-5">
                {['Operaciones autónomas 24/7 con agentes IA nativos.','Conversión automática de leads en menos de 30 segundos.','Crecimiento orgánico predecible basado en métricas reales.'].map(t => (
                  <li key={t} className="flex items-start gap-3 text-black text-sm md:text-base font-bold">
                    <CheckCircle className="text-black shrink-0 mt-0.5" size={20} />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MÉTODO VELUZ-3X
      ════════════════════════════════════════════════════════════════════════ */}
      <div ref={rMe} className={`reveal-up ${vMe ? 'show' : ''}`}>
        <section id="metodo" className="py-20 md:py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#BFFF00]/4 via-transparent to-transparent opacity-30 pointer-events-none" />
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-[#BFFF00] text-[10px] font-black tracking-widest uppercase block mb-4">Nuestra Ingeniería</span>
              <h2 className="text-4xl md:text-[80px] font-black tracking-tighter uppercase text-white">Método Veluz-3X</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: '01', t: 'Auditoría', d: 'Desnudamos tu negocio para encontrar las fugas de dinero y tiempo. No asumimos, medimos con datos.' },
                { n: '02', t: 'Diseño', d: 'Construimos la infraestructura digital a medida: IA, CRM, Funnels y Automatizaciones sincronizadas.' },
                { n: '03', t: 'Escalado', d: 'Encendemos la máquina. Optimizamos en tiempo real para maximizar el ROI de cada peso invertido.' },
              ].map(({ n, t, d }) => (
                <div key={n} className="relative p-10 md:p-12 bg-zinc-950 border border-white/5 rounded-3xl group card-lift hover:border-[#BFFF00]/20">
                  <div className="text-[#BFFF00] font-black text-7xl md:text-8xl opacity-[0.07] absolute top-4 right-7 transition-all group-hover:opacity-[0.18] group-hover:scale-110 select-none">{n}</div>
                  <h3 className="text-xl md:text-2xl font-black mb-5 text-white uppercase group-hover:text-[#BFFF00] transition-colors">{t}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SERVICIOS
      ════════════════════════════════════════════════════════════════════════ */}
      <div ref={rSe} className={`reveal-up ${vSe ? 'show' : ''}`}>
        <section id="servicios" className="py-20 md:py-32 bg-[#131313] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(191,255,0,0.025),transparent_40%)] pointer-events-none" />
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Acordeón */}
              <div>
                <h2 className="text-4xl md:text-[76px] font-black tracking-tighter uppercase mb-12 leading-none">
                  Lo que<br /><span className="serif text-[#BFFF00] font-normal">activamos.</span>
                </h2>
                <div className="space-y-5">
                  {services.map(s => (
                    <div key={s.id} className="border-b border-white/10 pb-5 cursor-pointer group" onClick={() => setOpenService(prev => prev === s.id ? null : s.id)}>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="bg-[#BFFF00]/8 text-[#BFFF00] px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-[#BFFF00]/10">{s.tag}</span>
                          <h4 className={`text-xl md:text-2xl font-black transition-colors ${openService === s.id ? 'text-[#BFFF00]' : 'text-white group-hover:text-[#BFFF00]'}`}>{s.title}</h4>
                        </div>
                        {openService === s.id ? <X size={18} className="text-[#BFFF00] shrink-0" /> : <Plus size={18} className="text-[#BFFF00] shrink-0" />}
                      </div>
                      <div className={`acc-content ${openService === s.id ? 'open' : ''}`}>
                        <div className="acc-inner space-y-5">
                          <p className="text-zinc-300 text-sm leading-relaxed">{s.desc}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {s.features.map(f => (
                              <div key={f} className="flex items-center gap-2 text-xs font-semibold text-zinc-300 bg-white/[0.025] border border-white/5 p-2 rounded-xl hover:border-[#BFFF00]/15 transition-all">
                                <CheckCircle2 size={13} className="text-[#BFFF00] shrink-0" />{f}
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/8 pt-5">
                            <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-2xl">
                              <p className="text-red-400 font-bold text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5"><XCircle size={11} /> Antes</p>
                              <p className="text-zinc-400 text-xs leading-relaxed">{s.before}</p>
                            </div>
                            <div className="bg-[#BFFF00]/4 border border-[#BFFF00]/10 p-4 rounded-2xl">
                              <p className="text-[#BFFF00] font-bold text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5"><CheckCircle2 size={11} /> Después</p>
                              <p className="text-zinc-300 text-xs leading-relaxed font-semibold">{s.after}</p>
                            </div>
                          </div>
                          <div className="bg-black/50 border border-white/8 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                              <p className="text-[#BFFF00] text-[9px] font-black uppercase tracking-widest mb-1">{s.label}</p>
                              <p className="text-3xl font-black text-white"><Stat val={s.metric} suffix={s.suffix} /></p>
                            </div>
                            <button onClick={e => { e.stopPropagation(); goto('inversion'); }} className="w-full sm:w-auto bg-[#BFFF00] text-black px-5 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform glow-btn text-center">
                              Ver costeo →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mockup sticky */}
              <div className="relative sticky top-28 bg-zinc-900/50 rounded-3xl border border-white/5 p-6 md:p-8 overflow-hidden shadow-[0_0_60px_rgba(191,255,0,0.02)]">
                <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#BFFF00]/5 blur-[90px] pointer-events-none" />
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BFFF00] blink" />
                    <span className="text-[10px] font-black tracking-widest text-[#BFFF00] uppercase">Sistema activo en tiempo real</span>
                  </div>
                  <span className="text-[9px] text-zinc-600 font-mono">VELUZ_3X v4</span>
                </div>
                <div className="transition-all duration-500">
                  {activeVis || (
                    <div className="flex flex-col items-center justify-center h-52 border border-dashed border-white/8 rounded-2xl bg-zinc-900/40 p-6">
                      <Sparkles className="text-[#BFFF00] blink mb-3" size={26} />
                      <p className="text-zinc-500 text-xs font-sans text-center">Selecciona un servicio a la izquierda para ver la simulación del sistema.</p>
                    </div>
                  )}
                </div>
                <div className="mt-8 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-3xl font-black text-white">+300%</span>
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Eficiencia operativa</span>
                  </div>
                  <p className="text-zinc-500 text-[11px] max-w-[260px] leading-relaxed">Incremento promedio tras los primeros 90 días de implementación.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          CASO DE ÉXITO — LMS Finance
      ════════════════════════════════════════════════════════════════════════ */}
      <div ref={rLm} className={`reveal-up ${vLm ? 'show' : ''}`}>
        <section id="caso-lms" className="py-20 md:py-32 bg-[#BFFF00] text-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-black/8 rounded-full blur-[140px] pointer-events-none" />
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[10px] font-black border border-black/20 px-4 py-2 rounded-full mb-8 inline-block uppercase tracking-widest">Caso de Éxito: LMS Finance</span>
                <h2 className="text-4xl md:text-[76px] font-black tracking-tighter leading-tight mb-8 uppercase">
                  De procesos rotos a una máquina de escala.
                </h2>
                <p className="text-xl md:text-2xl font-medium opacity-75 mb-12 font-serif italic">
                  "Veluz no solo instaló software, nos instaló una nueva mentalidad operativa. Hoy crecemos sin miedo al colapso."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg shrink-0">
                    <Users className="text-[#BFFF00]" size={22} />
                  </div>
                  <div>
                    <p className="font-black text-lg">Andrés G.</p>
                    <p className="text-[10px] font-black tracking-widest uppercase opacity-55">CEO — LMS Finance</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: 92, s: '%', l: 'Tiempo manual reducido' },
                  { v: 5, s: 'X', l: 'Facturación' },
                  { v: 0, s: '', l: 'Fugas de leads' },
                  { v: 30, s: 'D', l: 'Implantación' },
                ].map(({ v, s, l }, i) => (
                  <div key={l} className="bg-black text-[#BFFF00] p-6 md:p-8 rounded-2xl text-center flex flex-col justify-center border border-[#BFFF00]/15 hover:scale-105 transition-transform shadow-xl" style={{ transitionDelay: `${i * 80}ms` }}>
                    <span className="text-3xl md:text-5xl font-black mb-1.5"><Stat val={v} suffix={s} /></span>
                    <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase opacity-55">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════════════════════════ */}
      <div ref={rIn} className={`reveal-up ${vIn ? 'show' : ''}`}>
        <section id="inversion" className="py-20 md:py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(191,255,0,0.025),transparent_40%)] pointer-events-none" />
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-14">
              <span className="text-[#BFFF00] text-[10px] font-black tracking-widest uppercase block mb-4">Inversión Transparente</span>
              <h2 className="text-4xl md:text-[76px] font-black tracking-tighter mb-6 max-w-4xl mx-auto uppercase">
                Sin letra pequeña.<br />
                <span className="serif text-[#BFFF00] font-normal normal-case">El sitio es tuyo.</span><br />
                El bot trabaja mientras duermes.
              </h2>
              <div className="flex justify-center gap-3 flex-wrap mt-10">
                {[['all','Todos'],['marketing','Marketing'],['ia','Automatizaciones con IA']].map(([v,l]) => (
                  <button key={v} onClick={() => setPricingTab(v)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${pricingTab === v ? 'bg-[#BFFF00] text-black border-[#BFFF00] shadow-[0_0_22px_rgba(191,255,0,0.3)]' : 'bg-zinc-900 text-zinc-400 border-white/8 hover:text-white hover:border-[#BFFF00]/30'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
              {plans.filter(p => pricingTab === 'all' || p.type === pricingTab).map((p, i) => (
                <div key={p.id} className={`p-6 md:p-7 rounded-2xl bg-zinc-950 flex flex-col h-full card-lift transition-all border ${p.featured ? 'border-2 border-[#BFFF00] shadow-[0_0_35px_rgba(191,255,0,0.07)]' : 'border-white/5 hover:border-[#BFFF00]/18'}`}
                  style={{ transitionDelay: `${i * 50}ms` }}>
                  {p.featured && <div className="text-[9px] font-black uppercase tracking-widest text-black bg-[#BFFF00] px-3 py-1 rounded-full self-start mb-4">Más popular</div>}
                  <span className="text-[10px] font-black tracking-widest text-[#BFFF00] bg-[#BFFF00]/8 border border-[#BFFF00]/15 px-3 py-1.5 rounded-full uppercase mb-4 inline-block self-start">{p.cat}</span>
                  <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{p.title}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-5 font-light">{p.desc}</p>

                  <div className="bg-white/[0.03] border border-white/8 p-4 rounded-2xl mb-5 space-y-3">
                    <div>
                      <p className="text-[9px] font-black tracking-widest text-zinc-500 uppercase">{p.setupLabel}</p>
                      <span className="text-[#BFFF00] font-black text-xl block tracking-tight">{p.setup}</span>
                    </div>
                    <div className="border-t border-white/8 pt-3">
                      <p className="text-[9px] font-black tracking-widest text-zinc-500 uppercase">{p.recLabel}</p>
                      <span className="text-white font-bold text-xs block mt-0.5">{p.rec}</span>
                    </div>
                  </div>

                  <button onClick={() => setExpandedPlan(prev => ({...prev, [p.id]: !prev[p.id]}))}
                    className="w-full flex items-center justify-between py-2 text-xs font-semibold text-zinc-400 hover:text-[#BFFF00] transition-colors border-b border-white/5 pb-3 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Plus size={12} className={`text-[#BFFF00] transition-transform duration-300 ${expandedPlan[p.id] ? 'rotate-45' : ''}`} />
                      {expandedPlan[p.id] ? 'Ocultar detalles' : 'Ver entregables e impacto'}
                    </span>
                    <ChevronDown size={13} className={`text-zinc-500 transition-transform duration-300 ${expandedPlan[p.id] ? 'rotate-180 text-[#BFFF00]' : ''}`} />
                  </button>
                  <div className={`subtab ${expandedPlan[p.id] ? 'open' : ''}`}>
                    <div className="acc-inner space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {p.pills.map(pill => <span key={pill} className="text-[9px] font-black uppercase tracking-wider bg-white/[0.025] border border-white/5 text-zinc-300 px-2.5 py-1 rounded-lg">{pill}</span>)}
                      </div>
                      <div className="bg-[#BFFF00]/4 border-l-2 border-[#BFFF00] p-3.5 rounded-r-xl text-[10px] text-zinc-300 leading-relaxed italic">
                        "{p.pitch}"
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <button onClick={() => goto('agendar')}
                      className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all active:scale-95 ${p.featured ? 'bg-[#BFFF00] text-black glow-btn' : 'border border-[#BFFF00] text-[#BFFF00] hover:bg-[#BFFF00] hover:text-black'}`}>
                      Empezar Ahora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════════ */}
      <div ref={rFq} className={`reveal-up ${vFq ? 'show' : ''}`}>
        <section id="faq" className="py-20 md:py-32 bg-black border-t border-white/5 relative">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-black uppercase mb-3 text-white">Preguntas Frecuentes</h2>
              <p className="text-zinc-500 uppercase text-[10px] font-black tracking-widest">Todo lo que necesitas saber antes de empezar</p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/8 rounded-2xl overflow-hidden bg-white/[0.015] hover:border-[#BFFF00]/18 transition-colors">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none">
                    <span className={`font-bold text-sm md:text-base transition-colors ${openFaq === i ? 'text-[#BFFF00]' : 'text-white'}`}>{faq.q}</span>
                    <ChevronDown size={18} className={`${openFaq === i ? 'text-[#BFFF00] rotate-180' : 'text-zinc-600'} transition-transform duration-300 shrink-0`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed font-light">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          CALENDLY
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="agendar" className="py-20 md:py-40 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#BFFF00]/4 blur-[160px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 uppercase">¿Hablamos de<br /><span className="text-[#BFFF00]">negocios?</span></h2>
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/[0.04] px-4 py-2 rounded-full border border-white/8 mb-4">
              <span className="w-2 h-2 bg-[#BFFF00] rounded-full blink" />
              Llamada estratégica de 30 minutos · Sin costo · Sin compromiso
            </div>
            <p className="text-zinc-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">En 30 minutos identificamos si hay fit y diseñamos juntos el sistema que necesita tu negocio.</p>
          </div>
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden h-[600px] md:h-[780px] shadow-2xl border border-[#BFFF00]/15">
            <iframe
              src="https://calendly.com/veluz-agency/30min?hide_landing_page_details=1&primary_color=bfff00"
              width="100%" height="100%" frameBorder="0" title="Agendar con Veluz"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════════ */}
      <footer className="py-16 bg-black border-t border-white/5 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <img src={logo} alt="Veluz" className="h-10 opacity-50" />
          <div className="flex gap-8 md:gap-14 text-[10px] font-black tracking-[0.28em] uppercase opacity-35 flex-wrap justify-center">
            <a href="https://wa.me/573125923915" target="_blank" rel="noopener noreferrer" className="hover:text-[#BFFF00] hover:opacity-100 transition-all">WhatsApp</a>
            <a href="#" className="hover:text-[#BFFF00] hover:opacity-100 transition-all">Aviso Legal</a>
            <span className="hidden md:inline">© 2026 Veluz Agency</span>
          </div>
          <span className="md:hidden text-[9px] font-bold opacity-20 uppercase tracking-widest">© 2026 Veluz Agency</span>
        </div>
      </footer>

      {/* ── FLOATING CTA (mobile) ─────────────────────────────────────────── */}
      {showFloat && (
        <div className="fixed bottom-5 right-5 z-[100] md:hidden">
          <button onClick={() => goto('agendar')}
            className="bg-[#BFFF00] text-black p-4 rounded-full shadow-2xl glow-btn active:scale-90 transition-transform flex items-center justify-center border-4 border-black">
            <Calendar size={26} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
