import Image from 'next/image';
import { motion } from 'framer-motion';
import Head from 'next/head';
import SocialLinks from '../components/SocialLinks';
import SparklesBackground from '../components/SparklesBackground';
import HomeButton from '../components/HomeButton';
import { Suspense } from 'react';

const motionVariants = {
    section: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
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

const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>Harsh | About Me</title>
                <meta name="description" content="Learn about Harsh Kumar, a Full-Stack Developer with 2+ years experience. Currently sponsored open source maintainer at Epicenter (YC S25) specializing in React, Next.js, Node.js, and AI integrations." />
                <link rel="canonical" href="https://thisisharsh7.github.io/about" />
                <meta property="og:title" content="Harsh | About Me" />
                <meta property="og:description" content="Full-Stack Developer with 2+ years experience. Sponsored open source maintainer at Epicenter (YC S25) building scalable web applications." />
                <meta property="og:image" content="/images/Harsh_Profile_Pic.jpg" />
                <meta property="og:image:alt" content="Harsh's profile picture" />
                <meta property="og:url" content="https://thisisharsh7.github.io/about" />
                <meta name="twitter:image" content="/images/Harsh_Profile_Pic.jpg" />
                <meta name="twitter:image:alt" content="Harsh's profile picture" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            'name': 'Harsh Kumar',
                            'jobTitle': 'Full-Stack Developer | Open Source Maintainer',
                            'url': 'https://thisisharsh7.github.io/about',
                            'image': 'https://thisisharsh7.github.io/images/Harsh_Profile_Pic.jpg',
                            'sameAs': [
                                'https://github.com/thisisharsh7',
                                'https://linkedin.com/in/thisisharsh7',
                                'https://twitter.com/thisisharsh7',
                            ],
                            'description': 'Full-Stack Developer with 2+ years experience building scalable web applications. Currently sponsored open source maintainer at Epicenter (YC S25) specializing in React, Next.js, Node.js, and AI integrations.',
                        }),
                    }}
                />
            </Head>

            <motion.section
                initial={isReducedMotion ? {} : motionVariants.section.initial}
                animate={isReducedMotion ? {} : motionVariants.section.animate}
                transition={isReducedMotion ? {} : motionVariants.section.transition}
                className=" w-full sm:pt-12 pt-8 pb-24 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10"
                role="main"
                aria-label="Portfolio About page"
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

            <HomeButton />
        </>
    );
}