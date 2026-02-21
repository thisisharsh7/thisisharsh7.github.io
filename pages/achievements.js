import { motion } from 'framer-motion';
import Head from 'next/head';
import { FaExternalLinkAlt } from 'react-icons/fa';
import HomeButton from '../components/HomeButton';
import { achievements } from '../constants/data';

const motionVariants = {
    section: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: 'easeOut' },
    },
    card: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    },
    text: {
        initial: { x: -10, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.3 },
    },
};

const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function AchievementsPage() {
    return (
        <>
            <Head>
                <title>Harsh | Achievements</title>
                <meta name="description" content="View Harsh's achievements, including open-source contributions, internships, and notable projects." />
                <link rel="canonical" href="https://thisisharsh7.github.io/achievements" />
                <meta property="og:title" content="Harsh | Achievements" />
                <meta property="og:description" content="A showcase of Harsh's awards, recognitions, and significant milestones." />
                <meta property="og:image" content="/images/og-image.jpg" />
                < clinic property="og:image:alt" content="Harsh's achievements overview" />
                <meta property="og:url" content="https://thisisharsh7.github.io/achievements" />
                <meta name="twitter:image" content="/images/og-image.jpg" />
                <meta name="twitter:image:alt" content="Harsh's achievements overview" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'ItemList',
                            'itemListElement': achievements.map((item, index) => ({
                                '@type': 'CreativeWork',
                                'name': item.title,
                                'description': item.description,
                                'datePublished': item.date,
                                'url': item.link !== '#' ? item.link : undefined,
                            })),
                        }),
                    }}
                />
            </Head>

            <motion.section
                initial={isReducedMotion ? {} : motionVariants.section.initial}
                animate={isReducedMotion ? {} : motionVariants.section.animate}
                transition={isReducedMotion ? {} : motionVariants.section.transition}
                className="w-full relative sm:pt-12 pt-8 pb-24"
                role="main"
                aria-label="Portfolio Achievements page"
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