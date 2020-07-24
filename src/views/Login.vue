<template lang="pug">
  .row.body
    .container
      .section
        h2
          |Авторизация
      .box
        form(@submit.prevent="checkApiConnection()")
          .field
            label(for="#apikey") Ваш ключ авторизации api
            .control
              input#apikey(
                type="text",
                v-model="apikey")
              p.help(v-if="empty")
                | Введите ключ авторизации!
              p.help(v-if="error")
                | Неизвестная ошибка! Проверьте правильность написания ключа и активирован ли он
          input.button(type="submit")
        p(v-if="apikey")
          |Ваш api ключ:
          br
          |{{apikey}}
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data(){
    return {
      apikey: null,
      empty: false,
      error: false,
      req: null
    }
  },
  methods: {
    async checkApiConnection(){
      if (!this.apikey) {
        this.empty = true
        return false
      }
      var request = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Moscow&appid=${this.apikey}`)
          .then(()=>{
            localStorage.apikey = this.apikey
            this.$router.push({name: 'Homepage'})
          })
          .catch(()=>{
            this.error = true
          })

      this.req = request

    }
  },
  mounted() {
    if (localStorage.apikey) {
      this.$router.push({name: 'Homepage'})
    }
  }
}

</script>

<style scoped>
 label {
  font-size: 1.25rem;
  font-weight: 600;
 }
 input {
  width: 20rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border: 1px solid #0a0a0a;
  border-radius: 4px;
 }
 input.button {
  width: fit-content;
  cursor: pointer;
  transition: all .3s ease-in-out;
 }
 input.button:focus {
  transform: scale(0.95);
 }
 p.help {
  color: #f14668;
  margin: 0;
 }
</style>
