import _ from 'lodash';
import uuid from 'uuid';
import mqtt from 'mqtt';
import React from 'react';
import classnames from 'classnames';

import style from './style';

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillUnmount() {
    this.mqtt.end();
  }
  mqttInit() {
    this.msgList = [];
    // console.log(this.ip);
    this.mqtt = mqtt.connect('mqtt://' + this.ip + ':1883');
    this.mqtt.on('connect', () => {
      this.mqtt.subscribe('#');
      // console.log('Connected to mqtt server.');
    });
    this.mqtt.on('message', (topic, payload) => {
      const msg = [
        {
          topic,
          payload
        }
      ];
      this.msgList = msg.concat(this.msgList);
      this.setState({msgList: this.renderMsgList()});
    });
  }
  renderMsgList() {
    let temp = [];
    _.forEach(this.msgList, val => {
      let payload = '';
      try {
        payload = JSON.parse(val.payload.toString());
      } catch (e) {
        payload = val.payload.toString();
      }
      temp.push(
        <div key={uuid.v4()}>
          <span className={style.info}>Topic:</span>
          &nbsp;
          <span className={style.topic}>{val.topic}</span>
          &nbsp;
          <span className={style.info}>Payload:</span>
          &nbsp;
          <span className={style.payload}>{payload}</span>
        </div>
      );
    });
    return temp.reverse();
  }
  componentDidUpdate() {
    let obj = document.getElementById('dashboardMsg');
    obj.scrollTop = obj.scrollHeight;
  }
  componentWillMount() {
    this.ip = this.props.params.id;
    this.mqttInit();
    this.setState({msgList: this.renderMsgList(), sendTopic: '', sendPayload: ''});
  }
  componentWillReceiveProps() {}
  send() {
    if (this.state.sendTopic !== '' && this.state.sendPayload !== '') {
      this.mqtt.publish(this.state.sendTopic, JSON.stringify(this.state.sendPayload));
    }
  }
  topicOnChange(text) {
    this.setState({sendTopic: text});
  }
  msgOnChange(text) {
    this.setState({sendPayload: text});
  }
  render() {
    return (
      <div>{} < div className = {
        classnames(style.send, style.clearfix)}>
        <Input type='text' label='Topic' className={style.input} value={this.state.sendTopic} onChange={this.topicOnChange.bind(this)}/>
        <Input type='text' label='Msg' className={style.input} value={this.state.sendPayload} onChange={this.msgOnChange.bind(this)}/>
        <Button icon='send' label='Sned' className={style.button} onClick={this.send.bind(this)}/>
      </div>
      <div className={classnames(style.dashboardMsg)} id="dashboardMsg">
        {this.state.msgList}
      </div>
    </div>
    );
  }
}
export default Index;
