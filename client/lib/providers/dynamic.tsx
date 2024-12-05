"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
const DynamicProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "68fcc8c5-bfcb-43f3-b3f3-6c48fdeed7de",
        walletConnectors: [EthereumWalletConnectors],
        events: {
          onAuthSuccess: (args) => {
            console.log(args);
            console.log("user", args.user);
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};

export default DynamicProvider;
