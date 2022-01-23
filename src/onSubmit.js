/**
 * 
 * @param {function} callback (arg: object | Formdata) => void
 * @param {
 * 	{
 * 		test: boolean;
 * 	}
 * } option  
 * @returns 
 */
const onSubmit = (callback, option) => (e) => {
	e.preventDefault();
	console.log(e)
}

export default onSubmit;