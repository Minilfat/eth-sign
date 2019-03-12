export const web3 = window.ethereum
  ? new window.Web3(window.ethereum)
  : undefined;

export function getMetamaskStatus() {
  return web3 ? window.ethereum.enable() : Promise.reject(new Error("Metamask not found"))
}

export function addressChangeWatcher(cb) {
  window.ethereum.on("accountsChanged", accounts => {
    cb(accounts[0]);
  });
}
