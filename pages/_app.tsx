import Router from 'next/router'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import '../styles/globals.css'
import { BaseLayout } from 'components/Layout'
import SEO from 'components/SEO'
import 'node_modules/nprogress/nprogress.css'
import NProgress from 'nprogress'

NProgress.configure({
	minimum: 0.3,
	easing: 'ease',
	speed: 800,
	showSpinner: false,
})

Router.events.on('routeChangeStart', () => {
	NProgress.start()
})

Router.events.on('routeChangeComplete', (url) => {
	NProgress.done()
})

Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
	return (
		<BaseLayout>
			<SEO />
			<Component {...pageProps} />
		</BaseLayout>
	)
}

export default MyApp
