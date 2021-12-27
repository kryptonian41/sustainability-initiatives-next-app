import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import '../styles/globals.css'
import { BaseLayout } from "components/Layout";
import SEO from "components/SEO";

function MyApp({ Component, pageProps }) {
  return <BaseLayout>
    <SEO />
    <Component {...pageProps} />
  </BaseLayout>
}

export default MyApp
