/*
* Author Edward Seufert
*/
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Switch, Route, withRouter, Redirect} from "react-router";
import * as systemActions from './system-actions';
import LoginContainer from '../core/usermanagement/login-container';
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

class SystemContainer extends Component {
  constructor(props) {
		super(props);
    this.changeTab = this.changeTab.bind(this);
	}

  componentDidMount() {
    this.props.actions.initSystem();
  }

  changeTab(code,index) {
      this.props.history.replace(index);
  }

  render() {
    fuLogger.log({level:'TRACE',loc:'SystemContainer::render',msg:"path "+ this.props.history.location.pathname});

    let myMenus = [];
    if (this.props.appMenus != null && this.props.appMenus[this.props.appPrefs.systemMenu] != null) {
      myMenus = this.props.appMenus[this.props.appPrefs.systemMenu];
    }
    let myPermissions = {};
    if (this.props.member != null && this.props.member.user != null && this.props.member.user.permissions != null) {
      myPermissions = this.props.member.user.permissions;
    }
    if (myMenus.length > 0) {
      return (
        <SystemView>
          <NavigationView appPrefs={this.props.appPrefs} permissions={myPermissions}
          menus={myMenus} changeTab={this.changeTab} activeTab={this.props.history.location.pathname}/>
          <StatusView/>
          <Switch>
            <Route exact path="/" component={DashboardContainer} />
            <Route exact path="/system" component={DashboardContainer} />
            <PrivateRoute path="/system-clientdomain" component={ClientDomainContainer} permissions={myPermissions} code="SCD" pathto="/access-denied"/>
            <PrivateRoute path="/system-services" component={ServicesContainer} permissions={myPermissions} code="SSC" pathto="/access-denied"/>
            <PrivateRoute path="/system-application" component={ApplicationContainer} permissions={myPermissions} code="SA" pathto="/access-denied"/>
          </Switch>
        </SystemView>
      );
    } else {
      return (
        <SystemView> <LoadingView/>
        </SystemView>
      );
    }
  }
}

SystemContainer.propTypes = {
	appPrefs: PropTypes.object.isRequired,
	appMenus: PropTypes.object,
	lang: PropTypes.string,
  session: PropTypes.object,
  member: PropTypes.object,
	actions: PropTypes.object,
  history: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {appPrefs:state.appPrefs, appMenus:state.appMenus, lang:state.lang, session:state.session, member:state.member};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(systemActions,dispatch) };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SystemContainer));
