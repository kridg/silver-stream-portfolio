import { motion } from "framer-motion";
import { Github, GitCommit, GitPullRequest, Star, Users } from "lucide-react";
import MagneticButton from "./MagneticButton";

// Generate mock contribution data
const generateContributions = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const contributions: number[][] = [];

  for (let week = 0; week < weeks; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < daysPerWeek; day++) {
      // Generate random contribution count with weighted distribution
      const rand = Math.random();
      let count = 0;
      if (rand > 0.3) count = Math.floor(Math.random() * 3);
      if (rand > 0.6) count = Math.floor(Math.random() * 6) + 2;
      if (rand > 0.85) count = Math.floor(Math.random() * 10) + 5;
      if (rand > 0.95) count = Math.floor(Math.random() * 15) + 10;
      weekData.push(count);
    }
    contributions.push(weekData);
  }
  return contributions;
};

const contributions = generateContributions();

const getContributionColor = (count: number): string => {
  if (count === 0) return "bg-silver-100";
  if (count <= 2) return "bg-emerald-200";
  if (count <= 5) return "bg-emerald-300";
  if (count <= 10) return "bg-emerald-400";
  return "bg-emerald-500";
};

const stats = [
  { icon: GitCommit, label: "Commits", value: "1,247" },
  { icon: GitPullRequest, label: "Pull Requests", value: "86" },
  { icon: Star, label: "Stars Earned", value: "324" },
  { icon: Users, label: "Followers", value: "156" },
];

const GitHubContributions = () => {
  return (
    <section className="py-24 px-8 lg:px-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-silver-50/50 to-background" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-silver-100 border border-silver-200 text-soft-gray text-sm font-medium mb-4">
            <Github className="w-4 h-4" />
            Open Source
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            GitHub Activity
          </h2>
          <p className="text-soft-gray max-w-2xl mx-auto text-lg">
            My contribution graph from the past year.
          </p>
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="card-premium p-6 lg:p-8 overflow-hidden"
        >
          {/* Graph Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-charcoal flex items-center justify-center">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal">@kridipghale</h3>
                <p className="text-sm text-soft-gray">Contribution activity</p>
              </div>
            </div>
            <MagneticButton 
              href="https://github.com" 
              target="_blank"
              strength={0.4}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-charcoal text-white text-sm font-medium hover:bg-charcoal-light transition-colors">
                View Profile
              </span>
            </MagneticButton>
          </div>

          {/* Contribution Grid */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-[3px] min-w-max">
              {contributions.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((count, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.2,
                        delay: (weekIndex * 7 + dayIndex) * 0.001,
                      }}
                      whileHover={{ scale: 1.5, zIndex: 10 }}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(count)} border border-silver-200/50 cursor-pointer relative group`}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-charcoal text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        {count} contributions
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-soft-gray">
            <span>Less</span>
            <div className="flex gap-1">
              {["bg-silver-100", "bg-emerald-200", "bg-emerald-300", "bg-emerald-400", "bg-emerald-500"].map((color, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${color} border border-silver-200/50`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              className="card-premium p-6 text-center"
            >
              <stat.icon className="w-6 h-6 text-soft-gray mx-auto mb-3" />
              <div className="text-2xl font-bold text-charcoal mb-1">{stat.value}</div>
              <div className="text-sm text-soft-gray">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubContributions;