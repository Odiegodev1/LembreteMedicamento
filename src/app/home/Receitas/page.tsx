import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import ReceitasClient from "./ReceitasClient";

export default async function ReceitasPage() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return <p>Você precisa estar logado para ver os remédios</p>;
  }

  const remediosRaw = await prisma.medicamento.findMany({
    where: { userId },
    orderBy: { criadoEm: "desc" },
  });

  const remedios = remediosRaw.map(remedio => ({
    ...remedio,
    horarios: Array.isArray(remedio.horarios) ? remedio.horarios as string[] : [],
    diasSemana: Array.isArray(remedio.diasSemana)
      ? remedio.diasSemana as string[]
      : typeof remedio.diasSemana === "string"
        ? [remedio.diasSemana as string]
        : remedio.diasSemana === null || remedio.diasSemana === undefined
          ? null
          : [],
    dataInicio: remedio.dataInicio instanceof Date ? remedio.dataInicio.toISOString() : remedio.dataInicio,
    dataFim: remedio.dataFim instanceof Date ? remedio.dataFim.toISOString() : remedio.dataFim,
    criadoEm: remedio.criadoEm instanceof Date ? remedio.criadoEm.toISOString() : remedio.criadoEm,
  }));

  return <ReceitasClient remedios={remedios} />;
}
