export interface IFailValidateReturnType {
	name: string;
	message?: string;
	index?: number;
}

export interface IOptions<T> {
	isExcuteDefault?: boolean;
	validate?: (validateParameter: T) => string | undefined | IFailValidateReturnType;
	onInvalid?: (targetInvalidElement: HTMLElement, invalidData: IFailValidateReturnType | string) => void;
}

export default function onSubmit<T>(callback: (arg: T | FormData) => void, options: IOptions<T>): void;