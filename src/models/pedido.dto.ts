import { ClienteDTO } from "./cliente.dto";
import { EnderecoDTO } from "./endereco.dto";
import { ItemPedidos } from "./item.pedido.dto";
import { RastreioDTO } from "./entregas.dto";

export interface PedidoDTO {
    id: string
    dataDaCompra: string
    cliente: ClienteDTO
    endereco: EnderecoDTO
    itemPedidos: ItemPedidos[]
    rastreios: RastreioDTO[]
    entregue: boolean
}