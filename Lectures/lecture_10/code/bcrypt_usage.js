const bcrypt = require("bcrypt");
const saltRounds = 16;

async function main() {
  const plainTextPassword = "mySuperAwesomePassword";
  // This hash will change each time it's generated!
  // That's one of the wonderful things about bcrypt -- even
  // though the has changes, you can still compare the unhashed version
  // successfully
  const hash = await bcrypt.hash(plainTextPassword, saltRounds);

  console.log(hash);
  let compareToMerlin = false;

  try {
    compareToMerlin = await bcrypt.compare("merlinsbeard", hash);
  } catch (e) {
    // no op
  }

  if (compareToMerlin === true) {
    console.log("merlinsbeard matches the hash");
  } else {
    console.log("merlinsbeard does not match the hash");
  }

  let compareToMatch = false;

  try {
    compareToMatch = await bcrypt.compare("mySuperAwesomePassword", hash);
  } catch (e) {
    // no op
  }
  if (compareToMatch === true) {
    console.log("mySuperAwesomePassword matches the hash");
  } else {
    console.log("mySuperAwesomePassword does not match the hash");
  }
}

main();
