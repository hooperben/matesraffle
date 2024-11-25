"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const DynamicProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <DynamicContextProvider
    settings={{
      environmentId: "d6294e7a-dc6e-4379-af32-d4ccde0d212f",
      walletConnectors: [EthereumWalletConnectors],
      events: {
        onAuthSuccess: (args) => {
          console.log("user", args.user);
        },
      },
    }}
  >
    {children}
  </DynamicContextProvider>
);

export default DynamicProvider;
