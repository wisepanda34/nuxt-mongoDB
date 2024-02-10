<!--registration.vue-->
<script setup>
import Input from "~/components/UI/Input.vue";
import Password from "~/components/UI/Password.vue";
import Button from "~/components/UI/Button.vue";
import BaseModal from "~/components/modal/BaseModal.vue";

definePageMeta({
  layout: 'custom'
})

const codeSending = ref(false)
const modalText = ref('')

const state = reactive({
  email: 'duck@mail.asas',
  password: '',
  repeatPassword: ''
})

const rules = {
  email: { email, required },
  password: { required, minLength: minLength(4), maxLength: maxLength(20) },
  repeatPassword: { required, sameAs: state.password }
}

const v$ = useVuelidate(rules, state)

const handleRegister = async () => {

  const result = await v$.value.$validate()
  if(!result){
    console.log('result: ', result);
    return
  }

  codeSending.value = true
  try{
    const newUser = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: state.email,
        password: state.password
      })
    }

    const response = await fetch('/api/registration', newUser)
    const responseBody = await response.json();

    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
 
    openModal(responseBody.body.message)
    setTimeout(()=>{
      navigateTo('/login')
    },1000)

  }catch (error) {
    //todo status
   console.error('Error:', error.message);
  }
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
    <Password
      id="passwordRepeatClient"
      v-model.trim="state.repeatPassword"
      textLabel="Repeat password"
      placeholder="min 4 characters"
      autocomplete="current-password"
    />
    <p v-for="error in v$.repeatPassword.$errors" :key="error.$uid" class="text--red">
      {{ error.$message }} 
      <br><br>
    </p>
    <div class="registration__buttons">
      <Button
        text="Register"
        type="submit"
        class="registration__btn"
        :class="{ 'btn__disabled': codeSending }"
        :disabled="codeSending"
      />
      <Button
        text="Cancel"
        type="button"
        class="registration__btn"
        @click.prevent="navigateTo('/')"
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