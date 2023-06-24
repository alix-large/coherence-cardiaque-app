// Gestion de l'animation en fonction des choix utilisateur.
// Sélection des éléments HTML

const formElt = document.querySelector('.form');
const breathRatio = document.getElementById('breathR');
const imgElt = document.getElementById('rythme');
const soundtrackPlayer = document.getElementById('soundtrackAudio');
const audio = document.getElementById("beepAudio");
const inputRadioSoundtrackElt = document.getElementById('soundtrack');
const inputRadioBeepElt =document.getElementById('beep')
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
    let pauseBeep;

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
    // Lecture de l'audio (soundtrack ou bip) si la case à cocher est cochée, avec une pause automatique à la fin de la durée
    updateTimer();

    if (inputRadioSoundtrackElt.checked) {
        soundtrackPlayer.play();
        timeoutId = setTimeout(() => {
            soundtrackPlayer.pause();
        }, duration + 1500);
    }
    else if (inputRadioBeepElt.checked)  {
        playBeep();

        pauseBeep = () => {
            beepAudio.pause(); // Met en pause la lecture du bip
        };
    } 
    
    // Fonction de retour pour arrêter l'audio et la pause automatique en cas de besoin

    return () => {
        clearTimeout(timeoutId);
        soundtrackPlayer.pause();
    };
    
}

// Fonction pour gérer la lecture du bip pour la respiration
function playBeep() {
    const rythme = breathRatio.value;
    const intervals = getIntervalForRythme(rythme);
    let currentIndex = 0;


    function playNextBeep() {
        audio.play();
        currentIndex = (currentIndex + 1) % intervals.length;
        setTimeout(playNextBeep, intervals[currentIndex]);
    }

    playNextBeep();
}

function getIntervalForRythme(rythme) {
    if (rythme === '1') {
        return [5000]; // 5 secondes
    } else if (rythme === '2') {
        return [3000, 7000]; // 3 secondes, 7 secondes
    } else if (rythme === '3') {
        return [4000, 6000]; // 4 secondes, 6 secondes
    } else if (rythme === '4') {
        return [6000, 4000]; // 6 secondes, 4 secondes
    }

    return []; // Retourne un tableau vide si aucun rythme correspondant n'est trouvé
}


// Fonction pour gérer le choix de ratio de respiration et afficher l'image correspondante

function handleBreathRatio() {
    const rythme = breathRatio.value;
    imgElt.className = '';
    // Ajouter la classe en fonction de la valeur de rythme
    if (rythme === '1') {
        imgElt.classList.add('rythme55');

    } else if (rythme === '2') {
        imgElt.classList.add('rythme37');

    } else if (rythme === '3') {

    } else if (rythme === '4') {
        imgElt.classList.add('rythme64');
    }
}

// Fonction pour gérer la lecture
function handleAudio() {
    const time = durationChoice.value * 60000;
    const audioOption = document.querySelector('input[name="audioOption"]:checked').value;

    if (audioOption === 'soundtrack') {
        soundtrackPlayer.play();
        timeoutId = setTimeout(function () {
            soundtrackPlayer.pause();
        }, time + 2000); // Durée avant d'arrêter la lecture 
    }
    else if (audioOption === 'beep') {
        soundtrackPlayer.pause();
        playBeep(time);
        clearTimeout(timeoutId);
    }
}

//Fermer la section au clic sur le bouton ou au clic sur la touche échappe
function closeSection() {
    sectionElt.classList.add('hidden');
    soundtrackPlayer.pause();
    audio.pause();
  }
  
closeBtnElt.addEventListener('click', closeSection);
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeSection();
    }
});


// Activer/désactiver le son lorsqu'on appuie sur la touche "s":
// window.addEventListener('keydown', function (event) {
//     if (event.key === 's') {
//         if(inputRadioSoundtrackElt.checked){
//             inputRadioSoundtrackElt.checked = false;
//             soundtrackPlayer.pause();
//         }
//         else {
//             inputRadioSoundtrackElt.checked = true;
//             soundtrackPlayer.play();
//         }
//         if (inputRadioBeepElt.checked) {
//             inputRadioBeepElt.checked = false;
//             audio.pause();
//         }
//         else {
//             inputRadioBeepElt.checked = true;
//             playBeep(); 
//           }
//     }
// });






