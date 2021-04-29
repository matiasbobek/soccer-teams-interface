/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

const db = require('better-sqlite3')('../data/teams.db');
const fs = require('fs');
const entities = require('./entities');

/* const row = db.prepare('SELECT * FROM soccer_teams WHERE tla = ?').get("ARS");
console.log(row.firstName, row.lastName, row.email); */

module.exports = {
  mapTeamsFromData: function mapTeamsFromData() {
    const teams = [];
    const data = db.prepare('SELECT * FROM soccer_teams');
    for (const team of data.iterate()) {
      teams.push(new entities.SoccerTeam(team.team_name, team.crest_url, team.crest_file || null, team.website, team.email, team.founded, team.club_colors, team.venue, team.tla));
    }
    console.log(teams);
    return teams;
  },
  addTeamToData: function addTeamToData(team) {
    db.exec(`INSERT INTO soccer_teams (tla, team_name, crest_url, crest_file, website, email, founded, club_colors, venue) VALUES ('${team.tla}', '${team.name}', NULL, '${team.crestFileName}', '${team.website}', '${team.email}',${team.founded},' ${team.clubColors}','${team.venue}' )  `);
  },
  modifyTeamInData: function modifyTeamInData(team) {
    db.exec(`UPDATE soccer_teams SET team_name = '${team.name}', crest_file = '${team.crestFileName}',website = '${team.website}', email= '${team.email}',founded=${team.founded},club_colors= '${team.clubColors}', venue= '${team.venue}' WHERE tla ='${team.tla}'`);
    if (team.crestFileName) {
      db.exec(`UPDATE soccer_teams SET crest_url=NULL WHERE tla ='${team.tla}'`);
      team.crestUrl = null;
    }
    return team;
  },
  deleteTeamFromData: function deleteTeamFromData(teamTla) {
    db.exec(`DELETE FROM soccer_teams WHERE tla = '${teamTla}'`);
  },
};
