import React from 'react';
import { Radio } from 'asp-antd-compatible';
import Between from './Between';
import CheckBoxEditor from './CheckBoxEditor';
import FromEvery from './FromEvery';
import Reg, { index } from './Reg';
import BaseEditor from './BaseEditor';

const RadioGroup = Radio.Group;

const defaultRadioKeyValue = {};
defaultRadioKeyValue[index.EVERY] = '*';
defaultRadioKeyValue[index.BETWEEN] = '0-23';
defaultRadioKeyValue[index.FROM_EVERY] = '0/1';
defaultRadioKeyValue[index.CHECK_BOX] = '*';

class HourEditor extends BaseEditor{
  state = {
    radio: index.EVERY,
    value: defaultRadioKeyValue,
  };

  render() {
    const { radioStyle, value: defaultValue, ...config } = this.props;
    const { radio, value } = this.state;

    return (
      <RadioGroup onChange={this.handleRadioChange} value={radio}>
        <Reg value={defaultValue} currentIndex={radio} onChange={this.handleRegChange} />
        <Radio style={radioStyle} value={index.EVERY}>
          每时
        </Radio>
        <Radio style={radioStyle} value={index.BETWEEN}>
          周期 <Between max={23} value={value[index.BETWEEN]} {...config} onChange={this.handleValueChange.bind(this, index.BETWEEN)} />
        </Radio>
        <Radio style={radioStyle} value={index.FROM_EVERY}>
          <FromEvery
            front="从"
            middle="小时开始,每"
            back="小时执行一次"
            fromMax={23}
            everyMax={23}
            onChange={this.handleValueChange.bind(this, index.FROM_EVERY)}
            value={value[index.FROM_EVERY]}
            {...config}
          />
        </Radio>
        <Radio style={radioStyle} value={index.CHECK_BOX}>
          指定
          <CheckBoxEditor max={23} value={value[index.CHECK_BOX]} {...config} onChange={this.handleValueChange.bind(this, index.CHECK_BOX)} />
        </Radio>
      </RadioGroup>
    );
  }
}

export default HourEditor;
