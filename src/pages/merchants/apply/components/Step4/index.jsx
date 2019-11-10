import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from './index.less';

const Step5 = props => {
  const { data, dispatch, info } = props;

  if (!data) {
    return null;
  }

  const { payAccount, receiverAccount, receiverName, amount } = data;

  const setup = () => {
    props.dispatch({
      type: 'merchantsAndApply/saveCurrentStep',
      payload: 'qy'
    })
  }

  const extra = (
      <Button onClick={setup} type="primary">下一步</Button>
  );
  return (
    <>
      <Result
        status={info.status === '2' ? 'success' : info.status === '1' ? 'info': info.status === '-2' ? 'error' : 'warning' }
        title={info.status === '2' ? '审核成功' : info.status === '1' ? '审核中': info.status === '-2' ? '审核驳回' : 'warning' }
        subTitle={info.status === '2' ? '审核成功可进行下一步' : info.status === '1' ? '请等候10分，系统自动审核': info.status === '-2' ? '可返回我的申请查看' : '可返回我的申请查看' }
        extra={info.status === '2' ? extra : null }
        className={styles.result}
      >
        {/*{information}*/}
      </Result>
    </>

  );
};

export default connect(({ merchantsAndApply }) => ({
  data: merchantsAndApply.step,
  info: merchantsAndApply.info,
}))(Step5);
