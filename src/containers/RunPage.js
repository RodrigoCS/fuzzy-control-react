import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { observer, Provider, inject } from 'mobx-react'
import stores from 'stores'
import { Line, Scatter } from 'react-chartjs-2'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'


import {
    Row,
    Column,
    ColumnLeft,
    ColumnRight,
    Input,
    Container,
    Tabs,
    LinguisticVariables,
    OutputMatrix,
    Button
} from 'components'
import { MIN, MAX } from 'constants'

@inject('Store', 'Input1', 'Input2', 'Output')
@observer
export default class RunPage extends Component {
    state = {

    }

    onChange = (e, store) => {
        const value = e.target.value
        store.setCrisp(value)
        this.props.Input1.stopRunning()
        this.props.Input2.stopRunning()
    }

    runMin = (e) => {
        this.props.Input1.runMin()
        this.props.Input2.runMin()
    }

    runMax = (e) => {
        this.props.Input1.runMax()
        this.props.Input2.runMax()
    }

    render() {
        const { Store, Input1, Input2, Output } = this.props

        return (<Row>
            <ColumnLeft>
                <Input
                    label={Input1.name}
                    value={Input1.crisp}
                    placeholder={`Valor real de ${Input1.name}`}
                    type="text"
                    onChange={(e) => this.onChange(e, Input1)}
                />
                <Input
                    label={Input2.name}
                    value={Input2.crisp}
                    placeholder={`Valor real de ${Input2.name}`}
                    type="text"
                    onChange={(e) => this.onChange(e, Input2)}
                />
                <Row style={{ padding: 5 }}>
                    <Button onClick={this.runMin} secondary style={{ marginRight: 5 }}>
                        [ MIN ] <FontAwesomeIcon icon={faPlay} style={{ marginLeft: 5 }} />
                    </Button>
                    <Button onClick={this.runMax}>
                        [ MAX ] <FontAwesomeIcon icon={faPlay} style={{ marginLeft: 5 }} />
                    </Button>
                </Row>

                <Scatter data={Input1.dataWithCrisp} options={{
                    elements: {
                        line: {
                            tension: 0,
                            borderColor: '#4cccff',
                            borderWidth: 2,
                            showLine: true, // show line in scatter plot
                            fill: false // only show line
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }],
                        yAxes: [{
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }]
                    },
                }}
                />
                <Scatter data={Input2.dataWithCrisp} options={{
                    elements: {
                        line: {
                            tension: 0,
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }]
                    }
                }}
                />

            </ColumnLeft>
            <ColumnRight>
                <Scatter data={Output.dataWithCrisp} options={{
                    elements: {
                        line: {
                            tension: 0,
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }]
                    }
                }}
                />
                <DataShow>
                    <div>
                        <h1>Entrada 1 {Input1 && Input1.name}</h1>
                        {Input1.chosen && Input1.chosen.name} : {Input1.crisp}
                    </div>
                    <div>
                        <h1>Entrada 2 {Input1 && Input2.name}</h1>
                        {Input2.chosen && Input2.chosen.name} : {Input2.crisp}
                    </div>
                    <div>
                        <h1>Salida {Output && Output.name}</h1>
                        {Output.chosen && Output.chosen.label} : {Output.crisp}
                    </div>
                    <div>
                        {Input1.chosen && Output.resultGeometry && Output.resultGeometry.X}
                    </div>
                </DataShow>
            </ColumnRight>
        </Row>)
    }
}

const DataShow = styled.div`
    color: #323232;
    h1 {
        font-size: 14px;
    }
`