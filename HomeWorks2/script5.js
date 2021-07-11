'use strict';

const API_URL = 'https://raw.githubusercontent.com/sokoloverov/js-/online-store-api';

const APP = new Vue({
    el: '#app',
    data: {
        goods: [],
        localDataGoods: [],
        layInCart: [],
        searchPhrase: '',
        price: 0,
        quantityGoods: 0,
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
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (item) => {
            this.goods = JSON.parse(item);
            this.localDataGoods = JSON.parse(item);
        });
    },
    methods: {
        makeGETRequest(url, callback) {
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status >= 200 && this.status <= 225) {
                    callback(xhr.responseText);
                }
            };
            xhr.open('GET', url, true);
            xhr.send();
        },
        searchPhraseHandler() {
            this.searchPhrase = event.target.value
            console.log(event.code);
            if (event.code === 'Enter') this.renderSearchPhrase(this.searchPhrase);
        },
        renderSearchPhrase() {
            let regexp = new RegExp(this.searchPhrase, 'i');
            this.localDataGoods = this.goods.filter(good => regexp.test(good.title));
            console.log(this.localDataGoods)
        },
        addToCart(item) {
            console.log("в корзину", item)
            if (this.layInCart.includes(item)) {
                console.log("товар уже в корзине")
            }
            else {
                this.layInCart.push(item)
                quantityGoods = this.layInCart.length
            }
            //console.log(this.layInCart)
            localStorage.setItem("myKey", JSON.stringify(this.layInCart));
        },
        removeFromCart(item) {
            console.log("из корзины", item)
            if (!this.layInCart.includes(item)) {
                console.log("товара нет в корзине")
            }
            else {
                this.layInCart.slice(item)
                quantityGoods = this.layInCart.length
            }
            //console.log(this.layInCart)
        },
        // localStorage() {
        //     this.layInCart = JSON.parse(localStorage.getItem("myKey"))
        // },
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
        calculatePrice() {
            let price = null;
            this.goods.forEach(good => {
                price += good.price;
            });
            return price;
        }
    }
})


