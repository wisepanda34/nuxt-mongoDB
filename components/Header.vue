<!-- Header.vue-->

<script setup>
import Logo from "~/components/UI/Logo.vue";
import BaseModal from "~/components/modal/BaseModal.vue";

const modalText = ref('')
const logOut = async () => {
  try{
    const data = {
      
    }
    const response = await fetch('api/logout', data)
    const responseBody = await response.json();
    console.log('responseBody: ', responseBody)

    // openModal(responseBody.body.message)
  }catch (error) {
    console.log('Error:', error.message)
  }
}
const openModal = (text) => {
  console.log('openModal: ', text)
  modalText.value = text
  // setTimeout(()=>{
  //   modalText.value = ''
  // }, 3000)
}
const updateModalText = (textNull) => {
  modalText.value = textNull
}

</script>

<template>
  <div class="header flex">

    <Logo/>

    <nav class="header__nav">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/books">Books</nuxt-link>
      <nuxt-link to="/authors">Authors</nuxt-link>
      <nuxt-link to="/weather">Weather</nuxt-link>
    </nav>

    <div class="header__client">
      <nuxt-link to="/login">Login</nuxt-link>
      <span class="header__logout" @click="logOut">Log0ut</span>
      <nuxt-link to="/registration">registration</nuxt-link>
    </div>
    <BaseModal
      :modalText="modalText"
      @update:modalText="updateModalText"
    />
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
}
</style>