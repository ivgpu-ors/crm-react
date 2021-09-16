const fs = require('fs');

let key = '';

module.exports = function publicKey() {
  if (key) return key;

  try {
    key = fs.readFileSync(process.env.PUB_KEY_PATH).toString();
    return key;
  } catch (e) {
    console.log(`CAN'T READ PUBLIC KEY: ${process.env.PUB_KEY_PATH}`);
    console.log(e);
  }
}