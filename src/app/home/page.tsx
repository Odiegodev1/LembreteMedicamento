
import { auth } from "@/lib/auth";
import { Header } from "./_components/Header";
import { Receitas } from "./_components/Receitas";
import { NewReceitas } from "./_components/newReceitas";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
export default  async function HomePage() {
    const session = await auth();
    if(!session) {
        redirect("/")
    }
    const userData = {
        id: session.user.id,
        name: session.user.name || "",
        image: session.user?.image || "" ,
    }


    return(
         <section className="min-h-screen w-full flex flex-col  bg-zinc-200">
          <Header user={userData} />
          <main className="flex-1 pt-10  bg-white w-full  h-full rounded-t-4xl">
          
             <Receitas />
                <NewReceitas />
            
           
             
          </main>
         </section>
    )
}