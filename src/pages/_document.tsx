import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
 

  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/assets/icons/favicon2.ico" type="image/x-icon" />
        <title>Project Manager</title>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
