import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Zap, 
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Calendar,
  Monitor,
  BrainCircuit,
  Megaphone,
  AlertTriangle,
  Star,
  Menu,
  X,
  Plus, // Añadido para los acordeones
  Target,
  Rocket,
  ShieldCheck,
  Search,
  Users,
  TrendingUp,
  CheckCircle,
  Layers,
  ArrowDown,
  XCircle,
  LineChart,
  Palette,
  Building2,
  Activity,
  Briefcase,
  AlertCircle
} from 'lucide-react';

// Hook para animar números (Success Metrics)
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return [count, elementRef];
};

// Hook para animaciones suaves de entrada al scroll
const useScrollReveal = () => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return [elementRef, isVisible];
};

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openService, setOpenService] = useState('ia');
  const [openFaq, setOpenFaq] = useState(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [pricingTab, setPricingTab] = useState('all'); // 'all', 'one-time', 'recurring'
  const heroRef = useRef(null);

  // URLs de logos corregidas
  const logoUrl = "https://res.cloudinary.com/dfj0ckm10/image/upload/q_auto/f_auto/v1778462963/ChatGPT_Image_May_10_2026_08_28_28_PM_mqoqmv.png";
  const faviconUrl = "https://res.cloudinary.com/dfj0ckm10/image/upload/q_auto/f_auto/v1778464000/ChatGPT_Image_May_10_2026_08_45_58_PM_fo32bz.png";

  useEffect(() => {
    document.title = "Veluz Agency | Expertos en Escalamiento con IA";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconUrl;
  }, []);

  const services = [
    {
      id: 'ia',
      tag: "INTELIGENCIA",
      title: "Agentes IA Nativa",
      icon: <BrainCircuit size={24} />,
      desc: "Entrenamos cerebros digitales con el conocimiento de tu empresa. No son simples bots; son vendedores que razonan.",
      features: ["Venta por WhatsApp 24/7", "Calificación de Leads", "Agendamiento Autónomo"],
      result: "Autonomía Total",
      graph: "99",
      suffix: "%",
      visualUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6bbfJ8zlz9-dUT_FpXAE8caXm4vT4V16gkXt8yCDpAUi95M1pOui3QoKHSCz63CXQFVTOSelOcsQUY4GPggC4QntrAwBc7ZPA4vFBp830tKMTyt2Dgy1BqFm3zNSo6zJZhQnqxxrKX6SSOLm_-VOLqAbFEF1owKAN1Wcmluh8YolC1QE1eBkltzI4xL92IRWFhUzuMcclqIZ8SKCs7i7GLpRY0Czo3FFWsNKvtUfiDhbyXa4C5jN_kf8QTkR5UHdv-w0hs_Y9fCo9"
    },
    {
      id: 'content',
      tag: "VISIBILIDAD",
      title: "Contenido Orgánico & GEO",
      icon: <Megaphone size={24} />,
      desc: "Construimos autoridad real sin gastar en anuncios. Creamos contenido que los motores de búsqueda tradicionales y las IAs como ChatGPT y Gemini aman citar. Tu negocio aparece cuando buscan lo que ofreces.",
      features: ["SEO & GEO Premium", "Autoridad de Marca", "Estrategia de Viralidad"],
      result: "Alcance",
      graph: "10",
      suffix: "X",
      visualUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjYGNSH9-6iuSjhNAIG5D_-s7PL5j-kpcw3NuJUjip4BResRBnouB_yeNyzb4wG3tb0EeEHX97S0-7dU81_Nf30ZD3w6ijJ_P1lzvPyez7m3Sh37J36Gxsbfsuax6oReqrfbBNC7yFoFbcAYdPioh4zdxa1fkVhaUoZ9ZMNa9CFirOk8sXLNYY1D_vbo-S1MiTpf624029lAJJA3uSIHHbmde2x0ligvE951l1RhlQ_rXd-rY0y8YtZO_foizoFvLcgndxvA8QOwuo"
    },
    {
      id: 'auto',
      tag: "EFICIENCIA",
      title: "Automatización de Procesos",
      icon: <Zap size={24} />,
      desc: "Conectamos tu CRM, pagos y administración para eliminar tareas manuales repetitivas. Si tu equipo lo hace a mano todos los días, nosotros lo convertimos en código que corre solo.",
      features: ["Flujos con Make/Zapier", "Dashboard en tiempo real", "Sincronización total"],
      result: "Tiempo ahorrado",
      graph: "15",
      suffix: "h/s",
      visualUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJctiDRFrXf5px-JVKkYWVMyNpJAcummv6sKwaRXosHo9XqFKLD3LgK8P29HSk2cW_pGnzeJWcvLnOfqhBDhF-kmGJC8y_2wqVbL5rbY3Kb1gbJOJIGx_eGT1W8iiBrLS-KZ-NwPpPHHDIJS0SpptMZJwHt8TzByxIRn9Gd5-bWfxNuLpZo2pE9gfPDlAGgFYoQjKWFFtR9XRV0lCjSNdTbmvjRJFsUv7tnb2fb8vZB8OmjJjZZx3Zrk9SwvRnAfIsKnSPwd-T46J2"
    }
  ];

  const targetAudience = [
    { title: "Dueños de Negocio", desc: "Cansados de ser el 'cuello de botella' de su propia operación diaria. El negocio depende de que ellos estén presentes para funcionar.", icon: <Users size={20}/> },
    { title: "Servicios High-Ticket", desc: "Clínicas, firmas o consultores que pierden ventas por falta de respuesta inmediata. Cada lead ignorado vale cientos de miles de pesos.", icon: <ShieldCheck size={20}/> },
    { title: "Negocios Escalables", desc: "Empresas que quieren crecer sin multiplicar su nómina. Escalan con tecnología, no con más empleados.", icon: <TrendingUp size={20}/> }
  ];

  const faqs = [
    { q: "¿Tengo que pagar anuncios (Ads)?", a: "No. Nuestro enfoque es 100% orgánico. Construimos infraestructura que genera autoridad y atrae clientes sin depender de pauta pagada." },
    { q: "¿Cuánto tarda la implementación?", a: "Un sistema de IA o automatización estándar tarda entre 10 y 15 días en estar totalmente operativo y entrenado." },
    { q: "¿Necesito conocimientos técnicos?", a: "Cero. Nosotros nos encargamos de toda la arquitectura técnica. Tú solo recibes los leads calificados en tu WhatsApp o CRM." },
    { q: "¿Cómo sé que funcionará para mí?", a: "Por eso ofrecemos un diagnóstico gratuito. Solo aceptamos clientes donde la tecnología pueda generar un ROI claro en los primeros 60 días." }
  ];

  const pricingPlans = [
    {
      id: 'web-profesional',
      type: 'one-time',
      category: 'Activo digital',
      title: "Página Web Profesional",
      desc: "Landing page de alta conversión, optimizada para móvil, con botón de WhatsApp y conectada a Google Maps. El sitio le pertenece al cliente para siempre.",
      setupPrice: "$500.000 – $600.000 COP",
      setupLabel: "Pago único · El sitio es tuyo",
      recurringPrice: "~$50.000 COP / año",
      recurringLabel: "Solo renovación de dominio (lo paga el cliente directo)",
      pills: ["Diseño a medida", "Mobile first", "Botón WhatsApp", "Entrega 7 días", "Google Maps"],
      pitch: "Pagas una vez y el sitio es tuyo. El único costo futuro es el dominio, unos $50.000 al año — eso lo pagan directamente a GoDaddy o Namecheap, nosotros no tocamos ese dinero."
    },
    {
      id: 'chatbot-ia',
      type: 'recurring',
      category: 'Servicio activo',
      title: "Chatbot WhatsApp con IA",
      desc: "Agente inteligente entrenado con el conocimiento de tu negocio. Responde, califica y agenda solo 24/7 sin que muevas un dedo.",
      setupPrice: "$650.000 COP",
      setupLabel: "Setup, instalación y entrenamiento",
      recurringPrice: "$100.000 COP / mes",
      recurringLabel: "Operación, actualizaciones y soporte continuo",
      pills: ["Respuesta < 30s", "Catálogo automático", "Calificación leads", "Agendamiento solo", "Reporte mensual"],
      pitch: "Los $100.000 mensuales cubren los servidores y APIs que mantienen el bot activo. Es como la luz — el negocio funciona mientras se pague. Si se cancela, el bot se apaga. Pero si el bot les trae 2 clientes extras al mes, ya se pagó solo."
    },
    {
      id: 'presencia-digital',
      type: 'recurring',
      category: 'Pack completo',
      title: "Pack Presencia Digital",
      desc: "Web profesional o rediseño completo + Google Maps optimizado + 1 red social gestionada + 5 piezas de contenido orgánico mensual.",
      setupPrice: "$1.000.000 COP",
      setupLabel: "Setup completo · Mes 1",
      recurringPrice: "$50.000 – $100.000 COP / mes",
      recurringLabel: "Solo gestión de contenido (a convenir según volumen)",
      pills: ["Web o rediseño", "Google Maps #1", "1 red gestionada", "5 piezas contenido/mes", "SEO local", "Dashboard"],
      pitch: "El paquete definitivo para delegar tu visibilidad local de manera predecible. Construimos y mantenemos tu flujo constante de clientes sin depender de anuncios caros."
    },
    {
      id: 'automatizaciones-custom',
      type: 'one-time',
      category: 'Sistemas a medida',
      title: "Automatizaciones de Procesos",
      desc: "Conexión integral de tus aplicaciones. Integramos CRM, pasarelas de pago, bases de datos y correos para eliminar tareas repetitivas.",
      setupPrice: "Desde $800.000 COP",
      setupLabel: "Según complejidad del flujo técnico",
      recurringPrice: "Sin costo mensual obligatorio",
      recurringLabel: "Soporte & Mantenimiento",
      pills: ["Webhooks & APIs", "Flujos con Make/Zapier", "Conexión CRM", "Alertas en vivo", "Cero error humano"],
      pitch: "Diseñado para empresas con procesos complejos que quieren reducir sus costos operativos al instante. Pagas por la infraestructura instalada una sola vez."
    }
  ];

  // --- THEME OBSERVER PARA DETECTAR EL COLOR DE SECCIÓN ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionTheme = entry.target.getAttribute('data-theme');
          if (sectionTheme) setTheme(sectionTheme);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-theme]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Manejo de scroll para Navbar y visibilidad de componentes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 20);
      setShowFloatingBtn(scrollPos > 800);
      if (heroRef.current && window.innerWidth > 768) {
        heroRef.current.style.transform = `translateY(${scrollPos * 0.1}px)`;
        heroRef.current.style.opacity = 1 - scrollPos / 1000;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if(element) {
        const offset = window.innerWidth < 768 ? 80 : 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const StatCounter = ({ value, suffix = "" }) => {
    const [count, ref] = useCountUp(value);
    return <span ref={ref}>{count}{suffix}</span>;
  };

  // Referencias para las animaciones del scroll
  const [revealPr, isVisiblePr] = useScrollReveal();
  const [revealMe, isVisibleMe] = useScrollReveal();
  const [revealSe, isVisibleSe] = useScrollReveal();
  const [revealLm, isVisibleLm] = useScrollReveal();
  const [revealIn, isVisibleIn] = useScrollReveal();
  const [revealFq, isVisibleFq] = useScrollReveal();

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out font-sans ${theme === 'dark' ? 'bg-[#131313] text-[#e5e2e1]' : 'bg-white text-black'}`}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Literata:ital,wght@1,400;1,700&display=swap');
        body { font-family: 'Outfit', sans-serif; overflow-x: hidden; }
        .instrument-serif { font-family: 'Literata', serif; font-style: italic; }
        
        /* Bug 1 Solucionado: btn-glow y shadow-lima-glow ahora definidos correctamente */
        .btn-glow { box-shadow: 0 10px 40px -10px rgba(191, 255, 0, 0.4); }
        .shadow-lima-glow { box-shadow: 0 10px 40px -10px rgba(191, 255, 0, 0.4); }
        .hover-lima-glow:hover { box-shadow: 0 15px 50px -5px rgba(191, 255, 0, 0.6); transform: translateY(-4px); }
        
        .glass-nav { backdrop-filter: blur(10px); background: rgba(19, 19, 19, 0.85); transition: all 0.3s ease; }
        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(191, 255, 0, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(191, 255, 0, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(191, 255, 0, 0); }
        }
        
        @keyframes bounce-subtle { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(10px); } 
        }
        .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }

        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
        .card-hover-effect { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .card-hover-effect:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -15px rgba(191, 255, 0, 0.25);
            border-color: rgba(191, 255, 0, 0.4);
        }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .accordion-content {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
            opacity: 0;
        }
        .accordion-content.active {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: 1rem;
        }
        .accordion-inner { overflow: hidden; }

        /* Estilo Premium de Noise + Glow en el fondo del Hero */
        .hero-noise { 
          background: #000; 
          position: relative; 
          overflow: hidden;
        }
        .hero-noise::before { 
          content: ''; 
          position: absolute; 
          inset: 0; 
          opacity: 0.18; 
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); 
          pointer-events: none; 
          z-index: 1; 
        }
      `}</style>

      {/* 1. TOP BAR / URGENCY BAR */}
      {showTopBar && (
        <div className="fixed top-0 w-full bg-[#BFFF00] text-black z-[100] py-2 px-6 flex items-center justify-between shadow-md" id="urgency-bar">
          <div className="flex-1 text-center text-[10px] md:text-[11px] font-black tracking-widest uppercase flex items-center justify-center gap-2">
            <AlertCircle size={14} className="animate-pulse" />
            Cupos limitados — Mayo casi completo — <span onClick={() => scrollToSection('agendar')} className="underline cursor-pointer font-bold">[Reservar Ahora]</span>
          </div>
          <button onClick={() => setShowTopBar(false)} className="p-1 hover:bg-black/10 rounded-full transition-colors">
            <X size={14} />
          </button>
        </div>
      )}

      {/* 2. NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'top-0 py-2' : `${showTopBar ? 'top-10' : 'top-4'} py-3`} glass-nav border-b border-white/10`} id="main-nav">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src={logoUrl} alt="Veluz Logo" className="h-16 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
             <button onClick={() => scrollToSection('problema')} className="text-[12px] font-black uppercase tracking-widest text-[#c3caac] hover:text-[#BFFF00] transition-colors">El Problema</button>
             <button onClick={() => scrollToSection('metodo')} className="text-[12px] font-black uppercase tracking-widest text-[#c3caac] hover:text-[#BFFF00] transition-colors">Método</button>
             <button onClick={() => scrollToSection('servicios')} className="text-[12px] font-black uppercase tracking-widest text-[#c3caac] hover:text-[#BFFF00] transition-colors">Servicios</button>
             <button onClick={() => scrollToSection('inversion')} className="text-[12px] font-black uppercase tracking-widest text-[#c3caac] hover:text-[#BFFF00] transition-colors">Inversión</button>
             <button onClick={() => scrollToSection('faq')} className="text-[12px] font-black uppercase tracking-widest text-[#c3caac] hover:text-[#BFFF00] transition-colors">Dudas</button>
          </div>

          <button onClick={() => scrollToSection('agendar')} className="bg-[#BFFF00] text-black px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest btn-glow hover-lima-glow active:scale-95 transition-all">
            Diagnóstico
          </button>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-[#BFFF00] p-2"><Menu size={28} /></button>
        </div>
      </nav>

      {/* 3. MOBILE MENU */}
      <div className={`fixed inset-0 z-[110] bg-black transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <img src={logoUrl} alt="Veluz" className="h-12" />
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full text-[#BFFF00]"><X size={24} /></button>
          </div>
          <div className="flex flex-col gap-10">
            {['Problema', 'Método', 'Servicios', 'Inversión', 'FAQ', 'Agendar'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item === 'Inversión' ? 'inversion' : item.toLowerCase())} className="text-5xl font-black text-left uppercase tracking-tighter hover:text-[#BFFF00]">{item}</button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. HERO SECTION REPLICANDO EL ESTILO DE SCREENSHOT 10.55.54 AM (CON NOISE & GLOW DEL CANVAS) */}
      <section className="reveal active relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 overflow-hidden hero-noise" ref={heroRef}>
        {/* Efecto visual de fondo Noise + Glow de alta fidelidad */}
        <div className="absolute inset-0 z-0">
          {/* Glow central premium */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[250px] sm:h-[350px] bg-[radial-gradient(ellipse,rgba(191,255,0,0.14)_0%,rgba(191,255,0,0.03)_50%,transparent_70%)] blur-2xl" />
          {/* Línea de luz inferior muy sutil */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(191,255,0,0.3)] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl">
          {/* Badge superior estilizado y minimalista */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900/80 border border-white/5 mb-10 shadow-lg">
            <div className="flex gap-0.5 text-[#BFFF00]">
              <Star size={10} fill="currentColor" stroke="none" />
              <Star size={10} fill="currentColor" stroke="none" />
              <Star size={10} fill="currentColor" stroke="none" />
            </div>
            <span className="text-[10px] md:text-[11px] font-black tracking-[0.25em] uppercase text-white/80">
              ARQUITECTURA DE CRECIMIENTO ORGÁNICO
            </span>
          </div>
          
          {/* Titular exactamente con el contraste de tipografía moderno */}
          <h1 className="text-[52px] md:text-[96px] font-black tracking-tighter leading-[1.0] text-white uppercase mb-8">
            DIGITALIZAMOS TU <br />
            <span className="instrument-serif text-[#BFFF00] capitalize font-normal italic">negocio con IA.</span>
          </h1>

          {/* Subtexto descriptivo optimizado */}
          <p className="text-lg md:text-2xl text-[#e5e2e1] max-w-3xl mx-auto mb-12 font-light leading-relaxed px-4 opacity-90">
            Convertimos operaciones manuales en <span className="instrument-serif text-[#BFFF00] text-[1.15em] font-normal italic">máquinas de eficiencia</span> que cierran ventas sin que estés presente.
          </p>

          {/* Botones de acción mejorados */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl px-4 mx-auto">
            <button 
              onClick={() => scrollToSection('agendar')} 
              className="w-full sm:w-auto bg-[#BFFF00] text-black px-10 py-5 rounded-full font-black text-base flex items-center justify-center gap-3 btn-glow hover-lima-glow transition-all active:scale-95 shadow-lg shadow-[#BFFF00]/10"
            >
              <Calendar size={20} /> Agenda tu cita
            </button>
            
            <a 
              href="https://wa.me/573125923915?text=Hola%20Veluz,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20digitalizaci%C3%B3n%20e%20IA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#075E54] hover:bg-[#128C7E] text-white px-10 py-5 rounded-full font-black text-base flex items-center justify-center gap-3 transition-colors active:scale-95 shadow-lg"
            >
              <MessageCircleIcon /> Hablar por WhatsApp
            </a>
          </div>

          <div className="mt-16 opacity-30 animate-bounce-subtle cursor-pointer" onClick={() => scrollToSection('problema')}>
            <ArrowDown size={32} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* 5. TARGET AUDIENCE / FOR WHO */}
      {/* Bug 2 Solucionado: Reemplazado max-[1440px] por max-w-[1440px] para evitar desbordamiento */}
      <section ref={revealPr} className={`reveal py-20 md:py-32 bg-[#0e0e0e] border-y border-white/5 ${isVisiblePr ? 'active' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-[#BFFF00] text-xs font-black tracking-widest uppercase text-center mb-4">La Autoselección Consciente</p>
          <p className="text-zinc-400 text-sm md:text-base text-center max-w-xl mx-auto mb-12">Si te identificas con alguno de estos perfiles, el diagnóstico gratuito de Veluz es exactamente lo que necesitas hoy.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetAudience.map((item, i) => (
              <div key={i} className="p-12 rounded-2xl bg-zinc-900 border border-white/5 group card-hover-effect">
                <div className="w-12 h-12 bg-[#BFFF00]/10 rounded-xl flex items-center justify-center text-[#BFFF00] mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black uppercase text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EL PROBLEMA (Fondo Blanco de Alto Impacto / Neuromarketing) */}
      <section id="problema" className="py-20 md:py-32 bg-white text-black overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="reveal active flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl md:text-[80px] font-black tracking-tighter leading-tight text-black max-w-2xl">
              Operar manual es <br />
              <span className="text-red-500 font-black uppercase inline-block hover:scale-105 transition-transform duration-300">QUEMAR DINERO</span>
            </h2>
            <p className="text-zinc-600 text-lg max-w-sm mb-4 font-light leading-relaxed">
              Mientras tú pierdes tiempo en tareas repetitivas y manuales, tu competencia está automatizando con nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal active bg-zinc-100 p-12 rounded-3xl border border-zinc-200 card-hover-effect">
              <div className="flex items-center gap-4 mb-8">
                <AlertTriangle className="text-red-600" size={40} />
                <h4 className="text-2xl md:text-3xl font-black uppercase">Sin Veluz</h4>
              </div>
              <ul className="space-y-6">
                {[
                  "Procesos lentos y altamente dependientes de humanos.",
                  "Errores constantes y demoras críticas en la gestión de leads.",
                  "Invisibilidad total ante búsquedas en Google y motores de IA."
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-zinc-700 text-base font-medium group">
                    <XCircle className="text-red-600 shrink-0 transition-transform group-hover:scale-125" size={24} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal active bg-[#BFFF00] text-black p-12 rounded-3xl shadow-xl border border-[#BFFF00]/20 card-hover-effect">
              <div className="flex items-center gap-4 mb-8">
                <CheckCircle2 className="text-black" size={40} />
                <h4 className="text-2xl md:text-3xl font-black uppercase">Efecto Veluz</h4>
              </div>
              <ul className="space-y-6">
                {[
                  "Operaciones autónomas 24/7 impulsadas por agentes IA nativos.",
                  "Conversión automática de leads calificados en menos de 30 segundos.",
                  "Crecimiento orgánico predecible basado en métricas reales de negocio."
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-black text-base font-bold group">
                    <CheckCircle className="text-black shrink-0 transition-transform group-hover:scale-125" size={24} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. METODO VELUZ-3X */}
      <section id="metodo" ref={revealMe} className={`reveal py-20 md:py-32 bg-black z-10 relative overflow-hidden ${isVisibleMe ? 'active' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6 relative">
          <div className="text-center mb-24">
            <span className="text-[#BFFF00] text-xs font-black tracking-widest uppercase block mb-4">Nuestra Ingeniería</span>
            <h2 className="text-4xl md:text-[80px] font-black tracking-tighter uppercase text-white">Método Veluz-3X</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {[
              { step: "01", title: "Auditoría", desc: "Desnudamos tu negocio para encontrar las fugas de dinero y tiempo. No asumimos, medimos." },
              { step: "02", title: "Diseño", desc: "Construimos la infraestructura digital a medida: CRM, IA, Funnels y Automatizaciones." },
              { step: "03", title: "Escalado", desc: "Encendemos la máquina. Optimizamos en tiempo real para maximizar el ROI de cada peso invertido." }
            ].map((m, i) => (
              <div key={i} className="relative p-12 bg-zinc-950 border border-white/5 rounded-3xl h-full card-hover-effect group">
                <div className="text-[#BFFF00] font-black text-8xl opacity-10 absolute top-4 right-8 transition-all group-hover:opacity-25 group-hover:scale-110">{m.step}</div>
                <h3 className="text-2xl font-black mb-6 text-white uppercase">{m.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SERVICIOS (Acordeón Animado y Enriquecido) */}
      <section id="servicios" ref={revealSe} className={`reveal py-20 md:py-32 bg-[#131313] z-10 ${isVisibleSe ? 'active' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-[80px] font-black tracking-tighter uppercase mb-12">Lo que <br /><span className="instrument-serif text-[#BFFF00]">activamos.</span></h2>
              <div className="space-y-6">
                {services.map((s, idx) => (
                  <div key={s.id} className="border-b border-white/10 pb-6 group cursor-pointer" onClick={() => setOpenService(s.id)}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="bg-[#BFFF00]/10 text-[#BFFF00] px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">{s.tag}</span>
                        <h4 className={`text-xl md:text-2xl font-black transition-colors ${openService === s.id ? 'text-[#BFFF00]' : 'text-white group-hover:text-[#BFFF00]'}`}>{s.title}</h4>
                      </div>
                      
                      {/* Bug 3 Solucionado: Removido el wrapper span .material-symbols-outlined para un renderizado nativo y limpio */}
                      {openService === s.id ? (
                        <X size={20} className="text-[#BFFF00] shrink-0" />
                      ) : (
                        <Plus size={20} className="text-[#BFFF00] shrink-0" />
                      )}
                    </div>
                    
                    <div className={`accordion-content ${openService === s.id ? 'active' : ''}`}>
                      <div className="accordion-inner">
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                        
                        <div className="space-y-3 mb-6">
                          {s.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-300">
                              <CheckCircle2 size={14} className="text-[#BFFF00]" />
                              {f}
                            </div>
                          ))}
                        </div>

                        <img alt={s.title} className="w-full h-48 object-cover rounded-xl border border-white/10 transition-transform hover:scale-[1.02] duration-500" src={s.visualUrl} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full aspect-square bg-zinc-900 rounded-3xl border border-white/5 flex flex-col items-center justify-center p-12 text-center group overflow-hidden relative">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#BFFF00]/10 blur-[100px] transition-all group-hover:bg-[#BFFF00]/20"></div>
                <LineChart className="text-[#BFFF00] w-24 h-24 mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                <h5 className="text-5xl font-black mb-4">+300%</h5>
                <p className="text-slate-400 text-base leading-relaxed">Incremento promedio en eficiencia operativa reportado por nuestros clientes tras los primeros 90 días de implementación de activos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CASE STUDY LMS FINANCE */}
      <section id="caso-lms" ref={revealLm} className={`reveal py-20 md:py-32 bg-[#BFFF00] text-black overflow-hidden ${isVisibleLm ? 'active' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] font-black border border-black/20 px-4 py-2 rounded-full mb-8 inline-block uppercase tracking-widest">Caso de Éxito: LMS Finance</span>
              <h2 className="text-4xl md:text-[80px] font-black tracking-tighter leading-tight mb-8">De procesos rotos a una máquina de escala.</h2>
              <p className="text-lg md:text-xl font-medium opacity-80 mb-12 italic font-serif">"Veluz no solo instaló software, nos instaló una nueva mentalidad operativa. Hoy crecemos sin miedo al colapso."</p>
              <div className="flex items-center gap-4 group">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                  <Users className="text-[#BFFF00]" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">Andrés G.</p>
                  <p className="text-[10px] font-black tracking-widest uppercase opacity-60">CEO - LMS Finance</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black text-[#BFFF00] p-8 rounded-2xl text-center flex flex-col justify-center border border-[#BFFF00]/20 hover:scale-105 transition-transform duration-300">
                <span className="text-4xl md:text-6xl font-black mb-2"><StatCounter value={92} suffix="%" /></span>
                <span className="text-[10px] font-black tracking-widest uppercase">TIEMPO MANUAL</span>
              </div>
              <div className="bg-black text-[#BFFF00] p-8 rounded-2xl text-center flex flex-col justify-center border border-[#BFFF00]/20 hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '0.1s' }}>
                <span className="text-4xl md:text-6xl font-black mb-2"><StatCounter value={5} suffix="X" /></span>
                <span className="text-[10px] font-black tracking-widest uppercase">FACTURACIÓN</span>
              </div>
              <div className="bg-black text-[#BFFF00] p-8 rounded-2xl text-center flex flex-col justify-center border border-[#BFFF00]/20 hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '0.2s' }}>
                <span className="text-4xl md:text-6xl font-black mb-2"><StatCounter value={0} /></span>
                <span className="text-[10px] font-black tracking-widest uppercase">FUGAS DE LEADS</span>
              </div>
              <div className="bg-black text-[#BFFF00] p-8 rounded-2xl text-center flex flex-col justify-center border border-[#BFFF00]/20 hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '0.3s' }}>
                <span className="text-4xl md:text-6xl font-black mb-2"><StatCounter value={30} suffix="D" /></span>
                <span className="text-[10px] font-black tracking-widest uppercase">IMPLANTACIÓN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PRICING SECTION */}
      <section id="inversion" ref={revealIn} className={`reveal py-20 md:py-32 bg-black overflow-hidden ${isVisibleIn ? 'active' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#BFFF00] text-xs font-black tracking-widest uppercase block mb-4">Inversión Transparente</span>
            <h2 className="text-4xl md:text-[80px] font-black tracking-tighter mb-6 max-w-4xl mx-auto">
              Sin letra pequeña. <br />
              <span className="text-[#BFFF00] italic font-serif normal-case">El sitio es tuyo.</span> <br />
              El bot trabaja mientras duermes.
            </h2>
            <div className="flex justify-center gap-4 flex-wrap mt-10">
              <button 
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${pricingTab === 'all' ? 'bg-[#BFFF00] text-black border-[#BFFF00]' : 'bg-zinc-900 text-slate-400 border-white/10 hover:text-white'}`} 
                onClick={() => setPricingTab('all')}
              >
                Todos
              </button>
              <button 
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${pricingTab === 'one-time' ? 'bg-[#BFFF00] text-black border-[#BFFF00]' : 'bg-zinc-900 text-slate-400 border-white/10 hover:text-white'}`} 
                onClick={() => setPricingTab('one-time')}
              >
                Activos (Pago único)
              </button>
              <button 
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${pricingTab === 'recurring' ? 'bg-[#BFFF00] text-black border-[#BFFF00]' : 'bg-zinc-900 text-slate-400 border-white/10 hover:text-white'}`} 
                onClick={() => setPricingTab('recurring')}
              >
                Con soporte mensual
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 transition-all duration-500">
            {pricingPlans
              .filter(plan => pricingTab === 'all' || plan.type === pricingTab)
              .map((plan, idx) => (
                <div 
                  key={plan.id} 
                  className={`p-10 rounded-2xl bg-zinc-950 border pricing-card flex flex-col justify-between h-full card-hover-effect ${plan.id === 'presencia-digital' ? 'border-2 border-[#BFFF00]' : 'border-white/5'}`}
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-[#BFFF00] bg-[#BFFF00]/10 border border-[#BFFF00]/20 px-3 py-1.5 rounded-full uppercase mb-6 inline-block">
                      {plan.category}
                    </span>
                    <h4 className="text-2xl font-black text-white mb-2 uppercase">{plan.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mb-8">{plan.desc}</p>
                    
                    <div className="mb-8">
                      <p className="text-[9px] font-black tracking-widest text-slate-500 uppercase">{plan.setupLabel}</p>
                      <span className="text-[#BFFF00] font-black text-3xl block">{plan.setupPrice}</span>
                      
                      <div className="border-t border-white/10 pt-4 mt-4">
                        <p className="text-[9px] font-black tracking-widest text-slate-500 uppercase">
                          {plan.id === 'automatizaciones-custom' ? 'Sin costo mensual obligatorio' : plan.recurringLabel}
                        </p>
                        <span className="text-white font-bold text-sm block mt-1">
                          {plan.id === 'automatizaciones-custom' ? 'Mantenimiento preventivo incluido' : plan.recurringPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {plan.pills.map((pill, i) => (
                        <span key={i} className="text-[9px] font-black uppercase tracking-widest bg-white/[0.03] border border-white/5 text-slate-300 px-2.5 py-1 rounded-lg">
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="bg-[#BFFF00]/5 border-l-2 border-[#BFFF00] p-4 rounded-r-xl mb-6 text-[11px] text-slate-300 leading-relaxed italic">
                      "{plan.pitch}"
                    </div>
                    <button 
                      onClick={() => scrollToSection('agendar')}
                      className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all active:scale-95 ${plan.id === 'presencia-digital' ? 'bg-[#BFFF00] text-black btn-glow hover-lima-glow' : 'border border-[#BFFF00] text-[#BFFF00] hover:bg-[#BFFF00] hover:text-black'}`}
                    >
                      Empezar Ahora
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section id="faq" ref={revealFq} className={`reveal py-20 md:py-32 bg-black z-10 border-t border-white/5 ${isVisibleFq ? 'active' : ''}`}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase mb-4 text-white">Preguntas Frecuentes</h2>
            <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest">Todo lo que necesitas saber antes de empezar</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center group focus:outline-none"
                >
                  <span className={`font-bold transition-colors ${openFaq === i ? 'text-[#BFFF00]' : 'text-white'}`}>{faq.q}</span>
                  <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className={openFaq === i ? 'text-[#BFFF00]' : 'text-slate-600'} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="p-6 pt-0 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. AGENDAR CALENDLY */}
      <section id="agendar" className="py-20 md:py-40 bg-black z-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#BFFF00]/5 blur-[150px] pointer-events-none rounded-full"></div>
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 uppercase">¿Hablamos de <br /><span className="text-[#BFFF00]">negocios?</span></h2>
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-[#BFFF00] rounded-full animate-pulse"></div>
              Llamada de 15 Minutos
            </div>
          </div>
          <div className="bg-white rounded-[3rem] overflow-hidden h-[600px] md:h-[800px] shadow-2xl border border-[#BFFF00]/20">
            <iframe 
              src="https://calendly.com/veluz-agency/15min?hide_landing_page_details=1&primary_color=bfff00" 
              width="100%" height="100%" frameBorder="0" title="Calendly"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-black border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <img src={logoUrl} alt="Veluz" className="h-14 opacity-60" />
          <div className="flex gap-8 md:gap-16 text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
            <a href="https://wa.me/573125923915" target="_blank" className="hover:text-[#BFFF00] transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-[#BFFF00] transition-colors">Aviso Legal</a>
            <span className="hidden md:inline">© 2026 Veluz Agency</span>
          </div>
          <span className="md:hidden text-[9px] font-bold opacity-20 uppercase tracking-widest">© 2026 Veluz Agency</span>
        </div>
      </footer>

      {/* FLOATING ACTION */}
      {showFloatingBtn && (
        <div className="fixed bottom-6 right-6 z-[100] md:hidden">
          <button 
            onClick={() => scrollToSection('agendar')}
            className="bg-[#BFFF00] text-black p-5 rounded-full shadow-2xl active:scale-90 transition-transform flex items-center justify-center border-4 border-black"
          >
            <Calendar size={28} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
}

// Icono de WhatsApp nativo inline SVG
function MessageCircleIcon() {
  return (
    <svg 
      className="w-5 h-5 fill-current" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.748.002-2.607-1.012-5.059-2.859-6.91-1.847-1.851-4.3-2.87-6.917-2.871-5.438 0-9.863 4.37-9.867 9.75-.001 1.773.49 3.512 1.42 5.047l-.995 3.635 3.723-.977zm11.367-7.251c-.26-.13-1.538-.759-1.776-.847-.239-.088-.413-.133-.587.13-.174.26-.674.847-.826 1.02-.152.174-.304.195-.565.065-.26-.13-1.097-.404-2.09-1.288-.772-.689-1.293-1.54-1.445-1.8-.152-.26-.016-.4.115-.53.117-.118.26-.304.39-.456.13-.152.174-.26.26-.434.088-.174.043-.326-.022-.456-.065-.13-.587-1.41-.804-1.93-.213-.513-.448-.443-.615-.443-.16-.003-.343-.003-.527-.003-.184 0-.485.07-.739.348-.254.278-.972.951-.972 2.321 0 1.37.994 2.695 1.135 2.89.141.195 1.958 2.99 4.743 4.193.662.286 1.18.457 1.582.585.665.21 1.27.18 1.748.11.532-.08 1.538-.629 1.756-1.237.217-.609.217-1.13.152-1.237-.065-.109-.239-.152-.499-.283z"/>
    </svg>
  );
}
