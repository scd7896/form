
const form = document.querySelector("#form");

const objSubmitListener = (param) => {
	console.log(param);
}

const invalidListener = (failElement, reason) => {
	console.log(failElement, reason);
}

form.addEventListener("submit", Form.onSubmit(objSubmitListener), false)

form.addEventListener("invalid", Form.onInvalid(invalidListener), { capture: true })