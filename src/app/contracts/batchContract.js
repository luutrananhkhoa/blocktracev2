import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "batchName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "numOfProcess",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "categories",
				"type": "string"
			}
		],
		"name": "addBatch",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "batchDatabaseContractAddress",
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
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "batchDatabase",
		"outputs": [
			{
				"internalType": "contract BatchDatabase",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllBatch",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "batchName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "numOfProcess",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "categories",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "batchIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Batch[]",
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
	}
]
export const ADDRESS = "0xB415f90708A98Ea3F8f575F1A73d11C35779DF90";

export async function getBatchContract() {
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(ABI, ADDRESS);
}
