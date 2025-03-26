import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { bsc, bscTestnet, polygon } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { store } from "./Redux/Store.js";
import { Provider } from "react-redux";

// import { getDefaultConfig } from "@rainbow-me/rainbowkit";
export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "9ead31f799e15b5963591c2b014b64bd",
  chains: [bscTestnet],
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
