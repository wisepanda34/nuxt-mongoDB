 <!-- components/Friends.vue -->

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
import SelectBeforeHand from "~/components/UI/SelectBeforeHand.vue";
import $api from "~/http";
// import { body } from "express-validator";
import { useAuth } from "~/store/auth";

const authStore = useAuth()
const monthsStore = useMonths()
const friends = ref([])
const route = '/api/birthdays';
const chosenFriend = ref({})

const name = ref('')
const surname = ref('')
const info = ref('actor')
const date = ref(null)
const year = ref(null)
const selectedDeadline = ref('')
const updateProcess = ref(false)
const openFormAddFriend = ref(false)
const openInfo = ref(null)
const isOpen = ref(false)


const currentDate = function() {
  const today = moment()
  return today.format('dddd, MMMM D YYYY');
}
const toggleInfo = (index) => {
  openInfo.value = openInfo.value === index ? null : index;
  if(openInfo.value){
    closeEditMenu()
  }
};

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
    if(!day || !name.value) {
      console.log("Invalid Name or data from DateInput")
      return
    }
    
    const dataNewFriend = {
      name: name.value,
        surname: surname.value,
        birthday: {
          day: day,
          indexMonth: indexMonth,
          year: year.value
        },
        info: info.value,
        beforehand: selectedDeadline.value
    }
    const response = await $api.post('/api/create-friend', dataNewFriend);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await fetchDataFriends()
    openFormAddFriend.value = false

  } catch (error) {
    console.error('Error:', error.message);
    console.log('Error:', error.message);
  }
};

const fetchDataFriends = async () => {
  try {
    const response = await $api.get(route);
    
    friends.value = response.data;
  } catch (error) {
    console.log('fetchDataFriends error:', error);
  }
};

onMounted(()=>{
  fetchDataFriends()
})

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
  chosenFriend.value = friends.value.find( item => item._id === id) ;

  name.value = chosenFriend.value.friend.name
  surname.value = chosenFriend.value.friend.surname
  info.value = chosenFriend.value.friend.info
  year.value = chosenFriend.value.friend.birthday.year 
  date.value = {
    day: chosenFriend.value.friend.birthday.day,
    indexMonth: chosenFriend.value.friend.birthday.indexMonth
  }

  closeEditMenu()
  toggleInfo(index)
  openForm()
}

const updateSubmitFriend = async () => {
  
  try {
    if(!chosenFriend.value._id || !date.value.day || !name.value) {
      console.log("Invalid Name or data from DateInput")
      return
    }
    const dataUpdatedFriend = {
        friendId: chosenFriend.value._id,
        name: name.value,
        surname: surname.value,
        birthday: {
          day: date.value.day,
          indexMonth: date.value.indexMonth,
          year: year.value,
        },
        info: info.value,
        beforehand: selectedDeadline.value
    }
    const response = await $api.put('/api/update-friend', dataUpdatedFriend);
    if (response.status !== 200) {
      throw new Error(`updateSubmitFriend error! Status: ${response.status}`);
    }

    await fetchDataFriends()

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    openFormAddFriend.value = false
    closeForm()
    updateProcess.value = false
  }
}

const removeSubmitFriend = async (id) => {

  if(!id) {
    throw new Error("Friend not selected for removal");
  }
  try{
    const response = await $api.delete(`/api/delete-friend?id=${id}`)

    if(response.status !== 200) {
      return  `HTTP error! Status: ${response.status}`
    } else {
      console.log('That friend was deleted successfully!');
    }
    await fetchDataFriends();
  }catch (error) {
    console.error("Error removeSubmitFriend", error.message)
  }
}

</script>

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
            v-for="(item, index) in friends"
            :key="item._id"
            :class="{ soon: item.soon }"
            @click="toggleInfo(index)"
        >

          <div class="friends__item-header">
            <div class="friends__name">
              <p>{{item.friend.name}} {{item.friend.surname}}</p>
            </div>
            <div class="friends__date">
              <p>{{convertDate(item.friend.birthday, monthsStore)}}</p>
            </div>
            <div class="friends__old">
              <p>{{convertAge(item.friend.birthday)}}</p>
            </div>
          </div>

          <transition name="slide-fade" :duration="{ enter: 500, leave: 800 }">
            <div v-if="openInfo===index" class="friends__box">
              <div>
                <p>{{ item.friend.info }} </p><br>
                <p v-if="item.friend.beforehand !== 'none'">advise in {{item.friend.beforehand}} days </p>
              </div>

              <div class="friends__edit" @click.stop="showEditMenu">
                <img src="/images/edit.png" alt="edit">
                <transition name="bounce">
                  <div v-show="isOpen" class="friends__editMenu">
                    <div class="friends__editItem" @click.prevent="updateFriend(index, item._id)">change</div>
                    <div class="friends__editItem" @click.prevent="removeFriend(item._id, index)">delete</div>
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
          <DateInput :date="date" @update:selectedDate="updateDate"/>
          <YearInput :year="year" @update:selectedYear="updateYear"/>
          <TextAria
              id="idInfo"
              textLabel="Info"
              placeholder=""
              v-model.trim="info"
              class="friends__input"
          />
          <SelectBeforeHand v-model="selectedDeadline"/>
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
    border-radius: 5px;
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
    height: 30px;
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
.soon p{
  color: red;
  font-weight: 500;
  font-size: 17px;
}
</style>