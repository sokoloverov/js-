'use strict';

/**
 * В объекте элемента корзины собранны все данные по товару
 */
class CartElement extends GoodsItem {
    constructor(title, price, picture, quantity, availability, discount) {
        super(title, price, picture);
        this.quantity = quantity;
        this.availability = availability;
        this.discount = discount;
    }
    //расчет цены с учетом скидки
    currentPrice() {
        this.price *= 1 - this.discount;
    }
}
/**
 * В объект корзина загружается все товары корзины, расчитываетя общая цена, общее количество позиций, проверка наличия товара
 */
class Cart {
    constructor() {
        this.goodsCart = [];
    }
    summaryCost() {
        let cost = null;
        this.goodsCat.forEach(good => {
            cost += good.price * good.quantity;
        });
    }
    summaryQuantity() {
        let quantity = null;
        this.goodsCat.forEach(good => {
            quantity += good.quantity;
        });
    }
    checkAvailability() {
        this.goodsCat.forEach(good => {
            if (good.availability == 0) {
                console.log("Ай-яй-яй, " + good.title + " нет в наличии.");
            }
        });
    }
}