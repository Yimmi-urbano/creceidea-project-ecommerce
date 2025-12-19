'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@nextui-org/react'
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react'
import * as Sentry from "@sentry/nextjs"

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
    errorInfo: ErrorInfo | null
}

/**
 * Error Boundary Component
 * 
 * Catches React errors and provides a premium fallback UI.
 * Handles session expiration errors specifically by offering a redirect.
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        }
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: null,
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)

        Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });

        this.setState({
            error,
            errorInfo,
        })
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        })
        window.location.reload()
    }

    handleGoHome = () => {
        window.location.href = '/dashboard'
    }

    handleGoLogin = () => {
        import('@/src/infrastructure/storage/localStorage').then(({ logout }) => {
            logout()
        })
    }

    render() {
        if (this.state.hasError) {
            const { error } = this.state
            const errorMessage = error?.message?.toLowerCase() || ''

            const isSessionError =
                errorMessage.includes('session expired') ||
                errorMessage.includes('unauthorized') ||
                errorMessage.includes('401') ||
                errorMessage.includes('usecontext') || // Often a side effect of lost session state
                errorMessage.includes('null (reading')

            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Default premium error UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-dark-bg p-6 relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

                    <div className="max-w-md w-full relative">
                        <div className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-zinc-800 p-10 lg:p-12 overflow-hidden">
                            {/* Icon Container */}
                            <div className="flex justify-center mb-8 relative">
                                <div className={`p-6 rounded-3xl shadow-lg transition-all duration-500 ${isSessionError ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'}`}>
                                    <AlertTriangle className="w-12 h-12" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-extrabold text-center text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
                                {isSessionError ? 'Sesión Interrumpida' : 'Algo no salió bien'}
                            </h1>

                            {/* Description */}
                            <p className="text-center text-zinc-500 dark:text-zinc-400 mb-10 text-lg leading-relaxed font-medium">
                                {isSessionError
                                    ? 'Tu sesión ha expirado o hubo un problema de conexión. Por favor, reautentícate para continuar.'
                                    : 'Ha ocurrido un error inesperado. Estamos trabajando para solucionarlo lo antes posible.'}
                            </p>

                            {/* Error Details (only in development) */}
                            {process.env.NODE_ENV === 'development' && error && (
                                <div className="mb-8 p-5 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-inner">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Debug Info</span>
                                        </div>
                                        <p className="text-xs font-mono text-zinc-400 break-all leading-relaxed">
                                            {error.message}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col gap-4">
                                {isSessionError ? (
                                    <Button
                                        color="primary"
                                        size="lg"
                                        variant="shadow"
                                        className="w-full h-14 rounded-2xl font-bold text-lg shadow-primary/25"
                                        startContent={<Home size={20} />}
                                        onPress={this.handleGoLogin}
                                    >
                                        Ir al Login
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            color="primary"
                                            size="lg"
                                            variant="shadow"
                                            className="w-full h-14 rounded-2xl font-bold text-lg shadow-primary/25"
                                            startContent={<RefreshCcw size={20} />}
                                            onPress={this.handleReset}
                                        >
                                            Recargar Página
                                        </Button>
                                        <Button
                                            variant="bordered"
                                            size="lg"
                                            className="w-full h-14 rounded-2xl font-bold text-lg border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                            startContent={<Home size={20} />}
                                            onPress={this.handleGoHome}
                                        >
                                            Volver al Inicio
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Additional Help */}
                        <p className="text-center text-sm text-zinc-400 dark:text-zinc-500 mt-8 font-medium">
                            Si el problema persiste, contacta al <span className="text-primary hover:underline cursor-pointer">soporte técnico</span>
                        </p>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
