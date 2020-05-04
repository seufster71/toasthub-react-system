import callService from '../../core/api/api-call';

// action helpers



// thunks
export function initClientDomain() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "CLIENT_DOMAIN_SVC";
    requestParams.prefFormKeys = new Array("SYSTEM_CLIENT_DOMAIN_FORM");
    requestParams.prefTextKeys = new Array("SYSTEM_CLIENT_DOMAIN_PAGE");
    requestParams.prefLabelKeys = new Array("SYSTEM_CLIENT_DOMAIN_TABLE");
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
