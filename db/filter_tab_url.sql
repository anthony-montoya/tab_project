SELECT EXISTS
    (SELECT tab_html 
        FROM tablist 
        WHERE url = $1);