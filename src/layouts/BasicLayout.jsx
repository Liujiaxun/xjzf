/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {DefaultFooter, SettingDrawer} from '@ant-design/pro-layout';
import React, {useEffect} from 'react';
import Link from 'umi/link';
import {Redirect} from 'react-router'
import {connect} from 'dva';
import {Icon, Result, Button, message} from 'antd';
import {formatMessage} from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import {isAntDesignPro, getAuthorityFromRouter} from '@/utils/utils';
import logo from '../assets/logo.svg';
import {isLogin} from "@/utils/utils";

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
/**
 * use Authorized check all menu item
 */

const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = {...item, children: item.children ? menuDataRender(item.children) : []};
    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
//   links={[
//       {
//         key: 'Ant Design Pro',
//         title: 'Ant Design Pro',
//         href: 'https://pro.ant.design',
//         blankTarget: true,
//       },
// {
//   key: 'github',
//     title: <Icon type="github" />,
//   href: 'https://github.com/ant-design/ant-design-pro',
//   blankTarget: true,
// },
// {
//   key: 'Ant Design',
//     title: 'Ant Design',
//   href: 'https://ant.design',
//   blankTarget: true,
// },
// ]}
  <DefaultFooter
    copyright="2019 xiaojuzhifu"
  />
);

const footerRender = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
    </>
  );
};

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
      dispatch({
        type: 'user/getUserInfo',
      })
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  if (!isLogin()) {
    message.error('未登录或token失效')
    return <Redirect to="/user/login"/>
  }
  return (
    <>
      <ProLayout
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {/*<Authorized authority={authorized.authority} noMatch={noMatch}>*/}
        {children}
        {/*</Authorized>*/}
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({global, settings}) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
