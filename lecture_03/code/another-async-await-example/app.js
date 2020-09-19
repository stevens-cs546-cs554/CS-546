const getData = require('./getdata');

async function main() {
  //try removing the await keyword and run the application
  console.log(await getData.getApiData());
}

main();

/*	this console.log will not be blocked as it does not 
depend on the results of main so it will execute before 
main is finished */
console.log('after main is run');
