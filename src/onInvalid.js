/**
 * 
 * @param {Function} onFaild (failTarget: HTMLElement, failReason: "valueMissing" | "valid" | "typeMismatch" | "tooShort" | "tooLong" | "rangeUnderflow" | "rangeOverflow" | "badInput" | "customError" | "patternMismatch") => void
 * @param {object} option 
 * @returns 
 */
const onInvalid = (onFaild, option) => (e) => {
	e.stopPropagation();
	e.preventDefault();

	if (typeof onFaild === "function") {
		const validates = Object.keys(e.target.validity);
		for (const validate of validates) {
			if (e.target.validity[validate]) return onFaild(e.target, validate)
		}
		return onFaild(e.target, "");
	}
}

export default onInvalid;