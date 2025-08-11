"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function deleteMedicamento(id: string) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return { error: "Usuário não autenticado" };
  }

  try {
    await prisma.medicamento.deleteMany({
      where: {
        id,
        userId,
      },
    });
    return { error: null };
  } catch (error) {
    return { error: "Erro ao deletar medicamento" };
  }
}
