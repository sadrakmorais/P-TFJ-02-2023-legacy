import { mount } from "@vue/test-utils";
import Task from "@/components/Task.vue";

describe("Task", () => {
  it("displays task title and description correctly", () => {
    const task = {
      id: 1,
      title: "Task Title",
      description: "Task Description",
      status: "not-started",
      created_by: "User",
    };

    const wrapper = mount(Task, {
      props: { task },
    });

    expect(wrapper.find("h1").text()).toBe("Task Title");
    expect(wrapper.find("p").text()).toBe("Task Description");
  });

  it("emits change-status event and updates task status when start button is clicked", async () => {
    const task = {
      id: 1,
      title: "Task Title",
      description: "Task Description",
      status: "not-started",
      created_by: "User",
    };

    const mockUpdateTask = jest.fn();
    const taskContext = {
      updateTask: mockUpdateTask,
      deleteTask: jest.fn(),
    };

    const wrapper = mount(Task, {
      props: { task },
      global: {
        mocks: {
          taskContext,
        },
      },
    });

    await wrapper.find('[data-test="start-button"]').trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("change-status")).toBeTruthy();

    expect(task.status).toBe("in-progress");
  });
});
