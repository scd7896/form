import parsing from './parsing'

/**
 * @param {function} callback (arg: object | Formdata) => void
 * @param {{ 
 * 	isExcuteDefault?: boolean, 
 * 	validate?: (obj: any) => string | undefined | {
 * 			name: string, 
 * 			message?: string, 
 * 			index?: number
 * 	}, 
 * 	onInvalid?: (targetInvalid: HTMLElement, data: {
 * 		name: string, 
 * 		message?: string, 
 * 		index?: number
 * 	}) => void
 * }} option  
 * @returns 
 */
const onSubmit = (callback, option) => (e) => {
	if (!option || !option.isExcuteDefault) {
		e.preventDefault && e.preventDefault();
	}

	const obj = {};

	for (let i = 0; i < e.target.elements.length; i++) {
		const target = e.target.elements[i];
		if (target.name) {
			const value = parsing[target.type] ? parsing[target.type](target) : target.value;
			if (value === null) continue;

			if (obj[target.name]) {
				if (Array.isArray(obj[target.name])) {
					obj[target.name].push(value);
				} else {
					obj[target.name] = [obj[target.name], value]; 
				}
			} else {
				if (target.type === "checkbox")	{
					obj[target.name] = [value]
				} else {
					obj[target.name] = value;
				}
			}			
		}
	}	

	let result = undefined;

	if (option?.validate) result = option.validate(obj);

	if (typeof result === "string") {
		if (typeof option?.onInvalid === "function") {
			let elements = e.target.getElementsByName(result);

			option.onInvalid(elements[0], result);
		}
		return;
	} 

	if (typeof result === "object") {
		if (typeof result.name === "string" && typeof option?.onInvalid === "function") {
			let elements = e.target.getElementsByName(result.name);
			const element = result.index ? elements[index] : elements[0];
			option.onInvalid(element, result);
		}
		return;
	}

	if (e.target.encType === "multipart/form-data" || e.target.enctype === "multipart/form-data") {
		const formData = new FormData(e.target);

		if (typeof callback === "function") {
			callback(formData);
		}
		return;
	}

	const keys = Object.keys(obj);
	const submitObject = {};
	
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const splitKey = key.split('.');
		if (splitKey.length === 1) submitObject[key] = obj[key];
		else if (splitKey.length > 1) assocPath(splitKey, obj[key], submitObject);
	}
	
	if (typeof result === "undefined" && typeof callback === "function") {
		callback(submitObject)
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

