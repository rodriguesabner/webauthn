import axios from 'axios';
import { serializeUvm } from '@/common/helper';
import { base64url } from '@/common/base64url-arraybuffer';

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
      baseURL: 'https://d6d4-2804-431-e7c3-96e-e3d8-acac-2a74-ad0d.sa.ngrok.io',
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
        const { data: options } = await this.api.post('/user/login', {
          email: this.email,
          password: this.password,
        });

        const challenge = base64url.decode(options.challenge);

        this.log = 'Requesting credentials...';

        const allowCredentials = this.credentials.map((cred) => ({
          ...cred,
          id: base64url.decode(cred.credentialID.substr(0, 16)),
          type: 'public-key',
        }));

        const decodedOptions = {
          ...options,
          allowCredentials,
          challenge,
        };

        const credential = await navigator.credentials.get({
          publicKey: decodedOptions,
        });

        // Encode the credential.
        const rawId = base64url.encode(credential.rawId);
        const authenticatorData = base64url.encode(credential.response.authenticatorData);
        const clientDataJSON = base64url.encode(credential.response.clientDataJSON);
        const signature = base64url.encode(credential.response.signature);
        const userHandle = credential.response.userHandle
          ? base64url.encode(credential.response.userHandle) : undefined;

        const encodedCredential = {
          id: credential.id,
          rawId,
          response: {
            authenticatorData,
            clientDataJSON,
            signature,
            userHandle,
          },
          type: credential.type,
          clientExtensionResults: [],
        };

        this.log = `'[AssertionCredential] -> ${encodedCredential}`;
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
        opts.authenticatorSelection.authenticatorAttachment = 'platform';
        opts.authenticatorSelection.userVerification = 'required';
        const { data: options } = await this.api.post('/user/register', {
          name: this.email,
          displayName: this.username,
          ...opts,
        });

        this.log = JSON.stringify(options, null, 2);

        // const makeCredResponse = publicKeyCredentialToJSON(credential);
        const user = {
          ...options.user,
          id: base64url.decode(options.user.id),
        };

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

        this.log = JSON.stringify(encodedCredential, null, 2);

        console.log('[AttestationCredential]', encodedCredential);

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
