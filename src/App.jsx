import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Zap, 
  X, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  Cpu,
  ChevronDown,
  ChevronUp,
  Calendar,
  MessageSquare,
  Globe,
  Building2,
  Activity,
  Briefcase,
  Megaphone,
  Palette,
  Monitor,
  BrainCircuit,
  LineChart,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Users,
  Search,
  Layers,
  Star
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openService, setOpenService] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [theme, setTheme] = useState('dark');
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  // URL del logo
  const logoUrl = "https://res.cloudinary.com/dfj0ckm10/image/upload/q_auto/f_auto/v1778462963/ChatGPT_Image_May_10_2026_08_28_28_PM_mqoqmv.png";

  // --- DATA DE SERVICIOS REORDENADA ---
  const services = [
    {
      id: 'auto',
      tag: "SISTEMAS",
      title: "Automatizaciones",
      icon: <Zap size={28} />,
      desc: "Conectamos tus herramientas para que el trabajo pesado se haga solo. Automatizamos para escalar sin límites.",
      problem: "Tareas repetitivas que consumen el 40% de tu jornada laboral.",
      features: ["Flujos con Make/Zapier", "Integración de CRM", "Gestión de Leads", "Facturación Automática"],
      result: "Operaciones fluidas y tiempo libre para dirigir tu empresa.",
      graph: "Ahorro de +15 horas semanales/empleado."
    },
    {
      id: 'web',
      tag: "CONVERSIÓN",
      title: "Webs y Landing Pages",
      icon: <Monitor size={28} />,
      desc: "Desarrollamos experiencias digitales ultra-rápidas optimizadas para una sola cosa: convertir visitantes en dólares.",
      problem: "Webs lentas o confusas que espantan a los clientes potenciales.",
      features: ["Landing Pages de Alta Conversión", "UI/UX de Clase Mundial", "Velocidad de Carga <1s", "Mobile First"],
      result: "Un activo digital que trabaja para ti sin descanso.",
      graph: "Reducción del 60% en tasa de rebote."
    },
    {
      id: 'marketing',
      tag: "ESTRATEGIA",
      title: "Marketing Digital",
      icon: <Megaphone size={28} />,
      desc: "No tiramos dinero. Ejecutamos estrategias de adquisición de alto rendimiento para que tu marca no solo sea vista, sino elegida.",
      problem: "Invertir en publicidad sin ver un retorno real o leads calificados.",
      features: ["Google & Meta Ads Pro", "Funnels de Alto Ticket", "Optimización de ROAS", "Retargeting Dinámico"],
      result: "Crecimiento predecible y escalable basado en datos.",
      graph: "+250% en conversión de leads."
    },
    {
      id: 'contenido',
      tag: "AUTORIDAD",
      title: "Creación de Contenido",
      icon: <Palette size={28} />,
      desc: "Contenido estratégico diseñado para construir autoridad instantánea. Si no comunicas valor, no existes.",
      problem: "Tener redes sociales vacías o contenido que no genera compromiso ni ventas.",
      features: ["Content Strategy", "Video Marketing", "Copywriting Persuasivo", "Diseño de Marca"],
      result: "Una comunidad fiel que confía en tu autoridad.",
      graph: "80% más engagement orgánico."
    },
    {
      id: 'ia',
      tag: "FUTURO",
      title: "IA Generativa & Aplicada",
      icon: <BrainCircuit size={28} />,
      desc: "Implementamos agentes inteligentes y modelos de IA que resuelven problemas complejos en segundos. Es magia, pero real.",
      problem: "Quedarse atrás en la carrera tecnológica mientras la competencia se vuelve más eficiente.",
      features: ["Agentes de IA 24/7", "Entrenamiento de Modelos Propios", "Análisis de Datos con IA", "Chatbots de Venta"],
      result: "Ventaja competitiva absoluta en la era de la inteligencia.",
      graph: "Atención al cliente 99.9% autónoma."
    }
  ];

  const faqs = [
    { q: "¿Cuánto tiempo me quita a mí este proceso?", a: "Tu única participación real es la sesión de diagnóstico de 25 minutos. A partir de ahí, nosotros construimos, implementamos y gestionamos. Tú ves los resultados, no el proceso." },
    { q: "¿Tienen cobertura para negocios fuera de su país sede?", a: "Absolutamente. Diseñamos infraestructura digital para empresas en todo el mundo. Las reglas de la digitalización y la automatización con IA aplican globalmente, y adaptamos nuestras estrategias a tu mercado local." },
    { q: "¿En cuánto tiempo veo los primeros resultados?", a: "La presencia digital se activa en los primeros 7 a 14 días. Los sistemas de respuesta automática entran en las primeras 2 semanas. Las campañas de publicidad generan los primeros leads desde el primer mes." },
    { q: "¿Qué los diferencia de otras agencias de marketing?", a: "La mayoría de agencias vende contenido o pauta. Nosotros instalamos infraestructura: sistemas que funcionan solos, que se miden y que escalan. No vendemos horas de trabajo — vendemos resultados." },
    { q: "¿Tengo que aprender a manejar herramientas nuevas?", a: "No. Eso es exactamente lo que diferencia nuestro modelo. Tú no operas el sistema — nosotros lo operamos por ti. Si necesitas ver algo, te mostramos en un dashboard simple." }
  ];

  const successStories = [
    { name: "LMS Finance", result: "-92% T. Validación", icon: <Building2 className="text-[#BFFF00]" size={16} /> },
    { name: "Apex Medical", result: "+120 Citas IA", icon: <Activity className="text-[#BFFF00]" size={16} /> },
    { name: "Global Fit", result: "Soporte 24/7", icon: <Zap className="text-[#BFFF00]" size={16} /> },
    { name: "Technova", result: "x3 Conversión", icon: <Cpu className="text-[#BFFF00]" size={16} /> }
  ];

  // --- THEME OBSERVER ---
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

  // --- EFECTO DE PARTÍCULAS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' ? 'rgba(191, 255, 0, 0.25)' : 'rgba(0, 0, 0, 0.15)';
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 60; i++) {
        let size = Math.random() * 1.5 + 0.5;
        particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, (Math.random()-0.5)*0.25, (Math.random()-0.5)*0.25, size));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dist = ((particles[a].x - particles[b].x)**2 + (particles[a].y - particles[b].y)**2);
          if (dist < 20000) {
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(191, 255, 0, ${1 - dist/20000 * 0.15})` 
              : `rgba(0, 0, 0, ${1 - dist/20000 * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init(); animate();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
    };
  }, [theme]);

  // --- SCROLL EFFECTS ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 30); // Ajustado por la topbar
      setShowFloatingBtn(scrollPos > 500); 
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollPos * 0.25}px)`;
        heroRef.current.style.opacity = 1 - scrollPos / 600;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if(element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  const toggleService = (id) => {
    setOpenService(openService === id ? null : id);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out font-sans ${theme === 'dark' ? 'bg-black text-white' : 'bg-zinc-50 text-black'}`}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Instrument+Serif:ital@0;1&display=swap');
        body { font-family: 'Outfit', sans-serif; overflow-x: hidden; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        
        .btn-glow { transition: all 0.4s ease; box-shadow: 0 10px 40px -10px rgba(191, 255, 0, 0.6); border: 1px solid transparent;}
        .btn-glow:hover { box-shadow: 0 15px 50px -5px rgba(191, 255, 0, 0.8); transform: translateY(-3px); border-color: #BFFF00;}
        
        .floating-cta { animation: popUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popUp { from { transform: translateY(120px) scale(0.7); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }

        @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 4s ease infinite;
        }
        
        .hero-float {
            animation: heroFloat 8s ease-in-out infinite;
        }
        @keyframes heroFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .service-accordion {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .service-accordion:hover {
            background: rgba(191, 255, 0, 0.02);
        }
      `}</style>

      {/* Background Canvas */}
      <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000 ${theme === 'light' ? 'opacity-70' : 'opacity-40'}`} />

      {/* 1. BARRA SUPERIOR DE URGENCIA */}
      <div className="fixed top-0 w-full bg-[#BFFF00] text-black z-[60] py-2 px-4 text-center text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
        <AlertCircle size={14} className="animate-pulse" />
        Cupos limitados por mes — Mayo casi completo — 
        <button onClick={() => scrollToSection('agendar')} className="underline underline-offset-2 hover:opacity-70 transition-opacity">Reservar Ahora</button>
      </div>

      {/* 2. NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? `top-8 py-3 backdrop-blur-2xl shadow-2xl ${theme === 'dark' ? 'bg-black/90 border-b border-white/5' : 'bg-white/90 border-b border-black/5'}` : 'top-8 py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src={logoUrl} alt="Veluz Logo" className="h-24 md:h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollToSection('problema')} className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${theme === 'dark' ? 'hover:text-[#BFFF00]' : 'text-slate-600 hover:text-black'}`}>Problema</button>
            <button onClick={() => scrollToSection('servicios')} className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${theme === 'dark' ? 'hover:text-[#BFFF00]' : 'text-slate-600 hover:text-black'}`}>Servicios</button>
            <button onClick={() => scrollToSection('caso-lms')} className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${theme === 'dark' ? 'hover:text-[#BFFF00]' : 'text-slate-600 hover:text-black'}`}>Casos</button>
            <button onClick={() => scrollToSection('agendar')} className="bg-[#BFFF00] text-black px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest btn-glow shadow-lg shadow-[#BFFF00]/20">
              Diagnóstico Gratis
            </button>
          </div>
        </div>
      </nav>

      {/* 3. HERO */}
      <section data-theme="dark" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 z-10 pt-32 pb-10">
        <div ref={heroRef} className="max-w-5xl w-full hero-float mt-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-1 text-[#BFFF00]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20 mx-2"></div>
            <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase text-slate-300">
              +21 negocios con resultados
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.95] mb-6">
            Digitalizamos y <br className="hidden md:block" />
            automatizamos tu <br className="hidden md:block" />
            <span className="font-serif italic font-normal text-[#BFFF00]">negocio con IA.</span>
          </h1>

          <p className="text-slate-400 text-base md:text-xl max-w-3xl mx-auto mb-10 font-light leading-relaxed">
            Pasamos tu negocio de la operatividad manual a la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BFFF00] via-emerald-400 to-[#BFFF00] animate-gradient-x font-black font-serif italic text-xl md:text-2xl mx-1">rentabilidad automática</span>.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-8 mb-12">
            <button onClick={() => scrollToSection('agendar')} className="w-full sm:w-auto bg-[#BFFF00] text-black px-10 py-4 md:py-5 rounded-full font-black text-lg flex items-center justify-center gap-4 btn-glow hover:scale-105 transition-transform">
              Diagnóstico Gratis <ArrowRight size={22} />
            </button>
            
            {/* Prueba Social Estática en Hero (Actualizada con métricas) */}
            <div className="flex flex-wrap justify-center gap-6 opacity-60">
              {successStories.map((story, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  {story.icon}
                  <span className="text-[10px] font-bold tracking-widest uppercase">{story.name} · {story.result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. AGITACIÓN DEL PROBLEMA */}
      <section id="problema" data-theme="light" className="relative py-32 z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
              Cada día sin digitalizar <br />
              <span className="text-red-600">es un cliente que se va</span> <br />
              a la competencia.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            {/* Reordenado: Emocional -> Operativo -> Racional */}
            <div className="border p-10 rounded-[3rem] hover:-translate-y-2 transition-transform bg-red-50 border-red-300 shadow-red-100 shadow-lg scale-105 z-10 relative">
              <div className="absolute top-4 right-4"><Zap size={24} className="text-red-500 animate-pulse" /></div>
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-black text-red-700 mb-4">Ventas Perdidas</h3>
              <p className="text-red-900/80 text-sm leading-relaxed font-medium">El 78% de los clientes elige al primero que responde. Si tardas más de 5 minutos, la venta es de tu competidor.</p>
            </div>

            <div className="border p-10 rounded-[3rem] hover:-translate-y-2 transition-transform bg-zinc-50 border-zinc-200">
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                <Clock className="text-zinc-600" size={32} />
              </div>
              <h3 className="text-2xl font-black text-zinc-800 mb-4">Fuga de Tiempo</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">Tu equipo pierde hasta el 60% del día en tareas manuales que ya se pueden automatizar hoy mismo.</p>
            </div>

            <div className="border p-10 rounded-[3rem] hover:-translate-y-2 transition-transform bg-zinc-50 border-zinc-200">
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                <XCircle className="text-zinc-600" size={32} />
              </div>
              <h3 className="text-2xl font-black text-zinc-800 mb-4">Invisibilidad Digital</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">Si no apareces en Google o IAs cuando tu cliente busca, para efectos prácticos, no existes.</p>
            </div>
          </div>

          {/* El puente de contraste emocional */}
          <div className="mt-20 grid lg:grid-cols-2 gap-12 items-stretch">
            <div className="bg-black text-white p-12 rounded-[4rem] flex flex-col justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#BFFF00] blur-[100px] opacity-30"></div>
              <h4 className="text-[#BFFF00] font-black text-sm uppercase tracking-widest mb-4">Existe una salida</h4>
              <p className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                Los negocios digitalizados crecen 2 veces más rápido y dejan de depender del azar.
              </p>
              <div className="flex items-center gap-4 text-[#BFFF00] font-black text-xs uppercase tracking-widest">
                <ShieldCheck /> Infraestructura Validada
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-[4rem] p-10 shadow-inner">
               <div className="grid grid-cols-2 gap-4 mb-8 border-b border-slate-200 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Sin Veluz (Peligro)</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Con Veluz (Seguridad)</span>
               </div>
               <div className="space-y-8">
                  {[
                    ["WhatsApp sin respuesta por horas", "Bot IA responde y agenda 24/7"],
                    ["Invisible en Google y ChatGPT", "Autoridad top en búsquedas locales"],
                    ["Operaciones manuales en Excel", "Dashboard inteligente y automático"]
                  ].map(([sin, con], i) => (
                    <div key={i} className="grid grid-cols-2 gap-8 text-sm">
                      <p className="text-red-900/60 font-medium line-through decoration-red-300">{sin}</p>
                      <p className="text-black font-bold flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-500 shrink-0" /> {con}
                      </p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CASO DE ÉXITO REAL — LMS Finance */}
      <section id="caso-lms" data-theme="dark" className="relative py-32 z-10 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">No es teoría. <span className="text-[#BFFF00]">Son resultados.</span></h2>
            <p className="text-xl opacity-60 text-slate-300 font-serif italic">Caso de Éxito: LMS Finance Group</p>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#BFFF00]/10 blur-[100px]"></div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <div className="bg-red-500/10 border-l-4 border-red-500 p-6 rounded-r-2xl">
                  <p className="text-red-400 font-black text-[10px] uppercase tracking-widest mb-2">El Problema</p>
                  <p className="text-red-100/80 text-sm leading-relaxed font-medium">
                    Cada validación de terceros requería revisión manual, cruce de datos en múltiples sistemas y reportes a mano. Tomaba entre 45 minutos y 2 horas por caso. Cuello de botella masivo.
                  </p>
                </div>
                <div className="bg-[#BFFF00]/10 border-l-4 border-[#BFFF00] p-6 rounded-r-2xl">
                  <p className="text-[#BFFF00] font-black text-[10px] uppercase tracking-widest mb-2">La Solución Veluz</p>
                  <p className="text-white/80 text-sm leading-relaxed font-medium">
                    Automatizamos el flujo completo usando IA. El sistema recibe, procesa, cruza información y genera reportes automáticamente. Sin intervención humana.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#BFFF00] text-black p-8 rounded-[2rem] flex flex-col justify-center">
                  <p className="text-4xl md:text-5xl font-black tracking-tighter mb-2">-92%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Tiempo de validación</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col justify-center">
                  <p className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-white">x5</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Capacidad procesada</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col justify-center">
                  <p className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-white">0</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Errores de digitación</p>
                </div>
                <div className="bg-zinc-900 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-center">
                  <p className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-[#BFFF00]">24/7</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sistema activo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARA QUIÉN ES VELUZ */}
      <section data-theme="light" className="relative py-32 z-10 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-zinc-900">¿Es Veluz para ti?</h2>
            <p className="text-lg text-slate-500 font-medium">Si te identificas con alguno de estos perfiles, el diagnóstico es para ti.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-200">
              <Users size={32} className="text-black mb-6" />
              <h3 className="text-xl font-bold mb-4">Negocios Locales</h3>
              <p className="text-zinc-600 text-sm">Con buen flujo físico pero sin presencia digital. Si quieres que Google y la IA manden clientes a tu puerta física.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-200">
              <TrendingUp size={32} className="text-black mb-6" />
              <h3 className="text-xl font-bold mb-4">PYMEs en Crecimiento</h3>
              <p className="text-zinc-600 text-sm">Empresas que necesitan escalar su facturación sin engordar su nómina administrativa.</p>
            </div>
            <div className="bg-black text-white p-10 rounded-[2.5rem] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#BFFF00]/20 blur-[50px]"></div>
              <Activity size={32} className="text-[#BFFF00] mb-6" />
              <h3 className="text-xl font-bold mb-4">Dueños "Atrapados"</h3>
              <p className="text-zinc-300 text-sm">Líderes que están operando el día a día en vez de dirigir la estrategia. Te devolvemos tu tiempo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EL MÉTODO (3 Pasos) */}
      <section data-theme="light" className="relative py-32 z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-zinc-900 uppercase">Cómo lo hacemos</h2>
            <p className="text-xl text-slate-500 font-serif italic">Claridad absoluta. Sin cajas negras.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", t: "Diagnóstico", d: "Auditoría de 25 min. Entendemos tu operation y diseñamos un mapa de fugas de dinero y tiempo.", icon: <Search /> },
              { step: "02", t: "Arquitectura", d: "Construimos tu ecosistema digital. Tú apruebas, nosotros integramos la IA y los sistemas.", icon: <Layers /> },
              { step: "03", t: "Ignición", d: "Encendemos la maquinaria. El sistema empieza a captar y operar. Medimos y escalamos.", icon: <Zap /> }
            ].map((p, i) => (
              <div key={i} className="relative p-10 rounded-[3rem] bg-zinc-50 border border-zinc-200">
                <div className="text-[#BFFF00] bg-black w-14 h-14 rounded-2xl flex items-center justify-center mb-8">{p.icon}</div>
                <span className="text-5xl font-black text-zinc-200 absolute top-10 right-10">{p.step}</span>
                <h3 className="text-2xl font-black mb-4 text-zinc-900">{p.t}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SERVICIOS (ACORDEÓN ANIMADO) */}
      <section id="servicios" data-theme="dark" className="py-32 px-6 relative z-10 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 text-white">El Ecosistema</h2>
            <p className="text-xl opacity-60 max-w-2xl text-slate-300">Selecciona un pilar para ver la arquitectura técnica.</p>
          </div>

          <div className="border-t border-white/10">
            {services.map((s) => (
              <div key={s.id} className="service-accordion group overflow-hidden">
                <button 
                  onClick={() => setOpenService(openService === s.id ? null : s.id)}
                  className="w-full flex items-center justify-between py-8 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <div className={`p-4 rounded-2xl transition-all duration-500 ${openService === s.id ? 'bg-[#BFFF00] text-black scale-110 shadow-[0_0_20px_rgba(191,255,0,0.4)]' : 'bg-white/5 text-[#BFFF00]'}`}>
                      {s.icon}
                    </div>
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-colors ${openService === s.id ? 'text-[#BFFF00]' : 'text-slate-500'}`}>{s.tag}</p>
                      <h3 className={`text-2xl md:text-4xl font-black tracking-tighter uppercase transition-colors ${openService === s.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <div className={`transition-transform duration-500 ${openService === s.id ? 'rotate-180' : ''}`}>
                    <ChevronDown size={32} className={openService === s.id ? 'text-[#BFFF00]' : 'text-slate-600'} />
                  </div>
                </button>

                <div className={`transition-all duration-700 ease-in-out ${openService === s.id ? 'max-h-[1000px] opacity-100 pb-12' : 'max-h-0 opacity-0'}`}>
                  <div className="grid lg:grid-cols-2 gap-12 pt-4">
                    <div className="space-y-8 pr-4">
                      <p className="text-lg leading-relaxed text-slate-300 font-light">"{s.desc}"</p>
                      <div className="bg-red-500/10 border-l-2 border-red-500 p-4 rounded-r-xl">
                          <p className="text-red-400 font-black text-[10px] uppercase tracking-widest mb-1">Dolor</p>
                          <p className="text-red-200 text-xs">{s.problem}</p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Features</p>
                        <div className="grid grid-cols-2 gap-3">
                          {s.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-[#BFFF00]" />
                              <span className="text-xs font-bold text-white">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] border bg-zinc-900 border-white/10 flex flex-col justify-center">
                      <p className="text-4xl font-black tracking-tighter mb-2 text-white">{s.graph}</p>
                      <div className="bg-[#BFFF00]/10 p-4 rounded-xl border border-[#BFFF00]/20 mb-6">
                          <p className="text-[#BFFF00] text-[10px] font-black uppercase tracking-widest mb-1">Impacto</p>
                          <p className="text-sm text-white font-bold">{s.result}</p>
                      </div>
                      <button onClick={() => scrollToSection('agendar')} className="w-full py-4 bg-[#BFFF00] text-black rounded-full font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform btn-glow">
                        Implementar Capa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. COMPARADOR */}
      <section data-theme="dark" className="relative py-32 z-10 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Por qué somos diferentes</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-0 border border-white/10 rounded-[3rem] overflow-hidden">
            <div className="p-12 bg-zinc-900/50">
              <h3 className="text-xl font-bold text-slate-400 text-center mb-8">Agencia de Marketing Común</h3>
              <ul className="space-y-6">
                {[
                  "Se enfocan en likes y seguidores",
                  "Tardan meses en desarrollar una web",
                  "El lead llega y tú debes responder manual",
                  "Venden servicios sueltos sin estrategia"
                ].map((t,i) => (
                  <li key={i} className="flex gap-3 text-slate-500 text-sm">
                    <XCircle size={18} className="text-red-500 shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-12 bg-[#BFFF00]/10 border-l border-[#BFFF00]/20">
              <h3 className="text-xl font-black text-white text-center mb-8">Veluz Agency</h3>
              <ul className="space-y-6">
                {[
                  "Nos enfocamos en ROI y automatización",
                  "Implementación ágil e iterativa",
                  "Sistemas de IA responden y agendan 24/7",
                  "Construimos infraestructura completa"
                ].map((t,i) => (
                  <li key={i} className="flex gap-3 text-white font-bold text-sm">
                    <CheckCircle size={18} className="text-[#BFFF00] shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section data-theme="dark" className="relative py-32 z-10 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-[2rem] bg-zinc-900/50 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 text-left flex justify-between items-center group"
                >
                  <span className="font-bold text-lg text-white pr-6">{faq.q}</span>
                  <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-all ${activeFaq === i ? 'bg-[#BFFF00] text-black' : 'bg-white/5 text-white'}`}>
                    {activeFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${activeFaq === i ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className="px-8 text-slate-400 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CALENDLY (CTA FINAL) */}
      <section id="agendar" data-theme="dark" className="py-32 z-10 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#BFFF00]/5 blur-[150px] pointer-events-none rounded-full"></div>
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">
                En 25 minutos sabes exactamente <br/>
                qué está fallando en tu negocio <br/>
                <span className="text-[#BFFF00]">y cómo arreglarlo.</span>
            </h2>
            <p className="text-slate-400 text-xl font-light">Gratis, sin compromiso.</p>
          </div>
          <div className="bg-white rounded-[3rem] overflow-hidden h-[750px] shadow-[0_0_100px_rgba(191,255,0,0.1)] border border-[#BFFF00]/30">
            <iframe 
              src="https://calendly.com/veluz-agency/15min?hide_landing_page_details=1&primary_color=bfff00" 
              width="100%" height="100%" frameBorder="0" title="Calendly"
            ></iframe>
          </div>
          <div className="mt-8 text-center flex flex-wrap justify-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <span>✓ Sin tarjeta</span> <span className="hidden sm:inline">·</span> <span>✓ Sin contrato</span> <span className="hidden sm:inline">·</span> <span>✓ Sin presión de venta</span>
          </div>
        </div>
      </section>

      {/* Botón Flotante */}
      {showFloatingBtn && (
          <div className="fixed bottom-8 right-6 md:right-10 z-[60] floating-cta">
              <button 
                onClick={() => scrollToSection('agendar')}
                className="flex items-center gap-3 bg-[#BFFF00] text-black px-6 md:px-8 py-4 md:py-5 rounded-full font-black shadow-[0_20px_50px_rgba(191,255,0,0.4)] hover:scale-105 transition-transform group"
              >
                  <Calendar size={20} />
                  <span className="hidden sm:inline uppercase text-xs tracking-widest">Diagnóstico Gratis</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
          </div>
      )}

      {/* 12. FOOTER */}
      <footer className="py-16 bg-black border-t border-white/5 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
               <img src={logoUrl} alt="Veluz" className="h-16 md:h-24 mb-4 opacity-80 hover:opacity-100 transition-opacity" />
               <p className="text-[10px] font-black tracking-widest opacity-40 uppercase">© 2026 VELUZ GLOBAL OPERATIONS</p>
            </div>
            <div className="flex gap-12 text-[10px] font-black tracking-[0.4em] uppercase opacity-60">
                <a href="https://wa.me/573125923915" target="_blank" rel="noopener noreferrer" className="hover:text-[#BFFF00] transition-colors">WhatsApp Soporte</a>
                <button onClick={() => scrollToSection('agendar')} className="hover:text-[#BFFF00] transition-colors">Agendar</button>
            </div>
        </div>
      </footer>
    </div>
  );
}
