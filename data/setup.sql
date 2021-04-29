DROP TABLE IF EXISTS soccer_teams;
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
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('CHE', 'Chelsea FC', 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', NULL, 'http://www.chelseafc.com', NULL,1905,'Royal Blue / White','Stamford Bridge' )  
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('EVE', 'Everton FC', 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg', NULL, 'http://www.evertonfc.com', 'everton@evertonfc.com',1878,'Blue / White','Goodison Park' )  
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('LIV', 'Liverpool FC', 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', NULL, 'http://www.liverpoolfc.tv', 'customercontact@liverpoolfc.tv',1892,'Red / White','Anfield' )  
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('MCI', 'Manchester City FC', 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', NULL, 'https://www.mancity.com', 'mancity@mancity.com',1880,'Sky Blue / White','Etihad Stadium' )  
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('MUN', 'Manchester United FC', 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg', NULL, 'http://www.manutd.com', 'enquiries@manutd.co.uk',1878,'Red / White','Old Trafford' )  
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('NEW', 'Newcastle United FC', 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg', NULL, 'http://www.nufc.co.uk', 'admin@nufc.co.uk',1881,'Black / White','St. James Park' )  
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('NOR', 'Norwich City FC', 'https://upload.wikimedia.org/wikipedia/en/8/8c/Norwich_City.svg', NULL, 'http://www.canaries.co.uk', 'reception@ncfc-canaries.co.uk',1902,'Yellow / Green','Carrow Road' )  
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('TOT', 'Tottenham Hotspur FC', 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg', NULL, 'http://www.tottenhamhotspur.com', 'customer.care@tottenhamhotspur.com',1882,'Navy Blue / White','Tottenham Hotspur Stadium' )  
INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('LEI', 'Leicester City FC', 'https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg', NULL, 'http://www.lcfc.com', NULL,1884,'Royal Blue / White','King Power Stadium' )  
