// config file for google sheets stuff.
import keyer from './googleapikey.js'

export default {
  apiKey: keyer.key,
  discoveryDocs: 
    ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  spreadsheetId: "1-rFmCU1GmF0UgtWlJKa8NetNFzTnB_TIBU2ap-cP-EU"
};