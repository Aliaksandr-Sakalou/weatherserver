const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationMessage = document.querySelector("#location");
const weatherMessage = document.querySelector("#result");



function fetchWeatherByLocation(location) {
  locationMessage.textContent = 'loading!';
  console.log('loading!');
  fetch('/weather?location=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        locationMessage.textContent = data.error;
      }
      else {
        console.log(data);
        setLocationAndWeatherText(data);
      }
    })
  })
}

function setLocationAndWeatherText(data) {
  locationMessage.textContent = data[0].location;
  weatherMessage.textContent = data[0].weather;
}



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchWeatherByLocation(search.value);
}
);