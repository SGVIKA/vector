import { Loader as LoaderIcon } from 'lucide-react'
import styles from './loader.module.css'

const Loader = () => {
	return (
		<div className={styles.loader}>
			<LoaderIcon />
		</div>
	)
}

export default Loader
