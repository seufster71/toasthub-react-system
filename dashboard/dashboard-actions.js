import callService from '../../core/api/api-call';

// action helpers



// thunks
export function initDashboard() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "DASHBOARD_SVC";
    requestParams.appForms = new Array("SYSTEM_DASHBOARD_FORM");
    requestParams.appTexts = new Array("SYSTEM_DASHBOARD_PAGE");
    requestParams.appLabels = new Array("SYSTEM_DASHBOARD_TABLE");
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
