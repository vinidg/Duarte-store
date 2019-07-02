import { ClienteDTO } from "./cliente.dto";
import { EnderecoDTO } from "./endereco.dto";
import { ItemPedidos } from "./item.pedido.dto";

export interface Carrinho {
    cliente: ClienteDTO
    endereco: EnderecoDTO
    itemPedidos: ItemPedidos[]
}