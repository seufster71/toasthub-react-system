import callService from '../../core/api/api-call';

// action helpers



// thunks
export function init() {
	return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "SYSTEM_CLIENT_DOMAIN_SVC";
    requestParams.prefTextKeys = new Array("SYSTEM_CLIENT_DOMAIN_PAGE");
    requestParams.prefLabelKeys = new Array("SYSTEM_CLIENT_DOMAIN_PAGE");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/system/callService';

    return callService(params).then( (responseJson) => {
      if (responseJson != null && responseJson.protocalError == null){
    		dispatch({ type: "SYSTEM_CLIENT_DOMAIN_INIT", responseJson });
		} else {
			actionUtils.checkConnectivity(responseJson,dispatch);
		}
    }).catch(error => {
      throw(error);
    });

  };
}


export function list({state,listStart,listLimit,searchCriteria,orderCriteria,info,paginationSegment}) {
	return function(dispatch) {
		let requestParams = {};
		requestParams.action = "LIST";
		requestParams.service = "SYSTEM_CLIENT_DOMAIN_SVC";
		if (listStart != null) {
			requestParams.listStart = listStart;
		} else {
			requestParams.listStart = state.listStart;
		}
		if (listLimit != null) {
			requestParams.listLimit = listLimit;
		} else {
			requestParams.listLimit = state.listLimit;
		}
		if (searchCriteria != null) {
			requestParams.searchCriteria = searchCriteria;
		} else {
			requestParams.searchCriteria = state.searchCriteria;
		}
		if (orderCriteria != null) {
			requestParams.orderCriteria = orderCriteria;
		} else {
			requestParams.orderCriteria = state.orderCriteria;
		}
		let userPrefChange = {"page":"users","orderCriteria":requestParams.orderCriteria,"listStart":requestParams.listStart,"listLimit":requestParams.listLimit};
		dispatch({type:"SYSTEM_CLIENT_DOMAIN_PREF_CHANGE", userPrefChange});
		let params = {};
		params.requestParams = requestParams;
		params.URI = '/api/system/callService';

		return callService(params).then( (responseJson) => {
			if (responseJson != null && responseJson.protocalError == null){
				dispatch({ type: "SYSTEM_CLIENT_DOMAIN_LIST", responseJson, paginationSegment });
				if (info != null) {
		        	  dispatch({type:'SHOW_STATUS',info:info});  
		        }
			} else {
				actionUtils.checkConnectivity(responseJson,dispatch);
			}
		}).catch(error => {
			throw(error);
		});

	};
}

export function listLimit({state,listLimit}) {
	return function(dispatch) {
		 dispatch({ type:"SYSTEM_CLIENT_DOMAIN_LISTLIMIT",listLimit});
		 dispatch(list({state,listLimit}));
	 };
}

export function search({state,searchCriteria}) {
	return function(dispatch) {
		 dispatch({ type:"SYSTEM_CLIENT_DOMAIN_SEARCH",searchCriteria});
		 dispatch(list({state,searchCriteria,listStart:0}));
	 };
}

export function searchChange({field,value}) {
	return function(dispatch) {
		 let params = {};
		 params.field = field;
		 params.value = value;
		 dispatch({ type:"SYSTEM_CLIENT_DOMAIN_SEARCH_CHANGE",params});
	 };
}

export function saveItem({state}) {
	return function(dispatch) {
		let requestParams = {};
	    requestParams.action = "SAVE";
	    requestParams.service = "SYSTEM_CLIENT_DOMAIN_SVC";
	    requestParams.inputFields = state.inputFields;

	    let params = {};
	    params.requestParams = requestParams;
	    params.URI = '/api/system/callService';

	    return callService(params).then( (responseJson) => {
	    	if (responseJson != null && responseJson.protocalError == null){
	    		if(responseJson != null && responseJson.status != null && responseJson.status == "SUCCESS"){  
	    			dispatch(list({state,info:["Save Successful"]}));
	    		} else if (responseJson != null && responseJson.status != null && responseJson.status == "ACTIONFAILED") {
	    			dispatch({type:'SHOW_STATUS',error:responseJson.errors});
	    		}
	    	} else {
	    		actionUtils.checkConnectivity(responseJson,dispatch);
	    	}
	    }).catch(error => {
	    	throw(error);
	    });
	};
}


export function deleteItem({state,id}) {
	return function(dispatch) {
	    let requestParams = {};
	    requestParams.action = "DELETE";
	    requestParams.service = "SYSTEM_CLIENT_DOMAIN_SVC";
	    requestParams.itemId = id;
	    
	    let params = {};
	    params.requestParams = requestParams;
	    params.URI = '/api/system/callService';

	    return callService(params).then( (responseJson) => {
	    	if (responseJson != null && responseJson.protocalError == null){
	    		if(responseJson != null && responseJson.status != null && responseJson.status == "SUCCESS"){  
	    			dispatch(list({state,info:["Delete Successful"]}));
	    		} else if (responseJson != null && responseJson.status != null && responseJson.status == "ACTIONFAILED") {
	    			dispatch({type:'SHOW_STATUS',warn:responseJson.errors});
	    		}
	    	} else {
	    		actionUtils.checkConnectivity(responseJson,dispatch);
	    	}
	    }).catch(error => {
	    	throw(error);
	    });
	};
}


export function modifyItem({id,appPrefs}) {
	return function(dispatch) {
	    let requestParams = {};
	    requestParams.action = "ITEM";
	    requestParams.service = "SYSTEM_CLIENT_DOMAIN_SVC";
	    requestParams.prefFormKeys = new Array("SYSTEM_CLIENT_DOMAIN_FORM");
	    if (id != null) {
	    	requestParams.itemId = id;
	    }
	    let params = {};
	    params.requestParams = requestParams;
	    params.URI = '/api/system/callService';

	    return callService(params).then( (responseJson) => {
	    	if (responseJson != null && responseJson.protocalError == null){
	    		dispatch({ type: 'SYSTEM_CLIENT_DOMAIN_ITEM',responseJson,appPrefs});
	    	} else {
	    		actionUtils.checkConnectivity(responseJson,dispatch);
	    	}
	    }).catch(error => {
	    	throw(error);
	    });
	};
}

export function inputChange(field,value) {
	 return function(dispatch) {
		 let params = {};
		 params.field = field;
		 params.value = value;
		 dispatch({ type:"SYSTEM_CLIENT_DOMAIN_INPUT_CHANGE",params});
	 };
}

export function orderBy({state,orderCriteria}) {
	 return function(dispatch) {
		 dispatch({ type:"SYSTEM_CLIENT_DOMAIN_ORDERBY",orderCriteria});
		 dispatch(list({state,orderCriteria}));
	 };
}

export function clearItem() {
	return function(dispatch) {
		dispatch({ type:"SYSTEM_CLIENT_DOMAIN_CLEAR_ITEM"});
	};
}

export function clearField(field) {
	return function(dispatch) {
		let params = {};
		 params.field = field;
		dispatch({ type:"SYSTEM_CLIENT_DOMAIN_CLEAR_FIELD",params});
	};
}
export function setErrors({errors}) {
	 return function(dispatch) {
		 dispatch({ type:"SYSTEM_CLIENT_DOMAIN_SET_ERRORS",errors});
	 };
}

export function openDeleteModal({item}) {
	 return function(dispatch) {
		 dispatch({type:"SYSTEM_CLIENT_DOMAIN_OPEN_DELETE_MODAL",item});
	 };
}

export function closeDeleteModal() {
	 return function(dispatch) {
		 dispatch({type:"SYSTEM_CLIENT_DOMAIN_CLOSE_DELETE_MODAL"});
	 };
}

export function cancel({state}) {
	return function(dispatch) {
		dispatch({type:"SYSTEM_CLIENT_DOMAIN_CANCEL"});
		dispatch(list({state}));
	 };
}