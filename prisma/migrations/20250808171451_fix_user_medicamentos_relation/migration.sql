-- CreateTable
CREATE TABLE "public"."Medicamento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "horarios" JSONB NOT NULL,
    "tipoRecorrencia" TEXT NOT NULL,
    "intervaloDias" INTEGER,
    "diasSemana" JSONB,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Medicamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Medicamento" ADD CONSTRAINT "Medicamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
