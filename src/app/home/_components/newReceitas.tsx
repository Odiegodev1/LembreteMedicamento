import { ArrowRight, Hospital, PillBottle } from "lucide-react";
import Link from "next/link";

export function NewReceitas() {
    return(
 <Link href="/home/form" className="no-underline">
         <div className=" flex items-center w-90 mb-4 rounded-2xl 
               h-30 mx-auto p-3  bg-zinc-200 hover:bg-zinc-300 ">

               <div className="w-25 h-25 rounded-2xl flex items-center bg-zinc-100">
                  <PillBottle className="size-12 text-red-500 mx-auto mt-2" />
               </div>

               <div className=" ml-3 p-4space-y-3">
                <h1 className="font-bold text-lg flex items-center justify-between text-zinc-900">Nova receita <ArrowRight className="text-zinc-500" /></h1>
                <p className="text-sm text-zinc-600">Cadastre novos lembretes de receitas</p>

               </div>
             </div>
    </Link>
       
    )
}