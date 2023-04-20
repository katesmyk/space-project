
 function formValidation () {
  const planetNameInput = document.querySelector("#planetName");
  const sunDistanceInput = document.querySelector("#sunDistance");
  const radiusInput = document.querySelector("#planetRadius");
  const populationInput = document.querySelector("#planetPopulation");
  const saveBtn = document.querySelector("#add-modal .modal__button.button--blue");
  const error = document.querySelector(".error");

  saveBtn.addEventListener("click", function (event) {
	 if (planetNameInput.value === "" || sunDistanceInput.value === "" || radiusInput.value === "" || populationInput.value === "") {
		error.textContent = "Please fill in all fields";
	 } else if (isNaN(sunDistanceInput.value) || isNaN(radiusInput.value) || isNaN(populationInput.value)) {
		error.textContent = "Please enter a number";
	 } else if (sunDistanceInput.value < 0 || radiusInput.value < 0 || populationInput.value < 0) {
		error.textContent = "Please enter a positive number";
	 } else {
		error.textContent = "";
	 }
  });
}
