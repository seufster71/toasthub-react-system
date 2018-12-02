import callService from '../../core/api/api-call';

// action helpers



// thunks
export function initClientDomain() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "CLIENT_DOMAIN_SVC";
    requestParams.appForms = new Array("SYSTEM_CLIENT_DOMAIN_FORM");
    requestParams.appTexts = new Array("SYSTEM_CLIENT_DOMAIN_PAGE");
    requestParams.appLabels = new Array("SYSTEM_CLIENT_DOMAIN_TABLE");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/system/callService';

    return callService(params).then( (responseJson) => {
      dispatch({ type: "LOAD_INIT_CLIENT_DOMAIN", responseJson });
    }).catch(error => {
      throw(error);
    });

  };
}
