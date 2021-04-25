<template>
	<div class="card card__championship p-2">
    <router-link :to="{name: 'clasicSoccerWorld', params:{slug: championship.slug}}">
      <div class="row">
        <div class="col-3">
          <img :src="url + '/get-image-liga/' + championship.image" alt="marcagol">
        </div>
        <div class="col-9 d-flex align-items-center justify-content-center">
          <h4 class="title__championship text-center">{{championship.name}}</h4>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
	export default
	{
		name: 'CardChampionship',
		props: ['championship','url']
	}
</script>