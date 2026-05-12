import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Zap, 
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
  Monitor,
  BrainCircuit,
  Megaphone,
  Palette,
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

  const logoUrl = "https://res.cloudinary.com/dfj0ckm10/image/upload/q_auto/f_auto/v1778462963/ChatGPT_Image_May_10_2026_08_28_28_PM_mqoqmv.png";

  const services = [
    {
      id: 'auto',
      tag: "SISTEMAS",
      title: "Automatizaciones",
      icon: <Zap size={24} />,
      desc: "Conectamos tus herramientas para que el trabajo pesado se haga solo. Automatizamos para escalar sin límites.",
      problem: "Tareas repetitivas que consumen el 40% de tu jornada laboral.",
      features: ["Flujos con Make", "Integración CRM", "Gestión de Leads", "Facturación Auto"],
      result: "Operaciones fluidas y tiempo libre real.",
      graph: "+15h /semana"
    },
    {
      id: 'web',
      tag: "CONVERSIÓN",
      title: "Webs & Landing",
      icon: <Monitor size={24} />,
      desc: "Experiencias digitales ultra-rápidas optimizadas para una sola cosa: convertir visitantes en dólares.",
      problem: "Webs lentas que espantan a los clientes potenciales.",
      features: ["Alta Conversión", "UI/UX Premium", "Carga <1s", "Mobile First"],
      result: "Un activo digital que vende sin descanso.",
      graph: "-60% Rebote"
    },
    {
      id: 'ia',
      tag: "FUTURO",
      title: "IA Aplicada",
      icon: <BrainCircuit size={24} />,
      desc: "Implementamos agentes inteligentes que resuelven problemas complejos en segundos. Es magia, pero real.",
      problem: "Quedarse atrás mientras la competencia se vuelve ultra-eficiente.",
      features: ["Agentes 24/7", "Modelos Propios", "Análisis IA", "Chatbots Venta"],
      result: "Ventaja competitiva absoluta.",
      graph: "99% Autónoma"
    }
  ];

  const faqs = [
    { q: "¿Cuánto tiempo me quita a mí?", a: "Solo 25 minutos para el diagnóstico inicial. Nosotros nos encargamos de toda la construcción e implementación." },
    { q: "¿Cuándo veo resultados?", a: "Los primeros sistemas de respuesta y presencia digital suelen estar listos entre los primeros 7 y 14 días." },
    { q: "¿Es para negocios pequeños?", a: "Es para cualquier negocio que tenga un flujo de clientes y quiera escalar sin aumentar proporcionalmente sus costos operativos." }
  ];

  const successStories = [
    { name: "LMS Finance", result: "-92% Tiempo", icon: <TrendingUp size={14} /> },
    { name: "Apex Medical", result: "+120 Citas", icon: <Zap size={14} /> }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionTheme = entry.target.getAttribute('data-theme');
          if (sectionTheme) setTheme(sectionTheme);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('[data-theme]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
        ctx.fillStyle = theme === 'dark' ? 'rgba(191, 255, 0, 0.15)' : 'rgba(0, 0, 0, 0.08)';
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
      const count = window.innerWidth < 768 ? 30 : 60;
      for (let i = 0; i < count; i++) {
        let size = Math.random() * 1.5 + 0.5;
        particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, (Math.random()-0.5)*0.2, (Math.random()-0.5)*0.2, size));
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
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 20);
      setShowFloatingBtn(scrollPos > 600);
      if (heroRef.current && window.innerWidth > 768) {
        heroRef.current.style.transform = `translateY(${scrollPos * 0.15}px)`;
        heroRef.current.style.opacity = 1 - scrollPos / 700;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if(element) {
        const offset = window.innerWidth < 768 ? 60 : 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans selection:bg-[#BFFF00] selection:text-black ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Instrument+Serif:ital@0;1&display=swap');
        body { font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        .btn-glow { box-shadow: 0 10px 30px -10px rgba(191, 255, 0, 0.5); }
        .btn-glow:hover { box-shadow: 0 15px 40px -5px rgba(191, 255, 0, 0.7); transform: translateY(-2px); }
        .mobile-card-shadow { box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40" />

      {/* 1. TOP BAR */}
      <div className="fixed top-0 w-full bg-[#BFFF00] text-black z-[70] py-1.5 px-4 text-center text-[9px] md:text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
        <AlertCircle size={12} />
        Cupos limitados — Mayo casi completo
      </div>

      {/* 2. NAVBAR */}
      <nav className={`fixed w-full z-[60] transition-all duration-300 ${isScrolled ? 'top-0 py-3 backdrop-blur-xl border-b border-white/5 bg-black/80' : 'top-6 py-4 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src={logoUrl} alt="Veluz" className="h-16 md:h-24 w-auto transition-transform active:scale-95" />
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => scrollToSection('servicios')} className="hidden md:block text-[10px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Servicios</button>
             <button onClick={() => scrollToSection('agendar')} className="bg-[#BFFF00] text-black px-5 py-2.5 md:px-7 md:py-3 rounded-full text-[10px] font-black uppercase tracking-widest btn-glow">
              Empezar
            </button>
          </div>
        </div>
      </nav>

      {/* 3. HERO */}
      <section data-theme="dark" className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center text-center px-6 z-10 pt-20">
        <div ref={heroRef} className="max-w-4xl w-full animate-float">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <div className="flex gap-0.5 text-[#BFFF00]">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
            </div>
            <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase text-slate-300">
              +21 Negocios Automatizados
            </span>
          </div>
          
          <h1 className="text-[42px] md:text-[85px] font-black tracking-tighter leading-[0.9] mb-6">
            Digitalizamos tu <br className="hidden md:block" />
            <span className="font-serif italic font-normal text-[#BFFF00]">negocio con IA.</span>
          </h1>

          <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed px-4">
            Convertimos operaciones manuales en <span className="text-white font-medium italic">sistemas rentables</span> que funcionan mientras duermes.
          </p>
          
          <div className="flex flex-col items-center gap-8">
            <button onClick={() => scrollToSection('agendar')} className="w-full sm:w-auto bg-[#BFFF00] text-black px-10 py-4.5 rounded-full font-black text-base flex items-center justify-center gap-3 btn-glow transition-all active:scale-95">
              Diagnóstico Gratis <ArrowRight size={20} />
            </button>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-40 grayscale">
              {successStories.map((story, i) => (
                <div key={i} className="flex items-center gap-2 text-[9px] md:text-[11px] font-bold tracking-widest uppercase border border-white/10 px-3 py-1.5 rounded-lg">
                  {story.icon} {story.name} · {story.result}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROBLEMA */}
      <section id="problema" data-theme="light" className="relative py-20 md:py-32 z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-tight mb-4 text-black uppercase">
              Cada día manual es <br />
              <span className="text-red-600">dinero perdido.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100 flex flex-col items-center text-center">
              <AlertTriangle className="text-red-500 mb-4" size={28} />
              <h3 className="text-lg font-bold text-red-900 mb-2">Ventas Perdidas</h3>
              <p className="text-red-900/60 text-xs leading-relaxed">El cliente elige al primero que responde. Si tardas, ya no es tu cliente.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
              <Clock className="text-zinc-400 mb-4" size={28} />
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Fuga de Tiempo</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">Tu equipo gasta el 60% del día en tareas que la IA ya resuelve.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
              <XCircle className="text-zinc-400 mb-4" size={28} />
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Invisibilidad</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">Si no existes en las búsquedas digitales, para el mercado no existes.</p>
            </div>
          </div>

          {/* Bloque Esperanza */}
          <div className="bg-black text-white p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#BFFF00]/10 blur-3xl rounded-full"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-[#BFFF00] font-black text-[10px] tracking-widest uppercase block mb-4">Existe una salida</span>
                <p className="text-2xl md:text-4xl font-bold leading-tight">
                  Sustituimos el caos manual por una arquitectura digital robusta.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  ["Tardar horas en responder", "Respuesta IA en segundos"],
                  ["Invisible en Google", "Autoridad Digital Top"],
                  ["Gestión en papel/Excel", "Dashboard Automático"]
                ].map(([bad, good], i) => (
                  <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-3">
                    <span className="text-[9px] text-red-400/50 line-through uppercase tracking-widest">{bad}</span>
                    <span className="text-[11px] text-white font-bold uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-[#BFFF00]" /> {good}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICIOS ACORDEÓN */}
      <section id="servicios" data-theme="dark" className="py-20 md:py-32 z-10 bg-[#080808] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-4">Ecosistema Veluz</h2>
            <p className="text-slate-400 text-sm md:text-lg">Soluciones integrales para la nueva era digital.</p>
          </div>

          <div className="divide-y divide-white/10">
            {services.map((s) => (
              <div key={s.id} className="group">
                <button 
                  onClick={() => setOpenService(openService === s.id ? null : s.id)}
                  className="w-full flex items-center justify-between py-8 text-left outline-none"
                >
                  <div className="flex items-center gap-5 md:gap-8">
                    <div className={`p-3 md:p-4 rounded-xl transition-all ${openService === s.id ? 'bg-[#BFFF00] text-black shadow-lg shadow-[#BFFF00]/20' : 'bg-white/5 text-[#BFFF00]'}`}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-black tracking-widest text-slate-500 mb-1">{s.tag}</p>
                      <h3 className={`text-xl md:text-3xl font-black transition-colors ${openService === s.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown className={`transition-transform duration-300 text-slate-600 ${openService === s.id ? 'rotate-180 text-[#BFFF00]' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openService === s.id ? 'max-h-[800px] pb-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="grid lg:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-6">
                        <p className="text-slate-300 text-sm md:text-lg leading-relaxed">"{s.desc}"</p>
                        <div className="flex flex-wrap gap-2">
                           {s.features.map((f, i) => (
                             <span key={i} className="text-[9px] md:text-[10px] font-bold px-3 py-1 bg-white/5 rounded-full border border-white/5 uppercase tracking-widest">{f}</span>
                           ))}
                        </div>
                      </div>
                      <div className="p-6 md:p-10 bg-zinc-900 rounded-[2.5rem] border border-white/10 text-center lg:text-left">
                        <p className="text-3xl md:text-5xl font-black text-white mb-2">{s.graph}</p>
                        <p className="text-[#BFFF00] text-[10px] font-black uppercase tracking-widest mb-6">{s.result}</p>
                        <button onClick={() => scrollToSection('agendar')} className="w-full py-4 bg-[#BFFF00] text-black rounded-full font-black text-xs uppercase tracking-widest">
                          Saber más
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PERFILES DE CLIENTE */}
      <section data-theme="light" className="py-20 md:py-32 z-10 bg-zinc-50 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">¿Es para ti?</h2>
          <p className="text-slate-500 text-sm md:text-lg mb-12">Si te identificas, estamos listos para trabajar.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Negocios Locales", d: "Quieres que la gente que busca en Google o mapas llegue a tu puerta física.", icon: <Search /> },
              { t: "PYMEs", d: "Necesitas crecer tus ingresos sin contratar a 5 personas más para administración.", icon: <Layers /> },
              { t: "Dueños Agotados", d: "Estás atrapado en el WhatsApp y el Excel todo el día. Te devolvemos tu tiempo.", icon: <Clock /> }
            ].map((p, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-zinc-100 text-left mobile-card-shadow">
                <div className="bg-black text-[#BFFF00] w-12 h-12 rounded-xl flex items-center justify-center mb-6">{p.icon}</div>
                <h3 className="font-bold text-lg mb-3">{p.t}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ SIMPLIFICADO */}
      <section data-theme="dark" className="py-20 bg-black px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-8 text-center uppercase tracking-widest">Dudas Rápidas</h2>
          <div className="space-y-3">
             {faqs.map((f, i) => (
               <div key={i} className="border border-white/5 rounded-2xl bg-white/[0.02]">
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center text-sm font-bold">
                    {f.q}
                    <ChevronDown size={14} className={activeFaq === i ? 'rotate-180' : ''} />
                  </button>
                  {activeFaq === i && <div className="px-6 pb-6 text-slate-400 text-xs leading-relaxed">{f.a}</div>}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 8. AGENDAR */}
      <section id="agendar" data-theme="dark" className="py-20 md:py-32 z-10 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-4">Agenda tu <span className="text-[#BFFF00]">Diagnóstico</span></h2>
            <p className="text-slate-500 text-sm uppercase tracking-widest font-black">25 minutos para cambiar tu negocio</p>
          </div>
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden h-[650px] md:h-[750px] shadow-2xl border border-[#BFFF00]/20">
            <iframe 
              src="https://calendly.com/veluz-agency/15min?hide_landing_page_details=1&primary_color=bfff00" 
              width="100%" height="100%" frameBorder="0" title="Calendly"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={logoUrl} alt="Veluz" className="h-14 opacity-60" />
          <div className="flex gap-8 text-[9px] font-black tracking-widest uppercase opacity-40">
            <a href="https://wa.me/573125923915" target="_blank" className="hover:text-[#BFFF00]">WhatsApp</a>
            <span>© 2026 Veluz Agency</span>
          </div>
        </div>
      </footer>

      {/* Floating CTA Mobile */}
      {showFloatingBtn && (
        <div className="fixed bottom-6 right-6 z-[80] md:hidden">
          <button 
            onClick={() => scrollToSection('agendar')}
            className="bg-[#BFFF00] text-black p-4 rounded-full shadow-2xl active:scale-90 transition-transform"
          >
            <Calendar size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
