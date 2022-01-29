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
||isExcuteDefault|`boolean` or `undefined`| 이벤트에 기본적으로 걸려있는 액션을 실행하는 것의 여부를 나타냅니다. 기본은 false 입니다.
||validate|`(validateParameter: T) => string or IFailValidateReturnType or undefined`| 직접 검증하는 로직을 작성합니다. 검증 오류가 나는 부분의 name을 return하거나, `IFailValidateReturnType`에 맞게 return 합니다. 없을 경우 return 하지 않습니다.
||onInvalid|`(targetInvalidElement?: HTMLElement, invalidData?: IFailValidateReturnType or string) => void`|validate에서 return 받은 것이 있을 경우 실행하게 됩니다.
|IFailValidateReturnType|`{}`|`Object`|validate에서 return 하는 타입으로 다음과 같은 형식으로 return 을 하게 됩니다.
||name|`string`|validate 오류가 발생한 input의 name으로 필수 입니다.
||message|`string` or `undefined`|validate 오류가 발생 할 때, 추가적으로 메세지를 작성해서 return 합니다. 기본은 `undefined`입니다.
||index|`number` or `undefined`|validate 오류가 발생 한, input 중에서 동일한 name이 있을 경우에 몇 번째에서 발생한지 알려줄주는 필드 입니다. 기본은 0입니다.
#### Input description
|input-type|Object-value-type|
|--|--|
|`date`| `Date`
|`datetime | datetime-local`|`Date`
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
||isExcuteDefault|`boolean` or `undefined`|이벤트에 기본적으로 걸려있는 액션을 실행하는 것의 여부를 나타냅니다. 기본은 false 입니다.

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
