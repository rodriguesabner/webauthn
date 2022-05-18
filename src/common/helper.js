/* eslint-disable */
import base64url from './base64url-arraybuffer';

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof Array) {
    const arr = [];
    for (const i of pubKeyCred) arr.push(publicKeyCredentialToJSON(i));

    return arr;
  }
  if (pubKeyCred instanceof ArrayBuffer) {
    return base64url.encode(pubKeyCred);
  }
  if (pubKeyCred instanceof Object) {
    const obj = {};

    for (const key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
    }

    return obj;
  }

  return pubKeyCred;
}

let preformatMakeCredReq = (params) => {
  let modifiedParams = {...params};

  const challengeDecoded = atob(modifiedParams.challenge);
  const decodedUserId = atob(modifiedParams.user.id);

  modifiedParams.challenge = Uint8Array.from(challengeDecoded, c => c.charCodeAt(0));
  modifiedParams.user.id = Uint8Array.from(decodedUserId, c => c.charCodeAt(0));

  return modifiedParams;
};

const preformatGetAssertReq = (params) => {
  const challengeDecoded = atob(params.challenge);
  params.challenge = Uint8Array.from(challengeDecoded, c => c.charCodeAt(0));

  if(params.allowCredentials) {
    for(let allowCred of params.allowCredentials) {
      const decodedId = atob(allowCred.id);
      allowCred.id = Uint8Array.from(decodedId, c => c.charCodeAt(0))
    }
  }

  return params;
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
  preformatMakeCredReq,
  preformatGetAssertReq,
  isPlatformWebAuthnSupport,
};
