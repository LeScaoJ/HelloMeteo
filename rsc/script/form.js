// pour gérer la vérification des champs du formulaire

/* Vérification générale du formulaire */
document.querySelector("form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    const nomOk= checkID();
    const mailOk = checkMail();
    const subjectOk = checkSubject();
    const messOk = checkMss();
    if (nomOk && mailOk && subjectOk && messOk) {
        alert("votre message a bien été envoyé");
    } else {
        alert("les champs ne sont pas bien remplis, votre message n'a pas pu être envoyé");
    }
}); 

/* Vérification de chaque contrôle à la frappe */
document.getElementById("nom").addEventListener("keyup", checkID);
document.getElementById("mail").addEventListener("keyup", checkMail);
document.getElementById("subject").addEventListener("keyup", checkSubject);
document.getElementById("mss").addEventListener("keyup", checkMss);

/* fonctions de vérification */
function checkID(){
    const nom = document.getElementById("nom");
    const value = nom.value.trim();
    if (value != "") {
        return true;
    } else {
        return false;
    }
    /*je vérifie que le champs n'est pas vide*/

};

function checkMail(){
    const mail = document.getElementById("mail");
    const value = mail.value.trim();
    if ((value == "") && ((isValidEmail(mail) === true))) { /* A VERIFIER */
        return true;
    } else {
        return false;
    }
    /*je vérifie que le champs n'est pas vide et que le texte rempli par l'utilisateur est bien conforme à la regle défini par l'expression régulière choisie */
};

function isValidEmail(mail) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
  }

function checkSubject() {
    const subject = document.getElementById("subject");
    const value = subject.value.trim();
    if (value != "") {
        return true;
    } else {
        return false;
    }
    /*je vérifie que le champs n'est pas vide*/

};

function checkMss(){
    const mess = document.getElementById("mss");
    const value = mess.value.trim();
    if (value != "") {
        return true;
    } else {
        return false;
    }
    /*je vérifie que le champs n'est pas vide*/

};


/* AJOUT class list ou class name pour afficher les alerts si les champs ne sont pas corerctement rempli*/

