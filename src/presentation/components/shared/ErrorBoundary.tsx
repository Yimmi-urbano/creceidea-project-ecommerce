'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@nextui-org/react'
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react'

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
 * Catches React errors and provides a fallback UI
 * Handles session expiration errors specifically
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

        this.setState({
            error,
            errorInfo,
        })

        // Check if it's a session/context error
        if (error.message?.includes('useContext') ||
            error.message?.includes('Context') ||
            error.message?.includes('Session expired')) {

            // Check if domain exists
            if (typeof window !== 'undefined') {
                const domain = localStorage.getItem('domainSelect')
                if (!domain) {
                    // Redirect to login after a short delay
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 2000)
                }
            }
        }
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        })
    }

    handleGoHome = () => {
        window.location.href = '/dashboard'
    }

    handleGoLogin = () => {
        window.location.href = '/login'
    }

    render() {
        if (this.state.hasError) {
            const { error } = this.state
            const isSessionError = error?.message?.includes('Session expired') ||
                error?.message?.includes('No domain found')

            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Default error UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-dark-bg p-4">
                    <div className="max-w-md w-full">
                        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8">
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20">
                                    <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-2">
                                {isSessionError ? 'Sesión Expirada' : 'Error Inesperado'}
                            </h1>

                            {/* Description */}
                            <p className="text-center text-zinc-600 dark:text-zinc-400 mb-6">
                                {isSessionError
                                    ? 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
                                    : 'Ha ocurrido un error. Por favor, intenta recargar la página.'}
                            </p>

                            {/* Error Details (only in development) */}
                            {process.env.NODE_ENV === 'development' && error && (
                                <div className="mb-6 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg max-h-40 overflow-auto">
                                    <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 break-all mb-2">
                                        <strong>Error:</strong> {error.message}
                                    </p>
                                    {this.state.errorInfo && (
                                        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500 break-all">
                                            <strong>Stack:</strong> {this.state.errorInfo.componentStack}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                {isSessionError ? (
                                    <Button
                                        color="primary"
                                        size="lg"
                                        className="w-full font-semibold"
                                        startContent={<Home size={18} />}
                                        onPress={this.handleGoLogin}
                                    >
                                        Ir al Login
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            color="primary"
                                            size="lg"
                                            className="w-full font-semibold"
                                            startContent={<RefreshCcw size={18} />}
                                            onPress={this.handleReset}
                                        >
                                            Intentar Nuevamente
                                        </Button>
                                        <Button
                                            variant="bordered"
                                            size="lg"
                                            className="w-full font-semibold"
                                            startContent={<Home size={18} />}
                                            onPress={this.handleGoHome}
                                        >
                                            Volver al Inicio
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Additional Help */}
                        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
                            Si el problema persiste, contacta al soporte técnico
                        </p>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
