import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const ABI =[

]
export const ADDRESS = "0x57d819A1506683E4a0B73c892e304D456d364Ba4";

export async function getProcessingContract() {
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(ABI, ADDRESS);
}
