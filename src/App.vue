<template>
  <div id="app">
    <div id="container">
      <header>
        <img alt="biometric" style="width: 200px"
             src="https://www.creativefabrica.com/wp-content/uploads/2021/06/03/Biometric-Fingerprint-Scanning-Icon-Graphics-12873794-1-1-580x386.jpg"/>
        <h1 style="text-align: center">
          Entrar com Biometria
        </h1>
        <p style="margin-top: 10px; color: #777; text-align: center">
          Entre rapidamente em sua conta usando sua biometria
        </p>
      </header>

      <div class="login-box">
        <label for="username">
          Nome

          <input
            id="username"
            placeholder="Seu nome"
            v-model="username"
          />
        </label>

        <label for="username">
          Email

          <input
            id="username"
            type="email"
            placeholder="seu@email.com"
            v-model="email"
          />
        </label>
        <label for="username">
          Senha

          <input
            id="username"
            type="password"
            placeholder="senha"
            v-model="password"
          />
        </label>
        <button
          id="btn-login"
          @click="registerWebAuthN()">
          Registrar
        </button>
      </div>

      <button id="already-account" @click="login()">
        Já tem uma conta? Clique aqui
      </button>

      <p style="
    max-width: 500px;
    width: 100%;
    overflow: auto;
    margin-top: 20px;
    min-height: 200px;
    padding: 20px;
    background-color: #F2F4F6">
        {{ log }}
      </p>

      <div>
        <p style="margin-top: 2em;">
          Credenciais salvas
        </p>
        <ul
          style="
        max-width: 500px;
        width: 100%;
        overflow: hidden;
        list-style-type: none;
        padding: 10px;
        background-color: #F2F4F6;"
        >
          <li
            v-for="(credential, key) in credentials"
            :key="key"
            style="
          padding: 10px;
          margin-bottom: 1em;
          border-radius: 4px;
"
          >
            <div>
              <p>{{ credential.credentialID }}</p>

              <button>
                Excluir
              </button>
            </div>
            <p>Auth Type: {{ credential.type }}</p>
            <p>Environment:
              {{ `${credential.browser} / ${credential.os} / ${credential.platform}` }}
            </p>
            <p>Transports: N/A</p>
            <p>Enrolled: {{ new Date(credential.registered).toLocaleString() }}</p>
            <p>Public Key: {{ credential.credentialPublicKey }}</p>
            <p>Credential ID: {{ credential.credentialID }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./views/Home.js"/>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
}

#app {
  display: block;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  padding: 2em;
  color: #000;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#root > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 250px;
}

.login-box {
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  max-width: 250px;
}

.login-box label {
  margin-bottom: 10px;
  font-size: 12px;
}

#username {
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #F2F4F6;
  background-color: #fff;
  color: #000;
  outline: 0
}

#btn-login {
  background-color: #F2F4F6;
  padding: 8px 10px;
  border: 0;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
  color: dodgerblue;
}

#already-account {
  margin-top: 2.5em;
  font-weight: 600;
  font-size: 14px;
  border: 0;
  color: dodgerblue;
  max-width: 100%;
  cursor: pointer;
}
</style>
