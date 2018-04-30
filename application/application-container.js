/*
* Author Edward Seufert
*/
'use-strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as applicationActions from './application-actions';
import fuLogger from '../../core/common/fu-logger';
import ApplicationView from '../../systemView/application/application-view';

class ApplicationContainer extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.props.actions.initApplication();
	}

	onClick(code,index) {
    fuLogger.log({level:'TRACE',loc:'ApplicationContainer::onClick',msg:"clicked " + code});

  }

  render() {
			fuLogger.log({level:'TRACE',loc:'ApplicationContainer::render',msg:"Hi there"});
      return (
				<ApplicationView applications={this.props.applications}/>
			);
  }
}

ApplicationContainer.propTypes = {
	lang: PropTypes.string,
	actions: PropTypes.object,
	applications: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {lang:state.lang, applications:state.applications};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(applicationActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(ApplicationContainer);
