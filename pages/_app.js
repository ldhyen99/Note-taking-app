import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import '../css/style.css';
import { useEffect } from "react"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
    )
}

export default MyApp
