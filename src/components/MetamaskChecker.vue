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
            We were not able to find Metamask installed in your browser. To continue work with the app
            install Metamask, please.
          </md-card-content>
          <md-card-actions>
            <md-button href="https://metamask.io/">Install now</md-button>
          </md-card-actions>
        </template>
      </md-card>
    </div>
  </div>
</template>

<script>
import { getMetamaskStatus } from "../util/detect-metamask.js";

export default {
  name: "metamask-checker",
  data() {
    return {
      status: ""
    };
  },

  methods: {
    _checkMetamaskStatus() {
      getMetamaskStatus()
        .then(addresses => {
          this.status = "unlocked";
          this.$emit("status-changed", this.status);
        })
        .catch(err => {
          console.log(err);
          this.status = "notDetected";
          this.$emit("status-changed", this.status);
        });
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
