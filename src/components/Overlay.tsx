"use client";

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const roles = [' full-stack developer', ' desktop app developer', ' .NET engineer', ' UI/UX designer'];
type AccessibilitySettings = {
  fontScale: number;
  highContrast: boolean;
  colorSafe: boolean;
  reducedMotion: boolean;
  underlineLinks: boolean;
  focusHighlight: boolean;
  wideSpacing: boolean;
  readingGuide: boolean;
  largeCursor: boolean;
  dyslexiaFriendly: boolean;
};

const defaultSettings: AccessibilitySettings = {
  fontScale: 1,
  highContrast: false,
  colorSafe: false,
  reducedMotion: false,
  underlineLinks: false,
  focusHighlight: true,
  wideSpacing: false,
  readingGuide: false,
  largeCursor: false,
  dyslexiaFriendly: false,
};

const skills = [
  { name: 'Python', icon: 'Py', level: 'Core language', detail: 'Security tools and applied project experimentation.', color: '#2255d6' },
  { name: 'JavaScript', icon: 'JS', level: 'Core language', detail: 'Interactive web experiences and project interfaces.', color: '#e07a28' },
  { name: 'C#', icon: 'C#', level: 'Core language', detail: 'Data-structure and management-system applications.', color: '#287a58' },
  { name: 'HTML & CSS', icon: '</>', level: 'Web foundation', detail: 'Responsive interfaces, layouts, and visual clones.', color: '#9d4c72' },
  { name: 'Security tooling', icon: 'Wi', level: 'Exploring', detail: 'Wi-Fi auditing workflows and responsible security practice.', color: '#936d18' },
  { name: 'AI & machine learning', icon: 'AI', level: 'Exploring', detail: 'Plant-disease detection and intelligent-system experiments.', color: '#47702b' },
];

const projects = [
  { number: '01', title: 'Agri Shield', type: 'Plant disease detection', description: 'A system that detects plant diseases through images and gives recommendations.', tags: ['Python', 'JavaScript', 'Docker'], color: '#d6eadf', image: '/agri.jpg', link: 'https://github.com/NewToGit-umar/Agri-Sheild' ,live: 'https://huggingface.co/spaces/abdullahawan1/agri-shield-ai'},
  { number: '02', title: 'LinkHUB', type: 'Live social platform', description: 'A live web app for managing social media accounts, bio-link pages, scheduling, analytics, and audience growth.', tags: ['JavaScript', 'CSS', 'Social tools'], color: '#c9f0b8', image: '/link.png', link: 'https://github.com/NewToGit-umar/LinkHUB', live: 'https://link-hub.social' },
  { number: '03', title: 'Twitter UI Clone', type: 'Interface study', description: 'A Twitter-inspired UI clone built with HTML, CSS, JavaScript, and Tailwind CSS.', tags: ['HTML', 'CSS', 'Tailwind'], color: '#dbe5ff', image: '/twitter.png', link: 'https://github.com/NewToGit-umar/Twitter-UI-Clone' ,live:'https://twiteruiclone.netlify.app'},
  { number: '04', title: 'Spotify Clone', type: 'Live frontend', description: 'A Spotify-inspired interface built with HTML, CSS, and JavaScript.', tags: ['HTML', 'CSS', 'JavaScript'], color: '#d6eadf', image: '/Spotify.png', link: 'https://github.com/NewToGit-umar/Spotify-Clone', live: 'https://spotify-clone-roan-nu-88.vercel.app' },
  { number: '05', title: 'Netflix Clone', type: 'Live frontend', description: 'A Netflix-inspired interface built with HTML and CSS, deployed as a live Vercel project.', tags: ['HTML', 'CSS'], color: '#e7c4bd', image: '/Netflix.png', link: 'https://github.com/NewToGit-umar/Netflix-clone-', live: 'https://netflix-clone-three-delta-55.vercel.app' },
  { number: '06', title: 'Wifi Audit Tool', type: 'Wi-Fi security auditing', description: 'A Python/PyQt5 GUI suite for Wi-Fi auditing, scanning, and custom wordlist workflows.', tags: ['Python', 'PyQt5', 'Security'], color: '#dbe5ff', image: '/wifi.png', link: 'https://github.com/NewToGit-umar/wifi-audit-tool' },
  { number: '07', title: 'Web Browser by Umar', type: 'Data structures', description: 'A basic web browser project created to understand linked lists, trees, and other data structures.', tags: ['C#', 'Data structures'], color: '#f7e2c7', image: '/brows.png', link: 'https://github.com/NewToGit-umar/Web-Browser-by-umar' },
  { number: '08', title: 'Tic-Tac-Toe', type: 'Live interactive game', description: 'A browser game with an interactive UI and smooth animations, deployed on Vercel.', tags: ['HTML', 'CSS', 'JavaScript'], color: '#dbe5ff', image: '/tictac.png', link: 'https://github.com/NewToGit-umar/TIC-TAC-TOE', live: 'https://tic-tac-toe-gilt-eta.vercel.app' },
  { number: '09', title: 'Enhanced Medical Store', type: 'Management system', description: 'An interactive medical-store management system focused on useful functionality and secure handling.', tags: ['C#', 'Desktop UI'], color: '#f7e2c7', image: 'https://opengraph.githubassets.com/1/NewToGit-umar/Enhanced-Medical-Store-Management-System', link: 'https://github.com/NewToGit-umar/Enhanced-Medical-Store-Management-System' },
  { number: '10', title: 'Medical Store Management', type: 'C++ application', description: 'A foundational medical-store management project written in C++.', tags: ['C++', 'Management system'], color: '#f7e2c7', image: 'https://opengraph.githubassets.com/1/NewToGit-umar/Medical-Store-Management', link: 'https://github.com/NewToGit-umar/Medical-Store-Management' },
  { number: '11', title: 'NewToGit-umar', type: 'GitHub profile', description: 'The public GitHub profile repository for Umar Farooq.', tags: ['GitHub', 'Profile'], color: '#dbe5ff', image: '/image.png', link: 'https://github.com/NewToGit-umar/NewToGit-umar' },
  { number: '12', title: 'Resume', type: 'Profile document', description: "A public curriculum vitae repository containing Umar's resume materials.", tags: ['Resume', 'Profile'], color: '#d6eadf', image: 'https://opengraph.githubassets.com/1/NewToGit-umar/Resume', link: 'https://github.com/NewToGit-umar/Resume' },
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.16 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const complete = text === currentRole;
    const timer = window.setTimeout(() => {
      if (complete && !deleting) {
        setDeleting(true);
        return;
      }

      if (deleting && text.length <= 1) {
        const nextIndex = (roleIndex + 1) % roles.length;
        setRoleIndex(nextIndex);
        setText(roles[nextIndex].slice(0, 1));
        setDeleting(false);
        return;
      }

      setText(currentRole.slice(0, text.length + (deleting ? -1 : 1)));
    }, complete && !deleting ? 2000 : deleting ? 45 : 80);

    return () => window.clearTimeout(timer);
  }, [deleting, roleIndex, text]);

  return (
    <span className="role-rotator" aria-live="polite">
      <span className="role-typed">{text}<span className="cursor" aria-hidden="true">|</span></span>
    </span>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
    
    // Hide the success message after 6 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      {submitted && (
        <div className="form-popup-banner">
          Email is sent! You will get response within 24 hours.
        </div>
      )}
      <label htmlFor="contact-name">Your name</label>
      <input id="contact-name" name="name" type="text" placeholder="Jane Smith" required />
      <label htmlFor="contact-email">Your email</label>
      <input id="contact-email" name="email" type="email" placeholder="jane@example.com" required />
      <label htmlFor="contact-message">What are you building?</label>
      <textarea id="contact-message" name="message" placeholder="Tell me a little about the project..." rows={5} required />
      <button className="button button-primary" type="submit">Send message <span>↗</span></button>
    </form>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi. Ask me about Umar's work, skills, or how to get in touch." },
  ]);

  const answer = (question: string) => {
    const lower = question.toLowerCase();
    if (/^(hi|hello|hey|salam)\b/.test(lower)) return 'Hi. I can answer questions about Umar, his skills, projects, live demos, links, accessibility features, and contact details.';
    if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('language')) return 'Umar works with Python, JavaScript, C#, C++, HTML, CSS, Tailwind, PyQt5, security tooling, AI, and machine-learning experiments.';
    if (lower.includes('linkhub') || lower.includes('link hub') || lower.includes('social platform')) return 'LinkHUB is Umar\'s live social platform for bio-link pages, social account management, scheduling, analytics, and audience growth. Open link-hub.social or its GitHub repository from the first project card.';
    if (lower.includes('live') || lower.includes('demo') || lower.includes('deployed')) return 'The live projects are LinkHUB, Netflix Clone, Spotify Clone, Tic-Tac-Toe, Agri Shield, and Twitter UI Clone. Each available demo link is marked Live demo in Selected work.';
    const matchedProject = projects.find((project) => lower.includes(project.title.toLowerCase()) || project.tags.some((tag) => lower.includes(tag.toLowerCase())));
    if (matchedProject) return `${matchedProject.title}: ${matchedProject.description} Repository: ${matchedProject.link}${matchedProject.live ? ` Live demo: ${matchedProject.live}` : ''}`;
    if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('repository') || lower.includes('github')) return 'The portfolio includes 12 public repositories across live web products, frontend studies, AI, security, C#, C++, data structures, and profile documents. Scroll to All public work to browse every repository.';
    if (lower.includes('accessib') || lower.includes('contrast') || lower.includes('font') || lower.includes('motion')) return 'Use the circular Accessibility controls at the lower left for larger text, font-size controls, high contrast, a color-safe palette, reduced motion, underlined links, focus emphasis, wider spacing, a reading guide, a larger cursor, dyslexia-friendly type, and reset.';
    if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach')) return 'Use the contact form at the bottom. It will send a message directly to Umar, or you can connect through his LinkedIn profile.';
    if (lower.includes('linkedin')) return 'LinkedIn: linkedin.com/in/umar-farooq-627380338. The link is available in the navigation, about section, and footer.';
    if (lower.includes('education') || lower.includes('uet') || lower.includes('lahore')) return 'Umar studies Computer Science at the University of Engineering and Technology, Lahore.';
    if (lower.includes('about') || lower.includes('umar') || lower.includes('who')) return 'Umar Farooq is a results-driven developer from Pakistan exploring full-stack development, AI, security, accessible interfaces, and independent product work.';
    if (lower.includes('what can you') || lower.includes('help')) return 'Ask me about any project, skill, live demo, source repository, contact method, LinkedIn, GitHub, education, or the accessibility controls.';
    return 'I do not have a matching portfolio fact for that yet. Try a project name, “What skills does Umar use?”, “How do I contact Umar?”, or “What is LinkHUB?”';
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((current) => [...current, { from: 'user', text: question }, { from: 'bot', text: answer(question) }]);
    setInput('');
  };

  return (
    <div className="chatbot">
      <AnimatePresence>
        {open && (
          <motion.div id="portfolio-chat-window" role="dialog" aria-label="Portfolio assistant" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} className="chat-window">
            <div className="chat-header"><span><i className="status-dot" /> portfolio assistant</span><button onClick={() => setOpen(false)} aria-label="Close assistant">×</button></div>
            <div className="chat-messages" aria-live="polite" aria-label="Assistant conversation">
              {messages.map((message, index) => <div key={`${message.from}-${index}`} className={`chat-message ${message.from}`}>{message.text}</div>)}
            </div>
            <form onSubmit={submit} className="chat-form"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question..." aria-label="Ask about this portfolio" /><button type="submit" aria-label="Send question">↗</button></form>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="chat-launcher" onClick={() => setOpen(!open)} aria-label={open ? 'Close portfolio assistant' : "Open Umar's assistant"} aria-expanded={open} aria-controls="portfolio-chat-window"><span className="chat-icon">✦</span></button>
    </div>
  );
}

type AccessibilityExtrasProps = {
  settings: AccessibilitySettings;
  toggle: (setting: Exclude<keyof AccessibilitySettings, 'fontScale'>) => void;
  adjustFontScale: (amount: number) => void;
  reset: () => void;
};

function AccessibilityExtras({ settings, toggle, adjustFontScale, reset }: AccessibilityExtrasProps) {
  const extraOptions: Array<[Exclude<keyof AccessibilitySettings, 'fontScale'>, string]> = [
    ['colorSafe', 'Color-safe palette'],
    ['underlineLinks', 'Underline links'],
    ['focusHighlight', 'Strong focus ring'],
    ['wideSpacing', 'Wider spacing'],
    ['readingGuide', 'Reading guide'],
    ['largeCursor', 'Large cursor'],
    ['dyslexiaFriendly', 'Friendly type'],
  ];

  return (
    <><div className="font-stepper"><span>Font size</span><div><button type="button" aria-label="Decrease font size" onClick={() => adjustFontScale(-.05)}>-</button><output>{Math.round(settings.fontScale * 100)}%</output><button type="button" aria-label="Increase font size" onClick={() => adjustFontScale(.05)}>+</button></div></div><div className="accessibility-options">{extraOptions.map(([setting, label]) => <button key={setting} type="button" aria-pressed={settings[setting]} onClick={() => toggle(setting)}><span>{label}</span><i>{settings[setting] ? 'On' : 'Off'}</i></button>)}</div><button className="accessibility-reset" type="button" onClick={reset}>Reset preferences</button></>
  );
}

export default function Overlay() {
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isMounted, setIsMounted] = useState(false);
  
  // State for hiding floating widgets on scroll
  const [hideWidgets, setHideWidgets] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = window.localStorage.getItem('umar-portfolio-accessibility');
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AccessibilitySettings>;
        setAccessibilitySettings({
          fontScale: typeof parsed.fontScale === 'number' ? Math.min(1.25, Math.max(.9, parsed.fontScale)) : defaultSettings.fontScale,
          highContrast: parsed.highContrast === true,
          colorSafe: parsed.colorSafe === true,
          reducedMotion: parsed.reducedMotion === undefined
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : parsed.reducedMotion === true,
          underlineLinks: parsed.underlineLinks === true,
          focusHighlight: parsed.focusHighlight !== false,
          wideSpacing: parsed.wideSpacing === true,
          readingGuide: parsed.readingGuide === true,
          largeCursor: parsed.largeCursor === true,
          dyslexiaFriendly: parsed.dyslexiaFriendly === true,
        });
      } else {
        setAccessibilitySettings((current) => ({
          ...current,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        }));
      }
    } catch {}
  }, []);

  const { fontScale, highContrast, colorSafe, reducedMotion, underlineLinks, focusHighlight, wideSpacing, readingGuide, largeCursor, dyslexiaFriendly } = accessibilitySettings;

  useEffect(() => {
    if (!isMounted) return;
    try {
      window.localStorage.setItem('umar-portfolio-accessibility', JSON.stringify(accessibilitySettings));
    } catch {}
  }, [accessibilitySettings, isMounted]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollY = window.scrollY;
      const progress = scrollable > 0 ? (currentScrollY / scrollable) * 100 : 0;
      
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);

      // Determine scroll direction to hide/show widgets
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHideWidgets(true);
      } else {
        setHideWidgets(false);
      }
      
      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggleAccessibility = (setting: Exclude<keyof AccessibilitySettings, 'fontScale'>) => {
    setAccessibilitySettings((current) => ({ ...current, [setting]: !current[setting] }));
  };

  const adjustFontScale = (amount: number) => {
    setAccessibilitySettings((current) => ({ ...current, fontScale: Math.min(1.25, Math.max(.9, Number((current.fontScale + amount).toFixed(2)))) }));
  };

  const resetAccessibility = () => {
    setAccessibilitySettings(defaultSettings);
  };

  const portfolioClasses = [
    'portfolio-shell', 
    fontScale !== 1 && 'has-font-scale', 
    highContrast && 'is-high-contrast', 
    colorSafe && 'is-color-safe', 
    reducedMotion && 'is-reduced-motion', 
    underlineLinks && 'is-underlined', 
    focusHighlight && 'has-focus-highlight', 
    wideSpacing && 'is-wide-spacing', 
    readingGuide && 'has-reading-guide', 
    largeCursor && 'is-large-cursor', 
    dyslexiaFriendly && 'is-dyslexia-friendly',
    hideWidgets && 'widgets-hidden' // Applied when scrolling down
  ].filter(Boolean).join(' ');

  return (
    <main id="main-content" className={portfolioClasses} style={{ '--font-scale': fontScale } as CSSProperties}>
      {readingGuide && <div className="reading-guide" aria-hidden="true" />}
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#about">Skip to content</a>
      <nav className="site-nav"><a className="brand" href="#top">UF<span>.</span></a><div className="nav-links"><a href="#about">About</a><a href="#work">Work</a><a href="#skills">Skills</a><a href="#contact">Contact</a></div><div className="nav-meta"><div className="nav-socials"><a href="https://github.com/NewToGit-umar" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/umar-farooq-627380338" target="_blank" rel="noreferrer">LinkedIn</a></div><a className="nav-availability" href="#contact"><i className="status-dot" /> Available for select work</a></div></nav>
      
      {/* Floating Accessibility Launcher */}
      <div className="accessibility-tools">
        <button className="accessibility-launcher" type="button" aria-expanded={accessibilityOpen} aria-controls="accessibility-panel" onClick={() => setAccessibilityOpen((open) => !open)}>Accessibility <span aria-hidden="true">◐</span></button>
        {accessibilityOpen && (
          <div id="accessibility-panel" className="accessibility-panel" role="dialog" aria-modal="false" aria-labelledby="accessibility-title">
            <div className="accessibility-heading">
              <h2 id="accessibility-title">Accessibility</h2>
              <button type="button" onClick={() => setAccessibilityOpen(false)} aria-label="Close accessibility settings">×</button>
            </div>
            <p>Adjust this portfolio for easier reading and calmer motion.</p>
            <div className="accessibility-options">
              <button type="button" aria-pressed={fontScale > 1} onClick={() => adjustFontScale(.05)}><span>Larger text</span><i>{Math.round(fontScale * 100)}%</i></button>
              <button type="button" aria-pressed={highContrast} onClick={() => toggleAccessibility('highContrast')}><span>High contrast</span><i>{highContrast ? 'On' : 'Off'}</i></button>
              <button type="button" aria-pressed={reducedMotion} onClick={() => toggleAccessibility('reducedMotion')}><span>Reduce motion</span><i>{reducedMotion ? 'On' : 'Off'}</i></button>
            </div>
            <p className="a11y-status" aria-live="polite">
              {fontScale !== 1 || highContrast || reducedMotion || colorSafe || underlineLinks || wideSpacing || readingGuide || largeCursor || dyslexiaFriendly ? 'Custom accessibility settings active.' : 'Default settings active.'}
            </p>
            <AccessibilityExtras settings={accessibilitySettings} toggle={toggleAccessibility} adjustFontScale={adjustFontScale} reset={resetAccessibility} />
          </div>
        )}
      </div>

      <section id="top" className="hero section-shell">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="hero-identity"><div className="profile-frame" role="img" aria-label="Portrait of Umar Farooq" style={{ backgroundImage: "url('https://avatars.githubusercontent.com/u/204542200?v=4')" }} /><div><p className="hero-name">UMAR FAROOQ</p><p className="hero-role">developer / builder</p></div></div>
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>01 / independent developer</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}>Building digital<br /><em>systems with intent.</em></motion.h1>
          <motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}><span className="intro-line">Hi, I&apos;m Umar Farooq. </span><span className="intro-line">  <strong><Typewriter /></strong></span></motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}><a className="button button-primary" href="#work">See selected work <span>↘</span></a><a className="text-link" href="#about">More about me <span>↗</span></a></motion.div>
        </div>
        <motion.div className="hero-art" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55, duration: 0.8 }} aria-label="A preview of Umar&apos;s development workflow">
          <div className="art-topbar"><span className="art-dots"><i /><i /><i /></span><span aria-hidden="true">⌘ K</span></div>
          <div className="art-body"><p className="art-comment">&#47;&#47; turn ambiguity into momentum</p><p><span className="art-keyword">const</span> approach = <span className="art-string">&apos;thoughtful&apos;</span>;</p><p><span className="art-keyword">const</span> output = <span className="art-function">build</span>({'{'}</p><p className="art-indent">clarity: <span className="art-boolean">true</span>,</p><p className="art-indent">security: <span className="art-boolean">true</span>,</p><p className="art-indent">velocity: <span className="art-boolean">true</span></p><p>{'}'});</p><div className="art-signal"><span /><span /><span /><small>shipping with intent</small></div></div>
        </motion.div>
        <div className="hero-index"><span>Scroll to explore</span><span className="scroll-line" /></div>
        <div className="hero-note"><span>Based in Pakistan</span><span>Working globally</span></div>
      </section>

      <section id="about" className="section-shell about-section"><Reveal className="section-heading"><p className="eyebrow">02 / the short version</p><h2>Good software makes<br /><em>hard things feel simple.</em></h2></Reveal><div className="about-grid"><Reveal><p className="large-copy">I&apos;m a results-driven developer building a practical foundation across software, AI, and independent work.</p></Reveal><Reveal><p className="body-copy">My public profile connects the University of Engineering and Technology, Lahore with an active interest in full-stack development, machine learning, autonomous AI, and freelance career growth.</p><a className="text-link dark-link" href="https://www.linkedin.com/in/umar-farooq-627380338" target="_blank" rel="noreferrer">Read my LinkedIn <span>↗</span></a></Reveal></div></section>

      <section id="work" className="section-shell work-section"><Reveal className="section-heading split-heading"><div><p className="eyebrow">03 / all public work</p><h2>Live first.<br /><em>Everything linked.</em></h2></div><p className="section-aside">Live demos lead the grid, followed by every public repository from GitHub. Open the code or try the deployed work directly.</p></Reveal><div className="project-list">{projects.map((project) => <Reveal key={project.number} className="project-row"><div className="project-number">{project.number}</div><div className="project-visual" style={{ backgroundColor: project.color, backgroundImage: `url(${project.image})` }} /><div className="project-info"><p className="eyebrow">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.link} target="_blank" rel="noreferrer">Repository ↗</a>{project.live && <a className="live-link" href={project.live} target="_blank" rel="noreferrer">Live demo ↗</a>}</div></div><span className="project-arrow">↗</span></Reveal>)}</div></section>

      <section id="skills" className="section-shell skills-section"><Reveal className="section-heading"><p className="eyebrow">04 / working toolkit</p><h2>Curious by default.<br /><em>Precise when it matters.</em></h2></Reveal><div className="skills-layout"><Reveal className="skills-intro"><p className="large-copy">The repository tells a story of learning by building: web interfaces, desktop systems, security experiments, and applied AI.</p><div className="skill-counter"><span>06</span><small>core areas<br />in rotation</small></div></Reveal><div className="skill-list">{skills.map((skill, index) => <Reveal key={skill.name} delay={index * 0.1} className="skill-item"><span className="skill-index">0{index + 1}</span><div className="skill-bar"><div className="skill-bar-fill" style={{ backgroundColor: skill.color, width: `${92 - index * 9}%` }} /></div><div className="skill-name"><span className="skill-icon">{skill.icon}</span><div><h3>{skill.name}</h3><span>{skill.level}</span></div></div><p>{skill.detail}</p></Reveal>)}</div></div></section>

      <section className="principles-band"><div className="section-shell principles-grid"><Reveal><p className="eyebrow">05 / how I work</p><h2>Less noise.<br /><em>More signal.</em></h2></Reveal><div className="principles">{['Start with the why.', 'Make complexity visible.', 'Leave things better.'].map((principle, index) => <Reveal key={principle}><span>0{index + 1}</span><h3>{principle}</h3><p>{index === 0 ? 'A clear problem is the best technical specification.' : index === 1 ? 'Good systems earn trust by explaining themselves.' : 'Every handoff should give the next person momentum.'}</p></Reveal>)}</div></div></section>

      <section id="contact" className="section-shell contact-section"><div className="contact-layout"><Reveal><p className="eyebrow">06 / start a conversation</p><h2>Have a difficult<br /><em>problem to solve?</em></h2><p className="contact-copy">Tell me what you&apos;re building, what&apos;s getting in the way, or connect with me through LinkedIn.</p><a className="text-link" href="https://www.linkedin.com/in/umar-farooq-627380338" target="_blank" rel="noreferrer">Connect on LinkedIn <span>↗</span></a></Reveal><Reveal delay={0.12}><ContactForm /></Reveal></div><div className="contact-footer"><span>Umar Farooq / developer</span><div><a className="back-to-top" href="#top" aria-label="Back to top">↑</a><a href="https://github.com/NewToGit-umar" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/umar-farooq-627380338" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div><div className="copyright">Copyright © 2026 Umar Farooq. All rights reserved. Built by Umar with <span aria-label="love">♥</span></div></section>
      
      {/* Floating Chatbot Tool */}
      <Chatbot />
    </main>
  );
}