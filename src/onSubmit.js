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
	console.dir(e.target)

	if (e.target.encType === "multipart/form-data") {
		
		return;
	}

	const formData = new FormData(e.target);

	const entries = formData.entries();

	const obj = {};

	for (const item of entries) {
			const splitKey = item[0].split('.');
			if (splitKey.length === 1) {
					obj[item[0]] = item[1];
			} else {
					assocPath(splitKey, item[1], obj);
			}
	}
	
	if (typeof callback === "function") {
			callback(obj);
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

