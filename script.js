// DOM Elements
const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    name = document.querySelector('.greeting__name'),
    focus = document.querySelector('.focus__answer'),
    btn = document.querySelector('.background__button'),
    greeting = document.querySelector('.greeting__text'),
    // Weather Elements
    city = document.querySelector('.weather__city'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.weather__temperature'),
    weatherDescription = document.querySelector('.weather__description'),
    humidity = document.querySelector('.weather__humidity'),
    wind = document.querySelector('.weather__wind'),
    //Quote Elements
    quoteText = document.querySelector('.quote__text'),
    quoteAuthor = document.querySelector('.quote__author'),
    quoteButton = document.querySelector('.quote__button');

const images = getBackgroundImages();

function getBackgroundImages() {
    let night = [],
        morning = [],
        day = [],
        evening = [];

    for (let i = 0; i < 24; i++) {
        if (i < 6) {
            let rand = 1 + Math.random() * (20 + 1 - 1);
            if (night.indexOf("assets/images/night/" + addZero(Math.floor(rand)) + ".jpg") == -1) {
                night.push("assets/images/night/" + addZero(Math.floor(rand)) + ".jpg");
            } else {
                i -= 1;
            }
        } else if (i < 12) {
            let rand = 1 + Math.random() * (20 + 1 - 1);
            if (morning.indexOf("assets/images/morning/" + addZero(Math.floor(rand)) + ".jpg") == -1) {
                morning.push("assets/images/morning/" + addZero(Math.floor(rand)) + ".jpg");
            } else {
                i -= 1;
            }
        } else if (i < 18) {
            let rand = 1 + Math.random() * (20 + 1 - 1);
            if (day.indexOf("assets/images/day/" + addZero(Math.floor(rand)) + ".jpg") == -1) {
                day.push("assets/images/day/" + addZero(Math.floor(rand)) + ".jpg");
            } else {
                i -= 1;
            }
        } else {
            let rand = 1 + Math.random() * (20 + 1 - 1);
            if (evening.indexOf("assets/images/evening/" + addZero(Math.floor(rand)) + ".jpg") == -1) {
                evening.push("assets/images/evening/" + addZero(Math.floor(rand)) + ".jpg");
            } else {
                i -= 1;
            }
        }
    }

    return [...night, ...morning, ...day, ...evening]
}

function setBackgroundImages() {
    let now = new Date();
    let hour = now.getHours();

    if (hour < 6) {
        document.body.style.backgroundImage = `url(${images[now.getHours()]})`;
        greeting.textContent = "Доброй ночи,"
    } else if (hour < 12) {
        document.body.style.backgroundImage = `url(${images[now.getHours()]})`;
        greeting.textContent = "Доброе утро,"
    } else if (hour < 18) {
        document.body.style.backgroundImage = `url(${images[now.getHours()]})`;
        greeting.textContent = "Добрый день,"
    } else {
        document.body.style.backgroundImage = `url(${images[now.getHours()]})`;
        greeting.textContent = "Добрый вечер,"
    }

    function viewBgImage(data) {
        const body = document.querySelector('body');
        const src = data;
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {
            body.style.backgroundImage = `url(${src})`;
        };
    }
    
    function getImage() {
        (nowImageIndex < 23) ? nowImageIndex += 1: nowImageIndex = 0;
        viewBgImage(images[nowImageIndex]);
        btn.disabled = true;
        setTimeout(function () {
            btn.disabled = false
        }, 1000);
    }
    
    let nowImageIndex = now.getHours();
    btn.addEventListener('click', getImage);



    let current = new Date();
    let future = new Date();
    future.setTime(future.getTime() + 3600000);
    future.setMinutes(0);
    future.setSeconds(0);

    let timeout = (future.getTime() - current.getTime());
    setTimeout(setBackgroundImages, timeout);
}

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
      sec
    )}`;

    setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function showDate() {
    let now = new Date();

    let options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };

    date.innerHTML = now.toLocaleString("ru", options);

    setTimeout(showDate, 60000);
}

function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Укажите имя]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function setName(e) {
    if (e.type === "keypress") {
        if (e.which == 13 || e.keyCode == 13) {
            if (name.textContent !== '') {
                localStorage.setItem('name', e.target.innerText);
                name.blur();
            } else {
                name.textContent = '[Укажите имя]';
            }
        }
    } else {
        if (name.textContent !== '') {
            localStorage.setItem('name', e.target.innerText);
        } else if (localStorage.getItem('name') === null) {
            name.textContent = '[Укажите имя]';
        } else {
            name.textContent = localStorage.getItem('name');
        }
    }
}

function cleanName(e) {
    name.textContent = '';
    name.focus();
    e.preventDefault();
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Укажите цель]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    if (e.type === "keypress") {
        if (e.which == 13 || e.keyCode == 13) {
            if (focus.textContent !== '') {
                localStorage.setItem('focus', e.target.innerText);
                focus.blur();
            } else {
                focus.textContent = '[Укажите цель]';
            }
        }
    } else {
        if (focus.textContent !== '') {
            localStorage.setItem('focus', e.target.innerText);
        } else if (localStorage.getItem('focus') === null) {
            focus.textContent = '[Укажите цель]';
        } else {
            focus.textContent = localStorage.getItem('focus');
        }
    }
}

function cleanFocus(e) {
    focus.textContent = '';
    focus.focus();
    e.preventDefault();
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('mousedown', cleanName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('mousedown', cleanFocus);



async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    const res = await fetch(url);

    if (res.ok) {
        const data = await res.json();
        quoteText.textContent = data.quoteText;
        quoteAuthor.textContent = data.quoteAuthor;
        if (quoteAuthor.textContent == '' || quoteAuthor.textContent == null || quoteAuthor.textContent == undefined) {
            quoteAuthor.textContent == 'Неизвестный автор';
        }
    } else {
        quoteText.textContent = "Ошибка загрузки. Попробуйте позже..."
    }

}

quoteButton.addEventListener("click", function (event) {
    quoteButton.disabled = true;
    if (quoteButton.contains(event.target)) {
        getQuote();
        setTimeout(function () {
            quoteButton.disabled = false
        }, 1300);
    }
});
document.addEventListener('DOMContentLoaded', getQuote);



async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=152b8ee62930ed014dc9b5a1dd662b21&units=metric`;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `влажность ${data.main.humidity}%`;
        wind.textContent = `ветер ${data.wind.speed} м/с`;
    } else if (!(res.ok) && localStorage.getItem('city')) {
        weatherIcon.className = '';
        temperature.textContent = '';
        weatherDescription.textContent = 'Такого города не существует';
        humidity.textContent = '';
        wind.textContent = '';
    } else {
        weatherIcon.className = '';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
    }

    setTimeout(getWeather, 3600000);
}

function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Укажите город]';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

function cleanCity(e) {
    city.textContent = '';
    city.focus();
    e.preventDefault();
}

function setCity(e) {
    if (e.type === "keypress") {
        if (e.which == 13 || e.keyCode == 13) {
            if (city.textContent !== '') {
                localStorage.setItem('city', e.target.innerText);
                getWeather();
                city.blur();
            } else {
                city.textContent = '[Укажите город]';
            }
        }
    } else {
        if (city.textContent !== '') {
            localStorage.setItem('city', e.target.innerText);
            getWeather();
        } else if (localStorage.getItem('city') === null) {
            city.textContent = '[Укажите город]';
        } else {
            city.textContent = localStorage.getItem('city');
        }
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('mousedown', cleanCity);
city.addEventListener('blur', setCity);
city.addEventListener('keypress', setCity);



getCity();
showTime();
showDate();
getName();
getFocus();
setBackgroundImages();