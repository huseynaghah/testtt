let logged = false;
let doctorinfo = localStorage.getItem("doctor")
  ? JSON.parse(localStorage.getItem("doctor"))
  : null;
let doctorId = doctorinfo ? doctorinfo.id : null;
let name = doctorinfo ? doctorinfo.name : null;
let infoEl = document.querySelector("#name");
if (name) {
  infoEl.innerHTML = `<p>Welcome,${name}!<p>`;
  infoEl.style.display = "block";
}

if (doctorinfo) {
  logged = true;
}

if (!logged) {
  window.location = "./";
}

let doctorid = doctorinfo.id;
console.log(doctorid);

let id = new URLSearchParams(window.location.search).get("id");
const detail = document.querySelector(".detail");
const us_2 = document.querySelector(".us-2");
let image = document.querySelector("#image");
let file = document.querySelector("#file");
let form = document.querySelector("form");
let input_1 = document.getElementById("input-1");
let input_2 = document.getElementById("input-2");
let input_3 = document.getElementById("input-3");
let input_4 = document.getElementById("input-4");
let input_5 = document.getElementById("input-5");
let input_6 = document.getElementById("input-6");
let input_7 = document.getElementById("input-7");
const inputs = document.querySelectorAll('input[type="text"], textarea');

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Formun gönderilmesini engelle

  let hasError = false;

  inputs.forEach((input) => {
    const pElement = input.nextElementSibling; // Hata mesajını içeren <p> elementini al

    if (input.value.trim() === "") {
      hasError = true;
      pElement.style.display = "block";
    } else {
      pElement.style.display = "none";
    }
  });

  if (!hasError) {
    console.log("Form gönderildi!");
  }
});

function check() {
  window.location = "admin.html";
}

file.addEventListener("input", (e) => {
  let file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      image.src = reader.result;
    };
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let hasError = false;

  inputs.forEach((input) => {
    const pElement = input.nextElementSibling; // Hata mesajını içeren <p> elementini al

    if (input.value.trim() === "") {
      hasError = true;
      pElement.style.display = "block";
    } else {
      pElement.style.display = "none";
    }
  });

  if (!hasError) {
    console.log("Form gönderildi!");
  }

  axios
    .patch("http://localhost:3000/doctors/" + doctorId, {
      img: image.src,
      title: input_1.value,
      education: input_2.value,
      expertise: input_3.value,
      experience_1: input_4.value,
      h_3: input_5.value,
      p_1: input_6.value,
      education_1: input_7.value,
    })
    .then((res) => (window.location = "./doctor.html"));
});

fetch(`http://localhost:3000/doctors/${doctorId}`)
  .then((res) => res.json())
  .then((data) => {
    image.src = data.img;
    input_1.value = data.title;
    input_2.value = data.education;
    input_3.value = data.expertise;
    input_4.value = data.experience_1;
    input_5.value = data.h_3;
    input_6.value = data.p_1;
    input_7.value = data.education_1;
    image.style.width = "100px";
    image.style.height = "100px";
  });
