import Homepage from '@/views/Homepage'
import Login from '@/views/Login'

const routes = [
	{
		path: '/',
		name: 'Homepage',
		component: Homepage
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	}
]

export default routes