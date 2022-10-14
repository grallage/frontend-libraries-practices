import type { AppProps } from "next/app";
import { useRouter } from "next/router";
// redux
import reduxStore from "@/libs/redux/store";
import { Provider as ReduxProvider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const matchReduxRouter = router.pathname.startsWith("/redux/");

  if (matchReduxRouter) {
    return (
      <ReduxProvider store={reduxStore}>
        <Component {...pageProps} />
      </ReduxProvider>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
