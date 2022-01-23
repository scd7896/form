/**
 * 
 * @param {Function} onFaild (failTarget: HTMLElement, failReason: "valueMissing" | "valid" | "typeMismatch" | "tooShort" | "tooLong" | "rangeUnderflow" | "rangeOverflow" | "badInput" | "customError" | "patternMismatch") => void
 * @param {{ isExcuteDefault?: boolean }} option 
 * @returns 
 */
const onInvalid = (onFaild, option) => (e) => {
	if (!option.isExcuteDefault) {
		e.stopPropagation();
		e.preventDefault();
	}

	if (typeof onFaild === "function") {
		const validates = Object.keys(e.target.validity);
		for (const validate of validates) {
			if (e.target.validity[validate]) return onFaild(e.target, validate)
		}
		return onFaild(e.target, "");
	}
}

export default onInvalid;