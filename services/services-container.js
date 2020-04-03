/*
* Author Edward Seufert
*/
'use-strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as servicesActions from './services-actions';
import fuLogger from '../../core/common/fu-logger';
import ServicesView from '../../systemView/services/services-view';

class ServicesContainer extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.props.actions.initServices();
	}

	onClick(code,index) {
		fuLogger.log({level:'TRACE',loc:'ServicesContainer::onClick',msg:"clicked " + code});

	}

  render() {
			fuLogger.log({level:'TRACE',loc:'ServicesContainer::render',msg:"Hi there"});
      return (
				<ServicesView services={this.props.services}/>
			);
  }
}

ServicesContainer.propTypes = {
	appPrefs: PropTypes.object,
	lang: PropTypes.string,
	actions: PropTypes.object,
	services: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {lang:state.lang, appPrefs:state.appPrefs, services:state.services};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(servicesActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(ServicesContainer);
