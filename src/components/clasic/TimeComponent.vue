<template>
    <div class="time__match mb-2">{{minu}}:{{secon}}</div>
</template>
<script>
  export default
  {
    name: 'TimeComponent',
    props: ['minutes','seconds'],
    data(){
      return{
        newMinutes: '',
        newSeconds: ''
      }
    },
    watch:{
      minutes(newMinute){
        this.newMinutes = newMinute
      },
      seconds(newSecond){
        this.newSeconds = newSecond
      }
    },
    computed:{
      minu(){
        const minutes = Math.floor(this.newMinutes)
        return this.getPaddedTime(minutes)
      },
      secon(){
        const seconds = Math.floor(this.newSeconds)
        return this.getPaddedTime(seconds)
      }
    },
    methods:{
      getPaddedTime(value){
        return value.toString().padStart(2, '0')
      },
    }
  }
</script>