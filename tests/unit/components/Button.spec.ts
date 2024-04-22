import { mount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button.vue", () => {
  it("renders button correctly when not disabled or outlined", () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain("bg-red-400");
    expect(wrapper.classes()).toContain("text-white");
    expect(wrapper.classes()).toContain("font-semibold");
    expect(wrapper.classes()).toContain("flex");
    expect(wrapper.classes()).toContain("items-center");
    expect(wrapper.classes()).toContain("p-2");
    expect(wrapper.classes()).toContain("justify-center");
    expect(wrapper.classes()).toContain("gap-2");
    expect(wrapper.classes()).toContain("hover:shadow-md");
    expect(wrapper.classes()).toContain("hover:brightness-110");
  });

  it("renders outlined button correctly when isOutlined prop is true", async () => {
    const wrapper = mount(Button, {
      props: {
        isOutlined: true,
      },
    });
    expect(wrapper.classes()).toContain("bg-transparent");
    expect(wrapper.classes()).toContain("border-2");
    expect(wrapper.classes()).toContain("border-white");
  });

  it("renders full-width button correctly when fullWidth prop is true", async () => {
    const wrapper = mount(Button, {
      props: {
        fullWidth: true,
      },
    });
    expect(wrapper.classes()).toContain("w-full");
  });

  it("renders disabled button correctly when isDisabled prop is true", async () => {
    const wrapper = mount(Button, {
      props: {
        isDisabled: true,
      },
    });
    expect(wrapper.classes()).toContain("opacity-50");
    expect(wrapper.classes()).toContain("cursor-not-allowed");
  });

  it("emits click-event when button is clicked", async () => {
    const wrapper = mount(Button);
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click-event")).toBeTruthy();
  });
});
