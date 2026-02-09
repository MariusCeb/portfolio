import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function CvValidation() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.location.href = route('dashboard'); // o route('home') se hai una route diversa
        }, 10000); // 10 secondi

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <Head title="Validazione Curriculum" />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <Loader2 className="animate-spin mx-auto mb-4 text-indigo-600" size={32} />
                    <h1 className="text-xl font-semibold text-gray-800 mb-2">Validazione Curriculum in corso...</h1>
                    <p className="text-sm text-gray-600">
                        Il tuo curriculum sta per essere revisionato. Verrai reindirizzato tra pochi secondi.
                    </p>
                </div>
            </div>
        </>
    );
}
