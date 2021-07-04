'use strict';

// /**
//  * В объекте элемента корзины собранны все данные по товару
//  */
// class CartElement extends GoodsItem {
//     constructor(title, price, picture, quantity, availability, discount) {
//         super(title, price, picture);
//         this.quantity = quantity;
//         this.availability = availability;
//         this.discount = discount;
//     }
//     //расчет цены с учетом скидки
//     currentPrice() {
//         this.price *= 1 - this.discount;
//     }
// }
// /**
//  * В объект корзина загружается все товары корзины, расчитываетя общая цена, общее количество позиций, проверка наличия товара
//  */
// class Cart {
//     constructor(cartElement) {
//         this.cartElement = {};
//         this.goodsCart = [];
//     }
//     // метод добавления товара в корзину
//     addGoodToCart() {
//         this.goodsCart.push = this.cartElement;
//     }
//     // метод удаления товара из корзины
//     deleteGoodFromCart() {
//         this.goodsCart = this.goodsCart.filter(emptyVariable => {
//             return emptyVariable !== this.cartElement;
//         });
//     }
//     // метод получения списка товаров в корзине
//     getListGoodsItems() {
//         let listGoodsItems = [];
//         for (let emptyVariable in this.goodsCart) {
//             listGoodsItems.push = this.goodsCart[emptyVariable];
//             return listGoodsItems;
//         }
//     }
//     // метод расчета суммарной стоимости товаров в корзине
//     summaryCost() {
//         let cost = null;
//         this.goodsCat.forEach(good => {
//             cost += good.price * good.quantity;
//         });
//     }
//     // метод расчета общего количества товаров в корзине
//     summaryQuantity() {
//         let quantity = null;
//         this.goodsCat.forEach(good => {
//             quantity += good.quantity;
//         });
//     }
//     // метод проверки наличия всех товаров для продажи
//     checkAvailability() {
//         this.goodsCat.forEach(good => {
//             if (good.availability == 0) {
//                 console.log("Внимание, " + good.title + " нет в наличии.");
//             }
//         });
//     }
// }

//Обработчик поля имени
let nameUserSubmit = [];
let nameUser = document.querySelector('#nameUser')
nameUser.addEventListener("keyup", function (event) {
    nameUserSubmit.push(event.key);
    //console.log(nameUserSubmit);
});

//Обработчик поля телефона
let phoneUserSubmit = [];
let phoneUser = document.querySelector('#phoneUser')
phoneUser.addEventListener("keyup", function (event) {
    if (event.key !== "Shift") phoneUserSubmit.push(event.key);
    console.log(phoneUserSubmit);
});

//Обработчик поля почты
let mailUserSubmit = [];
let mailUser = document.querySelector('#mailUser')
mailUser.addEventListener("keyup", function (event) {
    if (event.key !== "Shift") mailUserSubmit.push(event.key);
    console.log(mailUserSubmit);
});


//Проверка заполненных полей формы
//Обработчик кнопки отправки формы
let formName = document.querySelector('#submit')

formName.addEventListener('click', function (event) {
    event.preventDefault();
    formName.classList.add('submitButton');

    //Проверка с регулярными выражениями    
    let checkName = nameUserSubmit.join('');
    let checkNameUserSubmit = /[а-яА-Я]/ugy;

    let checkPhone = phoneUserSubmit.join('');
    let checkPhoneUserSubmit = /\+7\(\d{3}\)\d{3}-\d{4}/;

    let checkMail = mailUserSubmit.join('');
    let checkMailUserSubmit = /\w+[\.\-]?\w+@\w+\.ru/;

    //Проверка каждого поля 
    if (!checkNameUserSubmit.test(checkName)) {
        addColor(nameUser);
    } else {
        removeColor(nameUser);
    }

    if (!checkPhoneUserSubmit.test(checkPhone)) {
        addColor(phoneUser);
    } else {
        removeColor(phoneUser);
    }

    if (!checkMailUserSubmit.test(checkMail)) {
        addColor(mailUser);
    } else {
        removeColor(mailUser);
    }

    //Обнуление массивов и очистка полей ввода
    nameUserSubmit = [];
    nameUser.value = '';
    phoneUserSubmit = [];
    phoneUser.value = '';
    mailUserSubmit = [];
    mailUser.value = '';
});

/**
 * Функция добавления цвета поля неправильно заполненной формы
 */
function addColor(tagForm) {
    tagForm.classList.add('submitButton');
}

/**
 * Функция очистки цвета поля неправильно заполненной формы
 */
function removeColor(tagForm) {
    tagForm.classList.remove('submitButton');
}
