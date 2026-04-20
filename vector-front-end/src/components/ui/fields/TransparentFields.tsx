import { forwardRef } from 'react'
import TextareaAutosize, {
	TextareaAutosizeProps
} from 'react-textarea-autosize'

import styles from '../ui.module.css'

type TypeTransparentField = TextareaAutosizeProps & {
	minRows?: number
	maxRows?: number
}

export const TransparentField = forwardRef<
	HTMLTextAreaElement,
	TypeTransparentField
>(({ className, minRows = 1, maxRows = 3, ...rest }, ref) => {
	return (
		<TextareaAutosize
			className={`${styles.transparentField} ${className}`}
			ref={ref}
			minRows={minRows}
			maxRows={maxRows}
			{...rest}
		/>
	)
})

TransparentField.displayName = 'TransparentField'
