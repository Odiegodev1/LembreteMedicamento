
export function Createslugify(userName: string): string {
  return userName
    // 1. Normaliza e remove acentos
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    // 2. Remove caracteres especiais, deixa letras, números e espaços
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    // 3. Substitui espaços e hífens múltiplos por um hífen
    .replace(/[\s-]+/g, "-")
    // 4. Remove hífen no início e fim da string
    .replace(/^-+|-+$/g, "")
    // 5. Converte para minúsculas
    .toLowerCase();
}
