import { observable, action, computed, autorun, toJS, toJSlegacy } from 'mobx'
import _ from 'lodash'
import { persist } from 'mobx-persist'

import { MIN, MAX } from 'constants'

import { primaryColor, secondaryColor } from 'constants'
import { init2DArray } from 'utils'
import { YStateMachine } from '../constants';
import Input1 from './Input1'
import Input2 from './Input2'
import Store from './Store'

class Output {
    @observable crisp = 0

    @observable minMax = null

    @observable chosen = null

    @persist
    @observable name = ''

    @persist
    @observable min = ''

    @persist
    @observable max = ''

    @persist('list')
    @observable datasets = []

    @persist('list')
    @observable added_labels = []

    @persist('list')
    @observable matrix = init2DArray(20, 20, 0)

    @persist('list')
    @observable outputStateMachine = {}

    @observable resultGeometry = null

    @observable calculatingOutput = false

    _ = autorun(() => {
        if (Input1.chosen && Input2.chosen) {
            this.getChosenOutput()
        }
    })

    @action
    getChosenOutput = () => {
        if (!!Input1.chosen && !!Input2.chosen) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!', Input1.chosen, Input2.chosen)
            let chosenDataset = this.outputStateMachine[Input1.chosen.name][Input2.chosen.name]

            let max = Input1.chosen.geometry.Y > Input2.chosen.geometry.Y
                ? Input1.chosen.geometry.Y
                : Input2.chosen.geometry.Y

            let min = Input1.chosen.geometry.Y < Input2.chosen.geometry.Y
                ? Input1.chosen.geometry.Y
                : Input2.chosen.geometry.Y

            this.crisp = Input1.minMax == MAX ? max : min

            this.chosen = toJS(this.datasets).filter(ds => ds.label == chosenDataset)[0]

            let geometry = []
            this.chosen.data.reduce((p1, p2, _key) => {
                if (p1 && p1.y >= this.crisp && p2 && p2.y <= this.crisp
                    || p1 && p1.y <= this.crisp && p2 && p2.y >= this.crisp) {
                    let m = (p2.y - p1.y) / (p2.x - p1.x)
                    let b = (p1.y) - (m * p1.x)
                    let Y = this.crisp
                    let X = (Y - b) / (m)
                    geometry.push({
                        p1: toJS(p1),
                        p2: toJS(p2),
                        m,
                        b,
                        Y,
                        X
                    })
                }
                return p2
            })

            this.resultGeometry = geometry.reduce((l1, l2) => {
                if (Input1.minMax == MAX) {
                    return l1 && l1.p1.x > l2.p2.x ? l1 : l2
                } else {
                    return l1 && l1.p1.x < l2.p2.x ? l1 : l2
                }
            })
            this.calculatingOutput = false

        }
    }

    constructor() {
        console.log('MATRIX_____', toJS(this.matrix), this.matrix[0][0])
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
        if ((!this.crisp || this.crisp == 0)) {
            return ({
                labels: toJS(this.labelsWithCrisp),
                datasets: toJS(this.datasets).map(d => ({
                    ...d,
                    borderColor: primaryColor,
                    backgroundColor: primaryColor,
                    pointBackgroundColor: primaryColor,
                    pointBorderColor: primaryColor,
                    borderWidth: 2,
                    showLine: true,
                    fill: false
                }))
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
                showLine: true,
                fill: false
            })),
            {
                label: `Crisp ${this.name} Y`,
                data: [
                    {
                        x: Number(0),
                        y: Number(this.resultGeometry.Y)
                    },
                    {
                        x: Number(this.resultGeometry.X),
                        y: Number(this.resultGeometry.Y)
                    }
                ],
                borderColor: '#fe667e',
                backgroundColor: '#fe667e',
                pointBackgroundColor: '#fe667e',
                pointBorderColor: '#fe667e',
                borderWidth: 2,
                showLine: true,
                fill: false
            },
            {
                label: `Crisp ${this.name} X`,
                data: [
                    {
                        y: Number(this.resultGeometry.Y),
                        x: Number(this.resultGeometry.X)
                    },
                    {
                        y: Number(0),
                        x: Number(this.resultGeometry.X)
                    },
                ],
                borderColor: '#fe667e',
                backgroundColor: '#fe667e',
                pointBackgroundColor: '#fe667e',
                pointBorderColor: '#fe667e',
                borderWidth: 2,
                showLine: true,
                fill: false

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
        console.log('addLinguisticVar', data)
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
    runMax = () => {
        if (this.datasetDOM.length <= 0) return
        Store.mimMax = MAX
        let chosen = this.datasetDOM.reduce((prev, next) => (prev.geometry.Y > next.geometry.Y) ? prev : next)
        this.run(chosen)
    }

    @action
    runMin = () => {
        if (this.datasetDOM.length <= 0) return
        Store.minMax = MIN
        let chosen = this.datasetDOM.reduce((prev, next) => (prev.geometry.Y < next.geometry.Y) ? prev : next, {
            geometry: {
                Y: 10000
            }
        })
        this.run(chosen)
    }

    @action
    calculate = () => {
        this.calculatingOutput = true
    }
}

export default new Output()
