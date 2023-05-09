import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const ABI =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "categories",
				"type": "string"
			}
		],
		"name": "addStep1",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productCode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "categories",
				"type": "string"
			}
		],
		"name": "addStep2",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productCode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "categories",
				"type": "string"
			}
		],
		"name": "addStep3",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productCode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "categories",
				"type": "string"
			}
		],
		"name": "addStep4",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productCode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "categories",
				"type": "string"
			}
		],
		"name": "addStep5",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productCode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "categories",
				"type": "string"
			}
		],
		"name": "addStep6",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productCode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "categories",
				"type": "string"
			}
		],
		"name": "addStep7",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productCode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "categories",
				"type": "string"
			}
		],
		"name": "addStep8",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "step1DatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "step2DatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "step3DatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "step4DatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "step5DatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "step6DatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "step7DatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "step8DatabaseContractAddress",
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
		"inputs": [],
		"name": "getAllStep1",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productCode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "categories",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "step1IsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Step1[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStep2",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productCode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "categories",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "step2IsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Step2[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStep3",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productCode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "categories",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "step3IsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Step3[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStep4",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productCode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "categories",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "step4IsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Step4[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStep5",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productCode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "categories",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "step5IsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Step5[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStep6",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productCode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "categories",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "step6IsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Step6[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStep7",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productCode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "categories",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "step7IsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Step7[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStep8",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productCode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "userCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "categories",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "step8IsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Step8[]",
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
		"name": "step1Database",
		"outputs": [
			{
				"internalType": "contract Step1Database",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "step2Database",
		"outputs": [
			{
				"internalType": "contract Step2Database",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "step3Database",
		"outputs": [
			{
				"internalType": "contract Step3Database",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "step4Database",
		"outputs": [
			{
				"internalType": "contract Step4Database",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "step5Database",
		"outputs": [
			{
				"internalType": "contract Step5Database",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "step6Database",
		"outputs": [
			{
				"internalType": "contract Step6Database",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "step7Database",
		"outputs": [
			{
				"internalType": "contract Step7Database",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "step8Database",
		"outputs": [
			{
				"internalType": "contract Step8Database",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const ADDRESS = "0x689f4B978252eE47DEE729215bC87B69bb727a0D";

export async function getProcessingContract() {
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(ABI, ADDRESS);
}
