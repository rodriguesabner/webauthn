<template>
  <div id="app">
    <modal-log :show="openModalLog" :log="log" :onClose="handleCloseModalLog"/>
    <modal-credentials
      :show="openModalCredentials"
      :credentials="credentials"
      :onClose="handleCloseModalCredentials"
    />
    <div id="container">
      <div>
        <header>
          <img src="./assets/menu.svg" alt="menu"/>
          <img src="./assets/bell.svg" alt="bell"/>
        </header>

        <h1 id="logo">Minha Company</h1>
      </div>

      <div class="login-box">
        <label for="username">
          Display Name

          <input
            id="username"
            placeholder="Seu nome"
            v-model="displayName"
          />
        </label>

        <label for="username">
          Name/Email (Único)

          <input
            id="username"
            type="email"
            placeholder="seu@email.com"
            v-model="nameEmailUnique"
          />
        </label>

        <button id="already-account" @click="login()">
          acessar Conta
        </button>

        <button
          id="btn-register"
          @click="registerWebAuthN()">
          Registrar
        </button>
      </div>

      <footer>
        <button @click="handleOpenModalLog()">
          <img src="./assets/flag.svg" alt="flag"/>
          Log
        </button>

        <button @click="handleOpenModalCredentials()">
          <img src="./assets/database.svg" alt="database"/>
          Credenciais
        </button>
      </footer>
    </div>
  </div>
</template>

<script src="./views/Home.js"/>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #e61c4e;
}

#app {
  display: block;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: calc(100vh - 7em);
}

#container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 1em 2em;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1em;
  width: 100%;
}

#logo {
  font-size: 26px;
  color: #fff;
}

.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
  max-width: 100%;
}

.login-box label {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-size: 12px;
  color: #fff;
  width: 100%;
}

.login-box input {
  margin-top: 10px;
  width: 100%;
  background-color: transparent;
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #F2F4F6;
  color: #fff;
  outline: 0;
  border-bottom: 1px solid #fff;
}

.login-box input::placeholder {
  color: #ddd;
}

#already-account {
  background-color: #fff;
  font-weight: 700;
  min-height: 48px;
  padding: 10px;
  border-radius: 20px;
  font-size: 14px;
  border: 0;
  color: #e61c4e;
  width: 100%;
  cursor: pointer;
  margin-top: 2em;
}

#btn-register {
  background-color: transparent;
  padding: 8px 10px;
  border: 0;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3em;
}

footer button {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  background-color: transparent;
  border: 0;
  font-size: 16px;
}

footer button img {
  margin-bottom: 10px;
}

</style>
