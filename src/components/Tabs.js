import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { observer, inject } from 'mobx-react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'

import { Tab } from './Tab'

@inject('Store')
@observer
class _Tabs extends Component {
    render() {
        const { children, className, Store } = this.props
        return (
            <div className={className}>
                <Tab index={0} active={Store.currentTab === 0}>
                    <FontAwesomeIcon icon={faCogs} style={{marginRight: 5}}/>
                    Variables de Entrada
                </Tab>
                <Tab index={1} active={Store.currentTab === 1}>
                    <FontAwesomeIcon icon={faCogs} style={{marginRight: 5}}/>
                    Variable de Salida
				</Tab>
                <Tab index={2} active={Store.currentTab === 2}>
                    <FontAwesomeIcon icon={faPlay} style={{marginRight: 5}}/>
                    Ejecutar
				</Tab>
            </div>
        )
    }
}

const Tabs = styled(_Tabs) `
	display: flex;
	direction: row;
	border: 1px solid #d6d6d6;
	border-top: none;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	background: #fff;
	position: fixed;
	top: 0;
	width: 100%;
`

export { Tabs }