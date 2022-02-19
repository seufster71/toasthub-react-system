import callService from '../../core/api/api-call';

// action helpers



// thunks
export function init() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "SYSTEM_DASHBOARD_SVC";
    requestParams.prefFormKeys = new Array("SYSTEM_DASHBOARD_FORM");
    requestParams.prefTextKeys = new Array("SYSTEM_DASHBOARD_PAGE");
    requestParams.prefLabelKeys = new Array("SYSTEM_DASHBOARD_TABLE");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/system/callService';

    return callService(params).then( (responseJson) => {
      dispatch({ type: "SYSTEM_DASHBOARD_INIT", responseJson });
    }).catch(error => {
      throw(error);
    });

  };
}
