const bluebird = require("bluebird");
const Promise = bluebird.Promise;

const prompt = bluebird.promisifyAll(require("prompt"));
const fs = bluebird.promisifyAll(require("fs"));

// We declare an async function that we will run below, so that we may use await.
async function main() {
  const getFileOperation = {
    name: "fileName",
    description: "What file do you want to open?"
  };

  // Gets result of user input
  let promptResult = await prompt.getAsync([getFileOperation]);
  const fileName = promptResult.fileName;

  if (!fileName) {
    throw "Need to provide a file name";
  }

  console.log(`About to read ${fileName} if it exists`);
  const thisIsAPromise = fs.readFileAsync(fileName, "utf-8");

  thisIsAPromise.then(fileContent => {
    /* BLOCK X */
    // Now we have the actual file data read
    const reversedContent = fileContent
      .split("")
      .reverse()
      .join("");

    const reversedName = `reversed_${fileName}`;
    return reversedName;
    /* END BLOCK X */
  });

  /* BLOCK Y */
  const fileContent = await thisIsAPromise;

  // Now we have the actual file data read
  const reversedContent = fileContent
    .split("")
    .reverse()
    .join("");

  const reversedName = `reversed_${fileName}`;
  /* END BLOCK Y */

  /* BLOCK X and BLOCK Y are functionally equivalent */

  await fs.writeFileAsync(reversedName, reversedContent);
  console.log("Finished!");

  return null;
}

// Now we run it
main().catch(err => {
  console.log(err);
});
