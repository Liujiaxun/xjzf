import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';

const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    if (route.authority) {
      authorities = route.authority;
    } // match prefix

    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent = ({
  children,
}) => {
  return (
      <div>
        {children}
      </div>
  );
};

export default connect(({ user }) => ({
  user,
}))(AuthComponent);
