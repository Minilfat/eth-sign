<template>
  <div>
    <metamask-checker v-if="!goFurther" @status-changed="_gavna"></metamask-checker>
    <eth-sign v-else>sdgjknsglsdlg</eth-sign>
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
      goFurther: false
    };
  },
  methods: {
    _gavna(value) {
      console.log(value);
      this.goFurther = value === "unlocked";
    }
  }
};
</script>

<style></style>
