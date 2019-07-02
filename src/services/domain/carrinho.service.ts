import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Carrinho } from "../../models/carrinho";
import { ProdutoDTO } from "../../models/produto.dto";
import { ClienteService } from "./cliente.service";
import { ItemPedidos } from "../../models/item.pedido.dto";
import { ClienteDTO } from "../../models/cliente.dto";

@Injectable()
export class CarrinhoService {
    constructor(public store: StorageService,
        public clienteService: ClienteService){
    }

    criarCarrinhoApagar(): Carrinho{
        let cart: Carrinho = { 
            cliente: null,
            endereco: null,
            itemPedidos: []
        }
        this.store.setLocalCart(cart)
        return cart
    }

    getCart(): Carrinho{
        let cart = this.store.getLocalCart()
        if(!cart){
            cart = this.criarCarrinhoApagar()
        }
        return cart
    }

    addProduto(produto: ProdutoDTO){
        let cart = this.getCart()
        if(!cart.cliente){
            this.clienteService.findByUser(this.store.getLocalUser().user).subscribe(
                res => {
                    cart.cliente = res as ClienteDTO
                },
                error => {
                    console.log("ERRO> "+error)
                }
            );
        }
        this.store.setLocalCart(cart)
        for(var i=0; i<cart.itemPedidos.length;i++){
            console.log("passou no for do for")
            if(cart.itemPedidos[i].produtoId === produto.id){
                console.log("passou no if do for")
                cart.itemPedidos[i].quantidade++
            }
            else{
                console.log("passou no else do for")
                let itemPedido: ItemPedidos = {
                    produtoId: produto.id,
                    nome: produto.nome,
                    quantidade: 1,
                    preco: produto.preco
                }
                cart.itemPedidos.push(itemPedido)
            }
        }
    }

    total(){
        let cart = this.getCart()
        let sum = 0
        for(var i=0; i<cart.itemPedidos.length; i++){
            sum += cart.itemPedidos[i].preco * cart.itemPedidos[i].quantidade
        }
        return sum
    }

}