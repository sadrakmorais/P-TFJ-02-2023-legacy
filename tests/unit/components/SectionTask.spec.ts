import { mount } from "@vue/test-utils";
import SectionTask from "@/components/SectionTask.vue";
import Task from "@/components/Task.vue";

describe("SectionTask", () => {
  it("renders section with correct background color and title", () => {
    const type = "finished";
    const title = "Section Title";
    const tasks = [
      { id: 1, title: "Task 1", status: "finished" },
      { id: 2, title: "Task 2", status: "not-started" },
      { id: 3, title: "Task 3", status: "in-progress" },
    ];

    const wrapper = mount(SectionTask, {
      props: { type, title, tasks },
      global: {
        components: {
          Task,
        },
      },
    });

    expect(wrapper.find("section").exists()).toBe(true);

    expect(wrapper.find("section").classes()).toContain("rounded-md");
    expect(wrapper.find("section").classes()).toContain("bg-opacity-20");
    expect(wrapper.find("section").classes()).toContain("bg-green-400");

    expect(wrapper.find(".font-medium").text()).toBe("Section Title");

    const tasksWrapper = wrapper.findAllComponents(Task);
    expect(tasksWrapper.length).toBe(3);
    tasksWrapper.forEach((taskWrapper, index) => {
      expect(taskWrapper.props("task")).toEqual(tasks[index]);
    });
  });
});
