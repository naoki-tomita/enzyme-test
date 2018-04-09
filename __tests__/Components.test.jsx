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

    expect(renderToJson(wrapper.render())).toMatchSnapshot();
    wrapper.find("button").simulate("click");
    expect(renderToJson(wrapper.render())).toMatchSnapshot();
    // Waiting for the count-up to finish.
    // Because the count up event is delayed by 500 ms after clicking the button..
    await new Promise(r => model.onUpdate(() => r()));
    expect(renderToJson(wrapper.render())).toMatchSnapshot();

    const expectHtml =
      "<div><h1>1</h1><ul><li>ITEM_0</li></ul><button>Button</button></div>";
    const expectDebug = [
      "<Component model={{...}}>",
      "  <div>",
      "    <h1>",
      "      0",
      "    </h1>",
      "    <ul>",
      "      <li>",
      "        ITEM_0",
      "      </li>",
      "    </ul>",
      "    <button onClick={[Function: bound onClick]}>",
      "      Button",
      "    </button>",
      "  </div>",
      "</Component>",
    ];

    expect(wrapper.html()).toEqual(expectHtml);
    expect(wrapper.debug()).toEqual(expectDebug.join("\n")); // Will be fail.
    expect(wrapper.find("ul").children().length).toBe(1); // Will be fail.
  });
});