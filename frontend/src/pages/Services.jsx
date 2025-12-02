import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Wifi,
  Cpu,
  Radio,
  Sparkles,
  Layers,
  Target,
  CheckCircle2,
  ArrowRight,
  Globe,
  Gauge,
  Users2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const serviceLines = [
  {
    title: "Telecommunications",
    headline: "Networks built for zero downtime.",
    description:
      "5G and fiber infrastructure testing, spectrum assurance, and intelligent monitoring for national-scale carriers.",
    icon: Wifi,
    badge: "5G / Satellite",
    gradient: "from-blue-500/20 to-cyan-400/20",
    accent: "text-blue-400",
    items: ["5G & ORAN validation", "Fiber-optic diagnostics", "Spectrum policy compliance"],
  },
  {
    title: "Defense Systems",
    headline: "Mission-readiness from lab to field.",
    description:
      "Ruggedized EW, secure comms, and battlefield telemetry platforms engineered to military standards.",
    icon: Shield,
    badge: "EW / C4ISR",
    gradient: "from-purple-500/20 to-pink-400/20",
    accent: "text-purple-400",
    items: ["Electronic warfare labs", "Secure communication suites", "Field-deployable diagnostics"],
  },
  {
    title: "Smart Manufacturing",
    headline: "Industry 4.0 without the noise.",
    description:
      "Full-stack EMS, rapid prototyping, and IoT telemetry that closes the loop between production and performance.",
    icon: Cpu,
    badge: "EMS / IoT",
    gradient: "from-emerald-500/20 to-teal-400/20",
    accent: "text-emerald-400",
    items: ["IPC-class manufacturing", "Digital twin enablement", "Lifecycle sustainment"],
  },
];

const capabilities = [
  {
    label: "Systems Engineering",
    detail: "RF, microwave, and power electronics labs for accelerated prototyping.",
    icon: Sparkles,
  },
  {
    label: "Compliance & QA",
    detail: "NABL-aligned calibration, EMI/EMC, and multi-stage reliability testing.",
    icon: Shield,
  },
  {
    label: "Deployment Ops",
    detail: "Global rollouts, secure logistics, and on-ground training squads.",
    icon: Globe,
  },
  {
    label: "Lifecycle Support",
    detail: "Performance monitoring, spares planning, and modernization blueprints.",
    icon: Layers,
  },
];

const advantages = [
  {
    title: "Single accountable partner",
    description: "From requirements to sustainment we take ownership, eliminating multi-vendor drift.",
  },
  {
    title: "Security-by-design",
    description: "Defense-grade encryption, hardened supply chain, and strict access governance.",
  },
  {
    title: "Faster accreditation",
    description: "Pre-built templates and labs aligned with MIL/IEC specs speed up certification.",
  },
];

const process = [
  {
    step: "01",
    title: "Intelligence",
    copy: "Immersive workshops to map threats, compliance needs, and mission context.",
  },
  {
    step: "02",
    title: "Co-Design",
    copy: "Cross-functional squads shape architectures, prototypes, and acceptance criteria.",
  },
  {
    step: "03",
    title: "Validation",
    copy: "Digital twins + physical trials run in parallel for predictable rollouts.",
  },
  {
    step: "04",
    title: "Stewardship",
    copy: "Telemetry-backed support, refresh cycles, and modernization sprints.",
  },
];

const metrics = [
  { label: "Programs secured", value: "60+", icon: Shield },
  { label: "Network nodes monitored", value: "25K+", icon: Gauge },
  { label: "Specialists on call", value: "80+", icon: Users2 },
];

const Services = () => {
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
            className={`absolute top-[-10%] right-[-5%] w-[520px] h-[520px] rounded-full blur-[140px] opacity-30 ${
              isDarkMode ? "bg-blue-700" : "bg-blue-200"
            }`}
          />
          <div
            className={`absolute bottom-[-15%] left-[-10%] w-[480px] h-[480px] rounded-full blur-[140px] opacity-25 ${
              isDarkMode ? "bg-purple-700" : "bg-purple-200"
            }`}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <div
            className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border text-xs font-semibold tracking-[0.3em] uppercase ${
              isDarkMode ? "border-white/15 bg-white/5 text-blue-200" : "border-blue-200 bg-white text-blue-700"
            }`}
          >
            Telogica • Services
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight"
          >
            Precision engineering for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              telecom, defense & manufacturing
            </span>
            leaders.
          </motion.h1>

          <p
            className={`mx-auto max-w-3xl text-lg md:text-xl leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Modular offerings that move from diagnostics to deployment with zero clutter, so your teams stay locked on outcomes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <button
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode ? "bg-white text-black" : "bg-gray-900 text-white"
                }`}
              >
                Book a strategy call <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button
              onClick={() => document.getElementById("service-lines")?.scrollIntoView({ behavior: "smooth" })}
              className={`px-8 py-4 rounded-2xl border text-base font-semibold transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode ? "border-white/20 bg-white/5" : "border-gray-200 bg-white"
              }`}
            >
              Browse capabilities
            </button>
          </div>
        </div>
      </section>

      {/* Service Lines */}
      <section id="service-lines" className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          {serviceLines.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`rounded-[28px] border p-8 flex flex-col gap-6 backdrop-blur-xl ${
                isDarkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-white shadow-lg"
              }`}
            >
              <div
                className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] px-4 py-1 rounded-full ${
                  service.gradient
                } text-white/80`}
              >
                {service.badge}
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/10">
                  <service.icon className={`w-6 h-6 ${service.accent}`} />
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>
              <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {service.headline}
              </p>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                {service.description}
              </p>
              <div className="grid gap-3">
                {service.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-4 h-4 ${service.accent}`} />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Capabilities Matrix */}
      <section className="px-6 py-16">
        <div
          className={`max-w-6xl mx-auto rounded-[32px] border p-10 backdrop-blur-xl ${
            isDarkMode
              ? "border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5"
              : "border-gray-200 bg-white shadow-2xl"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-400">
                Capability stack
              </p>
              <h2 className="text-4xl font-black leading-tight">
                Integrated services without the noise.
              </h2>
              <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                We stitch hardware, firmware, and operations into a single operating picture so programs stay resilient.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 flex-1">
              {capabilities.map((capability) => (
                <div
                  key={capability.label}
                  className={`p-5 rounded-2xl border flex gap-4 items-start ${
                    isDarkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <capability.icon className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-base font-semibold">{capability.label}</p>
                    <p className="text-sm text-gray-500 mt-2">{capability.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {advantages.map((adv) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`rounded-3xl border p-8 space-y-4 ${
                isDarkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-white shadow-lg"
              }`}
            >
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              <h3 className="text-2xl font-bold">{adv.title}</h3>
              <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{adv.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section className={`px-6 py-16 ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-400">engagement model</p>
            <h2 className="text-4xl font-black">How we deliver clarity.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {process.map((phase) => (
              <div
                key={phase.step}
                className={`rounded-3xl border p-6 space-y-4 ${
                  isDarkMode ? "border-white/10 bg-black/60" : "border-gray-200 bg-gray-50"
                }`}
              >
                <span className="text-sm font-semibold text-gray-400">{phase.step}</span>
                <h3 className="text-2xl font-bold">{phase.title}</h3>
                <p className="text-sm text-gray-500">{phase.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 py-16">
        <div
          className={`max-w-6xl mx-auto rounded-[32px] border grid gap-8 md:grid-cols-3 p-10 ${
            isDarkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-white shadow-xl"
          }`}
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center space-y-3">
              <div
                className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${
                  isDarkMode ? "bg-white/10" : "bg-gray-100"
                }`}
              >
                <metric.icon className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-4xl font-black">{metric.value}</p>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div
          className={`max-w-5xl mx-auto text-center rounded-[36px] p-12 relative overflow-hidden ${
            isDarkMode ? "bg-white/5" : "bg-gray-900"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30" />
          <div className="relative z-10 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
              Partner with us
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Ready to modernize mission-critical infrastructure?
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Speak with our program directors to map the fastest route from assessment to accredited deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="px-10 py-4 rounded-2xl bg-white text-gray-900 font-semibold shadow-xl">
                  Schedule a briefing
                </button>
              </Link>
              <Link to="/products">
                <button className="px-10 py-4 rounded-2xl border border-white/40 text-white font-semibold">
                  Download portfolio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;