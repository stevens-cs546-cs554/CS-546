const bcrypt = require('bcrypt');
const saltRounds = 16;

async function main() {
  const plainTextPassword = 'mySuperAwesomePassword';
  const hash = await bcrypt.hash(plainTextPassword, saltRounds);
  console.log(hash);

  let compareToMerlin = false;

  try {
    compareToMerlin = await bcrypt.compare('elementarymydearwatson', '$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.');
  } catch (e) {
    //no op
  }

  if (compareToMerlin) {
    console.log("The passwords match.. this shouldn't be");
  } else {
    console.log('The passwords do not match');
  }

  let compareToMatch = false;

  try {
    compareToMatch = await bcrypt.compare('mySuperAwesomePassword', hash);
  } catch (e) {
    //no op
  }

  if (compareToMatch) {
    console.log('The passwords match.. this is good');
  } else {
    console.log(
      'The passwords do not match, this is not good, they should match'
    );
  }
}

main();
