<script lang="ts">
import { defineComponent } from 'vue';
import SidebarComp from './components/sidebar/SidebarComp.vue';

export default defineComponent({
  name: 'App',
  components: { SidebarComp },
});
</script>

<template>
  <div id="mainApp">
    <SidebarComp
      class="
        absolute
        top-0
        h-screen
        w-24
        flex flex-col
        bg-primary
        text-secondary
        shadow-2xl
      "
    />
    <main class="ml-24">
      <router-view />
    </main>
  </div>
</template>
