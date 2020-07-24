<template lang="pug">
  .row.body
    .container
      .section(v-if="weather")
        h2
          |День {{currentDay}}

        .navs
          .nav.prev(
            v-if="currentDay!==minDay",
            @click="prevDay()")
            |Предыдущий день
          .nav.next(
            v-if="currentDay!==maxDay",
            @click="nextDay()")
            |Следующий день
        .weather
          |{{getWeatherDay(weather[currentDay][hour.currentHour]['dt'])}}
          .hours
            |Погода через:
            .buttons
              p(
                v-bind:class="0 == hour.currentHour ? 'is-active' : ''",
                @click="setCurrentHour(0)")
                | 0ч
              p(
                v-for="index in hour.maxHour",
                v-bind:class="index == hour.currentHour ? 'is-active' : ''",
                @click="setCurrentHour(index)")
                |{{index*3}}ч

        .box
          .container
            .head
              h2
                |{{weather.city}}
              p(@click="getAnotherCity()") &#8612; Но можно и другой ;)
            .content
              img(src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png", alt="weather")
              p {{Math.floor(weather[currentDay][hour.currentHour].main.temp)}} &deg;C
      .section(v-else)
        form(@submit.prevent="getWeather()")
          .field
            label В каком городе посмотрим погодку?:)
            .control
              input(
                type="text",
                v-model="city")
              p.help(v-if="empty")
                |Нет города - нет погоды
              p.help(v-if="error")
                |Неизвестная ошибка, проверье правильность написания города
          input.button(type="submit")
</template>

<script>

import axios from 'axios'

export default {
  name: 'Homepage',
  data(){
    return {
      weather: null,
      currentDay: 1,
      maxDay: 5,
      minDay: 1,
      hour: {
        maxHour: 8,
        minHour: 1,
        currentHour: 0
      },
      apikey: null,
      city: null,
      empty: false,
      error: false
    }
  },
  methods: {
    async getWeather() {

      if (!this.city) {
        this.empty = true
        return false
      }
      this.empty = false
      var request = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&lang=ru&appid=${this.apikey}&units=metric`)
        .catch(()=>{
          this.error = true
        })
      var index = 0,
          result = {}
      result['city'] = request.data.city.name
      result[1] = []
      result[2] = []
      result[3] = []
      result[4] = []
      result[5] = []
      while (index !== 7) {
        result[1].push(request.data.list[index])
        index++
      }
      while (index !== 15) {
        result[2].push(request.data.list[index])
        index++
      }
      while (index !== 23) {
        result[3].push(request.data.list[index])
        index++
      }
      while (index !== 31) {
        result[4].push(request.data.list[index])
        index++
      }
      while (index !== 39) {
        result[5].push(request.data.list[index])
        index++
      }
      this.weather = result
      this.getWeatherIntervals()
    },
    nextDay() {
      this.currentDay++
      this.getWeatherIntervals()
    },
    prevDay() {
      this.currentDay--
      this.getWeatherIntervals()
    },
    getWeatherDay(unixTimestamp) {
      var date    = new Date(unixTimestamp * 1000),
          hours   = date.getHours(),
          minutes = date.getMinutes(),
          year    = date.getFullYear(),
          month   = date.getMonth()+1,
          day     = date.getDate()

      return `Дата ${day}.${month}.${year}, Время ${hours}:${minutes}`
    },
    getWeatherIntervals(){
      for (var i = 0; i < this.weather[this.currentDay].length; i++) {
        this.hour.maxHour = i
      }
    },
    setCurrentHour(val){
      this.hour.currentHour = val
    },
    getAnotherCity(){
      this.weather = null
      this.empty = null
      this.error = null
    }
  },
  mounted() {
    if (!localStorage.apikey) {
      this.$router.push({name: 'Login'})
    } else {
      this.apikey = localStorage.apikey
    }
  }
}

</script>

<style scoped>
  h2 + p {
    text-decoration: underline;
    color: #00d1b2;
    cursor: pointer;
  } 

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
  .navs {
    display: flex;
  }
  .navs .nav {
    color: rgba(0, 0, 0, 0.8);
    padding: .3rem 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    box-shadow: 1px 1px 8px rgba(50, 50, 50, 0.4);
    cursor: pointer;
    user-select: none;
    transition: all .3s ease-in-out;
  }
  .navs .nav:active {
    transform: scale(0.95);
  }
  .navs .nav.next {
    margin-left: auto;
  }
  .hours {
    margin-top: .5rem;
  }
  .hours .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: .5rem auto 2rem;
  }
  .hours .buttons p {
    display: inline-block;
    padding: .2rem .5rem;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin: 0 .25rem;
    cursor: pointer;
  }
  .hours .buttons p.is-active {
    background-color: #363636;
    color: #fff;
  }
  .box .content p {
    font-size: 2rem;
    font-weight: 600;
  }
</style>
