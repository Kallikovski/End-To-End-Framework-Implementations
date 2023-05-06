<template>
  <div class="row content">
    <div class="card light-grey darken-1">
      <div class="card-content">
        <span class="card-title">Signup</span>
        <div class="row">
          <form class="col s12" @submit.prevent="submit">
            <div class="input-field col s12">
              <input id="surname" type="text" class="validate" v-model="form.surname" required>
              <label for="surname">Surname</label>
            </div>
            <div class="input-field col s12">
              <input id="last_name" type="text" class="validate" v-model="form.lastname" required>
              <label for="last_name">Last Name</label>
            </div>
            <div class="input-field col s12">
              <input id="occupation" type="text" class="validate" v-model="form.occupation" required>
              <label for="occupation">Occupation</label>
            </div>
            <div class="input-field col s12">
              <input id="age" type="number" class="validate" v-model="form.age"
                oninput="if(this.value < 0) this.value = 0;" required>
              <label for="age">Age</label>
            </div>
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" v-model="form.email" required>
              <label for="email">Email</label>
            </div>
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" v-model="form.password" required>
              <label for="password">Password</label>
            </div>
            <div class="input-field col s12">
              <button id="submit" class="btn waves-effect waves-light" type="submit" name="action">Submit
              </button>
            </div>
            <div class="input-field col s12">
              Already signed up? Go to<router-link to="signin" class="text-accent">
                sign in.</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useIndexStore } from '../store/index'

export default defineComponent({
  name: 'SignUpComponent',
  setup()
  {
    const store = useIndexStore()
    const form = reactive({
      surname: '',
      lastname: '',
      occupation: '',
      age: NaN,
      email: '',
      password: ''
    })
    const submit = () =>
    {
      store.signUp(
        form.surname,
        form.lastname,
        form.occupation,
        form.age,
        form.email,
        form.password
      );
      console.log('submit')
    }
    return {
      form,
      submit,
    }
  }
});
</script>

<style scoped lang="scss">
.card {
  margin: 1rem;
}

.btn {
  width: 100%;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .container {
    margin: 0;
  }
}
</style>
