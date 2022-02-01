/*
* Author Edward Seufert
*/
'use strict';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import * as systemActions from './system-actions';
import LoginContainer from '../core/usermgnt/login-container';
import StatusView from '../coreView/status/status-view';
import LoadingView from '../coreView/status/loading-view';
import NavigationView from '../coreView/navigation/navigation-view';
import DashboardContainer from './dashboard/dashboard-container';
import SystemView from '../systemView/system-view';
import ClientDomainContainer from './clientdomain/clientdomain-container';
import ServicesContainer from './services/services-container';
import ApplicationContainer from './application/application-container';
import fuLogger from '../core/common/fu-logger';
import {PrivateRoute} from '../core/common/utils';

function SystemContainer() {
	const member = useSelector((state) => state.member);
	const session = useSelector((state) => state.session);
	const appMenus = useSelector((state) => state.appMenus);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
  	
	useEffect(() => {
    	dispatch(systemActions.initSystem());
  	}, []);

	const changeTab = (code,index) => {
      navigate(index);
  	}

    fuLogger.log({level:'TRACE',loc:'SystemContainer::render',msg:"path "+ location.pathname});

    let myMenus = [];
    if (appMenus != null && appMenus[appPrefs.systemMenu] != null) {
      myMenus = appMenus[appPrefs.systemMenu];
    }
    let myPermissions = {};
    if (member != null && member.user != null && member.user.permissions != null) {
      myPermissions = member.user.permissions;
    }
    if (myMenus.length > 0) {
      return (
        <SystemView>
          <NavigationView appPrefs={appPrefs} permissions={myPermissions}
          menus={myMenus} changeTab={changeTab} activeTab={location.pathname}/>
          <StatusView/>
          <Routes>
            <Route exact path="/" component={DashboardContainer} />
            <Route exact path="/system" component={DashboardContainer} />
            <PrivateRoute path="/system-clientdomain" component={ClientDomainContainer} permissions={myPermissions} code="SCD" pathto="/access-denied"/>
            <PrivateRoute path="/system-services" component={ServicesContainer} permissions={myPermissions} code="SSC" pathto="/access-denied"/>
            <PrivateRoute path="/system-application" component={ApplicationContainer} permissions={myPermissions} code="SA" pathto="/access-denied"/>
          </Routes>
        </SystemView>
      );
    } else {
      return (
        <SystemView> <LoadingView/>
        </SystemView>
      );
    }
}


export default SystemContainer;
