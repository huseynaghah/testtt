let id=new URLSearchParams(window.location.search).get("id")
const detail=document.querySelector(".detail")
const list=document.querySelector("#list")
const list_page=document.querySelector(".list-page")
const drop=document.querySelector("#drop")
const dropdown_menu=document.querySelector("#dropdown-menu")
const drop_2=document.querySelector("#drop2")
const dropdown_menu_2=document.querySelector("#dropdown-menu2")
const nav=document.querySelector(".navbar_1")
const plan = document.querySelector('.plan');

console.log(plan);

let pasients=[]
let userName=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem("currentUser")).name:null;
let number=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem("currentUser")).number:null;


// if(!userName){
//     window.location="./"
// }


list.addEventListener("click",()=>{
    if(list_page.style.display!="block"){
        list_page.style.display="block"
    }
    else{
        list_page.style.display="none"
    }
})

drop.addEventListener("mouseenter",()=>{
    if(
        dropdown_menu.style.display!="block"){
        dropdown_menu.style.display="block"
    }
    else{
        dropdown_menu.style.display="none"
    }
})


drop_2.addEventListener("mouseenter",()=>{
    if(dropdown_menu_2.style.display!="block")
    {
        dropdown_menu_2.style.display="block"
    }
    else{
        dropdown_menu_2.style.display="none"
    }
})

window.addEventListener("scroll",()=>{
    if(window.scrollY>400){
        nav.style.zIndex=3
        nav.style.position="fixed"
        nav.style.transition="all ease .6s"
        nav.style.padding="10px 0px"
    }
    else{
        nav.style.position="" 
        nav.style.padding=""
    }
})


fetch(`http://localhost:3000/doctors/${id}`)
.then(res=>res.json())
.then(data=>{

    pasients=data.pasient;
    console.log(data)
    detail.innerHTML=`
   
    <div class="doc-1">

          <div class="detail-1">
            <img src=${data.img} alt="">
          </div>
          
          <div class="detail-2">

           <h1>${data.name}</h1>
            <h2>${data.experience_1}</h2>
                <div class="icons">
                    <i class="bi bi-facebook"></i>
                    <i class="bi bi-instagram"></i>
                    <i class="bi bi-twitter"></i>
                    <i class="bi bi-youtube"></i>
                    <i class="bi bi-pinterest"></i>
                </div>
                <p>${data.p_1}</p>
                <h1 class="one"><span>Phone Number:</span>${data.number}</h1>
                <h1 class="one"><span>Title:</span>${data.title}</h1>
                <h1 class="one"><span>Education:</span>${data.education}</h1>
                <h1 class="one"><span>Expertise:</span>${data.expertise}</h1>
          </div>
        </div>

        <div class="doc-2">
            <h1>About Them</h1>
            <p>${data.education_1}</p>
        </div>
    `
})



document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const symptoms = document.getElementById('symptoms').value;

        const formInput = {
            date: date,
            time: time,
            symptoms: symptoms
        };
        
        fetch(`http://localhost:3000/doctors/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patient: formInput })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log(data); 
            setTimeout(()=>{plan.style.display = 'flex'}, 2000)
            
            
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    });
});




const buttons = [
    document.querySelector(".btn-1"),
    document.querySelector(".btn-2"),
    document.querySelector(".btn-3"),
    document.querySelector(".btn-4"),
    document.querySelector(".btn-5"),
    document.querySelector(".btn-6"),
    document.querySelector(".btn-7")
];

const plans = [
    document.querySelector(".plan-2"),
    document.querySelector(".plan-3"),
    document.querySelector(".plan-4"),
    document.querySelector(".plan-5"),
    document.querySelector(".plan-6"),
    document.querySelector(".plan-7"),
    document.querySelector(".plan-8")
];
function eat(){
    window.location="./shop.html"
}
buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        plans.forEach((plan, planIndex) => {
            plan.style.display = index === planIndex ? "flex" : "none";
        });
    });
});





