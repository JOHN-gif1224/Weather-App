// Clé API personnelle pour accéder à l'API OpenWeatherMap
const apiKey = "0bbf63a453f3722b6496eee82d423875";

// URL de base de l'API OpenWeatherMap, avec unité en Celsius
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Sélectionne le champ de saisie de la ville dans le DOM
const searchBox = document.querySelector(".search input");

// Sélectionne le bouton de recherche dans le DOM
const searchBtn = document.querySelector(".search button");

// Sélectionne l'élément image qui affichera l'icône météo
const weatherIcon = document.querySelector(".weather-icon");

/**
 * Fonction asynchrone qui récupère et affiche la météo d'une ville donnée
 * @param {string} city - Le nom de la ville à rechercher
 */
async function checkWeather(city) {
  // Effectue une requête HTTP à l'API avec la ville et la clé API
  const response = await fetch(apiUrl + city + "&appid=" + apiKey);

  // Si la ville n'est pas trouvée (erreur 404)
  if (response.status == 404) {
    // Affiche le message d'erreur
    document.querySelector(".error").style.display = "block";
    // Cache la section météo
    document.querySelector(".weather").style.display = "none";
  } else {
    // Si la ville est trouvée, récupère les données JSON de la réponse
    var data = await response.json();

    // Met à jour le nom de la ville affiché
    document.querySelector(".city").innerText = data.name;
    // Met à jour la température (arrondie à l'entier le plus proche)
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";
    // Met à jour l'humidité
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    // Met à jour la vitesse du vent
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    // Change l'icône météo selon la condition principale reçue
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    // Affiche la section météo et cache le message d'erreur
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Ajoute un écouteur d'événement pour détecter la touche "Entrée" dans le champ de saisie
// Fonctionne sur PC et mobile
searchBox.addEventListener("keydown", (event) => {
  // Si la touche pressée est "Enter"
  if (event.key === "Enter") {
    // Lance la recherche météo avec la valeur saisie
    checkWeather(searchBox.value);
  }
});

// Ajoute un écouteur d'événement sur le bouton de recherche
searchBtn.addEventListener("click", () => {
  // Lance la recherche météo avec la valeur saisie
  checkWeather(searchBox.value);
});
