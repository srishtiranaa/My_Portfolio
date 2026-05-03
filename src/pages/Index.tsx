import { useState } from "react";
import { User, FolderOpen, BookOpen, Video, Mail, Phone, ArrowRight, Play, Sparkles } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import assignmentPages from "@/assets/assignment-pages.jpeg";

type SectionKey = "about" | "assignment" | "learnings" | "video" | "projects";

const tiles: { key: SectionKey; num: string; title: string; icon: typeof User }[] = [
  { key: "about", num: "01", title: "About Me", icon: User },
  { key: "assignment", num: "02", title: "Assignment", icon: FolderOpen },
  { key: "learnings", num: "03", title: "Weekly Learnings", icon: BookOpen },
  { key: "video", num: "04", title: "Video Introduction", icon: Video },
  { key: "projects", num: "05", title: "Projects & Extra Curriculars", icon: Sparkles },
];

const Folder = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute -top-5 left-6 h-10 w-44 bg-primary rounded-t-2xl rounded-br-2xl" />
    <div className="relative bg-primary text-primary-foreground rounded-3xl rounded-tl-none p-8 md:p-12 shadow-folder overflow-hidden">
      {children}
    </div>
  </div>
);

const Index = () => {
  const [active, setActive] = useState<SectionKey>("about");

  return (
    <div className="min-h-screen bg-background">
      <header className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-2 text-primary">
          <FolderOpen className="h-5 w-5" />
          <span className="font-display text-xl tracking-wide">Srishti Rana</span>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm tracking-wide">
          <a href="#dashboard" className="hover:text-primary transition-colors">Dashboard</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
      </header>

      <section className="container pt-6 pb-20">
        <div className="text-center mb-6">
          <p className="tracking-[0.4em] text-xs text-muted-foreground">A PERSONAL ARCHIVE · 2026</p>
        </div>
        <Folder className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 relative">
            <h1 className="font-display font-medium tracking-tight leading-none text-[16vw] md:text-[9rem] lg:text-[10rem] text-primary-foreground/95">
              PORTFOLIO
            </h1>
            <p className="absolute inset-0 flex items-center justify-center font-display text-[16vw] md:text-[9rem] lg:text-[10rem] tracking-tight leading-none text-primary-foreground/10 translate-y-3 select-none pointer-events-none">
              PORTFOLIO
            </p>
            <div className="mt-8 inline-flex items-center gap-3 text-primary-foreground/80">
              <span className="h-px w-10 bg-primary-foreground/40" />
              <span className="font-display text-2xl md:text-3xl tracking-[0.3em]">SRISHTI RANA</span>
              <span className="h-px w-10 bg-primary-foreground/40" />
            </div>
          </div>
        </Folder>
      </section>

      <section id="dashboard" className="container pb-24">
        <div className="flex items-end justify-between mb-10 border-b border-primary/20 pb-4">
          <div>
            <p className="tracking-[0.3em] text-xs text-muted-foreground mb-2">THE DASHBOARD</p>
            <h2 className="font-display text-5xl md:text-6xl text-primary">Open a folder.</h2>
          </div>
          <p className="hidden md:block text-sm text-muted-foreground italic max-w-xs text-right font-display text-lg">
            "Five chapters of a quiet, ongoing study."
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {tiles.map((t) => {
            const Icon = t.icon;
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => {
                  setActive(t.key);
                  requestAnimationFrame(() => {
                    document.getElementById("section-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }}
                className={`group relative pt-6 transition-all duration-300 ${isActive ? "-translate-y-2" : "hover:-translate-y-1"}`}
              >
                <div className={`absolute top-0 left-4 h-7 w-28 rounded-t-xl rounded-br-xl ${isActive ? "bg-primary" : "bg-primary/70 group-hover:bg-primary"}`} />
                <div className={`relative rounded-2xl rounded-tl-none p-6 h-56 flex flex-col justify-between text-left ${isActive ? "bg-primary text-primary-foreground shadow-folder" : "bg-primary/85 text-primary-foreground shadow-soft"}`}>
                  <div className="flex items-start justify-between">
                    <span className="font-display text-3xl opacity-80">{t.num}</span>
                    <Icon className="h-5 w-5 opacity-70" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{t.title}</h3>
                    <div className="mt-3 flex items-center gap-2 text-xs tracking-[0.25em] opacity-80">
                      OPEN <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div id="section-panel" className="mt-12 scroll-mt-8">
          <Folder key={active}>
            {active === "about" && <AboutPanel />}
            {active === "assignment" && <AssignmentPanel />}
            {active === "learnings" && <LearningsPanel />}
            {active === "video" && <VideoPanel />}
            {active === "projects" && <ProjectsPanel />}
          </Folder>
        </div>
      </section>

      <footer id="contact" className="bg-primary text-primary-foreground mt-16">
        <div className="container py-20 grid lg:grid-cols-2 gap-14 items-start">
          <div className="space-y-6">
            <p className="tracking-[0.3em] text-xs opacity-70">GET IN TOUCH</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">Let's talk.</h2>
            <p className="opacity-85 max-w-md leading-relaxed">
              Drop a note about a project, a question, or just to say hello. I read everything.
            </p>
            <div className="space-y-3 pt-4">
              <a href="mailto:srishtearana@gmail.com" className="flex items-center gap-3 font-display text-xl hover:opacity-80">
                <Mail className="h-5 w-5" /> srishtearana@gmail.com
              </a>
              <a href="tel:+918755257487" className="flex items-center gap-3 font-display text-xl hover:opacity-80">
                <Phone className="h-5 w-5" /> +91 87552 57487
              </a>
            </div>
            <p className="text-xs tracking-widest opacity-60 pt-8">© 2026 SRISHTI RANA · PORTFOLIO</p>
          </div>
          <div className="rounded-3xl bg-[hsl(var(--crimson-deep))] p-8 md:p-10 shadow-folder">
            <ContactForm />
          </div>
        </div>
      </footer>
    </div>
  );
};

const skillGroups: { title: string; items: string[] }[] = [
  { title: "Programming Languages", items: ["Python", "C / C++", "SQL", "JavaScript"] },
  { title: "Web Development", items: ["React.js", "HTML", "CSS", "Flask", "REST APIs", "JWT Auth"] },
  { title: "Databases", items: ["MySQL", "MongoDB Atlas", "Firebase Firestore", "DB Design & CRUD"] },
  { title: "Machine Learning & Data", items: ["Scikit-learn", "Pandas", "Feature Engineering", "Data Visualization"] },
  { title: "Tools & Platforms", items: ["Git & GitHub", "VS Code", "IntelliJ", "Streamlit", "Canva"] },
  { title: "System Design", items: ["Distributed Systems", "Client–Server Architecture", "RESTful API Design", "Fault Tolerance & Replication"] },
  { title: "Soft Skills", items: ["Leadership (IEEE VC)", "Event Management", "Public Speaking", "Team Collaboration"] },
  { title: "Bonus", items: ["Problem Solving & DSA", "Cloud Computing (NPTEL)", "Version Control"] },
];

const AboutPanel = () => (
  <div className="space-y-12">
    <div className="grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2 space-y-5">
        <p className="tracking-[0.3em] text-xs opacity-70">01 — ABOUT ME</p>
        <h3 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
          A student, a maker, a quiet observer of details.
        </h3>
        <p className="opacity-85 leading-relaxed max-w-xl">
          I'm Srishti — drawn to typography, slow craft, and the small decisions that make a page feel calm. This archive is my way of learning out loud.
        </p>
      </div>
      <dl className="space-y-3 text-sm border-l border-primary-foreground/20 pl-6">
        {[
          ["Based in", "India"],
          ["Studying", "Engineering"],
          ["Role", "IEEE Vice Chair"],
          ["Reading", "Bird by Bird"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-primary-foreground/15 pb-2">
            <dt className="opacity-60">{k}</dt>
            <dd className="font-display text-lg">{v}</dd>
          </div>
        ))}
      </dl>
    </div>

    <div className="border-t border-primary-foreground/20 pt-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="tracking-[0.3em] text-xs opacity-70 mb-2">THE TOOLBOX</p>
          <h4 className="font-display text-4xl md:text-5xl">Skills, kept honest.</h4>
        </div>
        <span className="hidden md:block font-display text-sm opacity-60 italic">filed under: capability</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skillGroups.map((g, i) => (
          <div key={g.title} className="rounded-2xl border border-primary-foreground/20 p-5 hover:bg-primary-foreground/5 transition-colors">
            <div className="flex items-baseline justify-between mb-3">
              <p className="font-display text-2xl">{g.title}</p>
              <span className="font-display text-xs opacity-50">0{i + 1}</span>
            </div>
            <ul className="space-y-1.5 text-sm opacity-85">
              {g.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <span className="opacity-50">·</span> {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AssignmentPanel = () => (
  <div className="space-y-8">
    <div>
      <p className="tracking-[0.3em] text-xs opacity-70 mb-3">02 — ASSIGNMENT</p>
      <h3 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance max-w-3xl">
        Future of Higher Education in India.
      </h3>
    </div>
    <p className="opacity-85 max-w-2xl leading-relaxed">
      A handwritten essay across eleven pages — a slow think about where Indian higher education is heading, and what it could be.
    </p>
    <div className="rounded-2xl overflow-hidden border border-primary-foreground/20 bg-[hsl(var(--cream))]">
      <img
        src={assignmentPages}
        alt="Handwritten assignment pages on the future of higher education in India"
        className="w-full h-auto block"
        loading="lazy"
      />
    </div>
    <div className="grid sm:grid-cols-3 gap-4">
      {[
        { t: "Pages", d: "Eleven, in cursive." },
        { t: "Theme", d: "Skills, equity, lifelong learning." },
        { t: "Form", d: "Pen, paper, patience." },
      ].map((x, i) => (
        <div key={x.t} className="rounded-2xl border border-primary-foreground/20 p-5">
          <p className="font-display text-3xl opacity-50">0{i + 1}</p>
          <p className="font-display text-2xl mt-1">{x.t}</p>
          <p className="text-sm opacity-75 mt-1">{x.d}</p>
        </div>
      ))}
    </div>
  </div>
);

const weeklyLearnings = [
  {
    w: "Week 01",
    focus: "Self-Introduction & Professional Basics",
    title: "Introduction & PSE Awareness",
    activities:
      "A first session of self-introductions. We were introduced to Knowledge, Skills & Attitude (KSA) and to Professional Skills & Employability (PSE), and why they matter in interviews and real life.",
    learnings:
      "How to introduce myself in a more structured, confident way — and that knowledge alone isn't enough; skills and attitude carry equal weight.",
    outcome: "Felt more comfortable speaking up and clearer on what companies look for.",
  },
  {
    w: "Week 02",
    focus: "Communication Skills",
    title: "Introduction Practice with Instructor",
    activities: "Re-did our introductions, this time in front of the instructor, with interactive participation.",
    learnings: "Clarity and structure matter as much as the words — delivery is half the message.",
    outcome: "A small but real bump in confidence and communication.",
  },
  {
    w: "Week 03",
    focus: "Verbal Communication",
    title: "Self-Introduction Practice & Common Mistakes",
    activities: "Structured introductions, observing peers, and a discussion of mistakes to avoid.",
    learnings: "How to organise thoughts before speaking, and which slips to steer clear of.",
    outcome: "Improved fluency and a calmer, clearer delivery.",
  },
  {
    w: "Week 04",
    focus: "Confidence Building",
    title: "Self-Introduction Continuation",
    activities: "Continued practising introductions to build consistency.",
    learnings: "Confidence is a by-product of repetition, not a switch you flip.",
    challenges: "Still nervous in front of an audience.",
    outcome: "Visible improvement, even with the nerves.",
  },
  {
    w: "Week 05",
    focus: "Public Speaking & Resume Skills",
    title: "JAM & Resume Skills",
    activities: "Introduced to JAM (Just A Minute) — quick, on-your-feet speaking — alongside resume basics.",
    learnings: "How to think and speak under pressure, and what makes a resume actually professional.",
    outcome: "Foundational interview prep and a steadier speaking voice.",
  },
  {
    w: "Week 06",
    focus: "Resume Optimization",
    title: "Resume Enhancement using JD",
    activities: "Analysed Job Descriptions, pulled out keywords, and worked them into the resume.",
    learnings: "A resume should be tailored, not generic — keywords decide whether you get shortlisted.",
    outcome: "A sharper, more targeted resume.",
  },
  {
    w: "Week 07",
    focus: "Creative Thinking & Professional Communication",
    title: "Creative Writing & Resume-Based Introduction",
    activities: "Wrote and presented a creative essay, took feedback, and built an introduction tied to a specific JD.",
    learnings: "How to express ideas with a bit of flair, and how to align an intro to a role.",
    outcome: "More confident in presenting written work and crafting focused introductions.",
  },
  {
    w: "Week 08",
    focus: "Writing Skills & Teamwork",
    title: "Essay Writing & Group Activity",
    activities: "Learned essay structure, then worked in groups on sentence-formation exercises.",
    learnings: "Better sense of essay shape and sentence variety — and the value of a team.",
    outcome: "Stronger writing and first real taste of collaborative work.",
  },
  {
    w: "Week 09",
    focus: "Interview Skills",
    title: "Interview Preparation & Question Framing",
    activities: "Mock interviews and group-built HR question banks, answered live in class.",
    learnings: "Started thinking like the interviewer — what they want, and how to handle the hard questions.",
    challenges: "Nerves while answering in front of others.",
    outcome: "Better at fielding unexpected questions.",
  },
  {
    w: "Week 10",
    focus: "Advanced Interview Skills",
    title: "Interview Practice & Introduction",
    activities: "Practised introductions in an interview setting and answered the instructor's questions.",
    learnings: "Tighter answer structure, and the quiet importance of body language.",
    outcome: "A clear step up from earlier sessions.",
  },
  {
    w: "Week 11",
    focus: "Personality Development & Communication",
    title: "Interview Practice & Communication Improvement",
    activities: "More interview practice, refining answers each round.",
    learnings: "How to express thoughts with more clarity in formal settings.",
    outcome: "Steady, gradual improvement in interview performance.",
  },
  {
    w: "Week 12",
    focus: "Communication & Team Interaction",
    title: "Group Discussion",
    activities: "Group discussions on a range of topics.",
    learnings: "How to land a point in a group — and how much listening actually matters.",
    challenges: "Managing speaking time without losing confidence.",
    outcome: "More comfortable and active in discussions.",
  },
  {
    w: "Week 13",
    focus: "Advanced GD Skills",
    title: "Group Discussion & Feedback",
    activities: "Continued GDs with structured feedback from the instructor.",
    learnings: "How to frame arguments well and hold space for opposing views.",
    outcome: "Sharper participation and a clearer view of what to work on.",
  },
];

const LearningsPanel = () => (
  <div className="space-y-8">
    <div>
      <p className="tracking-[0.3em] text-xs opacity-70 mb-3">03 — WEEKLY LEARNINGS</p>
      <h3 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance max-w-3xl">
        Thirteen weeks of speaking, writing, and showing up.
      </h3>
      <p className="opacity-80 mt-4 max-w-2xl leading-relaxed">
        A term-long log from PSE class — introductions, resumes, JAM, mock interviews, essays, and group discussions.
      </p>
    </div>
    <ol className="space-y-4">
      {weeklyLearnings.map((wk) => (
        <li
          key={wk.w}
          className="rounded-2xl border border-primary-foreground/20 p-6 hover:bg-primary-foreground/5 transition-colors"
        >
          <div className="grid md:grid-cols-12 gap-5">
            <div className="md:col-span-3">
              <p className="font-display text-3xl">{wk.w}</p>
              <p className="text-[11px] tracking-[0.25em] opacity-60 mt-1 uppercase">{wk.focus}</p>
            </div>
            <div className="md:col-span-9 space-y-3">
              <p className="font-display text-2xl leading-tight">{wk.title}</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm opacity-90">
                <div>
                  <p className="font-display text-xs tracking-[0.25em] opacity-60 mb-1">ACTIVITIES</p>
                  <p className="leading-relaxed">{wk.activities}</p>
                </div>
                <div>
                  <p className="font-display text-xs tracking-[0.25em] opacity-60 mb-1">KEY LEARNINGS</p>
                  <p className="leading-relaxed">{wk.learnings}</p>
                </div>
                {wk.challenges && (
                  <div>
                    <p className="font-display text-xs tracking-[0.25em] opacity-60 mb-1">CHALLENGES</p>
                    <p className="leading-relaxed">{wk.challenges}</p>
                  </div>
                )}
                <div>
                  <p className="font-display text-xs tracking-[0.25em] opacity-60 mb-1">OUTCOME</p>
                  <p className="leading-relaxed">{wk.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

const VideoPanel = () => (
  <div className="grid md:grid-cols-5 gap-10 items-center">
    <div className="md:col-span-3 aspect-video rounded-2xl border border-primary-foreground/20 relative overflow-hidden bg-[hsl(var(--crimson-deep))]">
      <iframe
        src="https://player.vimeo.com/video/1188784026?title=0&byline=0&portrait=0"
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Video Introduction"
      />
    </div>
    <div className="md:col-span-2 space-y-4">
      <p className="tracking-[0.3em] text-xs opacity-70">04 — VIDEO</p>
      <h3 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">
        A short hello, in my own voice.
      </h3>
      <p className="opacity-85">
        I find video easier than a bio. A quick clip — what I'm working on, reading, and curious about this week.
      </p>
    </div>
  </div>
);

const projects = [
  {
    t: "Mini Distributed File System",
    tag: "Systems",
    d: "Client–server architecture with replication and fault tolerance. Built to understand how data survives failure.",
    stack: ["Python", "Sockets", "Replication"],
  },
  {
    t: "Sentiment Analyzer",
    tag: "ML",
    d: "End-to-end pipeline — preprocessing, feature engineering, model, and a Streamlit front-end.",
    stack: ["Scikit-learn", "Pandas", "Streamlit"],
  },
  {
    t: "Full-Stack Web App",
    tag: "Web",
    d: "React frontend + Flask API with JWT auth and a MongoDB Atlas backend.",
    stack: ["React", "Flask", "MongoDB"],
  },
];

const extras = [
  { role: "Vice Chairperson", org: "IEEE Student Branch", note: "Led a 30+ member team across a year of events." },
  { role: "Anchor & Host", org: "College Tech Fests", note: "On-stage MC for keynote sessions and culturals." },
  { role: "Event Manager", org: "Workshops & Hackathons", note: "Logistics, partnerships, and run-of-show." },
  { role: "Learner", org: "NPTEL · Cloud Computing", note: "Certification in cloud fundamentals." },
];

const ProjectsPanel = () => (
  <div className="space-y-12">
    <div>
      <p className="tracking-[0.3em] text-xs opacity-70 mb-3">05 — PROJECTS & EXTRA CURRICULARS</p>
      <h3 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance max-w-3xl">
        Things I built. Rooms I showed up in.
      </h3>
    </div>

    <div>
      <div className="flex items-end justify-between mb-6">
        <h4 className="font-display text-3xl md:text-4xl">Projects</h4>
        <span className="font-display text-xs opacity-60 tracking-[0.3em]">SELECTED · {projects.length}</span>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <article key={p.t} className="rounded-2xl border border-primary-foreground/20 p-6 flex flex-col gap-4 hover:bg-primary-foreground/5 transition-colors">
            <div className="flex items-start justify-between">
              <span className="font-display text-3xl opacity-50">0{i + 1}</span>
              <span className="text-[10px] tracking-[0.3em] border border-primary-foreground/30 px-2 py-1 rounded-full opacity-80">
                {p.tag.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-display text-2xl leading-tight">{p.t}</p>
              <p className="text-sm opacity-80 mt-2 leading-relaxed">{p.d}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-primary-foreground/15">
              {p.stack.map((s) => (
                <span key={s} className="text-[11px] opacity-70 tracking-wider">{s}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>

    <div>
      <div className="flex items-end justify-between mb-6">
        <h4 className="font-display text-3xl md:text-4xl">Extra Curriculars</h4>
        <span className="font-display text-xs opacity-60 tracking-[0.3em]">BEYOND THE SYLLABUS</span>
      </div>
      <ul className="divide-y divide-primary-foreground/15">
        {extras.map((e) => (
          <li key={e.role} className="grid md:grid-cols-12 gap-4 py-5 items-baseline">
            <span className="font-display text-2xl md:col-span-4">{e.role}</span>
            <span className="opacity-70 md:col-span-3 text-sm">{e.org}</span>
            <span className="opacity-85 md:col-span-5 text-sm">{e.note}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Index;
