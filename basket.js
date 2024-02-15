const list = document.querySelector("#list")
const list_page = document.querySelector(".list-page")
const drop = document.querySelector("#drop")
const dropdown_menu = document.querySelector("#dropdown-menu")
const drop_2 = document.querySelector("#drop2")
const dropdown_menu_2 = document.querySelector("#dropdown-menu2")
const nav = document.querySelector(".navbar_1")

let userId = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).id
  : null;
let sum = 0;
let basketArr = [];

if (!userId) {
  window.location = "./login.html";
}


list.addEventListener("click", () => {
    if (list_page.style.display != "block") {
        list_page.style.display = "block"
    }
    else {
        list_page.style.display = "none"
    }
})

drop.addEventListener("mouseenter", () => {
    if (
        dropdown_menu.style.display != "block") {
        dropdown_menu.style.display = "block"
    }
    else {
        dropdown_menu.style.display = "none"
    }
})


drop_2.addEventListener("mouseenter", () => {
    if (dropdown_menu_2.style.display != "block") {
        dropdown_menu_2.style.display = "block"
    }
    else {
        dropdown_menu_2.style.display = "none"
    }
})

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        nav.style.zIndex = 3
        nav.style.position = "fixed"
        nav.style.transition = "all ease .6s"
        nav.style.padding = "10px 0px"
    }
    else {
        nav.style.position = ""
        nav.style.padding = ""
    }
})
let cards = document.querySelector(".second");
let sortBtn = document.querySelector(".sort");
let emptyAlert = document.querySelector('.empty')
let sorted = "asc";
let filteredArr = [];

const add = async (element, index) => {
  element.count = element.count + 1;

  basketArr.splice(index, 1, element);
  let res = await axios.patch("http://localhost:3000/users/" + userId, {
    basket: basketArr,
  });
  getAllCards();
};


const remove = async (element, index) => {
  if (element.count > 1) {
    element.count = element.count - 1;

    basketArr.splice(index, 1, element);
    let res = await axios.patch("http://localhost:3000/users/" + userId, {
      basket: basketArr,
    });
  } else {
    basketArr.splice(index, 1);
    let res = await axios.patch("http://localhost:3000/users/" + userId, {
      basket: basketArr,
    });
  }

  getAllCards();
};

// async function getAllCards() {
//   let res = await axios.get("http://localhost:3000/shop");
//   let data = res.data;
//   copyArr = data;
//   cards.innerHTML = "";
//   filteredArr = filteredArr.length || searchInput.value ? filteredArr : data;
//   filteredArr.forEach((el) => {

//     cards.innerHTML += `
//      <div class="cart">
//           <img src="${element.img}" alt="">
//           <div class="cart-1">
//               <div class="word">
//                   <h1>${element.h1}</h1>
//                   <p >${element.p}</p>
//               </div>
//               <div class="icon">
//               <p>$${totalPrice}</p> 
//                 <div class="icon-2">
//                   <i class="bi bi-stopwatch"></i>
//                   <p>${element.time}</p>
//                 </div>
//                 <div class="icons" style="cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px;">
//                 <span> ${element.inBasket}</span>
//                 <div class="element" style="cursor: pointer; display: flex; justify-content: center; align-items: center;flex-direction: column;">
//                 <a onclick="addCount(${element.id}, ${element.inBasket}, ${element.price})" style="cursor: pointer;" ><i class="bi bi-chevron-up"></i></a>
                 
//                 <a onclick="removeCount(${element.id},${element.inBasket}, ${element.price})"  style="cursor: pointer;"  ><i class="bi bi-chevron-down"></i></a>
//                 </div>
//               </div>
//               </div>
//           </div>
//           </div>`;
//   });
// }
async function getAllCards() {

  let res = await axios.get("http://localhost:3000/users/" + userId);
  let data = await res.data;
  basketArr = data.basket;
  
  if (basketArr.length == 0) {
    cards.innerHTML = '<h1 class="empty">Basket is empty...</p></div>';
   
  } else {
   cards.innerHTML = "";
    basketArr.forEach((el, i) => {
      cards.innerHTML += `
      <div class="cart">
      <img src="${el.img}" alt="">
      <div class="cart-1">
          <div class="word">
              <h1>${el.h1}</h1>
              <p >${el.p}</p>
          </div>
          <div class="icon">
          <p>${el.price * el.count} $</p> 
            <div class="icon-2">
              <i class="bi bi-stopwatch"></i>
              <p>${el.time}</p>
            </div>
            <div class="icons" style="cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px;">
            <span> ${el.count} </span>
            <div class="element" style="cursor: pointer; display: flex; justify-content: center; align-items: center;flex-direction: column;">
            <a onclick='add(${JSON.stringify(el)}, ${i})' style="cursor: pointer;" ><i class="bi bi-chevron-up"></i></a>
             
            <a onclick='remove(${JSON.stringify(el)}, ${i})'  style="cursor: pointer;"  ><i class="bi bi-chevron-down"></i></a>
            </div>
          </div>
          </div>
      </div>
      </div>
    `;
    
    });
  }
  function getTotal(){
    if(basketArr.length == 0){
      return 0
    }else{
      let sum = 0;
      basketArr.forEach(element =>{
        sum += element.count * element.price
      })
      return sum;
    }
  }
  // total.innerHTML = `Total:$${getTotal()}`;
}
getAllCards();

// <div class="cart">
//       <img src="${element.img}" alt="">
//       <div class="cart-1">
//           <div class="word">
//               <h1>${element.h1}</h1>
//               <p >${element.p}</p>
//           </div>
//           <div class="icon">
//           <p>$${totalPrice}</p> 
//             <div class="icon-2">
//               <i class="bi bi-stopwatch"></i>
//               <p>${element.time}</p>
//             </div>
//             <div class="icons" style="cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px;">
//             <span> ${element.inBasket}</span>
//             <div class="element" style="cursor: pointer; display: flex; justify-content: center; align-items: center;flex-direction: column;">
//             <a onclick="addCount(${element.id}, ${element.inBasket}, ${element.price})" style="cursor: pointer;" ><i class="bi bi-chevron-up"></i></a>
             
//             <a onclick="removeCount(${element.id},${element.inBasket}, ${element.price})"  style="cursor: pointer;"  ><i class="bi bi-chevron-down"></i></a>
//             </div>
//           </div>
//           </div>
//       </div>
//       </div>
      