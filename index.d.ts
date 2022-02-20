export interface IFailValidateReturnType {
	name: string;
	message?: string;
	index?: number;
}

export interface ISubmitOptions<T> {
	isExcuteDefault?: boolean;
	validate?: (validateParameter: T) => string | undefined | IFailValidateReturnType;
	onInvalid?: (targetInvalidElement?: HTMLElement, invalidData?: IFailValidateReturnType & string) => void;
}

export function onSubmit<T>(callback: (arg: T | FormData) => void, options?: ISubmitOptions<T>): any;

type invalidCallback = (failTarget?: HTMLElement, failReason?: "valueMissing" | "valid" | "typeMismatch" | "tooShort" | "tooLong" | "rangeUnderflow" | "rangeOverflow" | "badInput" | "customError" | "patternMismatch") => void;

export interface IInvalidOption {
	isExcuteDefault?: boolean
}

export function onInvalid(callback: invalidCallback, options?: IInvalidOption): any;