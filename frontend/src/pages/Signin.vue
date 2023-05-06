<template>
    <SignInComponent />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import SignInComponent from '../components/SignInComponent.vue';

export default defineComponent({
    name: 'SigninPage',
    components: {
        SignInComponent,
    },
});
</script>
<style lang="scss" scoped>

</style>
  