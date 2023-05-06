<template>
  <div class="row content">
    <div class="card">
      <div class="card-image">
        <img src="../assets/blank-profile-picture.webp">
      </div>
      <div class="card-content">
        <div class="col s12" v-if="editMode">
          <div class="input-field col s12">
            <input id="surname" type="text" class="validate" :placeholder="profile.surname" v-model="form.surname">
          </div>
          <div class="input-field col s12">
            <input id="last_name" type="text" class="validate" :placeholder="profile.lastname" v-model="form.lastname">
          </div>
          <div class="input-field col s12">
            <input id="occupation" type="text" class="validate" :placeholder="profile.occupation"
              v-model="form.occupation">
          </div>
          <div class="input-field col s12">
            <input id="age" type="number" class="validate" :placeholder="String(profile.age)"
              oninput="if(this.value < 0) this.value = 0;" v-model="form.age">
          </div>
          <div class="input-field col s12">
            <input id="email" type="email" class="validate" :placeholder="profile.email" v-model="form.email">
          </div>
        </div>
         <ul class="collection" v-if="!editMode">
          <li class="collection-item">
            <div class="property">Surname:</div>
            <div id="surname" v-if="profile.surname" class="value">{{ profile.surname }}
            </div>
            <div id="surname" v-else class="value"> --- </div>
          </li>
          <li class="collection-item">
            <div class="property">Last Name:</div>
            <div id="last_name" v-if="profile.lastname" class="value">{{ profile.lastname }}</div>
            <div id="last_name" v-else class="value"> --- </div>
          </li>
          <li class="collection-item">
            <div class="property">Occupation:</div>
            <div id="occupation" v-if="profile.occupation" class="value">{{ profile.occupation }}</div>
            <div id="occupation" v-else class="value"> --- </div>
          </li>
          <li class="collection-item">
            <div class="property">Age:</div>
            <div id="age" v-if="profile.age" class="value">{{ profile.age }}</div>
            <div id="age" v-else class="value"> --- </div>
          </li>
          <li class="collection-item">
            <div class="property">E-Mail:</div>
            <div id="email" v-if="profile.email" class="value">{{ profile.email }}</div>
            <div id="email" v-else class="value"> --- </div>
          </li>
        </ul>
      </div>
      <div class="card-action" v-if="!editMode">
        <a id="signout" class="waves-effect waves-light btn-small signout" @click="signout">Signout</a>
        <a id="edit" class="waves-effect waves-light btn-small" @click="editMode = !editMode">Edit</a>
        <a id="delete" class="waves-effect waves-light btn-small delete" @click="deleteProfile">Delete</a>
      </div>
      <div class="card-action" v-if="editMode">
        <a id="update" class="waves-effect waves-light btn-small" @click="updateProfile">Update</a>
        <a id="cancel" class="waves-effect waves-light btn-small delete" @click="editMode = !editMode">Cancel</a>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref, Ref } from 'vue';
import { useIndexStore } from '../store/index'
import { User, UpdateForm } from '../store/types'

export default defineComponent({
  name: 'ProfileComponent',
  setup()
  {
    const store = useIndexStore();

    const form: Ref<UpdateForm> = ref({} as UpdateForm)

    const signout = () =>
    {
      console.log('Signout')
      store.signOut();
    }
    const deleteProfile = () =>
    {
      store.deleteProfile();
    }
    const updateProfile = () =>
    {
      type ObjectKey = keyof typeof form.value;
      for (const property in form.value)
      {
        const key = property as ObjectKey
        if (form.value[key] === '')
        {
          delete form.value[key]
        }
      }
      store.updateProfile(form.value);
      form.value = {} as UpdateForm;
      editMode.value = false;
    }
    const profile: ComputedRef<User> = computed(() =>
    {
      console.log(store.profile);
      return store.profile;
    });

    const editMode: Ref<boolean> = ref(false);



    onMounted(() =>
    {
      store.getProfile();
    })
    return {
      profile,
      editMode,
      form,
      updateProfile,
      deleteProfile,
      signout
    }
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  margin: 1rem;

  .col {
    padding: 0;
    margin-bottom: 1.5rem;
  }

  .input-field {
    margin: 0;
    padding: 0;
  }
}

.collection {
  margin: 0;
}

.collection-item {
  display: flex;
  text-align: start;
  margin: 0;

  .property,
  .value {
    width: 50%;
    display: flex;
    justify-content: space-between;
  }
}

.card-action {
  display: flex;
  justify-content: space-between;

  a {
    cursor: pointer;
    width: 30%;
  }

  .signout {
    background-color: black !important;
  }

  .delete {
    background-color: red !important;
  }
}
</style>
  