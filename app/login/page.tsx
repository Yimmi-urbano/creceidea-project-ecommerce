'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { getDomain, login } from "./api";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";

export default function CardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    setIsLoading(true);
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
        
        localStorage.setItem("token", response.data.token.value);

        try {
          const domainResponse = await getDomain();
          localStorage.setItem("domainSelect", domainResponse[0].domain);
          localStorage.setItem("domainAssigned", JSON.stringify(domainResponse));


          router.push("/dashboard");
        } catch (domainError) {
          setError("Error al obtener los dominios. Inténtalo de nuevo más tarde.");
        }
      }
    } catch (error) {
      setError("Error de red. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <Card className="border-none card-login  w-full lg:w-[350px] h-[450px] lg:h-auto bottom-[-10px] lg:right-[100px] absolute lg:relative" >
      <CardBody className="p-5">
        <form onSubmit={handleSubmit}>
          <article className="prose">
            <h2 className="mb-5 mt-5 text-xl font-bold">Iniciar Sesión</h2>
          </article>

          <div className="flex w-full flex-wrap lg:items-end md:flex-nowrap mb-6 mt-5 md:mb-4 ">
            <Input
              type="email"
              label="Correo"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
              errorMessage={emailError}
              className="max-w-xs  border-100"
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

          <CardFooter className="flex flex-wrap gap-4">
            <Button type="submit" color="warning" className="m-auto block w-[80%] rounded-3xl" isLoading={isLoading}>
              Iniciar sesión
            </Button>
            <Link className="flex items-center text-center  w-full block text-current" href="#">
              <span className="text-sm">¿Olvidaste tu clave?</span>
            </Link>

            <Link className="flex items-center text-center w-full block text-current" href="#">
              <span className="text-sm">¿Aún no tienes cuenta? Registrarse</span>
            </Link>

          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
}
