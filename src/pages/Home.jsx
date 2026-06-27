import { Link } from "react-router-dom";
import {
  BookOpen,
  Award,
  Users,
  Video,
  ClipboardCheck,
  BarChart3,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Courses",
    description:
      "Access organized academic courses with lessons, resources, and clear learning paths for every semester.",
  },
  {
    icon: Video,
    title: "Interactive Lessons",
    description:
      "Watch video lectures, read materials, and follow guided content created by qualified teachers.",
  },
  {
    icon: ClipboardCheck,
    title: "Quizzes & Exams",
    description:
      "Test your knowledge with online quizzes and exams with instant feedback and secure evaluation.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Monitor your academic performance, completion rates, and results from a personalized dashboard.",
  },
  {
    icon: Users,
    title: "Teacher & Student Roles",
    description:
      "Teachers manage courses and assessments while students enroll, learn, and submit work seamlessly.",
  },
  {
    icon: Award,
    title: "Academic Certification",
    description:
      "Earn certificates and validate your achievements upon successful completion of your programs.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    description: "Register as a student or teacher and access the academic platform in minutes.",
  },
  {
    step: "02",
    title: "Enroll in Courses",
    description: "Browse available courses, join your classes, and start learning at your own pace.",
  },
  {
    step: "03",
    title: "Learn & Succeed",
    description: "Complete lessons, pass exams, track your progress, and achieve your academic goals.",
  },
];

const stats = [
  { value: "500+", label: "Active Students" },
  { value: "50+", label: "Academic Courses" },
  { value: "30+", label: "Expert Teachers" },
  { value: "95%", label: "Satisfaction Rate" },
];

const Home = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-medium mb-6">
              <GraduationCap size={16} />
              Academic E-Learning Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Learn Smarter with{" "}
              <span className="text-cyan-500">Modern Education</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--text)] opacity-70 leading-relaxed max-w-2xl">
              A complete digital learning environment for universities and academic
              institutions. Access courses, take exams, track progress, and connect
              teachers with students — all in one platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-[var(--border)] font-medium hover:border-cyan-500 hover:text-cyan-500 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-cyan-500">{stat.value}</p>
                <p className="mt-1 text-sm opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Learn</h2>
          <p className="mt-4 opacity-70">
            Built for academic excellence with tools that support both teaching and
            learning in a modern digital campus.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-cyan-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                <Icon className="text-cyan-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--card)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 opacity-70">
              Start your academic journey in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="relative text-center md:text-left">
                <span className="text-5xl font-extrabold text-cyan-500/20">{step}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3">{title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 p-10 md:p-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Learning?</h2>
          <p className="mt-4 opacity-90 max-w-xl mx-auto">
            Join our academic e-learning platform today and take your education to
            the next level with flexible, accessible, and quality online learning.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-cyan-600 font-medium hover:bg-white/90 transition-colors"
            >
              Create Free Account
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/40 font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
