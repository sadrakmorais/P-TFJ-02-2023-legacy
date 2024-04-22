<template>
  <div
    class="p-2 border-gray-400 border-2 rounded-md flex gap-2 items-center mt-3 bg-white"
  >
    <v-icon :name="icon" fill="rgb(107 114 128)" />
    <input
      :placeholder="placeHolder"
      :value="modelValue"
      :type="type"
      @input="onChangeInput"
      class="text-gray-400 w-full"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
    placeHolder: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(_, ctx) {
    const onChangeInput = (event: Event) => {
      ctx.emit("update:modelValue", (event.target as HTMLInputElement).value);
    };
    return { onChangeInput };
  },
});
</script>
