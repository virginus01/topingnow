import Head from 'next/head';
import { Navbar } from './navbar';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/png" href="/favicon.ico" />
                <meta name='description' content='Toping now' />
                <title>My App</title>

            </Head>

            <header>
                <Navbar />
            </header>

            <main className='pt-16 text-sm lg:text-lg md:text-md sm:text-sm text-gray-500'>
                {children}
            </main>


        </>
    );

}