import callService from '../core/api/api-call';

// action

// thunk
export function init() {
	return function(dispatch) {
		let requestParams = {};
		requestParams.action = "INIT";
		requestParams.service = "SYSTEM_SVC";
		requestParams.prefTexts = new Array("SYSTEM_PAGE");
		requestParams.menuNames = new Array("SYSTEM_MENU_TOP");
		let params = {};
		params.requestParams = requestParams;
		params.URI = '/api/system/callService';

      return callService(params).then( (responseJson) => {
			if (responseJson != null && responseJson.protocalError == null){
    			dispatch({ type: "GLOBAL_INIT", responseJson });
			} else {
				actionUtils.checkConnectivity(responseJson,dispatch);
			}
      }).catch(error => {
        throw(error);
      });

    };
}
