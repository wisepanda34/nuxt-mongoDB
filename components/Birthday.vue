<script setup>
import convertDate from "~/utils/convertDate.js";
const { data: birthdays, error } = await useFetch("/api/birthdays")
let openInfo = null
const toggleInfo = (index) => {
  openInfo = openInfo === index ? null : index;
  console.log(openInfo)
}
</script>

<template>
  <div class="birthday">
    <h1 class="text-center text-fz24 text-fw700">Upcoming birthdays</h1>
    <button class="btn" @click="openForm">Add friend</button>
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
          <div v-show="openInfo===index" class="box">
            <p>{{ item.info }}</p>
          </div>
        </transition-fade>

      </li>
    </ul>
  </div>
</template>

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
}
</style>