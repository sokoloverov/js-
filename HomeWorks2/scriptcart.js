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
    constructor(cartElement) {
        this.cartElement = {};
        this.goodsCart = [];
    }
    // метод добавления товара в корзину
    addGoodToCart() {
        this.goodsCart.push = this.cartElement;
    }
    // метод удаления товара из корзины
    deleteGoodFromCart() {
        this.goodsCart = this.goodsCart.filter(emptyVariable => {
            return emptyVariable !== this.cartElement;
        });
    }
    // метод получения списка товаров в корзине
    getListGoodsItems() {
        let listGoodsItems = [];
        for (let emptyVariable in this.goodsCart) {
            listGoodsItems.push = this.goodsCart[emptyVariable];
            return listGoodsItems;
        }
    }
    // метод расчета суммарной стоимости товаров в корзине
    summaryCost() {
        let cost = null;
        this.goodsCat.forEach(good => {
            cost += good.price * good.quantity;
        });
    }
    // метод расчета общего количества товаров в корзине
    summaryQuantity() {
        let quantity = null;
        this.goodsCat.forEach(good => {
            quantity += good.quantity;
        });
    }
    // метод проверки наличия всех товаров для продажи
    checkAvailability() {
        this.goodsCat.forEach(good => {
            if (good.availability == 0) {
                console.log("Внимание, " + good.title + " нет в наличии.");
            }
        });
    }
}