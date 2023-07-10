import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userDatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "ownerDatabaseContractAddress",
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
				"internalType": "uint256",
				"name": "productOwnerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "customerId",
				"type": "uint256"
			}
		],
		"name": "addCustomerId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productOwnerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "distributorId",
				"type": "uint256"
			}
		],
		"name": "addDistributorId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productOwnerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "martketId",
				"type": "uint256"
			}
		],
		"name": "addMartketId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "productCode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "manufacturerId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "dateTime",
				"type": "string"
			}
		],
		"name": "addOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productOwnerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "staffId",
				"type": "uint256"
			}
		],
		"name": "addStaffId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userRole",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dateOfBirth",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "userEmail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userPhone",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "teamId",
				"type": "uint256"
			}
		],
		"name": "addUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkExistUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
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
		"name": "getAllOwner",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productOwnerId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "productCode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "manufacturerId",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "distributorIds",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "martketIds",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "staffIds",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "customerIds",
						"type": "uint256[]"
					},
					{
						"internalType": "string",
						"name": "dateTime",
						"type": "string"
					}
				],
				"internalType": "struct Product_Owner[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "userId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userRole",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateOfBirth",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userEmail",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userPhone",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "teamId",
						"type": "uint256"
					}
				],
				"internalType": "struct User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "login",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "userId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userRole",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateOfBirth",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userEmail",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userPhone",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "teamId",
						"type": "uint256"
					}
				],
				"internalType": "struct User",
				"name": "",
				"type": "tuple"
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
		"name": "ownerDatabase",
		"outputs": [
			{
				"internalType": "contract OwnerDatabase",
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
	},
	{
		"inputs": [],
		"name": "userDatabase",
		"outputs": [
			{
				"internalType": "contract UserDatabase",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const ADDRESS = "0xe649Fd43242EeB61c83BBC2BAc1e9d4dF2A8C345";

export async function getUserContract() {
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(ABI, ADDRESS);
}
