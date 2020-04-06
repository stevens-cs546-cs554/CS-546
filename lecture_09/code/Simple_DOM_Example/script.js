let myForm = document.getElementById('myForm');
let textInput = document.getElementById('text_input');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('list');
if (myForm) {
	myForm.addEventListener('submit', (event) => {
		event.preventDefault();
		if (textInput.value) {
			errorDiv.hidden = true;
			let li = document.createElement('li');
			li.innerHTML = textInput.value;
			myUl.appendChild(li);
			myForm.reset();
			textInput.focus();
		} else {
			errorDiv.hidden = false;
			errorDiv.innerHTML = 'You Must Enter a value!';
			textInput.focus();
		}
	});
}

// let myP = document.getElementById('myP');
// myP.innerHTML = 'I have been changed';
// let myBtnTwo = document.getElementById('myBtnTwo');
// let myDiv = document.getElementById('error');
// let divBtn = document.getElementById('divBtn');
// let divContainer = document.getElementById('container');
// let ul = document.getElementById('list');

// function btnClick() {
// 	if (myP.className == 'myClassOne') {
// 		myP.className = 'myClassTwo';
// 		myP.innerHTML = 'I am now class Two';
// 	} else {
// 		myP.className = 'myClassOne';
// 		myP.innerHTML = 'I am now class One';
// 	}
// }

// myBtnTwo.addEventListener('click', () => {
// 	//alert('btn two has been clicked');

// 	if (myDiv.hidden == true) {
// 		myDiv.hidden = false;
// 	} else {
// 		myDiv.hidden = true;
// 	}
// });

// divBtn.addEventListener('click', () => {
// 	let newP = document.createElement('p');
// 	newP.innerHTML = "I'm another P tag";
// 	divContainer.appendChild(newP);
// });

// function addItem() {
// 	let li = document.createElement('li');
// 	li.innerHTML = "I'm an item";
// 	ul.appendChild(li);
// }
