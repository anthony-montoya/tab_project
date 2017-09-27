SELECT tablist.artist, tablist.song_name, tablist.difficulty, tablist.type, tablist.tab_content
FROM tablist
JOIN favorites ON tablist.tab_id = favorites.tab_id
JOIN users ON favorites.user_id = users.user_id
WHERE users.user_id = $1;