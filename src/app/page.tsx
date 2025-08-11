"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

export default function LoginPage() {
  async function handleLogin() {
    signIn("github", { callbackUrl: "/home" });
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-sm w-full text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Bem-vindo!</h1>
        <p className="text-gray-600 mb-8 text-base">
          Faça login com sua conta do GitHub para continuar
        </p>
        <Button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
          aria-label="Entrar com GitHub"
        >
          <Github size={24} />
          Entrar com GitHub
        </Button>
      </div>
      <footer className="mt-12 text-gray-400 text-sm select-none">
        &copy; {new Date().getFullYear()} Seu Projeto. Todos os direitos reservados.
      </footer>
    </div>
  );
}
