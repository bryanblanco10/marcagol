<template>
  <div>
    <img  class="logo__team" :src="url + '/get-image-team/' + team.logo" alt="marcagol" v-if="team">
    <div class="name__team mb-1" v-if="team">{{team.name}}</div>
  </div>
</template>
<script>
  export default
  {
    name: 'TeamComponent',
    props: ['team','url']
  }
</script>