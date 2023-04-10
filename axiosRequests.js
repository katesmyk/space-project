function getData() {
  const getDataBtn = document.querySelector("#getDataBtn");
  getDataBtn.addEventListener("click", function () {
    // console.log("click");
    const options = {
      method: 'GET',
      url: 'https://cloud.seatable.io/dtable-server/api/v1/dtables/9de50710-8482-48e8-9e1c-dc5573536a97/metadata/',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODEzNzg1MzcsImR0YWJsZV91dWlkIjoiOWRlNTA3MTAtODQ4Mi00OGU4LTllMWMtZGM1NTczNTM2YTk3IiwidXNlcm5hbWUiOiIiLCJwZXJtaXNzaW9uIjoicnciLCJhcHBfbmFtZSI6Im15YXBwIn0.nP1Hxs692UHF6w0-D47a91lGuOADCUucvMnmvYO5y4g'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

function getPlanetsData() {
  document.addEventListener("DOMContentLoaded", function () {
    const options = {
    method: 'GET',
    url: 'https://cloud.seatable.io/dtable-server/api/v1/dtables/9de50710-8482-48e8-9e1c-dc5573536a97/rows/',
    params: {table_name: 'Table1'},
    headers: {
      accept: 'application/json',
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODEzNzg1MzcsImR0YWJsZV91dWlkIjoiOWRlNTA3MTAtODQ4Mi00OGU4LTllMWMtZGM1NTczNTM2YTk3IiwidXNlcm5hbWUiOiIiLCJwZXJtaXNzaW9uIjoicnciLCJhcHBfbmFtZSI6Im15YXBwIn0.nP1Hxs692UHF6w0-D47a91lGuOADCUucvMnmvYO5y4g'
    }
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  });
}

// getPlanetsData();

function setPlanetsData() {
  const planetImgEl = document.querySelector("#planetImg");
  const planetNameEl = document.querySelector("#planetName");
  const sunDistanceEl = document.querySelector("#sunDistance span");
  const planetRadiusEl = document.querySelector("#radius span");
  const planetPopulationEl = document.querySelector("#population span");

  document.addEventListener("DOMContentLoaded", function () {
    const options = {
      method: 'GET',
      url: 'https://cloud.seatable.io/dtable-server/api/v1/dtables/9de50710-8482-48e8-9e1c-dc5573536a97/rows/',
      params: {table_name: 'Table1'},
      headers: {
        accept: 'application/json',
        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODEzNzg1MzcsImR0YWJsZV91dWlkIjoiOWRlNTA3MTAtODQ4Mi00OGU4LTllMWMtZGM1NTczNTM2YTk3IiwidXNlcm5hbWUiOiIiLCJwZXJtaXNzaW9uIjoicnciLCJhcHBfbmFtZSI6Im15YXBwIn0.nP1Hxs692UHF6w0-D47a91lGuOADCUucvMnmvYO5y4g'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        const planets = response.data.rows;
        console.log(planets);
        const planet = planets[0];
        planetImgEl.src = planet.img;
        planetNameEl.innerHTML = planet.planet_Name;
        sunDistanceEl.innerHTML = planet.sun_Distance;
        planetRadiusEl.innerHTML = planet.planet_Radius;
        planetPopulationEl.innerHTML = planet.planet_Population;
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}


setPlanetsData()