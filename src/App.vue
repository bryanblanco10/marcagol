<template>
  <div id="app">
    <!-- Header -->
    <HeaderComponent />
    <router-view/>

    <!-- Button notification -->
    <ButtonNotification />
    <!-- Footer -->
    <FooterComponent />
  </div>
</template>
<script>
  import HeaderComponent from '@/components/layout/HeaderComponent'
  import FooterComponent from '@/components/layout/FooterComponent'
  import ButtonNotification from '@/components/ButtonNotification'
  export default{
    components: {
      HeaderComponent,
      FooterComponent,
      ButtonNotification
    }
  }
</script>
<style>
 @import './assets/css/styles.css'
</style>
