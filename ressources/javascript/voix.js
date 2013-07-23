/*
 * Ce script exploite la fonction audio présente dans HTML5
 * Il se charge de faire parler l'application
*/

var audio = document.createElement('audio');
var phrase = new Array();

audio.addEventListener('ended', function() {
    phrase.shift();
        
    if(phrase.length > 0)
        mot_a_mot();        
}, false);

function parler(phrase_brute) {
    phrase_brute = phrase_brute.toLowerCase();
    
    phrase_brute = phrase_brute.replace(/\./g, ' point');
    phrase_brute = phrase_brute.replace(/heures/g, 'heure');
    phrase_brute = phrase_brute.replace(/kilomètres/g, 'km');
    phrase_brute = phrase_brute.replace(/kilomètre/g, 'km');
    phrase_brute = phrase_brute.replace(/trouvé/g, 'trouve');
    phrase_brute = phrase_brute.replace(/minutes/g, 'minute');
    phrase_brute = phrase_brute.replace(/à/g, 'a');
    phrase_brute = phrase_brute.replace(/,/g, 'virgule');
    phrase_brute = phrase_brute.replace(/maximale/g, 'maximal');
    phrase_brute = phrase_brute.replace(/parcourue/g, 'parcouru');
    phrase_brute = phrase_brute.replace(/de /g, '2 ');
    
    phrase_brute = phrase_brute.replace(/0([0-9])/gim, '$1');
    phrase_brute = phrase_brute.replace(/1([7-9])/gim, '10 $1');
    phrase_brute = phrase_brute.replace(/et ([2-5])1/gim, 'et $10 et une');
    phrase_brute = phrase_brute.replace(/([2-5])1/gim, '$10 et 1');
    phrase_brute = phrase_brute.replace(/([2-5])([2-9])/gim, '$10 $2');
    
    phrase = phrase_brute.split(' ');
    
    mot_a_mot();
}

function mot_a_mot() {  
    audio.src = 'ressources/voix/' + phrase[0] + '.ogg';
    audio.play();
}
