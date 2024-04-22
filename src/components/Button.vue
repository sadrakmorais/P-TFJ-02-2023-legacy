<template>
  <button
    @click="handleClick"
    :class="buttonClass"
    class="mt-5 bg-red-400 text-white font-semibold flex items-center p-2 justify-center gap-2 hover:shadow-md hover:brightness-110"
  >
    <v-icon :name="icon" fill="#fff" />

    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    icon: {
      type: String,
      required: false,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    isOutlined: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    buttonClass() {
      let classes = [];

      if (this.isOutlined) {
        classes.push("bg-transparent border-2 border-white");
      }
      if (this.fullWidth) {
        classes.push("w-full");
      }
      if (this.isDisabled) {
        classes.push("focus:outline-none opacity-50 cursor-not-allowed ");
      }

      return classes.join(" ");
    },
  },
  setup(props, ctx) {
    const handleClick = () => {
      ctx.emit("click-event");
    };

    return { handleClick };
  },
});
</script>
