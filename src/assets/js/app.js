// Gestion de l'animation en fonction des choix utilisateur.
// Sélection des éléments HTML

const formElt = document.querySelector('.form');
const breathRatio = document.getElementById('breathR');
const imgElt = document.getElementById('rythme');
const player = document.getElementById('audio');
const checkboxElt = document.getElementById('checkbox');
const durationChoice = document.getElementById('duration');
const sectionElt = document.getElementById('trainingSection');
const closeBtnElt = document.querySelector('.closeBtn');
let timeoutId;

// Ajout d'un écouteur d'événements pour le formulaire. Démarrage de l'animation, de la lecture audio et de la mise à jour de la case à cocher
formElt.addEventListener('submit', function (event) {
    event.preventDefault();

    startAnimation();

    handleBreathRatio();

    handleAudio();

});

// Fonctions nommées pour chaque tâche spécifique
// Fonction pour démarrer l'animation
function startAnimation() {
    // Affichage de la section de l'animation et mise en place du minuteur
    sectionElt.classList.remove('hidden');
    const duration = durationChoice.value * 60000;
    const startTime = Date.now();
    const timerElement = document.getElementById('timer');

    // Fonction de mise à jour du minuteur
    function updateTimer() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = duration - elapsedTime;

        if (remainingTime <= 0) {
            // Arrêt de l'animation 
            sectionElt.classList.add('hidden');
        } else {
            // Mise à jour du minuteur et appel de la fonction de mise à jour en boucle
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            timerElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
            requestAnimationFrame(updateTimer);
        }
    }
    // Lecture de l'audio si la case à cocher est cochée, avec une pause automatique à la fin de la durée
    updateTimer();

    if (checkboxElt.checked) {
        player.play();
        timeoutId = setTimeout(() => {
            player.pause();
        }, duration + 2000);
        handleBreathRatio(); // Appel de handleBreathRatio pour démarrer les signaux sonores en même temps que la lecture audio
    }
    // Fonction de retour pour arrêter l'audio et la pause automatique en cas de besoin
    return () => {
        return () => {
            clearTimeout(timeoutId);
            player.pause();
        };
    }
}

// Fonction pour jouer les signaux sonores à intervalles réguliers
function playBeep(interval) {
    let currentIndex = 0;
    let audio = new Audio("/assets/sound/foret.mp3"); 
    console.log(audio);

    function playNextBeep() {
        audio.play();
        currentIndex = (currentIndex + 1) % interval.length;
        setTimeout(playNextBeep, interval[currentIndex]);
    }

    playNextBeep();
}



// Fonction pour gérer le choix de ratio de respiration et afficher l'image correspondante


function handleBreathRatio() {
    const rythme = breathRatio.value;
    imgElt.className = '';
    // Ajouter la classe en fonction de la valeur de rythme
    if (rythme === '1') {
        imgElt.classList.add('rythme55');
        playBeep([5000]);
    } else if (rythme === '2') {
        imgElt.classList.add('rythme37');
        playBeep([3000, 7000]);
    } else if (rythme === '3') {
        imgElt.classList.add('rythme46');
        playBeep([4000, 6000]);
    } else if (rythme === '4') {
        imgElt.classList.add('rythme64');
    }
}

// Fonction pour gérer la lecture
function handleAudio() {
    const time = durationChoice.value * 60000;
    // player.addEventListener('ended', function () {
    //     player.currentTime = 0;
    //     player.play();
    // });

    if (checkboxElt.checked === true) {
        player.play();
        timeoutId = setTimeout(function () {
            player.pause();
        }, time + 2000); // Durée avant d'arrêter la lecture 
    }
    else if (checkboxElt.checked === false) {
        player.pause();
        clearTimeout(timeoutId);
    }
}


// Fermer la section au clic sur le bouton ou au clic sur la touche échappe
closeBtnElt.addEventListener('click', function () {
    animationStop();
});

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        animationStop();
    }
});

function animationStop() {
    sectionElt.classList.add('hidden');
    player.pause();
}

// Activer/désactiver le son lorsqu'on appuie sur la touche "s":
window.addEventListener('keydown', function (event) {
    if (event.key === 's') {
        checkboxElt.checked = !checkboxElt.checked; // Inverser l'état de la case à cocher
        handleAudio(); // Mettre à jour la lecture audio en fonction de la case à cocher
    }
});






