<?php
    /*
     * css.php est le *SEUL* fichier css à charger. Il s'occupe de minifier les fichiers css présents dans css/
    */
    $css = null;
    
    $repertoire = opendir('css');
    while($contenu = readdir($repertoire)){
        if(!is_dir($contenu))
            $css .= file_get_contents('css/' . $contenu);
    }
    closedir($repertoire);
    
    $mauvaises_choses = array(
      "\r",
      "\t",
      "\n\n",
      "\n",
      '  ',
      '   ',
    );
    
    $css = preg_replace('/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/m', '', $css);
    $css = str_replace($mauvaises_choses, '', $css);
    $css = str_replace(': ', ':', $css);
    $css = str_replace(', ', ',', $css);
    $css = str_replace(';}', '}', $css);
    
    header('Content-type: text/css; charset=utf-8'); // Encodage
    // On empeche la mise en cache
    $ts = gmdate('D, d M Y H:i:s') . ' GMT';
    header('Expires: ' . $ts);
    header('Last-Modified: ' . $ts);
    header('Pragma: no-cache');
    header('Cache-Control: no-cache, must-revalidate');
    
    echo $css;
?>
