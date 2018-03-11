import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, Provider, inject } from 'mobx-react'
import stores from 'stores'
import Index from './containers'

class App extends Component {
	render() {
		return (
			<Provider {...stores}>
				<Index />
			</Provider>
		)
	}
}

export default App
