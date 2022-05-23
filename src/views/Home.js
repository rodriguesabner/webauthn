import axios from 'axios';
import { solveLoginChallenge, solveRegistrationChallenge } from '@webauthn/client';

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
      baseURL: 'https://6fdf-2804-431-e7c3-38ac-5c3c-4795-9d62-a692.sa.ngrok.io',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await this.api.get('/user/credentials', {
      params: {
        email: this.email,
      },
    });

    this.credentials = data;
  },
  methods: {
    async login() {
      try {
        const { data: challenge } = await this.api.post('/user/login', {
          email: this.email,
          password: this.password,
        });

        const encodedCredential = solveLoginChallenge(challenge);

        await this.api.post('/user/authResponse', {
          ...encodedCredential,
        });
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
        const { data: options } = await this.api.post('/user/register', {
          name: this.email,
          displayName: this.username,
          ...opts,
        });

        const encodedCredential = solveRegistrationChallenge(options);
        const { data: responseData } = await this.api.post('/user/response', { ...encodedCredential });

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
