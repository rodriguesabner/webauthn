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

function generateRandomBuffer(len) {
  len = len || 32;

  const randomBuffer = new Uint8Array(len);
  window.crypto.getRandomValues(randomBuffer);

  return randomBuffer;
}

const preformatMakeCredReq = (makeCredReq) => {
  const modified = { ...makeCredReq };
  const challengeId = Buffer.from(Uint8Array.from("teste", c => c.charCodeAt(0))).toString("base64")
  const userId = Buffer.from(Uint8Array.from("UZSL85T9AFC", c => c.charCodeAt(0))).toString("base64")

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
  generateRandomBuffer,
  preformatGetAssertReq,
  preformatMakeCredReq,
  isPlatformWebAuthnSupport,
};
