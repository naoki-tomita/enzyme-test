import * as React from "react";

export class Model {
  constructor() {
    this.cbs = [];
    this.count = 0;
    this.selected = -1;
    this.isProcessing = false;
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

  getIsProcessing() {
    return this.isProcessing;
  }

  async select(selectedIndex) {
    const count = this.count;
    this.selected = selectedIndex;
    this.dispatch();
  }

  getSelected() {
    return this.selected;
  }
}

export class Component extends React.Component {
  constructor(p, x) {
    super(p, x);
    this.state = {
      count: this.props.model.getCount(),
      selected: this.props.model.getSelected(),
    };
  }
  componentDidMount() {
    this.props.model.onUpdate(() => {
      this.setState({
        count: this.props.model.getCount(),
        selected: this.props.model.getSelected(),
        isProcessing: this.props.model.getIsProcessing(),
      });
    });
  }
  render() {
    return(
      <div>
        <button className="up" onClick={this.onCountup.bind(this)}>Count up</button>
        <button className="down" onClick={this.onCountdown.bind(this)}>Count down</button>
        <div className="count">{this.state.count}</div>
        <div className="class-1">
          <ul className="class-1-list">
            {this.state.isProcessing
              ? <div>Processing...</div>
              : Array(this.state.count)
                .fill(null)
                .map((_, i) => {
                  return (
                    <li key={i} className={`class-list__item${this.state.selected === i ? " class-selected": ""}`}>
                      <a />
                      <a
                        className="class-list__item--text"
                        onClick={() => this.onSelect(i)}
                      >
                        {`ITEM_${i}`}
                      </a>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    );
  }

  onCountup() {
    const count = this.props.model.getCount();
    this.props.model.setCount(count + 1);
  };

  onCountdown() {
    const count = this.props.model.getCount();
    if (count === 0) {
      return;
    }
    this.props.model.setCount(count - 1);
  }

  async onSelect(index) {
    this.props.model.select(index);

    this.onCountup();
    await new Promise(r => setTimeout(() => r(), 500));
    this.onCountup();
    this.onCountup();
    this.onCountup();
  }
}