module.exports = {
  SoccerTeam: class SoccerTeam {
    constructor(name, crestUrl, website, email, foundationYear, colors, venue, tla) {
      this.name = name;
      this.crestUrl = crestUrl;
      this.website = website;
      this.email = email;
      this.foundationYear = foundationYear;
      this.colors = colors;
      this.venue = venue;
      this.tla = tla;
    }
  },
};
