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
				<ClientDomainView clientdomains={this.props.clientdomains}/>
			);
  }
}

ClientDomainContainer.propTypes = {
	lang: PropTypes.string,
	actions: PropTypes.object,
	clientdomains: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {lang:state.lang, clientdomains:state.clientdomains};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(clientdomainActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(ClientDomainContainer);
