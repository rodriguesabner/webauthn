import axios from 'axios';
import { preformatMakeCredReq } from '@/common/helper';

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

        debugger;
        const publicKey = preformatMakeCredReq(data);

        const assertion = await navigator.credentials.get({
          publicKey,
        });

        console.log(assertion);
      } catch (e) {
        alert('User does not exist');
      }
    },
    async registerWebAuthN() {
      try {
        const { data } = await axios.post('https://zoox-auth.loca.lt/user/register', {
          email: this.email,
        });

        const publicKey = preformatMakeCredReq(data);

        const credential = await navigator.credentials.create({
          publicKey,
        });

        const { data: responseData } = await axios.post('https://zoox-auth.loca.lt/user/response', {
          ...credential,
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
