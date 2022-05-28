<template>
  <div id="app">
    <modal-log :show="openModalLog" :log="log" :onClose="handleCloseModalLog"/>
    <modal-credentials
      :show="openModalCredentials"
      :credentials="credentials"
      :onClose="handleCloseModalCredentials"
    />
    <div id="container-mobile">
      <div class="header-mobile">
        <h1 id="logo">Webauthn</h1>

        <button @click="handleOpenModalLog()">
          <img src="./assets/flag.svg" alt="flag"/>
          Log
        </button>
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
          Email

          <input
            id="username"
            type="email"
            placeholder="seu@email.com"
            v-model="nameEmailUnique"
          />
        </label>

        <button id="already-account" @click="login()">
          acessar conta
        </button>

        <button
          id="btn-register"
          @click="registerWebAuthN()">
          Registrar
        </button>
      </div>

      <div class="footer-bottom_end"/>

      <footer/>

    </div>
    <div id="container-desktop">
      <header>
        <h1>
          Webauthn
        </h1>
      </header>

      <div class="hero-desktop" style="position: relative">
        <div style="position: absolute; top: 0; right: 0; left: 0; bottom: 0">
          <div class="color-change-5x"/>
          <img
            src="https://images.pexels.com/photos/4350210/pexels-photo-4350210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="hero-image"/>
        </div>

        <div
          style="
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            padding: 3em;
          ">
          <div
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              height: 100%;
            ">
            <div class="left-content">
              <h1>
                O futuro é a razão que a gente faz planos.
              </h1>
              <p>
                Escolha o futuro. Comece a realizar a autenticação de uma nova maneira
              </p>
            </div>

            <div class="right-content">
              <h1>
                Informe os seus dados para entrar na conta
              </h1>
              <div>
                <input placeholder="Display Name" v-model="displayName"/>

                <label for="email">
                  <input placeholder="Email" type="email" v-model="nameEmailUnique"/>
                </label>

                <div class="footer">
                  <button class="access-account" type="button" @click="login()">
                    acessar conta
                  </button>

                  <button
                    class="register-account"
                    type="button"
                    @click="registerWebAuthN()"
                  >
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
}

body {
  background-color: #fff;
}

#app {
  display: block;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: calc(100vh - 7em);
}

#container-mobile {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 1em 2em;
}

.header-mobile {
  display: none;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1em;
}

.header-mobile button {
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: transparent;
  border: 0;
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
  border-radius: 0;
  padding: 8px 10px;
  border: 0;
  color: #fff;
  outline: 0;
  border-bottom: 1px solid #fff;
}

.login-box input::placeholder {
  color: #ddd;
}

#already-account {
  background-image: linear-gradient(90deg, #375ced, #8a4ef4);
  font-weight: 700;
  min-height: 48px;
  padding: 10px;
  border-radius: 20px;
  font-size: 14px;
  border: 0;
  color: #fff;
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

.footer-bottom_end {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 500px;
  z-index: -1;
}

.footer-bottom_end::before {
  content: "";
  position: absolute;
  bottom: -15em;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-image: url("./assets/bottom_gradient.png");
  background-size: cover;
  background-position: center;
}

#container-desktop {
  width: 100%;
}

#container-desktop header {
  height: 56px;
  padding-right: 48px;
  padding-left: 48px;
  display: flex;
  align-items: center;
}

#container-desktop .hero-desktop {
  width: 100%;
  height: calc(100vh - 56px);
  overflow: hidden;
  position: relative;
}

#container-desktop div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#container-desktop .left-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  color: #fff;
  backdrop-filter: blur(10px);
  padding: 2em;
  border-radius: 20px;
}

#container-desktop .left-content p {
  margin-top: 10px;
  font-size: 18px;
}

#container-desktop .right-content {
  background-color: #fff;
  width: 500px;
  padding: 2em;
  border-radius: 10px;
  margin-left: 20em;
}

#container-desktop .right-content h1 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 2em;
}

#container-desktop .right-content input {
  padding: 10px;
  border: 0;
  outline: 0;
  width: 100%;
  border-bottom: 1px solid #F2F4F6;
  margin-bottom: 1em;
}

#container-desktop .footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1em;
}

#container-desktop .access-account {
  border-radius: 20px;
  border: 0;
  height: 48px;
  padding: 0 20px;
  background-color: #e61c4e;
  outline: 0;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition-duration: 200ms;
  font-weight: 600;
}

#container-desktop .access-account:hover {
  background-color: #a91e40;
}

#container-desktop .register-account {
  background-color: transparent;
  border: 0;
  margin-top: 1em;
  font-size: 15px;
  cursor: pointer;
}

.color-change-5x {
  -webkit-animation: color-change-5x 8s linear infinite alternate both;
  animation: color-change-5x 8s linear infinite alternate both;
  opacity: .2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

@-webkit-keyframes color-change-5x {
  0% {
    background: #19dcea;
  }
  100% {
    background: #b22cff;
  }
}

@keyframes color-change-5x {
  0% {
    background: #19dcea;
  }
  100% {
    background: #b22cff;
  }
}

@media (max-width: 1100px) {
  #container-desktop .right-content {
    margin-left: 2em;
  }
}

@media (max-width: 768px) {
  body {
    background-color: #0c081c;
  }

  #container-desktop {
    display: none;
  }

  #container-mobile {
    display: flex;
  }

  .header-mobile {
    display: flex;
  }
}

</style>
