import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
  // this is equivalent to:
  // <Layout children=<Component {...pageProps} /> />
}
