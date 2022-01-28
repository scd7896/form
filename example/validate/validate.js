
var form = document.getElementById("form");

function objSubmitListener(param) {
	console.log(param)
}

function invalidListener(failElement, reason) {
	console.log(failElement, reason);
}

function submitValidate(obj) {
	if (obj.number[0] <= 2) return { name: "number", index: 0, message: "The first number must be greater than 2." };
	if (obj.number[1] <= 4) return { name: "number", index: 1, message: "The second number must be greater than 4." };
	if (obj.number[0] >= obj.number[1]) return { name: "number", message: "The first number should be less than the second number." }
	if (obj.textName.length === 0) return "textName";
}

function submitInvalid(element, invalidData) {
	if (invalidData.message) {
		alert(invalidData.message);
	}

	if (invalidData === "textName") {
		alert("The textName length must be greater than 0.")
	}

	element.style.border = "1px solid red";
}

form.addEventListener("submit", Form.onSubmit(objSubmitListener, { validate: submitValidate, onInvalid: submitInvalid }), false)

form.addEventListener("invalid", Form.onInvalid(invalidListener))