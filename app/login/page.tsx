'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { getDomain, login } from "./api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Logo } from "@/src/presentation/components/shared/icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Clean up body class if it was added by previous code
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
        // Success handling
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
    <main className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-[#0f1115] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#00A09D]/5 blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#0ea5e9]/5 blur-3xl opacity-50"></div>
      </div>

      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in duration-500">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-[#13161c] shadow-lg mb-4 border border-zinc-100 dark:border-zinc-800">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Bienvenido de nuevo
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">
            Ingresa a tu cuenta para gestionar tu negocio
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-[#13161c] rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-2">
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
                  inputWrapper: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 shadow-none",
                  input: "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                }}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">@</span>
                  </div>
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Contraseña
                </label>
              </div>
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
                  inputWrapper: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 shadow-none",
                  input: "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                }}
                endContent={
                  <button
                    className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                }
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <Link
                href="#"
                className="text-sm font-medium text-[#00A09D] hover:text-[#008f8c] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#00A09D] text-white font-semibold shadow-lg shadow-[#00A09D]/20"
              size="lg"
              isLoading={isLoading}
              spinner={<Loader2 className="w-5 h-5 animate-spin" />}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            ¿No tienes una cuenta?{' '}
            <Link href="#" className="font-medium text-[#00A09D] hover:text-[#008f8c] transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
