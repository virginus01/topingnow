import Head from 'next/head';
import Image from 'next/image';
import { Navbar } from './Navbar';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link rel="icon" type="image/png" href="/favicon.ico" />

                <title>My App</title>

            </Head>

            <header>
                <Navbar />
            </header>

            <main className="container mx-auto p-4">
                {children}
            </main>



        </>
    );

}