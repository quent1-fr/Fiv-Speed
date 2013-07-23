<?php
    /*
     * js.php est le *SEUL* fichier js à charger. Il s'occupe d'inclure tout les scripts js présents dans javascript/
    */
    
    $javascript = null;
    
    $repertoire = opendir('javascript');
    while($contenu = readdir($repertoire)){
        if(!is_dir($contenu))
            $javascript .= file_get_contents('javascript/' . $contenu);
    }
    closedir($repertoire);
    
    header('Content-type: text/javascript; charset=utf-8'); // Encodage
    // On empeche la mise en cache
    $ts = gmdate('D, d M Y H:i:s') . ' GMT';
    header('Expires: ' . $ts);
    header('Last-Modified: ' . $ts);
    header('Pragma: no-cache');
    header('Cache-Control: no-cache, must-revalidate');
    
    echo $javascript;
?>
