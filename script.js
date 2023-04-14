// Internet-shop

// Створити web-аплікацію, яка дозволятиме працювати зі списком елементів (товарів тощо) інтернет-магазину. 
// Необхідно передбачити можливість: 
// -        створення нових елементів через відповідну сторінку
// -        редагування існуючих елементів через відповідну сторінку
// -        видалення елементів
// -        сортування елементів за певним параметром
// -        пошук елементів за назвою
// -        розрахунок загальної суми певного параметра для всіх елементів
// Для збереження даних можете використати LocalStorage.

// Advanced.
// Дані по товарах повинні зберігатися в БД (наприклад, при додаванні нового товару йде відповідний запит на сервер і відбувається запис даних в БД).

// Search by name
// let searchInput = document.querySelector(".search__input > input[type=text]");
// let searchButton = document.querySelector(".search__button.button--blue");
// let productsContent = document.querySelectorAll(".products__content .products__item");

// function searchByName() {
//   let searchValue = searchInput.value.toLowerCase();

//   productsContent.forEach((product) => {
//     let productNameElement = product.querySelector(".products__item-info h2");
    
//     if (productNameElement) {
//       let productName = productNameElement.innerText.toLowerCase();
  
//       if (productName.includes(searchValue)) {
//         product.classList.remove("hidden");
//       } else {
//         product.classList.add("hidden");
//       }
//     }
//   });
// }

// let cancelButton = document.querySelector(".search__button.button--red");
// let noResults = "I can't find anything :("

// cancelButton.addEventListener("click", function () {
//   searchInput.value = "";
//   let productCards = document.querySelectorAll(".products__item");
//   productCards.forEach(function (productCard) {
//    	productCard.classList.remove("hidden");
//   });

// //   TODO: no results
// });

// searchButton.addEventListener("click", searchByName);

// Sort by radius
// const sortToggler = document.querySelector('.toggler input[type="checkbox"]');

// function sortByRadius() {
//   let planets = document.querySelectorAll(".products__item");
//   let planetList = Array.from(planets); // Convert NodeList to Array
//   let sortedPlanets = planetList.sort((a, b) => {
//     // Get radius values for each planet
//     let radiusAElement = a.querySelector(".products__item-info > p:nth-child(3) > span");
//     let radiusBElement = b.querySelector(".products__item-info > p:nth-child(3) > span");
//     let radiusA = parseInt(radiusAElement?.innerText || 0);
//     let radiusB = parseInt(radiusBElement?.innerText || 0);
//     return radiusB - radiusA; // Sort in descending order
//   });
//   return sortedPlanets;
// }

// sortToggler.addEventListener("change", () => {
//   const planetContainer = document.querySelector(".products__content");
//   const planets = document.querySelectorAll(".products__item");

//   if (sortToggler.checked) {
//     // Sort planets by radius and add to container
//     let sortedPlanets = sortByRadius();
//     sortedPlanets.forEach((planet) => {
//       // Move the buttons inside the planet element
//       let buttons = planet.querySelector(".products__item-buttons");
//       planet.appendChild(buttons);
//       planetContainer.appendChild(planet);

// 		let inner = planet.querySelector(".products__item-inner");
// 		inner.classList.add("active");
//     });
//   } else {
//     // Reset to original order
//       planets.forEach((planet) => {
//       // Move the buttons back 
//         let buttons = planet.querySelector(".products__item-buttons");
//         planet.querySelector(".products__item-inner").appendChild(buttons);
//         planetContainer.appendChild(planet);

// 		  let innerElements = planet.querySelector(".products__item-inner");
//       innerElements.forEach((inner) => {
//         inner.classList.remove("active");
//       });
//     });
//   }
//   // TODO: soring isnt reseting to original order
// });
// function openModal() {
//   const modal = document.querySelector('.modal');
//   modal.style.display = 'flex';
// }

// function closeModal() {
//   const modal = document.querySelector('.modal');
//   modal.style.display = 'none';
// }
// window.onclick = function(event) {
//   const modal = document.querySelector('.modal');
//   if (event.target == modal) {
//     modal.style.display = 'none';
//   }
// }

// import("./modal.html").then(modalContent => {
//   const modalPlaceholder = document.querySelector("#modal-placeholder");
//   modalPlaceholder.innerHTML = modalContent.default;
// });


function openModal(mode) {
  const modal = document.querySelector("#add-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalFooter = document.querySelector("#modal-footer");

  modalFooter.innerHTML = "";
  if (mode === "add") {
      modalTitle.innerText = "Add Planet";
      const addButton = document.createElement("button");
      addButton.innerText = "Add Planet";
      addButton.className = "modal__button button--blue";
      addButton.onclick = addProduct;
      modalFooter.appendChild(addButton);
    } else if (mode === "edit") {
      modalTitle.innerText = "Edit Planet";
      const saveButton = document.createElement("button");
      saveButton.innerText = "Save Changes";
      saveButton.className = "modal__button button--blue";
      saveButton.onclick = editProduct;
      modalFooter.appendChild(saveButton);
    }
  
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.querySelector("#add-modal");
  modal.style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.querySelector("#add-modal");
  if (event.target == modal) {
    closeModal();
  }
}


