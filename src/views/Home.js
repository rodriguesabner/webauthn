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
        challenge: Uint8Array.from('abner', (c) => c.charCodeAt(0)),
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
        challenge: Uint8Array.from('abner', (c) => c.charCodeAt(0)),
        rp: {
          name: 'Zoox WebAuthN',
          id: 'webauthn-beta.vercel.app',
        },
        user: {
          id: Uint8Array.from('abner', (c) => c.charCodeAt(0)),
          name: this.username,
          displayName: 'Abner Rodrigues',
        },
        authenticatorSelection: {
          requireResidentKey: true,
        },
        pubKeyCredParams: [{
          alg: -7,
          type: 'public-key',
        }],
        timeout: 60000,
        attestation: 'direct',
      };

      await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      }).then(async (credentials) => {
        const { data } = await axios.post('https://cf18-2804-431-e7c2-22de-a5-45c9-a6f9-54fc.sa.ngrok.io/register', {
          credential: credentials,
        });

        this.credential = data.credentialId;
      });
    },
  },
};
