'use client'

import React, { useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { AlertCircle, Home, RefreshCcw, LogOut, ShieldAlert } from 'lucide-react'
import { logout } from '@/src/infrastructure/storage/localStorage'
import * as Sentry from "@sentry/nextjs"

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to Sentry
        console.error('Dashboard Error:', error)
        Sentry.captureException(error)
    }, [error])

    const isAuthError = error.message?.includes('AUTH_ERROR_SESSION_EXPIRED') ||
        error.message?.toLowerCase().includes('unauthorized') ||
        error.message?.toLowerCase().includes('401')

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <div className="relative w-full max-w-lg">
                {/* Decorative background blobs */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />

                <div className="relative bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-3xl shadow-2xl p-8 lg:p-12 overflow-hidden text-center">
                    {/* Error Icon */}
                    <div className="flex justify-center mb-8">
                        <div className={`p-6 rounded-3xl shadow-lg transition-transform hover:scale-110 duration-500 ${isAuthError ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 shadow-amber-200/50' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 shadow-rose-200/50'}`}>
                            {isAuthError ? (
                                <ShieldAlert size={48} strokeWidth={1.5} />
                            ) : (
                                <AlertCircle size={48} strokeWidth={1.5} />
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
                        {isAuthError ? 'La sesión ha expirado' : '¡Ups! Algo salió mal'}
                    </h2>

                    {/* Description */}
                    <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg leading-relaxed max-w-sm mx-auto">
                        {isAuthError
                            ? 'Parece que tu sesión ha terminado por seguridad. Por favor, vuelve a ingresar para continuar.'
                            : 'Ha ocurrido un error inesperado en el panel. No te preocupes, esto suele ser temporal.'}
                    </p>

                    {/* Error Snippet (only in dev) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mb-10 p-4 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-left overflow-hidden">
                            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500 truncate mb-1">
                                <span className="font-bold text-zinc-700 dark:text-zinc-300">Digest:</span> {error.digest || 'N/A'}
                            </p>
                            <p className="text-xs font-mono text-rose-600 dark:text-rose-400 break-words">
                                <span className="font-bold text-zinc-700 dark:text-zinc-300">Error:</span> {error.message}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {isAuthError ? (
                            <Button
                                onPress={handleLogout}
                                className="w-full h-14 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl shadow-xl shadow-primary/25 transition-all sm:col-span-2 text-lg"
                                startContent={<LogOut size={20} />}
                            >
                                Ir al Inicio de Sesión
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onPress={() => reset()}
                                    className="w-full h-14 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl shadow-xl shadow-primary/25 transition-all text-lg"
                                    startContent={<RefreshCcw size={20} />}
                                >
                                    Reintentar
                                </Button>
                                <Button
                                    onPress={() => window.location.href = '/dashboard'}
                                    variant="bordered"
                                    className="w-full h-14 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold rounded-2xl text-lg"
                                    startContent={<Home size={20} />}
                                >
                                    Inicio
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer Help */}
                <p className="text-center mt-8 text-sm text-zinc-500 dark:text-zinc-500 font-medium">
                    ¿Necesitas ayuda? <a href="#" className="underline text-primary hover:text-primary-hover">Contacta a soporte</a>
                </p>
            </div>
        </div>
    )
}
