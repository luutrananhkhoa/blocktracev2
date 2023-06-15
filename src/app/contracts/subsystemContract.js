import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "subsystemDatabaseContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "typeOfSubsystem",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "registerDate",
				"type": "string"
			}
		],
		"name": "addSubsystem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSubsystem",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "subId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "typeOfSystem",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "registerDate",
						"type": "string"
					}
				],
				"internalType": "struct Subsystem[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subsystemDatabase",
		"outputs": [
			{
				"internalType": "contract SubsystemDatabase",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] 
export const ADDRESS = "0x498a1707d624Abe7d95590b3810309344C6B954c";

export async function getSubSystemContract() {
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(ABI, ADDRESS);
}
