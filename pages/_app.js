import { Fragment } from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "../contexts/auth-context";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { registerChartJs } from "../utils/register-chart-js";
import { MyUserProvider } from "../contexts/UserContext";
import { theme } from "../theme";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import "tailwindcss/tailwind.css";

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>FuturizeAI</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <UserProvider>
        <MyUserProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthProvider>
                <AuthConsumer>
                  {(auth) =>
                    auth.isLoading ? (
                      <Fragment />
                    ) : (
                      getLayout(<Component {...pageProps} />)
                    )
                  }
                </AuthConsumer>
              </AuthProvider>
            </ThemeProvider>
          </LocalizationProvider>
        </MyUserProvider>
      </UserProvider>
    </CacheProvider>
  );
};

export default App;
