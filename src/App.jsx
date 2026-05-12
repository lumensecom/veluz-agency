import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Zap, 
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronDown,
  Calendar,
  Monitor,
  BrainCircuit,
  Megaphone,
  AlertTriangle,
  Star,
  Menu,
  X,
  Target,
  Rocket,
  ShieldCheck,
  Search,
  Users,
  TrendingUp,
  CheckCircle,
  Layers,
  ArrowDown
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

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openService, setOpenService] = useState('ia');
  const [openFaq, setOpenFaq] = useState(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  const logoUrl = "https://res.cloudinary.com/dfj0ckm10/image/upload/q_auto/f_auto/v1778462963/ChatGPT_Image_May_10_2026_08_28_28_PM_mqoqmv.png";
  const faviconUrl = "https://res.cloudinary.com/dfj0ckm10/image/upload/q_auto/f_auto/v1778464000/ChatGPT_Image_May_10_2026_08_45_58_PM_fo32bz.png";

  useEffect(() => {
    document.title = "Veluz Agency — Digitalización & IA";
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
      visual: (
        <div className="relative h-40 w-full bg-black/40 rounded-2xl border border-white/5 overflow-hidden p-4 flex flex-col justify-center gap-2">
            <div className="flex gap-2 items-center animate-pulse">
                <div className="w-2 h-2 bg-[#BFFF00] rounded-full"></div>
                <div className="h-2 w-24 bg-white/20 rounded-full"></div>
            </div>
            <div className="h-10 w-full bg-[#BFFF00]/10 border border-[#BFFF00]/20 rounded-xl p-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-[#BFFF00] rounded-full flex items-center justify-center text-[10px] text-black font-black">AI</div>
                <div className="h-2 w-40 bg-[#BFFF00]/40 rounded-full"></div>
            </div>
            <div className="flex justify-end">
                <div className="h-8 w-32 bg-white/5 border border-white/10 rounded-xl"></div>
            </div>
        </div>
      )
    },
    {
      id: 'content',
      tag: "VISIBILIDAD",
      title: "Contenido Orgánico",
      icon: <Megaphone size={24} />,
      desc: "Cero Ads. Construimos autoridad mediante contenido que los motores de búsqueda e IA (GEO) aman citar.",
      features: ["SEO & GEO Premium", "Autoridad de Marca", "Estrategia de Viralidad"],
      result: "Alcance",
      graph: "10",
      suffix: "X",
      visual: (
        <div className="grid grid-cols-3 gap-2 h-40">
            <div className="bg-gradient-to-t from-[#BFFF00]/20 to-transparent rounded-xl border border-white/5 flex flex-col justify-end p-2">
                <div className="h-1/2 w-full bg-[#BFFF00] rounded-lg"></div>
            </div>
            <div className="bg-gradient-to-t from-[#BFFF00]/40 to-transparent rounded-xl border border-white/5 flex flex-col justify-end p-2">
                <div className="h-3/4 w-full bg-[#BFFF00] rounded-lg"></div>
            </div>
            <div className="bg-gradient-to-t from-[#BFFF00]/10 to-transparent rounded-xl border border-white/5 flex flex-col justify-end p-2">
                <div className="h-1/3 w-full bg-[#BFFF00] rounded-lg"></div>
            </div>
        </div>
      )
    },
    {
      id: 'auto',
      tag: "EFICIENCIA",
      title: "Infraestructura",
      icon: <Zap size={24} />,
      desc: "Conectamos tu CRM, pagos y admin. Si es una tarea manual y repetitiva, nosotros la convertimos en código.",
      features: ["Flujos con Make/Zapier", "Dashboard en tiempo real", "Sincronización total"],
      result: "Tiempo ahorrado",
      graph: "15",
      suffix: "h/s",
      visual: (
        <div className="relative h-40 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-32 h-32 border-2 border-dashed border-[#BFFF00] rounded-full animate-spin-slow"></div>
            </div>
            <div className="flex gap-4 z-10">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl"><Monitor size={20} className="text-[#BFFF00]"/></div>
                <div className="p-3 bg-[#BFFF00] rounded-xl"><ArrowRight size={20} className="text-black"/></div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl"><Users size={20} className="text-[#BFFF00]"/></div>
            </div>
        </div>
      )
    }
  ];

  const targetAudience = [
    { title: "Dueños de Negocio", desc: "Cansados de ser el 'cuello de botella' de su propia operación diaria.", icon: <Users size={20}/> },
    { title: "Servicios High-Ticket", desc: "Clínicas o consultores que pierden ventas por falta de respuesta inmediata.", icon: <ShieldCheck size={20}/> },
    { title: "Negocios Escalables", desc: "Empresas que quieren crecer sin multiplicar su nómina de forma lineal.", icon: <TrendingUp size={20}/> }
  ];

  const faqs = [
    { q: "¿Tengo que pagar anuncios (Ads)?", a: "No. Nuestro enfoque es 100% orgánico. Construimos infraestructura que genera autoridad y atrae clientes sin depender de pauta pagada." },
    { q: "¿Cuánto tarda la implementación?", a: "Un sistema de IA o automatización estándar tarda entre 10 y 15 días en estar totalmente operativo y entrenado." },
    { q: "¿Necesito conocimientos técnicos?", a: "Cero. Nosotros nos encargamos de toda la arquitectura técnica. Tú solo recibes los leads calificados en tu WhatsApp o CRM." },
    { q: "¿Cómo sé que funcionará para mí?", a: "Por eso ofrecemos un diagnóstico gratuito. Solo aceptamos clientes donde la tecnología pueda generar un ROI claro en los primeros 60 días." }
  ];

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
        ctx.fillStyle = 'rgba(191, 255, 0, 0.15)';
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
      const count = window.innerWidth < 768 ? 20 : 50;
      for (let i = 0; i < count; i++) {
        let size = Math.random() * 1.5 + 0.5;
        particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, (Math.random()-0.5)*0.1, (Math.random()-0.5)*0.1, size));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    init(); animate();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
    };
  }, []);

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

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#BFFF00] selection:text-black overflow-x-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Instrument+Serif:ital@0;1&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        .btn-glow { box-shadow: 0 10px 40px -10px rgba(191, 255, 0, 0.4); }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
      `}</style>

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40" />

      {/* 1. TOP BAR */}
      {showTopBar && (
        <div className="fixed top-0 w-full bg-[#BFFF00] text-black z-[100] py-2 px-6 flex items-center justify-between">
          <div className="flex-1 text-center text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-2">
            Cupos limitados — Mayo al 90%
          </div>
          <button onClick={() => setShowTopBar(false)}><X size={14} /></button>
        </div>
      )}

      {/* 2. NAVBAR */}
      <nav className={`fixed w-full z-[90] transition-all duration-300 ${isScrolled ? 'top-0 py-2 bg-black/80 backdrop-blur-xl border-b border-white/5' : `${showTopBar ? 'top-10' : 'top-4'} py-3 bg-transparent`}`}>
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          <img src={logoUrl} alt="Veluz" className="h-10 md:h-16 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})} />
          
          <div className="hidden md:flex items-center gap-10">
             <button onClick={() => scrollToSection('problema')} className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">El Problema</button>
             <button onClick={() => scrollToSection('metodo')} className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Nuestro Método</button>
             <button onClick={() => scrollToSection('servicios')} className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Servicios</button>
             <button onClick={() => scrollToSection('faq')} className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Dudas</button>
             <button onClick={() => scrollToSection('agendar')} className="bg-[#BFFF00] text-black px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest btn-glow">Diagnóstico</button>
          </div>

          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-[#BFFF00]"><Menu size={28} /></button>
        </div>
      </nav>

      {/* 3. MOBILE MENU */}
      <div className={`fixed inset-0 z-[110] bg-black transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <img src={logoUrl} alt="Veluz" className="h-10" />
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full text-[#BFFF00]"><X size={24} /></button>
          </div>
          <div className="flex flex-col gap-10">
            {['Problema', 'Método', 'Servicios', 'FAQ', 'Agendar'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-5xl font-black text-left uppercase tracking-tighter hover:text-[#BFFF00]">{item}</button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 z-10 pt-20">
        <div ref={heroRef} className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10">
            <div className="flex gap-1 text-[#BFFF00]"><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/></div>
            <span className="text-[9px] font-black tracking-widest uppercase text-slate-300">Arquitectura de Crecimiento Orgánico</span>
          </div>
          <h1 className="text-5xl md:text-[100px] font-black tracking-tighter leading-[0.95] md:leading-[0.85] mb-8 uppercase">
            Digitalizamos tu <br />
            <span className="font-serif italic font-normal text-[#BFFF00] normal-case">negocio con IA.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Convertimos operaciones manuales en <span className="text-white font-medium italic">máquinas de eficiencia</span> que cierran ventas sin que estés presente.
          </p>
          <div className="flex flex-col items-center justify-center gap-8">
            <button onClick={() => scrollToSection('agendar')} className="w-full md:w-auto bg-[#BFFF00] text-black px-12 py-5 rounded-full font-black text-base flex items-center justify-center gap-3 btn-glow transition-all active:scale-95">
              Diagnóstico Gratis <ArrowRight size={20} />
            </button>
            
            <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BFFF00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#BFFF00]"></span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">5 negocios activados este mes</span>
            </div>

            <div className="mt-4 opacity-20 animate-bounce-subtle">
                <ArrowDown size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PARA QUIÉN ES */}
      <section className="py-20 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetAudience.map((item, i) => (
              <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] transition-colors hover:border-[#BFFF00]/30 group">
                <div className="w-12 h-12 bg-[#BFFF00]/10 rounded-xl flex items-center justify-center text-[#BFFF00] mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black uppercase mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EL PROBLEMA (ID Corregido) */}
      <section id="problema" className="relative py-32 z-10 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-tight uppercase">
              Operar manual es <br />
              <span className="text-red-600">quemar dinero.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 flex flex-col items-start">
                <AlertTriangle className="text-red-600 mb-6" size={40} />
                <h3 className="text-2xl font-black mb-4 uppercase">Fuga de Ventas</h3>
                <p className="text-zinc-500 text-lg">Si tardas más de 5 minutos en responder a un lead digital, la probabilidad de cierre cae un <span className="text-black font-bold">80%</span>. Tu competencia responde en segundos con IA.</p>
             </div>
             <div className="p-10 rounded-[3rem] bg-zinc-900 text-white flex flex-col items-start relative overflow-hidden">
                <CheckCircle2 className="text-[#BFFF00] mb-6" size={40} />
                <h3 className="text-2xl font-black mb-4 uppercase text-[#BFFF00]">Efecto Veluz</h3>
                <p className="text-zinc-400 text-lg">Digitalizamos tu infraestructura para que el negocio siga operando, vendiendo y respondiendo mientras tú descansas o escalas.</p>
                <div className="mt-8 flex gap-2">
                    {["Cero Errores", "Respuesta < 3s", "Lead Calificado"].map(t => <span key={t} className="text-[9px] font-black uppercase px-3 py-1 bg-white/5 rounded-full border border-white/10">{t}</span>)}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. EL MÉTODO (Sección Nueva) */}
      <section id="metodo" className="py-32 bg-black z-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
            <div className="text-center mb-20">
                <span className="text-[#BFFF00] text-[10px] font-black tracking-[0.4em] uppercase block mb-4">Ingeniería Estratégica</span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">El Sistema Veluz</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { step: "01", title: "Auditoría de Flujos", desc: "Mapeamos cada acción manual que hoy te roba tiempo y detectamos dónde estás perdiendo dinero." },
                    { step: "02", title: "Diseño de Cerebro", desc: "Entrenamos una IA con tu tono de voz y protocolos de venta específicos para tu industria." },
                    { step: "03", title: "Escalado Orgánico", desc: "Implementamos sistemas que atraen tráfico sin pauta pagada, cerrando el ciclo de venta." }
                ].map((m, i) => (
                    <div key={i} className="relative p-10 rounded-[2rem] border border-white/5 bg-zinc-950">
                        <span className="text-6xl font-black text-white/5 absolute top-6 right-8">{m.step}</span>
                        <h3 className="text-xl font-black uppercase mb-4 text-[#BFFF00]">{m.title}</h3>
                        <p className="text-zinc-500 leading-relaxed text-sm">{m.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 8. SERVICIOS */}
      <section id="servicios" className="py-32 bg-black z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-20">
             <span className="text-[#BFFF00] text-[10px] font-black tracking-[0.4em] uppercase block mb-4">Nuestro Arsenal Técnico</span>
             <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Soluciones de <br /> alto impacto</h2>
          </div>

          <div className="flex flex-col gap-6">
            {services.map((s) => (
              <div key={s.id} className={`group border rounded-[2.5rem] overflow-hidden transition-all duration-500 ${openService === s.id ? 'bg-white/[0.03] border-[#BFFF00]/30' : 'bg-transparent border-white/5'}`}>
                <button 
                  onClick={() => setOpenService(s.id)}
                  className="w-full flex items-center justify-between p-8 md:p-12 text-left"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <div className={`p-4 rounded-2xl transition-all ${openService === s.id ? 'bg-[#BFFF00] text-black rotate-3' : 'bg-white/5 text-[#BFFF00]'}`}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-black tracking-widest text-slate-500 mb-2">{s.tag}</p>
                      <h3 className={`text-2xl md:text-4xl font-black uppercase ${openService === s.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{s.title}</h3>
                    </div>
                  </div>
                  <ChevronDown className={`transition-transform duration-300 ${openService === s.id ? 'rotate-180 text-[#BFFF00]' : 'text-slate-700'}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-700 ${openService === s.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="p-8 md:p-12 pt-0 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5">
                      <div className="flex flex-col justify-between py-4">
                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">{s.desc}</p>
                        <div className="space-y-4">
                           {s.features.map((f, i) => (
                             <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <CheckCircle size={14} className="text-[#BFFF00]"/> {f}
                             </div>
                           ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        {s.visual}
                        <div className="p-8 bg-black/50 rounded-3xl border border-white/5 flex items-center justify-between">
                            <div>
                                <p className="text-[#BFFF00] text-[9px] font-black uppercase tracking-widest mb-1">{s.result}</p>
                                <p className="text-4xl font-black text-white"><StatCounter value={parseInt(s.graph)} suffix={s.suffix}/></p>
                            </div>
                            <button onClick={() => scrollToSection('agendar')} className="bg-[#BFFF00] text-black px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95">Reservar →</button>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CASO LMS FINANCE (Copi Corregido) */}
      <section className="py-32 bg-[#BFFF00] text-black z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <span className="px-3 py-1 bg-black text-[#BFFF00] rounded-full text-[9px] font-black uppercase tracking-widest">Caso de Éxito #01</span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none mt-6 mb-8 uppercase">LMS <br /> Finance</h2>
                <p className="text-black/60 text-lg md:text-xl font-medium leading-relaxed mb-10 italic">
                    "Automatizamos el 92% de la validación de documentos financieros, eliminando el error humano y multiplicando por 5 la capacidad de procesamiento del equipo sin contratar a nadie más."
                </p>
                <div className="flex gap-4">
                    <button onClick={() => scrollToSection('agendar')} className="bg-black text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2">Quiero resultados así <ArrowRight size={16}/></button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: "Tiempo Validación", val: "-92%" },
                    { label: "Errores Manuales", val: "0" },
                    { label: "Eficiencia Equipo", val: "5X" },
                    { label: "ROI Sistema", val: "30D" }
                ].map((stat, i) => (
                    <div key={i} className="p-8 bg-black/5 rounded-3xl border border-black/10 flex flex-col justify-center">
                        <p className="text-5xl font-black mb-2">{stat.val}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">{stat.label}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ (Copi Corregido) */}
      <section id="faq" className="py-32 bg-black z-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black uppercase mb-4">Preguntas Frecuentes</h2>
                <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest">Todo lo que necesitas saber antes de empezar</p>
            </div>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                        <button 
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full p-6 text-left flex justify-between items-center group"
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

      {/* 11. AGENDAR */}
      <section id="agendar" className="py-20 md:py-40 bg-[#050505] z-10">
        <div className="max-w-5xl mx-auto px-6">
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
          <img src={logoUrl} alt="Veluz" className="h-10 opacity-60" />
          <div className="flex gap-8 md:gap-16 text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
            <a href="https://wa.me/573125923915" target="_blank" className="hover:text-[#BFFF00] transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-[#BFFF00] transition-colors">Aviso Legal</a>
            <span className="hidden md:inline">© 2026 Veluz Agency</span>
          </div>
          <span className="md:hidden text-[9px] font-bold opacity-20 uppercase tracking-widest">© 2026 Veluz Agency</span>
        </div>
      </footer>

      {/* FLOATING ACTION (md:hidden restaurado) */}
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
