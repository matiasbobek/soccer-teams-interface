module.exports = {
  SoccerTeam: class SoccerTeam {
    constructor(name, crestUrl, crestFileName, website, email, foundationYear, colors, venue, tla) {
      this.name = name;
      this.crestUrl = crestUrl;
      this.crestFileName = crestFileName;
      this.website = website;
      this.email = email;
      this.founded = foundationYear;
      this.clubColors = colors;
      this.venue = venue;
      this.tla = tla;
    }
  },
};
