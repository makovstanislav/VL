import 'bootstrap/dist/css/bootstrap.min.css';
let bootstrapJS;
if (typeof window !== 'undefined') {
  bootstrapJS = require('bootstrap/dist/js/bootstrap.bundle.min');
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
