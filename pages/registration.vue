<!--registration.vue-->
<script setup>
import Input from "~/components/UI/Input.vue";
import Password from "~/components/UI/Password.vue";
import Button from "~/components/UI/Button.vue";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from "@vuelidate/validators";
import BaseModal from "~/components/modal/BaseModal.vue";
import { body } from "express-validator";

definePageMeta({
  layout: 'custom'
})
const email = ref('')
const newPassword = ref('')
const newPasswordRepeat = ref('')
const modalText = ref('')

const validationRules  = {
  email: { email, required },
  newPassword: { required, minLength: minLength(4) },
  newPasswordRepeat: { required, minLength: minLength(4) }
}
// const v$ = useVuelidate()
// onMounted(()=>{
//   console.log('v$: ', v$)
// })

const handleRegister = async () => {
  if(newPassword.value !== newPasswordRepeat.value){
    console.log("Password mismatch")
    return
  }
  try{
    const newUser = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email.value,
        password: newPassword.value
      })
    }
    const response = await fetch('api/registration', newUser)
    const responseBody = await response.json();
    console.log(responseBody)

    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    if(responseBody && responseBody.status === 400){
      openModal(responseBody.body.error)
      console.log('back.status === 400')
      return
    }
    localStorage.setItem('access_token', responseBody.body.tokens.accessToken) 
    localStorage.setItem('refresh_token', responseBody.body.tokens.refreshToken) 
 
    openModal(responseBody.body.message)
    setTimeout(()=>{
      navigateTo('/login')
    },1000)


  }catch (error) {
    //todo status
   console.error('Error:', error.message);
  }
}
const cancelRegister = () => {
  navigateTo('/')
}
const openModal = (text) => {
  modalText.value = text
  setTimeout(()=>{
    modalText.value = ''
  }, 3000)
}
const updateModalText = (textNull) => {
  modalText.value = textNull
}
</script>

<template>
<section class="registration">
  <h1 class="text-center text--fz24">Please register</h1>
  <form class="registration__form" @submit.prevent="handleRegister">
    <Input
      id="emailClient"
      v-model.trim="email"
      textLabel="Email"
      type="text"
      placeholder="enter your email"
      :validationRules="validationRules.email"
    />
    <Password
      id="passwordClient"
      v-model.trim="newPassword"
      textLabel="Password"
      placeholder="min 4 characters"
      :validationRules="validationRules.newPassword"
      autocomplete="new-password"
      />
    <Password
      id="passwordRepeatClient"
      v-model.trim="newPasswordRepeat"
      textLabel="Repeat password"
      placeholder="min 4 characters"
      :validationRules="validationRules.newPasswordRepeat"
      autocomplete="new-password"
    />
    <div class="registration__buttons">
      <Button
        text="Register"
        type="submit"
        class="registration__btn"
        :class="{'btn__disabled' : !newPassword || !newPasswordRepeat || !email}"
        :disabled="!newPassword || !newPasswordRepeat || !email"
      />

      <Button
        text="Cancel"
        type="button"
        class="registration__btn"
        @click.prevent="cancelRegister"
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
}

</style>