import Link from 'next/link'

import mainImage from '../../../../assets/about/main.png'

import { AboutBlock } from './AboutBlock/AboutBlock'
import { ABOUT_BLOCKS } from './about-blocks-info.data'
import styles from './about.module.css'

export function About() {
	return (
		<div className={styles.container}>
			<img className={styles.image} src={mainImage.src} width={900}/>
			<div className={styles.textBlock}>
				<span className={styles.text}>Держи курс на результат.</span>
				<span className={styles.subtext}>
					Стань частью <span className={styles.highlightText}>Вектора</span>:
					фиксируй идеи, организуй жизнь и направь свой курс к большим целям уже
					сегодня.
				</span>
			</div>
			<Link
				className={`button ${styles.startButton}`}
				href={'/auth'}
			>
				Начать
			</Link>
			<div className={styles.aboutBlocks}>
				{ABOUT_BLOCKS.map(item => (
					<AboutBlock
						key={item.heading}
						item={item}
					/>
				))}
			</div>
		</div>
	)
}
