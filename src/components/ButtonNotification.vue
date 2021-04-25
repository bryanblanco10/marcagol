<template>
  <button 
    class="btn btn__notification waves"
    v-b-tooltip.hover.left title="Active las notificaciones"
    @click="subscription"
  >
    <i class="fas fa-bell"></i>
  </button>
</template>
<script>
  // import notificationServices from '@/services/notificationServices'
  import MARCAGOL10_CONFIG from '@/config'
  export default{
    name: 'ButtonNotification',
    data(){
      return{
        register: '',
        url: MARCAGOL10_CONFIG.API_URL,
        subscriptionLocalStorage: ''
      }
    },
    methods:{
      urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');
       
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
       
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray
      },
      async registerServiceWorker(){
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          try{
            this.register = await navigator.serviceWorker.register('./serviceWorker.js',{
              scope: '/'
            })
          }
          catch(err){
            console.log(err)
          }
        }
        else{
          console.log('Service worker no soportado')
        }
      },
      async subscription(){
        console.log(this.register)
        let PUBLIC_VAPID_KEY = 'BFCy8Rjsie37ddieuC26-64_Nd8m6FvzdntJFFzjCal2wE3KQjEiYJ0nqNoiQQwokRYYdMgTtO5vPXsgFPyZhrY'

        try{
          let subscription;
          let res = await this.register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
          })

          // if(localStorage.getItem('subscription')){
          //   subscription = this.subscriptionLocalStorage
          // }else{
            subscription = JSON.stringify(res)
            localStorage.setItem('subscription', subscription)
          // }

          try{
            await fetch(this.url + 'subscription', {
              method: 'POST',
              headers:{
                'cache-control': "no-cache, private",
                'content-type': "application/json"
              },
              body: subscription
            })
          }
          catch(err){
            console.log(err)
          }
        }
        catch(err){
          console.log(err,'Solucionar el error')
          console.log('Fallo el registro')
        }
      },
    },
    created(){
      // if(localStorage.getItem('subscription')){
      //   this.subscriptionLocalStorage = localStorage.getItem('subscription')
      // }else{
        this.registerServiceWorker()
      // }
    }
  }
</script>