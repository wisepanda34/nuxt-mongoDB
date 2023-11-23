<template>
  <div class="birthday">
    <Button :text="buttonText" type="button" @click="toggleOpenForm"/>
    <div v-if="openFormAddFriend===false" class="birthday__info">
      <h1 class="birthday__title text-center text-fz24 text-fw700">Upcoming birthdays</h1>
      <ul>
        <li
            class="birthday__item"
            v-for="(item, index) in birthdays"
            :key="item._id"
            @click="toggleInfo(index)"
        >

          <div class="birthday__item-header">
            <div class="birthday__name">
              <p>{{item.name}} {{item.surname}}</p>
            </div>
            <div class="birthday__date">
              <p>{{convertDate(item.birthday)}}</p>
            </div>
          </div>

          <transition-fade>
            <div v-if="openInfo===index" class="box">
              <p>{{ item.info }}</p>
            </div>
          </transition-fade>

        </li>
      </ul>
    </div>

    <div v-if="openFormAddFriend===true" class="birthday__new">
      <h1 class="birthday__title text-center text-fz24 text-fw700">Adding info about friend</h1>
      <form class="birthday__form">
        <Input
            id="idName"
            textLabel="Name"
            type="text"
            placeholder=""
            v-model.trim="name"
            class="birthday__input"
        />
        <Input
            id="idSurname"
            textLabel="Surname"
            type="text"
            placeholder=""
            v-model.trim="surname"
            class="birthday__input"
        />

        <Button
            text="Save friend"
            type="submit"
            class="birthday__btn"
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


const buttonText = ref("Add friend")
const { data: birthdays, error } = await useFetch("/api/birthdays")
let openInfo = ref(null)
const toggleInfo = (index) => {
  openInfo.value = openInfo.value === index ? null : index;
};

let openFormAddFriend = ref(true)
const toggleOpenForm = ()=>{
  openFormAddFriend.value = !openFormAddFriend.value;
  buttonText.value = openFormAddFriend.value === true ? "Close form" : "Add friend"
}
const name = ref('')
const surname = ref('')
const onSubmitFriend = () =>{
  console.log("Name:", name.value);
}
</script>

<style scoped lang="scss">
.birthday{
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
  &__input{

  }
  &__btn{
    margin-top: 30px;
  }
}

</style>