<template>
  <div class="her">
    <h1 v-if="status==='locked'">Please, unlock you metamask</h1>
    <h1 v-if="status === 'notDetected'">Install Metamask</h1>
  </div>
</template>

<script>
import { web3, getMetamaskStatus } from "../util/detect-metamask.js";

export default {
  name: "metamask-checker",
  data() {
    return {
      status: ""
    };
  },

  methods: {
    _checkMetamaskStatus() {
      this.status = getMetamaskStatus();
      this.$emit("status-changed", this.status);
      if (this.status === "locked") setTimeout(this._checkMetamaskStatus, 2000);
    }
  },

  mounted() {
    this._checkMetamaskStatus();
  }
};
</script>

<style scoped>
.her {
  width: 100px;
  height: 100px;
  background: yellow;
}
</style>
