<template>
  <div id="app">
    <header>
      <img alt="biometric" style="width: 200px"
           src="https://www.creativefabrica.com/wp-content/uploads/2021/06/03/Biometric-Fingerprint-Scanning-Icon-Graphics-12873794-1-1-580x386.jpg"/>
      <h1 style="text-align: center">
        Entrar com Biometria
      </h1>
      <p style="margin-top: 10px; color: #777; text-align: center">
        Entre rapidamente em sua conta usando sua biometria
      </p>
    </header>

    <div class="login-box">
      <input id="username" placeholder="Usuário" v-model="username"/>
      <button
        id="btn-login"
        @click="registerWebAuthN()">
        Registrar
      </button>
    </div>

    <button id="already-account" @click="login()">
      Já tem uma conta? Clique aqui
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      username: '',
      credential: null,
    };
  },
  methods: {
    async login() {
      const publicKeyCredentialRequestOptions = {
        challenge: Uint8Array.from('abner', (c) => c.charCodeAt(0)),
        allowCredentials: [{
          id: Uint8Array.from(this.credential, (c) => c.charCodeAt(0)),
          type: 'public-key',
          transports: ['usb', 'ble', 'nfc'],
        }],
        timeout: 60000,
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      console.log(assertion);
    },
    async registerWebAuthN() {
      const publicKeyCredentialCreationOptions = {
        challenge: Uint8Array.from('abner', (c) => c.charCodeAt(0)),
        rp: {
          name: 'Zoox WebAuthN',
          id: 'webauthn-rodriguesabner.vercel.app/',
          // id: "zooxdemo.rc.smartpass.com",
        },
        user: {
          id: Uint8Array.from('UZSL85T9AFC', (c) => c.charCodeAt(0)),
          name: this.username,
          displayName: 'Abner Rodrigues',
        },
        pubKeyCredParams: [{
          alg: -7,
          type: 'public-key',
        }],
        authenticatorSelection: {
          authenticatorAttachment: 'cross-platform',
        },
        timeout: 60000,
        attestation: 'direct',
      };

      const generatedCredentials = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      this.credential = generatedCredentials;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  padding: 2em;
  color: #000;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

#root > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 250px;
}

.login-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2em;
  max-width: 250px;
}

#username {
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #F2F4F6;
  background-color: #fff;
  color: #000;
  outline: 0
}

#btn-login {
  background-color: #F2F4F6;
  padding: 8px 10px;
  border: 0;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
  color: dodgerblue;
}

#already-account {
  margin-top: 2.5em;
  font-weight: 600;
  font-size: 14px;
  border: 0;
  color: dodgerblue;
  max-width: 100%;
  cursor: pointer;
}
</style>
