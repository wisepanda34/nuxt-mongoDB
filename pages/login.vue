<!--login.vue-->
<script setup>
import Password from "~/components/UI/Password.vue";
import Button from "~/components/UI/Button.vue";
import Input from "~/components/UI/Input.vue";
import CheckBox from "~/components/UI/CheckBox.vue";
import BaseModal from "~/components/modal/BaseModal.vue";
import { useAuth } from "~/store/auth";
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, maxLength } from '@vuelidate/validators'

definePageMeta({
  layout: 'custom'
})

const forgotPassword = ref(false)
const codeSending = ref(false)
const modalText = ref('')
const authStore = useAuth()

// const state = reactive({
//   email: 'bob@mail.qwqw',
//   password: 'qwqw',
// })
const state = reactive({
  email: 'admin@mail.com',
  password: 'admin',
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(4), maxLength: maxLength(20)},
}

const v$ = useVuelidate(rules, state)

const handleLogin = async () => {
  const result = await v$.value.$validate()
  if(!result){
    console.log('invalid data');
    return
  }
  codeSending.value = true

  try{
    const data = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: state.email,
        password: state.password
      })
    }
    const response = await fetch('/api/login', data)
    console.log('response: ', response);
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseBody = await response.json();
    authStore.login(responseBody.body.user)
    localStorage.setItem('access_token', responseBody.body.accessToken) 
    
    if(responseBody.body.user.role === 'user'){
      navigateTo('/profile')
    } else if (responseBody.body.user.role === 'admin'){
      navigateTo('/admin')
    }

  }catch (error) {
    console.log('Error catch:', error.message);
  }finally {
    codeSending.value = false
  }
}
const cancelLogin = () => {
  navigateTo('/')
}
const openModal = (text) => {
  modalText.value = text
  setTimeout(()=>{
    modalText.value = ''
  }, 2000)
}
const updateModalText = (textNull) => {
  modalText.value = textNull
}
</script>

<template>
  <section class="registration">
    <h1 class="text-center text--fz24">Please login</h1>
    <form class="registration__form" @submit.prevent="handleLogin">
      <Input
        id="emailClient"
        v-model.trim="state.email"
        textLabel="Email"
        type="text"
        placeholder="enter your email"
      />
      <p v-for="error in v$.email.$errors" :key="error.$uid" class="text--red">
        {{ error.$message }}
        <br>
      </p>
      <Password
        id="passwordClient"
        v-model.trim="state.password"
        textLabel="Password"
        placeholder="min 4 characters"
        autocomplete="current-password"
      />
      <p v-for="error in v$.password.$errors" :key="error.$uid" class="text--red">
        {{ error.$message }} 
        <br><br>
      </p>
      <CheckBox v-model="forgotPassword"/>
      <div class="registration__buttons">
        <Button
          text="Login"
          type="submit"
          class="registration__btn"
          :class="{ 'btn__disabled': codeSending }"
          :disabled="codeSending"
        />
        <Button
          text="Cancel"
          type="button"
          class="registration__btn"
          @click.prevent="cancelLogin"
        />
      </div>
    </form>
    
    <BaseModal
      :modalText="modalText"
      @update:modalText="updateModalText"
    />
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';
.registration{

  &__form{
    margin: 0 auto;
    width: 400px;
  }
  &__buttons{
    display: flex;
    justify-content: space-between;

    margin-top: 40px;
  }
  &__send-code{

    margin-top: 15px;
    span{
      cursor: pointer;
      &:hover{
        color: $blue-700;
      }
    }
  }
  &__put-code{
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 20px;

  }
  &__input-code{
    width: 80px;
    height: 25px;
    border: 1px solid $grey-4;
    border-radius: 3px;
    padding: 0 12px;
    &:hover{
      border: 1px solid $grey-5;
    }
    &:focus{
      border: 1px solid $grey;
    }
  }
}
</style>