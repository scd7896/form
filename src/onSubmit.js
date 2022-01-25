/**
 * 
 * @param {function} callback (arg: object | Formdata) => void
 * @param {{ isExcuteDefault?: boolean }} option  
 * @returns 
 */
const onSubmit = (callback, option) => (e) => {
	if (!option || !option.isExcuteDefault) {
		e.preventDefault();
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

		if (splitKey.length === 1) obj[target.name] = target.value; 
		else if (splitKey.length > 1) assocPath(splitKey, target.value, obj);
			
	}	

	if (typeof callback === "function") {
		callback(obj)
	}
}

export default onSubmit;

export const assocPath = (path, val, obj) => {
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

