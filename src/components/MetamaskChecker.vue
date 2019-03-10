<template>
  <div class="wrapper flex">
    <div class="main-content">
      <md-card>
        <md-card-header>
          <md-avatar>
            <img src="../assets/metamask.svg">
          </md-avatar>

          <div class="md-title">Metamask</div>
          <div class="md-subhead">brings Ethereum to your browser</div>
        </md-card-header>

        <template v-if="status === 'notDetected'">
          <md-card-content>
            We were not able to find Metamask installed in your browser. To continue work with app
            install Metamask, please.
          </md-card-content>
          <md-card-actions>
            <md-button>Install now</md-button>
          </md-card-actions>
        </template>

        <template v-if="status === 'locked'">
          <md-card-content>Please, unlock your Metamask account to continue.</md-card-content>
        </template>
      </md-card>
    </div>
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
.wrapper {
  background: grey;
  width: 100vw;
  height: 100vh;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-content {
  width: 80%;
}
</style>
