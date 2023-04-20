const BASE_TOKEN = "9de50710-8482-48e8-9e1c-dc5573536a97"
const BEARER_TOKEN = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODIwOTQzODMsImR0YWJsZV91dWlkIjoiOWRlNTA3MTAtODQ4Mi00OGU4LTllMWMtZGM1NTczNTM2YTk3IiwidXNlcm5hbWUiOiIiLCJwZXJtaXNzaW9uIjoicnciLCJhcHBfbmFtZSI6Im15YXBwIn0.GqX586_6GAY_ZP_cwkjPVzEUnEgjSKOrQ5u864CE7bM"
// TODO: export constants from a separate file


const planetListEl = document.querySelector("#planetList");
const imgFolder = "static/img/planets/";


const options = {
  method: "GET",
  url: `https://cloud.seatable.io/dtable-server/api/v1/dtables/${BASE_TOKEN}/rows/`,
  params: {table_name: "Table1"},
  headers: {
    accept: "application/json",
    authorization: BEARER_TOKEN,
  }
};


const planetTemplate = (planet) => `
  <div class="products__item-inner">
    <div class="products__item-img">
      <picture>
        <source srcset="${imgFolder}${planet.planet_Name}.webp" type="image/webp">
        <img src="${imgFolder}${planet.planet_Name}.png" alt="${planet.planet_Name}">
      </picture>
    </div>
    <div class="products__item-info">
      <h2 class="planet-name">${planet.planet_Name}</h2>
      <p>Sun distance: <span>${planet.sun_Distance}</span> M km</p>
      <p>Radius: <span>${planet.planet_Radius}</span> km</p>
      <p>Population: <span>${planet.planet_Population}</span> billions</p>
    </div>
    <div class="products__item-buttons">
      <button id="editBtn" class="products__item button--blue" onclick="openModal('edit')">Edit</button>
      <button id="deleteBtn" class="products__item button--red">Delete</button>
    </div>
  </div>
`;

function fetchData() {
  axios
    .request(options)
    .then(function (response) {
      const planets = response.data.rows;

      planetListEl.innerHTML = "";
      for (const planet of planets) {
        const planetEl = document.createElement("div");
        planetEl.classList.add("products__item");
        planetEl.innerHTML = planetTemplate(planet);
        planetListEl.appendChild(planetEl);
      }

      const editBtns = document.querySelectorAll("#editBtn");
      for (const editBtn of editBtns) {
        editBtn.addEventListener("click", editProduct);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", fetchData);


function searchProduct() {
  const searchInput = document.querySelector(".search__input > input[type=text]");

  searchInput.addEventListener("input", function () {
    axios
      .request(options)
      .then(function (response) {
        const planets = response.data.rows;
        const searchValue = searchInput.value.toLowerCase();
        // Clear the planet list
        planetListEl.innerHTML = "";
        
        // Filter planets by name
        const filteredPlanets = planets.filter(planet => {
          return planet.planet_Name.toLowerCase().includes(searchValue);
        });

        if (filteredPlanets.length === 0) {
          planetListEl.innerHTML = "<p>No results found.</p>";
        } else {
          // Display search results
          filteredPlanets.forEach(planet => {
            const planetEl = document.createElement("div");
            planetEl.classList.add("products__item");
            planetEl.innerHTML = planetTemplate(planet);
            planetListEl.appendChild(planetEl);
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

searchProduct();


function cancelSearch() {
  const searchInput = document.querySelector(".search__input > input[type=text]")
  planetListEl.innerHTML = "";
  searchInput.value = "";
  fetchData();
}


function sortByRadius() {
  const sortToggler = document.querySelector('.toggler .toggle__input');
  sortToggler.addEventListener('change', function () {
    console.log(sortToggler.checked);
    if (sortToggler.checked) {
      axios
        .request(options)
        .then(function (response) {
          let planets = response.data.rows;
          sortedPlanets = planets.sort(function (a, b) {
            let radiusA = a.planet_Radius;
            let radiusB = b.planet_Radius;
            return radiusA - radiusB;
            
          });
          planetListEl.innerHTML = "";
          for (const planet of sortedPlanets) {
            const planetEl = document.createElement("div");
            planetEl.classList.add("products__item");
            planetEl.innerHTML = planetTemplate(planet);
            planetListEl.appendChild(planetEl);
          }
        });
    } else {
      fetchData();
    }
  });
}

sortByRadius();

function countPlanetPopulation() {
  const populationEl = document.querySelector("#countTotalVal > span");

  axios
    .request(options)
    .then(function (response) {
      const planets = response.data.rows;
      let totalPopulation = 0;
      planets.forEach(planet => {
        totalPopulation += parseInt(planet.planet_Population);
      });
      populationEl.innerHTML = totalPopulation.toLocaleString();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function addProduct() {

  const nameInput = document.querySelector("#planetName");
  const sunDistanceInput = document.querySelector("#sunDistance");
  const radiusInput = document.querySelector("#planetRadius");
  const populationInput = document.querySelector("#planetPopulation");
  
  const planetName = nameInput.value.trim();
  const planetSunDistance = sunDistanceInput.value.trim();
  const planetRadius = radiusInput.value.trim();
  const planetPopulation = populationInput.value.trim();
  const error = document.querySelector(".error");
  
  if (!planetName || !planetSunDistance || !planetRadius || !planetPopulation) {
    error.innerHTML = "Fields cannot be empty.";
    return;
  }

  if (!/^[a-zA-Z]+$/.test(planetName)) {
     error.innerHTML = "Planet name must contain only alphabets.";
      return;
  }
  // Check if sun distance, radius, and population are numbers or floats
  if (isNaN(planetSunDistance) || isNaN(planetRadius) || isNaN(planetPopulation)) {
    error.innerHTML = "Sun distance, radius, and population must be numbers.";
    return;
  }

  if (planetSunDistance < 0 || planetRadius < 0 || planetPopulation < 0) {
    error.innerHTML = "Sun distance, radius, and population must be positive numbers.";
    return;
  }

  const planet = {
    planet_Name: planetName,
    sun_Distance: planetSunDistance,
    planet_Radius: planetRadius,
    planet_Population: planetPopulation,
    img: `/static/images/planets/Saturn.webp`
  };

  const optionsUpdate = {
    method: 'POST',
    url: `https://cloud.seatable.io/dtable-server/api/v1/dtables/${BASE_TOKEN}/rows/`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: BEARER_TOKEN,
    },
    data: {table_name: 'Table1', row: planet}
  };

  axios
    .request(optionsUpdate)
    .then(function (response) {
      console.log(response);
      fetchData();
      const modal = document.getElementById("add-modal");
        modal.style.display = "none";
        nameInput.value = "";
        sunDistanceInput.value = "";
        radiusInput.value = "";
        populationInput.value = "";
    })
    .catch(function (error) {
      console.error(error);
    });
}

function deleteProduct() {
  planetListEl.addEventListener("click", function (event) {
    if (event.target.classList.contains("button--red")) {
      const planetName = event.target.parentElement.previousElementSibling.firstElementChild.innerHTML;
        axios
          .request(options)
          .then(function (response) {
            const rows = response.data.rows;
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i];
              if (row.planet_Name === planetName) {
                const rowId = row._id;
                const optionsDelete = {
                  method: 'DELETE',
                  url: `https://cloud.seatable.io/dtable-server/api/v1/dtables/${BASE_TOKEN}/rows/`,
                  headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: BEARER_TOKEN,
                  },
                  data: {table_name: 'Table1', row_id: `${rowId}`}
                };
              
              axios
                .request(optionsDelete)
                .then(function (response) {
                  fetchData();
                })
                .catch(function (error) {
                  console.error(error);
                });

              break; // exit the loop once the row is found
            }
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  });
}

deleteProduct();


// TODO: Get the row id of the planet that is being edited

function getRowId(rows) {
const planetNameElement = document.querySelector(".planet-name");
const planetName = planetNameElement.innerHTML.trim().toLowerCase();

for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  const rowPlanetName = row.planet_Name.trim().toLowerCase();
  if (rowPlanetName === planetName) {
    console.log(row._id);
    let rowId = row._id;
    return rowId; 
  }
}
  return null; 
}

function editProduct() {
  const planetNameInput = document.querySelector("#planetName");
  const sunDistanceInput = document.querySelector("#sunDistance");
  const radiusInput = document.querySelector("#planetRadius");
  const populationInput = document.querySelector("#planetPopulation");
  const error = document.querySelector(".error");

  const saveBtn = document.querySelector("#add-modal .modal__button.button--blue");

  if(!planetNameInput.value || !sunDistanceInput.value || !radiusInput.value || !populationInput.value) {
    error.innerHTML = "Fields cannot be empty.";
    return;
  }

  if (!/^[a-zA-Z]+$/.test(planetNameInput.value)) {
    error.innerHTML = "Planet name must contain only alphabets.";
    return;
  }

  if (isNaN(sunDistanceInput.value) || isNaN(radiusInput.value) || isNaN(populationInput.value)) {
    error.innerHTML = "Sun distance, radius, and population must be numbers.";
    return;
  }

  if (sunDistanceInput.value < 0 || radiusInput.value < 0 || populationInput.value < 0) {
    error.innerHTML = "Sun distance, radius, and population must be positive numbers.";
    return;
  }

  // When Save Changes button is clicked, send a PUT request to update the planet data
  saveBtn.addEventListener("click", function (event) {
    const planetName = planetNameInput.value;
    const sunDistance = sunDistanceInput.value;
    const radius = radiusInput.value;
    const population = populationInput.value;

    axios(options)
      .then(function (response) {
        const rows = response.data.rows;
        const rowId = getRowId(rows);
        if (rowId !== null) {
          const planet = {
            planet_Name: planetName,
            sun_Distance: sunDistance,
            planet_Radius: radius,
            planet_Population: population,
          };

          const optionsEdit = {
            method: 'PUT',
            url: `https://cloud.seatable.io/dtable-server/api/v1/dtables/${BASE_TOKEN}/rows/`,
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: BEARER_TOKEN,
            },
            data: {table_name: 'Table1', row_id: `${rowId}`, row: planet},
          };

          axios(optionsEdit)
            .then(function (response) {
              console.log(response);
              fetchData();
            })
            .catch(function (error) {
              console.error(error);
            });

          const modal = document.getElementById("add-modal");
          modal.style.display = "none";
        } else {
          console.log('Planet name not found');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}



