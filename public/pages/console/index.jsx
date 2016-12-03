import React from 'react';
import {
  List,
  ListItem,
  FontIcon,
  IconButton,
  Button,
  Dialog,
  Input
} from 'react-toolbox';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import _ from 'lodash';
import style from './style';
import mqtt from 'mqtt';
import classnames from 'classnames';
class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.ipReg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    this.contentList = [
      {
        key: 'add',
        caption: 'Add a new console'
      }
    ];
    this.dialogActions = [
      {
        label: 'Cancel',
        onClick: this.dialogToggle.bind(this)
      }, {
        label: 'Save',
        onClick: this.dialogToggle.bind(this, 'add')
      }
    ];
    this.alertActions = [
      {
        label: 'OK',
        onClick: this.alertToggle.bind(this)
      }
    ];
  }
  itemContent(item) {
    let icon = 'add';
    if (item.key !== 'add') {
      icon = 'delete';
    }
    return (
      <span>
        <IconButton icon={icon} accent onClick={(e) => {
          e.stopPropagation();
          if (item.key === 'add') {
            this.dialogToggle();
          } else {
            if (item.key === 'add') {
              this.dialogToggle();
            } else {
              _.forEach(this.contentList, (val, key) => {
                if (val.key === item.key) {
                  let temp = [];
                  _.forEach(this.contentList, (v, k) => {
                    if (k !== key) {
                      temp.push(v);
                    }
                  });
                  this.contentList = temp;
                  this.setState({list: this.drawList()});
                }
              });
            }
          }
        }}/> {item.caption}
      </span>
    );
  }
  drawList() {
    let tempNode = [];
    for (let item of this.contentList) {
      let pathTo = '/#/console/'
      if (item.key !== 'add')
        pathTo = '/#/console/' + item.caption
      tempNode.push(<ListItem key={item.key} caption={item.caption} onClick={() => {
        if (item.key === 'add') {
          this.dialogToggle();
        }
      }} itemContent={this.itemContent(item)} to={pathTo}/>);
    }
    return tempNode;
  }
  dialogToggle(key) {
    if (key && key === 'add' && this.state.dialogActive && this.state.IP !== '') {
      if (this.ipReg.test(this.state.IP)) {
        let count = 0;
        _.forEach(this.contentList, val => {
          if (val.caption === this.state.IP) {
            this.setState({
              alertConfig: {
                active: true,
                title: 'Warning',
                content: 'Alread have a same IP.'
              }
            });
          } else {
            count++;
          }
        });
        if (count === this.contentList.length) {
          this.setState({IP: this.state.IP});
          this.contentList.push({key: uuid.v4(), caption: this.state.IP, leftIcon: 'delete'});
          this.setState({list: this.drawList(), IP: ''});
        }
      } else if (this.state.IP !== '') {
        this.setState({
          alertConfig: {
            active: true,
            title: 'Warning',
            content: 'Not a valid IP.'
          }
        });
      }
    }
    this.setState({
      dialogActive: !this.state.dialogActive
    });
  }
  alertToggle() {
    this.setState({
      alertConfig: {
        active: !this.state.alertConfig.active
      }
    });
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillMount() {
    this.setState({
      list: this.drawList(),
      IP: '',
      dialogActive: false,
      alertConfig: {
        active: false,
        title: '',
        content: ''
      }
    });
  }
  ipOnCahnge(text) {
    this.setState({IP: text});
  }
  ipOnKeyPress(e) {
    if (e.key === 'Enter') {
      this.dialogToggle('add');
    }
  }
  render() {
    return (
      <div>
        <Dialog actions={this.alertActions} active={this.state.alertConfig.active} onEscKeyDown={this.alertToggle.bind(this)} onOverlayClick={this.alertToggle.bind(this)} title={this.state.alertConfig.title}>
          <p>{this.state.alertConfig.content}</p>
        </Dialog>
        <Dialog actions={this.dialogActions} active={this.state.dialogActive} onEscKeyDown={this.dialogToggle.bind(this)} onOverlayClick={this.dialogToggle.bind(this)} title='添加一个新的监视窗口'>
          <Input type='text' label='请填写一个IP' name='ip' value={this.state.IP} onChange={this.ipOnCahnge.bind(this)} onKeyPress={this.ipOnKeyPress.bind(this)}/>
        </Dialog>
        <div className={style.operationBar}>
          <List selectable>
            {this.state.list}
          </List>
        </div>
        <div className={style.dashboard}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Index;
// <div className={classnames(style.send, style.clearfix)}>
//   <Input type='text' label='Topic' className={style.input} value={this.state.sendTopic} onChange={this.topicOnChange.bind(this)}/>
//   <Input type='text' label='Msg' className={style.input} value={this.state.sendPayload} onChange={this.msgOnChange.bind(this)}/>
//   <Button icon='send' label='Sned' className={style.button} onClick={this.send.bind(this)}/>
// </div>
// <div className={classnames(style.dashboardMsg)} id="dashboardMsg">
//   {this.state.msgList}
// </div>
