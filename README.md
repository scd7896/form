### Install

    npm install web-form-helper
# API
## onSubmit
|argument|type
|--|--
|callback|(obj: `Object`or `FormData`) => `FormEventFunction`
|options|`ISubmitOptions`or `undefined`

#### type
|name|values|types|descriptions
|--|--|--|--
|ISubmitOptions| `{}`
||isExcuteDefault|`boolean` or `undefined`| Indicates whether to execute an action that is basically hanging on the event. The default is false.
||validate|`(validateParameter: T) => string or IFailValidateReturnType or undefined`| Write a logic that verifies yourself. Return the name of the part where the verification error occurs, or return according to the `IFailValidateReturnType`. If there is none, do not return.
||onInvalid|`(targetInvalidElement?: HTMLElement, invalidData?: IFailValidateReturnType or string) => void`|If there is anything returned from the `validate`, it will be executed.
|IFailValidateReturnType|`{}`|`Object`|I'm the type to return on the `validate`.
||name|`string`|validate 오류가 발생한 input의 name으로 필수 입니다.
||message|`string` or `undefined`|validate 오류가 발생 할 때, 추가적으로 메세지를 작성해서 return 합니다. 기본은 `undefined`입니다.
||index|`number` or `undefined`|`validate` This is a field that tells you which number occurred if there is the same name among the inputs where the error occurred. The default is zero.
#### Input description
|input-type|Object-value-type|
|--|--|
|`date`| `Date`
|`datetime` or `datetime-local`|`Date`
|`number`|`number`
|`checkbox`|`Array<string>`
|`file`|`File`
|`range`|`number`
|`radio`|`string`
|`etc...`|`string`
## onInvalid
|argument|type
|--|--
|callback|`(failTarget?: HTMLElement, reason: failReason?: "valueMissing" or "valid" or "typeMismatch" or "tooShort" or "tooLong" or "rangeUnderflow" or "rangeOverflow" or "badInput" or "customError" or "patternMismatch") => void`
|options|`IInvalidOption or undefined`
#### type
|name|values|types|descriptions
|--|--|--|--
|IInvalidOption|`{}`
||isExcuteDefault|`boolean` or `undefined`|Indicates whether to execute an action that is basically hanging on the event. The default is false.

### Examples
#### React
```jsx

import React from 'react';
import { onSubmit } from 'web-form-helper';

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
import { onSubmit, onInvalid } from 'web-form-helper';

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
import { onSubmit, onInvalid } from 'web-form-helper';

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
