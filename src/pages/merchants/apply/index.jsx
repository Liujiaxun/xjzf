import {Card, Steps} from 'antd';
import React, {Component} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import styles from './style.less';

const {Step} = Steps;

@connect(({merchantsAndApply}) => ({
  current: merchantsAndApply.current,
}))
class StepForm extends Component {
  constructor(props){
    super(props);
    props.dispatch({
      type:'merchantsAndApply/clearData'
    })
    const { id, setup } = props.location.query;
    props.dispatch({
      type: 'merchantsAndApply/saveInfo',
      payload: {},
    })
    if(id && setup){
      props.dispatch({
        type: 'merchantsAndApply/saveCurrentStep',
        payload: setup,
      })
    }else{
      props.dispatch({
        type: 'merchantsAndApply/saveCurrentStep',
        payload: 'info',
      })
    }
  }

  getCurrentStep() {
    const {current} = this.props;
    switch (current) {
      case 'info':
        return 0;
      case 'pay':
        return 1;
      case 'qy':
        return 2;
      case 'result':
        return 3;
      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    if (currentStep === 0) {
      stepComponent = <Step1/>;
    } else if (currentStep === 1) {
      stepComponent = <Step3/>;
    } else if (currentStep === 2) {
      stepComponent = <Step2 id={ this.props.location.query.id }/>;
    } else if (currentStep === 3) {
      stepComponent = <Step5/>;
    } else {
      stepComponent = <Step1/>;
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={true}>
          <>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="填写信息"/>
              <Step title="支付款项"/>
              <Step title="商家签约"/>
              <Step title="开通完成"/>
            </Steps>
            {stepComponent}
          </>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default StepForm;
