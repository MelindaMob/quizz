const questions = [ //déclare const appelée question, contient tableau array d'objets
    {
        question: "Quelle ville n'est pas en Espagne?",
        reponses: [
            {text: "Barcelonne", correct:false},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "Madrid", correct:false},
            {text: "Malaga", correct:false},
            {text: "Lisbonne", correct:true},
        ]
    },
    {
        question: "Quelle ville n'est pas aux USA?",
        reponses: [
            {text: "Bristol", correct:true},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "New York", correct:false},
            {text: "Los Angeles", correct:false},
            {text: "Phoenix", correct:false},
        ]
    },
    {
        question: "Quelle ville n'est pas en Australie?",
        reponses: [
            {text: "Melbourne", correct:false},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "Sydney", correct:false},
            {text: "Liverpool", correct:true},
            {text: "Brisbane", correct:false},
        ]
    },
    {
        question: "Quelle ville n'est pas en France",
        reponses: [
            {text: "Lyon", correct:false},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "Genève", correct:true},
            {text: "Strasbourg", correct:false},
            {text: "Toulouse", correct:false},
        ]
    },
    {
        question: "Quelle ville n'est pas en Afrique du Sud ?",
        reponses: [
            {text: "Johanessburg", correct:false},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "Pretoria", correct:false},
            {text: "Cape Town", correct:false},
            {text: "Kisangani", correct:true},
        ]
    },
    {
        question: "Quelle ville n'est pas en Grèce ?",
        reponses: [
            {text: "Peristérie", correct:false},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "Athènes", correct:false},
            {text: "Néapolis", correct:true},
            {text: "Santorin", correct:false},
        ]
    },
    {
        question: "Quelle ville n'est pas au Japon ?",
        reponses: [
            {text: "Okinawa", correct:false},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "Osaka", correct:false},
            {text: "Ottawa", correct:true},
            {text: "Kobe", correct:false},
        ]
    },
    {
        question: "Quelle ville n'est pas au Maroc ?",
        reponses: [
            {text: "Orran", correct:true},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "Casablanca", correct:false},
            {text: "Rabat", correct:false},
            {text: "Agadir", correct:false},
        ]
    },
    {
        question: "Quelle ville n'est pas en Belgique ?",
        reponses: [
            {text: "Liège", correct:false},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "Luxembourg", correct:true},
            {text: "Brussel", correct:false},
            {text: "Ostende", correct:false},
        ]
    },
    {
        question: "Quelle ville n'est pas en Chine ?",
        reponses: [
            {text: "Taipei", correct:true},// deux propriétés: text: chaîne de caractères pr texte de la réponse, 'correct': booléen si réponse est correcte ou fausse
            {text: "Wuhan", correct:false},
            {text: "Pékin", correct:false},
            {text: "Shanghai", correct:false},
        ]
    },
    
]; 
// déclaration de constante pour référencer des éléments en html
const questionElement = document.getElementById("question");
const reponseButton = document.getElementById("reponse-btn");
const suivantButton = document.getElementById("suivant");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){ //fonction pour commencer le quizz, réinitialisation
    currentQuestionIndex = 0;
    score = 0;
    suivantButton.innerHTML = "Suivant"; //pour montrer le text 'suivant' de l'html
    showQuestion(); //function creer plus tard, qui affichera question qd le jeux sera réinitialisé
}
//function pour afficher la question actuelle
// cette fonction prend la question actuelle, affiche le numéro et le texte de la question, puis crée des boutons pour chaque réponse associée à cette question, en les ajoutant à un conteneur dans le document. Cela pourrait être utilisé pour créer une interface utilisateur interactive pour un quiz à choix multiples
function showQuestion(){ //questionNo = variable. Les variables en js n'ont pas de $
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; // le plus 1 car débute par zéro (logique de l'ordi), et mettra dans l'ordre la question suivante
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.reponses.forEach(reponses => {
        const button = document.createElement("button");
        button.innerHTML = reponses.text; //définir texte du btn html avc le texte de la réponse
        button.classList.add("btn");
        reponseButton.appendChild(button);
        if(reponses.correct){
            button.dataset.correct = reponses.correct;
        }
        button.addEventListener("click", selectReponse);
    });
}
function resetState(){ // fonction qui supprime les btn réponse mis par défaut dans le html, et cache le btn suivant, qui se réaffichera qd réponse choisie
    suivantButton.style.display = "none";
    while (reponseButton.firstChild){
        reponseButton.removeChild(reponseButton.firstChild);
    }
}

function selectReponse(e){
    const selectedBtn = e.target; //target = bouton cliqué
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++; //définis plus tôt
    }else{
        selectedBtn.classList.add("incorrect"); //ajter la class
    }
    Array.from(reponseButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    suivantButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Vous avez ${score} sur ${questions.length} !`;
    suivantButton.innerHTML = "Rejouez" // remplacez le texte suivant par play again
    suivantButton.style.display = "block";
}


function handleBoutonSuivant(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


suivantButton.addEventListener("click", ()=>{ //addEventListener, force le btn à agir sur le click
    if(currentQuestionIndex < questions.length){
        handleBoutonSuivant(); //fonction pour gérer le btn suivant
    }else{
        startQuiz();
    }
})

startQuiz();