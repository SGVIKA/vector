export function SliceText(maxLenght: number, text?: string ) {
	const result = text
		? text.length > maxLenght
			? `${text?.slice(0, maxLenght)}…`
			: text
		: null
	return result
}
