import { Icon, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip>
      {/*<NoticeIconView />*/}
      <Avatar menu />
      {/*<SelectLang className={styles.action} />*/}
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
