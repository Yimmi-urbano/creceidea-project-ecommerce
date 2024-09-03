'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { getDomain, login } from "./api";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { input } from "@nextui-org/react";

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetErrors();
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
      setError("Error desconocido. Inténtalo de nuevo más tarde.");
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
    
    <Card shadow="none" isBlurred className="border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40  card-login w-[90%] lg:w-[350px] h-[450px] lg:h-auto bottom-[-10px] lg:right-[100px] left-[20px] absolute lg:relative">
      <CardBody className="p-5">
        <form onSubmit={handleSubmit}>
          <article className="prose">
            <h2 className="mb-5 mt-5 text-xl font-bold">Iniciar Sesión</h2>
          </article>

          <div className="flex w-full flex-wrap lg:items-end md:flex-nowrap mb-6 mt-5 md:mb-4">
            <Input
              type="email"
              label="Correo"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
              errorMessage={emailError}
              classNames={{
                inputWrapper:[
                  'border-1 border-[#0ea5e9]/40 bg-sky-900'
                ]
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!passwordError}
              errorMessage={passwordError}
              classNames={{
                inputWrapper:[
                  'border-1 border-[#0ea5e9]/40 bg-sky-900'
                ]
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

          {error && <p className="text-red-600">{error}</p>}

          <CardFooter className="flex flex-wrap gap-4">
            <Button type="submit" color="warning" className="m-auto  w-[80%] rounded-3xl" isLoading={isLoading}>
              Iniciar sesión
            </Button>
            <Link className="flex items-center text-center p-0 w-full block text-current" href="#">
              <span className="text-sm">¿Olvidaste tu clave?</span>
            </Link>

            <Link className="flex items-center p-0 hidden text-center w-full  text-current" href="#">
              <span className="text-sm">¿Aún no tienes cuenta? Registrarse</span>
            </Link>
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
};

export default CardLogin;
