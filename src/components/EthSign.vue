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
          <div class="flex">
            <div class="signature">{{ signature }}</div>
            <md-icon
              class="md-mini icon"
              v-clipboard:copy="signature"
              v-clipboard:success="onCopy"
            >content_copy</md-icon>
            <md-icon @click.native="reset" class="md-mini icon">clear</md-icon>
          </div>
        </md-card-content>
      </md-card>
    </md-card>

    <md-snackbar class="toast" :md-position="'bottom center'" ref="snackbar">
      <span>{{ toastMessage }}</span>
    </md-snackbar>
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
      signature: "",
      toastMessage: ""
    };
  },
  methods: {
    onCopy() {
      this._openToast("Signature was copied.");
    },
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
    },
    _openToast(message) {
      this.toastMessage = message;
      this.$refs.snackbar.open();
    },
    _addressChangeWatcher(accounts) {
      let newAddress = accounts[0];

      if (this.address && newAddress && this.address !== newAddress) {
        this.reset();
        this.address = newAddress;
        this._openToast("Account was changed.");
      }
      this.$emit("address-changed", newAddress);
    }
  },
  mounted() {
    window.ethereum.on("accountsChanged", this._addressChangeWatcher);
  },
  beforeDestroy() {
    window.ethereum.removeListener(
      "accountsChanged",
      this._addressChangeWatcher
    );
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
  background-color: #3f51b5;
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

  padding: 8px 0;
  font-size: 14px;
}

.icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin-left: 8px;
}
</style>
