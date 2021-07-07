'use script';

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

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {

    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`)
                .then((item) => {
                    this.goods = JSON.parse(item);
                    resolve(this.goods);
                    console.log(this.goods);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods()
    .then(() => {
        list.render();
    })
    .catch((error) => {
        debugger;
    });