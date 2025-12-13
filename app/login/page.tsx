'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { getDomain, login } from "./api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, Loader2, TrendingUp, Shield, Sparkles, Zap } from "lucide-react";
import { Logo } from "@/src/presentation/components/shared/Icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.remove("login-page");
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      errors.email = "El correo es requerido";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Ingresa un correo válido";
      isValid = false;
    }

    if (!password) {
      errors.password = "La contraseña es requerida";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await login(email, password);

      if (response.status === "error") {
        if (response.message === "Usuario no encontrado") {
          setFieldErrors(prev => ({ ...prev, email: "Usuario no encontrado" }));
        } else if (response.message === "Contraseña incorrecta") {
          setFieldErrors(prev => ({ ...prev, password: "Contraseña incorrecta" }));
        } else {
          setError("Credenciales incorrectas. Por favor verifica tus datos.");
        }
      } else {
        localStorage.setItem("token", response.data.token.value);
        localStorage.setItem("permissions", JSON.stringify(response.data.user.components));

        try {
          const domainResponse = await getDomain();
          localStorage.setItem("domainSelect", domainResponse[0].domain);
          localStorage.setItem("domainAssigned", JSON.stringify(domainResponse));
          router.push("/dashboard");
        } catch (err) {
          setError("Error al configurar el entorno. Contacta soporte.");
        }
      }
    } catch (err) {
      setError("Error de conexión. Inténtalo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4 py-8">
      {/* Centered Container */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden">

        {/* Left Section - Brand Showcase */}
        <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://media-static.creceidea.pe/images/background-creceidea.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/85 to-primary-hover/90" />

          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-[-30%] left-[-30%] w-72 h-72 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-30%] right-[-30%] w-72 h-72 rounded-full bg-white/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center w-full px-10 py-16 text-white">
            {/* Logo - Larger and more prominent */}
            <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <Logo width={120} height={50} />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-base text-white/90 mb-8 font-light">
              Tus ideas, tu éxito
            </p>

            {/* Features - Compact Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/15 transition-all group">
                <div className="bg-white/20 rounded-lg w-9 h-9 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm mb-0.5">Crecimiento</h3>
                <p className="text-xs text-white/75 leading-tight">Impulsa tu negocio</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/15 transition-all group">
                <div className="bg-white/20 rounded-lg w-9 h-9 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm mb-0.5">Seguridad</h3>
                <p className="text-xs text-white/75 leading-tight">Protección total</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/15 transition-all group">
                <div className="bg-white/20 rounded-lg w-9 h-9 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm mb-0.5">Innovación</h3>
                <p className="text-xs text-white/75 leading-tight">Última generación</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/15 transition-all group">
                <div className="bg-white/20 rounded-lg w-9 h-9 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm mb-0.5">Rapidez</h3>
                <p className="text-xs text-white/75 leading-tight">Gestión eficiente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-[55%] bg-white dark:bg-dark-card flex items-center justify-center px-8 py-12 lg:px-12 relative">
          {/* Mobile Logo */}
          <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2">
            <div className="bg-primary/10 rounded-2xl p-3 border border-primary/20">
              <Logo width={100} height={40} />
            </div>
          </div>

          <div className="w-full max-w-md mt-16 lg:mt-0">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                Bienvenido de nuevo
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Ingresa a tu cuenta para gestionar tu negocio
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onValueChange={(val) => {
                    setEmail(val);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  isInvalid={!!fieldErrors.email}
                  errorMessage={fieldErrors.email}
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-primary dark:hover:border-primary data-[hover=true]:border-primary group-data-[focus=true]:border-primary",
                    input: "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                  }}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-zinc-400 text-sm">@</span>
                    </div>
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onValueChange={(val) => {
                    setPassword(val);
                    if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  isInvalid={!!fieldErrors.password}
                  errorMessage={fieldErrors.password}
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-primary dark:hover:border-primary data-[hover=true]:border-primary group-data-[focus=true]:border-primary",
                    input: "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                  }}
                  endContent={
                    <button
                      className="focus:outline-none text-zinc-400 hover:text-primary transition-colors"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                />
              </div>

              <div className="flex items-center justify-end">
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold shadow-lg shadow-primary/25 transition-all duration-300"
                size="lg"
                isLoading={isLoading}
                spinner={<Loader2 className="w-5 h-5 animate-spin" />}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                ¿No tienes una cuenta?{' '}
                <Link href="#" className="font-medium text-primary hover:text-primary-hover transition-colors">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
