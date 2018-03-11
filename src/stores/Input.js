import { observable, action, computed, autorun, toJS, toJSlegacy } from 'mobx'
import _ from 'lodash'
import { persist } from 'mobx-persist'
import { MIN, MAX } from 'constants'

import { primaryColor, secondaryColor } from 'constants'
import { init2DArray } from 'utils'
import { YStateMachine } from '../constants';
import Store from './Store'
// import Output from './Output'

class Input {
	@observable crisp = 0

	@observable minMax = null

	@observable chosen = null

	//@persist
	@observable name = ''

	//@persist
	@observable min = ''

	//@persist
	@observable max = ''

	//@persist('list')
	@observable datasets = []

	//@persist('list')
	@observable added_labels = []

	//@persist('list')
	@observable matrix = init2DArray(20, 20, 0)

	//@persist('list')
	@observable outputStateMachine = {}


	constructor() {
		// let array = []
		// for (let i = 0; i < 10; i++) {
		// 	array.push([])
		// 	for (let j = 0; j < 10; j++) {
		// 		array[i].push([])
		// 	}
		// }
		// this.matrix = array
	}

	@observable running = false

	@computed
	get labels() {
		let array = []
		this.min && array.push(Number(this.min))
		this.max && array.push(Number(this.max))
		if (this.added_labels && array) array = [...array, ...this.added_labels]
		return _.sortedUniq(_.sortBy(array))
	}

	@computed
	get labelsWithCrisp() {
		let array = []
		this.min && array.push(Number(this.min))
		this.max && array.push(Number(this.max))
		if (this.added_labels && array) array = [...array, ...this.added_labels]
		this.running && this.crisp && array.push(Number(this.crisp))
		return _.sortedUniq(_.sortBy(array))
	}

	// @computed
	// get


	@computed
	get data() {
		return ({
			labels: toJS(this.labels),
			datasets: toJS(this.datasets)
		})
	}


	@computed
	get outputDOM() {
	}

	@computed
	get datasetDOM() {
		return toJS(this.datasets).map((ds, key) => {
			let geometry = null
			ds.data.reduce((p1, p2, _key) => {
				if (p1 && p1.x <= this.crisp && p2 && p2.x >= this.crisp) {
					console.log('DATASET_DOM', p1, p2)
					let m = (p2.y - p1.y) / (p2.x - p1.x)
					let b = (p1.y) - (m * p1.x)
					let Y = (m * this.crisp) + b
					geometry = {
						p1: toJS(p1),
						p2: toJS(p2),
						m,
						b,
						Y
					}
				}
				return p2
			})
			if (!!geometry) return { name: ds.label, geometry }
		}).filter(o => !!o)
	}

	@action
	getLinguisticOutput = (nameX, nameY) => {

		// return this.outputStateMachine[x, y]
	}


	@action
	addToStateMachine = (nameX, nameY, x, y) => {
		this.outputStateMachine[nameX] = {
			...this.outputStateMachine[nameX],
			[nameY]: this.matrix[x][y]
		}
	}

	@computed
	get dataWithCrisp() {
		if ((!this.crisp || this.crisp == 0) || !this.running) {
			return ({
				labels: toJS(this.labelsWithCrisp),
				datasets: toJS(this.datasets).map(d => ({
					...d,
					borderColor: primaryColor,
					backgroundColor: primaryColor,
					pointBackgroundColor: primaryColor,
					pointBorderColor: primaryColor,
					borderWidth: 2,
					showLine: true, // show line in scatter plot
					fill: false // only show line
				}))
			})
		}
		if (!this.chosen) {
			return ({
				labels: toJS(this.labelsWithCrisp),
				datasets: [...toJS(this.datasets).map(d => ({
					...d,
					borderColor: primaryColor,
					backgroundColor: primaryColor,
					pointBackgroundColor: primaryColor,
					pointBorderColor: primaryColor,
					borderWidth: 2,
					showLine: true,
					fill: false
				})),
				{
					label: `Crisp ${this.name}`,
					data: [
						{
							x: Number(this.crisp),
							y: 0
						},
						{
							x: Number(this.crisp),
							y: 100
						}
					],
					backgroundColor: "red"
				},
				]
			})
		}

		return ({
			labels: toJS(this.labelsWithCrisp),
			datasets: [...toJS(this.datasets).map(d => ({
				...d,
				borderColor: primaryColor,
				backgroundColor: primaryColor,
				pointBackgroundColor: primaryColor,
				pointBorderColor: primaryColor,
				borderWidth: 2,
				showLine: true, // show line in scatter plot
				fill: false // only show line
			})),
			{
				label: `Crisp ${this.name}`,
				data: [
					{
						x: Number(this.crisp),
						y: 0
					},
					{
						x: Number(this.crisp),
						y: 100
					}
				],
				borderColor: '#fe667e',
				backgroundColor: '#fe667e',
				pointBackgroundColor: '#fe667e',
				pointBorderColor: '#fe667e',
				borderWidth: 2,
				showLine: true, // show line in scatter plot
				fill: false // only show line
			},
			{
				label: `Crisp ${this.chosen.name}`,
				data: [

					{
						y: Number(this.chosen.geometry.Y),
						x: 0
					},
					{
						y: Number(this.chosen.geometry.Y),
						x: Number(this.crisp)
					},
				],
				borderColor: '#fe667e',
				backgroundColor: '#fe667e',
				pointBackgroundColor: '#fe667e',
				pointBorderColor: '#fe667e',
				borderWidth: 2,
				showLine: true, // show line in scatter plot
				fill: false // only show line

			}
			]
		})

	}


	@computed
	get isReady() {
		return !!this.name && !!this.min && !!this.max && this.datasets.length > 0
	}

	@action
	addLinguisticVar = ({ ...data }) => {
		this.added_labels = [...toJS(this.added_labels), ...toJS(data.ranges)]
		this.datasets = [...this.datasets, { label: data.name, data: toJS(data.datasets), _type: data.selectedIndex }]
	}

	@action
	setName = value => {
		this.name = value
	}
	@action
	setMin = value => {
		this.min = value
	}
	@action
	setMax = value => {
		this.max = value
	}

	@action
	setMatrix(matrix) {
		this.matrix = [
			...matrix
		]
	}

	@action
	setCrisp(value) {
		this.crisp = value
	}

	@action
	stopRunning() {
		this.running = false
	}

	@action
	runMax = () => {
		this.clearRun()
		if (this.datasetDOM.length <= 0) return
		this.minMax = MAX
		let chosen = this.datasetDOM.reduce((prev, next) => (prev.geometry.Y > next.geometry.Y) ? prev : next)
		this.run(chosen)
	}

	@action
	runMin = () => {
		this.clearRun()
		if (this.datasetDOM.length <= 0) return
		this.minMax = MIN
		let chosen = this.datasetDOM.reduce((prev, next) => ((prev.geometry.Y < next.geometry.Y) && prev.geometry.Y != 0) ? prev : next, {
			geometry: {
				Y: 10000
			}
		})
		this.run(chosen)
	}

	@action
	run = (chosen) => {
		this.running = true
		this.chosen = chosen
	}

	@action
	clearRun = () => {
		this.chosen = null
		this.running = false
	}
}

export default Input
