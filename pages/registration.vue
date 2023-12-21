<!--registration.vue-->
<script setup>
import Input from "~/components/UI/Input.vue";
import Password from "~/components/UI/Password.vue";
import Button from "~/components/UI/Button.vue";

definePageMeta({
  layout: 'custom'
})
const email = ref('')
const newPassword = ref('')
const newPasswordRepeat = ref('')
const handleRegister = () => {

}
const cancelRegister = () => {
  navigateTo('/')
}
</script>

<template>
<section class="registration">
  <h1 class="text-center text-fz24">Please register</h1>
  <form class="registration__form" @click.prevent="handleRegister">
    <Input
      id="emailClient"
      textLabel="Email"
      type="text"
      placeholder="enter your email"
      v-model.trim="email"
    />
    <Password
      id="passwordClient"
      v-model="newPassword"
      textLabel="Password"
      placeholder="4 characters"
      />
    <Password
      id="passwordRepeatClient"
      v-model.trim="newPasswordRepeat"
      textLabel="Repeat password"
      placeholder="4 characters"
    />
    <div class="registration__buttons">
      <Button
        text="Register"
        type="submit"
        class="registration__btn"
      />
      <Button
        text="Cancel"
        type="button"
        class="registration__btn"
        @click.prevent="cancelRegister"
      />
    </div>

  </form>

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