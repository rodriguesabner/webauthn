import axios from 'axios';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';

export default {
  name: 'App',
  data() {
    return {
      credentials: [],
      username: 'Abner Rodrigues',
      email: 'abner@gmail.com',
      password: 'abner',
      log: '',
    };
  },
  async created() {
    this.api = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await this.api.get('/credentials', {
      params: {
        email: this.email,
      },
    });

    this.credentials = data;
  },
  methods: {
    async login() {
      try {
        const { data: options } = await this.api.post('/login', {
          name: this.email,
        });

        this.log = JSON.stringify(options, null, 2);

        let asseResp;
        try {
          asseResp = await startAuthentication(options);
        } catch (e) {
          this.log = `${JSON.stringify(e, null, 2)}`;
          console.log(e);
        }

        this.log = `'[AssertionCredential] -> ${JSON.stringify(asseResp, null, 2)}`;
        await this.api.post('/authResponse', {
          ...asseResp,
        });

        alert('oláaaaaaa a´t euq enfim');
      } catch (e) {
        console.log(e);
        this.log = JSON.stringify(`erro login: ${e.message}`, null, 2);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
    async registerWebAuthN() {
      try {
        const opts = {};
        Object.assign(opts, {
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
          },
        });
        const { data: options } = await this.api.post('/register', {
          name: this.email,
          displayName: this.username,
          ...opts,
        });

        this.log = JSON.stringify(options, null, 2);

        let attResp;
        try {
          attResp = await startRegistration(options);
        } catch (error) {
          if (error.name === 'InvalidStateError') {
            this.log = 'Error: Authenticator was probably already registered by user';
          } else {
            this.log = error;
          }
        }

        this.log = `'[AttestationCredential]', ${JSON.stringify(attResp, null, 2)}`;

        const { data: responseData } = await this.api.post('/response', { ...attResp });

        this.credentials.push(responseData);
        console.log(responseData);
      } catch (e) {
        console.log(e);
        this.log = JSON.stringify(`erro register: ${e.message}`, null, 2);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
  },
};
