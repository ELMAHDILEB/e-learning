import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  Shield,
  Lightbulb,
  Globe,
  Users,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace modern technology to improve the academic learning experience.",
  },
  {
    icon: Shield,
    title: "Quality",
    description: "Every course and assessment meets high academic standards and rigor.",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Education should be available to every student, anywhere, at any time.",
  },
  {
    icon: Globe,
    title: "Collaboration",
    description: "We connect teachers and students in a shared digital learning community.",
  },
];

const highlights = [
  "Course management for teachers and academic staff",
  "Structured lessons with videos, documents, and resources",
  "Online quizzes, exams, and automated grading support",
  "Real-time progress tracking for students",
  "Secure authentication including Google sign-in",
  "Role-based access for students, teachers, and administrators",
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-medium mb-6">
              <GraduationCap size={16} />
              About Our Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Empowering Academic Excellence Through{" "}
              <span className="text-cyan-500">E-Learning</span>
            </h1>
            <p className="mt-6 text-lg opacity-70 leading-relaxed">
              E-Learning is an academic platform built to support universities and
              educational institutions in delivering quality online education. We help
              teachers create engaging courses and give students the tools they need to
              succeed in their studies.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-5">
              <Target className="text-cyan-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="opacity-70 leading-relaxed">
              To transform traditional academic education by providing a reliable,
              intuitive, and comprehensive e-learning platform that bridges the gap
              between classrooms and digital learning — making quality education
              accessible to every student.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-5">
              <Eye className="text-cyan-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="opacity-70 leading-relaxed">
              To become the leading academic e-learning platform in Morocco and beyond,
              recognized for excellence in digital education, student engagement, and
              innovative teaching tools that prepare learners for the future.
            </p>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-[var(--card)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who We Serve</h2>
              <p className="opacity-70 leading-relaxed mb-6">
                Our platform is designed for the entire academic ecosystem — from
                students pursuing their degrees to teachers delivering course content
                and administrators managing the institution.
              </p>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)]">
                <Users className="text-cyan-500 flex-shrink-0" size={32} />
                <div>
                  <p className="font-semibold">Students & Teachers</p>
                  <p className="text-sm opacity-70">
                    A unified space for learning, teaching, and academic collaboration.
                  </p>
                </div>
              </div>
            </div>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                  <span className="text-sm opacity-80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
          <p className="mt-4 opacity-70">
            The principles that guide everything we build for academic learning.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="text-cyan-500" size={22} />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm opacity-70">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Want to Know More?</h2>
          <p className="mt-4 opacity-70 max-w-lg mx-auto">
            Get in touch with our team or create your account to explore the platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-[var(--border)] font-medium hover:border-cyan-500 hover:text-cyan-500 transition-colors"
            >
              Join the Platform
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
