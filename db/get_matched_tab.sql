SELECT tab_content, tab_id, difficulty, rating, tab_rates, song_name, artist
FROM tablist
WHERE tab_url = $1;