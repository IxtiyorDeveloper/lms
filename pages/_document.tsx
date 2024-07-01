import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                function getTitle(route) {
                  // Implement your logic to get title based on the route
                  var segments = route.split('/');
                  var title = segments[1] ? segments[1].toUpperCase() : 'Login | LMS';
                  return title;
                }

                document.addEventListener('DOMContentLoaded', function () {
                  // Dynamic title logic using JavaScript on the client side
                  var route = window.location.pathname;
                  var title = getTitle(route);
                  document.title = title;
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
