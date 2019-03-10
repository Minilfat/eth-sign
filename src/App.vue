<template>
  <div>
    <metamask-checker v-if="checkerIsShown" @status-changed="_updateUI"></metamask-checker>
    <eth-sign v-else></eth-sign>
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
      this.checkerIsShown = !(value === "unlocked");
    }
  }
};
</script>

<style></style>
