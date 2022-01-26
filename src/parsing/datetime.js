export default function datetime({ value }) {
	return value ? new Date(value) : new Date();
}