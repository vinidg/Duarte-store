export interface ClienteDTO{
    id: string
    nome: string
    cpf: string
    rg: string
    dataNascimento: string
    email: string
    imageUrl?: string
    perfis?: string[]
}