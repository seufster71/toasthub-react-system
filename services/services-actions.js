import callService from '../../core/api/api-call';

// action helpers



// thunks
export function initServices() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "SERVICE_CRAWLER_SVC";
    requestParams.prefForms = new Array("SYSTEM_SERVICE_CRAWLER_FORM");
    requestParams.prefTexts = new Array("SYSTEM_SERVICE_CRAWLER_PAGE");
    requestParams.prefLabels = new Array("SYSTEM_SERVICE_CRAWLER_TABLE");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/system/callService';

    return callService(params).then( (responseJson) => {
      dispatch({ type: "LOAD_INIT_SERVICES", responseJson });
    }).catch(error => {
      throw(error);
    });

  };
}
