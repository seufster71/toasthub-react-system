/*
 * Copyright (C) 2020 The ToastHub Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import reducerUtils from '../../core/common/reducer-utils';

export default function applicationReducer(state = {}, action) {
	switch(action.type) {
		case 'SYSTEM_APPLICATION_INIT': {
			if (action.responseJson != null && action.responseJson.params != null) {
				return Object.assign({}, state, {
					prefTexts: Object.assign({}, state.prefTexts, reducerUtils.getPrefTexts(action)),
					prefLabels: Object.assign({}, state.prefLabels, reducerUtils.getPrefLabels(action)),
					prefOptions: Object.assign({}, state.prefOptions, reducerUtils.getPrefOptions(action)),
					columns: reducerUtils.getColumns(action),
					itemCount: reducerUtils.getItemCount(action),
					items: reducerUtils.getItems(action),
					listLimit: reducerUtils.getListLimit(action),
					listStart: reducerUtils.getListStart(action),
					orderCriteria: [{'orderColumn':'SYSTEM_APPLICATION_TABLE_NAME','orderDir':'ASC'}],
    				searchCriteria: [{'searchValue':'','searchColumn':'SYSTEM_APPLICATION_TABLE_NAME'}],
    				paginationSegment: 1,
					selected: null,
					inputFields:null,
					view: "MAIN",
					pageName:"SYSTEM_APPLICATION",
					isDeleteModalOpen: false,
					errors:null, 
					warns:null, 
					successes:null,
					searchValue:""
				});
			} else {
				return state;
			}
		}
		case 'SYSTEM_APPLICATION_LIST': {
			if (action.responseJson != null && action.responseJson.params != null) {
				return Object.assign({}, state, {
					itemCount: reducerUtils.getItemCount(action),
					items: reducerUtils.getItems(action),
					listLimit: reducerUtils.getListLimit(action),
					listStart: reducerUtils.getListStart(action),
					paginationSegment: action.paginationSegment,
					selected: null,
					inputFields:null,
					view: "MAIN",
					isDeleteModalOpen: false,
					errors:null, 
					warns:null, 
					successes:null
				});
			} else {
				return state;
			}
		}
		case 'SYSTEM_APPLICATION_ITEM': {
			if (action.responseJson !=  null && action.responseJson.params != null) {
				// load inputFields
				let inputFields = {};
				let prefForms = reducerUtils.getPrefForms(action);
				for (let i = 0; i < prefForms.SYSTEM_APPLICATION_FORM.length; i++) {
					let classModel = JSON.parse(prefForms.SYSTEM_APPLICATION_FORM[i].classModel);
					if (action.responseJson.params.item != null && action.responseJson.params.item.hasOwnProperty(classModel.field)) {
						if (classModel.defaultClazz != null) {
								inputFields[prefForms.SYSTEM_APPLICATION_FORM[i].name+"-DEFAULT"] = action.responseJson.params.item[classModel.field].defaultText;
						}
						if (classModel.textClazz != null) {
							for (let j = 0; j < action.responseJson.params.item[classModel.field].langTexts.length; j++) {
								inputFields[prefForms.SYSTEM_APPLICATION_FORM[i].name+"-TEXT-"+action.responseJson.params.item[classModel.field].langTexts[j].lang] = action.responseJson.params.item[classModel.field].langTexts[j].text;
							}
						}
						if (classModel.type == "Object") {
							inputFields[prefForms.SYSTEM_APPLICATION_FORM[i].name] = "Object";
						} else {
							inputFields[prefForms.SYSTEM_APPLICATION_FORM[i].name] = action.responseJson.params.item[classModel.field];
						}
					} else {
						let result = "";
						if (prefForms.SYSTEM_APPLICATION_FORM[i].value != null && prefForms.SYSTEM_APPLICATION_FORM[i].value != ""){
							if (prefForms.SYSTEM_APPLICATION_FORM[i].value.includes("{")) {
								let formValue = JSON.parse(prefForms.SYSTEM_APPLICATION_FORM[i].value);
								if (formValue.options != null) {
									for (let j = 0; j < formValue.options.length; j++) {
										if (formValue.options[j] != null && formValue.options[j].defaultInd == true){
											result = formValue.options[j].value;
										}
									}
								} else if (formValue.referPref != null) {
									let pref = action.appPrefs.prefTexts[formValue.referPref.prefName][formValue.referPref.prefItem];
									if (pref != null && pref.value != null && pref.value != "") {
										let value = JSON.parse(pref.value);
										if (value.options != null) {
											for (let j = 0; j < value.options.length; j++) {
												if (value.options[j] != null && value.options[j].defaultInd == true){
													result = value.options[j].value;
												}
											}
										}
									}
								}
							} else {
								result = prefForms.ADMIN_LANGUAGE_FORM[i].value;
							}
						}
						inputFields[prefForms.SYSTEM_APPLICATION_FORM[i].name] = result;
					}
				}
				// add id if this is existing item
				if (action.responseJson.params.item != null) {
					inputFields.itemId = action.responseJson.params.item.id;
				}
				return Object.assign({}, state, {
					prefForms: Object.assign({}, state.prefForms, reducerUtils.getPrefForms(action)),
					selectedUser : action.responseJson.params.item,
					inputFields : inputFields,
					view: "MODIFY"
				});
			} else {
				return state;
			}
		}
		case 'SYSTEM_APPLICATION_INPUT_CHANGE': {
			return reducerUtils.updateInputChange(state,action);
		}
		case 'SYSTEM_APPLICATION_LISTLIMIT': {
			return reducerUtils.updateListLimit(state,action);
		}
		case 'SYSTEM_APPLICATION_SEARCH': { 
			return reducerUtils.updateSearch(state,action);
		}
		case 'SYSTEM_APPLICATION_SEARCH_CHANGE': { 
			return Object.assign({}, state, {
				searchValue: action.value
			});
		}
		case 'SYSTEM_APPLICATION_ORDERBY': { 
			return reducerUtils.updateOrderBy(state,action);
		}
		case 'SYSTEM_APPLICATION_SET_STATUS': {
			reducerUtils.updateStatus(state,action);
		}
		case 'SYSTEM_APPLICATION_CLOSE_DELETE_MODAL': {
			return Object.assign({}, state, {
				isDeleteModalOpen: false
			});
		}
		case 'SYSTEM_APPLICATION_OPEN_DELETE_MODAL': {
			return Object.assign({}, state, {
				isDeleteModalOpen: true,
				selected: action.item
			});
		}
		case 'SYSTEM_APPLICATION_CANCEL': {
			return Object.assign({}, state, {
				view: "MAIN",
				selected:null,
				inputFields:null
			});
		}
		default:
			return state;
	}
}

