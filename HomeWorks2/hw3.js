//исходная версия с доработкой проверки на статусы
// function makeGETRequest(url, callback) {
//     var xhr;
//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 225) {
//             callback(xhr.responseText);
//         }
//     }
//     xhr.open('GET', url, true);
//     xhr.send();
// }

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
    fetchGoods(cb) {
        fetch(`${API_URL}/catalogData.json`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.goods = data;
                console.log('Fetch:', this.goods);
                cb();
            });
    }
    render() {
        let listHtml = '';
        console.log("render = ", this.goods);
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods(() => list.render());