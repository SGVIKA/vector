import { GlobalLoader } from '../../../ui/loaders/GlobalLoader'

import Profile from './Profile'

export default function Header() {
	return (
		<header>
			<GlobalLoader />
			<Profile />
		</header>
	)
}
