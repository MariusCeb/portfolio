import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, FileText, LoaderCircle, Lock, Mail, User } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    isAdmin: boolean;
    cv: File | null;
};

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        isAdmin: false,
        cv: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);
        formData.append('isAdmin', String(data.isAdmin));

        if (data.isAdmin && data.cv) {
            formData.append('cv', data.cv);
        }

        post(route('register'), {
            forceFormData: true,
            onSuccess: () => {
                // Se è admin, vai alla pagina di verifica CV
                if (data.isAdmin) {
                    window.location.href = route('cv.validation');
                } else {
                    // Altrimenti vai al dashboard o dove vuoi
                    window.location.href = route('dashboard');
                }
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Crea un account" description="Entra nella nostra community accademica">
            <Head title="Register | UniShare" />

            <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-indigo-400/20 blur-xl"></div>
                <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-purple-400/20 blur-xl"></div>

                <form
                    className="relative flex flex-col gap-6 rounded-2xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-lg"
                    onSubmit={submit}
                >
                    <div className="grid gap-6">
                        {/* Name Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-600">
                                Nome
                            </Label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="John Doe"
                                    className="border-gray-300 bg-white/50 pl-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <InputError message={errors.name} />
                        </div>

                        {/* Email Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                                Email
                            </Label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                    className="border-gray-300 bg-white/50 pl-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Password Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-600">
                                Password
                            </Label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="border-gray-300 bg-white/50 pr-10 pl-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
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

                        {/* Confirm Password Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-600">
                                Conferma Password
                            </Label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className="border-gray-300 bg-white/50 pr-10 pl-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* Admin Checkbox */}
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="isAdmin"
                                name="isAdmin"
                                checked={data.isAdmin}
                                onClick={() => setData('isAdmin', !data.isAdmin)}
                                tabIndex={5}
                                className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            />
                            <Label htmlFor="isAdmin" className="text-sm font-medium text-gray-600">
                                Richiedi Account Admin
                            </Label>
                        </div>

                        {/* CV Upload (only shown if admin is selected) */}
                        {data.isAdmin && (
                            <div className="grid gap-2">
                                <Label htmlFor="cv" className="text-sm font-medium text-gray-600">
                                    Carcia CV (PDF)
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="cv"
                                        type="file"
                                        required
                                        accept=".pdf"
                                        onChange={(e) => setData('cv', e.target.files?.[0] ?? null)}
                                        disabled={processing}
                                        className="border-gray-300 bg-white/50 pl-10 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <InputError message={errors.cv} />
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="mt-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-white shadow-lg transition-all hover:from-indigo-600 hover:to-purple-700"
                            tabIndex={6}
                            disabled={
                                processing || !data.name || !data.email || !data.password || !data.password_confirmation || (data.isAdmin && !data.cv)
                            }
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                    Creazione account...
                                </>
                            ) : (
                                'Registrati'
                            )}
                        </Button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center text-sm text-gray-500">
                        Hai già un account?{' '}
                        <TextLink href={route('login')} className="font-semibold text-indigo-600 hover:underline" tabIndex={7}>
                            Log in
                        </TextLink>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
