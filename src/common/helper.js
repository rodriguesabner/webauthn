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

const preformatMakeCredReq = (makeCredReq) => {
  const modified = { ...makeCredReq };

  // pega os ids: challenge e userId e faz o encrypt (esses dados vem do server);
  const challengeId = Uint8Array.from(modified.challenge, c => c.charCodeAt(0));
  const userId = Uint8Array.from(modified.user.id, c => c.charCodeAt(0));

  modified.challenge = challengeId;
  modified.user.id = userId;

  return modified;
};

const preformatGetAssertReq = (getAssert) => {
  getAssert.challenge = base64url.decode(getAssert.challenge);

  for (const allowCred of getAssert.allowCredentials) {
    allowCred.id = base64url.decode(allowCred.id);
  }

  return getAssert;
};

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
  preformatGetAssertReq,
  preformatMakeCredReq,
  isPlatformWebAuthnSupport,
};
