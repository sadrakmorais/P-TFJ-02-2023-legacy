import { createApp } from "vue";
import App from "./App.vue";
import Vue3Lottie from "vue3-lottie";
import router from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  HiSolidMail,
  BiGithub,
  RiLockPasswordFill,
  MdStart,
  MdTitle,
  MdDescription,
  MdDelete,
  FaCheckCircle,
} from "oh-vue-icons/icons";

addIcons(
  HiSolidMail,
  BiGithub,
  RiLockPasswordFill,
  MdStart,
  MdTitle,
  MdDescription,
  MdDelete,
  FaCheckCircle
);

import "./index.css";

createApp(App)
  .use(Vue3Lottie, { name: "Vue3Lottie" })
  .use(router)
  .component("v-icon", OhVueIcon)
  .mount("#app");
