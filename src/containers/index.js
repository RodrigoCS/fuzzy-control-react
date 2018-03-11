import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { observer, Provider, inject } from 'mobx-react'
import stores from 'stores'
import { Line } from 'react-chartjs-2'
import Select from 'react-select'
import 'react-select/dist/react-select.css';

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

import RunPage from './RunPage'
import InputPage from './InputPage'
import OutputPage from './OutputPage'

@inject('Store', 'Input1', 'Input2', 'Output')
@observer
class Index extends Component {
	renderTabContent() {
		const { Store, Input1, Input2, Output } = this.props
		switch (Store.currentTab) {
			case 0:
				return (
					<InputPage />
				)
			case 1:

				// return (!Input1.isReady || !Input2.isReady) && (
				// 	<Row center middle style={{ height: '90vh' }}>
				// 		<DisabledMessage>
				// 			Completa las variables de entrada primero.
				// 			</DisabledMessage>

				// 	</Row>) 
				return (<OutputPage />)
			case 2:
				return <RunPage />
			default:
				return null
		}
	}

	render() {
		const { Store } = this.props
		return (
			<Container>
				<Tabs />
				{this.renderTabContent()}
			</Container>
		)
	}
}


export default Index
