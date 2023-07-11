// pour gérer la vérification des champs du formulaire

/* Vérification de chaque contrôle à la frappe */
document.getElementById("firstName").addEventListener("keyup", checkID);
document.getElementById("mail").addEventListener("keyup", checkMail);
document.getElementById("subject").addEventListener("keyup", checkSubject);
document.getElementById("mss").addEventListener("keyup", checkMss);

/* Vérification générale du formulaire */
document.querySelector("form").addEventListener("submit", (evt) => {
    const nameOk= checkID();
    const mailOk = checkMail();
    const subjectOk = checkSubject();
    const messOk = checkMss();
    if (nameOk && mailOk && subjectOk && messOk) {
        infoText("votre message a bien été envoyé");
    } else {
        evt.preventDefault();
        infoText("les champs ne sont pas bien remplis, votre message n'a pas pu être envoyé");
    }
}); 

/* fonctions de vérification */
function checkID(){
    const firstName = document.getElementById("firstName");
    const value = firstName.value.trim();
    const infoText = document.getElementById("pbfirstName");
    if (value.length != 0) {
        infoText.classList.remove("show");
        return true;
    } else {
        infoText.classList.add("show");
        return false;
    }
};

function checkMail(){
    const mail = document.getElementById("mail");
    const value = mail.value.trim();
    const infoText = document.getElementById("pbMail");
    if ((value.length != 0) && ((isValidEmail(value) === true))) { 
        infoText.classList.remove("show");
        return true;
    } else {
        infoText.classList.add("show");
        return false;
    }
    /*je vérifie que le champs n'est pas vide et que le texte rempli par l'utilisateur est bien conforme à la regle défini par l'expression régulière choisie */
};

function isValidEmail(mail) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
};

function checkSubject() {
    const subject = document.getElementById("subject");
    const value = subject.value.trim();
    const infoText = document.getElementById("pbSubject");
    if (value.length != 0) {
        infoText.classList.remove("show");
        return true;
    } else {
        infoText.classList.add("show");
        return false;
    }
    /*je vérifie que le champs n'est pas vide*/

};

function checkMss(){
    const mess = document.getElementById("mss");
    const value = mess.value.trim();
    const infoText = document.getElementById("pbMss");
    if (value.length != 0) {
        infoText.classList.remove("show");
        return true;
    } else {
        infoText.classList.add("show");
        return false;
    }
    /*je vérifie que le champs n'est pas vide et j'affiche un mss en conséquence*/

};


/* AJOUT class list ou class name pour afficher les infoTexts si les champs ne sont pas corerctement rempli*/

