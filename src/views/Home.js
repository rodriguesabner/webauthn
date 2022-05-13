import axios from 'axios';
import base64urlArraybuffer from '@/common/base64url-arraybuffer';

export default {
  name: 'App',
  data() {
    return {
      username: '',
      email: '',
      credential: null,
      log: '',
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
        rp: {
          name: 'Zoox WebAuthN',
          id: 'localhost',
        },
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          requireResidentKey: true,
        },
        timeout: 60000,
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      console.log(assertion);
    },
    preformatMakeCredReq(makeCredReq) {
      const modieifiedCred = { ...makeCredReq };
      modieifiedCred.challenge = base64urlArraybuffer.decode(modieifiedCred.challenge);
      modieifiedCred.user.id = base64urlArraybuffer.decode(modieifiedCred.user.id);

      return modieifiedCred;
    },
    async registerWebAuthN() {
      this.log += '====<\n';
      const { data } = await axios.post('https://795a-2804-431-e7c2-22de-d08a-afee-d823-8892.sa.ngrok.io/register', {
        email: this.email,
      });

      this.log += `====> server cred: ${JSON.stringify(data)}\n`;
      const publicKey = this.preformatMakeCredReq(data);
      this.log += `====> assert publicKey: ${JSON.stringify(publicKey)}\n`;

      const credential = await navigator.credentials.create({
        publicKey,
      });
      this.log += `====> client sensor sign ${JSON.stringify(credential)}\n`;

      const makeCredResponse = this.publicKeyCredentialToJSON(credential);
      this.log = `===>formatted client sensor sign ${makeCredResponse})`;

      const { data: responseData } = await axios.post('https://795a-2804-431-e7c2-22de-d08a-afee-d823-8892.sa.ngrok.io/response', {
        ...makeCredResponse,
      });

      console.log(responseData);
    },
    publicKeyCredentialToJSON(pubKeyCred) {
      if (pubKeyCred instanceof Array) {
        const arr = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const i of pubKeyCred) arr.push(this.publicKeyCredentialToJSON(i));
        return arr;
      } if (pubKeyCred instanceof ArrayBuffer) {
        return base64urlArraybuffer.encode(pubKeyCred);
      } if (pubKeyCred instanceof Object) {
        const obj = {};

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const key in pubKeyCred) {
          obj[key] = this.publicKeyCredentialToJSON(pubKeyCred[key]);
        }

        return obj;
      }
      return pubKeyCred;
    },
    async envia() {
      await axios.post('http://webhook.site/a6230aaa-1037-4b81-980f-fb03ef73d5dc', {
        nome: 'Abner',
        sobrenome: 'Rodrigues',
      });
    },
  },
};
