<template>
  <div class="layout">
    <x-main></x-main>
  </div>
</template>

<script>
import xHeader from './header'
import xSidebar from './sidebar'
import xMain from './main'

export default {
  components: {
    xHeader,
    xSidebar,
    xMain
  }
}
</script>

<style lang="scss" scoped>

</style>