<template>
  <div class="friends">
    <div class="friends__heading">
      <Button v-if="!openFormAddFriend" text="Add friend" type="button" @click="openForm"/>
      <Button v-if="openFormAddFriend" text="Close friend" type="button" @click="closeForm"/>
      <div>{{currentDate()}}</div>
    </div>


    <div v-if="!openFormAddFriend" class="friends__info">
      <h1 class="friends__title text-center text-fz24 text-fw700">Upcoming birthdays</h1>
      <TransitionGroup name="list" tag="ul">
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

          <transition name="slide-fade" :duration="{ enter: 500, leave: 800 }">
            <div v-if="openInfo===index" class="friends__box">
              <p>{{ friend.info }} ---- id:{{friend._id}}</p>
              <div class="friends__edit" @click.stop="showEditMenu">
                <img src="/images/edit.png" alt="edit">
                <transition name="bounce">
                  <div v-show="isOpen" class="friends__editMenu">
                    <div class="friends__editItem" @click.stop="updateFriend(index, friend._id)">change</div>
                    <div class="friends__editItem" @click.stop="removeFriend(friend._id,index)">delete</div>
                  </div>
                </transition>

              </div>
            </div>
          </transition>

        </li>
      </TransitionGroup>
    </div>

    <div v-if="openFormAddFriend" class="friends__new">
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
          <DateInput :date="date" @update:selectedDate="updateDate"/>
          <YearInput :year="year" @update:selectedYear="updateYear"/>
          <TextAria
              id="idInfo"
              textLabel="Info"
              placeholder=""
              v-model.trim="info"
              class="friends__input"
          />
          <Button
            v-if="!updateProcess"
            text="Save friend"
            type="submit"
            class="friends__btn"
            @click.prevent="onSubmitFriend"
          />
          <Button
            v-if="updateProcess"
            text="Update friend"
            type="submit"
            class="friends__btn"
            @click.prevent="updateSubmitFriend"
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
import moment from 'moment';

const currentDate = function() {
  const date = moment()
  return date.format('dddd, MMMM D YYYY');
}
const monthsStore = useMonths()
const friends = ref([])
const chosenFriend = ref({})

const name = ref('')
const surname = ref('')
const info = ref('actor')
const date = ref(null)
const year = ref(null)

let openInfo = ref(null)
const toggleInfo = (index) => {
  openInfo.value = openInfo.value === index ? null : index;
};

let updateProcess = ref(false)
let openFormAddFriend = ref(false)
const openForm = ()=> {
  openFormAddFriend.value = true;
}
const closeForm = ()=> {
  openFormAddFriend.value = false;
  name.value = ''
  surname.value = ''
  info.value = ''
  year.value = null
  date.value = null
  updateProcess.value = false
}

const updateDate = (newDate) => {
  date.value = newDate;
};
const updateYear = (newDate) => {
  year.value = newDate;
};

const onSubmitFriend = async () => {

  try {
    const { day, indexMonth } = date.value
    console.log('onSubmitFriend:',day, indexMonth)
    if(!day || !indexMonth || !name.value) {
      console.log("Invalid Name or data from DateInput")
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
          indexMonth: indexMonth,
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
    // console.log(data);


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
    // console.log('friends:',data)
    return { data, error: null };
  } catch (error) {
    console.error("Ошибка в fetchDataFriends:", error);
    return { data: null, error };
  }
};
onMounted(()=>{
  fetchDataFriends()
})


const isOpen = ref(false)
const showEditMenu = () => {
  isOpen.value = true
}
const closeEditMenu = () => {
  isOpen.value = false
}


const removeFriend = (id,index) => {
  toggleInfo(index)
  removeSubmitFriend(id)
}

const updateFriend = (index, id) => {
  updateProcess.value = true
  chosenFriend.value = friends.value.find( item => item._id === id) || null;
  // console.log('chosenFriend.value:',chosenFriend.value)

  name.value = chosenFriend.value.name
  surname.value = chosenFriend.value.surname
  info.value = chosenFriend.value.info
  year.value = chosenFriend.value.birthday.year
  date.value = {
    day: chosenFriend.value.birthday.day,
    indexMonth: chosenFriend.value.birthday.indexMonth
  }
  // console.log(date.value)
  closeEditMenu()
  toggleInfo(index)
  openForm()
}
const updateSubmitFriend = async () => {
  try {
    console.log(chosenFriend.value._id, date.value.day, date.value.indexMonth, name.value)
    if(!chosenFriend.value._id || !date.value.day || !date.value.indexMonth || !name.value) {
      console.log("Invalid Name or data from DateInput")
      return
    }
    const dataUpdateFriend = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: chosenFriend.value._id,
        name: name.value,
        surname: surname.value,
        birthday: {
          day: date.value.day,
          indexMonth: date.value.indexMonth,
          year: year.value,
        },
        info: info.value,
      })
    }
    console.log('dataUpdateFriend >> ', dataUpdateFriend)
    const response = await fetch('/api/update-friend', dataUpdateFriend);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    await fetchDataFriends()

  } catch (error) {
    console.error('Error:', error.message);
    console.log('Error:', error.message);
  } finally {
    openFormAddFriend.value = false
    closeForm()
    updateProcess.value = false
  }
  // console.log(year.value, date.value)
}
const removeSubmitFriend = async (id) => {

  if(!id) {
    console.log("Did not select friend for remove")
  }
  try{
    const response = await fetch("/api/delete-friend", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    })

    if(!response.ok) {
      return  `HTTP error! Status: ${response.status}`
    }
    console.log('Friend deleted successfully');
    await fetchDataFriends();
  }catch (error) {
    console.error("Error removeSubmitFriend", error.message)
  }
}



</script>






<style scoped lang="scss">
.friends{
  width: 100%;
  &__heading{
    display: flex;
    justify-content: space-between;
  }
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
  &__box{
    display: grid;
    grid-template-columns: auto 40px;
    gap: 20px;
    padding-top: 10px;
  }
  &__edit{
    position: relative;
    width: 30px;
    border: 1px solid #fab023;
    padding: 4px;
    img{
      width: 20px;
      height: 20px;
    }
  }
  &__editMenu{
    position: absolute;
    top: 0;
    right: 0;

    width: 70px;
    height: 60px;

    background: #fff;
  }
  &__editItem{
    padding: 5px 5px 5px 12px;
    &:hover{
      background: #fde7e7;
    }
  }

}
</style>