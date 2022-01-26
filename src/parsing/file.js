export default function file(target) {
	if (target.files.length === 1) return target.files[0];
	else return target.files;
}