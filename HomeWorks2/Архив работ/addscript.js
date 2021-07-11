'use strict';

var audio = new Audio();
audio.src = 'music/gotic.mp3'; // путь к самой мелодии

function soundStart() {
    audio.volume = 1; //Громкость
    audio.play();
    let fun = document.getElementById("fun").style.display = "none"; // Скрытие текста, который запускает мелодию
    let sad = document.getElementById("sad").style.display = "block"; // показ текста, который её остановит
}

function soundStop() {
    audio.pause();
}
