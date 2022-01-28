### Install

    npm install form-event-helper

### Examples
#### React
```jsx

import React from 'react';
import { onSubmit } from 'form-event-helper';

function App() {
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={onSubmit(onSubmit)}>
      <input name="firstname" />
      <input name="lastname" />
      
      <input name="age" type="number" />
      <button htmlType="submit">submut</button>
    </form>
  );
}
```
#### PLAIN HTML && PLAIN JS
```html
--- html ---
<html>
  <body>
    <form id="form">
      <input name="firstname" />
      <input name="lastname" />
      
      <input name="age" type="number" />
      <button htmlType="submit">submut</button>
    </form>
    <script src="index.js"></script>
  </body>
</html>
```
```js 
--- index.js ---
import { onSubmit, onInvalid } from 'form-event-helper';

var form = document.getElementById("form");

function objSubmitListener(param) {
	console.log(param)
}

function invalidListener(failElement, reason) {
	console.log(failElement, reason);
}

form.addEventListener("submit", onSubmit(objSubmitListener), false)

form.addEventListener("invalid", onInvalid(invalidListener), { capture: true })

```

## Validate Examples
```js
import { onSubmit, onInvalid } from 'form-event-helper';

var form = document.getElementById("form");

function objSubmitListener(param) {
	console.log(param)
}

function invalidListener(failElement, reason) {
	console.log(failElement, reason);
}

function submitValidate(obj) {
	// Please return the information about the part where the verification error occurs.
	// if not error return undefined or null or void
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

form.addEventListener("submit", onSubmit(objSubmitListener, { validate: submitValidate, onInvalid: submitInvalid }), false)

form.addEventListener("invalid", onInvalid(invalidListener), { capture: true })
```