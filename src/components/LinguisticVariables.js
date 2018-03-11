import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { observer, inject } from 'mobx-react'

import {
    Button,
    Column,
    Row,
    Set,
    Header,
    RowJustified,
    ChartButton,
    Triangle,
    TriangleLeft,
    TriangleRight,
    Trapezoid,
    TrapezoidLeft,
    TrapezoidRight,
    Input
} from 'components'

import { TRIANGLE, TRIANGLE_LEFT, TRIANGLE_RIGHT, TRAPEZOID, TRAPEZOID_LEFT, TRAPEZOID_RIGHT } from 'constants'
import { getYValue } from 'utils'

@inject('Input1', 'Input2', 'Output')
@observer
class LinguisticVariables extends Component {
    state = {
        selected: false,
        selectedIndex: null,
        name: '',
        start: '',
        end: '',
        ranges: []
    }

    handleNameChange = e => {
        console.log('handleNameChange', e.target.value)
        this.setState({
            name: e.target.value
        })
    }

    handleRangeChange = (e, index) => {
        const value = e.target.value
        this.setState(prevState => {
            return {
                ranges: [
                    ...prevState.ranges.slice(0, index),
                    Number(value),
                    ...prevState.ranges.slice(index + 1)
                ]
            }
        })
    }

    addVariable = e => {
        const { name, ranges, selectedIndex } = this.state
        const datasets = ranges.map((range, index) => ({
            x: range,
            y: getYValue(selectedIndex, index)
        }))
        console.log({ datasets, ranges, name })

        const store = this.props.store === 1
            ? this.props.Input1
            : this.props.store === 2
                ? this.props.Input2
                : this.props.Output


        store.addLinguisticVar({
            name,
            datasets,
            ranges,
            selectedIndex
        })

        this.setState({ name: '' })
    }

    setSelected(selectedIndex, show3 = false, show4 = false) {
        this.setState(s => ({
            selected: true,
            selectedIndex,
            show3,
            show4
        }))
    }

    selectTriangle = e => {
        this.setSelected(TRIANGLE, true)
    }

    selectTriangleLeft = e => {
        this.setSelected(TRIANGLE_LEFT)
    }

    selectTriangleRigth = e => {
        this.setSelected(TRIANGLE_RIGHT)
    }

    selectTrapezoid = e => {
        this.setSelected(TRAPEZOID, true, true)
    }

    selectTrapezoidLeft = e => {
        this.setSelected(TRAPEZOID_LEFT, true)
    }

    selectTrapezoidRigth = e => {
        this.setSelected(TRAPEZOID_RIGHT, true)
    }

    render() {
        const { selected, selectedIndex, show3, show4, name, ranges } = this.state
        const store = this.props.store === 1
            ? this.props.Input1
            : this.props.store === 2
                ? this.props.Input2
                : this.props.Output
        return (
            <Column>
                <Header>Variables Linguisticas</Header>
                <Set>{`{ ${store.datasets.map(data => data.label)} }`}</Set>
                <RowJustified>
                    <ChartButton
                        selected={selectedIndex === TRIANGLE_LEFT}
                        onClick={this.selectTriangleLeft}
                    >
                        <TriangleLeft />
                    </ChartButton>
                    <ChartButton
                        selected={selectedIndex === TRAPEZOID_LEFT}
                        onClick={this.selectTrapezoidLeft}
                    >
                        <TrapezoidLeft />
                    </ChartButton>
                    <ChartButton
                        selected={selectedIndex === TRIANGLE}
                        onClick={this.selectTriangle}
                    >
                        <Triangle />
                    </ChartButton>
                    <ChartButton
                        selected={selectedIndex === TRAPEZOID}
                        onClick={this.selectTrapezoid}
                    >
                        <Trapezoid />
                    </ChartButton>
                    <ChartButton
                        selected={selectedIndex === TRIANGLE_RIGHT}
                        onClick={this.selectTriangleRigth}
                    >
                        <TriangleRight />
                    </ChartButton>
                    <ChartButton
                        selected={selectedIndex === TRAPEZOID_RIGHT}
                        onClick={this.selectTrapezoidRigth}
                    >
                        <TrapezoidRight />
                    </ChartButton>
                </RowJustified>
                {selected && (
                    <Column>
                        <Input
                            label="Nombre"
                            placeholder="Poco, Mucho, Muy Frio...."
                            type="text"
                            value={name}
                            onChange={this.handleNameChange}
                        />
                        <Row>
                            <Column>
                                <Input
                                    label="#1"
                                    type="number"
                                    value={ranges[0]}
                                    onChange={e => {
                                        this.handleRangeChange(e, 0)
                                    }}
                                />
                            </Column>
                            <Column>
                                <Input
                                    label="#2"
                                    type="number"
                                    value={ranges[1]}
                                    onChange={e => {
                                        this.handleRangeChange(e, 1)
                                    }}
                                />
                            </Column>
                            {show3 && (
                                <Column>
                                    <Input
                                        label="#3"
                                        type="number"
                                        value={ranges[2]}
                                        onChange={e => {
                                            this.handleRangeChange(e, 2)
                                        }}
                                    />
                                </Column>
                            )}
                            {show4 && (
                                <Column>
                                    <Input
                                        label="#4"
                                        type="number"
                                        value={ranges[3]}
                                        onChange={e => {
                                            this.handleRangeChange(e, 3)
                                        }}
                                    />
                                </Column>
                            )}
                        </Row>
                        <Button
                            onClick={this.addVariable}
                            secondary
                            style={{ marginTop: 12 }}
                        >
                            Agregar
						</Button>
                    </Column>
                )}
            </Column>
        )
    }
}

export { LinguisticVariables }