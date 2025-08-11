import { Infinity, Timer, Trash2 } from "lucide-react";

interface NewRemedioProps {

  user: {
    id: string;
    nome: string;
    horarios: string[];
    tipoRecorrencia: string;
    intervaloDias?: number | null;
    diasSemana?: string[] | null;
    diaMes?: number | null;
    dataInicio: string;
    dataFim?: string | null;
  };
  onDelete: (id: string) => void;
}


export function NewRemedio({ user, onDelete }: NewRemedioProps) {
  // montar a string de recorrência para exibir
  
  let recorrenciaTexto = "";
  switch (user.tipoRecorrencia) {
    case "diario":
      recorrenciaTexto = "Diariamente";
      break;
    case "cada_x_dias":
      recorrenciaTexto = `A cada ${user.intervaloDias} dias`;
      break;
    case "semanal":
      recorrenciaTexto = `Semanalmente (${user.diasSemana?.join(", ")})`;
      break;
    case "mensal":
      recorrenciaTexto = `No dia ${user.diaMes}`;
      break;
  }

  return (
    <div className="flex flex-col w-90 mb-4 rounded-2xl h-24 mx-auto p-3 bg-zinc-200">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-lg text-zinc-800">{user.nome}</h1>
        <Trash2 className="text-red-500 cursor-pointer size-5" onClick={() => onDelete(user.id)}/>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex items-center gap-2 bg-zinc-300 rounded-4xl p-1 px-3">
          <Timer className="text-zinc-500 size-4" />
          <h1 className="text-zinc-700">{user.horarios[0]}</h1>
        </div>

        <div className="flex items-center gap-2 bg-zinc-300 rounded-4xl p-1 px-3">
          <Infinity className="text-zinc-500 size-4" />
          <h1 className="text-zinc-700 text-xs font-semibold">{recorrenciaTexto}</h1>
        </div>
      </div>
    </div>
  );
}
