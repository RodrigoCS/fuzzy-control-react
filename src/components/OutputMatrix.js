import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { observer, inject } from 'mobx-react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { Row } from 'components'

@inject('Input1', 'Input2', 'Output')
@observer
class OutputMatrix extends Component {
    state = {
        outputMatrix: this.props.Output.matrix
    }

    componentWillMount() {

    }

    handleChange = (x, y, selectedOption) => {
        console.log('handleChange', x, y, selectedOption)

        this.state.outputMatrix[x][y] = selectedOption;

        this.setState(prevState => ({
            outputMatrix: [
                ...prevState.outputMatrix.slice(0, x),
                [
                    ...prevState.outputMatrix[x].slice(0, y),
                    selectedOption.value,
                    ...prevState.outputMatrix[x].slice(y + 1),
                ],
                ...prevState.outputMatrix.slice(x + 1)
            ]
        }), () => {
            this.props.Output.setMatrix(this.state.outputMatrix)
        })
    }

    render() {
        const { Input1, Input2, Output } = this.props
        const { outputMatrix } = this.state
        console.log('OUTPUT_MATRIX', outputMatrix[0])
        return (
            <div>
                <MatrixHeaderX>
                    <MatrixHeaderY_ />
                    {Input1.datasets.map((d1, k) => <MatrixCol key={k}>{d1.label}</MatrixCol>)}
                </MatrixHeaderX>
                <Row>
                    <MatrixHeaderY>
                        {Input2.datasets.map((d2, k) => <MatrixCol key={k}>{d2.label}</MatrixCol>)}
                    </MatrixHeaderY>
                    <MatrixContainer>
                        {Input2.datasets.map((d2, y) => {
                            return <MatrixRow key={y} >
                                {
                                    Input1.datasets.map((d1, x) => {
                                        Output.addToStateMachine(d1.label, d2.label, x, y)
                                        return <MatrixCol key={x}>
                                            <MatrixSelect
                                                value={outputMatrix[x][y]}
                                                clearable={false}
                                                searchable={false}
                                                onChange={(selectedOption) => { this.handleChange(x, y, selectedOption) }}
                                                options={Output.datasets.map(dO => ({ value: dO.label, label: dO.label }))}
                                            /></MatrixCol>
                                    })
                                }
                            </MatrixRow>
                        })}
                    </MatrixContainer>
                </Row>

            </div>

        )
    }
}


const MatrixSelect = styled(Select) ``

const MatrixHeaderX = styled.div`
	display: flex;
	flex-direction: row;
	border: 1px solid #eee;
	// flex: 1;
	align-items: center;
`
const MatrixHeaderY = styled.div`
	display: flex;
	width: 100px;
	flex-direction: column;
	border: 1px solid #eee;
	// flex: 1;
	align-items: center;
`

const MatrixHeaderY_ = styled.div`
	display: flex;
	width: 100px;
	flex-direction: column;
	align-items: center;
`

const MatrixContainer = styled.div`
	width: 100%;
    // border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    flex: 1;
`

const MatrixRow = styled.div`
	display: flex;
	flex-direction: row;
	// border: 1px solid #eee;
	flex: 1;
	align-items: center;
`
const MatrixCol = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #eee;
	flex: 1;
	justify-content: center;
	min-height: 60px;
	width: 100%;
	height: 100%;
	align-items: center;
	box-sizing: border-box;
	text-align: center;
`
const MatrixInput = styled.input`
	width: 100%;
	height: 100%;
	border: none;
	&:focus {
		outLine: none;
	}
`

export { OutputMatrix }
