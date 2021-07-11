'use strict';

/**
 * Связь с репозиторием и извлечение данных массива
 * @param {адрес репозитория} url 
 * @returns текстовый массив из репозитория в формате JSON
 */
function makeGETRequest(url) {
    return new Promise((resolve, reject) => {

        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status >= 200 && this.status <= 225) {
                resolve(this.responseText);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };

        xhr.open('GET', url, true);
        xhr.send();
    });
}

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

const API_URL = 'https://raw.githubusercontent.com/sokoloverov/js-/online-store-api';

//массив данных
class GoodsList {

    constructor() {
        this.goods = [];
        this.localDataGoods = [];
    }

    // fetchGoods() {
    //     this.goods = [
    //         { title: 'Счастье', price: 150, picture: 'happiness.jpg' },
    //         { title: 'Любовь', price: 450, picture: 'love.jpg' },
    //         { title: 'Мудрость', price: 550, picture: 'iq.jpeg' },
    //         { title: 'Вера', price: 350, picture: 'belivable.jpg' },
    //         { title: 'Надежда', price: 50, picture: 'hope.png' },
    //         { title: 'Знание js', price: 950, picture: 'js.jpg' },
    //         { title: 'Дружба', price: 250, picture: 'frendship.jpg' },
    //         { title: undefined }, //проверка работы параметров функции по умолчанию + недостаток параметров    
    //     ];
    // }

    /**
     * Функция запрашивает данные с сервера 
     * @returns и возвращает готовый массив для дальнейшей работы с методами
     */
    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`)
                .then((item) => {
                    this.goods = JSON.parse(item);
                    this.localDataGoods = JSON.parse(item);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /** Формирует витрину товаров из карточек товаров через HTML разметку всех карточек на витрине, объединяет массив для ликвидации ','
     * @param {элемент массива} good 
     */
    renderShowcase() {
        let listHtml = '';
        this.localDataGoods.forEach((good) => {
            //параметры по умолчанию
            if (good.title === 'nodata') {
                good.title = 'Ожидаем...';
                good.price = 0;
                good.picture = 'waiting.png';
            }
            const goodItem = new GoodsItem(good.title, good.price, good.picture);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    renderSearchPhrase(phrase, button) {
        button.value = '';
        let regexp = new RegExp(phrase, 'i');
        this.localDataGoods = this.goods.filter(good => regexp.test(good.title));
        this.renderShowcase();
    }


    // renderShowcase() {
    //     let listHtml = '';
    //     this.goods.forEach(good => {
    //         //параметры по умолчанию
    //         if (!good.title) {
    //             good.title = 'Ожидаем...';
    //             good.price = 0;
    //             good.picture = 'waiting.png';
    //         }
    //         const goodItem = new GoodsItem(good.title, good.price, good.picture);
    //         listHtml += goodItem.render();
    //     });
    //     document.querySelector('.goods-list').innerHTML = listHtml;
    // }

    //расчет суммы всех товаров НЕ ПРАВИЛЬНЫЙ, т.к. не учитывается количество каждого, еси бы их клали в корзину

    calculatePrice() {
        let price = null;
        this.goods.forEach(good => {
            price += good.price;
        });
        return price;
    }
}

let list = new GoodsList();


list.fetchGoods()
    .then(() => {
        list.renderShowcase();
    })
    .catch((error) => {
        console.log(error);
    });

list.fetchGoods()
    .then(() => {
        console.log(list.calculatePrice());
    });

let searchPhrase = '';
let find = document.querySelector('.goods-search')
find.addEventListener("keyup", function (event) {
    if (event.code === 'Enter') list.renderSearchPhrase(searchPhrase, find);
    searchPhrase = event.target.value;
});

let searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', () => {
    list.renderSearchPhrase(searchPhrase, find);

});



