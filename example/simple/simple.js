import { onSubmit } from '../../index.js'
const form = document.querySelector("#form");

const objSubmitListener = (param) => {
	console.log(param);
}

form.addEventListener("submit", onSubmit(objSubmitListener))