import { useState, useEffect } from "react";
import {
  Search,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Briefcase,
  User,
  Home,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API_BASE = "https://profile-1pok.onrender.com/api";

// ✅ Match backend schema
interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

interface Profile {
  name: string;
  email: string;
  bio: string;
  education: string[];
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

interface Skill {
  _id?: string;
  skill_name: string;
  level?: string;
  top?: boolean;
}

interface Work {
  _id?: string;
  company: string;
  role: string;
  start: string;
  end: string;
  highlights: string[];
}

export function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, projectsRes, skillsRes, worksRes] = await Promise.all([
        fetch(`${API_BASE}/profile`),
        fetch(`${API_BASE}/projects`),
        fetch(`${API_BASE}/skills`),
        fetch(`${API_BASE}/work`),
      ]);

      if (profileRes.ok) setProfile(await profileRes.json());
      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (skillsRes.ok) setSkills(await skillsRes.json());
      if (worksRes.ok) setWorks(await worksRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔎 Project search (title, description, technologies)
  const filteredProjects = projects.filter((project) => {
    const search = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      (Array.isArray(project.technologies) &&
        project.technologies.some((tech) => tech.toLowerCase().includes(search)))
    );
  });

  // 🔎 Skill search
  const filteredSkills = skills.filter((skill) =>
    skill.skill_name.toLowerCase().includes(skillSearchQuery.toLowerCase())
  );

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Code2 },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "about", label: "About", icon: User },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className={activeTab === item.id ? "bg-gradient-primary" : ""}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {profile?.links?.github && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              )}
              {profile?.links?.linkedin && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              )}
              {profile?.links?.portfolio && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      {activeTab === "home" && profile && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              {profile.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">{profile.bio}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {profile.email}
              </span>
              <span>{profile.education.join(", ")}</span>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {activeTab === "projects" && (
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Projects</h2>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects...With Skills , Name , etc"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project._id}
                  className="group bg-gradient-card hover:shadow-glow transition-all duration-300 hover:scale-[1.02] p-6 border-border"
                >
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* 🔹 Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* 🔹 Links (Github + Demo) */}
                  <div className="flex gap-3">
                    {project.links?.github && (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.links?.demo && (
                      <Button size="sm" asChild className="flex-1 bg-gradient-primary">
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      

      {/* Work Section */}
      {activeTab === "work" && (
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
            {works.length > 0 ? (
              <div className="space-y-6">
                {works.map((work) => (
                  <Card key={work._id} className="bg-gradient-card p-6 border-border">
                    <h3 className="text-xl font-semibold">{work.role}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {work.company} | {work.start} - {work.end}
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {work.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No work experience found.</p>
            )}
          </div>
        </section>
      )}

      {/* About Section */}
      {activeTab === "about" && profile && (
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-card p-8 border-border">
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{profile.bio}</p>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Education</h3>
                  <p>{profile.education.join(", ")}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Connect</h3>
                  <div className="flex gap-4">
                    {profile.links?.github && (
                      <a
                        href={profile.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    )}
                    {profile.links?.linkedin && (
                      <a
                        href={profile.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </a>
                    )}
                    {profile.links?.portfolio && (
                      <a
                        href={profile.links.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <Mail className="h-4 w-4" /> Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
