import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import VectNonameBlack from '../../../public/VectNameBlack.png';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });


    return (
        <>
            <Head title="Benvenuti su UniShare">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className={`min-h-screen transition-colors duration-300`}>
                {/* Navigazione */}
                <header className="py-6 px-6 lg:px-8">
                    <nav className="mx-auto max-w-7xl flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={VectNonameBlack}
                                alt="Logo UniShare"
                                className="h-32 w-32"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                                    >
                                        Accedi
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Inizia
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Sezione Hero */}
                <main className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col items-center py-16 text-center lg:py-32">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Connetti, Collabora, <span className="text-indigo-600">Riuscisci</span>
                        </h1>
                        <p className="mt-6 max-w-3xl text-xl text-gray-600">
                            UniShare è la piattaforma definitiva per gli studenti universitari per condividere risorse,
                            collaborare a progetti e costruire comunità accademiche.
                        </p>
                        <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <Link
                                href={auth.user ? route('dashboard') : route('register')}
                                className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Inizia
                                <svg className="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-medium text-indigo-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Scopri di più
                            </Link>
                        </div>
                    </div>

                    {/* Anteprima App con Galleria */}
                    <div className="mb-20">
                        <div className="overflow-hidden rounded-xl shadow-xl mb-8">
                            <div className="bg-gray-800 p-3">
                                <div className="flex space-x-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                            <img
                                className="w-full"
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Studenti che collaborano nel campus"
                            />
                        </div>

                        {/* Galleria Immagini */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Gruppo di studio che lavora insieme"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4 bg-white">
                                    <h3 className="text-lg font-semibold text-gray-900">Studiare Insieme</h3>
                                    <p className="text-gray-600">Forma gruppi di studio con i compagni di classe</p>
                                </div>
                            </div>

                            <div className="rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                    alt="Condivisione appunti delle lezioni"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4 bg-white">
                                    <h3 className="text-lg font-semibold text-gray-900">Condividi Risorse</h3>
                                    <p className="text-gray-600">Carica e accedi ai materiali del corso</p>
                                </div>
                            </div>

                            <div className="rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                    alt="Studenti che lavorano a un progetto"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4 bg-white">
                                    <h3 className="text-lg font-semibold text-gray-900">Progetti di Gruppo</h3>
                                    <p className="text-gray-600">Collabora senza interruzioni sugli incarichi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sezione Funzionalità */}
                    <section id="features" className="bg-white py-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">Collabora meglio</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Tutto ciò di cui hai bisogno per il successo accademico
                                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    UniShare fornisce tutti gli strumenti di cui gli studenti hanno bisogno per condividere risorse, formare gruppi di studio,
                                    e collaborare a progetti senza interruzioni.
                                </p>
                            </div>
                            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                    <div className="flex flex-col rounded-xl bg-gray-50 p-8">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <h3 className="mt-6 text-lg font-semibold text-gray-900">Condivisione Risorse</h3>
                                        <p className="mt-2 text-gray-600">
                                            Condividi appunti delle lezioni, compiti e materiali di studio con i tuoi colleghi.
                                            Trova esattamente ciò di cui hai bisogno per i tuoi corsi.
                                        </p>
                                    </div>

                                    <div className="flex flex-col rounded-xl bg-gray-50 p-8">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="mt-6 text-lg font-semibold text-gray-900">Gruppi di Studio</h3>
                                        <p className="mt-2 text-gray-600">
                                            Crea o unisciti a gruppi di studio per i tuoi corsi. Collabora in tempo reale con
                                            chat e videoconferenza integrate.
                                        </p>
                                    </div>

                                    <div className="flex flex-col rounded-xl bg-gray-50 p-8">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="mt-6 text-lg font-semibold text-gray-900">Collaborazione Progetti</h3>
                                        <p className="mt-2 text-gray-600">
                                            Lavora a progetti di gruppo con gestione delle attività integrata, condivisione di file e
                                            controllo della versione per il lavoro accademico.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sezione Vetrina Immagini */}
                    <section className="py-20 bg-indigo-50">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Vedi UniShare in Azione
                                </h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    La nostra piattaforma rende la vita studentesca più facile e connessa
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div>
                                    <img
                                        src="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                        alt="Studente che usa UniShare su laptop"
                                        className="rounded-xl shadow-lg"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-indigo-500 rounded-lg p-3">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Piattaforma Sicura</h3>
                                            <p className="mt-1 text-gray-600">
                                                Il tuo lavoro accademico è protetto con sicurezza di livello aziendale.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-indigo-500 rounded-lg p-3">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Sincronizzazione Cloud</h3>
                                            <p className="mt-1 text-gray-600">
                                                Accedi ai tuoi materiali da qualsiasi dispositivo, ovunque.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-indigo-500 rounded-lg p-3">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Monitoraggio Scadenze</h3>
                                            <p className="mt-1 text-gray-600">
                                                Non perdere mai una scadenza di un compito con il nostro calendario integrato.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonianze */}
                    <section className="bg-white py-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Fidato da studenti di tutto il mondo
                                </h2>
                            </div>
                            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                                <div className="flex flex-col rounded-xl bg-white p-8 shadow-lg">
                                    <div className="flex items-center">
                                        <img className="h-12 w-12 rounded-full" src="https://randomuser.me/api/portraits/women/46.jpg" alt="Sarah J." />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Sarah J.</h3>
                                            <p className="text-gray-600">Informatica, MIT</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        "UniShare ha completamente trasformato il mio modo di studiare. Le risorse condivise dagli studenti più grandi
                                        mi hanno aiutato a superare corsi con cui stavo avendo difficoltà. La funzione gruppi di studio è rivoluzionaria!"
                                    </p>
                                </div>

                                <div className="flex flex-col rounded-xl bg-white p-8 shadow-lg">
                                    <div className="flex items-center">
                                        <img className="h-12 w-12 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="David K." />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">David K.</h3>
                                            <p className="text-gray-600">Ingegneria, Stanford</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        "Come studente internazionale, UniShare mi ha aiutato a connettermi con i compagni di classe e a formare gruppi di studio
                                        facilmente. La piattaforma è intuitiva e ha tutte le funzionalità di cui abbiamo bisogno per la collaborazione."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sezione Statistiche */}
                    <section className="bg-indigo-50 py-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2">
                                <div>
                                    <img
                                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                        alt="Studenti che usano UniShare"
                                        className="rounded-xl shadow-xl"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="mx-auto max-w-2xl lg:mx-0">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                            Unisciti alla nostra crescente comunità
                                        </h2>
                                        <p className="mt-6 text-lg leading-8 text-gray-600">
                                            Migliaia di studenti in centinaia di università stanno già utilizzando UniShare per migliorare la loro esperienza accademica.
                                        </p>
                                    </div>
                                    <div ref={ref} className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-8 lg:max-w-none lg:grid-cols-2">
                                        <div className="flex flex-col items-start">
                                            <div className="rounded-md bg-white p-2 shadow">
                                                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="mt-6 text-base font-semibold text-gray-900">
                                                <span className="text-4xl font-bold text-indigo-600">
                                                    {inView && <CountUp end={50000} duration={2} separator="," />}+
                                                </span>
                                                <span className="block mt-2">Studenti Attivi</span>
                                            </h3>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="rounded-md bg-white p-2 shadow">
                                                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <h3 className="mt-6 text-base font-semibold text-gray-900">
                                                <span className="text-4xl font-bold text-indigo-600">
                                                    {inView && <CountUp end={200} duration={2} />}+
                                                </span>
                                                <span className="block mt-2">Università</span>
                                            </h3>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sezione CTA */}
                    <section className="bg-indigo-600 py-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Pronto a trasformare la tua esperienza accademica?
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-indigo-100">
                                    Unisciti a migliaia di studenti che stanno già collaborando e avendo successo con UniShare.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Link
                                        href={auth.user ? route('dashboard') : route('register')}
                                        className="rounded-md bg-white px-6 py-3 text-base font-medium text-indigo-600 shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                                    >
                                        Inizia
                                    </Link>
                                    <Link
                                        href="#features"
                                        className="text-base font-medium text-white hover:text-indigo-100"
                                    >
                                        Scopri di più <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="bg-gray-50">
                        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                            <div className="border-t border-gray-200 pt-8">
                                <p className="text-sm text-gray-500">
                                    &copy; {new Date().getFullYear()} UniShare. Tutti i diritti riservati.
                                </p>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
}