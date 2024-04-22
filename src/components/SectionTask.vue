<template>
  <section
    class="rounded-md bg-opacity-20"
    :class="
      (type === 'finished' && 'bg-green-400') ||
      (type === 'not-started' && 'bg-yellow-400') ||
      (type === 'in-progress' && 'bg-blue-400')
    "
  >
    <div
      class="rounded-t-md rounded--md text-center p-3 font-medium text-white"
      :class="
        (type === 'finished' && 'bg-green-400') ||
        (type === 'not-started' && 'bg-yellow-400') ||
        (type === 'in-progress' && 'bg-blue-400')
      "
    >
      {{ title }}
    </div>
    <ul class="p-3 flex-col gap-2 flex h-[90vh] overflow-auto">
      <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Task from "./Task.vue";

export default defineComponent({
  name: "SectionTask",
  components: {
    Task,
  },
  props: {
    type: {
      type: String,
      required: true,
      default: "",
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    tasks: {
      type: Array,
      required: true,
      default: [],
    },
  },
});
</script>
