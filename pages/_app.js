import "../styles/globals.css";
import { config } from "../provider/wagmiConfigs";

import { RainbowKitProvider , darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3Provider} from "../context/Web3Provider"
import {ToastProvider} from "../context/ToastProvider";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: "#FF00FF",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}>
          <Web3Provider>
            <ToastProvider>
              <Component {...pageProps} />
            </ToastProvider>
          </Web3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default MyApp;
