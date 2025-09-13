import Web3 from "web3";
import { toast } from "sonner";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

export async function getWeb3(): Promise<Web3> {
  if (window.ethereum) {
    const web3 = new Web3(
      window.ethereum || "https://data-seed-prebsc-1-s1.binance.org:8545"
    );

    try {
      // Solicita acceso a las cuentas
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Verifica que esté conectado a BSC Testnet
      const networkId = await web3.eth.net.getId();
      if (Number(networkId) !== 97) {
        toast.error(
          "This DApp only works on BSC Testnet (tBNB). Please switch your network in MetaMask.",
          { icon: "⚠️" }
        );
        throw new Error("Wrong network");
      }

      return web3;
    } catch (err) {
      console.error(err);
      throw new Error("User denied account access");
    }
  } else {
    toast.error("Please install MetaMask!");
    throw new Error("No crypto wallet found");
  }
}
