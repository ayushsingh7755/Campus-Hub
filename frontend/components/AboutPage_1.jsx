import { useState } from "react";
import Navbar2 from "./navbar2";
import Footer from "./footer";
import Navbar3 from "./navbar3";

// ── SVG ICONS ─────────────────────────────────────────────────────────────
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconHeart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const IconTwitter = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── BADGE ─────────────────────────────────────────────────────────────────
function SectionTag({ children }) {
  return (
    <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-xs font-semibold text-purple-300 tracking-widest uppercase mb-5">
      {children}
    </span>
  );
}

// ── VALUE CARD ─────────────────────────────────────────────────────────────
function ValueCard({ icon, title, desc }) {
  return (
    <div className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-white/[0.05] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(132,85,239,0.15)] cursor-default">
      <div className="w-11 h-11 rounded-xl bg-purple-500/[0.13] border border-purple-500/20 flex items-center justify-center text-purple-300 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-[#F0ECFF] text-[15px] mb-2">{title}</h3>
      <p className="text-sm text-[#9B96B8] leading-relaxed">{desc}</p>
    </div>
  );
}

// ── STAT CARD ─────────────────────────────────────────────────────────────
function StatCard({ num, label }) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
      <div className="text-3xl font-bold text-[#F0ECFF] mb-1">{num}</div>
      <div className="text-sm text-[#9B96B8]">{label}</div>
    </div>
  );
}

// ── SOCIAL BUTTON ─────────────────────────────────────────────────────────
function SocialBtn({ icon, label, href }) {
  return (
    <a
      href={href || "#"}
      aria-label={label}
      className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#9B96B8] hover:text-[#F0ECFF] hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
    >
      {icon}
    </a>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeNav, setActiveNav] = useState("About");

  const navLinks = ["Home", "Marketplace", "Sell", "Services", "About"];

  const values = [
    { icon: <IconUsers />,  title: "Community First",    desc: "Every feature is designed around the campus community — real students, real needs, real connections." },
    { icon: <IconShield />, title: "Trust & Safety",     desc: "College email verification ensures every user is genuine. No strangers, no scams, ever." },
    { icon: <IconZap />,    title: "Speed & Simplicity", desc: "List an item in under 60 seconds. Browse, chat, and close deals without unnecessary friction." },
    { icon: <IconHeart />,  title: "Student-Driven",     desc: "Built by a student, for students. Every decision is made with the campus lifestyle in mind." },
    { icon: <IconCode />,   title: "Modern Tech",        desc: "Real-time chat, smart filters, and instant notifications powered by a cutting-edge stack." },
    { icon: <IconGlobe />,  title: "Growing Network",    desc: "Expanding to campuses across India, bringing the marketplace model to every college." },
  ];

 

  return (
    <div className="min-h-screen bg-[#07060F] text-[#F0ECFF] font-sans overflow-x-hidden">

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-1/2 h-[60vh] bg-[radial-gradient(ellipse_60%_50%_at_10%_0%,rgba(132,85,239,0.15),transparent_70%)]" />
        <div className="absolute top-[10%] right-0 w-2/5 h-[60vh] bg-[radial-gradient(ellipse_60%_50%_at_90%_20%,rgba(126,184,255,0.09),transparent_70%)]" />
      </div>

      <div className="relative z-10">

       <Navbar3/>
        
        {/* ── HERO ── */}
        <header className="text-center pt-24 pb-16 px-6 max-w-3xl mx-auto">
          <SectionTag>Our Story</SectionTag>
          <h1 className="text-5xl md:text-[58px] font-bold tracking-tight leading-[1.1] mb-5">
            Built for Students,{" "}
            <span className="bg-gradient-to-r from-purple-200 to-blue-300 bg-clip-text text-transparent">
              By a Student
            </span>
          </h1>
          <p className="text-lg text-[#9B96B8] leading-relaxed max-w-xl mx-auto">
           CampusHub was born by just seeing and experiencing a simple problem of buying and selling on campus,students  face problems
           on finding the things that they need in their academics and selling what they no longer need.
          </p>
        </header>

        {/* ── MISSION ── */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-10 md:p-14 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[radial-gradient(circle,rgba(132,85,239,0.12),transparent_70%)] pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative z-10">
              <div>
                <SectionTag>Our Mission</SectionTag>
                <h2 className="text-3xl font-bold tracking-tight text-[#F0ECFF] mb-4">
                  Empowering every campus community
                </h2>
                <p className="text-[#9B96B8] leading-[1.75] mb-4">
                  We believe every college campus is a self-sufficient ecosystem. Students have
                  what others need — textbooks, gadgets, skills, time. CampusHub connects them
                  in a safe, verified environment where trust isn't just promised, it's built
                  into the platform.
                </p>
                <p className="text-[#9B96B8] leading-[1.75]">
                  Our goal is to make every campus financially smarter — helping students earn
                  from what they no longer need, save on what they're looking for, and build
                  meaningful connections before they graduate.
                </p>
              </div>
             
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="mb-11">
            <SectionTag>What We Stand For</SectionTag>
            <h2 className="text-4xl font-bold tracking-tight text-[#F0ECFF] mb-3">
              Our core values
            </h2>
            <p className="text-[#9B96B8] leading-relaxed max-w-md">
              Six principles that guide every decision we make at CampusHub.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => <ValueCard key={v.title} {...v} />)}
          </div>
        </section>

        {/* ── CREATOR ── */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="mb-11">
            <SectionTag>The Creator</SectionTag>
            <h2 className="text-4xl font-bold tracking-tight text-[#F0ECFF]">
              Meet the founder
            </h2>
          </div>

          <div className="relative bg-white/[0.03] border border-purple-500/25 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row gap-10 md:gap-12 items-start overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(circle,rgba(132,85,239,0.10),transparent_70%)] pointer-events-none" />

            {/* Avatar */}
            <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center text-white text-4xl font-bold shrink-0 border-2 border-purple-500/40 shadow-[0_0_40px_rgba(132,85,239,0.35)] select-none">
              AS
            </div>

            {/* Info */}
            <div className="relative z-10 flex-1 min-w-0">
              <p className="text-xs font-semibold text-purple-300 tracking-widest uppercase mb-2">
                Founder &amp; Developer
              </p>
              <h3 className="text-3xl font-bold tracking-tight text-[#F0ECFF] mb-1">
                Ayush Singh
              </h3>
              <p className="text-sm text-[#5E5A7A] mb-6">
                 ayushsingh57571@gmail.com
              </p>

              <p className="text-[#9B96B8] leading-[1.75] mb-4 max-w-xl">
                Hey, I'm Ayush — a student of Maharaja Surajmal Institute of technology who got tired of the chaos around campus
                buying and selling, no real-time
                communication. So I built CampusHub: a platform that puts students first with
                trust, speed, and community at its core.
              </p>
              <p className="text-[#9B96B8] leading-[1.75] mb-8 max-w-xl">
                CampusHub is my attempt to solve a real problem I face every day — and hopefully
                make campus life a little better for everyone else too. I'm continuously building,
                listening to feedback, and shipping improvements. This is just the beginning.
              </p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2 mb-7">
                {["Full-Stack Dev", "React", "Node.js", "UI/UX Design",].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-2.5">
                <SocialBtn icon={<IconGithub />}   label="GitHub"   href="https://github.com/ayushsingh7755/ayushsingh7755" />
                
                 <a href="https://www.linkedin.com/in/ayush-singh-b70525314/" className=" px-[12px]  max-[750px]:px-[9px]  max-[750px]:flex  max-[750px]:items-center rounded-[9px] text-[24px] max-[750px]:text-[18px]   font-semibold text-white bg-blue-600 border border-transparent cursor-pointer shadow-[0_0_20px_rgba(132,85,239,0.5)] transition-[background,box-shadow,transform] duration-200 font-['Inter',sans-serif] hover:bg-[var(--purple-light)] hover:shadow-[0_0_32px_rgba(155,111,245,0.65)] hover:-translate-y-[1px]">in</a>
    </div>
            </div>
          </div>
        </section>
        <Footer/>

       
       

        

      </div>
    </div>
  );
}
