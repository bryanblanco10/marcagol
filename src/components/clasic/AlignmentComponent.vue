<template>
  <div>
    <span class="name__player mr-2">
      {{team.name}}
    </span>
    <span class="number__player">
      {{team.number}}
    </span>
  </div>
</template>
<script>
  export default
  {
    name: 'AlignmentComponent',
    props: ['team']
  }
</script>