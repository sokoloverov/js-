'use strict';

const CART = new Vue({
    el: '#cart',
    data: {
        goodsCart: [],
        nameUserSubmit: '',
        regExpName: /[а-яА-Я]/ugy,
        phoneUserSubmit: '',
        regExpPhone: /\+7\(\d{3}\)\d{3}-\d{4}/,
        mailUserSubmit: '',
        regExpMail: /\w+[\.\-]?\w+@\w+\.ru/,
        colorSubmitError: '',
        userData: [
            { name: '' },
            { phone: '' },
            { mail: '' }
        ],
        priceCartSummary: 0,
        quantityItems: 0,
        quantityGoods: 0,
        show: true
    },
    mounted() {

    },
    methods: {
        userName() {
            event.preventDefault();
            this.nameUserSubmit = event.target.value
            console.log(event.code);
            if (event.code === 'Enter') this.checkOut(this.nameUserSubmit, this.regExpName);
        },
        userPhone() {
            event.preventDefault();
            this.phoneUserSubmit = event.target.value
            console.log(event.code);
            if (event.code === 'Enter') this.checkOut(this.phoneUserSubmit, this.regExpPhone);
        },
        userMail() {
            event.preventDefault();
            this.mailUserSubmit = event.target.value
            console.log(event.code);
            if (event.code === 'Enter') this.checkOut(this.mailUserSubmit, this.regExpMail);
        },

        checkOut(text, reg) {
            //console.log("Тест:", text, reg, reg.test(text));
            if (!reg.test(text)) {
                this.colorSubmitError = "submitButton"
                event.target.value = ''
            }
            else this.colorSubmitError = ''
            return reg.test(text)
        },

        userSubmit() {
            event.preventDefault();
            this.show = false
            this.userData.name = this.nameUserSubmit
            this.userData.phone = this.phoneUserSubmit
            this.userData.mail = this.mailUserSubmit
            console.log(this.userData)
        }
    },






    computed: {
        // calculatePrice() {
        //     let price = null;
        //     this.goods.forEach(good => {
        //         price += good.price;
        //     });
        //     return price;
        // }
    }
})




// //Обработчик поля имени
// let = [];
// let nameUser = document.querySelector('#nameUser')
// nameUser.addEventListener("keyup", function (event) {
//     nameUserSubmit.push(event.key);
//     //console.log(nameUserSubmit);
// });

// //Обработчик поля телефона
// let phoneUserSubmit = [];
// let phoneUser = document.querySelector('#phoneUser')
// phoneUser.addEventListener("keyup", function (event) {
//     if (event.key !== "Shift") phoneUserSubmit.push(event.key);
//     console.log(phoneUserSubmit);
// });

// //Обработчик поля почты
// let mailUserSubmit = [];
// let mailUser = document.querySelector('#mailUser')
// mailUser.addEventListener("keyup", function (event) {
//     if (event.key !== "Shift") mailUserSubmit.push(event.key);
//     console.log(mailUserSubmit);
// });


// //Проверка заполненных полей формы
// //Обработчик кнопки отправки формы
// let formName = document.querySelector('#submit')

// formName.addEventListener('click', function (event) {
//     event.preventDefault();
//     formName.classList.add('submitButton');

//     //Проверка с регулярными выражениями    
//     let checkName = nameUserSubmit.join('');
//     let checkNameUserSubmit = /[а-яА-Я]/ugy;

//     let checkPhone = phoneUserSubmit.join('');
//     let checkPhoneUserSubmit = /\+7\(\d{3}\)\d{3}-\d{4}/;

//     let checkMail = mailUserSubmit.join('');
//     let checkMailUserSubmit = /\w+[\.\-]?\w+@\w+\.ru/;

//     //Проверка каждого поля 
//     if (!checkNameUserSubmit.test(checkName)) {
//         addColor(nameUser);
//     } else {
//         removeColor(nameUser);
//     }

//     if (!checkPhoneUserSubmit.test(checkPhone)) {
//         addColor(phoneUser);
//     } else {
//         removeColor(phoneUser);
//     }

//     if (!checkMailUserSubmit.test(checkMail)) {
//         addColor(mailUser);
//     } else {
//         removeColor(mailUser);
//     }

//     //Обнуление массивов и очистка полей ввода
//     nameUserSubmit = [];
//     nameUser.value = '';
//     phoneUserSubmit = [];
//     phoneUser.value = '';
//     mailUserSubmit = [];
//     mailUser.value = '';
// });

// /**
//  * Функция добавления цвета поля неправильно заполненной формы
//  */
// function addColor(tagForm) {
//     tagForm.classList.add('submitButton');
// }

// /**
//  * Функция очистки цвета поля неправильно заполненной формы
//  */
// function removeColor(tagForm) {
//     tagForm.classList.remove('submitButton');
// }
