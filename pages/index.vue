<script setup>

// const { data: posts, error } = await useFetch("/api/posts")

</script>

<template>
  <div class="hello">
    <h1 class="hello__title text-center">Hello, everyone!</h1>
    <p class="hello__descr">This application was created so that every person could congratulate all their family and friends on their birthday, and not after a couple of days, as is often the case. This application was created so that every person could congratulate all their family and friends on their birthday, and not after a couple of days, as is often the case. Therefore, use the <span>Congratulate your friends</span> to the fullest! </p>
  </div>
</template>

<style scoped lang="scss">
.hello{
  &__title{
    margin: 30px 0;
    font-weight: 900;
    font-size: 30px;
    color: rgb(75, 174, 141);
  }
  &__descr{
    padding: 20px;
    line-height: 170%;
    font-size: 20px;
    color: rgb(165, 133, 91);
    text-indent: 40px;
    
  }
}
</style>
