export const handleTransactionError = (
    logToConsole = true
) => {
    if(logToConsole){
        console.error(`Error in ${context}:`, error);
    }
    let errorMessage = "Transaction Failed";
    let errorCode = "Unknown Error";
    
    const code = error?.code || (error?.code && error.code.toString()) ;
    const isRejected =  (error?.message && error.message.includes("User rejected the transaction")) || error.message.includes("User denied transaction signature") || error.message.includes("MetaMask Tx Signature: User denied transaction signature") || error.message.includes("MetaMask Tx Signature: User denied message signature");

    if(isRejected || code === "ACTION_REJECTED" || code === 4001){
        errorMessage = "Transaction Rejected";
        errorCode = "User Rejected";
    } else if(code === "UNPREDICTABLE_GAS_LIMIT" || code === -32000){
        errorMessage = "Transaction Failed";
        errorCode = "Insufficient Funds";
    } else if(code === "INSUFFICIENT_FUNDS" || code === -32603){
        errorMessage = "Insufficient Funds";
        errorCode = "Insufficient Funds";
    } else if(code === "NETWORK_ERROR" || code === "SERVER_ERROR"){
        errorMessage = "Network Error";
        errorCode = "Network Error";
    } else if(code === "INVALID_ARGUMENT" || code === -32602){
        errorMessage = "Invalid Argument";
        errorCode = "Invalid Argument";
    } else if(code === "UNSUPPORTED_OPERATION" || code === -32601){
        errorMessage = "Unsupported Operation";
        errorCode = "Unsupported Operation";
    }
    
    if(message.includes("gas required exceeds allowance")){
        errorMessage = "Gas Limit Exceeded";
        errorCode = "Gas Limit Exceeded";
    } else if(message.includes("execution reverted")){
        errorMessage = "Execution Reverted";
        errorCode = "Execution Reverted";
    } else if(message.includes("replacement transaction underpriced")){
        errorMessage = "Replacement Transaction Underpriced";
        errorCode = "Replacement Transaction Underpriced";
    } else if(message.includes("nonce too low")){
        errorMessage = "Nonce Too Low";
        errorCode = "Nonce Too Low";
    }
    
    return {message, errorMessage, code: errorCode};
}

export const erc20Abi = [
    "Function totalSupply() view returns (uint256)",
    "Function balanceOf(address) view returns (uint256)",
    "function symbol() view returns (string)",
    "function name() view returns (string)",
    "function decimals() view returns (uint8)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function transfer(address recipient, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
]

export const generateId = () => `transaction-${Date.now()}-${Math.toString(36).substr(2,5)}`;
