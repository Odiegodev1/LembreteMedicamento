import Image from "next/image";
import Foto from "@/assets/foto.png";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
export function Header() {
    return(
         <header className="h-46 p-4 py-10 px-8 bg-zinc-200 w-full">
            <div className="flex items-center justify-between">

              <Link href="/home">
              <ArrowLeft className="size-6 text-zinc-500" />
              </Link>
            
            <Link href="/home/form">
              <div className="flex bg-blue-500 items-center size-12 rounded-full">
                <Plus className="text-white size-6 mx-auto" />
              </div>
            </Link>

            </div>

            <div className=" flex flex-col items-start space-y-1">
               <h1 className="text-xl font-bold text-blue-500">Minhas Receitas</h1>
                <p className="text-sm text-zinc-500">Acompanhe seus medicamentos cadastrados e gerencie lembretes</p>
               
            </div>
          </header>
    )
}