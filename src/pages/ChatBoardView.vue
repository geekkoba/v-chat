<script>
export default {
  methods: {
    goToAbout() {
      this.$router.push('/login')
    },
  },
}
</script>

<template>
  <h2>HomeView</h2>
  <button @click="goToAbout">Go to About</button>
</template>