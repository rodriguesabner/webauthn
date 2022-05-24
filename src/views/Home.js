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
      baseURL: 'https://349c-2804-431-e7c3-38ac-7d9d-12a4-6f3-ace.sa.ngrok.io/user',
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

        let asseResp;
        try {
          asseResp = await startAuthentication(options);
        } catch (e) {
          this.log = e;
          console.log(e);
        }

        this.log = `'[AssertionCredential] -> ${JSON.stringify(asseResp)}`;
        await this.api.post('/authResponse', {
          ...asseResp,
        });

        alert('oláaaaaaa a´t euq enfim');
      } catch (e) {
        console.log(e);
        // this.log = JSON.stringify(`erro login: ${e.message}`, null, 2);
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
          // Pass the options to the authenticator and wait for a response
          attResp = await startRegistration(options);
        } catch (error) {
          // Some basic error handling
          if (error.name === 'InvalidStateError') {
            this.log = 'Error: Authenticator was probably already registered by user';
          } else {
            this.log = error;
          }

          throw error;
        }

        this.log = `'[AttestationCredential]', ${JSON.stringify(attResp)}`;

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
