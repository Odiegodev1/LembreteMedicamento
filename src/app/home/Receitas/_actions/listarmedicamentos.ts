// /app/actions/medicamentos.ts (ou onde preferir)

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function listarMedicamentos() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return { data: null, error: "Usuário não autenticado" };
  }

  try {
    const medicamentos = await prisma.medicamento.findMany({
      where: { userId },
      orderBy: { criadoEm: "desc" },
    });

    return { data: medicamentos, error: null };
  } catch (error) {
    return { data: null, error: "Erro ao buscar medicamentos" };
  }
}
