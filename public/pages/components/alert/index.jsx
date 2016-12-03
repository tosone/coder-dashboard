import React from 'react';

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.config = props.config;
    this.dialogActions = [
      {
        label: 'OK',
        onClick: this.dialogToggle.bind(this)
      }
    ];
    this.onChange = props.onChange;
  }

  dialogToggle() {
    this.onChange(!this.state.dialogActive);
    this.setState({
      dialogActive: !this.state.dialogActive
    });
  }

  componentWillMount() {
    this.setState({dialogActive: this.config.active, title: this.config.title, content: this.config.content});
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    this.config = nextProps.config;
    this.setState({dialogActive: this.config.active, title: this.config.title, content: this.config.content});
  }

  render() {
    return (
      <Dialog actions={this.dialogActions} active={this.state.dialogActive} onEscKeyDown={this.dialogToggle.bind(this)} onOverlayClick={this.dialogToggle.bind(this)} title={this.state.title}>
        <p>{this.state.content}</p>
      </Dialog>
    );
  }
}

export default Index;
