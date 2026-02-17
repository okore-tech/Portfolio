"use client";

import React, { useEffect, useMemo, useState } from "react";

const CV_URL = "/Joyce_Waithera_Okore_CV_ATS.pdf";
const EMAIL = "okorewizjoyce@gmail.com";

type Category = "edtech" | "web-development" | "integrations";
type Tab = Category;

type Project = {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  thumb: string;
  live?: string;
  code?: string;

  problem: string;
  built: string[];
  impact: string[];
  stack: string[];
};

function useTypedText(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex] ?? "";
    const speed = deleting ? 60 : 95;

    const timer = window.setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, charIndex + 1);
        setText(next);
        setCharIndex((c) => c + 1);
        if (next === current) setDeleting(true);
      } else {
        const next = current.slice(0, Math.max(0, charIndex - 1));
        setText(next);
        setCharIndex((c) => Math.max(0, c - 1));
        if (next.length === 0) {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        }
      }
    }, speed);

    return () => window.clearTimeout(timer);
  }, [words, wordIndex, charIndex, deleting]);

  return text;
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="chip">{children}</span>;
}

function Modal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !project) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Project details">
      <button className="modal-overlay-close" onClick={onClose} aria-label="Close overlay" />
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>

        <div className="modal-head">
          <div>
            <p className="modal-k">{project.category.toUpperCase()}</p>
            <h3 className="modal-title">{project.title}</h3>
            <p className="modal-sub">{project.subtitle}</p>
          </div>
          <div className="modal-links">
            {project.live ? (
              <a className="btn btn-sm" href={project.live} target="_blank" rel="noreferrer">
                Live ↗
              </a>
            ) : null}
            {project.code ? (
              <a className="btn btn-outline btn-sm" href={project.code} target="_blank" rel="noreferrer">
                Code ↗
              </a>
            ) : null}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-card">
              <h4>Problem</h4>
              <p>{project.problem}</p>
            </div>

            <div className="modal-card">
              <h4>What I Built</h4>
              <ul>
                {project.built.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>

            <div className="modal-card">
              <h4>Impact</h4>
              <ul>
                {project.impact.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>

            <div className="modal-card">
              <h4>Stack</h4>
              <div className="chips">
                {project.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-foot">
            <a className="btn btn-sm" href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry%20—%20${encodeURIComponent(project.title)}`}>
              Email me about this →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const typed = useTypedText([
    "Software Engineer",
    "Frontend Developer",
    "QA & Delivery Support",
    "Integration Builder",
  ]);

  const [activeTab, setActiveTab] = useState<Tab>("edtech");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "storyhippo",
      category: "edtech",
      title: "StoryHippo Assessments",
      subtitle: "Reading Adventure assessment UI + progress states",
      thumb: "/img/projects/storyhippo.png",
      problem:
        "Learners needed a clear, guided way to pick assessments and understand what was completed vs pending.",
      built: [
        "Card-based assessment selection UI (Sound Detective, Letter Builder, Speedy Reader)",
        "Completion states (Done/Completed) and consistent navigation patterns",
        "Cleaner structure for scalable assessment flows",
      ],
      impact: [
        "Improved learner clarity with consistent UI states and predictable flow",
        "Reduced confusion by making progress visible at a glance",
        "Created a reusable pattern for other assessment modules",
      ],
      stack: ["React", "Next.js", "TypeScript", "UI State", "QA Verification"],
    },
    {
      id: "beanyou",
      category: "web-development",
      title: "Bean You Website",
      subtitle: "Production website with responsive component structure",
      thumb: "/img/projects/beanyou.png",
      live: "https://beanyou.com/",
      code: "https://github.com/okore-tech",
      problem:
        "A public-facing site needed fast iteration, consistent visuals, and mobile-first layout without breaking production quality.",
      built: [
        "Responsive marketing + product sections with clear hierarchy",
        "Reusable UI blocks for faster updates and consistency",
        "Production-friendly delivery and QA checks during updates",
      ],
      impact: [
        "Shipped updates quickly while keeping UX consistent",
        "Improved readability and structure for mobile users",
        "Reduced future rework via reusable components",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "UI Architecture"],
    },
    {
      id: "tokenization",
      category: "integrations",
      title: "IRWA + Tokenization Integration",
      subtitle: "Secure token workflows + structured API communication",
      thumb: "/img/projects/tokenization.png",
      live: "https://parcels.beanyou.com/",
      problem:
        "The mobile app needed secure, reliable communication with backend workflows using token-based logic and safe error handling.",
      built: [
        "Tokenization-based integration patterns for secure requests",
        "Structured request/response handling with error-safe logic",
        "Support for IRWA flow requirements in app-backend communication",
      ],
      impact: [
        "Improved reliability of app-to-backend communication",
        "Reduced integration failures with safer error handling patterns",
        "Better traceability and consistency across authenticated flows",
      ],
      stack: ["REST APIs", "Tokenization", "Auth", "Error Handling"],
    },
  ];

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === openId) ?? null,
    [projects, openId]
  );

  const tabs = useMemo(
    () => [
      { key: "edtech" as const, label: "EdTech" },
      { key: "web-development" as const, label: "Website Projects" },
      { key: "integrations" as const, label: "Integrations" },
    ],
    []
  );

  const filtered = projects.filter((p) => p.category === activeTab);

  // Active nav on scroll + sticky header + close mobile nav
  useEffect(() => {
    const header = document.querySelector("header");
    const sections = Array.from(document.querySelectorAll("section"));
    const navLinks = Array.from(document.querySelectorAll("header nav a"));

    const onScroll = () => {
      const top = window.scrollY;

      sections.forEach((sec) => {
        const el = sec as HTMLElement;
        const offset = el.offsetTop - 150;
        const height = el.offsetHeight;
        const id = el.getAttribute("id");

        if (id && top >= offset && top < offset + height) {
          navLinks.forEach((a) => a.classList.remove("active"));
          const match = document.querySelector(`header nav a[href*="${id}"]`);
          match?.classList.add("active");
        }
      });

      header?.classList.toggle("sticky", window.scrollY > 100);
      setMenuOpen(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal animation without external libs
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll(
        ".home-content, .about-content, .heading, .portfolio-text, .tab-bar, .home-img, .services-container, .portfolio-box, .contact, .about-img, .experience"
      )
    ) as HTMLElement[];

    targets.forEach((el) => el.classList.add("reveal-init"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeTab]);

  return (
    <>
      {/* header */}
      <header className="header">
        <a href="#home" className="logo">
          JO
        </a>

        <button
          id="menu-icon"
          className="icon-menu"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>

        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
          <a href="#home" className="active" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#services" onClick={() => setMenuOpen(false)}>
            Services
          </a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>
            Portfolio
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
      </header>

      {/* home */}
      <section className="home" id="home">
        <div className="home-content">
          <h3>Hello, my name is</h3>
          <h1>Joyce Waithera Okore</h1>
          <h3>
            And I&apos;m a <span className="multiple-text">{typed}</span>
            <span className="cursor">|</span>
          </h3>

          <p>
            I build clean, modern web products with React/Next.js and TypeScript. I also support delivery workflows (QA
            checks, issue triage, fix verification) and build practical integrations (APIs, token workflows).
          </p>

          <div className="social-media">
            <a
              href="https://www.linkedin.com/in/joyce-okore-747551296"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a href="https://github.com/okore-tech" target="_blank" rel="noreferrer" aria-label="GitHub">
              gh
            </a>
            <a href="https://beanyou.com/" target="_blank" rel="noreferrer" aria-label="Bean You">
              web
            </a>
          </div>

          <a href={CV_URL} target="_blank" rel="noreferrer" className="btn">
            Download CV
          </a>
        </div>

        <div className="home-img">
          <img src="/img/home.png" alt="Joyce portrait" />
        </div>
      </section>

      {/* about */}
      <section className="about" id="about">
        <div className="about-img">
          <img src="/img/about.png" alt="About Joyce" />
        </div>

        <div className="about-content">
          <h2 className="heading">
            About <span>Me</span>
          </h2>
          <p>
            I produce digital experiences that look great and work reliably. I enjoy turning product goals into UI
            systems, collaborating with teams, and shipping maintainable code.
          </p>
        </div>
      </section>

      {/* services */}
      <section className="services" id="services">
        <h2 className="heading">
          My <span>Services</span>
        </h2>

        <div className="services-container">
          <div className="services-box">
            <i className="svc">{"</>"}</i>
            <h3>Web Development</h3>
            <p>Modern websites and web apps with clean structure, responsive UI, and reusable components.</p>
            <a href="#portfolio" className="btn">
              See More
            </a>
          </div>

          <div className="services-box">
            <i className="svc">UI</i>
            <h3>UI Improvements</h3>
            <p>Refactors + polish that improve readability, accessibility, and maintainability.</p>
            <a href="#portfolio" className="btn">
              See More
            </a>
          </div>

          <div className="services-box">
            <i className="svc">QA</i>
            <h3>QA &amp; Release Support</h3>
            <p>Regression testing, bug triage, and fix verification to keep releases stable.</p>
            <a href="#contact" className="btn">
              See More
            </a>
          </div>
        </div>
      </section>

      {/* experience */}
      <section className="experience" id="experience">
        <h2 className="heading">
          Work <span>Experience</span>
        </h2>

        <div className="experience-container">
          <div className="exp-card">
            <div className="exp-top">
              <h3>Software Delivery &amp; QA Associate</h3>
              <p className="exp-meta">StoryHippo (Storymoja) · 2024–Present</p>
            </div>
            <ul className="exp-list">
              <li>Regression testing across learner and admin flows; release validation.</li>
              <li>Issue triage with clear reproduction steps + fix verification post-deploy.</li>
              <li>Supported learner experience improvements through structured feedback.</li>
            </ul>
          </div>

          <div className="exp-card">
            <div className="exp-top">
              <h3>Frontend Developer (Contract)</h3>
              <p className="exp-meta">Bean You · 2025–Present</p>
            </div>
            <ul className="exp-list">
              <li>Shipped production UI using Next.js + TypeScript, with mobile-first layout.</li>
              <li>Built reusable components and improved page structure for faster iteration.</li>
              <li>Collaborated with stakeholders to deliver updates without sacrificing quality.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* portfolio */}
      <section className="portfolio" id="portfolio">
        <h2 className="heading">
          Latest <span>Projects</span>
        </h2>

        <div className="portfolio-text">
          <h3>
            Want to see more work? Check my GitHub{" "}
            <a href="https://github.com/okore-tech" target="_blank" rel="noreferrer" style={{ color: "#0ef" }}>
              here
            </a>
          </h3>
        </div>

        <div className="tab-bar">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab-button ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="portfolio-container">
          {filtered.map((p) => (
            <button
              key={p.id}
              className={`portfolio-box ${p.category}`}
              onClick={() => setOpenId(p.id)}
              type="button"
              aria-label={`Open ${p.title} details`}
            >
              <img src={p.thumb} alt={p.title} />
              <div className="portfolio-layer">
                <h4>{p.title}</h4>
                <p>{p.subtitle}</p>
                <span className="project-open">↗</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* contact (no form) */}
      <section className="contact" id="contact">
        <h2 className="heading">
          Contact <span>Me</span>
        </h2>

        <div style={{ maxWidth: "70rem", margin: "1rem auto", textAlign: "center" }}>
          <p style={{ fontSize: "1.6rem", color: "rgba(255,255,255,0.86)", lineHeight: 1.7 }}>
            The fastest way to reach me is by email. I usually reply within 24–48 hours.
          </p>

          <div
            style={{
              marginTop: "2.4rem",
              display: "flex",
              justifyContent: "center",
              gap: "1.2rem",
              flexWrap: "wrap",
            }}
          >
            <a className="btn" href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry%20—%20Joyce%20Okore`}>
              Email Me
            </a>

            <a
              className="btn btn-outline"
              href="https://www.linkedin.com/in/joyce-okore-747551296"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>

            <a className="btn btn-outline" href="https://github.com/okore-tech" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>

          <div className="contact-quick">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="https://beanyou.com/" target="_blank" rel="noreferrer">
              Bean You ↗
            </a>
            <a href="#portfolio">View Projects ↓</a>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="footer">
        <div className="footer-text">
          <p>
            Copyright © {new Date().getFullYear()} by Joyce Okore | All Rights Reserved
          </p>
        </div>

        <div className="footer-iconTop">
          <a href="#home" aria-label="Back to top">
            ↑
          </a>
        </div>
      </footer>

      {/* Project modal */}
      <Modal open={!!openId} onClose={() => setOpenId(null)} project={selectedProject} />
    </>
  );
}
