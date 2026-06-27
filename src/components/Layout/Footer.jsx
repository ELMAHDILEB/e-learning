import { NavLink } from "react-router-dom";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-4">
              <GraduationCap className="text-cyan-500" size={28} />
              <span>
                <span className="text-cyan-500">E</span>-Learning
              </span>
            </div>
            <p className="text-sm text-[var(--text)] opacity-70 leading-relaxed">
              An academic e-learning platform designed for universities, teachers,
              and students to learn, teach, and grow together.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm tracking-wide">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="opacity-70 hover:text-cyan-500 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="opacity-70 hover:text-cyan-500 transition-colors">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="opacity-70 hover:text-cyan-500 transition-colors">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="opacity-70 hover:text-cyan-500 transition-colors">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm tracking-wide">Platform</h3>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Online Courses</li>
              <li>Quizzes & Exams</li>
              <li>Progress Tracking</li>
              <li>Teacher Dashboard</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-cyan-500 mt-0.5 flex-shrink-0" />
                contact@elearning-academic.ma
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-cyan-500 mt-0.5 flex-shrink-0" />
                +212 5XX-XXXXXX
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-cyan-500 mt-0.5 flex-shrink-0" />
                University Campus, Morocco
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} E-Learning Academic Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
