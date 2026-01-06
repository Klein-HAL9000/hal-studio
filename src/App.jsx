import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Mail, 
  ArrowUpRight, 
  BookOpen, 
  Cpu, 
  Layers, 
  Zap, 
  Book, 
  Mic, 
  Clapperboard,
  ChevronRight,
  MapPin,
  Calendar,
  Link as LinkIcon,
  ShieldCheck,
  Search,
  Send,
  MessageSquare,
  Copy,
  Check,
  User,
  Code,
  Sparkles
} from 'lucide-react';

// --- PROJECT DATA (English Primary) ---
const PROJECTS = [
  {
    id: 'lepus',
    enTitle: 'Lepus AI',
    title: '兔子助教',
    desc: 'Generates PPT courseware, teaching aids, and transcripts in one click. Empowering educators with AI.',
    status: 'Building',
    tags: ['PPT Engine', 'EdTech'],
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    size: 'large',
  },
  {
    id: 'veritas',
    enTitle: 'Veritas',
    title: '省省论文',
    desc: 'Multi-agent collaboration for academic plagiarism checks, AI detection, and deep stylistic editing.',
    status: 'In Ideation',
    tags: ['Multi-Agent', 'Academic'],
    icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
  },
  {
    id: 'scholars',
    enTitle: 'Scholars',
    title: '天天学委',
    desc: 'Interactive AI study partner. Creates personalized plans, tracks milestones, and generates quizzes.',
    status: 'In Ideation',
    tags: ['RAG', 'Adaptive Learning'],
    icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 'tender',
    enTitle: 'Tender AI',
    title: '阿胜标书',
    desc: 'Automated bidding document generation, competitor analysis, and parameter argumentation engine.',
    status: 'In Ideation',
    tags: ['Doc Intel', 'Market Analysis'],
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
  },
  {
    id: 'echo',
    enTitle: 'Echo',
    title: '回响语音',
    desc: 'Voice-to-Intent cleaning engine. Turns raw rambling speech into structured, actionable AI instructions.',
    status: 'In Ideation',
    tags: ['Neural Clean', 'Workflow'],
    icon: <Mic className="w-5 h-5 text-rose-400" />,
  },
  {
    id: 'plotter',
    enTitle: 'Plotter',
    title: '光影剧本',
    desc: 'Conversational engine for screenwriting. Transforms novels into scripts with narrative logic & character depth.',
    status: 'In Ideation',
    tags: ['Creative AI', 'CineScript'],
    icon: <Clapperboard className="w-5 h-5 text-indigo-400" />,
  },
];

const LIBRARY_ITEMS = [
  { title: "Prompt Engineering Frameworks v2.0", type: "Framework", date: "MAR 2024", views: "1.2k" },
  { title: "Multi-Agent System Architecture Deep Dive", type: "Research", date: "FEB 2024", views: "850" },
  { title: "The Future of AI-Native UI/UX Designs", type: "Article", date: "JAN 2024", views: "2.1k" },
  { title: "Personal Knowledge Management with AI", type: "Guide", date: "DEC 2023", views: "640" },
];

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className, id, noHoverEffect = false }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  function onMouseMove(event) {
    if (noHoverEffect) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      id={id}
      onMouseMove={onMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: noHoverEffect ? 0 : rotateX, rotateY: noHoverEffect ? 0 : rotateY, transformStyle: "preserve-3d" }}
      className={`relative group rounded-2xl border border-white/10 bg-[#121212]/80 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 ${!noHoverEffect && 'hover:border-white/20'} ${className}`}
    >
      {!noHoverEffect && (
        <motion.div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([mx, my]) => `radial-gradient(400px circle at ${mx}px ${my}px, rgba(255,255,255,0.06), transparent 40%)`
            )
          }}
        />
      )}
      <div className="relative z-10 p-8 h-full flex flex-col">{children}</div>
    </motion.div>
  );
};

// --- BACKGROUND EFFECTS ---
const BackgroundEffects = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spotlightX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -30,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Noise Texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none contrast-125 mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`
           }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] z-[2]" 
           style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

      {/* Red Nebulas */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-red-900/10 blur-[120px]"
      />
      <motion.div 
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-red-800/5 blur-[100px]"
      />

      {/* Mouse Spotlight */}
      <motion.div 
        className="absolute inset-0 z-[3]"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([mx, my]) => `radial-gradient(800px circle at ${mx}px ${my}px, rgba(255,255,255,0.02), transparent 80%)`
          )
        }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-red-500/30"
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
          style={{
            left: p.left,
            top: '-5vh',
            width: p.size,
            height: p.size,
            boxShadow: '0 0 4px rgba(220,38,38,0.4)'
          }}
        />
      ))}
    </div>
  );
};

// --- NAVBAR ---
const Navbar = ({ activeSection }) => {
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'projects', label: 'Projects' },
    { id: 'library', label: 'Library' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <motion.div 
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/5 bg-black/60 backdrop-blur-2xl shadow-lg shadow-black/20"
      >
        <div className="flex items-center gap-2 px-3 border-r border-white/10 mr-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
          <span className="text-[10px] font-bold tracking-tighter">HAL STUDIO</span>
        </div>
        
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`relative px-4 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                activeSection === tab.id ? 'text-white' : 'text-white/40 hover:text-white/80'
              }`}
            >
              {activeSection === tab.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

// --- SECTION HEADER ---
const SectionHeader = ({ icon: Icon, module, title }) => (
  <div className="flex items-center gap-4 mb-10 px-2 border-l-2 border-red-500/50 pl-6">
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
      <div className="flex items-center gap-2 mt-1">
        <Icon size={10} className="text-red-500" />
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">
          {module}
        </span>
      </div>
    </div>
  </div>
);

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // --- Scroll Indicator Animations ---
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scrollIndicatorY = useTransform(scrollY, [0, 200], [0, 50]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = ['profile', 'projects', 'library', 'contact'];
      const scrollPosition = window.scrollY + 300;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = () => {
    const email = 'klein_wang26@126.com';
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 font-sans tracking-tight scroll-smooth">
      <BackgroundEffects />
      <Navbar activeSection={activeSection} />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-32">
        
        {/* --- HERO SECTION --- */}
        {/* Reduced margin-bottom from mb-24 to mb-8 for tighter layout */}
        <section className="min-h-[75vh] flex flex-col items-center justify-center text-center mb-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 bg-red-600/5 blur-[120px] rounded-full scale-125 animate-pulse" />
            
            <h1 className="text-7xl lg:text-[8rem] font-bold tracking-tighter mb-4 leading-none select-none
                           text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-900
                           drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative">
              HAL STUDIO
              
              <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-40 pointer-events-none">
                <motion.div 
                  animate={{ y: ['-50%', '50%'] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-full h-[200%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat"
                  style={{ filter: 'invert(1) brightness(1.5)' }}
                />
              </div>

              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] pointer-events-none"
              />
            </h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-6 mt-6"
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-red-500/30" />
              <p className="text-xs lg:text-sm font-medium text-white/30 tracking-[0.4em] uppercase">
                Build. Simplify. Scale.
              </p>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-red-500/30" />
            </motion.div>
          </motion.div>
          
          {/* --- Scroll Indicator: FIXED CENTERING --- */}
          <motion.div 
            style={{ 
              opacity: scrollIndicatorOpacity, 
              y: scrollIndicatorY,
              x: "-50%" // FIX: Use explicit style for centering to override potential conflicts
            }}
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "-50%" }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-16 left-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30 animate-pulse">
              Initialize System
            </span>
            <div className="w-[1px] h-16 bg-white/5 relative overflow-hidden rounded-full">
              <motion.div 
                animate={{ top: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "circIn" }}
                className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-80"
              />
            </div>
          </motion.div>
        </section>

        {/* --- SECTION 1: PROFILE --- */}
        <section id="profile" className="mb-48 scroll-mt-32">
          <SectionHeader icon={User} module="Module 01" title="Profile" />
          
          {/* Layout: h-full applied to container and cards for equal height */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col">
              <TiltCard className="p-10 h-full flex flex-col justify-center border-white/5">
                <h3 className="text-3xl font-bold mb-6 tracking-tight text-white">Hal Wang | AI Product Builder</h3>
                <div className="space-y-6 text-base text-white/50 font-light leading-relaxed">
                  <p>
                    I'm a self-taught developer, former healthcare marketer and top salesman. <strong className="text-white font-medium">I don't build models; I build bridges.</strong>
                  </p>
                  <p>
                    My mission is to simplify the complex—turning heavy workloads and learning curves into seamless AI-driven experiences. I’m here to help everyday people leverage AI to find more time for life.
                  </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-12 mt-auto">
                   <div>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
                        <Sparkles size={10} /> Expertise
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-medium text-white/80">
                        AI Product Design <span className="text-white/20">/</span> Vibe-code <span className="text-white/20">/</span> UI
                      </div>
                   </div>
                   <div>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
                        <Check size={10} /> Focus
                      </div>
                      <div className="text-xs font-medium text-white/80">Human-Centric AI <span className="text-white/20">/</span> Personal Productivity</div>
                   </div>
                </div>
              </TiltCard>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 w-full flex flex-col">
              <TiltCard className="p-0 shadow-2xl overflow-hidden h-full flex flex-col" noHoverEffect={true}>
                <div className="h-28 bg-gradient-to-br from-zinc-900 to-black relative border-b border-white/5 shrink-0">
                   <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #ef4444 1px, transparent 0)', backgroundSize: '16px 16px'}} />
                   <div className="absolute -bottom-10 left-8 w-20 h-20 rounded-full border-4 border-[#121212] bg-zinc-900 flex items-center justify-center text-xl font-bold text-white/30 shadow-xl">HW</div>
                </div>
                
                <div className="pt-12 px-8 pb-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-white">Hal Wang</h2>
                      <p className="text-xs text-white/30 font-mono mt-1">@Kilianwquant</p>
                    </div>
                    <a href="https://twitter.com/Kilianwquant" target="_blank" className="px-5 py-1.5 rounded-full border border-white/10 text-white text-[10px] font-bold hover:bg-white hover:text-black transition-all">
                      Follow
                    </a>
                  </div>
                  
                  <p className="text-sm text-white/50 mb-8 leading-relaxed font-light">
                    Self-taught AI builder.<br/>
                    Aim to simplify work for everyone.
                  </p>
                  
                  <div className="mt-auto grid grid-cols-3 gap-4 border-t border-white/5 pt-6 text-center">
                    <div>
                      <div className="text-base font-bold text-white">5 Years</div>
                      <div className="text-[8px] text-white/20 uppercase tracking-widest mt-1">Exp.</div>
                    </div>
                    <div className="relative">
                      <div className="absolute left-0 top-2 bottom-2 w-px bg-white/5" />
                      <div className="text-base font-bold text-white">6</div>
                      <div className="text-[8px] text-white/20 uppercase tracking-widest mt-1">Projects</div>
                      <div className="absolute right-0 top-2 bottom-2 w-px bg-white/5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white">1.2k</div>
                      <div className="text-[8px] text-white/20 uppercase tracking-widest mt-1">Following</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: PROJECTS --- */}
        <section id="projects" className="mb-48 scroll-mt-32">
          <SectionHeader icon={Code} module="Module 02" title="Projects" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <TiltCard key={p.id} className={p.size === 'large' ? 'md:col-span-2' : ''}>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-inner">{p.icon}</div>
                    <div>
                      {/* English Title Prominent */}
                      <h3 className="text-lg font-bold tracking-tight text-white mb-0.5">{p.enTitle}</h3>
                      {/* Chinese Title Subtle */}
                      <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{p.title}</p>
                    </div>
                  </div>
                  <span className={`text-[8px] font-mono px-2 py-1 rounded border ${
                    p.status === 'Building' ? 'border-red-500/20 text-red-400 bg-red-500/5' : 'border-white/5 text-white/20'
                  }`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-white/50 font-light mb-8 leading-relaxed min-h-[40px]">
                  {p.desc}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-[8px] px-2 py-1 rounded bg-white/5 text-white/30 border border-white/5 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/30 hover:text-white cursor-pointer">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: LIBRARY --- */}
        <section id="library" className="mb-48 scroll-mt-32">
          <SectionHeader icon={Book} module="Module 03" title="Library" />

          <div className="grid grid-cols-1 gap-3">
            {LIBRARY_ITEMS.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="group flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/0 transition-all cursor-pointer hover:border-white/10"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[9px] font-mono text-white/10 w-6">0{i+1}</span>
                  <div>
                    <h4 className="text-base font-medium mb-1 text-white/80 group-hover:text-white transition-colors tracking-tight">{v.title}</h4>
                    <div className="flex gap-3">
                      <span className="text-[9px] font-mono text-red-400/60 uppercase tracking-widest">{v.type}</span>
                      <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">• {v.views} Readers</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden md:block text-[9px] font-mono text-white/20 uppercase tracking-widest">{v.date}</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-white/10 group-hover:text-white group-hover:bg-white/10 transition-all border border-white/5">
                    <ChevronRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: CONTACT --- */}
        <section id="contact" className="mb-40 scroll-mt-32">
          <SectionHeader icon={Send} module="Module 04" title="Contact" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TiltCard className="p-8 flex flex-col justify-between min-h-[300px] border-white/5">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  <Mail size={20} />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-white">Direct Channel</h3>
                <p className="text-sm text-white/40 font-light mb-8 max-w-xs leading-relaxed">
                  For architectural consultation or product co-creation. Always ready for interesting ideas.
                </p>
              </div>
              
              <div 
                onClick={copyEmail}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/5 cursor-pointer transition-all group/email"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/60 group-hover/email:text-white transition-colors">klein_wang26@126.com</span>
                </div>
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                  {copied ? <span className="text-emerald-500 flex items-center gap-1"><Check size={10}/> Copied</span> : <span>Copy Email</span>}
                </div>
              </div>
            </TiltCard>

            <div className="grid grid-rows-2 gap-6">
              <a href="https://twitter.com/Kilianwquant" target="_blank" className="block group h-full">
                <TiltCard className="p-8 h-full flex flex-col justify-between border-white/5 hover:border-white/20" noHoverEffect={true}>
                  <div className="flex justify-between items-start">
                    <Twitter size={20} className="text-white/30 group-hover:text-blue-400 transition-colors" />
                    <ArrowUpRight size={14} className="text-white/10 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 tracking-tight text-white">X.com / Twitter</h4>
                    <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Instant Updates & Thoughts</p>
                  </div>
                </TiltCard>
              </a>

              <div className="p-8 rounded-2xl border border-white/5 bg-[#0a0a0a] flex items-center justify-between shadow-lg">
                <div>
                  <h4 className="text-lg font-bold mb-1 tracking-tight text-white">Build In Public</h4>
                  <p className="text-[9px] text-white/20 font-mono uppercase tracking-widest">Live status</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-500 uppercase">Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="pt-32 pb-20 flex flex-col items-center text-center opacity-40 hover:opacity-100 transition-opacity">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
          <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.6em] mb-6">Hal Studio — Architecting the Future</p>
          <div className="flex gap-8 mb-8">
             <Github size={16} className="hover:text-white cursor-pointer transition-colors" />
             <Twitter size={16} className="hover:text-white cursor-pointer transition-colors" />
             <Mail size={16} className="hover:text-white cursor-pointer transition-colors" />
          </div>
          <p className="text-[8px] text-white/10 font-mono tracking-widest uppercase">© 2024 Hal Wang. All Rights Reserved.</p>
        </footer>

      </main>
    </div>
  );
}