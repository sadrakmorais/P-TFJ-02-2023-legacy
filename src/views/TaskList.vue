<template>
  <div class="w-lvw grid grid-cols-1 h-16 sm:grid-cols-[1fr_4fr] sm:h-lvh">
    <div class="bg-red-400 p-3 flex flex-col justify-between">
      <section>
        <h1 class="text-white text-3xl font-bold text-center">
          Add your <br />task here!
        </h1>
        <Input
          placeHolder="Title"
          icon="md-title"
          type="text"
          v-model="title"
        />
        <Input
          placeHolder="Description"
          icon="md-description"
          type="text"
          v-model="description"
        />
        <Button
          isOutlined
          fullWidth
          @click-event="handleAddNewTask"
          :isDisabled="isDisabledButton"
          >Add Task</Button
        >
      </section>
      <Button isOutlined fullWidth @click-event="handleLogout">Logout</Button>
    </div>
    <section class="grid grid-cols-1 p-5 gap-3 sm:grid-cols-3">
      <SectionTask
        title="NOT STARTED"
        type="not-started"
        :tasks="taskContext.filteredTasks.value.notStarted"
      />
      <SectionTask
        title="IN PROGRESS"
        type="in-progress"
        :tasks="taskContext.filteredTasks.value.inProgress"
      />
      <SectionTask
        title="FINISHED"
        type="finished"
        :tasks="taskContext.filteredTasks.value.finished"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import SectionTask from "../components/SectionTask.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import taskContext from "../contexts/taskContext";
import userContext from "../contexts/userContext";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "TaskList",
  components: {
    SectionTask,
    Input,
    Button,
  },
  setup() {
    const title = ref("");
    const description = ref("");
    const history = useRouter();

    const handleAddNewTask = () => {
      taskContext.addTask({
        created_by: userContext?.state?.user?.email,
        description: description.value,
        id: uuidv4(),
        status: "not-started",
        title: title.value,
      });
    };

    const isDisabledButton = computed(() => {
      return !title.value && !description.value;
    });

    const handleLogout = () => {
      userContext.logout();
      history.push("/");
    };

    return {
      description,
      title,
      handleAddNewTask,
      taskContext,
      isDisabledButton,
      handleLogout,
    };
  },
});
</script>
