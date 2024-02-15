const cart = document.querySelector(".second");
const list = document.querySelector("#list");
const list_page = document.querySelector(".list-page");
const drop = document.querySelector("#drop");
const dropdown_menu = document.querySelector("#dropdown-menu");
const drop_2 = document.querySelector("#drop2");
const dropdown_menu_2 = document.querySelector("#dropdown-menu2");
const nav = document.querySelector(".navbar_2");
let favorite = document.querySelector("#fav");
let search = document.querySelector("#search");
let sort = document.querySelector("#sort");
let basketArr = []
let firstArr = [];
let secondArr = [];

let userId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null;



let basketDot = document.querySelector('#basketDot');

// Kullanıcı verilerini al
let currentUser = JSON.parse(localStorage.getItem('currentUser')) ;

// async function toBasket(id) {
//     // if (!count) {
//     //     await axios.patch("http://localhost:3000/menu/" + id, { inBasket: 1 });
//     // } else {
//     //     await axios.patch("http://localhost:3000/menu/" + id, { inBasket: count + 1 });
//     // }
//     // window.location.reload();


// }

async function toBasket(item) {
    if (!userId) {
      alert("Please log in for add to basket");
      return;
    }
    let res = await axios.get("http://localhost:3000/users/" + userId);
    basketArr = res.data.basket;
    let index = basketArr.findIndex((basket) => basket.id == item.id);
    // console.log(index);
    if (index < 0) {
      basketArr.push({ ...item, count: 1 });
      await axios.patch("http://localhost:3000/users/" + userId, {
        basket: basketArr,
      });
      basketDot.style.display= 'inline'
  
    } else {
      alert("Item added before");
    }
  }

favorite.addEventListener("click", () => {
    window.location = `favorit.html`;
});

list.addEventListener("click", () => {
    if (list_page.style.display != "block") {
        list_page.style.display = "block";
    } else {
        list_page.style.display = "none";
    }
});

drop.addEventListener("mouseenter", () => {
    if (
        dropdown_menu.style.display != "block") {
        dropdown_menu.style.display = "block";
    } else {
        dropdown_menu.style.display = "none";
    }
});

drop_2.addEventListener("mouseenter", () => {
    if (dropdown_menu_2.style.display != "block") {
        dropdown_menu_2.style.display = "block";
    } else {
        dropdown_menu_2.style.display = "none";
    }
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        nav.style.zIndex = 3;
        nav.style.position = "fixed";
        nav.style.transition = "all ease .6s";
        nav.style.padding = "10px 0px";
    } else {
        nav.style.position = "";
        nav.style.padding = "";
    }
});

function crud() {
    fetch(`http://localhost:3000/menu/`)
        .then(res => res.json())
        .then(data => {
            cart.innerHTML = "";
            secondArr = data;
            firstArr = firstArr.length || search.value ? firstArr : data;
            firstArr.forEach(element => {
                if (element.inBasket) {
                    basketDot.style.display = "inline";
                }
                cart.innerHTML += `
                <div class="cart">
                    <img src="${element.img}" alt="">
                    <div  class="elave">
                        <i style="color:red;" class="bi bi-heart ${currentUser.fav.includes(element.id) ? 'bi-heart-fill' : ''}" onclick="toggleFav(${element.id}, ${currentUser.fav.includes(element.id)})"></i>
                        <i class="bi bi-eye " onclick="going(${element.id})"></i>
                        <i class="bi bi-cart-plus" onclick='toBasket(${JSON.stringify(element)})'></i>
                    </div>
                    <div class="cart-1">
                        <div class="word">
                            <h1>${element.h1}</h1>
                            <p>${element.p}</p>
                        </div>
                        <div class="icon">
                            <p>$${element.price}</p>
                            <div class="icon-2">
                                <i class="bi bi-stopwatch"></i>
                                <p>${element.time}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
        });
}

crud();

function updateFavIcons() {
    const favIcons = document.querySelectorAll('.fav i');
    favIcons.forEach(icon => {
        const cardId = icon.parentNode.getAttribute('data-id');
        if (currentUser.fav.includes(parseInt(cardId))) {
            icon.classList.add('bi-heart-fill ');
            icon.classList.remove('bi-heart');
        } else {
            icon.classList.remove('bi-heart-fill');
            icon.classList.add('bi-heart');
        }
    });
}

async function toggleFav(id, isFavorite) {
    await axios.patch(`http://localhost:3000/shop/${id}`, { isFavorite: !isFavorite });

    let res1 = await axios.get("http://localhost:3000/users");
    let data1 = res1.data;
    const currentUserInfo = data1.find(user => user.name === currentUser.name);

    if (isFavorite) {
        const index = currentUserInfo.fav.indexOf(id);
        if (index !== -1) {
            currentUserInfo.fav.splice(index, 1); 
        }
    } else {
        currentUserInfo.fav.push(id); 
    }

    await axios.patch(`http://localhost:3000/users/${currentUserInfo.id}`, currentUserInfo);

   
    updateFavIcons();
    localStorage.setItem('currentUser', JSON.stringify(currentUserInfo)); 
}



search.addEventListener("input", (e) => {
    firstArr = secondArr;
    firstArr = firstArr.filter((element) =>
        element.p.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    crud();
});

sort.addEventListener("change", (e) => {
    if (e.target.value === "low") {
        firstArr.sort((a, b) => a.price - b.price);
    } else if (e.target.value === "high") {
        firstArr.sort((a, b) => b.price - a.price);
    } else {
        firstArr = [];
    }
    crud();
});

const radioInputs = document.querySelectorAll('input[type="radio"]');
radioInputs.forEach(input => {
    input.addEventListener('change', () => {
        const selectedCategory = input.nextElementSibling.textContent.trim();
        let filteredItems;
        if (selectedCategory === 'Under 15 Minutes' || selectedCategory === 'Over 15 Minutes') {
            const timeFilter = selectedCategory === 'Under 15 Minutes' ? '<=15 min' : '>15 min';
            filteredItems = secondArr.filter(item => {
                if (timeFilter.startsWith('>')) {
                    const time = parseInt(timeFilter.slice(1));
                    return parseInt(item.time) > time;
                } else if (timeFilter.startsWith('<=')) {
                    const time = parseInt(timeFilter.slice(2));
                    return parseInt(item.time) <= time;
                }
            });
        } else {
            filteredItems = secondArr.filter(item => item.h1 === selectedCategory);
        }
        firstArr = filteredItems.length ? filteredItems : secondArr;
        crud();
    });
});

console.log(currentUser);