import Image from "next/image";
import project from "@/assets/Project Image.png";

export function CardLinks(){
    return(
        <div className="flex bg-zinc-900 p-3 rounded-md mt-2 cursor-pointer">
          <Image
            src={project}
            alt="Project Image"
            className=""
            quality={100}
          />
          <div className="flex flex-col items-start justify-center ml-4 max-w-xs">
            <h2 className="text-sm font-semibold text-amber-200 mb-4">2CLIQUES</h2>
            
            <h1 className="text-lg font-semibold text-white">CodeLink</h1>

            <p className="text-xs text-zinc-400">Intregação de GitHub e GitLab </p>
          </div>

        </div>
    )
}