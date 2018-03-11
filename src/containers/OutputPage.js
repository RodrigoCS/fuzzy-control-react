
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
export default class OutputPage extends Component {
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
                    value={Output.name}
                    placeholder={Output.name}
                    type="text"
                    onChange={(e) => { this.handleNameChange(e, Output) }}
                />
                <Row>
                    <Column>
                        <Input
                            label="Min"
                            placeholder={Output.min}
                            value={Output.min}
                            type="number"
                            onChange={(e) => { this.handleMinChange(e, Output) }}
                        />
                    </Column>
                    <Column>
                        <Input
                            label="Max"
                            placeholder={Output.max}
                            value={Output.max}
                            type="number"
                            onChange={(e) => { this.handleMaxChange(e, Output) }}
                        />
                    </Column>
                </Row>
                <Line data={Output.data} options={{
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
                {Output.name &&
                    Output.min &&
                    Output.max && <LinguisticVariables store={3} />}
            </ColumnLeft>
            <ColumnRight>
                <OutputMatrix />
            </ColumnRight>
        </Row>)
    }
}