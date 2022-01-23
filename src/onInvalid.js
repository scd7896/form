const onInvalid = () => (e) => {
	e.stopPropagation();
	e.preventDefault();
}

export default onInvalid;