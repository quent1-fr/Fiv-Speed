/*
 * Ce script exploite la fonction géolocalisation présente dans HTML5
 * Il se charge également d'enregistrer différents paramètres à des fins statistiques
*/

var localisation = {
    // Informations liées à la position
        longitude : null, // Dernière longitude connue
        latitude  : null, // Dernière latitude connue 
        precision : null, // Précision, en mètres, du dernier relevé
        
    // Informations diverses
        date      : null, // Date, exprimée à travers un timestamp, du dernier relevé
        accroche  : false // Vrai si l'appareil arrive à se géolocaliser, faux sinon
}

var vitesse = {
    // Informations liées à la vitesse
        actuelle  : 0, // Vitesse actuelle de l'utilisateur, exprimée en km/h, arrondie à un chiffre après la virgule
    
    // Informations servant à l'affichage des statistiques (précision assez moyenne)
        maximale : 0, // Vitesse maximale relevée
        distance : 0, // Distance parcourue depuis le début de l'exercice, en km, arrondie à deux chiffres après la virgule
        temps    : 0, // Temps écoulé depuis le début de l'exercice, en secondes
        moyenne  : 0  // Vitesse moyenne, en km/h, arrondie à un chiffre après la virgule, calculée à partir de la distance et du temps
}

// Cette ligne seule gère la géolocalisation via l'API HTML5 en utilisant le GPS (enableHighAccuracy : true)
navigator.geolocation.watchPosition(geolocalisation_reussie, geolocalisation_impossible, { timeout : 5000, enableHighAccuracy : true, maximumAge : options.delai });

// La géolocalisation a réussi? Yee-ah!
function geolocalisation_reussie(position){
    if(!isNaN(localisation.date)) // Si l'on est à au moins notre deuxième mesure, on stocke l'ancien timestamp pour plus tard
        ancien_timestamp = localisation.date;
    
    localisation.accroche  = true; // On a accroché le GPS
    localisation.date      = new Date().getTime(); // On choppe le timestamp actuel
    
    localisation.longitude = Math.round(position.coords.longitude / options.arrondi) * options.arrondi; // On arrondi la longitude à options.arrondi chiffres après la virgule
    localisation.latitude  = Math.round(position.coords.latitude / options.arrondi) * options.arrondi; // On arrondi la latitude à options.arrondi chiffres après la virgule
    localisation.precision = Math.ceil(position.coords.accuracy); // On arrondit (toujours au dessus) la précision du relevé

    vitesse.actuelle = Math.round(position.coords.speed * 36) / 10;  // On arrondi la vitesse convertie de m/s vers km/h à un chiffre après la virgule
    
    if(vitesse.actuelle > vitesse.maximale) // On a dépassé la vitesse maximale? On change la valeur de vitesse.maximale
        vitesse.maximale = vitesse.actuelle; 
        
    if(vitesse.actuelle > 4 && !isNaN(ancien_timestamp)){ // Si la vitesse est supérieure à 4 km/h (précision oblige) et que l'on est à au moins notre seconde mesure, c'est que l'on est en mouvement et que l'on peut trouver la distance et le temps de parcours
        vitesse.temps    += Math.round((localisation.date - ancien_timestamp) / 1000); // On calcule le temps entre les deux mesures
        vitesse.distance += Math.round((vitesse.actuelle * ((localisation.date - ancien_timestamp) / 3600000)) * 100) / 100;  // On calcule la distance parcourue à partir du temps et de la vitesse
    }
    
    if(!isNaN(vitesse.distance) && !isNaN(vitesse.temps)) // On calcule la vitesse en km/h
        vitesse.moyenne = Math.round((vitesse.distance / (vitesse.temps / 3600)) * 10) / 10;
}

// La géolocalisation a raté? Et m... ince!
function geolocalisation_impossible(){
    localisation.accroche = false; // On a perdu le GPS :-(
}