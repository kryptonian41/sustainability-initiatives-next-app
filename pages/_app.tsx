import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import '../styles/globals.css'
import { BaseLayout } from "components/Layout";

function MyApp({ Component, pageProps }) {
  return <BaseLayout>
    <Component {...pageProps} />
  </BaseLayout>
}

export default MyApp
