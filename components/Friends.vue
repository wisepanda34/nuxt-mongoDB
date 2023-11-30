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
          <p style="margin-bottom: 5px">Date of birth</p>
          <VueDatePicker
              v-model="selectedDate"
              class="friends__picker"
              vertical
              :enable-time-picker="false"
              :enable-year-picker="false"
              disable-year-select
              :six-weeks="mode"
              required
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                  v-bind="inputEvents"
                  :value="formatDate(inputValue)"
                  readonly
              />
            </template>
          </VueDatePicker>
        <DateInput />
          <VueDatePicker
              v-model="selectedYear"
              class="friends__picker"
              vertical
              year-picker
          />
          <div>
            <label>
              <input type="checkbox" @change="toggleKnowYear">
              I know the birthday's year
            </label>
          </div>
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
import formatToDate from "~/utils/formatToDate.js";
import Button from "~/components/UI/Button.vue";
import Input from "~/components/UI/Input.vue";
import DateInput from "~/components/UI/DateInput.vue";
import TextAria from "~/components/UI/TextAria.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const buttonText = ref("Add friend")
const friends=ref([])
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
let openInfo = ref(null)
const toggleInfo = (index) => {
  openInfo.value = openInfo.value === index ? null : index;
};

let openFormAddFriend = ref(true)
const toggleOpenForm = ()=>{
  openFormAddFriend.value = !openFormAddFriend.value;
  buttonText.value = openFormAddFriend.value === true ? "Close form" : "Add friend"
}
const isKnownYear = ref(false)
const toggleKnowYear=()=>{
  isKnownYear.value = !isKnownYear.value
}
const name = ref('Tommy')
const surname = ref('Kruzer')



const selectedDate = ref(new Date());

const selectedMonth = ref(new Date().getMonth() + 1);
const selectedYear = ref(new Date().getFullYear());

const mode = ref(true);
const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Поскольку месяцы начинаются с 0
  return `${day}/${month}`;
};

watch(selectedDate, (newDate) => {
  console.log(newDate);
});
watch(selectedMonth, (newMonth) => {
  console.log(newMonth);
});
watch(selectedYear, (newYear) => {
  console.log(newYear);
});


const formatToShort = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
const info = ref('actor')
const onSubmitFriend = async () => {

  let formattedDate;

  if (isKnownYear.value) {
    formattedDate = dateOfBirth.value;
  } else {
    formattedDate = formatToDate(dayOfBirth.value);
  }
  const dataNewFriend = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.value,
      surname: surname.value,
      birthday: formattedDate,
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
    await fetchDataFriends()
    openFormAddFriend.value = false
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