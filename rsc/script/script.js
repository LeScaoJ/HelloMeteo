// données et fonction hors API
// recupération de la date, de l'heure et mise à jour toutes les secondes
const dateInterval = setInterval(majDateHeure, 1000); 
newDate(); // premier affichage
newHour(); // premier affichage
function newDate() {
    let now = new Date();  
    let year = now.getFullYear(); // on récupère l'année
    let month = (`0`+ (now.getMonth()+1)).slice(-2); // on récupère le mois de 0 a 11, on ajoute +1 pour avoir de 1 à 12, on affiche la date sur 2 chiffres en rajoutant un 0 pour avoir le format 00/00
    let day = ('0'+now.getDate()+1).slice(-2); // on récupère le jour
    
    const dateDiv = document.getElementById("date"); // on recupère la div date du HTML
    dateDiv.textContent = day + "/" + month + "/" + year; // on ecrit la date directement dedans
};
function newHour() {
    // fonction identique à date mais appliquée à l'heure
    let now = new Date();
    let hours = ('0'+now.getHours()).slice(-2);
    let mins = ('0'+now.getMinutes()).slice(-2);
    let secs = ('0'+now.getSeconds()).slice(-2); 

    const hourDiv = document.getElementById("hour");
    hourDiv.textContent = hours + ":" + mins + ":" + secs;
};
function majDateHeure() {
    newDate();
    newHour();
};


// données recupérées en json pour les saints de l'API de nominis
fetchSaint(); // on affiche le saint du jour
function fetchSaint() {
    const uri = `https://nominis.cef.fr/json/saintdujour.php`;
    fetch(uri) 
        .then((resp) => {
            if (resp.ok) { 
                return resp.json();
            } else {
                throw new Error(`Les données n'ont pu être collectées. ${resp.status} : ${resp.statusText}`);
            }
        })
        .then((data) => {
            const saint = document.getElementById("saint");
            saint.textContent = data.response.saintdujour.nom;
        })
        .catch((err) => {
            throw new Error(`Un problème réseau est survenu (${err}).`);
        });
}

// données recupérées en json pour la méteo de l'API de https://www.prevision-meteo.ch/services/json/toulouse
//on recupère les données du site
async function fetchJsonWeatherData(uri) {
    const resp = await fetch(uri); // Mets le script en attente de la data
    let data; // On prépare la variable à utiliser
    if (resp.ok) data = await resp.json(); // Mets le script en attente du "décryptage" de la data
    else throw new Error("données non collectées"); // Gestion des erreurs
    return data; // On retourne la donnée "pure"
}        
// on mets à jour les fonctions pour l'affichage de l'icone du temps et de la temperature à jour toutes les heures
const weatherInterval = setInterval(majIcoTemp, 3600000);
newIco(); // affichage de l'icone du tempsqu'il fait
newTemp(); // affichage de la température
newSun(); // affichage du levé et du couché du soleil
newTown(); // affichage de la ville
newMinMoyMax(); // affichage minimale, moyenne et maximale du jour
newNextDay();
function majIcoTemp() {
newIco();
newTemp();
};

async function newIco() {
    const uri = `https://www.prevision-meteo.ch/services/json/toulouse`;
    try { 
        const data = await fetchJsonWeatherData(uri);
        const ico = document.getElementById("ico");
        ico.src = data.current_condition.icon;
    } catch (err) { // Si une erreur est survenue dans le code précédent je la traite ici
        console.error(err);
    }
};
async function newTemp() {
    const uri = `https://www.prevision-meteo.ch/services/json/toulouse`;
    try { 
        const data = await fetchJsonWeatherData(uri);
        const temp = document.getElementById("currentTemp");
        temp.textContent = `${data.current_condition.tmp}°`;
    } catch (err) { 
        console.error(err);
    }
};
async function newSun() {
    const uri = `https://www.prevision-meteo.ch/services/json/toulouse`;
    try { 
        const data = await fetchJsonWeatherData(uri);
        const sunrise = document.getElementById("sunrise");
        const sunset = document.getElementById("sunset");
        sunrise.textContent = data.city_info.sunrise;
        sunset.textContent = data.city_info.sunset;

    } catch (err) { 
        console.error(err);
    }
};
async function newTown() {
    const uri = `https://www.prevision-meteo.ch/services/json/toulouse`;
    try { 
        const data = await fetchJsonWeatherData(uri);
        const town = document.getElementById("town");
        town.textContent = data.city_info.name;

    } catch (err) { 
        console.error(err);
    }
};
async function newMinMoyMax() {
    const uri = `https://www.prevision-meteo.ch/services/json/toulouse`;
    try { 
        const data = await fetchJsonWeatherData(uri);
        const minMoyMax = document.getElementById("minMoyMax");
        let tmoy = (data.fcst_day_0.tmin + data.fcst_day_0.tmax)/2;
        minMoyMax.innerHTML = `
            <p>${data.fcst_day_0.tmin}</p>
            <p>${tmoy}</p>
            <p>${data.fcst_day_0.tmax}</p>
        `;
    } catch (err) { 
        console.error(err);
    }
};
async function newNextDay() {
    const uri = `https://www.prevision-meteo.ch/services/json/toulouse`;
    try { 
        const data = await fetchJsonWeatherData(uri);
        const nextDay = document.getElementById("nextDays");
        for (let i= 2; i<=4; i++) {
            const previsionsJour = data['fcst_day_' + i]; // on recupère les données du jour selectionné en fonction de i

            const day = document.createElement("div");
            const icoDay = document.createElement("img");
            const p = document.createElement("p");
            const moyTemp = (previsionsJour.tmin + previsionsJour.tmax)/2;

            icoDay.src = previsionsJour.icon;
            p.textContent = moyTemp;

            day.appendChild(icoDay);
            day.appendChild(p);
            nextDay.appendChild(day);
        }        
    } catch (err) { 
        console.error(err);
    } 
}


