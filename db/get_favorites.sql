SELECT tablist.tab_id, tablist.artist, tablist.name, tablist.difficulty, tablist.type, tablist.content, tablist.rating, tablist.tab_rates
FROM tablist
JOIN favorites ON tablist.tab_id = favorites.tab_id
JOIN users ON favorites.user_id = users.user_id
WHERE users.user_id = $1;