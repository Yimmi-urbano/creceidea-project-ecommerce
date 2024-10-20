'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { getDomain, login } from "./api";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { EyeFilledIcon, EyeSlashFilledIcon, Logo } from "@/components/icons";
import { Chip } from "@nextui-org/react";

const CardLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de campos vacíos y formato de correo
  const validateForm = (): boolean => {
    let isValid = true;

    if (!email) {
      setEmailError("El correo no puede estar vacío.");
      isValid = false;
    } 
     if (!validateEmail(email)) {
      setEmailError("Por favor ingrese un correo válido.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("La contraseña no puede estar vacía.");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetErrors();

    // Validaciones
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await login(email, password);

      if (response.status === "error") {
        handleLoginError(response.message);
      } else {
        handleLoginSuccess(response);
      }
    } catch (error) {
      setError("Error de red. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetErrors = () => {
    setError(null);
    setEmailError(null);
    setPasswordError(null);
  };

  const handleLoginError = (message: string) => {
    if (message === "Usuario no encontrado") {
      setEmailError("Usuario no encontrado");
    } else if (message === "Contraseña incorrecta") {
      setPasswordError("Contraseña incorrecta");
    } else {
      setError("Usuario y/o contraseña incorrecta.");
    }
  };

  const handleLoginSuccess = async (response: any) => {
    localStorage.setItem("token", response.data.token.value);
    localStorage.setItem("permissions", JSON.stringify(response.data.user.components));

    try {
      const domainResponse = await getDomain();
      localStorage.setItem("domainSelect", domainResponse[0].domain);
      localStorage.setItem("domainAssigned", JSON.stringify(domainResponse));

      router.push("/dashboard");
    } catch (domainError) {
      setError("Error al obtener los dominios. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <Card shadow="none" className="border-0 bg-transparent card-login gap-5 lg:w-[350px] w-[90%]">
     <div className="logo-crece-style"> <Logo /></div> 
      <Card  isBlurred className="border-1 dark:border-[#0ea5e9]/30 dark:bg-[#0c4a6e]/40 card-login w-[100%] ">
        <CardBody className="p-5">
          <form onSubmit={handleSubmit}>
            <article className="prose">
              <h2 className="mb-5 mt-2 text-xl font-bold">Inicia sesión en tu cuenta</h2>
            </article>

            <div className="flex w-full flex-wrap lg:items-end md:flex-nowrap mb-6 mt-5 md:mb-4">
              <Input
                type="email"
                label="Correo"
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
                isInvalid={!!emailError}
                errorMessage={emailError}
                classNames={{
                  inputWrapper: ['border-1 dark:border-[#0ea5e9]/40 dark:bg-sky-900/40']
                }}
                labelPlacement="outside"
                placeholder="Ingrese su correo"
              />
            </div>

            <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-4">
              <Input
                type={isVisible ? "text" : "password"}
                label="Contraseña"
                variant="bordered"
                isRequired
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!passwordError}
                errorMessage={passwordError}
                classNames={{
                  inputWrapper: ['border-1 dark:border-[#0ea5e9]/40 dark:bg-sky-900/40']
                }}
                labelPlacement="outside"
                placeholder="Contraseña"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-[#0ea5e9] pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-[#0ea5e9] pointer-events-none" />
                    )}
                  </button>
                }
              />
            
            </div>
            <div className="text-center gap-4">
            {error && <Chip variant="flat" size="md" className="w-[100%]" color="danger">{error}</Chip>}

            </div>


            <CardFooter className="flex flex-col gap-4 w-full">
            
              <Button type="submit" color="warning" className="m-auto w-[80%] rounded-3xl" isLoading={isLoading}>
                Iniciar sesión
              </Button>
              <Link className="flex items-center text-center p-0 w-full block text-current" href="#">
                <span className="text-sm">¿Olvidaste tu clave?</span>
              </Link>

              <Link className="flex items-center p-0 hidden text-center w-full text-current" href="#">
                <span className="text-sm">¿Aún no tienes cuenta? Registrarse</span>
              </Link>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </Card>
  );
};

export default CardLogin;
