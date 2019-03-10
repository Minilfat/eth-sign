<template>
  <div id="app">
    <h1 v-if="!status">Checking Metamask Status</h1>
    <h1 v-if="status==='unlocked'">{{ address }}</h1>
    <h1 v-if="status==='locked'">Please, unlock you metamask</h1>
    <h1 v-if="status === 'notDetected'">Install Metamask</h1>
  </div>
</template>

<script>
import { web3, getMetamaskStatus } from "./util/detect-metamask.js";

export default {
  name: "app",
  data() {
    return {
      status: "",
      address: ""
    };
  },

  methods: {
    _checkMetamaskStatus() {
      let status = getMetamaskStatus();
      this.status = status;

      switch (status) {
        case "notDetected":
          break;
        case "unlocked":
          this.address = web3.eth.accounts[0];
          break;
        case "locked":
          setTimeout(this._checkMetamaskStatus, 1000);
          break;
      }
    }
  },

  mounted() {
    this._checkMetamaskStatus();
    window.addEventListener("load", this._checkMetamaskStatus);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}
</style>
