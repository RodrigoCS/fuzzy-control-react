import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { observer, Provider, inject } from 'mobx-react'
import stores from 'stores'
import { Line } from 'react-chartjs-2'

import {
    Row,
    Column,
    ColumnLeft,
    ColumnRight,
    Input,
    Container,
    Tabs,
    LinguisticVariables,
    OutputMatrix
} from 'components'


@inject('Store', 'Input1', 'Input2', 'Output')
@observer
export default class InputPage extends Component {
    handleNameChange = (e, store) => {
        store.setName(e.target.value)
    }

    handleMinChange = (e, store) => {
        store.setMin(e.target.value)
    }

    handleMaxChange = (e, store) => {
        store.setMax(e.target.value)
    }

    render() {
        const { Store, Input1, Input2, Output } = this.props
        return (<Row>
            <ColumnLeft>
                <Input
                    label="Nombre"
                    value={Input1.name}
                    placeholder={Input1.name}
                    type="text"
                    onChange={(e) => { this.handleNameChange(e, Input1) }}
                />
                <Row>
                    <Column>
                        <Input
                            label="Min"
                            placeholder={Input1.min}
                            value={Input1.min}
                            type="number"
                            onChange={(e) => { this.handleMinChange(e, Input1) }}
                        />
                    </Column>
                    <Column>
                        <Input
                            label="Max"
                            placeholder={Input1.max}
                            value={Input1.max}
                            type="number"
                            onChange={(e) => { this.handleMaxChange(e, Input1) }}
                        />
                    </Column>
                </Row>
                <Line data={Input1.data} options={{
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
                {Input1.name &&
                    Input1.min &&
                    Input1.max && <LinguisticVariables store={1} />}
            </ColumnLeft>
            <ColumnRight>
                <Input
                    label="Nombre"
                    value={Input2.name}
                    placeholder={Input2.name}
                    type="text"
                    onChange={(e) => { this.handleNameChange(e, Input2) }}
                />
                <Row>
                    <Column>
                        <Input
                            label="Min"
                            placeholder={Input2.min}
                            value={Input2.min}
                            type="number"
                            onChange={(e) => { this.handleMinChange(e, Input2) }}
                        />
                    </Column>
                    <Column>
                        <Input
                            label="Max"
                            placeholder={Input2.max}
                            value={Input2.max}
                            type="number"
                            onChange={(e) => { this.handleMaxChange(e, Input2) }}
                        />
                    </Column>
                </Row>
                <Line data={Input2.data} options={{
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
                {Input2.name &&
                    Input2.min &&
                    Input2.max && <LinguisticVariables store={2} />}
            </ColumnRight>
        </Row>)
    }
}