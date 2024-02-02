<!--login.vue-->
<script setup>
import Password from "~/components/UI/Password.vue";
import Button from "~/components/UI/Button.vue";
import Input from "~/components/UI/Input.vue";
import CheckBox from "~/components/UI/CheckBox.vue";
import BaseModal from "~/components/modal/BaseModal.vue";
import { useAuth } from "~/store/auth";


definePageMeta({
  layout: 'custom'
})

const email = ref('bob@mail.qwqw')
const password = ref('qwqw')

// const email = ref('admin')
// const password = ref('admin')

const forgotPassword = ref(false)
const sentCode = ref(false)
const modalText = ref('')
const authStore = useAuth()

const handleLogin = async () => {
  try{
    const data = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    }
    const response = await fetch('api/login', data)
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseBody = await response.json();
    // console.log('responseBody.body.user:', responseBody.body.user);
    authStore.login(responseBody.body.user)
    localStorage.setItem('access_token', responseBody.body.accessToken) 
    openModal(responseBody.body.user.role)
    
    if(responseBody.body.user.role === 'user'){
      // setTimeout(()=>{
      //   navigateTo('/profile')
      // },1000)
      navigateTo('/profile')
    } else if (responseBody.body.user.role === 'admin'){
      // setTimeout(()=>{
      //   navigateTo('/admin')
      // },1000)
      navigateTo('/admin')
    }

  }catch (error) {
    console.log('Error:', error.message);
  }
}
const cancelLogin = () => {
  navigateTo('/')
}
const sendCode =()=>{
  sentCode.value = true
  console.log('sendCode')
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
        v-model.trim="email"
        textLabel="Email"
        type="text"
        placeholder="enter your email"
      />
      <Password
        id="passwordClient"
        v-model.trim="password"
        textLabel="Password"
        placeholder="min 4 characters"
        autocomplete="current-password"
      />
      <CheckBox v-model="forgotPassword"/>
      <div v-show="forgotPassword && email" class="registration__send-code">
        <p class="text--fz13">Will send code to <span @click.once="sendCode" class="text--blue-600 text--fz14 text--tdu">{{email}}</span>?</p>
        <div v-if="sentCode" class="registration__put-code">
          <input type="text" class="registration__input-code">
          <p class="text--fz13">Put code</p>
        </div>
      </div>
      <div class="registration__buttons">
        <Button
          text="Login"
          type="submit"
          class="registration__btn"
          :class="{'btn__disabled' : !password || !email}"
          :disabled="!password || !email"
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
        color: #3a38e8;
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