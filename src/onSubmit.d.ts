export interface IFailValidateReturnType {
	name: string;
	message?: string;
}

export interface IOptions<T> {
	isExcuteDefault?: boolean;
	validate?: (validateParameter: T) => string | undefined | IFailValidateReturnType;
	onInvalid?: (targetInvalid: HTMLElement, name: string, message?: string) => void;
}

export default function onSubmit<T>(callback: (arg: T | FormData) => void): void;