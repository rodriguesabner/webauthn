/* eslint-disable */
import base64url from './base64url-arraybuffer';

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof Array) {
    const arr = [];
    for (const i of pubKeyCred) arr.push(publicKeyCredentialToJSON(i));

    return arr;
  } if (pubKeyCred instanceof ArrayBuffer) {
    return base64url.encode(pubKeyCred);
  } if (pubKeyCred instanceof Object) {
    const obj = {};

    for (const key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
    }

    return obj;
  }

  return pubKeyCred;
}
const performGetAssertion = (getAssertionRequest) => {
  getAssertionRequest.challenge = base64url.decode(getAssertionRequest.challenge);

  if(getAssertionRequest.allowCredentials) {
    for(let allowCred of getAssertionRequest.allowCredentials) {
      allowCred.id = base64url.decode(allowCred.id);
    }
  }

  return getAssertionRequest
}

const preformatMakeCredReq = (makeCredentialRequest) => {
  makeCredentialRequest.challenge = base64url.decode(makeCredentialRequest.challenge);
  makeCredentialRequest.user.id   = base64url.decode(makeCredentialRequest.user.id);

  if(makeCredentialRequest.excludeCredentials) {
    for(let excludeCred of makeCredentialRequest.excludeCredentials) {
      excludeCred.id = base64url.decode(excludeCred.id);
    }
  }

  return makeCredentialRequest
}


function isPlatformWebAuthnSupport() {
  return new Promise((resolve) => {
    if (
      window.location.protocol === 'http:'
      && window.location.hostname !== 'localhost'
      && window.location.hostname !== '127.0.0.1'
    ) {
      resolve(false);
    }
    if (
      window.PublicKeyCredential === undefined
      || typeof window.PublicKeyCredential !== 'function'
    ) {
      resolve(false);
    }

    window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(
      (supported) => {
        if (supported) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
    );
  });
}

export {
  publicKeyCredentialToJSON,
  performGetAssertion,
  preformatMakeCredReq,
  isPlatformWebAuthnSupport,
};
