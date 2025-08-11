"use client";
import Image from "next/image";
import Foto from "@/assets/foto.png";
import { X } from "lucide-react";
interface HeaderProps {
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}
export function Header({user}: HeaderProps  ) {
    return(
         <header className="h-46 p-4 py-10 px-8 bg-zinc-200 w-full">
            <div className="flex items-center justify-between">
            <Image
              src={user.image || Foto}
              width={60}
              height={60}
              alt="Picture of the author"
              className="size-15 border-2 border-blue-600 rounded-full"
              />
              <X className="size-7 text-red-500 "/>

            </div>

            <div className="mt-4 flex flex-col items-start space-y-1">
                <p className="text-sm text-zinc-600">Boas Vindas</p>
                <h1 className="text-xl font-bold text-zinc-900">{user.name}</h1>
            </div>
          </header>
    )
}