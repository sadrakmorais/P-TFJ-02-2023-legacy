<template>
  <li
    class="bg-white p-3 rounded-md scale-95 hover:shadow-sm hover:border-2 hover:rounded-none hover:scale-100 hover:transition-transform"
  >
    <h1 class="font-medium text-gray-700">{{ task.title }}</h1>
    <p class="text-gray-500">{{ task.description }}</p>
    <div class="gap-2 flex">
      <Button
        fullWidth
        data-test="start-button"
        @click-event="handleChangeStatus"
        v-if="task.status !== 'finished'"
        >{{ buttonText }}</Button
      >
      <Button
        icon="md-delete"
        data-test="delete-button"
        @click-event="handleDeleteTask"
      ></Button>
    </div>
  </li>
</template>

<script lang="ts">
import { SetupContext, defineComponent } from "vue";
import Button from "./Button.vue";
import taskContext from "../contexts/taskContext";

export default defineComponent({
  name: "Task",
  components: {
    Button,
  },
  props: ["task"],
  setup(props, ctx: SetupContext) {
    let partilTaskUpdate = {
      created_by: props.task.created_by,
      description: props.task.description,
      id: props.task.id,
      title: props.task.title,
    };
    const handleChangeStatus = () => {
      ctx.emit("change-status");

      if (props.task.status === "not-started") {
        props.task.status = "in-progress";
        taskContext.updateTask(props.task.id, {
          ...partilTaskUpdate,
          status: "in-progress",
        });
      } else if (props.task.status === "in-progress") {
        props.task.status = "finished";
        taskContext.updateTask(props.task.id, {
          ...partilTaskUpdate,
          status: "finished",
        });
      } else {
        props.task.status = "not-started";
      }
    };
    const handleDeleteTask = () => {
      taskContext.deleteTask(props.task.id);
    };
    return { handleDeleteTask, handleChangeStatus };
  },
  data() {
    return {
      buttonText: this.getButtonText(),
    };
  },
  methods: {
    getButtonText() {
      if (this.task.status === "not-started") {
        return "Start";
      } else if (this.task.status === "in-progress") {
        return "Finish";
      }
    },
  },
});
</script>
