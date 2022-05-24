<template>
  <div id="modal-container" v-if="show">
    <div>
      <h2>
        Credenciais Salvas
      </h2>

      <button @click="onClose()">
        <img src="../../assets/x.svg" alt="close"/>
      </button>
    </div>

    <div>
      <ul
        style="
        max-width: 500px;
        width: 100%;
        overflow: hidden;
        list-style-type: none;
        padding: 10px;
        margin-top: 1em;
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
</template>

<script>
export default {
  name: 'ModalCredentials',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    credentials: {
      type: Array,
    },
    onClose: {
      type: Function,
    },
  },
};
</script>

<style scoped>
#modal-container {
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 1em 2em;
}
#modal-container div {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#modal-container h2 {
  background-color: #fff;
}

#modal-container button {
  background-color: #fff;
}

#modal-container img {
  background-color: #fff;
}

#modal-container p {
  background-color: #F2F4F6;
  margin-top: 2em;
  padding: 10px;
  border-radius: 5px;
}
</style>
