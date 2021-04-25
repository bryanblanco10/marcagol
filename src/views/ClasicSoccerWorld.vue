<template>
  <div class="container mt-1 mb-5">
    <div class="row">
      <div class="col-2 mb-0 p-0">
        <a class="btn btn__behind" @click="behind">
          <i class="fas fa-reply-all"></i>
        </a>
      </div>
      <div class="col-12">
        <div class="title__section text-center mb-3">
          {{nameChampionship.name}}
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-12 col-12 mb-4">
        <div class="card card__championship text-center p-3">
          <div class="row mb-3">
            <div class="col-4" v-if="clasicChampionships">
              <TeamComponent :team="clasicChampionships.team1" :url="url" />
            </div>
            <div class="col-4">
              <ResultMatchComponente
                :resultTeam1="resultTeam1"
                :resultTeam2="resultTeam2" 
              />
              <template v-if="isActive2">
                <div class="time__match">
                  Final del partido
                </div>
              </template>
              <template v-else>
                <div class="time__match">
                  <template v-if="!isActive">1T</template>
                  <template v-if="isActive">2T</template>
                </div>
              </template>
              <TimeComponent :minutes="minutes" :seconds="seconds" />
              <template v-if="isActive">
                <button 
                  class="btn btn__start"
                  @click="startMatch2T"
                >
                  Iniciar 2T
                </button>
              </template>
              <template v-else>
                <button 
                  class="btn btn__start"
                  @click="startMatch1T"
                >
                  Iniciar 1T
                </button>
              </template>
            </div>
            <div class="col-4" v-if="clasicChampionships.team2">
              <TeamComponent :team="clasicChampionships.team2" :url="url" />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <a class="team__alignment" @click="openCollapse">
                <i class="fas fa-angle-down"></i>
                Alineaciones
              </a>
            <b-collapse id="collapse-1">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-6">
                  <div class="player__team mb-2">
                    <div class="name__team mb-2" v-if="clasicChampionships.team1">
                      {{clasicChampionships.team1.name}}
                    </div>
                    <template v-if="clasicChampionships.team1">
                      <div
                        v-for="(team, index) in clasicChampionships.team1.team"
                        :key="index" 
                      >
                        <AlignmentComponent :team="team" />
                      </div>
                    </template>
                    <div class="coach__team mt-2" v-if="clasicChampionships.team1">
                      DT. {{clasicChampionships.team1.coach}}
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-6">
                  <div class="player__team mb-2">
                    <div class="name__team  mb-2" v-if="clasicChampionships.team2">
                      {{clasicChampionships.team2.name}}
                    </div>
                    <template v-if="clasicChampionships.team2">
                      <div 
                        v-for="(team, index) in clasicChampionships.team2.team"
                        :key="index"
                      >
                        <AlignmentComponent :team="team" />
                      </div>
                    </template>
                    <div class="coach__team mt-2" v-if="clasicChampionships.team2">
                      DT. {{clasicChampionships.team2.coach}}
                    </div>
                  </div>
                </div>
              </div>
            </b-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MARCAGOL10_CONFIG from '@/config'
  import marcagolServices from '@/services/marcagolServices'
  import notificationServices from '@/services/notificationServices'
  import TeamComponent from '@/components/clasic/TeamComponent'
  import AlignmentComponent from '@/components/clasic/AlignmentComponent'
  import TimeComponent from '@/components/clasic/TimeComponent'
  import ResultMatchComponente from '@/components/clasic/ResultMatchComponente'
  export default{
    name: 'ClasicSoccerWorld',
    data(){
      return{
        url: MARCAGOL10_CONFIG.API_URL,
        clasicChampionships: [],
        nameChampionship: '',
        minutes: 0,
        seconds: 0,
        chronometer: '',
        intervalGolTeam: '',
        isActive: false,
        isActive2: false,
        resultTeam1: 0,
        resultTeam2: 0,
      }
    },
    components:{
      TeamComponent,
      AlignmentComponent,
      TimeComponent,
      ResultMatchComponente
    },
    methods:{
      openCollapse(){
        this.$root.$emit('bv::toggle::collapse', 'collapse-1')
      },
      behind(){
        this.$router.go(-1)
      },
      async loadClasics(slug){
        try{
          let {data:res} = await marcagolServices.getClasics(slug)
          // console.log(res)
          this.nameChampionship = res.name
          this.clasicChampionships = res
        }
        catch(err){
          console.log(err)
        }
      },
      startMatch1T(){
        if(localStorage.getItem('subscription')){
          this.subscription = localStorage.getItem('subscription')
          this.intervalGol()
          this.chronometer = window.setInterval(() =>{
            this.onSecondAdd1T()
          }, 1000)
        }else{
          console.log('Debe subscribirse MODAL')
        }
      },
      onSecondAdd1T(){
        this.seconds++
        if(this.seconds === 60){
          this.minutes++
          this.seconds = 0
        }

        if(this.minutes === 45){
          window.clearInterval(this.chronometer)
          window.clearInterval(this.intervalGolTeam)
          this.isActive = true
        }
      },
      startMatch2T(){
        if(localStorage.getItem('subscription')){
          this.subscription = localStorage.getItem('subscription')
          this.intervalGol()
          this.chronometer = window.setInterval(() =>{
            this.onSecondAdd2T()
          }, 1000)
        }else{
          console.log('Debe subscribirse MODAL')
        }
      },
      onSecondAdd2T(){
        this.seconds++
        if(this.seconds === 10){
          this.minutes++
          this.seconds = 0
        }

        if(this.minutes === 90){
          window.clearInterval(this.chronometer)
          window.clearInterval(this.intervalGolTeam)
          this.minutes = 0
          this.isActive2 = true
        }
      },
      intervalGol(){
        this.intervalGolTeam = window.setInterval(() =>{
          this.increaseResult()
        }, 60000)
      },
      increaseResult(){
        console.log('gol')
        let team = Math.floor(Math.random() * 2)
        console.log(team)
        if(team == 0){
          let team1 = this.clasicChampionships.team1
          this.goalNotification(team1)
          this.resultTeam1 = 1 + this.resultTeam1
        }else{
          let team2 = this.clasicChampionships.team2
          this.goalNotification(team2)
          this.resultTeam2 = 1 + this.resultTeam2
        }
      },
      async goalNotification(team){
          let goal = {
            team: team,
            subscription: this.subscription
          }
        try{
          await notificationServices.postNewGol(goal)
          // await fetch(this.url + 'new-gol', {
          //   method: 'POST',
          //   headers:{
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify({ 
          //     message: team
          //   }),
          // })
        }
        catch(err){
          console.log(err)
        }
      }
    },
    beforeRouteUpdate(to, from, next){
      let slug = to.slug
      this.loadClasics(slug)
      next()
    }, 
    created(){
      let slug = this.$route.params.slug
      this.loadClasics(slug)
    }
  }
</script>