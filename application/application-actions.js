import callService from '../../core/api/api-call';

// action helpers



// thunks
export function initApplication() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "APPLICATION_SVC";
    requestParams.appForms = new Array("SYSTEM_APPLICATION_FORM");
    requestParams.appTexts = new Array("SYSTEM_APPLICATION_PAGE");
    requestParams.appLabels = new Array("SYSTEM_APPLICATION_TABLE");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/admin/callService';

    return callService(params).then( (responseJson) => {
      dispatch({ type: "LOAD_INIT_APPLICATION", responseJson });
    }).catch(error => {
      throw(error);
    });

  };
}
