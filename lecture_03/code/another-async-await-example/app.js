const getData = require('./getdata');

async function main() {
  //try removing the await keyword and run the application
  console.log(await getData.getApiData());
}

//comment this out if you uncomment main2 below
main();

/*	
	this console.log will not be blocked as it does not  depend 
	on the results of main so it will execute before 
	main is finished 
*/
console.log('After main is run');

//Say we want the console.log to happen after main has
//done it's job, we await main, then the code after the
//function call to main will execute after main is complete

// async function main2() {
// 	console.log('*******************************');
// 	console.log('*************MAIN2 CALL**************');
// 	console.log('*******************************');
// 	await main();
// 	console.log('After main is run, but we awaited it this time');
// }

// main2();
