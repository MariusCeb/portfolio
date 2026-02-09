import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Payment() {
    const { post } = useForm();

    const handlePayment = () => {
        post(route('payment.renew'), {
            onSuccess: () => {
                console.log("test")
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white">
            <h1 className="text-2xl font-bold mb-4">Abbonamento Scaduto</h1>
            <p className="mb-6 text-gray-600 text-center max-w-md">
                Il tuo abbonamento mensile admin è scaduto. Per continuare a usare l'app, premi il bottone qui sotto per "pagare".
            </p>
            <Button onClick={handlePayment}>Paga 10€ e Continua</Button>
        </div>
    );
}
