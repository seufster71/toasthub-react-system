/*
* Author Edward Seufert
*/
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Switch, Route, withRouter, Redirect} from "react-router";
import * as appPrefActions from '../core/common/apppref-actions';
import LoginContainer from '../core/usermanagement/login-container';
import StatusView from '../coreView/status/status-view';
import LoadingView from '../coreView/status/loading-view';
import NavigationView from '../coreView/navigation/navigation-view';
import DashboardContainer from './dashboard/dashboard-container';
import LogoutContainer from './logout/logout-container';
import fuLogger from '../core/common/fu-logger';
import {PrivateRoute} from '../core/common/utils';

class SystemContainer extends Component {
  constructor(props) {
		super(props);
    this.changeTab = this.changeTab.bind(this);
	}

  componentDidMount() {
    this.props.actions.initMember();
  }

  changeTab(code,index) {
      //this.setState({activeTab:code});
      this.props.history.replace(index);
  }

  render() {
    fuLogger.log({level:'TRACE',loc:'MemberContainer::render',msg:"path "+ this.props.history.location.pathname});

    let myMenus = [];
    if (this.props.appMenus != null && this.props.appMenus[this.props.appPrefs.memberMenu] != null) {
      myMenus = this.props.appMenus[this.props.appPrefs.memberMenu];
    }
    let myPermissions = {};
    if (this.props.member != null && this.props.member.user != null && this.props.member.user.permissions != null) {
      myPermissions = this.props.member.user.permissions;
    }
    if (myMenus.length > 0) {
      return (
        <MemberView>
          <NavigationView appPrefs={this.props.appPrefs} permissions={myPermissions}
          menus={myMenus} changeTab={this.changeTab} activeTab={this.props.history.location.pathname}/>
          <StatusView/>
          <Switch>
            <Route exact path="/" component={DashboardContainer} />
            <Route exact path="/member" component={DashboardContainer} />
            <PrivateRoute path="/member-acquaintances" component={AcquaintancesContainer} permissions={myPermissions} code="MA" pathto="/access-denied"/>
            <PrivateRoute path="/member-groups" component={GroupsContainer} permissions={myPermissions} code="MG" pathto="/access-denied"/>
            <PrivateRoute path="/member-notes" component={NotesContainer} permissions={myPermissions} code="MN" pathto="/access-denied"/>
            <PrivateRoute path="/member-submenu" component={SubMenuContainer} permissions={myPermissions} code="MSM" pathto="/access-denied"/>
            <PrivateRoute path="/member-shopping" component={ShoppingContainer} permissions={myPermissions} code="MS" pathto="/access-denied"/>
            <PrivateRoute path="/member-profile" component={ProfileContainer} permissions={myPermissions} code="MP" minRights="W" pathto="/access-denied"/>
            <PrivateRoute path="/member-logout" component={LogoutContainer} permissions={myPermissions} code="ML" pathto="/access-denied"/>
            <Route path="/admin" render={() => (
              <Redirect to="/admin"/>
            )}/>
          </Switch>
        </MemberView>
      );
    } else {
      return (
        <MemberView> <LoadingView/>
        </MemberView>
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
  return { actions:bindActionCreators(appPrefActions,dispatch) };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SystemContainer));
