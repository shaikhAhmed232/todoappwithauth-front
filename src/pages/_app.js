import "../../styles/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import AuthContextProvider from "../context/AuthContext";
import GlobalMsgContextProvider from "../context/GlobalMsgContext";
// import CsrfContextProvider from "../context/CsrfContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
