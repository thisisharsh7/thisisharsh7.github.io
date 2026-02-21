import { motion } from 'framer-motion';
import Head from 'next/head';
import HomeButton from '../components/HomeButton';
import { experiences } from '../constants/data';

export default function ExperiencePage() {
    return (
        <>
            <Head>
                <title>Harsh | Experience</title>
                <meta name="description" content="Explore Harsh Kumar's professional experience as a Full-Stack Developer with 2+ years building scalable web applications. From sponsored open source maintainer at Epicenter (YC S25) to software engineering roles." />
                <link rel="canonical" href="https://thisisharsh7.github.io/experience" />
                <meta property="og:title" content="Harsh | Experience" />
                <meta property="og:description" content="Timeline of Harsh Kumar's work experience: sponsored maintainer at Epicenter (YC S25), Software Engineer at Userology, full-stack freelance projects, and technical mentoring." />
                <meta property="og:image" content="/images/og-image.jpg" />
                <meta property="og:image:alt" content="Harsh's experience timeline" />
                <meta property="og:url" content="https://thisisharsh7.github.io/experience" />
                <meta name="twitter:image" content="/images/og-image.jpg" />
                <meta name="twitter:image:alt" content="Harsh's experience timeline" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'ItemList',
                            'itemListElement': experiences.map((exp, index) => ({
                                '@type': 'JobPosting',
                                'title': exp.role,
                                'employer': {
                                    '@type': 'Organization',
                                    'name': exp.company,
                                },
                                'datePosted': exp.period.split(' - ')[0],
                                'description': exp.description,
                                'jobLocation': {
                                    '@type': 'Place',
                                    'address': {
                                        '@type': 'PostalAddress',
                                        'addressLocality': exp.location,
                                    },
                                },
                            })),
                        }),
                    }}
                />
            </Head>
            <motion.section
                className="flex flex-col relative items-center w-full sm:pt-12 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                role="main"
                aria-label="Portfolio Experience page"
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
            <HomeButton />
        </>
    );
}