/**
 * 
 * @param {Function} onFaild (failTarget: HTMLElement, failReason: "valueMissing" | "valid" | "typeMismatch" | "tooShort" | "tooLong" | "rangeUnderflow" | "rangeOverflow" | "badInput" | "customError" | "patternMismatch") => void
 * @param {{ isExcuteDefault?: boolean }} option 
 * @returns 
 */
const onInvalid = (onFaild, option) => (e) => {
	if (!option || !option.isExcuteDefault) {
		e.stopPropagation();
		e.preventDefault();
	}

	if (typeof onFaild === "function") {
		const validates = ["valueMissing", "valid", "typeMismatch", "tooShort", "tooLong", "rangeUnderflow", "rangeOverflow", "badInput", "customError", "patternMismatch"];
		for (const validate of validates) {
			if (e.target.validity[validate]) return onFaild(e.target, validate)
		}
		return onFaild(e.target, "");
	}
}

export default onInvalid;