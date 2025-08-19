<script setup lang="ts">
const $notification = useNotificationStore();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
useHead({
  title: 'Welcome back'
})

definePageMeta({
  middleware: 'guest',
  layout: 'default'
})

const showPassword = ref(false)

const form = reactive({
  email: null,
  password: null
})

const loading = ref(false)

const { execute, error } = useFetch(apiUrl + "/login", {
  method: 'POST',
  immediate: false,
  body: form,
  credentials: 'include',
  watch: false,
  headers: {
    'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value as string
  },
  onResponse(event) {
    loading.value = false
    if (event.response.ok) {
      window.location.reload()
    }

    if (event.response.status == 422) {
      $notification.addNotification("Authentication Failed!", event.response._data.message, "error");
    }
  }
})

async function onLogin() {
  loading.value = true
  try {
    await $fetch(apiUrl + '/sanctum/csrf-cookie', {
      credentials: 'include',
    });

    await execute()

  } catch (error) {
    console.error('Error:', error);
  }
}

</script>

<template>
  <v-container fluid class="h-100 w-100 d-flex bg-grey-lighten-4 align-center justify-center flex-column">
    <v-card width="500" flat class="rounded-lg border pa-5">
      <div class="d-flex align-center justify-center mb-2 mt-5">
        <Logo size="55"></Logo>
      </div>
      <v-form :disabled="loading" @submit.prevent="onLogin" class="mt-8">
        <label class="font-weight-bold" for="">Username:</label>
        <v-text-field single-line :error-messages="error?.data.errors?.email" autocomplete='email' v-model="form.email"
          class="mt-2 mb-5" color="primary" append-inner-icon="mdi-email-outline" label="Enter your username."
          variant="outlined" flat></v-text-field>
        <label class="font-weight-bold" for="">Password:</label>
        <v-text-field single-line :error-messages="error?.data.errors?.password" autocomplete="password"
          v-model="form.password" :type="showPassword ? 'text' : 'password'" class="mt-2" color="primary"
          label="Enter your password" variant="outlined" flat
          :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          @click:append-inner="showPassword = !showPassword"></v-text-field>
        <div class="d-flex justify-space-between align-start">
          <div>
            <v-checkbox label="Remember" color="primary" single-line density="compact"></v-checkbox>
          </div>
          <a href="#" class="mt-2 text-blue-darken-4">Forgot the password?</a>
        </div>
        <v-btn :loading="loading" type="submit" class="text-capitalize text-subtitle-1 py-6 rounded-lg" block flat
          color="primary">
          <h4 class="font-weight-bold">Sign in</h4>
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
