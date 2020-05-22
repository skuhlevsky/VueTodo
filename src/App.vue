<template>
  <div id="app">
    <h1 class="app-name">
      <router-link to="/" @click.native.prevent="handleOpenModal" class="link__home">
        My Notes
      </router-link>
    </h1>

    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    handleOpenModal: function(e) {
      e.preventDefault()
      this.$router.push('/', () => {})
    }
  }
}
</script>