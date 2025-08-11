import { TrendingUp } from "lucide-react";

export function CardVist(){
    return(
        <div className="flex f items-center justify-center gap-2 bg-zinc-800 p-2 px-9 rounded-md border-2 border-zinc-700">
           
             <h2 className="text-lg font-semibold text-white">Total de visitas</h2>
              <h1 className="text-4xl font-bold flex items-center gap-4 text-lime-500">1.234 
                <TrendingUp className="text-lime-500 size-12 "/>
              
              </h1>
        </div>
    )
}