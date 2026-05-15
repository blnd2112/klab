import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { Archive, BookOpen, Building2, CalendarDays, ChevronDown, Globe2, Mail, MapPin, Menu, Newspaper, Search, ShieldCheck, Sparkles, UploadCloud, UsersRound, X } from 'lucide-react';
import './styles.css';

const copy = {
  en: {
    brandTop: 'Kurdish Center', brandBottom: 'Digital Library',
    nav: ['Home', 'Archive', 'Achievements', 'About Us', 'Who We Are', 'Contact', 'Admin'],
    eyebrow: 'A cultural institution for Kurdish memory',
    heroTitle: 'A refined digital archive for books, newspapers, research, and cultural records.',
    heroBody: 'A bilingual frontend demo for a serious Kurdish cultural center — editorial, minimal, cinematic, and designed around research access rather than decoration.',
    scroll: 'Scroll to explore', explore: 'Explore archive', contribute: 'Admin upload demo',
    stats: ['Digitized materials', 'Research categories', 'Languages supported'],
    archiveTitle: 'Archive Search', archiveSubtitle: 'Search full text, author, category, and exact publication dates instantly.',
    keyword: 'Keyword in full text', author: 'Author', date: 'Specific date', allAuthors: 'All authors', allDates: 'Any date', results: 'results',
    achievementsTitle: 'Achievements', achievementsLead: 'A polished institutional section for milestones, preservation work, public programs, and digital access impact.',
    achievements: [
      ['1,240+', 'catalogued cultural items'], ['38', 'newspaper collections indexed'], ['14', 'community research programs'], ['2', 'public languages supported']
    ],
    aboutTitle: 'About Us', aboutLead: 'We are building a long-term digital home for Kurdish cultural heritage — a place where books, periodicals, newspapers, oral histories, and rare records can be preserved, studied, and shared.',
    aboutCards: ['Collection & preservation', 'Digitization & metadata', 'Research access', 'Cultural programming'],
    aboutText: 'The interface is designed for institutions that need credibility: restrained color, smaller typography, strong rhythm, bilingual navigation, and archive-first content structure.',
    whoTitle: 'Who We Are', whoLead: 'A center for librarians, archivists, researchers, translators, designers, and volunteers working together to protect Kurdish memory.',
    whoItems: ['Archive Team', 'Research Fellows', 'Translation Unit', 'Community Volunteers'],
    contactTitle: 'Contact', contactLead: 'For archive donations, research access, partnerships, or volunteering, contact the center team.',
    contactName: 'Full name', contactEmail: 'Email address', contactMsg: 'Message', contactSend: 'Send message demo',
    adminTitle: 'Admin Dashboard', adminLead: 'Secure upload form concept for books and newspapers. This frontend demo stores submissions in browser state only.',
    title: 'Title', category: 'Category', content: 'Full-text content', submit: 'Add to demo archive', book: 'Book', newspaper: 'Newspaper', saved: 'Demo item added to archive.',
    footer: 'Professional bilingual archive demo. Frontend only.'
  },
  ku: {
    brandTop: 'ناوەندی کوردی', brandBottom: 'کتێبخانەی دیجیتاڵ',
    nav: ['سەرەکی', 'ئەرشیف', 'دەستکەوتەکان', 'دەربارەی ئێمە', 'ئێمە کێین', 'پەیوەندی', 'بەڕێوەبەر'],
    eyebrow: 'دامەزراوەیەکی کلتووری بۆ یادگەی کوردی',
    heroTitle: 'ئەرشیفێکی دیجیتاڵی ڕەسەن بۆ کتێب، ڕۆژنامە، توێژینەوە و تۆماری کلتووری.',
    heroBody: 'دیمۆیەکی فرۆنتێندی دوو زمانە بۆ ناوەندێکی کلتووری کوردی — ڕوون، پیشەیی، سینەمایی و تایبەت بە دەستگەیشتنی توێژەران.',
    scroll: 'بە سکرۆڵ بەردەوام بە', explore: 'گەڕان لە ئەرشیف', contribute: 'دیمۆی بارکردن',
    stats: ['بابەتی دیجیتاڵکراو', 'بەشی توێژینەوە', 'زمانی پشتگیریکراو'],
    archiveTitle: 'گەڕانی ئەرشیف', archiveSubtitle: 'گەڕان لە ناوەڕۆک، نووسەر، جۆر و بەرواری دیاریکراو بە خێرایی.',
    keyword: 'وشەی سەرەکی لە ناوەڕۆک', author: 'نووسەر', date: 'بەرواری دیاریکراو', allAuthors: 'هەموو نووسەرەکان', allDates: 'هەر بەروارێک', results: 'ئەنجام',
    achievementsTitle: 'دەستکەوتەکان', achievementsLead: 'بەشێکی دامەزراوەیی بۆ نیشاندانی قۆناغەکان، کاری پاراستن، پڕۆگرامە گشتییەکان و کاریگەریی دەستگەیشتنی دیجیتاڵ.',
    achievements: [
      ['+١,٢٤٠', 'بابەتی کلتووری پۆلێنکراو'], ['٣٨', 'کۆمەڵە ڕۆژنامەی ئیندێکسکراو'], ['١٤', 'پڕۆگرامی توێژینەوەی کۆمەڵگا'], ['٢', 'زمانی گشتی پشتگیریکراو']
    ],
    aboutTitle: 'دەربارەی ئێمە', aboutLead: 'ئێمە خانەیەکی دیجیتاڵی درێژخایەن بۆ میراتی کلتووری کوردی دروست دەکەین؛ شوێنێک بۆ پاراستن، خوێندنەوە و هاوبەشکردنی کتێب، ڕۆژنامە، گۆڤار و تۆمارە دەگمەنان.',
    aboutCards: ['کۆکردنەوە و پاراستن', 'دیجیتاڵکردن و داتای ناساندن', 'دەستگەیشتنی توێژینەوە', 'پڕۆگرامە کلتوورییەکان'],
    aboutText: 'ئەم ڕووکارە بۆ دامەزراوەی جددی دروستکراوە: ڕەنگی سنووردار، تایپۆگرافیای بچووکتر، ڕێنیشاندەری دوو زمانە، و پێکهاتەی ناوەڕۆکی ئەرشیفی.',
    whoTitle: 'ئێمە کێین', whoLead: 'ناوەندێک بۆ کتێبەوان، ئەرشیڤکار، توێژەر، وەرگێڕ، دیزاینەر و خۆبەخشانی پاراستنی یادگەی کوردی.',
    whoItems: ['تیمی ئەرشیف', 'توێژەرانی هاوکار', 'یەکەی وەرگێڕان', 'خۆبەخشانی کۆمەڵگا'],
    contactTitle: 'پەیوەندی', contactLead: 'بۆ بەخشینی بابەتی ئەرشیفی، دەستگەیشتنی توێژینەوە، هاوبەشی یان خۆبەخشی، پەیوەندی بکە.',
    contactName: 'ناوی تەواو', contactEmail: 'ئیمەیڵ', contactMsg: 'نامە', contactSend: 'ناردنی دیمۆ',
    adminTitle: 'داشبۆردی بەڕێوەبەر', adminLead: 'فۆڕمی پارێزراوی بارکردنی کتێب و ڕۆژنامە. ئەم دیمۆیە تەنها لە براوسەر بابەتەکان هەڵدەگرێت.',
    title: 'ناونیشان', category: 'جۆر', content: 'ناوەڕۆکی تەواو', submit: 'زیادکردن بۆ دیمۆ', book: 'کتێب', newspaper: 'ڕۆژنامە', saved: 'بابەتەکە زیادکرا.',
    footer: 'دیمۆی ئەرشیفی پیشەیی بە دوو زمان. تەنها فرۆنتێند.'
  }
};

const initialItems = [
  { id: 1, type: 'Book', title: 'Songs of the Mountain Archive', author: 'Dilan Rostam', date: '1968-04-12', category: 'Oral History', content: 'A collected volume documenting Kurdish folk songs, seasonal rituals, migration memories, and mountain villages across the Zagros region.' },
  { id: 2, type: 'Newspaper', title: 'Hawler Cultural Review', author: 'Shilan Barwari', date: '1984-09-03', category: 'Newspaper', content: 'A newspaper issue covering theatre, language preservation, public lectures, museum collections, and community education in Erbil.' },
  { id: 3, type: 'Book', title: 'Manuscripts of Memory', author: 'Karwan Aziz', date: '1977-01-22', category: 'Manuscript Studies', content: 'Research notes on manuscript conservation, cataloguing, ink analysis, religious poetry, private libraries, and Kurdish literary heritage.' },
  { id: 4, type: 'Newspaper', title: 'Rojnameya Botan Selection', author: 'Avin Dara', date: '1992-06-18', category: 'Periodicals', content: 'Editorials and reports about education, displacement, language policy, women writers, and cultural organizations after political change.' },
  { id: 5, type: 'Book', title: 'Architecture of the Citadel', author: 'Hemin Qadir', date: '2006-11-09', category: 'Architecture', content: 'A survey of citadel houses, urban layers, restoration ethics, historic streets, photographs, and spatial memory in Kurdish cities.' }
];

function useDebounced(value, delay = 220) {
  const [v, setV] = useState(value);
  useEffect(() => { const timer = setTimeout(() => setV(value), delay); return () => clearTimeout(timer); }, [value, delay]);
  return v;
}

function App() {
  const [lang, setLang] = useState('en');
  const [items, setItems] = useState(initialItems);
  const [filters, setFilters] = useState({ q: '', author: '', date: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];
  const isKu = lang === 'ku';
  const pages = ['Home', 'Archive', 'Achievements', 'About Us', 'Who We Are', 'Contact', 'Admin'];
  const debounced = useDebounced(filters);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal', { y: 34, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: .9, stagger: .055, ease: 'power3.out' });
      gsap.fromTo('.kinetic-line', { scaleX: 0 }, { scaleX: 1, duration: 1.15, ease: 'expo.inOut', transformOrigin: isKu ? 'right center' : 'left center' });
      gsap.to('.orb', { y: -18, x: 12, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: .6 });
    });
    return () => ctx.revert();
  }, [lang, isKu]);

  useEffect(() => {
    const sections = gsap.utils.toArray('.section-screen');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: .22 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const authors = [...new Set(items.map(x => x.author))];
  const filtered = useMemo(() => {
    const q = debounced.q.trim().toLowerCase();
    return items.filter(item => {
      const keywordMatch = !q || [item.title, item.author, item.category, item.content, item.type].join(' ').toLowerCase().includes(q);
      const authorMatch = !debounced.author || item.author === debounced.author;
      const dateMatch = !debounced.date || item.date === debounced.date;
      return keywordMatch && authorMatch && dateMatch;
    });
  }, [items, debounced]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };
  const label = (key) => t.nav[pages.indexOf(key)];

  return <main className={isKu ? 'app rtl' : 'app'} dir={isKu ? 'rtl' : 'ltr'}>
    <Header t={t} lang={lang} setLang={setLang} pages={pages} label={label} scrollTo={scrollTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    <div className="scroll-stage">
      <Home t={t} scrollTo={scrollTo} label={label} items={items}/>
      <ArchivePage t={t} filters={filters} setFilters={setFilters} authors={authors} filtered={filtered}/>
      <Achievements t={t}/>
      <About t={t}/>
      <Who t={t}/>
      <Contact t={t}/>
      <Admin t={t} setItems={setItems} lang={lang}/>
    </div>
    <Footer t={t}/>
  </main>;
}

function Header({ t, lang, setLang, pages, label, scrollTo, menuOpen, setMenuOpen }) {
  return <header className="site-header">
    <button className="brand" onClick={() => scrollTo('home')}>
      <span>{t.brandTop}</span><strong>{t.brandBottom}</strong>
    </button>
    <nav className={menuOpen ? 'nav open' : 'nav'}>
      {pages.map(p => <button key={p} onClick={() => scrollTo(idFor(p))}>{label(p)}</button>)}
    </nav>
    <div className="header-actions">
      <button className="lang" onClick={() => setLang(lang === 'en' ? 'ku' : 'en')}><Globe2 size={14}/>{lang === 'en' ? 'کوردی' : 'English'}</button>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18}/> : <Menu size={18}/>}</button>
    </div>
  </header>
}

function idFor(page) { return page.toLowerCase().replaceAll(' ', '-'); }

function Section({ id, children, className = '' }) {
  return <section id={id} className={`section-screen ${className}`}>{children}</section>;
}

function Home({ t, scrollTo, items }) {
  return <Section id="home" className="hero">
    <div className="orb orb-a"></div><div className="orb orb-b"></div>
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow reveal"><Sparkles size={15}/>{t.eyebrow}</p>
        <h1 className="reveal">{t.heroTitle}</h1>
        <div className="kinetic-line"></div>
        <p className="lead reveal">{t.heroBody}</p>
        <div className="cta-row reveal"><button onClick={() => scrollTo('archive')}>{t.explore}</button><button className="ghost" onClick={() => scrollTo('admin')}>{t.contribute}</button></div>
      </div>
      <div className="feature-panel reveal">
        <div className="artifact-card tall"><Archive/><span>{t.stats[0]}</span><strong>{items.length * 248}</strong></div>
        <div className="artifact-card"><BookOpen/><span>{t.stats[1]}</span><strong>12</strong></div>
        <div className="artifact-card"><Globe2/><span>{t.stats[2]}</span><strong>2</strong></div>
      </div>
    </div>
    <button className="scroll-cue" onClick={() => scrollTo('archive')}>{t.scroll}<ChevronDown size={16}/></button>
  </Section>;
}

function ArchivePage({ t, filters, setFilters, authors, filtered }) {
  return <Section id="archive">
    <SectionHead icon={<Search/>} title={t.archiveTitle} lead={t.archiveSubtitle}/>
    <div className="search-panel reveal">
      <label>{t.keyword}<input value={filters.q} onChange={e => setFilters({ ...filters, q: e.target.value })} placeholder="Search title, content, category..." /></label>
      <label>{t.author}<select value={filters.author} onChange={e => setFilters({ ...filters, author: e.target.value })}><option value="">{t.allAuthors}</option>{authors.map(a => <option key={a}>{a}</option>)}</select></label>
      <label>{t.date}<input type="date" value={filters.date} onChange={e => setFilters({ ...filters, date: e.target.value })}/></label>
    </div>
    <p className="result-meta reveal"><strong>{filtered.length}</strong> {t.results}</p>
    <div className="horizontal-archive reveal">{filtered.map(item => <ItemCard key={item.id} item={item}/>)}</div>
  </Section>;
}

function Achievements({ t }) {
  return <Section id="achievements" className="achievements-section">
    <SectionHead icon={<Building2/>} title={t.achievementsTitle} lead={t.achievementsLead}/>
    <div className="achievement-grid reveal">
      {t.achievements.map(([num, text], i) => <div className="achievement" key={text}><span>0{i + 1}</span><strong>{num}</strong><p>{text}</p></div>)}
    </div>
  </Section>;
}

function About({ t }) {
  return <Section id="about-us">
    <SectionHead icon={<Archive/>} title={t.aboutTitle} lead={t.aboutLead}/>
    <div className="about-grid reveal">
      {t.aboutCards.map((card, i) => <div className="about-card" key={card}><b>0{i + 1}</b><h3>{card}</h3><p>{t.aboutText}</p></div>)}
    </div>
  </Section>;
}

function Who({ t }) {
  return <Section id="who-we-are">
    <SectionHead icon={<UsersRound/>} title={t.whoTitle} lead={t.whoLead}/>
    <div className="people-grid reveal">
      {t.whoItems.map((item, i) => <div className="person" key={item}><div>{String.fromCharCode(65 + i)}</div><h3>{item}</h3><p>{t.whoLead}</p></div>)}
    </div>
  </Section>;
}

function Contact({ t }) {
  return <Section id="contact">
    <SectionHead icon={<Mail/>} title={t.contactTitle} lead={t.contactLead}/>
    <div className="contact-grid reveal">
      <div className="contact-info"><p><MapPin size={16}/> Erbil / Hewlêr Cultural District</p><p><Mail size={16}/> archive@kurdishcenter.demo</p><p><CalendarDays size={16}/> Research access by appointment</p></div>
      <form className="contact-form" onSubmit={e => e.preventDefault()}>
        <input placeholder={t.contactName}/><input placeholder={t.contactEmail}/><textarea placeholder={t.contactMsg}/><button>{t.contactSend}</button>
      </form>
    </div>
  </Section>;
}

function Admin({ t, setItems, lang }) {
  const [type, setType] = useState('Book');
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', date: '', category: '', content: '' });
  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.date || !form.category || !form.content) return;
    setItems(prev => [{ id: Date.now(), type, ...form }, ...prev]);
    setForm({ title: '', author: '', date: '', category: '', content: '' });
    setSaved(true); setTimeout(() => setSaved(false), 1800);
  };
  return <Section id="admin">
    <SectionHead icon={<ShieldCheck/>} title={t.adminTitle} lead={t.adminLead}/>
    <form className="admin-form reveal" onSubmit={submit}>
      <div className="segmented"><button type="button" className={type === 'Book' ? 'on' : ''} onClick={() => setType('Book')}>{t.book}</button><button type="button" className={type === 'Newspaper' ? 'on' : ''} onClick={() => setType('Newspaper')}>{t.newspaper}</button></div>
      <input placeholder={t.title} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}/>
      <input placeholder={t.author} value={form.author} onChange={e => setForm({ ...form, author: e.target.value })}/>
      <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}/>
      <input placeholder={t.category} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}/>
      <textarea placeholder={t.content} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}/>
      <button><UploadCloud size={16}/>{t.submit}</button>{saved && <p className="saved"><ShieldCheck size={16}/>{t.saved}</p>}
    </form>
  </Section>;
}

function SectionHead({ icon, title, lead }) {
  return <div className="section-head reveal"><div className="section-icon">{icon}</div><h2>{title}</h2><p className="lead">{lead}</p><div className="kinetic-line"></div></div>;
}

function ItemCard({ item }) {
  const ref = useRef(null);
  const move = e => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    ref.current.style.setProperty('--rx', `${-(y / r.height - .5) * 6}deg`);
    ref.current.style.setProperty('--ry', `${(x / r.width - .5) * 6}deg`);
    ref.current.style.setProperty('--mx', `${x}px`); ref.current.style.setProperty('--my', `${y}px`);
  };
  const leave = () => { ref.current.style.setProperty('--rx', '0deg'); ref.current.style.setProperty('--ry', '0deg'); };
  return <article ref={ref} onMouseMove={move} onMouseLeave={leave} className="item-card">
    <div className="card-glare"></div><span className="type">{item.type}</span><h3>{item.title}</h3><p>{item.content}</p><small>{item.category}</small><div className="item-foot"><span>{item.author}</span><time>{item.date}</time></div>
  </article>;
}

function Footer({ t }) { return <footer><span>Kurdish Center</span><p>{t.footer}</p></footer>; }

createRoot(document.getElementById('root')).render(<App />);
