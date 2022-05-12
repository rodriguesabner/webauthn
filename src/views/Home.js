import axios from 'axios';

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
        challenge: Uint8Array.from('zooxdemo', (c) => c.charCodeAt(0)),
        allowCredentials: [{
          id: Uint8Array.from(this.credential, (c) => c.charCodeAt(0)),
          type: 'public-key',
        }],
        timeout: 60000,
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      // eslint-disable-next-line no-alert
      alert(assertion);
    },
    async registerWebAuthN() {
      const publicKeyCredentialCreationOptions = {
        challenge: Uint8Array.from('zooxdemo', (c) => c.charCodeAt(0)),
        rp: {
          name: 'Zoox WebAuthN',
          id: 'webauthn-beta.vercel.app',
        },
        user: {
          id: Uint8Array.from('UZSL85T9AFC', (c) => c.charCodeAt(0)),
          name: this.username,
          displayName: this.username,
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
        },
        timeout: 60000,
        attestation: 'none',
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      this.credential = credential;

      await axios.post('https://webhook.site/a6230aaa-1037-4b81-980f-fb03ef73d5dc', {
        credential,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    },
  },
};
