'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { login } from "./api";
import { Link } from "@nextui-org/link";

export default function CardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading state

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);
    setIsLoading(true); // Set loading state to true

    try {
      const response = await login(email, password);
      if (response.status === "error") {
        if (response.message === "Usuario no encontrado") {
          setEmailError("Usuario no encontrado");
        } else if (response.message === "Contraseña incorrecta") {
          setPasswordError("Contraseña incorrecta");
        } else {
          setError("Error desconocido. Inténtalo de nuevo más tarde.");
        }
      } else {
        console.log("Login successful:", response);
        localStorage.setItem("token", response.data.token.value);
      }
    } catch (error) {
      setError("Error de red. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false); // Set loading state back to false after API call completes
    }
  };

  return (
    <Card className="border-none bg-background/65 backdrop-blur w-full lg:w-[350px] h-[450px] lg:h-auto bottom-[-10px] left-0 absolute lg:relative" shadow="sm">
      <CardBody className="p-5">
        <form onSubmit={handleSubmit}>
          <article className="prose">
            <h2 className="mb-5 text-xl font-bold">Iniciar Sesión</h2>
          </article>

          <div className="flex w-full flex-wrap lg:items-end md:flex-nowrap mb-6 md:mb-4 ">
            <Input
              type="email"
              label="Correo"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
              errorMessage={emailError}
              className="max-w-xs  "
              labelPlacement="outside"
              placeholder="Ingrese su correo"
            />
          </div>

          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-4 ">
            <Input
              type="password"
              label="Contraseña"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!passwordError}
              errorMessage={passwordError}
              className="max-w-xs"
              labelPlacement="outside"
              placeholder="Contraseña"
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button type="submit" color="warning" className="mb-3 mt-3" isLoading={isLoading}>
            Iniciar sesión
          </Button>

          <CardFooter>
            <Link className="flex items-center gap-1 text-current" href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template">
              <span className="text-sm">¿Olvidaste tu clave?</span>
            </Link>
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
}
