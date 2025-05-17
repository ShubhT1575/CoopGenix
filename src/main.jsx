import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { bsc, bscTestnet, opBNBTestnet, polygon } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { store } from "./Redux/Store.js";
import { Provider } from "react-redux";
import {
  binanceWallet,
  metaMaskWallet,
  tokenPocketWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';


const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [trustWallet, metaMaskWallet,tokenPocketWallet, binanceWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
  }
);

// import { getDefaultConfig } from "@rainbow-me/rainbowkit";
export const config = getDefaultConfig({
  connectors,
  appName: "My RainbowKit App",
  projectId: "9ead31f799e15b5963591c2b014b64bd",
  chains: [polygon],
  ssr: true,
});


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            <Toaster />
            <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </Provider>
);
