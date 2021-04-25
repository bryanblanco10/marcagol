<template>
  <div class="container mt-4 mb-5">
    <div class="title__section text-center mb-3">Clásicos del Futbol Mundial</div>
    <div class="row">
      <div 
        class="col-lg-4 col-md-6 mb-4"
        v-for="(championship, index) in championships"
        :key="index"
      >
        <CardChampionship :championship="championship" :url="url" />
      </div>
    </div>
<!-- 
    <button class="btn btn-danger rounded-circle" @click="goal">
      Gooolll
    </button> -->
  </div>
</template>

<script>
  import CardChampionship from '@/components/cards/CardChampionship'
  import MARCAGOL10_CONFIG from '@/config'
  import marcagolServices from '@/services/marcagolServices'
  // import notificationServices from '@/services/notificationServices'
  export default {
    name: 'Home',
    data(){
      return{
        championships: [],
        url: MARCAGOL10_CONFIG.API_URL
      }
    },
    components:{
      CardChampionship
    },
    methods:{
      async loadChampionships(){
        try{
          let {data:championships} = await marcagolServices.getChampionships()
          this.championships = championships
        }
        catch(err){
          console.log(err)
        }
      }
    },
    created(){
      this.loadChampionships()
    }
  }
</script>
