let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500)
    $("body").css("overflow", "visible")

  })
})

function openSideNav() {
  $(".side-nav-menu").animate({
    left: 0
  }, 500)


  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");


  for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({
      top: 0
    }, (i + 5) * 100)
  }
}

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
  $(".side-nav-menu").animate({
    left: -boxWidth
  }, 500)

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");


  $(".links li").animate({
    top: 300
  }, 500)
}
closeSideNav()

$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav()
  } else {
    openSideNav()
  }
})

//www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

async function searchByName(term) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  response = await response.json();
  // if (response.meals) {
  //   displayMeals(response.meals);
  // } else {
  //   displayMeals([]);
  // }   



  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);

}
//www.themealdb.com/api/json/v1/1/search.php?f=a
async function searchByFirstLetter(term) {
  closeSideNav()
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)

  term == "" ? term = "a" : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  response = await response.json()

  response.meals ? displayMeals(response.meals) : displayMeals([])
  $(".inner-loading-screen").fadeOut(300)

}

function displayMeals(array) {
  let cartoona = "";

  for (let i = 0; i < array.length; i++) {
    cartoona += `
      <div class="col-md-3">
              <div onclick="getMealDetails('${array[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${array[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${array[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }

  rowData.innerHTML = cartoona;
}

//www.themealdb.com/api/json/v1/1/categories.php
async function getCategories() {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  response = await response.json();
  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}

function displayCategories(array) {
  let cartoona = "";
  for (let i = 0; i < array.length; i++) {
    cartoona += `
      div class="col-md-3">
                <div onclick="getCategoryMeals('${array[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${array[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${array[i].strCategory}</h3>
                        <p>${array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
      `;
  }
  rowData.innerHTML = cartoona;

}
//https://www.themealdb.com/api/json/v1/1/list.php?a=list
async function getArea() {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  response = await response.json();
  displayArea(response.meals);
  $(".inner-loading-screen").fadeOut(300);

}


function displayArea(array) {
  let cartoona = "";
  for (let i = 0; i < array.length; i++) {
    cartoona += `
    <div class="col-md-3">
    <div onclick="getAreaMeals('${array[i].strArea}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${array[i].strArea}</h3>
    </div>
</div>`;

  }
  rowData.innerHTML = cartoona;
}
//www.themealdb.com/api/json/v1/1/list.php?i=list 
async function getIngredients() {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}


function displayIngredients(array) {
  let cartoona = "";
  for (let i = 0; i < array.length; i++) {
    cartoona += `
    <div class="col-md-3">
    <div onclick="getIngredientsMeals('${array[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${array[i].strIngredient}</h3>
            <p>${array[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
</div>`;
  }
  rowData.innerHTML = cartoona;
}
//www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);

}

//www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
//www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
async function getIngredientsMeals(ingredient) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
//www.themealdb.com/api/json/v1/1/lookup.php?i=52772
async function getMealDetails(id) {
  closeSideNav();
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  response = await response.json();
  displayMealDetails(response.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}

function displayMealDetails(meal) {
  searchContainer.innerHTML = "";


  let ingredients = ``

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
  }

  let tags = meal.strTags?.split(",")

  if (!tags) tags = []

  let tagsStr = ''
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
  }



  let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

  rowData.innerHTML = cartoona;
}

function showSearchInputs() {
  searchContainer.innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>`

  rowData.innerHTML = ""
}



function showContact() {
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repeatPasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repeat Your password">
              <div id="repeatPasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter Same Password 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `
  submitBtn = document.getElementById("submitBtn")


  document.getElementById("nameInput").addEventListener("focus", () => {
    nameTouched = true
  })

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailTouched = true
  })

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneTouched = true
  })

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageTouched = true
  })

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordTouched = true
  })

  document.getElementById("repeatPasswordInput").addEventListener("focus", () => {
    repeatPasswordTouched = true
  })
}

let nameTouched = false;
let emailTouched = false;
let phoneTouched = false;
let ageTouched = false;
let passwordTouched = false;
let repeatPasswordTouched = false;

function nameValid() {
  var nameInput = document.getElementById("nameInput").value;
  var nameRegex = /^[a-zA-Z ]+$/;
  var result;
  if (nameRegex.test(nameInput)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function emailValid() {
  var emailInput = document.getElementById("emailInput").value;
  var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result;
  if (emailRegex.test(emailInput)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function phoneValid() {
  var phoneInput = document.getElementById("phoneInput").value;
  var phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  var result;
  if (phoneRegex.test(phoneInput)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function ageValid() {
  var ageInput = document.getElementById("ageInput").value;
  var ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  var result;
  if (ageRegex.test(ageInput)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function passwordValid() {
  var passwordInput = document.getElementById("passwordInput").value;
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  var result;
  if (passwordRegex.test(passwordInput)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function repeatPasswordValid() {
  let password = document.getElementById("passwordInput").value;
  let repeatPassword = document.getElementById("repeatPasswordInput").value;
  let result;
  if (password === repeatPassword) {
    result = true;
  } else {

    result = false;
  }
  return result;

}

// 

function inputsValidation() {
  if (nameTouched) {
    if (nameValid()) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none")

    } else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block")

    }
  }
  if (emailTouched) {

    if (emailValid()) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block")

    }
  }

  if (phoneTouched) {
    if (phoneValid()) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

    }
  }

  if (ageTouched) {
    if (ageValid()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block")

    }
  }

  if (passwordTouched) {
    if (passwordValid()) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

    }
  }
  if (repeatPasswordTouched) {
    if (repeatPasswordValid()) {
      document.getElementById("repeatPasswordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("repeatPasswordAlert").classList.replace("d-none", "d-block")

    }
  }


  if (nameValid() &&
    emailValid() &&
    phoneValid() &&
    ageValid() &&
    passwordValid() &&
    repeatPasswordValid()) {
    submitBtn.removeAttribute("disabled")
  } else {
    submitBtn.setAttribute("disabled", true)
  }
}
