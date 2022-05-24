import axios from 'axios';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
// eslint-disable-next-line import/extensions
import ModalLog from '@/views/ModalLog';
// eslint-disable-next-line import/extensions
import ModalCredentials from '@/views/ModalCredentials';

export default {
  name: 'App',
  components: {
    ModalLog,
    ModalCredentials,
  },
  data() {
    return {
      credentials: [],
      displayName: '',
      nameEmailUnique: '',
      password: '',
      log: '',
      openModalLog: false,
      openModalCredentials: false,
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
        email: this.nameEmailUnique,
      },
    });

    this.credentials = data;
  },
  methods: {
    async login() {
      try {
        const { data: options } = await this.api.post('/login', {
          name: this.nameEmailUnique,
        });

        this.log += '---------------------------------------------\n';
        this.log += JSON.stringify(options, null, 2);

        let asseResp;
        try {
          asseResp = await startAuthentication(options);
        } catch (e) {
          this.log += '---------------------------------------------';
          this.log += `${JSON.stringify(e, null, 2)}`;
          console.log(e);
        }

        this.log += '---------------------------------------------\n';
        this.log += `'[AssertionCredential] -> ${JSON.stringify(asseResp, null, 2)}`;
        const { data: userInfo } = await this.api.put('/login-response', {
          ...asseResp,
        });

        alert(`olá ${userInfo.displayName}`);
      } catch (e) {
        this.log += '---------------------------------------------\n';
        this.log += JSON.stringify(`erro login: ${e.message}`, null, 2);
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
          name: this.nameEmailUnique,
          displayName: this.displayName,
          ...opts,
        });

        this.log = JSON.stringify(options, null, 2);

        let attResp;
        try {
          attResp = await startRegistration(options);
        } catch (error) {
          if (error.name === 'InvalidStateError') {
            this.log += '---------------------------------------------\n';
            this.log += 'Error: Authenticator was probably already registered by user';
          } else {
            this.log += error;
          }
        }

        this.log += '---------------------------------------------\n';
        this.log += `'[AttestationCredential]', ${JSON.stringify(attResp, null, 2)}`;

        const { data: responseData } = await this.api.put('/register-response', { ...attResp });

        this.credentials.push(responseData);
        console.log(responseData);
      } catch (e) {
        console.log(e);
        this.log += '---------------------------------------------\n';
        this.log += JSON.stringify(`erro register: ${e.message}`, null, 2);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
    handleOpenModalLog() {
      this.openModalLog = true;
    },
    handleCloseModalLog() {
      this.openModalLog = false;
    },
    handleOpenModalCredentials() {
      this.openModalCredentials = true;
    },
    handleCloseModalCredentials() {
      this.openModalCredentials = false;
    },
  },
};
