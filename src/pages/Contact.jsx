import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@elearning-academic.ma",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+212 5XX-XXXXXX",
    description: "Mon–Fri, 9am–6pm",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "University Campus, Morocco",
    description: "Visit our academic office",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Mon – Fri: 9:00 – 18:00",
    description: "Saturday: 9:00 – 13:00",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-24 relative text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Get in <span className="text-cyan-500">Touch</span>
          </h1>
          <p className="mt-4 text-lg opacity-70 max-w-2xl mx-auto">
            Have a question about our academic e-learning platform? We&apos;re here to
            help students, teachers, and institutions.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map(({ icon: Icon, title, value, description }) => (
            <div
              key={title}
              className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center hover:border-cyan-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="text-cyan-500" size={22} />
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-cyan-500 mb-1">{value}</p>
              <p className="text-xs opacity-60">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Info */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 p-8 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
            <p className="text-sm opacity-70 mb-6">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            {submitted && (
              <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-cyan-500/10 text-cyan-500 text-sm">
                <CheckCircle size={18} />
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full rounded-md px-3 py-2.5 bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@university.ma"
                    className="w-full rounded-md px-3 py-2.5 bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Course enrollment, technical support..."
                  className="w-full rounded-md px-3 py-2.5 bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full rounded-md px-3 py-2.5 bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Side info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-semibold mb-3">For Students</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Need help with course enrollment, exams, or your account? Contact our
                student support team for assistance.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-semibold mb-3">For Teachers</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Questions about creating courses, managing lessons, or grading? Our
                academic team is ready to support you.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
              <h3 className="font-semibold mb-3">Institutional Partnerships</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Universities and schools interested in adopting our e-learning platform
                can reach out for a demo and partnership discussion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
