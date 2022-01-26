export default function checkbox(target) {
	if (target.checked) return target.value;
	return null;
}