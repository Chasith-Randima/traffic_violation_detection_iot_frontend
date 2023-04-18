import { Html, Head, Main, NextScript } from "next/document";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Layout from "components/Layout";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* <Navbar /> */}
        {/* <Layout> */}
        <Main />
        {/* </Layout> */}
        {/* <Footer /> */}
        <NextScript />
      </body>
    </Html>
  );
}
