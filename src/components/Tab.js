import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { observer, inject } from 'mobx-react'
import { primaryColor, secondaryColor } from 'constants'

@inject('Store')
@observer
class _Tab extends Component {
    onClick = () => {
        const { index, Store } = this.props
        Store.setCurrentTab(index)
    }
    render() {
        const { className, children } = this.props
        return (
            <div className={className} onClick={this.onClick}>
                {children}
            </div>
        )
    }
}

const Tab = styled(_Tab) `
	padding: 8px 16px;
	border-right: 1px solid #d6d6d6;
	transition: 0.3s ease;
	&:hover {
		cursor: pointer;
	}
	${props =>
        props.active &&
        css`
			background-color: ${primaryColor};
			color: #fff;
		`};
`

export { Tab }