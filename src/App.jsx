import React, { useState, useEffect, useMemo } from 'react';
import {
  Code,
  Terminal,
  Layers,
  GraduationCap,
  Trophy,
  Award,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Copy,
  Check,
  Moon,
  Sun,
  Menu,
  X,
  ShieldCheck,
  Users,
  Sparkles,
  BookOpen,
  HeartHandshake,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import './App.css';

const CURRENT_YEAR = new Date().getFullYear();

// Project Data
const PROJECTS_DATA = [
  {
    id: 'student-collaboration-hub',
    title: 'Student Collaboration Hub',
    category: 'Web Development',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    emoji: '🎓',
    bannerGradient: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
    summary: 'A unified peer-learning ecosystem enabling students to share academic resources, join collaborative study rooms, exchange curated lecture notes, and coordinate group projects.',
    highlights: [
      'Interactive modular user interface designed for student peer workflows',
      'Real-time resource directory with category search and download capabilities',
      'Discussion boards with threaded queries and peer resolution counters',
      'Lightweight, responsive layout optimized across mobile and desktop devices'
    ],
    metrics: 'Used across department study circles'
  },
  {
    id: 'expense-management-system',
    title: 'Expense Management System',
    category: 'Python & Database',
    tags: ['Python', 'SQL', 'Database Management', 'Analytics'],
    emoji: '📊',
    bannerGradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    summary: 'A feature-complete financial management system engineered in Python to track income and expenditures, calculate monthly burn rates, and provide actionable spending analytics.',
    highlights: [
      'Automated expense categorization (Academic, Living, Travel, Utilities)',
      'Budget threshold alert engine triggering proactive expense warnings',
      'Robust SQL database schema with relational integrity and transaction logs',
      'Graphical monthly summary generation with exportable financial reports'
    ],
    metrics: '99.9% accurate ledger balance tracking'
  },
  {
    id: 'password-strength-checker',
    title: 'Password Strength Checker',
    category: 'Cybersecurity & Python',
    tags: ['Python', 'Algorithms', 'Regex', 'Cybersecurity'],
    emoji: '🔐',
    bannerGradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    summary: 'A cybersecurity utility developed to assess authentication vulnerability, calculate mathematical information entropy, detect common dictionary patterns, and enforce NIST standards.',
    highlights: [
      'Entropy evaluation assessing character variety, length, and predictability',
      'Pattern analysis matching repetitive runs, sequences, and dictionary words',
      'Real-time feedback algorithm delivering targeted security remediation tips',
      'Crack-time estimation based on modern brute-force GPU computing metrics'
    ],
    metrics: 'Sub-second multi-heuristic security analysis'
  }
];

// Skills Data
const SKILLS_DATA = [
  { name: 'React.js', category: 'Frontend', level: 85, icon: '⚛️', desc: 'Component architecture, state hooks, responsive interfaces' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', level: 88, icon: '💛', desc: 'Modern async/await, DOM manipulation, modular JS' },
  { name: 'Python', category: 'Languages', level: 90, icon: '🐍', desc: 'OOP, scripting, automation, analytical data processing' },
  { name: 'Java', category: 'Languages', level: 82, icon: '☕', desc: 'Object-oriented programming, data structures, robust architecture' },
  { name: 'C++', category: 'Languages', level: 80, icon: '⚡', desc: 'Core algorithmic problem solving, memory discipline' },
  { name: 'HTML5 & CSS3', category: 'Frontend', level: 92, icon: '🎨', desc: 'Semantic markup, modern flexbox/grid, glassmorphism' },
  { name: 'SQL & Databases', category: 'Databases', level: 85, icon: '🗄️', desc: 'Relational schemas, query optimization, database design' }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('All');
  const [activeProjectCategory, setActiveProjectCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Interactive Password Checker State (Live Project Demo)
  const [testPassword, setTestPassword] = useState('SecureAkshara@2026!');
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Typewriter roles
  const roles = useMemo(() => [
    'Full Stack Web Developer',
    'Computer Science Engineer',
    'Python & React Specialist',
    'College Cricket Team Captain 🏏'
  ], []);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  // Toast notifier
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Copy helper
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    triggerToast(`✓ ${label} copied to clipboard!`);
  };

  // Live Password Strength Calculation
  const passwordStats = useMemo(() => {
    const pwd = testPassword;
    let score = 0;
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd)
    };

    if (checks.length) score += 20;
    if (pwd.length >= 12) score += 15;
    if (checks.uppercase) score += 15;
    if (checks.lowercase) score += 15;
    if (checks.number) score += 15;
    if (checks.special) score += 20;

    let label = 'Very Weak';
    let color = '#ef4444';
    let crackTime = 'Instant (under 1 second)';

    if (score >= 90) {
      label = 'Military Grade / Very Strong';
      color = '#10b981';
      crackTime = '~3.4 Trillion Years';
    } else if (score >= 70) {
      label = 'Strong';
      color = '#06b6d4';
      crackTime = '~25,000 Years';
    } else if (score >= 50) {
      label = 'Moderate / Fair';
      color = '#f59e0b';
      crackTime = '~3 Months';
    } else if (score >= 30) {
      label = 'Weak';
      color = '#f97316';
      crackTime = '~15 Minutes';
    }

    return { score, label, color, crackTime, checks };
  }, [testPassword]);

  // Filtered skills
  const filteredSkills = useMemo(() => {
    if (activeSkillCategory === 'All') return SKILLS_DATA;
    return SKILLS_DATA.filter(s => s.category === activeSkillCategory);
  }, [activeSkillCategory]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeProjectCategory === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.category.includes(activeProjectCategory));
  }, [activeProjectCategory]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSent(true);
      triggerToast('✨ Message received! Akshara will get back to you promptly.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSent(false), 5000);
    }, 1000);
  };

  return (
    <div className="portfolio-app">
      {/* Ambient Animated Lights */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
        <div className="bg-grid" />
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="toast-banner" role="status">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#hero" className="nav-brand" aria-label="Akshara J Portfolio Home">
            <div className="brand-monogram">AJ</div>
            <div className="brand-text">
              <span className="brand-name">Akshara J</span>
              <span className="brand-sub">CS Engineer & Developer</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#skills" className="nav-link">Skills</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#demo" className="nav-link">Live Demo</a></li>
              <li><a href="#leadership" className="nav-link">Leadership</a></li>
              <li><a href="#journey" className="nav-link">Journey</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle theme mode"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setShowResumeModal(true)}
              className="btn btn-outline"
              style={{ padding: '0.55rem 1.2rem', fontSize: '0.85rem' }}
            >
              <FileText size={15} />
              <span>Resume</span>
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ alignSelf: 'flex-end', padding: '0.5rem' }}
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
          <a href="#about" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>About & Bio</a>
          <a href="#skills" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Technical Skills</a>
          <a href="#projects" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Projects Showcase</a>
          <a href="#demo" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Interactive Demo</a>
          <a href="#leadership" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Sports & Leadership</a>
          <a href="#journey" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Education & Journey</a>
          <a href="#contact" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Get In Touch</a>
          <button
            onClick={() => { setMobileMenuOpen(false); setShowResumeModal(true); }}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            <Download size={18} />
            View Resume PDF
          </button>
        </div>
      )}

      <main id="main-content">
        {/* ==========================================================================
            HERO SECTION
            ========================================================================== */}
        <section id="hero" className="hero-section">
          <div className="container">
            <div className="hero-grid">
              {/* Left Column: Hero Text */}
              <div className="hero-content">
                <div className="status-pill">
                  <span className="status-dot" />
                  <span>Available for Internships & Software Roles</span>
                </div>

                <h1 className="hero-title">
                  Hello, I'm <br />
                  <span className="gradient-text">Akshara J</span>
                </h1>

                <div className="hero-typewriter" aria-live="polite">
                  <span>I am a </span>
                  <span className="typewriter-text">{displayText}</span>
                </div>

                <p className="hero-description">
                  Computer Science Engineering student at <strong>K. Ramakrishnan College of Technology (Anna University)</strong>.
                  Passionate about building responsive, modern web applications, scalable Python solutions, and leading teams with athletic discipline.
                </p>

                <div className="hero-cta-group">
                  <a href="#projects" className="btn btn-primary">
                    <span>Explore Projects</span>
                    <ArrowUpRight size={18} />
                  </a>

                  <button onClick={() => setShowResumeModal(true)} className="btn btn-secondary">
                    <Download size={17} />
                    <span>Download CV</span>
                  </button>

                  <a href="#contact" className="btn btn-outline">
                    <Mail size={17} />
                    <span>Contact Me</span>
                  </a>
                </div>

                <div className="hero-badges-row">
                  <div className="badge-tag">
                    <MapPin size={13} color="var(--accent-cyan)" />
                    <span>Madurai, Tamil Nadu</span>
                  </div>
                  <div className="badge-tag">
                    <GraduationCap size={13} color="var(--accent-primary)" />
                    <span>Anna University BE CSE</span>
                  </div>
                  <div className="badge-tag">
                    <Trophy size={13} color="var(--accent-amber)" />
                    <span>College Cricket Captain</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Profile Visual */}
              <div className="hero-visual">
                <div className="avatar-wrapper">
                  <div className="avatar-backdrop" />

                  {/* Floating Achievement Badges */}
                  <div className="floating-badge badge-top-left">
                    <div className="badge-icon" style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--accent-primary)' }}>
                      🎓
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Academic Record</div>
                      <div style={{ fontWeight: 800, color: 'var(--text-highlight)' }}>85% In B.E.</div>
                    </div>
                  </div>

                  <div className="floating-badge badge-bottom-right">
                    <div className="badge-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                      🏏
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>College Sports</div>
                      <div style={{ fontWeight: 800, color: 'var(--text-highlight)' }}>Cricket Captain</div>
                    </div>
                  </div>

                  {/* Profile Image Container */}
                  <div className="avatar-card">
                    <img
                      src="/profile.jpg"
                      alt="Portrait photo of Akshara J"
                      className="avatar-image"
                      loading="eager"
                    />
                    <div className="avatar-overlay-gradient" />
                    <div className="avatar-tag">
                      <div>
                        <div className="avatar-tag-title">Akshara J</div>
                        <div className="avatar-tag-sub">Computer Science & Engineering</div>
                      </div>
                      <Sparkles size={18} color="var(--accent-cyan)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="stats-grid">
              <div className="glass-card stat-card">
                <div className="stat-icon-box" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
                  <GraduationCap size={28} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">85%</div>
                  <div className="stat-label">B.E. Academic Score (Up to 3rd Sem)</div>
                </div>
              </div>

              <div className="glass-card stat-card">
                <div className="stat-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
                  <Layers size={28} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">3+</div>
                  <div className="stat-label">Signature CSE Projects Shipped</div>
                </div>
              </div>

              <div className="glass-card stat-card">
                <div className="stat-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
                  <Trophy size={28} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">Captain</div>
                  <div className="stat-label">College Cricket Team Leadership</div>
                </div>
              </div>

              <div className="glass-card stat-card">
                <div className="stat-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <Code size={28} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">8+</div>
                  <div className="stat-label">Core Tech Skills & Frameworks</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            ABOUT & OBJECTIVE SECTION
            ========================================================================== */}
        <section id="about" className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">
                <Sparkles size={14} />
                <span>Professional Profile</span>
              </div>
              <h2 className="section-title">Driven by Innovation & Teamwork</h2>
              <p className="section-subtitle">
                An engineering mindset rooted in problem solving, complemented by athletic leadership and dedicated community service.
              </p>
            </div>

            <div className="about-grid">
              {/* Career Objective and Narrative */}
              <div>
                <div className="glass-card career-objective-card">
                  <span className="quote-icon">“</span>
                  <p className="objective-text">
                    "To be a part of a reputed and pioneering organization in the Software and Hardware industry which provides a varied range of services and a platform for its employees to grow as successful professionals."
                  </p>
                  <div className="objective-author">
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                      AJ
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-highlight)' }}>Akshara J</div>
                      <div className="author-role">Career Vision & Aspiration</div>
                    </div>
                  </div>
                </div>

                <div className="about-features-grid">
                  <div className="glass-card feature-item">
                    <div className="feature-title" style={{ color: 'var(--accent-primary)' }}>
                      <Code size={18} />
                      <span>Full Stack Craft</span>
                    </div>
                    <p className="feature-desc">
                      Experienced with modern React web applications, Python backend scripts, and relational database systems.
                    </p>
                  </div>

                  <div className="glass-card feature-item">
                    <div className="feature-title" style={{ color: 'var(--accent-cyan)' }}>
                      <ShieldCheck size={18} />
                      <span>Cybersecurity Logic</span>
                    </div>
                    <p className="feature-desc">
                      Designed entropy-based Password Strength Checker analyzing heuristic vulnerabilities and complexity.
                    </p>
                  </div>

                  <div className="glass-card feature-item">
                    <div className="feature-title" style={{ color: 'var(--accent-amber)' }}>
                      <Trophy size={18} />
                      <span>Athletic Leadership</span>
                    </div>
                    <p className="feature-desc">
                      Captains the college cricket team with calm, decisive game tactics, discipline, and high-pressure resilience.
                    </p>
                  </div>

                  <div className="glass-card feature-item">
                    <div className="feature-title" style={{ color: 'var(--accent-emerald)' }}>
                      <HeartHandshake size={18} />
                      <span>Social Responsibility</span>
                    </div>
                    <p className="feature-desc">
                      Active NSS (National Service Scheme) volunteer coordinating health awareness, literacy, and community campaigns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Details Profile Card */}
              <div className="glass-card personal-details-card">
                <h3 className="details-title">Quick Facts & Details</h3>

                <div className="detail-row">
                  <span className="detail-label"><GraduationCap size={16} /> Degree</span>
                  <span className="detail-value">B.E. Computer Science</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label"><BookOpen size={16} /> College</span>
                  <span className="detail-value">K. Ramakrishnan College of Tech</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label"><Award size={16} /> Affiliation</span>
                  <span className="detail-value">Anna University</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label"><MapPin size={16} /> Location</span>
                  <span className="detail-value">Madurai, Tamil Nadu</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label"><Mail size={16} /> Email</span>
                  <span className="detail-value" style={{ fontSize: '0.85rem' }}>aksharasangeetha07@gmail.com</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label"><Phone size={16} /> Phone</span>
                  <span className="detail-value">+91 8270440053</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label"><Users size={16} /> Mother</span>
                  <span className="detail-value">Sangeetha J</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label"><Sparkles size={16} /> Languages</span>
                  <span className="detail-value">English, Tamil</span>
                </div>

                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => copyToClipboard('aksharasangeetha07@gmail.com', 'Email')}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.65rem' }}
                  >
                    <Copy size={14} />
                    <span>Copy Email</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard('8270440053', 'Phone number')}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.65rem' }}
                  >
                    <Copy size={14} />
                    <span>Copy Phone</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            TECHNICAL SKILLS SECTION
            ========================================================================== */}
        <section id="skills" className="section" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-badge">
                <Terminal size={14} />
                <span>Technical Stack</span>
              </div>
              <h2 className="section-title">Core Competencies & Tooling</h2>
              <p className="section-subtitle">
                A solid repertoire spanning frontend frameworks, programming languages, and database management systems.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="skills-filter">
              {['All', 'Languages', 'Frontend', 'Databases'].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveSkillCategory(category)}
                  className={`filter-btn ${activeSkillCategory === category ? 'active' : ''}`}
                >
                  {category === 'All' ? '✨ All Skills' : category}
                </button>
              ))}
            </div>

            {/* Skills Cards Grid */}
            <div className="skills-grid">
              {filteredSkills.map(skill => (
                <div key={skill.name} className="glass-card skill-card">
                  <div className="skill-header">
                    <div className="skill-name-group">
                      <div className="skill-icon-badge">{skill.icon}</div>
                      <div>
                        <div className="skill-name">{skill.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{skill.category}</div>
                      </div>
                    </div>
                    <span className="skill-level-pill">{skill.level}%</span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {skill.desc}
                  </p>

                  <div className="skill-progress-bar">
                    <div
                      className="skill-progress-fill"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="skill-footer">
                    <span>Proficiency</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-highlight)' }}>
                      {skill.level >= 90 ? 'Advanced' : skill.level >= 80 ? 'Proficient' : 'Intermediate'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Code Preview Card */}
            <div className="glass-card" style={{ marginTop: '3.5rem', padding: '1.75rem', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                    akshara_profile.config.js
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard('const developer = {\n  name: "Akshara J",\n  degree: "B.E. Computer Science",\n  institution: "KRCT - Anna University",\n  roles: ["Developer", "Leader", "Problem Solver"],\n  sports: "College Cricket Captain"\n};', 'Code snippet')}
                  className="copy-btn"
                >
                  <Copy size={13} />
                  <span>Copy</span>
                </button>
              </div>

              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)', overflowX: 'auto', lineHeight: 1.7 }}>
                <code>
{`// Akshara J - Computer Science Engineer & Full Stack Developer
export const aksharaProfile = {
  name: "Akshara J",
  education: {
    degree: "B.E. Computer Science & Engineering",
    university: "Anna University",
    college: "K. Ramakrishnan College of Technology",
    score: "85% Up to 3rd Sem"
  },
  skills: ["React", "JavaScript", "Python", "Java", "C++", "SQL", "HTML/CSS"],
  leadership: "Captain of the College Cricket Team",
  athletics: ["Cricket", "Football"],
  service: "NSS Volunteer",
  status: "Open to opportunities in Software & Web Engineering"
};`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            FEATURED PROJECTS SECTION
            ========================================================================== */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">
                <Layers size={14} />
                <span>Portfolio Work</span>
              </div>
              <h2 className="section-title">Featured Academic & Software Projects</h2>
              <p className="section-subtitle">
                Real-world software engineering artifacts spanning collaborative web platforms, financial management systems, and cybersecurity analyzers.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="skills-filter">
              {['All', 'Web Development', 'Python', 'Cybersecurity'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveProjectCategory(cat)}
                  className={`filter-btn ${activeProjectCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div key={project.id} className="glass-card project-card">
                  <div className="project-banner" style={{ background: project.bannerGradient }}>
                    <span className="project-category-badge">{project.category}</span>
                    <div className="project-banner-decor">{project.emoji}</div>
                  </div>

                  <div className="project-body">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.summary}</p>

                    <ul className="project-highlights">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="highlight-item">
                          <Check size={14} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="project-tech-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="badge-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="btn btn-secondary"
                        style={{ flex: 1, padding: '0.65rem 1rem' }}
                      >
                        <Eye size={16} />
                        <span>Details</span>
                      </button>

                      {project.id === 'password-strength-checker' && (
                        <a href="#demo" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }}>
                          <ExternalLink size={16} />
                          <span>Try Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ==========================================================================
                LIVE INTERACTIVE PROJECT DEMO: PASSWORD STRENGTH CHECKER
                ========================================================================== */}
            <div id="demo" className="demo-widget-card">
              <div className="demo-header">
                <div className="demo-title-group">
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                      Live Project Playground: Password Strength Checker
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Test the algorithmic logic developed by Akshara in real-time. Type below to calculate entropy and brute-force crack time.
                    </p>
                  </div>
                </div>

                <div className="demo-badge">
                  <span>⚡ Live Python/JS Algorithmic Engine</span>
                </div>
              </div>

              {/* Interactive Input */}
              <div className="demo-input-box">
                <input
                  type="text"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="Type any password to evaluate..."
                  className="demo-input"
                  aria-label="Test password input"
                />
              </div>

              {/* Progress Meter Bar */}
              <div className="password-meter-bar">
                <div
                  className="password-meter-fill"
                  style={{
                    width: `${passwordStats.score}%`,
                    backgroundColor: passwordStats.color
                  }}
                />
              </div>

              {/* Dynamic Metrics */}
              <div className="demo-metrics-row">
                <div className="demo-metric-box">
                  <span className="demo-metric-label">Strength Rating</span>
                  <span className="demo-metric-val" style={{ color: passwordStats.color }}>
                    {passwordStats.label}
                  </span>
                </div>

                <div className="demo-metric-box">
                  <span className="demo-metric-label">Estimated Crack Time</span>
                  <span className="demo-metric-val" style={{ color: 'var(--accent-cyan)' }}>
                    {passwordStats.crackTime}
                  </span>
                </div>

                <div className="demo-metric-box">
                  <span className="demo-metric-label">Entropy Score</span>
                  <span className="demo-metric-val" style={{ color: 'var(--accent-primary)' }}>
                    {passwordStats.score}/100 Pts
                  </span>
                </div>

                <div className="demo-metric-box">
                  <span className="demo-metric-label">Character Length</span>
                  <span className="demo-metric-val" style={{ color: 'var(--text-highlight)' }}>
                    {testPassword.length} chars
                  </span>
                </div>
              </div>

              {/* NIST Criteria Checklist */}
              <div className="criteria-list">
                <div className={`criteria-item ${passwordStats.checks.length ? 'met' : ''}`}>
                  {passwordStats.checks.length ? <CheckCircle2 size={16} /> : <AlertCircle size={16} color="var(--text-muted)" />}
                  <span>Minimum 8 Characters</span>
                </div>

                <div className={`criteria-item ${passwordStats.checks.uppercase ? 'met' : ''}`}>
                  {passwordStats.checks.uppercase ? <CheckCircle2 size={16} /> : <AlertCircle size={16} color="var(--text-muted)" />}
                  <span>Uppercase Letters (A-Z)</span>
                </div>

                <div className={`criteria-item ${passwordStats.checks.lowercase ? 'met' : ''}`}>
                  {passwordStats.checks.lowercase ? <CheckCircle2 size={16} /> : <AlertCircle size={16} color="var(--text-muted)" />}
                  <span>Lowercase Letters (a-z)</span>
                </div>

                <div className={`criteria-item ${passwordStats.checks.number ? 'met' : ''}`}>
                  {passwordStats.checks.number ? <CheckCircle2 size={16} /> : <AlertCircle size={16} color="var(--text-muted)" />}
                  <span>Numeric Digits (0-9)</span>
                </div>

                <div className={`criteria-item ${passwordStats.checks.special ? 'met' : ''}`}>
                  {passwordStats.checks.special ? <CheckCircle2 size={16} /> : <AlertCircle size={16} color="var(--text-muted)" />}
                  <span>Special Symbols (!@#$%)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SPORTS, LEADERSHIP & EXTRA-CURRICULAR ACTIVITIES
            ========================================================================== */}
        <section id="leadership" className="section" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-badge">
                <Trophy size={14} />
                <span>Leadership & Athletics</span>
              </div>
              <h2 className="section-title">Beyond the Code: Team Leadership & Sports</h2>
              <p className="section-subtitle">
                Demonstrated discipline, high-pressure execution, and dedication both on the field and in the community.
              </p>
            </div>

            <div className="leadership-grid">
              {/* Cricket Captaincy */}
              <div className="glass-card leadership-card" style={{ borderTop: '4px solid var(--accent-amber)' }}>
                <div className="card-top-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
                  🏏
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: 700, textTransform: 'uppercase' }}>
                    University Sports Leader
                  </div>
                  <h3 className="leadership-role">Captain of the College Cricket Team</h3>
                </div>
                <p className="leadership-desc">
                  Appointed Captain to direct team tactics, game strategies, and player placements during inter-collegiate tournaments.
                </p>
                <ul className="leadership-bullets">
                  <li><Check size={14} color="var(--accent-amber)" /> Strategic match planning and tactical on-field decision making</li>
                  <li><Check size={14} color="var(--accent-amber)" /> Fostering cohesion, resilience, and high morale under tight game finishes</li>
                  <li><Check size={14} color="var(--accent-amber)" /> Mentoring incoming collegiate players and coordinating regular practice regimens</li>
                </ul>
              </div>

              {/* Football Participant */}
              <div className="glass-card leadership-card" style={{ borderTop: '4px solid var(--accent-primary)' }}>
                <div className="card-top-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
                  ⚽
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Endurance & Agility
                  </div>
                  <h3 className="leadership-role">Active Participant of Football</h3>
                </div>
                <p className="leadership-desc">
                  Competitive university football player focusing on speed, endurance, tactical positioning, and rapid team communication.
                </p>
                <ul className="leadership-bullets">
                  <li><Check size={14} color="var(--accent-primary)" /> Strong cardiovascular endurance and quick reaction times on the pitch</li>
                  <li><Check size={14} color="var(--accent-primary)" /> Highly collaborative play, passing drills, and defensive discipline</li>
                  <li><Check size={14} color="var(--accent-primary)" /> Active representation in college sports meets and athletic events</li>
                </ul>
              </div>

              {/* NSS Volunteering */}
              <div className="glass-card leadership-card" style={{ borderTop: '4px solid var(--accent-emerald)' }}>
                <div className="card-top-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  🤝
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
                    Community & Social Service
                  </div>
                  <h3 className="leadership-role">Active Volunteer in College NSS Unit</h3>
                </div>
                <p className="leadership-desc">
                  Committed contributor to the National Service Scheme, organizing student outreach, community development, and sustainability drives.
                </p>
                <ul className="leadership-bullets">
                  <li><Check size={14} color="#10b981" /> Public literacy programs and environmental sustainability campaigns</li>
                  <li><Check size={14} color="#10b981" /> Blood donation camps, health awareness rallies, and campus drives</li>
                  <li><Check size={14} color="#10b981" /> Developing empathy, grassroots leadership, and civic responsibility</li>
                </ul>
              </div>
            </div>

            {/* Department Reference Box */}
            <div className="glass-card reference-card">
              <div className="reference-info">
                <div className="reference-avatar-box">
                  <Award size={26} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Academic Reference & Verification
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-highlight)' }}>
                    R. Rajavarman
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Head of the Department (HOD) • K. Ramakrishnan College of Technology, Trichy
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div className="badge-tag" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)' }}>
                  <CheckCircle2 size={14} />
                  <span>Verified Resume Credential</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            EDUCATION & JOURNEY TIMELINE SECTION
            ========================================================================== */}
        <section id="journey" className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">
                <GraduationCap size={14} />
                <span>Academic Milestones</span>
              </div>
              <h2 className="section-title">Education & Training Journey</h2>
              <p className="section-subtitle">
                Consistent academic dedication from matriculation schooling to Anna University engineering studies.
              </p>
            </div>

            <div className="timeline-container">
              <div className="timeline-line" />

              {/* Item 1: B.E. College */}
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="glass-card timeline-content-card">
                  <div className="timeline-meta">
                    <span className="timeline-year">2025 – 2029 (Expected)</span>
                    <span className="timeline-score">85% Upto 3rd Sem</span>
                  </div>
                  <h3 className="timeline-degree">Bachelor of Engineering (B.E.) in CSE</h3>
                  <div className="timeline-school">K. Ramakrishnan College of Technology • Anna University, Trichy</div>
                  <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Comprehensive study of core computer science fundamentals including Data Structures, Object-Oriented Programming (Java/C++), Database Systems, Computer Networks, and Software Engineering methodologies.
                  </p>
                </div>
              </div>

              {/* Item 2: HSC School */}
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="glass-card timeline-content-card">
                  <div className="timeline-meta">
                    <span className="timeline-year">Year of Passing: 2025</span>
                    <span className="timeline-score" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                      90.67% Distinction
                    </span>
                  </div>
                  <h3 className="timeline-degree">Higher Secondary Certificate (HSC)</h3>
                  <div className="timeline-school">Annamalaiyaar Matric Higher Secondary School • State Board</div>
                  <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Exemplary score of 90.67% focusing on Mathematics, Physics, Chemistry, and Computer Science foundations.
                  </p>
                </div>
              </div>

              {/* Item 3: SSLC School */}
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="glass-card timeline-content-card">
                  <div className="timeline-meta">
                    <span className="timeline-year">Year of Passing: 2023</span>
                    <span className="timeline-score">87.6% First Class</span>
                  </div>
                  <h3 className="timeline-degree">Secondary School Leaving Certificate (SSLC)</h3>
                  <div className="timeline-school">Annamalaiyaar Matric Higher Secondary School • State Board</div>
                  <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Strong academic performance of 87.6% establishing the mathematical and scientific foundation for engineering.
                  </p>
                </div>
              </div>

              {/* Item 4: Professional Training */}
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="glass-card timeline-content-card">
                  <div className="timeline-meta">
                    <span className="timeline-year">Professional Certifications</span>
                    <span className="timeline-score" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
                      Specialized Training
                    </span>
                  </div>
                  <h3 className="timeline-degree">Industry Training & Skill Certifications</h3>
                  <div className="timeline-school">Technical Workshops & Certified Courses</div>
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="highlight-item">
                      <CheckCircle2 size={16} color="var(--accent-cyan)" />
                      <span><strong>Web Development Training:</strong> HTML5, CSS3, JavaScript DOM manipulation & responsive UI architecture.</span>
                    </div>
                    <div className="highlight-item">
                      <CheckCircle2 size={16} color="var(--accent-cyan)" />
                      <span><strong>Python & Database Training:</strong> Python programming, OOP design patterns, relational SQL databases, and queries.</span>
                    </div>
                    <div className="highlight-item">
                      <CheckCircle2 size={16} color="var(--accent-cyan)" />
                      <span><strong>Emerging Technologies:</strong> Workshops in Artificial Intelligence (AI) and modern web tech.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            CONTACT & GET IN TOUCH SECTION
            ========================================================================== */}
        <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-badge">
                <Mail size={14} />
                <span>Let's Connect</span>
              </div>
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">
                Interested in working together, discussing software opportunities, or connecting? Send a message or reach out directly!
              </p>
            </div>

            <div className="contact-grid">
              {/* Contact Information Cards */}
              <div className="contact-info-list">
                <div className="glass-card contact-card-item">
                  <div className="contact-icon-details">
                    <div className="contact-icon-box">
                      <Mail size={22} />
                    </div>
                    <div>
                      <div className="contact-label">Email Address</div>
                      <a href="mailto:aksharasangeetha07@gmail.com" className="contact-value" style={{ wordBreak: 'break-all' }}>
                        aksharasangeetha07@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('aksharasangeetha07@gmail.com', 'Email')}
                    className="copy-btn"
                    title="Copy Email"
                  >
                    <Copy size={14} />
                    <span>Copy</span>
                  </button>
                </div>

                <div className="glass-card contact-card-item">
                  <div className="contact-icon-details">
                    <div className="contact-icon-box" style={{ color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)' }}>
                      <Phone size={22} />
                    </div>
                    <div>
                      <div className="contact-label">Direct Phone</div>
                      <a href="tel:+918270440053" className="contact-value">
                        +91 8270440053
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('8270440053', 'Phone number')}
                    className="copy-btn"
                    title="Copy Phone"
                  >
                    <Copy size={14} />
                    <span>Copy</span>
                  </button>
                </div>

                <div className="glass-card contact-card-item">
                  <div className="contact-icon-details">
                    <div className="contact-icon-box" style={{ color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)' }}>
                      <MapPin size={22} />
                    </div>
                    <div>
                      <div className="contact-label">Location / Address</div>
                      <div className="contact-value">
                        P-23, Ambedkar Street, Uthangudi, Madurai, Tamil Nadu
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <Download size={20} color="var(--accent-primary)" />
                    <h4 style={{ fontWeight: 700 }}>Curriculum Vitae / Resume</h4>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Download or view the official comprehensive resume document of Akshara J in PDF format.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => setShowResumeModal(true)}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '0.7rem' }}
                    >
                      <Eye size={16} />
                      <span>Preview Resume</span>
                    </button>
                    <a
                      href="/Akshara_J_Resume.pdf"
                      download="Akshara_J_Resume.pdf"
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.7rem' }}
                    >
                      <Download size={16} />
                      <span>Direct PDF</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <div className="glass-card contact-form">
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Send a Direct Message</h3>

                {formSent ? (
                  <div style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Message Dispatched!</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      Thank you for contacting Akshara J. Your inquiry has been sent and will be answered shortly.
                    </p>
                    <button
                      onClick={() => setFormSent(false)}
                      className="btn btn-secondary"
                      style={{ marginTop: '0.5rem' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label">Your Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="Software Engineering Opportunity / Inquiry"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="form-label">Message Content</label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Write your note, job opportunity details, or collaboration question..."
                        className="form-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <Mail size={18} />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================================================
          PROJECT DETAILS MODAL
          ========================================================================== */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)} role="dialog" aria-modal="true">
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>{selectedProject.emoji}</span>
                <div>
                  <h3 className="modal-title">{selectedProject.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                {selectedProject.summary}
              </p>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Key Technical Highlights & Implementation
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {selectedProject.highlights.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Technology Stack Used
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="badge-tag" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ background: 'var(--bg-glass)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Project Metric</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{selectedProject.metrics}</span>
              </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setSelectedProject(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          RESUME PREVIEW MODAL
          ========================================================================== */}
      {showResumeModal && (
        <div className="modal-overlay" onClick={() => setShowResumeModal(false)} role="dialog" aria-modal="true">
          <div className="modal-container" style={{ maxWidth: '950px', height: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={22} color="var(--accent-primary)" />
                <div>
                  <h3 className="modal-title">Official Resume - Akshara J</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>B.E. Computer Science & Engineering</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a
                  href="/Akshara_J_Resume.pdf"
                  download="Akshara_J_Resume.pdf"
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Download size={15} />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="modal-body" style={{ padding: 0, height: '100%', background: '#1e293b' }}>
              <iframe
                src="/Akshara_J_Resume.pdf"
                title="Akshara J Resume PDF"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          FOOTER
          ========================================================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div className="brand-monogram">AJ</div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>Akshara J</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Computer Science Engineer • Full Stack Developer • Cricket Captain
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="#about" className="nav-link">About</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#leadership" className="nav-link">Leadership</a>
              <a href="#journey" className="nav-link">Journey</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              © {CURRENT_YEAR} Akshara J. All rights reserved. Crafted with React & Modern Web Standards.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>Madurai, Tamil Nadu</span>
              <span>•</span>
              <a href="#hero" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Back to Top ↑</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
