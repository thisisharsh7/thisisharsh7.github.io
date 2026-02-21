import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import SocialLinks from '../components/SocialLinks';
import HomeButton from '../components/HomeButton';
import { sampleProjects, experiences, achievements } from '../constants/data';

const motionVariants = {
  section: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  text: {
    initial: { x: -10, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 },
  },
  card: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  profile: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.2 },
  },
  bio: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, ease: 'easeInOut', duration: 0.5 }
  })
}

const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
];

export default function FullPortfolioPage() {
  const [showAll, setShowAll] = useState(false);
  const projectsToShow = showAll ? sampleProjects : sampleProjects.slice(0, 5);

  return (
    <>
      <Head>
        <title>Harsh | Full Portfolio</title>
        <meta name="description" content="A comprehensive overview of Harsh Kumar's portfolio as a Full-Stack Developer with 2+ years experience. Currently sponsored open source maintainer at Epicenter (YC S25), including experience, projects, and achievements." />
        <link rel="canonical" href="https://thisisharsh7.github.io/all" />
        <meta property="og:title" content="Harsh | Full Portfolio" />
        <meta property="og:description" content="Explore Harsh Kumar's complete portfolio with 2+ years Full-Stack development experience, showcasing expertise in React, Node.js, AI integrations, and open source contributions at Epicenter (YC S25)." />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:image:alt" content="Harsh's full portfolio overview" />
        <meta property="og:url" content="https://thisisharsh7.github.io/all" />
        <meta name="twitter:image" content="/images/og-image.jpg" />
        <meta name="twitter:image:alt" content="Harsh's full portfolio overview" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              'name': 'Harsh | Full Portfolio',
              'url': 'https://thisisharsh7.github.io/all',
              'description': 'A complete showcase of Harsh Kumar\'s professional journey with 2+ years Full-Stack development experience, projects, and achievements.',
              'publisher': {
                '@type': 'Person',
                'name': 'Harsh Kumar',
                'sameAs': [
                  'https://github.com/thisisharsh7',
                  'https://linkedin.com/in/thisisharsh7',
                  'https://twitter.com/thisisharsh7',
                ],
              },
            }),
          }}
        />
      </Head>
      <motion.nav
        initial={isReducedMotion ? {} : { opacity: 0, y: -20 }}
        animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={isReducedMotion ? {} : { duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg shadow-md"
      >
        <div className=" mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-center gap-4 sm:gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm sm:text-base font-medium text-blue-200 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.nav>

      <motion.section
        id="about"
        initial={isReducedMotion ? {} : motionVariants.section.initial}
        animate={isReducedMotion ? {} : motionVariants.section.animate}
        transition={isReducedMotion ? {} : motionVariants.section.transition}
        className=" w-full pt-20 pb-24 mx-auto flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10"
      >
        <motion.div
          initial={isReducedMotion ? {} : motionVariants.profile.initial}
          animate={isReducedMotion ? {} : motionVariants.profile.animate}
          transition={isReducedMotion ? {} : motionVariants.profile.transition}
          className="w-full md:w-1/3 flex flex-col items-center"
        >
          <div className="bg-black/30 backdrop-blur-md relative p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-800 w-full flex flex-col items-center">
            <motion.div
              whileHover={isReducedMotion ? {} : { scale: 1.05 }}
              whileTap={isReducedMotion ? {} : { scale: 0.95 }}
              className="relative"
            >
              <Image
                src="/images/Harsh_Profile_Pic.jpg"
                alt="Harsh Profile"
                width={180}
                height={180}
                className="rounded-full border-4 border-blue-500 shadow-lg object-contain bg-white"
                priority
              />

            </motion.div>
            <h1 className="text-2xl sm:text-2xl 2xl:text-3xl font-bold text-white mt-4 text-center">Harsh Kumar</h1>
            <p className="text-sm sm:text-sm 2xl:text-base text-gray-300 mt-2 text-center">Full-Stack Developer | Sponsored OSS Maintainer at Epicenter (YC S25)</p>
            <SocialLinks />
          </div>
        </motion.div>

        <motion.div
          initial={isReducedMotion ? {} : motionVariants.bio.initial}
          animate={isReducedMotion ? {} : motionVariants.bio.animate}
          transition={isReducedMotion ? {} : motionVariants.bio.transition}
          className="w-full relative md:w-2/3 bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-800"
          role="region"
          aria-labelledby="bio-heading"
        >
          <h2
            id="bio-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-100 mb-6"
          >
            About Me - README.md
          </h2>
          <div className="space-y-6 text-sm sm:text-base md:text-lg leading-relaxed font-mono text-gray-200">
            <motion.div
              initial={isReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={isReducedMotion ? {} : { duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-100 mb-2 flex items-center gap-2">
                <span className="text-cyan-300">👋</span> Hey There!
              </h3>
              <p>
                I&apos;m a Full-Stack Developer with 2+ years of experience building scalable web applications using React, Next.js, and Node.js.
                Currently sponsored open source maintainer at Epicenter (YC S25), where I implement full-stack features,
                fix critical issues, and review community contributions for a growing global user base.
              </p>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={isReducedMotion ? {} : { duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-100 mb-2 flex items-center gap-2">
                <span className="text-cyan-300">🔭</span> Currently Working On
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Maintaining YC-backed productivity platform as sponsored GitHub maintainer</li>
                <li>Building AI-powered landing page generator with 12-phase UX methodology</li>
                <li>Implementing full-stack features and collaborating on product roadmap decisions</li>
                <li>Developing secure authentication systems and optimizing WebRTC performance</li>
              </ul>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={isReducedMotion ? {} : { duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-100 mb-2 flex items-center gap-2">
                <span className="text-cyan-300">⚡</span> What I Do
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Built complete authentication systems with secure login/registration flows using Firebase</li>
                <li>Enhanced WebRTC video call performance, improving connection stability by 30%</li>
                <li>Developed conversational AI platform integrating OpenAI, D-ID, and ElevenLabs APIs</li>
                <li>Created internal dashboard applications for operations, admin, and client teams</li>
                <li>Reviewed 350+ web application submissions as Frontend Mentor technical mentor</li>
              </ul>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={isReducedMotion ? {} : { duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-100 mb-2 flex items-center gap-2">
                <span className="text-cyan-300">🛠️</span> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'JavaScript',
                  'TypeScript',
                  'Python',
                  'C++',
                  'React.js',
                  'Next.js',
                  'Node.js',
                  'Express.js',
                  'MongoDB',
                  'Firebase',
                  'HTML5',
                  'CSS3',
                  'Tailwind CSS',
                  'OpenAI API',
                  'Claude API',
                  'Gemini API',
                  'WebRTC',
                  'JWT/OAuth',
                  'Stripe',
                  'RESTful APIs',
                  'Git',
                  'GitHub',
                  'VS Code',
                  'Chrome DevTools',
                  'Webpack',
                  'Vite',
                ].map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={isReducedMotion ? {} : { opacity: 0, y: 10 }}
                    animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                    transition={isReducedMotion ? {} : { duration: 0.4, delay: idx * 0.05 }}
                    whileHover={isReducedMotion ? {} : { scale: 1.05 }}
                    className="px-3 py-1 text-xs sm:text-sm bg-cyan-700 text-white rounded-full"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </motion.section>

      <motion.section
        id="experience"
        initial={isReducedMotion ? {} : motionVariants.section.initial}
        animate={isReducedMotion ? {} : motionVariants.section.animate}
        transition={isReducedMotion ? {} : motionVariants.section.transition}
        className=" w-full pt-20 mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white relative">
            ⏳ Experience Timeline
          </h1>
          <p className="text-slate-400 mt-4 text-md sm:text-xl max-w-2xl mx-auto">
            A detailed timeline of my professional journey with 2+ years of experience, highlighting key roles and contributions in full-stack development, AI integrations, and open source maintenance.
          </p>
        </div>
        <div className="relative w-full pb-24">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-cyan-600" aria-hidden="true"></div>
          <div className="flex flex-col gap-16 pt-12">
            {experiences.map((exp, i) => {
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative w-full flex flex-col md:flex-row items-center ${isRight ? 'md:justify-start' : 'md:justify-end'}`}
                  role="region"
                  aria-labelledby={`experience-title-${i}`}
                >
                  <div className={`w-full md:w-1/2 px-2 md:px-4 ${isRight ? 'md:pr-10' : 'md:pl-10'}`}>
                    <motion.div
                      className="bg-gradient-to-br from-white/10 to-cyan-500/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.h2
                        id={`experience-title-${i}`}
                        className="text-xl text-white font-semibold mb-2"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {exp.role}
                      </motion.h2>
                      <motion.p
                        className="text-md font-bold text-cyan-300 mb-1"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {exp.company}
                      </motion.p>
                      <motion.p
                        className="text-sm text-gray-300 mb-3"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {exp.period} · {exp.location}
                      </motion.p>
                      <motion.p
                        className="text-sm text-blue-100 leading-relaxed"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        {exp.description}
                      </motion.p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.technologies?.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block bg-cyan-600/20 text-cyan-200 text-xs font-semibold px-2.5 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  <div
                    className="absolute md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-600 w-5 h-5 rounded-full border-4 border-white z-10"
                    aria-hidden="true"
                  ></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        initial={isReducedMotion ? {} : motionVariants.section.initial}
        animate={isReducedMotion ? {} : motionVariants.section.animate}
        transition={isReducedMotion ? {} : motionVariants.section.transition}
        className=" w-full pt-20 mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white relative">
            🚀 Featured Projects
          </h1>
          <p className="text-slate-400 mt-4 text-lg text-md sm:text-xl max-w-2xl mx-auto">
            A hand-picked collection of projects showcasing design, frontend, and full-stack development.
          </p>
        </div>

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {projectsToShow.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: '0 15px 25px rgba(14, 203, 255, 0.3)',
                opacity: 1,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="relative flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-cyan-400/40 w-full max-w-sm mx-auto"
            >
              {/* VSCode-style top bar */}
              <div className="flex items-center justify-between bg-white/10 px-4 py-2 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-mono text-slate-300 truncate">
                  {project.title}.web
                </span>
                <div className="w-6" /> {/* placeholder */}
              </div>

              {/* Screenshot */}
              {project.screenshot && (
                <div className="relative w-full h-48 overflow-hidden group">
                  <Image
                    src={project.screenshot}
                    alt={project.title}
                    width={400}
                    height={192}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium bg-black/30 border border-white/20 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-4 text-sm">
                  {project.liveLink !== '#' && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cyan-300 hover:text-white transition"
                    >
                      <FaExternalLinkAlt />
                      Live
                    </a>
                  )}
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-400 hover:text-white transition"
                  >
                    <FaGithub />
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toggle Button */}
        {sampleProjects.length > 5 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-cyan-400 text-sm sm:text-base font-semibold hover:underline"
            >
              {showAll ? 'Show Less ▲' : 'Show More ▼'}
            </button>
          </div>
        )}

      </motion.section>

      <motion.section
        id="achievements"
        initial={isReducedMotion ? {} : motionVariants.section.initial}
        animate={isReducedMotion ? {} : motionVariants.section.animate}
        transition={isReducedMotion ? {} : motionVariants.section.transition}
        className=" w-full pt-20 pb-24 mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white relative" id="achievements-heading">
            🏆 Achievements - Key Highlights
          </h1>
          <p className="text-slate-400 mt-4 text-md sm:text-xl max-w-2xl mx-auto">
            A curated showcase of my awards, recognitions, and significant milestones in my development journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={isReducedMotion ? {} : motionVariants.card.initial}
              animate={isReducedMotion ? {} : motionVariants.card.animate}
              transition={isReducedMotion ? {} : { ...motionVariants.card.transition, delay: index * 0.1 }}
              whileHover={isReducedMotion ? {} : { scale: 1.03, boxShadow: '0 12px 24px rgba(6, 182, 212, 0.4)' }}
              className="bg-gradient-to-br from-white/10 to-cyan-500/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl flex flex-col transition-all duration-300"
              role="region"
              aria-labelledby={`achievement-title-${index}`}
            >
              <motion.h2
                id={`achievement-title-${index}`}
                className="text-lg sm:text-xl font-semibold text-white mb-2"
                initial={isReducedMotion ? {} : motionVariants.text.initial}
                animate={isReducedMotion ? {} : motionVariants.text.animate}
                transition={isReducedMotion ? {} : { ...motionVariants.text.transition, delay: index * 0.1 }}
              >
                {item.title}
              </motion.h2>
              <motion.p
                className="text-sm text-cyan-300 mb-3"
                initial={isReducedMotion ? {} : motionVariants.text.initial}
                animate={isReducedMotion ? {} : motionVariants.text.animate}
                transition={isReducedMotion ? {} : { ...motionVariants.text.transition, delay: index * 0.1 + 0.1 }}
              >
                {item.date}
              </motion.p>
              <motion.p
                className="text-sm sm:text-base text-blue-100 mb-4 flex-grow leading-relaxed"
                initial={isReducedMotion ? {} : motionVariants.text.initial}
                animate={isReducedMotion ? {} : motionVariants.text.animate}
                transition={isReducedMotion ? {} : { ...motionVariants.text.transition, delay: index * 0.1 + 0.2 }}
              >
                {item.description}
              </motion.p>
              <div className="flex flex-col gap-2">
                {item.link !== '#' && (
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={isReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={isReducedMotion ? {} : { scale: 0.95 }}
                    className="relative flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 w-fit after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-cyan-300 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                    aria-label={`View details of ${item.title}`}
                  >
                    <FaExternalLinkAlt />
                    View More
                  </motion.a>
                )}
                {item.link1 !== '#' && (
                  <motion.a
                    href={item.link1}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={isReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={isReducedMotion ? {} : { scale: 0.95 }}
                    className="relative flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 w-fit after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-cyan-300 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                    aria-label={`View additional details of ${item.title}`}
                  >
                    <FaExternalLinkAlt />
                    View More
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <HomeButton />
    </>
  );
}