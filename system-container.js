/*
* Author Edward Seufert
*/
'use strict';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom"; 
import * as actions from './system-actions';
import StatusView from '../coreView/status/status-view';
import LoadingView from '../coreView/status/loading-view';
import NavigationView from '../coreView/navigation/navigation-view';
import DashboardContainer from './dashboard/dashboard-container';
import SystemView from '../systemView/system-view';
import ClientDomainContainer from './clientdomain/clientdomain-container';
import ServiceContainer from './service/service-container';
import ApplicationContainer from './application/application-container';
import fuLogger from '../core/common/fu-logger';
import {PrivateRoute} from '../core/common/router-utils-web';

function SystemContainer({location,navigate}) {
	const session = useSelector((state) => state.session);
	const appMenus = useSelector((state) => state.appMenus);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
  	
	useEffect(() => {
    	dispatch(actions.init());
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
    if (session != null && session.selected != null && session.selected.permissions != null) {
      myPermissions = session.selected.permissions;
    }
    if (myMenus.length > 0) {
      return (
        <SystemView>
          <NavigationView appPrefs={appPrefs} permissions={myPermissions}
          menus={myMenus} changeTab={changeTab} activeTab={location.pathname}/>
          <StatusView/>
          <Routes>
            <Route index component={<DashboardContainer />} />
 			<Route element={<PrivateRoute permissions={myPermissions} code="SCD" pathto="/access-denied"/>} >
				<Route path="/clientdomain/*" element={<ClientDomainContainer location={location} navigate={navigate}/>} />
			</Route>
         	<Route element={<PrivateRoute permissions={myPermissions} code="SSC" pathto="/access-denied"/>} >
				<Route path="/services/*" element={<ServiceContainer location={location} navigate={navigate}/>} />
			</Route>
			<Route element={<PrivateRoute permissions={myPermissions} code="SA" pathto="/access-denied"/>} >
				<Route path="/application/*" element={<ApplicationContainer location={location} navigate={navigate}/>} />
			</Route>
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
