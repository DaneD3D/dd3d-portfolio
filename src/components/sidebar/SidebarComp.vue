<script setup lang="ts">
import SidebarIcon from './SidebarIcon.vue';
import { useTheme } from '/@/composables';

const { toggleDark } = useTheme();
</script>

<template>
  <div>
    <SidebarIcon icon="mdi:account-cowboy-hat" link="/" text="Tooltip 💡" />
    <SidebarIcon icon="mdi:playlist-edit" link="/" text="Tooltip 💡" />
    <SidebarIcon icon="mdi:gamepad-variant" link="/" text="Tooltip 💡" />
    <SidebarIcon icon="mdi:calendar" link="/" text="Tooltip 💡" />
    <SidebarIcon icon="mdi:account-cowboy-hat" link="/test" text="Tooltip 💡" />
    <div class="mt-auto flex justify-center text-4xl mb-8">
      <a href="#" @click="toggleDark">
        <i class="iconify" :data-icon="'mdi:theme-light-dark'"></i>
      </a>
    </div>
  </div>
</template>
