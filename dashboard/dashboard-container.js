/*
* Author Edward Seufert
*/
'use-strict';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as actions from './dashboard-actions';
import fuLogger from '../../core/common/fu-logger';
import DashboardView from '../../systemView/dashboard/dashboard-view';

function DashboardContainer() {
	const itemState = useSelector((state) => state.systemdashboard);
	const session = useSelector((state) => state.session);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(actions.init({lang:session.selected.lang}));
	}, []);
	
	const onListLimitChange = (fieldName,event) => {
		BaseContainer.onListLimitChange({state:itemState,actions:actions,dispatch:dispatch,appPrefs:appPrefs,fieldName,event});
	}
	const onPaginationClick = (value) => {
		BaseContainer.onPaginationClick({state:itemState,actions:actions,dispatch:dispatch,value});
	}
	const onSearchChange = (field,event) => {
		BaseContainer.onSearchChange({state:itemState,actions:actions,dispatch:dispatch,appPrefs:appPrefs,field,event});
	}
	const onSearchClick = (field,event) => {
		BaseContainer.onSearchClick({state:itemState,actions:actions,dispatch:dispatch,field,event});
	}
	const inputChange = (type,field,value,event) => {
		BaseContainer.inputChange({state:itemState,actions:actions,dispatch:dispatch,appPrefs:appPrefs,type,field,value,event});
	}
	const onOrderBy = (field,event) => {
		BaseContainer.onOrderBy({state:itemState,actions:actions,dispatch:dispatch,appPrefs:appPrefs,field,event});
	}
	const onSave = () => {
		BaseContainer.onSave({state:itemState,actions:actions,dispatch:dispatch,appPrefs:appPrefs,form:"PM_PRODUCT_FORM"});
	}
	const closeModal = () => {
		BaseContainer.closeModal({actions:actions,dispatch:dispatch});
	}
	const onCancel = () => {
		BaseContainer.onCancel({state:itemState,actions:actions,dispatch:dispatch});
	}
	const onBlur = (field) => {
		BaseContainer.onCancel({state:itemState,actions:actions,dispatch:dispatch,field});
	}
	
	const onOption = (code,item) => {
		fuLogger.log({level:'TRACE',loc:'ServiceContainer::onOption',msg:" code "+code});
		if (BaseContainer.onOptionBase({state:itemState,actions:actions,dispatch:dispatch,code:code,appPrefs:appPrefs,item:item})) {
			return;
		}
	}


	fuLogger.log({level:'TRACE',loc:'DashboardContainer::render',msg:"Hi there"});
      return (
				<DashboardView/>
			);
}

export default DashboardContainer;
