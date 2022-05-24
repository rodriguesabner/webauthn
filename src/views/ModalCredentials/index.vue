<template>
  <div id="modal-container" v-if="show">
    <div class="modal-header">
      <h2>
        Credenciais Salvas
      </h2>

      <button @click="onClose()">
        <img src="../../assets/x.svg" alt="close"/>
      </button>
    </div>

    <div class="modal-content">
      <ul>
        <li
          v-for="(credential, key) in credentials"
          :key="key"
          style="
          padding: 10px;
          margin-bottom: 1em;
          border-radius: 4px;
"
        >
          <div
            style="
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            background-color: #F2F4F6;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-radius: 4px;
            border-bottom: 1px solid #ccc"
          >
            <p style="font-weight: 500">
              {{ credential.credentialID != null ? credential.credentialID.substr(0, 10) : "" }}
            </p>

            <button style="background-color: #e61c4e; color: #fff; padding: 7px 10px">
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
  overflow: auto;
}

.modal-header {
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
  color: #000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background-color: #F2F4F6;
  margin-top: 2em;
}

ul {
  background-color: #fff;
}

li {
  background-color: #F2F4F6;
}

li p {
  background-color: #F2F4F6;
}
</style>
