SELECT content, tab_id, difficulty, rating, tab_rates, name, artist
FROM tablist
WHERE url = $1;