// données et fonction hors API
// recupération de la date, de l'heure et mise à jour toutes les secondes
const dateInterval = setInterval(newDate, newHour, 1000); 
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
}

// données recupérées en json pour les saints de l'API
function fetchNasa(evt) {
    const uri = `https://api.nasa.gov/planetary/apod?api_key=xWLKZjY1HYy6lRpbsSaQJ7W6DrULd15xOuldiwSJ&date=${evt.target.value}`;
    fetch(uri) // Promesse d'aller collecter les données à l'URI fournie
        .then((resp) => {
            if (resp.ok) { // Les données collectées sont valides
                return resp.json(); // Promesse d'extirper les données de la réponse
            } else {
                throw new Error(`Données non collectées avec l'erreur ${resp.status} : ${resp.statusText}`);
            }
        })
        .then((data) => {
            const out = document.getElementById("out");
            out.innerHTML = `
            <figure>
                <div>
                    <img src="${data.url}" alt="${data.title}">
                </div>
                <figcaption>${data.explanation}</figcaption>
            </figure>`;
        })
        .catch((err) => {
            throw new Error(`Un problème réseau est survenu (${err}).`);
        });
}



                    
// on doit récupérer l'heure toute les secondes pour afficher seconde par seconde
