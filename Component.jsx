import * as React from "react";

export class Model {
  constructor() {
    this.cbs = [];
    this.count = 0;
  }

  onUpdate(cb) {
    this.cbs.push(cb);
  }

  dispatch() {
    this.cbs.forEach(cb => cb());
  }

  setCount(count) {
    this.count = count;
    this.dispatch();
  }

  getCount() {
    return this.count;
  }
}

export class Component extends React.Component {
  constructor(p, x) {
    super(p, x);
    this.state = {
      count: p.model.getCount(),
    };
  }
  componentDidMount() {
    this.props.model.onUpdate(() => {
      this.setState({
        count: this.props.model.getCount(),
      });
    });
  }
  render() {
    const { count } = this.state;
    return(
      <div>
        <h1>{count}</h1>
        <ul>
          {Array(count).fill(null).map((_, i) =>
            <li key={i}>{`ITEM_${i}`}</li>
          )}
        </ul>
        <button onClick={this.onClick.bind(this)}>Button</button>
      </div>
    );
  }

  async onClick(index) {
    const { model } = this.props;
    await new Promise(r => setTimeout(() => r(), 500));
    model.setCount(model.getCount() + 1);
  }
}