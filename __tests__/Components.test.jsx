const { mount } = require("enzyme");
const { renderToJson } = require("enzyme-to-json");
const React = require("react");

const { Component, Model } = require("../Component");

describe("test1", () => {
  it("should get element.", async () => {
    const model = new Model();
    const wrapper = mount(
      <Component model={model}/>
    );
    wrapper.find(".up").simulate("click"); // 1
    wrapper.find(".up").simulate("click"); // 2
    wrapper.find(".up").simulate("click"); // 3
    wrapper.find(".class-1-list").childAt(2).find(".class-list__item--text").simulate("click");
    expect(renderToJson(wrapper.render())).toMatchSnapshot();
    expect(wrapper.find(".class-1-list").childAt(2).html().includes("class-selected")).toBe(true);
    await new Promise(r => {
      model.onUpdate(() => {
        if (model.getCount() === 7) {
          r();
        }
      });
    });
    console.log(wrapper.html());
    console.log(wrapper.debug());
    expect(wrapper.find(".class-1-list").children().length).toBe(7);
  });
});