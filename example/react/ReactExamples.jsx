import { onSubmit } from 'web-form-helper';

function ReactExamples() {
	return (
		<form
			onSubmit={onSubmit((obj) => {
				console.log(obj);
			})}
			onInvalid={onInvalid((element) => {
				console.log(element);
			})}
		>
			<input name="test1" minLength={2} />
			<input name="test1" />
			<input name="test2.test3" />
			<button type="submit">submit</button>
		</form>
	)
}

export default ReactExamples;