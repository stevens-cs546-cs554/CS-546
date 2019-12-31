const bluebird = require("bluebird");
const Promise = bluebird.Promise;

const prompt = bluebird.promisifyAll(require("prompt"));
const fs = bluebird.promisifyAll(require("fs"));

const getFileOperation = {
  name: "fileName",
  description: "What file do you want to open?"
};

prompt
  .getAsync([getFileOperation])
  .then(function(result) {
    const fileName = result.fileName;
    if (!fileName) {
      throw "Need to provide a file name";
    }

    console.log(`About to read ${fileName} if it exists`);

    return fileName;
  })
  .then(function(fileName) {
    return fs.readFileAsync(fileName, "utf-8").then(function(data) {
      return { fileName: fileName, fileContent: data };
    });
  })
  .then(function(fileInfo) {
    const fileName = fileInfo.fileName;
    const fileContent = fileInfo.fileContent;

    // Now we have the actual file data read
    const reversedContent = fileContent
      .split("")
      .reverse()
      .join("");

    const reversedName = `reversed_${fileName}`;

    return fs.writeFileAsync(reversedName, reversedContent);
  })
  .then(function() {
    console.log("Finished!");

    return null;
  })
  .catch(function(err) {
    if (err) {
      // Exit out, something went wrong!!!
      throw err;
    }
  });
