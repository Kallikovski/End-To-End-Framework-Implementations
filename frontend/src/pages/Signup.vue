<template>
  <SignUpComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignUpComponent from '../components/SignUpComponent.vue';

export default defineComponent({
  name: 'SignupPage',
  components: {
    SignUpComponent,
  },
});
</script>
<style lang="scss" scoped>

</style>
