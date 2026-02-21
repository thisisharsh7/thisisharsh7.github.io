import Head from 'next/head';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 - Page Not Found</title>
                <meta name="description" content="The page you are looking for does not exist." />
            </Head>
            <section
                className=" w-full relative sm:pt-12 pt-8 min-h-screen flex flex-col items-center justify-center  pb-24"
                role="main"
                aria-label="Portfolio Error page"
            >
                <h1 className="text-4xl font-bold mb-4 relative text-center">404 - Page Not Found</h1>
                <p className="text-lg mb-6 relative text-center">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/" className="flex relative items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Return to homepage">
                    <FaHome /> Back to Home
                </Link>
            </section>
        </>
    );
}