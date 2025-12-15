'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@nextui-org/react';

// Skeleton Component
function ForgotPasswordSkeleton() {
    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-dark-card rounded-2xl p-8 space-y-6 border border-dark-border">
                    <Skeleton className="h-10 w-48 rounded-lg mb-2" />
                    <Skeleton className="h-5 w-full rounded-lg" />
                    <div className="space-y-4 pt-4">
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-dark-card rounded-2xl p-8 border border-dark-border text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} className="text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Correo Enviado
                        </h1>
                        <p className="text-zinc-400 mb-6">
                            Hemos enviado un enlace de recuperación a <span className="text-white font-medium">{email}</span>
                        </p>
                        <p className="text-sm text-zinc-500 mb-6">
                            Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Volver
                </Link>

                {/* Form Card */}
                <div className="bg-dark-card rounded-2xl p-8 border border-dark-border">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        ¿Olvidaste tu contraseña?
                    </h1>
                    <p className="text-zinc-400 mb-8">
                        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-zinc-500" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ejemplo@correo.com"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                                <p className="text-sm text-rose-400">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Enviando...
                                </span>
                            ) : (
                                'Enviar Enlace de Recuperación'
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-zinc-500 text-sm mt-6">
                    ¿Recordaste tu contraseña?{' '}
                    <Link href="/login" className="text-primary hover:text-primary-hover transition-colors">
                        Iniciar Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
