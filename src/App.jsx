<!DOCTYPE html>

<html class="dark" lang="es"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Veluz Agency | Expertos en Escalamiento con IA</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&amp;family=Literata:ital,wght@1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        body {
            background-color: #131313;
            color: #e5e2e1;
            overflow-x: hidden;
            scroll-behavior: smooth;
        }
        .shadow-lima-glow {
            box-shadow: 0 10px 40px -10px rgba(191, 255, 0, 0.4);
        }
        .hover-lima-glow:hover {
            box-shadow: 0 15px 50px -5px rgba(191, 255, 0, 0.6);
            transform: translateY(-4px);
        }
        .glass-nav {
            backdrop-filter: blur(10px);
            background: rgba(19, 19, 19, 0.8);
            transition: all 0.3s ease;
        }
        .instrument-serif {
            font-family: 'Literata', serif;
            font-style: italic;
        }
        .pulse-dot {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(184, 246, 0, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(184, 246, 0, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(184, 246, 0, 0); }
        }

        /* Animation Classes */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }

        /* Micro-interactions */
        .card-hover-effect {
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .card-hover-effect:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -15px rgba(191, 255, 0, 0.25);
            border-color: rgba(191, 255, 0, 0.4);
        }

        .magnetic-cta {
            transition: transform 0.2s ease-out, box-shadow 0.3s ease;
        }

        /* Accordion Smoothness */
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
        .accordion-inner {
            overflow: hidden;
        }

        /* Pricing Card Transition */
        .pricing-card {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (prefers-reduced-motion: reduce) {
            .reveal, .card-hover-effect, .magnetic-cta, body {
                transition: none !important;
                animation: none !important;
                transform: none !important;
                opacity: 1 !important;
                scroll-behavior: auto !important;
            }
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "outline": "#8d9479",
                        "tertiary-container": "#e2e2e2",
                        "on-secondary-fixed": "#1c1b1b",
                        "error-container": "#93000a",
                        "on-surface-variant": "#c3caac",
                        "on-tertiary-fixed": "#1a1c1c",
                        "tertiary": "#ffffff",
                        "text-muted": "#E6E6E6",
                        "surface-container-low": "#1c1b1b",
                        "inverse-on-surface": "#313030",
                        "error": "#ffb4ab",
                        "secondary-container": "#474646",
                        "surface": "#131313",
                        "inverse-primary": "#4b6700",
                        "on-error": "#690005",
                        "on-secondary-fixed-variant": "#474646",
                        "surface-container": "#201f1f",
                        "primary-container": "#b8f600",
                        "primary-fixed": "#b8f600",
                        "on-tertiary": "#2f3131",
                        "primary-fixed-dim": "#a1d800",
                        "surface-bright": "#3a3939",
                        "lima-glow": "rgba(191, 255, 0, 0.4)",
                        "on-primary": "#263500",
                        "on-secondary": "#313030",
                        "on-tertiary-fixed-variant": "#454747",
                        "background": "#131313",
                        "on-background": "#e5e2e1",
                        "primary": "#ffffff",
                        "surface-tint": "#a1d800",
                        "on-error-container": "#ffdad6",
                        "tertiary-fixed-dim": "#c6c6c7",
                        "on-surface": "#e5e2e1",
                        "tertiary-fixed": "#e2e2e2",
                        "inverse-surface": "#e5e2e1",
                        "on-tertiary-container": "#636565",
                        "on-primary-fixed-variant": "#384e00",
                        "secondary-fixed": "#e5e2e1",
                        "surface-container-lowest": "#0e0e0e",
                        "pure-black": "#000000",
                        "on-secondary-container": "#b7b4b4",
                        "secondary": "#c9c6c5",
                        "surface-variant": "#353534",
                        "subtle-border": "rgba(255, 255, 255, 0.05)",
                        "on-primary-container": "#506e00",
                        "surface-dim": "#131313",
                        "secondary-fixed-dim": "#c9c6c5",
                        "surface-container-highest": "#353534",
                        "on-primary-fixed": "#141f00",
                        "outline-variant": "#434933",
                        "surface-container-high": "#2a2a2a"
                    },
                    "borderRadius": {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "24px",
                        "section-padding-desktop": "160px",
                        "container-max": "1440px",
                        "base": "8px",
                        "section-padding-mobile": "80px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Outfit"],
                        "display-xl": ["Outfit"],
                        "body-lg": ["Outfit"],
                        "accent-italic": ["Literata"],
                        "headline-lg-mobile": ["Outfit"],
                        "body-md": ["Outfit"],
                        "display-xl-mobile": ["Outfit"],
                        "label-caps": ["Outfit"]
                    },
                    "fontSize": {
                        "headline-lg": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.03em", "fontWeight": "900"}],
                        "display-xl": ["80px", {"lineHeight": "1.0", "letterSpacing": "-0.05em", "fontWeight": "900"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "accent-italic": ["1.1em", {"fontWeight": "400"}],
                        "headline-lg-mobile": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "900"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "300"}],
                        "display-xl-mobile": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "900"}],
                        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "700"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-background">
<!-- 1. Urgency Bar -->
<div class="fixed top-0 w-full z-[60] bg-primary-fixed py-2 px-gutter text-center transition-all duration-500 ease-in-out" id="urgency-bar">
<p class="font-label-caps text-label-caps text-pure-black tracking-widest uppercase flex items-center justify-center gap-2">
        Cupos limitados — Mayo casi completo — <span class="underline cursor-pointer font-bold">[Reservar Ahora]</span>
<button class="ml-4 material-symbols-outlined text-sm hover:scale-110 transition-transform" onclick="closeUrgencyBar()">close</button>
</p>
</div>
<!-- 2. Navbar -->
<nav class="fixed top-10 left-0 w-full z-50 glass-nav border-b border-subtle-border" id="main-nav">
<div class="max-w-container-max mx-auto px-gutter py-4 flex justify-between items-center">
<div class="flex items-center gap-2">
<img alt="Veluz Logo" class="h-10 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACLovepYbdzp4EuubRg6i8iKe2Grb_EDqGNgDcK55I54m6gPU5xdOcByX9vTrLf7w0YAS0vY-_2u5lk710G6SpE7JvIOTGV9ytpqz1GeLhuG8s3jdK58a3jOJCZdghv0Bp6SSjDEX-Jmo1r15x7sXwFhps1Z8gudHiz0as4XXFZd4JbPvBpK6uDP7NsknKW-7CXPd0ddgYWjkB06-P5OKsng0o3rNi0Qile3h9EY9qKDd9zSWNbIjY915pQ9onVLHafAqMZaSEwE6k"/>
</div>
<div class="hidden md:flex items-center gap-8">
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary-fixed transition-colors" href="#problema">El Problema</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary-fixed transition-colors" href="#metodo">Método</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary-fixed transition-colors" href="#servicios">Servicios</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary-fixed transition-colors" href="#precios">Inversión</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary-fixed transition-colors" href="#faq">Dudas</a>
</div>
<button class="magnetic-cta bg-primary-fixed text-on-primary-fixed font-bold font-body-md py-3 px-8 rounded-full shadow-lima-glow hover-lima-glow active:scale-95">
            Diagnóstico
        </button>
</div>
</nav>
<!-- 3. Hero Section -->
<section class="reveal relative min-h-screen flex flex-col justify-center items-center text-center px-gutter pt-32 overflow-hidden bg-pure-black">
<canvas class="absolute inset-0 z-0 pointer-events-none" id="particleCanvas"></canvas>
<div class="relative z-10 max-w-4xl">
<div class="inline-flex items-center gap-3 bg-surface-container/50 border border-subtle-border px-4 py-2 rounded-full mb-8">
<span class="w-3 h-3 bg-primary-fixed rounded-full pulse-dot"></span>
<p class="font-label-caps text-label-caps text-primary-fixed">5 negocios activados este mes</p>
</div>
<h1 class="font-display-xl text-display-xl-mobile md:text-display-xl text-primary mb-8 leading-tight">
            Digitalizamos tu <br/>
<span class="instrument-serif text-primary-fixed">negocio con IA.</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Escala tus operaciones, elimina cuellos de botella y multiplica tu facturación con infraestructura digital de élite.
        </p>
<button class="magnetic-cta bg-primary-fixed text-on-primary-fixed font-bold font-headline-lg-mobile md:font-headline-lg py-5 px-12 rounded-full shadow-lima-glow hover-lima-glow flex items-center gap-4 mx-auto group">
            Diagnóstico Gratis 
            <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
</button>
</div>
</section>
<!-- 4. For Who Section -->
<section class="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest">
<div class="max-w-container-max mx-auto px-gutter">
<div class="grid grid-cols-1 md:grid-cols-3 gap-base">
<!-- Card 1 -->
<div class="reveal p-12 rounded-lg bg-surface-container-low border border-subtle-border group card-hover-effect">
<span class="material-symbols-outlined text-primary-fixed text-4xl mb-6 transition-transform group-hover:scale-110">person</span>
<h3 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-4">Dueños de Negocio</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Cansados de ser el cuello de botella de su propia operación. El negocio depende de que ellos estén presentes para funcionar.</p>
</div>
<!-- Card 2 -->
<div class="reveal p-12 rounded-lg bg-surface-container-low border border-subtle-border group card-hover-effect" style="transition-delay: 0.1s">
<span class="material-symbols-outlined text-primary-fixed text-4xl mb-6 transition-transform group-hover:scale-110">payments</span>
<h3 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-4">Servicios High-Ticket</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Clínicas, firmas o consultores que pierden ventas por no responder a tiempo. Cada lead ignorado vale cientos de miles de pesos.</p>
</div>
<!-- Card 3 -->
<div class="reveal p-12 rounded-lg bg-surface-container-low border border-subtle-border group card-hover-effect" style="transition-delay: 0.2s">
<span class="material-symbols-outlined text-primary-fixed text-4xl mb-6 transition-transform group-hover:scale-110">trending_up</span>
<h3 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-4">Negocios Escalables</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Empresas que quieren crecer sin multiplicar su nómina. Escalan con tecnología, no con más empleados.</p>
</div>
</div>
</div>
</section>
<!-- 5. The Problem Section (Contrast Block) -->
<section class="py-section-padding-mobile md:py-section-padding-desktop bg-white text-pure-black overflow-hidden" id="problema">
<div class="max-w-container-max mx-auto px-gutter">
<div class="reveal flex flex-col md:flex-row justify-between items-end mb-20">
<h2 class="font-display-xl text-display-xl-mobile md:text-display-xl text-pure-black max-w-2xl">
                Operar manual es <br/>
<span class="text-error font-black uppercase inline-block hover:scale-105 transition-transform duration-300">QUEMAR DINERO</span>
</h2>
<p class="font-body-lg text-body-lg max-w-sm mb-4">Mientras tú pierdes tiempo en tareas repetitivas, tu competencia está automatizando con nosotros.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
<div class="reveal bg-tertiary-container p-12 rounded-lg card-hover-effect">
<div class="flex items-center gap-4 mb-8">
<span class="material-symbols-outlined text-error text-4xl">warning</span>
<h4 class="font-headline-lg-mobile text-headline-lg-mobile font-bold">Sin Veluz</h4>
</div>
<ul class="space-y-6">
<li class="flex items-start gap-4 font-body-lg group">
<span class="material-symbols-outlined text-error transition-transform group-hover:scale-125">close</span>
                        Procesos lentos y dependientes de humanos.
                    </li>
<li class="flex items-start gap-4 font-body-lg group">
<span class="material-symbols-outlined text-error transition-transform group-hover:scale-125">close</span>
                        Errores constantes en la gestión de leads.
                    </li>
<li class="flex items-start gap-4 font-body-lg group">
<span class="material-symbols-outlined text-error transition-transform group-hover:scale-125">close</span>
                        Cero visibilidad de datos para decidir.
                    </li>
</ul>
</div>
<div class="reveal bg-primary-fixed p-12 rounded-lg shadow-xl card-hover-effect" style="transition-delay: 0.15s">
<div class="flex items-center gap-4 mb-8">
<span class="material-symbols-outlined text-pure-black text-4xl">check_circle</span>
<h4 class="font-headline-lg-mobile text-headline-lg-mobile font-bold">Efecto Veluz</h4>
</div>
<ul class="space-y-6">
<li class="flex items-start gap-4 font-body-lg group">
<span class="material-symbols-outlined text-on-primary-fixed transition-transform group-hover:scale-125">done_all</span>
                        Operaciones autónomas 24/7 con IA.
                    </li>
<li class="flex items-start gap-4 font-body-lg group">
<span class="material-symbols-outlined text-on-primary-fixed transition-transform group-hover:scale-125">done_all</span>
                        Conversión automática de leads calificados.
                    </li>
<li class="flex items-start gap-4 font-body-lg group">
<span class="material-symbols-outlined text-on-primary-fixed transition-transform group-hover:scale-125">done_all</span>
                        Crecimiento predecible basado en métricas reales.
                    </li>
</ul>
</div>
</div>
</div>
</section>
<!-- 6. The Method Section -->
<section class="py-section-padding-mobile md:py-section-padding-desktop bg-pure-black" id="metodo">
<div class="max-w-container-max mx-auto px-gutter">
<div class="reveal text-center mb-24">
<span class="font-label-caps text-label-caps text-primary-fixed tracking-widest uppercase">Nuestra Ingeniería</span>
<h2 class="font-display-xl text-display-xl-mobile md:text-display-xl text-primary mt-6">Método Veluz-3X</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-base relative">
<!-- Step 1 -->
<div class="reveal relative p-12 bg-surface-container-lowest border border-subtle-border rounded-lg h-full card-hover-effect group">
<div class="text-primary-fixed font-black text-8xl opacity-10 absolute top-4 right-8 transition-all group-hover:opacity-20 group-hover:scale-110">01</div>
<h3 class="font-headline-lg-mobile text-headline-lg-mobile mb-6 text-primary">Auditoría</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Desnudamos tu negocio para encontrar las fugas de dinero y tiempo. No asumimos, medimos.</p>
</div>
<!-- Step 2 -->
<div class="reveal relative p-12 bg-surface-container-lowest border border-subtle-border rounded-lg h-full card-hover-effect group" style="transition-delay: 0.1s">
<div class="text-primary-fixed font-black text-8xl opacity-10 absolute top-4 right-8 transition-all group-hover:opacity-20 group-hover:scale-110">02</div>
<h3 class="font-headline-lg-mobile text-headline-lg-mobile mb-6 text-primary">Diseño</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Construimos la infraestructura digital a medida: CRM, IA, Funnels y Automatizaciones.</p>
</div>
<!-- Step 3 -->
<div class="reveal relative p-12 bg-surface-container-lowest border border-subtle-border rounded-lg h-full card-hover-effect group" style="transition-delay: 0.2s">
<div class="text-primary-fixed font-black text-8xl opacity-10 absolute top-4 right-8 transition-all group-hover:opacity-20 group-hover:scale-110">03</div>
<h3 class="font-headline-lg-mobile text-headline-lg-mobile mb-6 text-primary">Escalado</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Encendemos la máquina. Optimizamos en tiempo real para maximizar el ROI de cada peso invertido.</p>
</div>
</div>
</div>
</section>
<!-- 7. Services Section (Accordion Style) -->
<section class="py-section-padding-mobile md:py-section-padding-desktop bg-surface" id="servicios">
<div class="max-w-container-max mx-auto px-gutter">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
<div>
<h2 class="reveal font-display-xl text-display-xl-mobile md:text-display-xl text-primary mb-12">Lo que <br/><span class="instrument-serif text-primary-fixed">activamos.</span></h2>
<div class="space-y-6">
<!-- Service 1 -->
<div class="reveal service-accordion border-b border-subtle-border pb-6 group cursor-pointer" onclick="toggleService(0)">
<div class="flex justify-between items-center mb-4">
<div class="flex items-center gap-4">
<span class="bg-primary-fixed/10 text-primary-fixed px-3 py-1 rounded-full font-label-caps text-[10px] tracking-widest">INTELIGENCIA</span>
<h4 class="font-headline-lg-mobile text-headline-lg-mobile group-hover:text-primary-fixed transition-colors">Agentes IA Nativa</h4>
</div>
<span class="material-symbols-outlined text-primary-fixed transition-all duration-300 accordion-icon">add</span>
</div>
<div class="accordion-content">
<div class="accordion-inner">
<p class="font-body-md text-body-md text-on-surface-variant mb-4">Entrenamos cerebros digitales con el conocimiento de tu empresa. No son simples bots — son vendedores que razonan, califican leads y agendan citas sin que muevas un dedo.</p>
<img alt="Futuristic AI control room" class="w-full h-48 object-cover rounded-lg border border-subtle-border transition-transform hover:scale-[1.02] duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6bbfJ8zlz9-dUT_FpXAE8caXm4vT4V16gkXt8yCDpAUi95M1pOui3QoKHSCz63CXQFVTOSelOcsQUY4GPggC4QntrAwBc7ZPA4vFBp830tKMTyt2Dgy1BqFm3zNSo6zJZhQnqxxrKX6SSOLm_-VOLqAbFEF1owKAN1Wcmluh8YolC1QE1eBkltzI4xL92IRWFhUzuMcclqIZ8SKCs7i7GLpRY0Czo3FFWsNKvtUfiDhbyXa4C5jN_kf8QTkR5UHdv-w0hs_Y9fCo9"/>
</div>
</div>
</div>
<!-- Service 2 -->
<div class="reveal service-accordion border-b border-subtle-border pb-6 group cursor-pointer" onclick="toggleService(1)">
<div class="flex justify-between items-center mb-4">
<div class="flex items-center gap-4">
<span class="bg-primary-fixed/10 text-primary-fixed px-3 py-1 rounded-full font-label-caps text-[10px] tracking-widest">VISIBILIDAD</span>
<h4 class="font-headline-lg-mobile text-headline-lg-mobile group-hover:text-primary-fixed transition-colors">Contenido Orgánico &amp; GEO</h4>
</div>
<span class="material-symbols-outlined text-primary-fixed transition-all duration-300 accordion-icon">add</span>
</div>
<div class="accordion-content">
<div class="accordion-inner">
<p class="font-body-md text-body-md text-on-surface-variant mb-4">Construimos autoridad real sin gastar en anuncios. Creamos contenido que los motores de búsqueda tradicionales y las IAs como ChatGPT y Gemini aman citar. Tu negocio aparece cuando buscan lo que ofreces.</p>
<img alt="High-end digital infrastructure" class="w-full h-48 object-cover rounded-lg border border-subtle-border transition-transform hover:scale-[1.02] duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjYGNSH9-6iuSjhNAIG5D_-s7PL5j-kpcw3NuJUjip4BResRBnouB_yeNyzb4wG3tb0EeEHX97S0-7dU81_Nf30ZD3w6ijJ_P1lzvPyez7m3Sh37J36Gxsbfsuax6oReqrfbBNC7yFoFbcAYdPioh4zdxa1fkVhaUoZ9ZMNa9CFirOk8sXLNYY1D_vbo-S1MiTpf624029lAJJA3uSIHHbmde2x0ligvE951l1RhlQ_rXd-rY0y8YtZO_foizoFvLcgndxvA8QOwuo"/>
</div>
</div>
</div>
<!-- Service 3 -->
<div class="reveal service-accordion border-b border-subtle-border pb-6 group cursor-pointer" onclick="toggleService(2)">
<div class="flex justify-between items-center mb-4">
<div class="flex items-center gap-4">
<span class="bg-primary-fixed/10 text-primary-fixed px-3 py-1 rounded-full font-label-caps text-[10px] tracking-widest">EFICIENCIA</span>
<h4 class="font-headline-lg-mobile text-headline-lg-mobile group-hover:text-primary-fixed transition-colors">Automatización de Procesos</h4>
</div>
<span class="material-symbols-outlined text-primary-fixed transition-all duration-300 accordion-icon">add</span>
</div>
<div class="accordion-content">
<div class="accordion-inner">
<p class="font-body-md text-body-md text-on-surface-variant mb-4">Conectamos tu CRM, pagos y administración para eliminar tareas manuales repetitivas. Si tu equipo lo hace a mano todos los días, nosotros lo convertimos en código que corre solo.</p>
<img alt="Business automation visualization" class="w-full h-48 object-cover rounded-lg border border-subtle-border transition-transform hover:scale-[1.02] duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJctiDRFrXf5px-JVKkYWVMyNpJAcummv6sKwaRXosHo9XqFKLD3LgK8P29HSk2cW_pGnzeJWcvLnOfqhBDhF-kmGJC8y_2wqVbL5rbY3Kb1gbJOJIGx_eGT1W8iiBrLS-KZ-NwPpPHHDIJS0SpptMZJwHt8TzByxIRn9Gd5-bWfxNuLpZo2pE9gfPDlAGgFYoQjKWFFtR9XRV0lCjSNdTbmvjRJFsUv7tnb2fb8vZB8OmjJjZZx3Zrk9SwvRnAfIsKnSPwd-T46J2"/>
</div>
</div>
</div>
</div>
</div>
<div class="reveal relative flex items-center justify-center">
<div class="w-full aspect-square bg-surface-container-low rounded-xl border border-subtle-border flex flex-col items-center justify-center p-12 text-center group overflow-hidden">
<div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed/10 blur-[100px] transition-all group-hover:bg-primary-fixed/20"></div>
<span class="material-symbols-outlined text-primary-fixed text-8xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">insights</span>
<h5 class="font-headline-lg text-headline-lg mb-4">+300%</h5>
<p class="font-body-lg text-body-lg text-on-surface-variant">Incremento promedio en eficiencia operativa reportado por nuestros clientes tras los primeros 90 días.</p>
</div>
</div>
</div>
</div>
</section>
<!-- 8. Case Study LMS Finance -->
<section class="py-section-padding-mobile md:py-section-padding-desktop bg-primary-fixed text-pure-black overflow-hidden">
<div class="max-w-container-max mx-auto px-gutter">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div class="reveal">
<span class="font-label-caps text-label-caps border border-pure-black/20 px-4 py-2 rounded-full mb-8 inline-block uppercase">Caso de Éxito: LMS Finance</span>
<h2 class="font-display-xl text-display-xl-mobile md:text-display-xl font-black mb-8">De procesos rotos a una máquina de escala.</h2>
<p class="font-body-lg text-body-lg font-medium opacity-80 mb-12">"Veluz no solo instaló software, nos instaló una nueva mentalidad operativa. Hoy crecemos sin miedo al colapso."</p>
<div class="flex items-center gap-4 group">
<div class="w-16 h-16 bg-pure-black rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
<span class="material-symbols-outlined text-primary-fixed">person</span>
</div>
<div>
<p class="font-body-md font-bold">Andrés G.</p>
<p class="font-label-caps text-[10px]">CEO - LMS Finance</p>
</div>
</div>
</div>
<div class="grid grid-cols-2 gap-base">
<div class="reveal bg-pure-black text-primary-fixed p-8 rounded-lg text-center flex flex-col justify-center border border-primary-fixed/20 hover:scale-105 transition-transform duration-300">
<span class="font-display-xl text-display-xl-mobile">-92%</span>
<span class="font-label-caps text-label-caps">TIEMPO MANUAL</span>
</div>
<div class="reveal bg-pure-black text-primary-fixed p-8 rounded-lg text-center flex flex-col justify-center border border-primary-fixed/20 hover:scale-105 transition-transform duration-300" style="transition-delay: 0.1s">
<span class="font-display-xl text-display-xl-mobile">5X</span>
<span class="font-label-caps text-label-caps">FACTURACIÓN</span>
</div>
<div class="reveal bg-pure-black text-primary-fixed p-8 rounded-lg text-center flex flex-col justify-center border border-primary-fixed/20 hover:scale-105 transition-transform duration-300" style="transition-delay: 0.2s">
<span class="font-display-xl text-display-xl-mobile">0</span>
<span class="font-label-caps text-label-caps">FUGAS DE LEADS</span>
</div>
<div class="reveal bg-pure-black text-primary-fixed p-8 rounded-lg text-center flex flex-col justify-center border border-primary-fixed/20 hover:scale-105 transition-transform duration-300" style="transition-delay: 0.3s">
<span class="font-display-xl text-display-xl-mobile">30D</span>
<span class="font-label-caps text-label-caps">IMPLANTACIÓN</span>
</div>
</div>
</div>
</div>
</section>
<!-- 9. Pricing Section -->
<section class="py-section-padding-mobile md:py-section-padding-desktop bg-background overflow-hidden" id="precios">
<div class="max-w-container-max mx-auto px-gutter">
<div class="reveal text-center mb-20">
<h2 class="font-display-xl text-display-xl-mobile md:text-display-xl text-primary mb-8">Inversión en <span class="instrument-serif text-primary-fixed">Activos.</span></h2>
<div class="flex justify-center gap-4 flex-wrap">
<button class="bg-primary-fixed text-on-primary-fixed px-6 py-2 rounded-full font-label-caps text-label-caps filter-btn active-filter" onclick="filterPricing('todos', this)">Todos</button>
<button class="bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-label-caps text-label-caps hover:text-primary-fixed transition-colors filter-btn" onclick="filterPricing('activos', this)">Activos (Pago único)</button>
<button class="bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-label-caps text-label-caps hover:text-primary-fixed transition-colors filter-btn" onclick="filterPricing('soporte', this)">Con soporte mensual</button>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-base transition-all duration-500" id="pricing-grid">
<!-- Card 1 -->
<div class="reveal p-10 rounded-lg bg-surface-container-lowest border border-subtle-border pricing-card card-hover-effect" data-category="activos">
<h4 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">Página Web Profesional</h4>
<p class="font-body-md text-on-surface-variant mb-8">Landing de alta conversión, lista en 7 días. El sitio te pertenece para siempre.</p>
<div class="mb-8">
<span class="text-primary font-black text-4xl">$500.000 – $600.000 COP</span>
<span class="text-on-surface-variant font-label-caps block mt-2">Pago único · Activo tuyo</span>
<span class="text-on-surface-variant text-sm block mt-1">~$50.000 COP / año renovación dominio (lo paga el cliente directo)</span>
</div>
<ul class="space-y-4 mb-10 text-on-surface-variant font-body-md">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed text-sm">check</span> Diseño Custom</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed text-sm">check</span> Alta Conversión</li>
</ul>
<button class="w-full py-4 rounded-full border border-primary-fixed text-primary-fixed font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition-all active:scale-95">Seleccionar</button>
</div>
<!-- Card 2 (Featured) -->
<div class="reveal p-10 rounded-lg bg-surface-container border-2 border-primary-fixed pricing-card relative card-hover-effect" data-category="activos" style="transition-delay: 0.1s">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-fixed text-pure-black px-4 py-1 rounded-full font-label-caps text-[10px] font-black">MÁS POPULAR</div>
<h4 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">Pack Presencia Digital</h4>
<p class="font-body-md text-on-surface-variant mb-8">Web + Google Maps optimizado + 1 red social gestionada + 5 piezas de contenido orgánico al mes.</p>
<div class="mb-8">
<span class="text-primary font-black text-4xl">$1.000.000 COP</span>
<span class="text-on-surface-variant font-label-caps block mt-2">Pago único · Setup completo</span>
<span class="text-on-surface-variant text-sm block mt-1">$50.000 – $100.000 COP / mes (gestión de contenido, a convenir)</span>
</div>
<ul class="space-y-4 mb-10 text-on-surface-variant font-body-md">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed text-sm">check</span> Setup SEO</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed text-sm">check</span> Google My Business</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed text-sm">check</span> Contenido Inicial</li>
</ul>
<button class="w-full py-4 rounded-full bg-primary-fixed text-on-primary-fixed font-bold shadow-lima-glow hover-lima-glow transition-all active:scale-95">Empezar Ahora</button>
</div>
<!-- Card 3 -->
<div class="reveal p-10 rounded-lg bg-surface-container-lowest border border-subtle-border pricing-card card-hover-effect" data-category="soporte" style="transition-delay: 0.2s">
<h4 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">Chatbot WhatsApp con IA</h4>
<p class="font-body-md text-on-surface-variant mb-8">Agente inteligente que responde, califica leads y agenda citas solo. 24/7, sin intervención humana.</p>
<div class="mb-8">
<span class="text-primary font-black text-4xl">$650.000 COP</span>
<span class="text-on-surface-variant font-label-caps block mt-2">Setup e instalación</span>
<span class="text-on-surface-variant text-sm block mt-1">+ $100.000 COP / mes (operación y soporte continuo)</span>
</div>
<ul class="space-y-4 mb-10 text-on-surface-variant font-body-md">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed text-sm">check</span> Respuestas 24/7</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed text-sm">check</span> Calificación Automática</li>
</ul>
<button class="w-full py-4 rounded-full border border-primary-fixed text-primary-fixed font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition-all active:scale-95">Saber Más</button>
</div>
<!-- Card 4 -->
<div class="reveal p-10 rounded-lg bg-surface-container-lowest border border-subtle-border pricing-card card-hover-effect" data-category="activos" style="transition-delay: 0.3s">
<h4 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">Automatizaciones a Medida</h4>
<p class="font-body-md text-on-surface-variant mb-8">Conectamos tus sistemas y eliminamos procesos manuales. Si es repetitivo, lo convertimos en código que corre solo.</p>
<div class="mb-8">
<span class="text-primary font-black text-4xl">Desde $800.000 COP</span>
<span class="text-on-surface-variant font-label-caps block mt-2">Según complejidad del flujo</span>
<span class="text-on-surface-variant text-sm block mt-1">Sin costo mensual adicional</span>
</div>
<ul class="space-y-4 mb-10 text-on-surface-variant font-body-md">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed text-sm">check</span> Integración de Apps</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed text-sm">check</span> Flujos Custom</li>
</ul>
<button class="w-full py-4 rounded-full border border-primary-fixed text-primary-fixed font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition-all active:scale-95">Contratar</button>
</div>
</div>
</div>
</section>
<!-- 10. FAQ Section -->
<section class="py-section-padding-mobile md:py-section-padding-desktop bg-pure-black" id="faq">
<div class="max-w-3xl mx-auto px-gutter">
<h2 class="reveal font-headline-lg text-headline-lg-mobile md:text-headline-lg text-center mb-16">Preguntas <span class="instrument-serif text-primary-fixed">frecuentes.</span></h2>
<div class="space-y-4">
<div class="reveal bg-surface-container-lowest rounded-lg border border-subtle-border overflow-hidden transition-all duration-300 hover:border-primary-fixed/20">
<button class="w-full p-6 text-left flex justify-between items-center group" onclick="toggleFaq(this)">
<span class="font-body-lg font-bold">¿Cuánto tiempo tarda la implementación?</span>
<span class="material-symbols-outlined transition-transform duration-300">expand_more</span>
</button>
<div class="px-6 pb-6 text-on-surface-variant font-body-md hidden opacity-0 transition-opacity duration-300">
                    Nuestros despliegues estándar toman entre 15 y 30 días, dependiendo de la complejidad de tus sistemas actuales.
                </div>
</div>
<div class="reveal bg-surface-container-lowest rounded-lg border border-subtle-border overflow-hidden transition-all duration-300 hover:border-primary-fixed/20">
<button class="w-full p-6 text-left flex justify-between items-center group" onclick="toggleFaq(this)">
<span class="font-body-lg font-bold">¿Necesito conocimientos técnicos?</span>
<span class="material-symbols-outlined transition-transform duration-300">expand_more</span>
</button>
<div class="px-6 pb-6 text-on-surface-variant font-body-md hidden opacity-0 transition-opacity duration-300">
                    Ninguno. Nosotros nos encargamos de toda la "fontanería digital" para que tú solo tengas que manejar el dashboard que creamos para ti.
                </div>
</div>
<div class="reveal bg-surface-container-lowest rounded-lg border border-subtle-border overflow-hidden transition-all duration-300 hover:border-primary-fixed/20">
<button class="w-full p-6 text-left flex justify-between items-center group" onclick="toggleFaq(this)">
<span class="font-body-lg font-bold">¿La IA reemplaza a mi equipo?</span>
<span class="material-symbols-outlined transition-transform duration-300">expand_more</span>
</button>
<div class="px-6 pb-6 text-on-surface-variant font-body-md hidden opacity-0 transition-opacity duration-300">
                    La IA los potencia. Elimina las tareas de bajo valor para que tu equipo se concentre en estrategia, creatividad y cierre de ventas de alto impacto.
                </div>
</div>
<div class="reveal bg-surface-container-lowest rounded-lg border border-subtle-border overflow-hidden transition-all duration-300 hover:border-primary-fixed/20">
<button class="w-full p-6 text-left flex justify-between items-center group" onclick="toggleFaq(this)">
<span class="font-body-lg font-bold">¿Qué pasa si ya tengo un CRM?</span>
<span class="material-symbols-outlined transition-transform duration-300">expand_more</span>
</button>
<div class="px-6 pb-6 text-on-surface-variant font-body-md hidden opacity-0 transition-opacity duration-300">
                    Nos integramos a lo que ya tienes o te ayudamos a migrar a una solución más eficiente si detectamos que tu sistema actual es un cuello de botella.
                </div>
</div>
</div>
</div>
</section>
<!-- 11. Footer -->
<footer class="bg-pure-black border-t border-subtle-border py-section-padding-mobile">
<div class="max-w-container-max mx-auto px-gutter">
<div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
<div class="col-span-1 md:col-span-2 reveal">
<div class="flex items-center gap-2 mb-8 group cursor-default">
<img alt="Veluz Logo" class="h-10 w-auto transition-transform group-hover:rotate-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACLovepYbdzp4EuubRg6i8iKe2Grb_EDqGNgDcK55I54m6gPU5xdOcByX9vTrLf7w0YAS0vY-_2u5lk710G6SpE7JvIOTGV9ytpqz1GeLhuG8s3jdK58a3jOJCZdghv0Bp6SSjDEX-Jmo1r15x7sXwFhps1Z8gudHiz0as4XXFZd4JbPvBpK6uDP7NsknKW-7CXPd0ddgYWjkB06-P5OKsng0o3rNi0Qile3h9EY9qKDd9zSWNbIjY915pQ9onVLHafAqMZaSEwE6k"/>
</div>
<p class="font-body-lg text-on-surface-variant max-w-sm">La agencia de escalamiento digital para líderes que no aceptan la mediocridad operativa.</p>
</div>
<div class="reveal" style="transition-delay: 0.1s">
<h5 class="font-label-caps text-label-caps text-primary mb-8">NAVEGACIÓN</h5>
<ul class="space-y-4 font-body-md text-on-surface-variant">
<li><a class="hover:text-primary-fixed transition-all hover:pl-2" href="#">Servicios</a></li>
<li><a class="hover:text-primary-fixed transition-all hover:pl-2" href="#">Método</a></li>
<li><a class="hover:text-primary-fixed transition-all hover:pl-2" href="#">Precios</a></li>
</ul>
</div>
<div class="reveal" style="transition-delay: 0.2s">
<h5 class="font-label-caps text-label-caps text-primary mb-8">LEGAL &amp; SOCIAL</h5>
<ul class="space-y-4 font-body-md text-on-surface-variant">
<li><a class="hover:text-primary-fixed transition-all hover:pl-2" href="#">Privacidad</a></li>
<li><a class="hover:text-primary-fixed transition-all hover:pl-2" href="#">Términos</a></li>
<li><a class="hover:text-primary-fixed transition-all hover:pl-2" href="#">LinkedIn</a></li>
<li><a class="hover:text-primary-fixed transition-all hover:pl-2" href="#">Instagram</a></li>
<li><a class="hover:text-primary-fixed transition-all hover:pl-2" href="https://wa.me/573125923915" target="_blank">WhatsApp Soporte</a></li>
</ul>
</div>
</div>
<div class="pt-8 border-t border-subtle-border flex flex-col md:flex-row justify-between items-center gap-4 reveal">
<p class="font-label-caps text-[10px] text-on-surface-variant">© 2026 Veluz Agency. Todos los derechos reservados.</p>
<p class="font-label-caps text-[10px] text-on-surface-variant">HECHO EN COLOMBIA PARA EL MUNDO.</p>
</div>
</div>
</footer>
<script>
    // Particle Background Enhancements
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.onresize = resize;
    resize();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = 'rgba(191, 255, 0, ';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Interaction with mouse
            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    this.x -= dx * 0.01;
                    this.y -= dy * 0.01;
                }
            }

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    // Reveal on Scroll Implementation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Magnetic CTA Effect
    document.querySelectorAll('.magnetic-cta').forEach(cta => {
        cta.addEventListener('mousemove', (e) => {
            const rect = cta.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            cta.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        cta.addEventListener('mouseleave', () => {
            cta.style.transform = `translate(0px, 0px)`;
        });
    });

    // UI Interactions
    function toggleService(index) {
        const contents = document.querySelectorAll('.accordion-content');
        const icons = document.querySelectorAll('.accordion-icon');
        
        contents.forEach((content, i) => {
            if(i === index) {
                content.classList.toggle('active');
                icons[i].style.transform = content.classList.contains('active') ? 'rotate(135deg)' : 'rotate(0deg)';
                icons[i].innerText = content.classList.contains('active') ? 'add' : 'add'; // keep add but rotate
            } else {
                content.classList.remove('active');
                icons[i].style.transform = 'rotate(0deg)';
            }
        });
    }

    function toggleFaq(btn) {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.material-symbols-outlined');
        const isHidden = content.classList.contains('hidden');
        
        if (isHidden) {
            content.classList.remove('hidden');
            setTimeout(() => content.classList.add('opacity-100'), 10);
            icon.style.transform = 'rotate(180deg)';
        } else {
            content.classList.remove('opacity-100');
            setTimeout(() => content.classList.add('hidden'), 300);
            icon.style.transform = 'rotate(0deg)';
        }
    }

    function filterPricing(category, btn) {
        // Update buttons
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-primary-fixed', 'text-on-primary-fixed');
            b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
        });
        btn.classList.add('bg-primary-fixed', 'text-on-primary-fixed');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');

        const cards = document.querySelectorAll('.pricing-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (category === 'todos' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    }

    function closeUrgencyBar() {
        const bar = document.getElementById('urgency-bar');
        const nav = document.getElementById('main-nav');
        bar.style.transform = 'translateY(-100%)';
        bar.style.opacity = '0';
        nav.style.top = '0';
        setTimeout(() => bar.remove(), 500);
    }

    // Scroll Navbar effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('py-2');
            nav.classList.remove('py-4');
        } else {
            nav.classList.add('py-4');
            nav.classList.remove('py-2');
        }
    });
</script>
</body></html>
