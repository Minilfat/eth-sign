export const web3 = window.Web3
  ? new window.Web3(window.web3.currentProvider)
  : undefined;


export function getMetamaskStatus() {
  if (web3) {
    return web3.eth.accounts[0] ? "unlocked" : "locked";
  }

  return "notDetected";
}
