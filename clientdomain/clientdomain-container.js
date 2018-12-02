/*
* Author Edward Seufert
*/
'use-strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as clientdomainActions from './clientdomain-actions';
import fuLogger from '../../core/common/fu-logger';
import ClientDomainView from '../../systemView/clientdomain/clientdomain-view';

class ClientDomainContainer extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.props.actions.initClientDomain();
	}

	onClick(code,index) {
		fuLogger.log({level:'TRACE',loc:'ClientDomainContainer::onClick',msg:"clicked " + code});

	}

  render() {
			fuLogger.log({level:'TRACE',loc:'ClientDomainContainer::render',msg:"Hi there"});
      return (
				<ClientDomainView clientDomains={this.props.clientDomains}/>
			);
  }
}

ClientDomainContainer.propTypes = {
	lang: PropTypes.string,
	actions: PropTypes.object,
	clientDomains: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {lang:state.lang, clientDomains:state.clientDomains};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(clientdomainActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(ClientDomainContainer);
