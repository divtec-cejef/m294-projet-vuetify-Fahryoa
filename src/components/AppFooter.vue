<template>
  <v-footer
    app
    class="d-flex justify-center"
    height="40"
  >

    <div class="text-center">
      &copy; 2025 Paydex
    </div>
  </v-footer>
</template>

<script setup>

</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
