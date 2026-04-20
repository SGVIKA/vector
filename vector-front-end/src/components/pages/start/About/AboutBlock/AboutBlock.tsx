import { IAboutBLock } from './about-block.interface'
import styles from './about-block.module.css'
import { Heading } from '@/src/components/ui/Heading'

export function AboutBlock({ item }: { item: IAboutBLock }) {
	return (
		<div
			className={
				item.heading === 'Заметки' ? styles.aboutBlockNotes : styles.aboutBlock
			}
		>
			<div className={styles.textBlock}>
				<h2 className={styles.heading}>{item.heading}</h2>
				<p className={styles.text}>{item.text}</p>
				<p className={styles.subtext}>{item.subtext}</p>
			</div>

			<img
				className={`${item.heading === 'Заметки' ? styles.largeImage : styles.image} ${item.heading === 'Тайм-блокинг' ? styles.imageFirst : ''}`}
				src={item.image}
				width={900}
			/>
		</div>
	)
}
