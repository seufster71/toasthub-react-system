import callService from '../core/api/api-call';

// action

// thunk
export function initSystem() {
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
        dispatch({ type: "LOAD_INIT", responseJson });
      }).catch(error => {
        throw(error);
      });

    };
}
