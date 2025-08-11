
import { ArrowLeft, Plus } from "lucide-react";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import FormRemedio from "./_components/FormRemedio"
import Link from "next/link";
export default async function FormPage() {
    const session = await auth()
    if(!session) {
        redirect("/home")
    }
    return(
         <section className="min-h-screen w-full flex flex-col  bg-zinc-100">
            <header className="flex items-start p-2 flex-col px-6 py-3  ">
                <Link href="/home" className="no-underline">
                <ArrowLeft className="w-6 h-6 text-zinc-500 cursor-pointer" />
                </Link>
                <h1 className="mt-2 text-2xl font-bold text-red-600">Nova Receita</h1>
                <p className="mt-1 text-sm text-zinc-500">Adicione a sua prescrição médica para receber lembretes de quando tomar seu medicamento</p>

            </header>
            <main className="flex-1 w-full  h-full ">
                <FormRemedio />

            </main>
                  
        </section>
    )
}