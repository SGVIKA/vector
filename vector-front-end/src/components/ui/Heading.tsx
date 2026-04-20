import { IHeading } from '../interfaces/ui.interface'

export function Heading({ title, className }: IHeading) {
	return (
		<div className='heading'>
			<p className={className}>{title}</p>
			<div className='line' />
		</div>
	)
}
