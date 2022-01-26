export interface IOptions<T> {
	isExcuteDefault?: boolean;
	validate?: (validateParameter: T) => string | undefined;
	onInvalid?: (targetInvalid: HTMLElement, name: string) => void;
}

export default function onSubmit<T>(callback: (arg: T | FormData) => void): void;