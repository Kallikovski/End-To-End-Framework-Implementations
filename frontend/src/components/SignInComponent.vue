<template>
    <div class="row content">
        <div class="card light-grey darken-1">
            <div class="card-content">
                <span class="card-title">Signin</span>
                <div class="row">
                    <form class="col s12" @submit.prevent="submit">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate" v-model="form.email" required>
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="password" type="password" class="validate" v-model="form.password" required>
                            <label for="password">Password</label>
                        </div>
                        <div class="input-field col s12">
                            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                            </button>
                        </div>
                        <div class="input-field col s12">
                            Need to sign up first? Go to<router-link to="signup" class="text-accent">
                                sign up.</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue';
import { useIndexStore } from '../store/index'

export default defineComponent({
    name: 'SignUpComponent',
    setup()
    {
        const store = useIndexStore();
        const form = reactive({
            email: '',
            password: ''
        })
        const error: Ref<String | null> = ref(null);
        const submit = async () =>
        {
            const result = await store.signIn(form.email, form.password)
            error.value = result
        }
        return {
            form,
            submit,
        }
    }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
    margin: 1rem;
}

.btn {
    width: 100%;
    font-weight: bold;
}

.errror {
    color: red;
}

@media only screen and (max-width: 600px) {
    .container {
        margin: 0;
    }
}
</style>
  