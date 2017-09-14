<template>
	<div>
    <h1>Bus line information</h1>
    <h2>{{ $route.params.line }}</h2>
  </div>
</template>


<script>
export default {
  name: 'BusLine'
}
</script>