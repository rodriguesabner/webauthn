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

let preformatMakeCredReq = (makeCredReq) => {
  let modieifiedCred = {...makeCredReq};
  modieifiedCred.challenge = Uint8Array.from(window.atob(modieifiedCred.challenge), c => c.charCodeAt(0));
  modieifiedCred.user.id = Uint8Array.from(window.atob(modieifiedCred.user.id), c => c.charCodeAt(0));

  return modieifiedCred;
};

const preformatGetAssertReq = (getAssert) => {
  alert(getAssert.challenge);
  getAssert.challenge = Uint8Array.from(window.atob(getAssert.challenge), c => c.charCodeAt(0));

  for (let allowCred of getAssert.allowCredentials) {
    allowCred.id = Uint8Array.from(window.atob(allowCred.id), c => c.charCodeAt(0));
  }

  return getAssert;
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
