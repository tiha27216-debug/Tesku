'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
const GithubIcon = GitBranch;

interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/senaczk/repos?sort=updated&per_page=20');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        
        // Filter repos with descriptions
        const filtered = data
          .filter((repo: any) => repo.description && !repo.fork)
          .slice(0, 6)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            language: repo.language || 'Unknown',
            stars: repo.stargazers_count,
          }));

        setProjects(filtered);
        setError(null);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12"
        >
          <motion.h2
            variants={itemVariants}
            className="font-geist text-4xl md:text-5xl font-bold text-accent"
          >
            Projects
          </motion.h2>

          {loading && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <p className="text-secondary">Loading projects...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <p className="text-secondary">{error}</p>
            </motion.div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="glass p-6 rounded-lg hover:border-accent transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <GithubIcon size={24} className="text-accent" />
                    <ExternalLink size={18} className="text-secondary group-hover:text-accent transition-colors" />
                  </div>
                  
                  <h3 className="font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-secondary text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-primary">
                    <span className="text-xs text-secondary bg-tertiary px-2 py-1 rounded">
                      {project.language}
                    </span>
                    <span className="text-xs text-accent">
                      ⭐ {project.stars}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          <motion.div
            variants={itemVariants}
            className="text-center pt-8"
          >
            <a
              href="https://github.com/senaczk"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass px-6 py-3 rounded-lg font-medium text-accent hover:text-accent-light transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <GithubIcon size={18} />
              View All on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
