const bluebird = require('bluebird');

const prompt = bluebird.promisifyAll(require('prompt'));
const fs = bluebird.promisifyAll(require('fs'));

// We declare an async function that we will run below, so that we may use await.
async function main() {
  const getFileOperation = {
    name: 'fileName',
    description: 'What file do you want to open?'
  };

  // Gets result of user input
  let promptResult = await prompt.getAsync([getFileOperation]);
  console.log(promptResult);
  const fileName = promptResult.fileName;

  if (!fileName) {
    throw 'Need to provide a file name';
  }

  console.log(`About to read ${fileName} if it exists`);

  const fileContent = await fs.readFileAsync(fileName, 'utf-8');

  const reversedContent = fileContent.split('').reverse().join('');

  const reversedName = `reversed_${fileName}`;

  // Now we have the actual file data read
  console.log('before write');
  await fs.writeFileAsync(reversedName, reversedContent);
  console.log('Finished!');

  return null;
}

// Now we run it
main().catch((err) => {
  console.log(err);
});

console.log('After prompt');
