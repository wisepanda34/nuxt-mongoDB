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
              <p>{{convertDate(friend.birthday, monthsStore)}}</p>
            </div>
            <div class="friends__date">
              <p>{{convertAge(friend.birthday)}}</p>
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
      <form class="friends__form" @submit.prevent="onSubmitFriend">
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
          <DateInput  :date="date" @update:selectedDate="updateDate"/>
          <YearInput v-model="year"/>
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
import Button from "~/components/UI/Button.vue";
import Input from "~/components/UI/Input.vue";
import DateInput from "~/components/UI/DateInput.vue";
import YearInput from "~/components/UI/YearInput.vue";
import TextAria from "~/components/UI/TextAria.vue";
import convertDate from "~/utils/convertDate.js";
import convertAge from "~/utils/convertAge.js";
import {useMonths} from "~/store/months.js";

const monthsStore = useMonths()
const buttonText = ref("Add friend")
const friends=ref([])


let openInfo = ref(null)
const toggleInfo = (index) => {
  openInfo.value = openInfo.value === index ? null : index;
};

let openFormAddFriend = ref(false)
const toggleOpenForm = ()=>{
  openFormAddFriend.value = !openFormAddFriend.value;
  buttonText.value = openFormAddFriend.value === true ? "Close form" : "Add friend"
}
const name = ref('')
const surname = ref('')
const info = ref('actor')
const date = ref(null)
const year = ref(Number)

const updateDate = (newDate) => {
  date.value = newDate;
};

const onSubmitFriend = async () => {

  try {
    const { day, indexMonth } = date.value
    if(!day || !indexMonth) {
      console.log("Invalid data from DateInput")
      return
    }
    const dataNewFriend = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        birthday: {
          day: day,
          month: indexMonth,
          year: year.value
        },
        info: info.value,
      })
    }
    const response = await fetch('/api/create-friend', dataNewFriend);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);  // Вывод ответа от сервера (например, сообщение об успешном создании пользователя)
    await fetchDataFriends()
    openFormAddFriend.value = false
  } catch (error) {
    console.error('Error:', error.message);
    console.log('Error:', error.message);
  }
};
const fetchDataFriends = async () => {
  try {
    const result = await fetch("/api/birthdays");
    const { birthdays: data, error } = await result.json();
    if (error) {
      console.error("Ошибка при загрузке данных:", error);
      return { data: null, error };
    }
    friends.value = data
    return { data, error: null };
  } catch (error) {
    console.error("Ошибка в fetchDataFriends:", error);
    return { data: null, error };
  }
};
onMounted(()=>{
  fetchDataFriends()
})
</script>






<style scoped lang="scss">
.friends{
  width: 100%;
  &__item{
    padding: 10px;
    margin: 10px 0;

    background: #fcd7d3;
    cursor: pointer;
  }
  &__item-header{
    display: grid;
    grid-template-columns: 1.2fr 1fr 0.5fr;
  }
  &__title{
    margin: 20px 0;
  }
  &__btn{
    margin-top: 30px;
  }
  &__picker{
    width: 400px;
    height: 40px;
    margin-bottom: 15px;
    input{
      height: 100%;
    }
  }
}
</style>