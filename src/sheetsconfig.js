// config file for google sheets stuff.
require('dotenv').config();

export default {
  apiKey: process.env.REACT_APP_GOOGLE_KEY,
  discoveryDocs: 
    ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  spreadsheetId: "1-rFmCU1GmF0UgtWlJKa8NetNFzTnB_TIBU2ap-cP-EU"
};