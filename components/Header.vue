<!-- Header.vue-->

<script setup>
import Logo from "~/components/UI/Logo.vue";
import BaseModal from "~/components/modal/BaseModal.vue";
import {useAuth} from "~/store/auth.js"

const authStore = useAuth()
const modalText = ref('')
const logOut = async () => {
  try{
    const data = {
      
    }
    const response = await fetch('api/logout', data)
    const responseBody = await response.json();
    authStore.logout()
    localStorage.removeItem('access_token')
    // openModal(responseBody.body.message)
    console.log(responseBody);
    setTimeout(()=>{
      // modalText.value = ''
      navigateTo('/')
    },2000)
  }catch (error) {
    console.log('Error:', error.message)
  }
}
const openModal = (text) => {
  console.log('openModal: ', text)
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
  <div class="header flex">

    <Logo/>

    <nav class="header__nav">
      <nuxt-link to="/home">Home</nuxt-link>
      <nuxt-link to="/books">Books</nuxt-link>
      <nuxt-link to="/authors">Authors</nuxt-link>
      <nuxt-link to="/weather">Weather</nuxt-link>
    </nav>

    <div class="header__client">
      <nuxt-link v-if="!authStore.isAuth"  to="/login">Login</nuxt-link>
      <span v-if="authStore.isAuth" class="header__email">{{ authStore.user.email }}</span>
      <span v-if="authStore.isAuth" class="header__logout" @click="logOut">Logout</span>
      <nuxt-link v-if="!authStore.isAuth"   to="/registration">registration</nuxt-link>
    </div>
    <!-- <BaseModal
      :modalText="modalText"
      @update:modalText="updateModalText"
    /> -->
  </div>
</template>

<style scoped lang="scss">
.header{
  height: 100px;

  display: flex;
  justify-content: space-between;

  background: #e3d4f6;
  border-radius: 10px;

  &__logo{
    width: 180px;
    height: 100px;
    padding: 10px;
  }
  &__logo img{
    width: 100%;
    border-radius: 40px;
  }
  &__nav{
    display: flex;
    gap: 20px;
    align-items: center;

    font-size: 20px;
    font-weight: 700;
    color: #59b684;
  }
  &__client{
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;

    font-size: 16px;
    color: darkslateblue;
  }
  &__logout{
    cursor: pointer;
  }
  &__email{
    color: rgb(199, 166, 35);
  }
}
</style>