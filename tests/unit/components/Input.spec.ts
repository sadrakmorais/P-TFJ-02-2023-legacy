import { mount } from "@vue/test-utils";
import Input from "@/components/Input.vue";

describe("Input.vue", () => {
  it("renders input correctly with default props", () => {
    const wrapper = mount(Input);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("input").attributes("type")).toBe("text");
    expect(wrapper.find("input").attributes("placeholder")).toBe("");
    expect(wrapper.find("input").element.value).toBe("");
  });

  it("renders input with specified type", () => {
    const wrapper = mount(Input, {
      props: {
        type: "password",
      },
    });
    expect(wrapper.find("input").attributes("type")).toBe("password");
  });

  it("renders input with specified placeholder", () => {
    const placeholder = "Enter your text";
    const wrapper = mount(Input, {
      props: {
        placeHolder: placeholder,
      },
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe(placeholder);
  });

  it("renders input with specified icon", () => {
    const icon = "icon-name";
    const wrapper = mount(Input, {
      props: {
        icon: icon,
      },
      global: {
        mocks: {
          "v-icon": {
            props: ["name"],
            template: "<span>{{ name }}</span>",
          },
        },
      },
    });
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("v-icon").exists()).toBe(true);
  });

  it("emits update:modelValue when input value changes", async () => {
    const wrapper = mount(Input);
    const input = wrapper.find("input");
    const newValue = "new value";
    await input.setValue(newValue);
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([newValue]);
  });
});
