import axios from 'axios';
import {
  performGetAssertion,
  preformatMakeCredReq,
  publicKeyCredentialToJSON,
} from '@/common/helper';

export default {
  name: 'App',
  data() {
    return {
      username: '',
      email: '',
      credential: null,
      log: '',
      loggedIn: false,
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await axios.post('https://zoox-auth.loca.lt/user/login', {
          email: this.email,
        });

        const publicKey = performGetAssertion(data);
        this.log = JSON.stringify(publicKey);

        const assertion = await navigator.credentials.get({ publicKey });

        console.log(assertion);
      } catch (e) {
        console.log(e);
        this.log = JSON.stringify(e.message);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
    async registerWebAuthN() {
      try {
        const { data } = await axios.post('https://zoox-auth.loca.lt/user/register', {
          email: this.email,
        });

        const publicKey = preformatMakeCredReq(data);
        this.log = JSON.stringify(publicKey);

        const credential = await navigator.credentials.create({ publicKey });

        const makeCredResponse = publicKeyCredentialToJSON(credential);
        const { data: responseData } = await axios.post('https://zoox-auth.loca.lt/user/response', {
          ...makeCredResponse,
        });

        console.log(responseData);
      } catch (e) {
        console.log(e);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
    async envia() {
      await axios.post('http://webhook.site/a6230aaa-1037-4b81-980f-fb03ef73d5dc', {
        nome: 'Abner',
        sobrenome: 'Rodrigues',
      });
    },
  },
};
