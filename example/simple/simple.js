
var form = document.getElementById("form");

function objSubmitListener(param) {
	console.log(param)
}

function invalidListener(failElement, reason) {
	console.log(failElement, reason);
}

form.addEventListener("submit", Form.onSubmit(objSubmitListener), false)

form.addEventListener("invalid", Form.onInvalid(invalidListener), { capture: true })