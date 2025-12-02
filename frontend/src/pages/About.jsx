import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Radio,
  Factory,
  CheckCircle2,
  Award,
  Users,
  Globe,
  Target,
  Sparkles,
  Zap,
  Layers,
  Rocket,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const heroHighlights = [
  {
    label: "Defense Grade",
    value: "Certified",
    icon: Shield,
  },
  {
    label: "Telecom",
    value: "Trusted",
    icon: Radio,
  },
  {
    label: "Manufacturing",
    value: "Precision",
    icon: Factory,
  },
];

const stats = [
  { label: "Years of Excellence", value: "15+", icon: Award },
  { label: "Projects Delivered", value: "500+", icon: CheckCircle2 },
  { label: "Engineers", value: "50+", icon: Users },
  { label: "Global Partners", value: "20+", icon: Globe },
];

const pillars = [
  {
    title: "Mission",
    description:
      "Empower defense and telecom sectors with precision-built testing systems that keep national infrastructure resilient.",
    icon: Target,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Vision",
    description:
      "Be the benchmark for reliability in mission-critical hardware by marrying in-house R&D with disciplined manufacturing.",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Innovation",
    description:
      "Evolve faster than the threat surface by investing in RF labs, ruggedization facilities, and co-development with clients.",
    icon: Rocket,
    gradient: "from-orange-500 to-amber-500",
  },
];

const capabilities = [
  {
    title: "Advanced Test Labs",
    description:
      "RF, microwave, and climatic chambers calibrated for aerospace and telecom standards.",
    icon: Layers,
  },
  {
    title: "Secure Manufacturing",
    description:
      "ISO-certified lines with IPC-trained technicians and multi-stage QA gates.",
    icon: Shield,
  },
  {
    title: "Field Support",
    description:
      "Pan-India engineers for commissioning, training, and rapid sustainment.",
    icon: Zap,
  },
];

const story = [
  {
    year: "2008",
    title: "Founded",
    content:
      "Started as Aishwarya Technologies delivering core telecom test instruments.",
  },
  {
    year: "2012",
    title: "Defense Ready",
    content:
      "Entered strategic programs with indigenous EW and communication assets.",
  },
  {
    year: "2018",
    title: "R&D Scale",
    content:
      "Launched dedicated RF & Microwave center with rapid prototyping pods.",
  },
  {
    year: "2023",
    title: "Telogica",
    content:
      "Rebranded with a unified portfolio spanning defense, telecom, and manufacturing services.",
  },
];

const About = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-[-10%] right-[-10%] w-[520px] h-[520px] rounded-full blur-[120px] opacity-30 ${
              isDarkMode ? "bg-blue-700" : "bg-blue-300"
            }`}
          />
          <div
            className={`absolute bottom-[-20%] left-[-5%] w-[420px] h-[420px] rounded-full blur-[120px] opacity-20 ${
              isDarkMode ? "bg-purple-700" : "bg-purple-300"
            }`}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold tracking-wide uppercase ${
                isDarkMode
                  ? "border-white/15 bg-white/5 text-blue-200"
                  : "border-blue-200 bg-white text-blue-700"
              }`}
            >
              Telogica • Since 2008
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Engineering trust for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                defense & telecom
              </span>
              operations.
            </h1>

            <p
              className={`mt-6 text-lg md:text-xl leading-relaxed max-w-2xl ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              We design and build high-reliability test & measurement infrastructure that keeps
              command centers, networks, and manufacturing floors mission ready.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode ? "bg-white text-black" : "bg-gray-900 text-white"
                }`}
              >
                Meet the team <ArrowRight className="w-5 h-5" />
              </button>
              <button
                className={`inline-flex items-center justify-center px-8 py-4 rounded-2xl border text-base font-semibold transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode
                    ? "border-white/20 bg-white/5 text-white"
                    : "border-gray-200 bg-white text-gray-900"
                }`}
              >
                View credentials
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-[32px] border overflow-hidden backdrop-blur-xl p-8 flex flex-col gap-6 ${
              isDarkMode
                ? "border-white/10 bg-white/5"
                : "border-gray-200 bg-white shadow-xl"
            }`}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400">
              Focus Areas
            </p>
            <div className="space-y-4">
              {heroHighlights.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-2xl ${
                        ["bg-blue-500/15 text-blue-400", "bg-purple-500/15 text-purple-400", "bg-emerald-500/15 text-emerald-400"][index]
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-gray-400">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-lg font-bold">{item.value}</span>
                </div>
              ))}
            </div>
            <div
              className={`mt-4 rounded-2xl p-5 flex items-center justify-between text-sm font-semibold ${
                isDarkMode ? "bg-white/5" : "bg-gray-50"
              }`}
            >
              Trusted by 50+ enterprise and government programs
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Pan-India
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-20">
        <div
          className={`max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 rounded-[28px] p-8 border backdrop-blur-lg ${
            isDarkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-white shadow-xl"
          }`}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div
                className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${
                  isDarkMode ? "bg-white/10" : "bg-gray-100"
                }`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                {stat.value}
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.3em] ${
              isDarkMode ? "text-blue-200" : "text-blue-600"
            }`}
          >
            Our Core
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black">
            Purpose-built for critical missions.
          </h2>
          <p
            className={`mt-4 text-lg max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Every engagement blends research, disciplined production, and long-term stewardship so our partners stay ahead of tomorrow.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`p-[1px] rounded-[28px] bg-gradient-to-r ${pillar.gradient}`}
            >
              <div
                className={`h-full rounded-[27px] p-8 text-left ${
                  isDarkMode ? "bg-gray-950" : "bg-white"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-r ${pillar.gradient}`}
                >
                  <pillar.icon className="w-7 h-7" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{pillar.title}</h3>
                <p
                  className={`mt-4 text-base leading-relaxed ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 py-16">
        <div
          className={`max-w-6xl mx-auto rounded-[32px] border p-10 backdrop-blur-lg ${
            isDarkMode
              ? "border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5"
              : "border-gray-200 bg-white shadow-2xl"
          }`}
        >
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400">
                Capabilities
              </p>
              <h2 className="mt-4 text-4xl font-black">
                Integrated services from lab to deployment.
              </h2>
              <p
                className={`mt-4 text-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Telogica eliminates hand-offs between design, build, and support so mission teams interact with one accountable partner.
              </p>
            </div>
            <div className="grid gap-6">
              {capabilities.map((capability) => (
                <div
                  key={capability.title}
                  className={`p-5 rounded-2xl border flex gap-4 items-start ${
                    isDarkMode
                      ? "border-white/10 bg-white/5"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <capability.icon className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="text-lg font-semibold">{capability.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {capability.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p
                className={`text-sm font-semibold uppercase tracking-[0.3em] ${
                  isDarkMode ? "text-purple-200" : "text-purple-600"
                }`}
              >
                Our Story
              </p>
              <h2 className="mt-4 text-4xl font-black">
                Built on steady evolution, not hype.
              </h2>
            </div>
            <p
              className={`text-lg max-w-xl ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Milestones that sharpened our craft and expanded our ability to serve national programs with confidence.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {story.map((item) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`p-6 rounded-3xl border flex flex-col gap-4 ${
                  isDarkMode
                    ? "border-white/10 bg-white/5"
                    : "border-gray-200 bg-white shadow-sm"
                }`}
              >
                <span className="text-sm font-semibold text-gray-400">{item.year}</span>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div
          className={`max-w-5xl mx-auto text-center rounded-[36px] p-12 relative overflow-hidden ${
            isDarkMode ? "bg-white/5" : "bg-gray-900"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30" />
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
              Let’s collaborate
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
              Ready to modernize mission-critical infrastructure?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
              Speak with our solution architects to co-design the next wave of defense and telecom readiness.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 rounded-2xl bg-white text-gray-900 font-semibold shadow-xl">
                Schedule a briefing
              </button>
              <button className="px-10 py-4 rounded-2xl border border-white/40 text-white font-semibold">
                Download profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;