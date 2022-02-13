import { Head, Main, Html, NextScript, DocumentContext } from 'next/document';
import Document from 'next/dist/pages/_document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja" itemScope itemType="http://schema.org/WebPage" className="h-full">
        <Head></Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
