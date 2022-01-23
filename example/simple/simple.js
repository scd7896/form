
const form = document.querySelector("#form");

const objSubmitListener = (param) => {
	console.log(param);
}

const invalidListener = () => {

}

form.addEventListener("submit", Form.onSubmit(objSubmitListener), false)

form.addEventListener("invalid", Form.onInvalid(invalidListener), { capture: true })