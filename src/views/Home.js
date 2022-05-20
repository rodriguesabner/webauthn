import axios from 'axios';
import {
  preformatGetAssertReq, preformatMakeCredReq,
  publicKeyCredentialToJSON,
} from '@/common/helper';

export default {
  name: 'App',
  data() {
    return {
      username: '',
      email: 'abner@gmail.com',
      password: 'abner',
      credential: null,
      log: '',
      loggedIn: false,
    };
  },
  created() {
    this.api = axios.create({
      baseURL: 'https://a94f-2804-431-e7c3-96e-f489-9622-bb6c-7320.sa.ngrok.io',
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
          password: this.password,
        });

        const publicKey = preformatGetAssertReq(data);
        this.log = publicKey;
        const assertion = await navigator.credentials.get({ publicKey });

        const makeCredResponse = publicKeyCredentialToJSON(assertion);
        this.log = makeCredResponse;
        const { data: responseData } = await this.api.post('/user/response', {
          ...makeCredResponse,
        });

        console.log(responseData);
      } catch (e) {
        console.log(e);
        this.log = JSON.stringify(`erro login: ${e.message}`, null, 2);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
    async registerWebAuthN() {
      try {
        const { data } = await this.api.post('/user/register', {
          email: this.email,
        });

        const publicKey = preformatMakeCredReq(data);
        this.log = JSON.stringify(publicKey, null, 2);

        const credential = await navigator.credentials.create({ publicKey });

        const makeCredResponse = publicKeyCredentialToJSON(credential);
        const { data: responseData } = await this.api.post('/user/response', {
          ...makeCredResponse,
        });

        console.log(responseData);
      } catch (e) {
        console.log(e);
        this.log = JSON.stringify(`erro register: ${e.message}`, null, 2);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
  },
};
