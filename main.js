const apiKey = 'd9e38a3e1bbd414d9dc164821252812'

const form = document.querySelector('.form')
const input = document.querySelector('.input')
const header = document.querySelector('.header')

function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) {
        prevCard.remove();
    }
}

function showError(errorMessage) {
    const html = `<div class="card">${errorMessage}</div>`
    header.insertAdjacentHTML('afterend', html);
}

function showCard(name, country, temp, condition) {
    const html = ` <div class="card">
            <h2 class="card-city">${name} <span>${country}</span></h2>
            <div class="card-weather">
                <div class="card-value">${temp}<sup>°C</sup></div>
                <img class="card-img" src="img/example.jpg" alt="weather">
            </div>
            <div class="card-description">${condition}</div>
        </div>`
    header.insertAdjacentHTML('afterend', html);
}


form.onsubmit = function (event) {
    event.preventDefault()
    let city = input.value.trim();
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {

        console.log(data)
        if (data.error) {
            removeCard()
            showError(data.error.message)
        } else {

            removeCard()
            showCard(data.location.name, data.location.country, data.current.temp_c, data.current.condition.text)
        }
    });
}

