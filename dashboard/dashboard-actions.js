import callService from '../../core/api/api-call';

// action helpers



// thunks
export function initDashboard() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "DASHBOARD_SVC";
    requestParams.prefForms = new Array("SYSTEM_DASHBOARD_FORM");
    requestParams.prefTexts = new Array("SYSTEM_DASHBOARD_PAGE");
    requestParams.prefLabels = new Array("SYSTEM_DASHBOARD_TABLE");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/system/callService';

    return callService(params).then( (responseJson) => {
      dispatch({ type: "LOAD_INIT_APPLICATION", responseJson });
    }).catch(error => {
      throw(error);
    });

  };
}
