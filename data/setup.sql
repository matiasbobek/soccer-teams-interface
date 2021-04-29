DROP TABLE IF EXISTS teams;
CREATE TABLE IF NOT EXISTS soccer_teams(
  tla TEXT PRIMARY KEY NOT NULL,
  team_name TEXT,
  crest_url TEXT,
  crest_file TEXT,
  website TEXT,
  email TEXT,
  founded INTEGER,
  club_colors TEXT,
  venue TEXT,
  created_at DATE DEFAULT (datetime('now')) NOT NULL,
  updated_at DATE DEFAULT (datetime('now')) NOT NULL
);


INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('AST', 'Aston Villa FC', 'https://upload.wikimedia.org/wikipedia/de/9/9f/Aston_Villa_logo.svg', NULL, 'http://www.avfc.co.uk', NULL,1872,'Claret / Sky Blue','Villa Park' )  
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('ARS', 'Arsenal FC', 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', NULL, 'http://www.arsenal.com', 'info@arsenal.co.uk',1886,'Red / White','Emirates Stadium' )  


UPDATE soccer_teams SET team_name = 'CALCIO FC' WHERE tla = "ARS"