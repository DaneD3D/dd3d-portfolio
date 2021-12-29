<script setup lang="ts">
const props = defineProps<{
  icon: string;
  link: string;
  text: string;
}>();
</script>

<template>
  <router-link v-bind:to="props.link">
    <span class="iconify sidebar-icon group" v-bind:data-icon="props.icon">
      <!---
      <span class="sidebar-tooltip group-hover:scale-100">
        {{ props.text }}
      </span>
      -->
    </span>
  </router-link>
</template>
