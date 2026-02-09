import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Bentornato!"
            description="Sblocca il tuo potenziale accademico"
        >

            <Head title="Accedi | UniShare" />


            <div className="relative">
                {/* Elementi decorativi */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-400/20 rounded-full blur-xl"></div>

                <form
                    className="relative flex flex-col gap-6 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20"
                    onSubmit={submit}
                >
                    <div className="grid gap-6">
                        {/* Campo Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                                Indirizzo Email
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@esempio.com"
                                    className="pl-10 bg-white/50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Campo Password */}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-600">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={route('password.request')}
                                        className="ml-auto text-xs"
                                        tabIndex={5}
                                    >
                                        Password dimenticata?
                                    </TextLink>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 bg-white/50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Ricordami */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                    className="border-gray-300 bg-white/50 checked:bg-indigo-500"
                                />
                                <Label htmlFor="remember" className="text-sm text-gray-600">
                                    Ricordami
                                </Label>
                            </div>
                        </div>

                        {/* Bottone Invia */}
                        <Button
                            type="submit"
                            className="mt-2 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg transition-all"
                            tabIndex={4}
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="h-5 w-5 animate-spin mr-2" />
                                    Accesso in corso...
                                </>
                            ) : (
                                "Accedi"
                            )}
                        </Button>
                    </div>

                    {/* Link Iscrizione */}
                    <div className="text-center text-sm text-gray-500">
                        Nuovo su UniShare?{' '}
                        <TextLink
                            href={route('register')}
                            className="font-semibold text-indigo-600 hover:underline"
                            tabIndex={5}
                        >
                            Crea un account
                        </TextLink>
                    </div>
                </form>
            </div>

            {/* Messaggio di stato */}
            {status && (
                <div className="mt-4 p-3 text-center text-sm font-medium rounded-lg bg-green-50 text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}