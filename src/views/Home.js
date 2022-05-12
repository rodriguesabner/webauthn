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
          transports: [
            'internal',
          ],
        }],
        timeout: 60000,
        attestation: 'direct',
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
          id: 'localhost:8080',
          // id: 'webauthn-beta.vercel.app',
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
