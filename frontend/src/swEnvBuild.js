const fs = require("fs");

// This dotenv is the one used inside React.
// Load dotenv Intentionally because build process does not have access to .env file yet.
const dotenv = require("dotenv");
dotenv.config();

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env;

const content = `const swEnv = {
    REACT_APP_FIREBASE_API_KEY: '${REACT_APP_FIREBASE_API_KEY}',
    REACT_APP_FIREBASE_AUTH_DOMAIN: '${REACT_APP_FIREBASE_AUTH_DOMAIN}',
    REACT_APP_FIREBASE_PROJECT_ID: '${REACT_APP_FIREBASE_PROJECT_ID}',
    REACT_APP_FIREBASE_STORAGE_BUCKET: '${REACT_APP_FIREBASE_STORAGE_BUCKET}',
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '${REACT_APP_FIREBASE_MESSAGING_SENDER_ID}',
    REACT_APP_FIREBASE_APP_ID: '${REACT_APP_FIREBASE_APP_ID}',
 }`;

fs.writeFileSync("./public/swEnv.js", content);
