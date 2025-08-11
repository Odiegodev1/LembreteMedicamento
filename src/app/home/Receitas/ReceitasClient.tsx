"use client";

import { useState } from "react";
import { NewRemedio } from "./_components/cardRemedio";
import { deleteMedicamento } from "./_actions/deleteMedicamento";
import { Header } from "./_components/Header";

type Remedio = {
  id: string;
  nome: string;
  horarios: string[];
  tipoRecorrencia: string;
  intervaloDias?: number | null;
  diasSemana?: string[] | null;
  diaMes?: number | null;
  dataInicio: string;
  dataFim?: string | null;
  // add other properties as needed
};

interface ReceitasClientProps {
  remedios: Remedio[];
}

export default function ReceitasClient({ remedios }: ReceitasClientProps) {
  const [listaRemedios, setListaRemedios] = useState(remedios);

  async function handleDelete(id: string) {
    const res = await deleteMedicamento(id);
    if (res.error) {
      alert("Erro ao deletar: " + res.error);
      return;
    }
    setListaRemedios((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <section className="min-h-screen w-full flex flex-col bg-zinc-200">
        <Header />
         <main className="flex-1 pt-10 bg-white w-full h-full rounded-t-4xl">
       {!listaRemedios || listaRemedios.length === 0 ? (
         <div className="flex-1 flex  justify-center">Nenhum remedio cadastrado</div>
       ):(
        <>
         {listaRemedios.map((remedio) => (
    <NewRemedio key={remedio.id} user={remedio} onDelete={handleDelete} />
  ))}
        </>
       )
       }
         </main>
      </section>
  );
}
