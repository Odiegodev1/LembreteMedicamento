"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const medicamentoSchema = z.object({
  nome: z.string().min(1, "Informe o nome do medicamento"),
  horarios: z.array(z.string()).min(1, "Informe pelo menos um horário"),
  tipoRecorrencia: z.enum(["diario", "cada_x_dias", "semanal", "mensal"]),
  intervaloDias: z.number().min(1).optional(),
  diasSemana: z.array(z.string()).optional(),
  dataInicio: z.string().min(1, "Informe a data de início"),
  dataFim: z.string().optional(),
});

type MedicamentoInput = z.infer<typeof medicamentoSchema>;

export async function criarMedicamento(data: MedicamentoInput) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      data: null,
      error: "Usuário não autenticado",
    };
  }

  const parseResult = medicamentoSchema.safeParse(data);
  if (!parseResult.success) {
    return {
      data: null,
      error: parseResult.error.issues[0].message,
    };
  }

  try {
    const medicamento = await prisma.medicamento.create({
      data: {
        nome: data.nome,
        horarios: data.horarios,
        tipoRecorrencia: data.tipoRecorrencia,
        intervaloDias: data.intervaloDias,
        diasSemana: data.diasSemana,
        dataInicio: new Date(data.dataInicio),
        dataFim: data.dataFim ? new Date(data.dataFim) : null,
        userId: userId,
      },
    });

    return {
      data: medicamento,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: "Erro ao salvar medicamento",
    };
  }
}
