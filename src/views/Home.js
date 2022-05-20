import axios from 'axios';
import {
  publicKeyCredentialToJSON, serializeUvm,
} from '@/common/helper';
import { base64url } from '@/common/base64url-arraybuffer';

export default {
  name: 'App',
  data() {
    return {
      credentials: [],
      username: 'Abner Rodrigues',
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
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  methods: {
    async login() {
      try {
        const { data: options } = await this.api.post('/user/login', {
          email: this.email,
          password: this.password,
        });

        const challenge = base64url.decode(options.challenge);

        const allowCredentials = this.credentials.map((cred) => ({
          ...cred,
          id: base64url.decode(cred.id),
        }));

        const decodedOptions = {
          ...options,
          allowCredentials,
          challenge,
        };

        const assertion = await navigator.credentials.get({ publicKey: decodedOptions });

        const makeCredResponse = publicKeyCredentialToJSON(assertion);
        this.log = makeCredResponse;
        const { data: responseData } = await this.api.post('/user/authResponse', {
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
        const { data: options } = await this.api.post('/user/register', {
          name: this.email,
          displayName: this.username,
        });

        this.log = JSON.stringify(options, null, 2);

        // const makeCredResponse = publicKeyCredentialToJSON(credential);
        const user = {
          ...options.user,
          id: base64url.decode(options.user.id),
        };

        this.credentials.push(user);
        const challenge = base64url.decode(options.challenge);

        const decodedOptions = {
          ...options,
          user,
          challenge,
        };

        const credential = await navigator.credentials.create({ publicKey: decodedOptions });

        const rawId = base64url.encode(credential.rawId);
        const clientDataJSON = base64url.encode(credential.response.clientDataJSON);
        const attestationObject = base64url.encode(credential.response.attestationObject);
        const clientExtensionResults = {};

        if (credential.getClientExtensionResults) {
          const extensions = credential.getClientExtensionResults();
          if ('uvm' in extensions) {
            clientExtensionResults.uvm = serializeUvm(extensions.uvm);
          }
          if ('credProps' in extensions) {
            clientExtensionResults.credProps = extensions.credProps;
          }
        }
        let transports = [];

        // if `getTransports()` is supported, serialize the result.
        if (credential.response.getTransports) {
          transports = credential.response.getTransports();
        }

        const encodedCredential = {
          id: credential.id,
          rawId,
          response: {
            clientDataJSON,
            attestationObject,
          },
          type: credential.type,
          transports,
          clientExtensionResults,
        };

        console.log('[AttestationCredential]', encodedCredential);

        const { data: responseData } = await this.api.post('/user/response', { ...encodedCredential });

        console.log(responseData);
      } catch (e) {
        console.log(e);
        this.log = JSON.stringify(`erro register: ${e.message}`, null, 2);
        alert('Ocorreu um erro, por favor, dê uma olhada no log.');
      }
    },
  },
};
