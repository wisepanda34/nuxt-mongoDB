<template>
  <div class="friends">
    <Button :text="buttonText" type="button" @click="toggleOpenForm"/>
    <div v-if="openFormAddFriend===false" class="friends__info">
      <h1 class="friends__title text-center text-fz24 text-fw700">Upcoming birthdays</h1>
      <ul>
        <li
            class="friends__item"
            v-for="(friend, index) in friends"
            :key="friend._id"
            @click="toggleInfo(index)"
        >

          <div class="friends__item-header">
            <div class="friends__name">
              <p>{{friend.name}} {{friend.surname}}</p>
            </div>
            <div class="friends__date">
              <p>{{convertDate(friend.birthday)}}</p>
            </div>
          </div>

          <transition-fade>
            <div v-if="openInfo===index" class="box">
              <p>{{ friend.info }}</p>
            </div>
          </transition-fade>

        </li>
      </ul>
    </div>

    <div v-if="openFormAddFriend===true" class="friends__new">
      <h1 class="friends__title text-center text-fz24 text-fw700">Adding info about a friend</h1>
      <form class="friends__form">
        <Input
            id="idName"
            textLabel="Name"
            type="text"
            placeholder=""
            v-model.trim="name"
            class="friends__input"
        />
        <Input
            id="idSurname"
            textLabel="Surname"
            type="text"
            placeholder=""
            v-model.trim="surname"
            class="friends__input"
        />
        <DateInput
            id="idDateOfBirth"
            textLabel="Date of birth"
            type="text"
            placeholder="Please enter a date in the format DD/MM/YYYY"
            v-model.trim="dateOfBirth"
            class="friends__input"
        />
        <TextAria
            id="idInfo"
            textLabel="Info"
            placeholder=""
            v-model.trim="info"
            class="friends__input"
        />
        <Button
            text="Save friend"
            type="submit"
            class="friends__btn"
            @click.prevent="onSubmitFriend"
        />
      </form>
    </div>

  </div>
</template>

<script setup>
import convertDate from "~/utils/convertDate.js";
import Button from "~/components/UI/Button.vue";
import Input from "~/components/UI/Input.vue";
import DateInput from "~/components/UI/DateInput.vue";
import TextAria from "~/components/UI/TextAria.vue";

const buttonText = ref("Add friend")
const { data: friends, error } = await useFetch("/api/birthdays")
let openInfo = ref(null)
const toggleInfo = (index) => {
  openInfo.value = openInfo.value === index ? null : index;
};

let openFormAddFriend = ref(true)
const toggleOpenForm = ()=>{
  openFormAddFriend.value = !openFormAddFriend.value;
  buttonText.value = openFormAddFriend.value === true ? "Close form" : "Add friend"
}
const name = ref('Victor')
const surname = ref('Gross')
const dateOfBirth = ref('20/10/2020')
const info = ref('new college')
const onSubmitFriend = async () => {
  const dataNewFriend = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.value,
      surname: surname.value,
      birthday: dateOfBirth.value,
      info: info.value,
    })
  }
  try {
    const response = await fetch('/api/create-friend', dataNewFriend);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);  // Вывод ответа от сервера (например, сообщение об успешном создании пользователя)

  } catch (error) {
    console.error('Error:', error.message);
    console.log('Error:', error.message);
  }
};

</script>

<style scoped lang="scss">
.friends{
  &__item{
    padding: 10px;
    margin: 10px 0;

    background: #fcd7d3;
    cursor: pointer;
  }
  &__item-header{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  &__title{
    margin: 20px 0;
  }
  &__btn{
    margin-top: 30px;
  }
}

</style>