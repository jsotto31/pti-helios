<template>
    <div class="d-flex align-center justify-center flex-column">
        <div ref="loader" id="loader" class="loader d-flex align-center justify-center"></div>
        <!-- <h3 class="mt-3">ZeusVault</h3> -->
    </div>
</template>

<script setup lang="ts">
import {useTheme} from 'vuetify'
const theme = useTheme()
const loader = ref<HTMLElement | null>()
if(loader.value){
  if (theme.current.value.dark) {
    loader.value.style.color = '#ffffff'
  } else {
    loader.value.style.color = '#7C3AED'
  }
}
</script>

<style scoped>

.loader {
  width: 16px;
  height: 16px;
  position: relative;
  left: -18px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 32px 0 , -32px 0 ,  64px 0;
}

.loader::after {
  content: '';
  position: absolute;
  left: -32px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 10px;
  background: #7C3AED;
  animation: move 3s linear infinite alternate;
}

@keyframes move {
  0% , 5%{
    left: -32px;
    width: 16px;
  }
  15% , 20%{
    left: -32px;
    width: 48px;
  }
  30% , 35%{
    left: 0px;
    width: 16px;
  }
  45% , 50%{
    left: 0px;
    width: 48px;
  }
  60% , 65%{
    left: 32px;
    width: 16px;
  }

  75% , 80% {
    left: 32px;
    width: 48px;
  }
  95%, 100% {
    left: 64px;
    width: 16px;
  }
}

</style>
