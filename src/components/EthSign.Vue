<template>
  <div class="wrapper">
    <md-card class="content">
      <div class="flex address-block">
        <div class="item">
          <div class="white-circle flex flex-centered">
            <md-avatar>
              <img src="../assets/ethereum.svg">
            </md-avatar>
          </div>
        </div>
        <div class="item">
          <div class="md-title title">{{ address }}</div>
          <div class="md-subhead">Your address</div>
        </div>
      </div>
      <md-card class="input-block" v-if="signature.length === 0">
        <md-input-container md-clearable :class="{'md-input-invalid': messageToSign.length === 0}">
          <label>Type your message here</label>
          <md-input required v-model="messageToSign"></md-input>
          <span class="md-error">Can not be empty</span>
        </md-input-container>
        <md-card-actions>
          <md-button class="md-raised md-dense" @click="signMessage">Sign</md-button>
        </md-card-actions>
      </md-card>
      <md-card v-else>
        <md-card-content>
          <div>Signature:</div>
          <div class="signature">{{ signature }}</div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-raised md-dense" @click="reset">Reset</md-button>
        </md-card-actions>
      </md-card>
    </md-card>
  </div>
</template>

<script>
import { web3 } from "../util/detect-metamask.js";
export default {
  name: "eth-sign",
  data() {
    return {
      address: web3.eth.coinbase,
      messageToSign: "Some random message",
      signature: ""
    };
  },
  methods: {
    signMessage() {
      if (this.messageToSign.length === 0) return;

      web3.personal.sign(
        web3.fromUtf8(this.messageToSign),
        this.address,
        (err, signature) => {
          if (err) return;
          this.signature = signature;
        }
      );
    },
    reset() {
      this.signature = "";
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.flex-centered {
  justify-content: center;
  align-items: center;
}

.wrapper {
  width: 100vw;
  height: 100vh;
}

.content {
  width: 70%;
  max-width: 640px;
  margin: auto;
}

@media only screen and (max-width: 794px) {
  .content {
    width: 100%;
    max-width: 100%;
  }
}

.address-block {
  background-color: #6b85df;
  padding: 8px;
}

.input-block {
  padding: 8px 16px;
}

.item {
  padding: 8px;
}

.title {
  color: white;
  font-size: 20px;
}

.white-circle {
  background-color: white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.signature {
  word-break: break-all;
}
</style>
