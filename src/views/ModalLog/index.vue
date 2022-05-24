<template>
  <div id="modal-container" v-if="show">
    <div>
      <h2>
        Log da aplicação
      </h2>

      <button @click="onClose()">
        <img src="../../assets/x.svg" alt="close"/>
      </button>
    </div>

    <p>{{ log }}</p>
  </div>
</template>

<script>
export default {
  name: 'ModalLog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    log: {
      type: String,
      default: '',
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
