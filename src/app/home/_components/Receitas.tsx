import { ArrowRight, Hospital } from "lucide-react";
import Link from "next/link";

export function Receitas() {
    return(
        <Link href="/home/Receitas" className="no-underline">
         <div className=" flex items-center w-90 mb-4 rounded-2xl 
               h-30 mx-auto p-3  bg-zinc-200 hover:bg-zinc-300 ">

               <div className="w-35 h-25 rounded-2xl flex items-center bg-zinc-100">
                  <Hospital className="size-12 text-blue-500 mx-auto mt-2" />
               </div>

               <div className=" ml-3 p-4space-y-3">
                <h1 className="font-bold text-lg flex items-center justify-between text-zinc-900">Minhas receitas <ArrowRight className="text-zinc-500" /></h1>
                <p className="text-sm text-zinc-600">Acompanhe os medicamentos e gerencie lembretes</p>

               </div>
             </div>
            </Link>
    )
}