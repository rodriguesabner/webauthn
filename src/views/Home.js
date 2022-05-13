import axios from 'axios';
import { preformatMakeCredReq, publicKeyCredentialToJSON } from '@/common/helper';

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
      const { data } = await axios.post('https://zoox-auth.loca.lt/user/register', {
        email: this.email,
      });

      const publicKey = preformatMakeCredReq(data);

      const assertion = await navigator.credentials.get({
        publicKey,
      });

      console.log(assertion);
    },
    async registerWebAuthN() {
      const { data } = await axios.post('https://zoox-auth.loca.lt/user/register', {
        email: this.email,
      });

      const publicKey = preformatMakeCredReq(data);

      const credential = await navigator.credentials.create({
        publicKey,
      });

      const makeCredResponse = publicKeyCredentialToJSON(credential);
      const { data: responseData } = await axios.post('https://zoox-auth.loca.lt/user/response', {
        ...makeCredResponse,
      });

      console.log(responseData);
    },
    async envia() {
      await axios.post('http://webhook.site/a6230aaa-1037-4b81-980f-fb03ef73d5dc', {
        nome: 'Abner',
        sobrenome: 'Rodrigues',
      });
    },
  },
};
