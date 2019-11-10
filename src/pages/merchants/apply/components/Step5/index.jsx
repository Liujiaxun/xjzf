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


  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="付款账户"> {payAccount}</Descriptions.Item>
        <Descriptions.Item label="收款账户"> {receiverAccount}</Descriptions.Item>
        <Descriptions.Item label="收款人姓名"> {receiverName}</Descriptions.Item>
        <Descriptions.Item label="转账金额">
          <Statistic value={amount} suffix="元" />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <Link to='/merchants/my-business'>
      <Button>我的商户</Button>
    </Link>
  );
  return (
    <>
      <Result
        status={info.status === '3' ? 'success' :"error" }
        title={info.status === '3' ? '申请成功' :"申请失败" }
        subTitle={info.status === '3' ? '可返回我的商户查看' : '可返回我的申请查看' }
        extra={info.status === '3' ? extra : null }
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
