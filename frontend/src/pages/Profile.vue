<template>
  <ProfileComponent />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import ProfileComponent from '../components/ProfileComponent.vue';

export default defineComponent({
  name: 'ProfilePage',
  components: {
    ProfileComponent,
  },
});
</script>
<style lang="scss" scoped>

</style>
  