import { useEffect, useState } from "react";
import { Mail, Github, Linkedin, ExternalLink, Code2, Briefcase, GraduationCap, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

interface SkillCategory {
  category: string;
  skills: { name: string; level: number }[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Education {
  institution: string;
  degree: string;
  duration: string;
  details: string;
}

export default function Home() {
  const [displayedName, setDisplayedName] = useState("");
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [showTagline, setShowTagline] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    },
    onError: () => {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    },
  });

  // Typing animation for name
  useEffect(() => {
    const fullName = "Ahmer Faraz";
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullName.length) {
        setDisplayedName(fullName.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setShowTagline(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Fade in tagline
  useEffect(() => {
    if (showTagline) {
      const fullTagline = "Jr. Python Developer | Django Developer | AI/ML | Problem Solver";
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullTagline.length) {
          setDisplayedTagline(fullTagline.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [showTagline]);

  const skillsData: SkillCategory[] = [
    {
      category: "Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 60 },
        { name: "HTML/CSS", level: 90 },
      ],
    },
    {
      category: "Frameworks & Tools",
      skills: [
        { name: "Django", level: 88 },
        { name: "Django REST Framework", level: 87 },
        { name: "Flask", level: 60 },
        { name: "Git & GitHub", level: 85 },
      ],
    },
    {
      category: "Databases & Cloud",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "AWS (S3, EC2, RDS)", level: 80 },
        { name: "ORM & Database Design", level: 88 },
      ],
    },
  ];

  const projects: Project[] = [
    {
      title: "Buy-It",
      description: "A mobile retail website for purchasing smartphones and electronics with cart functionality and responsive design.",
      technologies: ["HTML", "CSS", "Bootstrap", "PHP"],
      link: "https://github.com/AhmerFaraz/Buy-It-",
    },
    {
      title: "Stock Alert System",
      description: "Real-time stock price monitoring system that sends email alerts to users when stock prices change significantly.",
      technologies: ["Python", "Django", "SMTP", "APIs"],
      link: "#",
    },
    {
      title: "Cheap Flight Finder",
      description: "Python-based flight search system that finds affordable flight options using multiple travel APIs.",
      technologies: ["Python", "Django", "APIs", "Data Processing"],
      link: "#",
    },
  ];

  const education: Education[] = [
    {
      institution: "P. R. Pote College of Engineering and Management, Amravati",
      degree: "B. E. in Computer Science and Engineering",
      duration: "Nov 2022 - Jul 2025",
      details: "CGPA: 8.93 / 10",
    },
    {
      institution: "Dr. Panjabrao Deshmukh Polytechnic, Amravati",
      degree: "Diploma in Computer Engineering",
      duration: "Aug 2019 - Mar 2022",
      details: "Aggregate: 84%",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormStatus("loading");
      contactMutation.mutate(formData);
    }
  };

  // Calculate experience duration
  const calculateExperience = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date();
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    // Adjust if current month is before start month
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Adjust if current day is before start day (approximate)
    if (end.getDate() < start.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }
    
    if (years > 0 && months > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      return 'Less than 1 month';
    }
  };

  const experienceDuration = calculateExperience('2025-01-01');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Animated Background */}
      <div className="animated-bg">
        {/* Animated Gradient Layers */}
        <div className="nebula-layer nebula-1"></div>
        <div className="nebula-layer nebula-2"></div>
        <div className="nebula-layer nebula-3"></div>
      </div>

      {/* Starfield Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden starfield">
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Falling Stars/Meteor Shower */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]">
        {[...Array(20)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="meteor"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Orbs for Depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {[...Array(5)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="floating-orb"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card m-2 md:m-4 rounded-2xl">
        <nav className="container flex justify-between items-center py-3 md:py-4">
          <div className="text-xl md:text-2xl font-bold neon-glow">𓆘 Ahmer Faraz</div>
          <div className="hidden md:flex gap-6 lg:gap-8">
            <a href="#about" className="text-sm lg:text-base hover:text-accent transition-colors">About</a>
            <a href="#skills" className="text-sm lg:text-base hover:text-accent transition-colors">Skills</a>
            <a href="#projects" className="text-sm lg:text-base hover:text-accent transition-colors">Projects</a>
            <a href="#experience" className="text-sm lg:text-base hover:text-accent transition-colors">Experience</a>
            <a href="#education" className="text-sm lg:text-base hover:text-accent transition-colors">Education</a>
            <a href="#contact" className="text-sm lg:text-base hover:text-accent transition-colors">Contact</a>
          </div>
          <div className="md:hidden flex gap-2 text-xs">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <span className="text-muted-foreground">|</span>
            <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
            <span className="text-muted-foreground">|</span>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 md:pt-28 md:pb-20 z-10">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white">
            <span className="inline-block typing-container">
              {displayedName}
              {isTyping && <span className="typing-cursor">|</span>}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-accent mb-6 md:mb-8 fade-in-down" style={{ animationDelay: "3.5s" }}>
            {displayedTagline}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto fade-in-down px-2" style={{ animationDelay: "4s" }}>
            Crafting elegant solutions with Python and modern web technologies. Passionate about building scalable applications and solving complex problems.
          </p>
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap fade-in-down px-2" style={{ animationDelay: "4.5s" }}>
            <a href="#contact">
              <Button className="neon-glow-button text-sm md:text-base">
                Get In Touch
              </Button>
            </a>
            <a href="#projects">
              <Button className="neon-glow-button text-sm md:text-base">
                View My Work
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 relative z-10">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center neon-glow">About Me</h2>
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
              I'm a dedicated Jr. Python Developer with a strong foundation in web application development using Django and Django REST Framework. With hands-on experience in building scalable web applications, optimizing database queries, and implementing role-based access control, I'm passionate about creating elegant solutions to complex problems.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Currently working at Yudiz Solutions Ltd, I focus on developing robust backend systems, collaborating with teams using Git and agile methodologies, and leveraging cloud services like AWS for scalable deployments. I'm eager to contribute my technical skills and problem-solving abilities to innovative projects.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 md:py-20 px-4 relative z-10">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center neon-glow">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            {skillsData.map((category, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg md:text-xl font-bold text-accent mb-4 md:mb-6">{category.category}</h3>
                <div className="space-y-3 md:space-y-4">
                  {category.skills.map((skill, sidx) => (
                    <div key={sidx}>
                      <div className="flex justify-between mb-2 text-sm md:text-base">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-accent">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-green-400 transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg md:text-xl font-bold text-accent mb-4 md:mb-6">Soft Skills</h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {["Creativity", "Problem Solving", "Communication", "Teamwork", "Adaptability", "Time Management"].map((skill, idx) => (
                <span key={idx} className="px-3 md:px-4 py-1 md:py-2 bg-accent/20 border border-accent rounded-full text-foreground text-xs md:text-sm hover:bg-accent/40 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20 px-4 relative z-10">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center neon-glow">Projects</h2>
          <div className="space-y-4 md:space-y-6">
            {projects.map((project, idx) => (
              <div key={idx} className="glass-card p-6 md:p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-start justify-between mb-3 md:mb-4 gap-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} className="text-accent hover:text-green-300 transition-colors flex-shrink-0">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, tidx) => (
                    <span key={tidx} className="px-2 md:px-3 py-1 bg-accent/20 text-accent rounded-full text-xs md:text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 md:py-20 px-4 relative z-10">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center neon-glow">Experience</h2>
          <div className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-accent">
            <div className="flex items-start gap-4">
              <Briefcase className="text-accent mt-1 flex-shrink-0" size={24} />
              <div className="w-full">
                <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">Jr. Python Developer</h3>
                <p className="text-sm md:text-base text-accent mb-1 md:mb-2">Yudiz Solutions Ltd | Ahmedabad, India</p>
                <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                  <p className="text-xs md:text-sm text-muted-foreground">Jan 2025 - Present</p>
                  <span className="text-xs md:text-sm text-muted-foreground">•</span>
                  <p className="text-xs md:text-sm text-accent font-semibold">{experienceDuration}</p>
                </div>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li>• Developed and maintained web applications using Django & Django REST Framework</li>
                  <li>• Built reusable components and optimized database queries for high performance</li>
                  <li>• Collaborated in team environment using Git and agile development practices</li>
                  <li>• Handled AWS S3 integration for media file storage and dynamic HTML rendering</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-12 md:py-20 px-4 relative z-10">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center neon-glow">Education & Certifications</h2>

          {/* Education Timeline */}
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            {education.map((edu, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 md:h-12 w-10 md:w-12 rounded-full bg-accent/20 border border-accent">
                    <GraduationCap className="text-accent" size={20} />
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-base md:text-xl font-bold text-white mb-1">{edu.degree}</h3>
                  <p className="text-xs md:text-sm text-accent mb-1">{edu.institution}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">{edu.duration}</p>
                  <p className="text-xs md:text-sm text-foreground">{edu.details}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg md:text-2xl font-bold text-accent mb-4 md:mb-6">Certifications</h3>
            <div className="space-y-3 md:space-y-4">
              <div className="border-l-2 border-accent pl-4">
                <h4 className="text-base md:text-lg font-bold text-white mb-1">100 Days of Python - Udemy</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Gained proficiency in Python problem-solving, library usage, and developed multiple projects.</p>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <h4 className="text-base md:text-lg font-bold text-white mb-1">Full Stack Web Development - Udemy</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Comprehensive training in HTML5, CSS3, Bootstrap, JavaScript, Node.js, and Git version control.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-4 relative z-10">
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center neon-glow">Get In Touch</h2>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <a href="mailto:ahmerfaraz707@gmail.com" className="glass-card p-4 md:p-6 rounded-2xl text-center hover:scale-105 transition-transform">
              <Mail className="text-accent mx-auto mb-2 md:mb-4" size={28} />
              <p className="text-foreground font-semibold text-sm md:text-base">Email</p>
              <p className="text-muted-foreground text-xs md:text-sm break-all">ahmerfaraz707@gmail.com</p>
            </a>
            <a href="tel:+919022885542" className="glass-card p-4 md:p-6 rounded-2xl text-center hover:scale-105 transition-transform">
              <Code2 className="text-accent mx-auto mb-2 md:mb-4" size={28} />
              <p className="text-foreground font-semibold text-sm md:text-base">Phone</p>
              <p className="text-muted-foreground text-xs md:text-sm">+91 9022885542</p>
            </a>
            <a href="https://linkedin.com" className="glass-card p-4 md:p-6 rounded-2xl text-center hover:scale-105 transition-transform">
              <Linkedin className="text-accent mx-auto mb-2 md:mb-4" size={28} />
              <p className="text-foreground font-semibold text-sm md:text-base">LinkedIn</p>
              <p className="text-muted-foreground text-xs md:text-sm">Ahmer Faraz</p>
            </a>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm md:text-base">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background/50 border border-accent/30 rounded-lg px-3 md:px-4 py-2 md:py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm md:text-base"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm md:text-base">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background/50 border border-accent/30 rounded-lg px-3 md:px-4 py-2 md:py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm md:text-base"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm md:text-base">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-background/50 border border-accent/30 rounded-lg px-3 md:px-4 py-2 md:py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none text-sm md:text-base"
                  rows={5}
                  placeholder="Your message..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="neon-glow-button w-full flex items-center justify-center gap-2 disabled:opacity-50 text-sm md:text-base"
              >
                <Send size={18} />
                {formStatus === "loading" ? "Sending..." : "Send Message"}
              </button>
              {formStatus === "success" && (
                <p className="text-accent text-center text-sm md:text-base">Message sent successfully!</p>
              )}
              {formStatus === "error" && (
                <p className="text-destructive text-center text-sm md:text-base">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 border-t border-accent/20 relative z-10">
        <div className="container max-w-4xl text-center text-muted-foreground text-xs md:text-sm">
          <p>© 2025 Ahmer Faraz. All rights reserved.</p>
          <p className="text-xs mt-1 md:mt-2">Crafted with passion and modern web technologies.</p>
        </div>
      </footer>
    </div>
  );
}
