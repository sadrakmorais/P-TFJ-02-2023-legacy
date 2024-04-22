<template>
  <div class="w-lvw grid grid-cols-1 h-16 sm:grid-cols-[3fr_2fr] sm:h-lvh">
    <div class="flex items-center bg-red-400">
      <Vue3Lottie
        :animationData="LoginAnimation"
        class="w-3/4 h-3/4 sm:w-2/4 sm:h-2/4"
      />
    </div>
    <div
      class="bg-white p-5 flex flex-col max-w-sm justify-self-center justify-center"
    >
      <h1 class="text-left font-bold text-3xl text-gray-700">
        Log in to you Account
      </h1>
      <span
        class="mt-2 text-left font-normal text-lg text-gray-600 text-opacity-70"
      >
        Welcome! Entrer with your email
      </span>

      <Input placeHolder="Email" icon="hi-solid-mail" v-model="email" />
      <Input
        placeHolder="Password"
        icon="ri-lock-password-fill"
        type="password"
        v-model="password"
      />
      <Button
        text="Login"
        :isDisabled="!enabledToLogin"
        @click-event="handleLogin"
        >Entrar</Button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { useRouter } from "vue-router";
import userContext from "../contexts/userContext";
import { Vue3Lottie } from "vue3-lottie";

import LoginAnimation from "../assets/login-task-animation.json";

export default defineComponent({
  name: "Login",
  components: {
    Input,
    Button,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const history = useRouter();
    const isEmailValid = computed(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailRegex.test(email.value);
    });

    const enabledToLogin = computed(() => {
      return isEmailValid && password.value;
    });

    const handleLogin = () => {
      userContext.login(email.value, password.value);
      history.push("/task-list");
    };

    return { email, password, enabledToLogin, handleLogin };
  },
  data() {
    return {
      LoginAnimation,
    };
  },
});
</script>
