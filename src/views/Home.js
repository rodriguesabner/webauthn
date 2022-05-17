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
  created() {
    this.api = axios.create({
      baseURL: 'https://9c46-2804-431-e7c2-66c1-ba7d-7b99-3c56-2ce6.sa.ngrok.io',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  methods: {
    async login() {
      try {
        const { data } = await this.api.post('/user/login', {
          email: this.email,
        });

        const publicKey = performGetAssertion(data);
        const assertion = await navigator.credentials.get({ publicKey });

        const makeCredResponse = publicKeyCredentialToJSON(assertion);
        const { data: responseData } = await this.api.post('/user/response', {
          ...makeCredResponse,
        });

        console.log(responseData);
      } catch (e) {
        console.log(e);
        this.log = JSON.stringify(e.message);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
    async registerWebAuthN() {
      try {
        const { data } = await this.api.post('/user/register', {
          email: this.email,
        });

        const publicKey = preformatMakeCredReq(data);
        this.log = JSON.stringify(publicKey);

        const credential = await navigator.credentials.create({ publicKey });

        const makeCredResponse = publicKeyCredentialToJSON(credential);
        const { data: responseData } = await this.api.post('/user/response', {
          ...makeCredResponse,
        });

        console.log(responseData);
      } catch (e) {
        console.log(e);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
  },
};
