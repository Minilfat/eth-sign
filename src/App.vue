<template>
  <div>
    <metamask-checker v-if="checkerIsShown" @status-changed="_updateUI"></metamask-checker>
    <eth-sign v-else @address-changed="_checkAddress"></eth-sign>
  </div>
</template>

<script>
import MetamaskChecker from "./components/MetamaskChecker";
import EthSign from "./components/EthSign";

export default {
  name: "app",
  components: {
    MetamaskChecker,
    EthSign
  },
  data() {
    return {
      checkerIsShown: true
    };
  },
  methods: {
    _updateUI(value) {
      this.checkerIsShown = value === "notDetected";
    },
    _checkAddress(address) {
      if (!address) {
        this.checkerIsShown = true;
      }
    }
  }
};
</script>

<style></style>
