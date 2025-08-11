import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { CirclePlus, Facebook, Github, Instagram, Linkedin, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

export function CardDev(){
    return(
        <Card className="max-w-96 max-h-full flex flex-col  bg-zinc-900 border-2 border-zinc-700 rounded-4xl p-6">

            <div className="flex items-center justify-center ">
              <Avatar className="w-50 h-50 ">
                <AvatarImage src="https://github.com/shadcn.png " />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            
           <CardHeader>
             <CardTitle className="text-white text-3xl font-bold">Diego Dev</CardTitle>
             <CardDescription className="font-semibold">Desenvolvedor Front-End</CardDescription>
           </CardHeader>
           <CardContent>
           <Separator className="my-4 bg-zinc-600 " />
           <Label className="text-white text-lg font-semibold mb-2">Links</Label>
           <div className="flex flex-row items-center space-x-1 cursor-pointer">
            <div className="size-11 shadow-xs shadow-zinc-900 flex items-center justify-center bg-zinc-700 rounded-md">
              <Linkedin className="text-white size-6  " />
            </div>

            <div className="size-11 shadow-xs shadow-zinc-900 flex items-center justify-center bg-zinc-700 rounded-md">
              <Instagram className="text-white size-6  " />
            </div>

            <div className="size-11 shadow-xs shadow-zinc-900 flex items-center justify-center bg-zinc-700 rounded-md">
              <Facebook className="text-white size-6  " />
            </div>

            <div className="size-11 shadow-xs shadow-zinc-900 flex items-center justify-center bg-zinc-700 rounded-md">
              <Github className="text-white size-6  " />
            </div>

            <div className="size-11 shadow-xs shadow-zinc-900 flex items-center justify-center bg-zinc-700 rounded-md">
              <CirclePlus className="text-white size-6  " />
            </div>
           </div>
           <Separator className="my-4 bg-zinc-600 " />
           <Button className=" mb-15 cursor-pointer bg-purple-700 hover:bg-purple-800 w-full border-none text-center py-6">Confira meu template SaaS</Button>
           </CardContent>
          </Card>

    )
}