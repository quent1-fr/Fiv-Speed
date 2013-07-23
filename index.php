<!DOCTYPE html>
<html>
	<head>
		<title>Fiv' Speed</title>
		<meta charset="utf-8" />
		<link type="text/css" rel="stylesheet" href="ressources/css.php" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	</head>
	<body>		
		<!-- Affichage de la vitesse -->
		<div id="vitesse"></div>		
		<img id="gps" />
		
		<button onclick="parler('Vous roulez à ' + vitesse.actuelle + ' kilomètres heure. Votre vitesse maximale est de ' + vitesse.maximale + ' kilomètres heure et votre vitesse moyenne est de ' + vitesse.moyenne + ' kilomètres heure. Vous roulez depuis ' + Math.round(vitesse.temps / 60) + ' minutes.');" style="width:100%;border:1px solid #B52B2B;background: #E23434;color: #fff;padding: 10px;">Parler</button>
		<div id="debug" style="padding: 5px;"></div>
		
		<script>			
			var options = {
			    arrondi  : 0.00001, // Détermine la précision de la latitude et de la longitude. Voyez http://gis.stackexchange.com/a/8674
			    delai    : 2000    // Délai, en millisecondes, entre chaque mesure. Une valeur trop petite rendra le programme lent et imprécis
			}
		</script>
		
		<script src="ressources/js.php"></script>
		
		<script>
			function watch() {
				debug = '';
				
				debug +='<strong>Latitude:</strong> ' + localisation.latitude + '<br />';
				debug +='<strong>Longitude:</strong> ' + localisation.longitude + '<br />';
				debug +='<strong>Précision:</strong> ' + localisation.precision + ' m<br /><br />';
				
				debug +='<strong>Date: </strong>' + localisation.date + '<br />';	
				debug +='<strong>Distance: </strong>' + vitesse.distance + ' km<br />';
				debug +='<strong>Temps: </strong>' + vitesse.temps + ' s<br /><br />';
				
				debug +='<strong>Vitesse: </strong>' + vitesse.actuelle + ' km.h<sup>-1</sup><br />';
				debug +='<strong>Moyenne: </strong>' + vitesse.moyenne + ' km.h<sup>-1</sup><br />';
				debug +='<strong>Maximale: </strong>' + vitesse.maximale + ' km.h<sup>-1</sup><br /><br />';
				
				debug +='<strong>Géolocalisation en cours?</strong> ' + localisation.accroche;
				
				document.getElementById('debug').innerHTML = debug;
				
				if(localisation.accroche)
					document.getElementById('gps').src = 'ressources/images/gps.png';
				else
					document.getElementById('gps').src = 'ressources/images/gps_indisponible.png';
				
				document.getElementById('vitesse').innerHTML = Math.floor(vitesse.actuelle);
				
				setTimeout('watch()', 500);
			}
			
			watch();
		</script>
	</body>
</html>
