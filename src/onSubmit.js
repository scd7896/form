import * as parsing from './parsing'
/**
 * 
 * @param {function} callback (arg: object | Formdata) => void
 * @param {{ isExcuteDefault?: boolean, validate?: (obj: any) => void, onInvalid?: (targetInvalid: HTMLElement, name: string) => void }} option  
 * @returns 
 */
const onSubmit = (callback, option) => (e) => {
	if (!option || !option.isExcuteDefault) {
		e.preventDefault && e.preventDefault();
	}

	if (e.target.encType === "multipart/form-data") {
		const formData = new FormData(e.target);

		if (typeof callback === "function") {
			callback(formData);
		}
		return;
	}

	const obj = {};

	for (let i = 0; i < e.target.elements.length; i++) {
		const target = e.target.elements[i];
		const splitKey = target.name.split('.');
		const value = parsing[target.type] ? parsing[target.type](target.value) : target.value;
		if (splitKey.length === 1) obj[target.name] = value; 
		else if (splitKey.length > 1) assocPath(splitKey, value, obj);
	}	

	let result = undefined;

	if (option?.validate) result = option.validate(obj);

	if (result) {
		if (typeof option?.onInvalid === "function") {
			let elements = e.target.getElementsByName(result);

			option.onInvalid(elements[0], result);
		}
	} else {
		if (typeof callback === "function") {
			callback(obj)
		}
	}
}

export default onSubmit;

const assocPath = (path, val, obj) => {
	if (path.length === 0) return val;
	const index = path[0];
	if (path.length > 1) {
		const nextObj = obj && obj[index] ? obj[index] : {};
		path.shift();
		val = assocPath(path, val, nextObj);
	}
	const numIndex = Number(index);

	if (!isNaN(numIndex)) {
		const arr = [].concat(obj);
		arr[numIndex] = val;
		return arr;
	} else {
		obj[index] = val;
	}
	return obj;
};

