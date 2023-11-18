<template>
  <Html>
    <Body>
      <NuxtLayout >
        <NuxtLoadingIndicator
            :height="5"
            :duration="3000"
            :throttle="400"
        />
        <NuxtPage class="page"/>
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup >
</script>