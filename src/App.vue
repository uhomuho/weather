<template lang="pug">
  #app
    headerComponent
    router-view
</template>

<script>
import headerComponent from '@/components/header'

export default {
  name: 'App',
  components: {
    headerComponent
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  min-width: 320px;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.row {
  width: 100%;
}
.row.body {
  min-height: 100vh; 
}
.container {
  width: 100%;
}
.section {
  padding: 2rem 1.75rem;
  width: 76rem;
  margin: 0 auto;
}
.box {
  border-radius: 8px;
  padding: 1rem 1.5rem;
  background-color: #eef6fc;
}
header .section {
  padding: .75rem 1.75rem;
}


@media screen and (max-width: 1407px) {}

@media screen and (max-width: 1215px) {
  .section {
    width: 100%;
  }
}

@media screen and (max-width: 1023px) {}

@media screen and (max-width: 768px) {}

@media screen and (max-width: 550px) {}
  
@media screen and (max-width: 424px) {}
  
@media screen and (max-width: 320px) {}
</style>
