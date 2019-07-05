import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Carrinho } from "../../models/carrinho";
import { ProdutoDTO } from "../../models/produto.dto";
import { ClienteService } from "./cliente.service";
import { ItemPedidos } from "../../models/item.pedido.dto";

@Injectable()
export class CarrinhoService {
    constructor(public store: StorageService,
        public clienteService: ClienteService
        ){
    }

    criarCarrinhoApagar(): Carrinho {
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

    addProduto(produto: ProdutoDTO): Carrinho {
        let cart = this.getCart()
        let index = cart.itemPedidos.findIndex(x=> x.produtoId == produto.id)
        if(index > -1){
            cart.itemPedidos[index].quantidade++
        }else{
            let itemPedido: ItemPedidos = {
                produtoId: produto.id,
                nome: produto.nome,
                quantidade: 1,
                preco: produto.preco,
                imgUrl: produto.imageUrl
            }
            cart.itemPedidos.push(itemPedido)
        }
        this.store.setLocalCart(cart)
        return cart
    }

    decreaseQuantity(produtoId: string): Carrinho {
        let cart = this.getCart()
        let index = cart.itemPedidos.findIndex(x => x.produtoId == produtoId)
        if(index > -1){
            cart.itemPedidos[index].quantidade--
            if(cart.itemPedidos[index].quantidade < 1){
                cart = this.removeItem(produtoId)
            }
            this.store.setLocalCart(cart)
        }
        return cart
    }

    increaseQuantity(produtoId: string): Carrinho {
        let cart = this.getCart()
        let index = cart.itemPedidos.findIndex(x => x.produtoId == produtoId)
        if(index > -1){
            cart.itemPedidos[index].quantidade++
            this.store.setLocalCart(cart)
        }
        return cart
    }

    removeItem(produtoId: string): Carrinho {
        let cart = this.getCart()
        let index = cart.itemPedidos.findIndex(x => x.produtoId == produtoId)
        if(index != -1){
            cart.itemPedidos.splice(index, 1)
        }
        this.store.setLocalCart(cart)
        return cart
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