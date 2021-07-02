'use strict';

/**
 * Формирует одну карточку товара для витрины 
 * @param {название товара} title 
 * @param {цена} price 
 * @param {изображение} picture
 * @returns возвращает HTML разметку карточки
 */
class GoodsItem {
    constructor(title, price, picture) {
        this.title = title;
        this.price = price;
        this.picture = picture;
    }
    render() {
        return `<div class="goods_box">
                    <figure>
                        <img class="goods_box__img" src="img/${this.picture}" alt="Товар">
                        <figcaption class="goods_box_upper_font">${this.title}</figcaption>
                        <figcaption class="goods_box_lower_font">${this.price}</figcaption>
                    </figure>
                    <div class="goods_cart">
                        <a href="#" class="goods_cart_a">
                            <img src="img/luzifers_korb.png" alt="Корзина" class="goods_cart_right">
                            <p class="goods_cart_text">В список желаний</p>
                        </a>   
                    </div>
                </div>`;
    }
}

//массив данных
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Счастье', price: 150, picture: 'happiness.jpg' },
            { title: 'Любовь', price: 450, picture: 'love.jpg' },
            { title: 'Мудрость', price: 550, picture: 'iq.jpeg' },
            { title: 'Вера', price: 350, picture: 'belivable.jpg' },
            { title: 'Надежда', price: 50, picture: 'hope.png' },
            { title: 'Знание js', price: 950, picture: 'js.jpg' },
            { title: 'Дружба', price: 250, picture: 'frendship.jpg' },
            { title: undefined }, //проверка работы параметров функции по умолчанию + недостаток параметров    
        ];
    }
    /**
 * Формирует витрину товаров из карточек товаров через HTML разметку всех карточек на витрине, объединяет массив для ликвидации ','
 * @param {элемент массива} good 
 */
    renderShowcase() {
        let listHtml = '';
        this.goods.forEach(good => {
            //параметры по умолчанию
            if (!good.title) {
                good.title = 'Ожидаем...';
                good.price = 0;
                good.picture = 'waiting.png';
            }
            const goodItem = new GoodsItem(good.title, good.price, good.picture);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    //расчет суммы всех товаров НЕ ПРАВИЛЬНЫЙ, т.к. не учитывается количество каждого, еси бы ихклали в корзину
    calculatePrice() {
        let price = null;
        this.goods.forEach(good => {
            price += good.price;
        });
        return price;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.renderShowcase();
console.log(list.calculatePrice());

