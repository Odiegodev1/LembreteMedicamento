"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { criarMedicamento } from "../actions/criarMedicamento";
import { useTransition, useEffect } from "react";
import { toast } from "sonner";

const diasSemana = [
  { label: "Seg", value: "segunda" },
  { label: "Ter", value: "terca" },
  { label: "Qua", value: "quarta" },
  { label: "Qui", value: "quinta" },
  { label: "Sex", value: "sexta" },
  { label: "Sáb", value: "sabado" },
  { label: "Dom", value: "domingo" },
];

const medicamentoSchema = z.object({
  nome: z.string().min(1, "Informe o nome do medicamento"),
  horarios: z.array(z.string()).min(1, "Informe pelo menos um horário"),
  tipoRecorrencia: z.enum(["diario", "cada_x_dias", "semanal", "mensal"]),
  intervaloDias: z.number().min(1).optional(),
  diasSemana: z.array(z.string()).optional(),
  diaMes: z.number().min(1).max(31).optional(),
  dataInicio: z.string().min(1, "Informe a data de início"),
  dataFim: z.string().optional(),
});

type MedicamentoFormData = z.infer<typeof medicamentoSchema>;

export default function FormMedicamento() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<MedicamentoFormData>({
    resolver: zodResolver(medicamentoSchema),
    defaultValues: {
      nome: "",
      horarios: [""],
      tipoRecorrencia: "diario",
      intervaloDias: undefined,
      diasSemana: [],
      diaMes: undefined,
      dataInicio: "",
      dataFim: "",
    },
  });

  const tipo = form.watch("tipoRecorrencia");

  // Limpa campos não usados quando o tipo muda
  useEffect(() => {
    if (tipo !== "cada_x_dias") form.setValue("intervaloDias", undefined);
    if (tipo !== "semanal") form.setValue("diasSemana", []);
    if (tipo !== "mensal") form.setValue("diaMes", undefined);
  }, [tipo, form]);

  function onSubmit(data: MedicamentoFormData) {
    startTransition(async () => {
      const payload = {
        ...data,
        horarios: data.horarios.filter(Boolean),
      };

      const response = await criarMedicamento(payload);

      if (response.error) {
        toast.error("Erro: " + response.error);
      } else {
        toast.success("Medicamento salvo com sucesso!");
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg flex items-start p-2 flex-col px-6 py-3">

        {/* Nome */}
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem  className="min-w-75">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do medicamento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Horário */}
        <FormField
          control={form.control}
          name="horarios.0"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tipo de recorrência */}
        <FormField
          control={form.control}
          name="tipoRecorrencia"
          render={({ field }) => (
            <FormItem  className="min-w-75">
              <FormLabel>Tipo de recorrência</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger  className="min-w-75">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">Diário</SelectItem>
                  <SelectItem value="cada_x_dias">A cada X dias</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Intervalo em dias - só mostra se tipo === "cada_x_dias" */}
        {tipo === "cada_x_dias" && (
          <FormField
            control={form.control}
            name="intervaloDias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intervalo em dias</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Dias da semana - só se tipo === "semanal" */}
        {tipo === "semanal" && (
          <FormField
            control={form.control}
            name="diasSemana"
            render={() => (
              <FormItem>
                <FormLabel>Dias da semana</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {diasSemana.map((dia) => (
                    <label key={dia.value} className="flex items-center gap-2 border rounded px-2 py-1 cursor-pointer">
                      <Checkbox
                        checked={form.watch("diasSemana")?.includes(dia.value)}
                        onCheckedChange={(checked) => {
                          const prev = form.getValues("diasSemana") || [];
                          if (checked) {
                            form.setValue("diasSemana", [...prev, dia.value], { shouldValidate: true, shouldDirty: true });
                          } else {
                            form.setValue(
                              "diasSemana",
                              prev.filter((d) => d !== dia.value),
                              { shouldValidate: true, shouldDirty: true }
                            );
                          }
                        }}
                      />
                      {dia.label}
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Dia do mês - só se tipo === "mensal" */}
        {tipo === "mensal" && (
          <FormField
            control={form.control}
            name="diaMes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia do mês</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={31}
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Data de início */}
        <FormField
          control={form.control}
          name="dataInicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de início</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full bg-red-500 hover:bg-red-600 cursor-pointer">
          {isPending ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Form>
  );
}
