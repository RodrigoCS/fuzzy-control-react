import { observable, action, computed } from 'mobx'
import _ from 'lodash'

import { MIN, MAX } from 'constants'


class Store {
	@observable currentTab = 0

	@observable minMax = null

	@action
	setCurrentTab = index => {
		this.currentTab = index
	}

	@action
	setMinMax = (val) => {
		this.minMax = val
	}
}

export default new Store()
