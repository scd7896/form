export default function date({ value }) {
	return value ? new Date(value) : null;
}