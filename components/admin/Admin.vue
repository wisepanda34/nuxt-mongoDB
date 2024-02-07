<!-- Admin.vue -->
<script setup>
import Logo from "~/components/UI/Logo.vue";
import $api from "~/http";
import {useAuth} from "~/store/auth.js"
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';


const authStore = useAuth()
const allUsers = ref(null)
const index = 1
const headers = [
  { text: "NUM", value: "index" },
  { text: "EMAIL", value: "email"},
  { text: "ROLE", value: "role"},
  { text: "ACTIVATED", value: "isActivated"},
]

const logout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.log("Error:", error.message);
  }
};

const getAllUsers = async() => {
  try {
    const response = await $api.get('/api/getAllUsers')
    console.log("response: ", response.data);
    allUsers.value = response.data
    console.log(response.data);
    
  } catch(error) {
    console.log("Admin getAllUsers error: ", error);
  }
}


</script>

<template>
  <div class="admin">

    <div class="admin__header">
      <Logo/>
      <div class="admin__header-link" @click="getAllUsers">All Users</div>
      <div class="admin__header-link" @click="logout">Logout</div>
    </div>
    <section class="admin__main">
      <h1 class="admin__title text-center text--grey text--fz24">ADMIN PANEL</h1>
      <div>
        
        <div v-if="allUsers">
          <h3>All users</h3>
          <table class="table">
            <thead class="table__head">
              <tr class="table__tr">
                <th class="table__th num">NUM</th>
                <th class="table__th email">EMAIL</th>
                <th class="table__th role">ROLE</th>
                <th class="table__th activated">ACTIVATED</th>
              </tr>
            </thead>
            <tbody class="table__body">
              <tr class="table__tr" v-for="(user, index) in allUsers" :key="user._id">
                <td class="table__td num">{{ index + 1 }}</td>
                <td class="table__td email">{{ user.email }}</td>
                <td class="table__td role">{{ user.role }}</td>
                <td class="table__td activated">{{ user.isActivated }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </section>
  </div>
  
</template>

<style scoped lang="scss">
.admin{

  &__header{
  height: 100px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  background: orangered;
  border-radius: 8px;
  }

  &__header-link {
    cursor: pointer;
  }

  &__main{
    padding: 20px;
  }
}

.table{
  width: 100%;
  &__head{
    height: 40px;
  }
  &__tr{
    
  }
  &__th{
    border: 1px solid #595e6a;

    &.num{
      width: 50px;
    }
    &.role{
      width: 20%;
    }
    &.activated{
      width: 22%;
    }
  }
  
  &__td {
    height: 30px;
    padding: 5px;
    border: 1px solid #595e6a;

    &.num,
    &.role,
    &.activated {
      text-align: center;
    }
  }
}
</style>  