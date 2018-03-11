import React from 'react'
import styled, { css } from 'styled-components'
import { primaryColor, secondaryColor } from 'constants'

export const DisabledMessage = styled.div`
	background-color: #eeee;
	color: #323232;
	font-weigth: bold;
	padding: 20px;
	margin: 8px;
	display: flex;

`

export const Button = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${primaryColor};
	color: #fff;
	font-weight: bold;
	text-transform: uppercase;
	transition: 0.3s ease;
	padding: 8px;
	border-radius: 4px;
	${props =>
		props.secondary &&
		css`
			background-color: ${secondaryColor};
		`} &:hover {
		cursor: pointer;
		transform: translateY(-1px);
		box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
	}
`

export const Set = styled.div`
	background: #eee;
	color: #323232;
	font-size: 12px;
	margin: 4px;
	margin-bottom: 12px;
	padding: 8px;
	border-radius: 3px;
`

export const TriangleLeft = styled.div`
	background-color: transparent;
	width: 15px;
	height: 15px;
	border-left: 3px solid #fff;
	transform: skewX(45deg) translateX(5px);
`
export const TriangleRight = styled.div`
	background-color: transparent;
	width: 15px;
	height: 15px;
	border-right: 3px solid #fff;
	transform: skewX(-45deg) translateX(-5px);
`

export const Triangle = styled.div`
	width: 0;
	height: 0;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-bottom: 15px solid #fff;
`

export const TrapezoidLeft = styled.div`
	background-color: transparent;
	width: 15px;
	height: 15px;
	border-top: 3px solid #fff;
	border-right: 3px solid #fff;
	transform: skewX(45deg) translateX(0px);
`

export const TrapezoidRight = styled.div`
	background-color: transparent;
	width: 15px;
	height: 15px;
	border-top: 3px solid #fff;
	border-left: 3px solid #fff;
	transform: skewX(-45deg) translateX(0px);
`

export const Trapezoid = styled.div`
	border-bottom: 15px solid #fff;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	height: 0;
	width: 15px;
`

export const _Input = ({ label, className, ...props }) => (
	<div className={className}>
		<label>{label}</label>
		<input {...props} />
	</div>
)

export const Container = styled.div`
	box-sizing: border-box;
	padding: 30px;
	padding-top: 40px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	flex: 1;
`

export const Header = styled.div`
	font-size: 16px;
	color: #323232;
	padding: 20px;
	padding-bottom: 2px;
`

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	height: 100%;
	${props => props.center && css`
		align-items: center;
	`}
	${props => props.middle && css`
		justify-content: center;
	`}
`

export const RowJustified = styled(Row) `
	justify-content: space-between;
	margin-bottom: 8px;
`

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`

export const ColumnLeft = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	border-right: 1px solid #d6d6d6;
	padding: 20px;
`
export const ColumnRight = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	padding: 20px;
`

export const Input = styled(_Input) `
	input {
		padding: 12px;
		border: none;
		border-radius: 4px;
		&:focus {
			outLine: none;
		}
	}
	label {
		font-size: 12px;
		font-weight: bold;
		color: #1a1a1a;
		padding-left: 12px;
	}
	border: 1px solid #d6d6d6;
	border-radius: 4px;
	margin: 5px;
	transition: all 0.2s ease;
`

export const ChartButton = styled.div`
	border-radius: 20px;
	width: 55px;
	height: 55px;
	background-color: ${primaryColor};
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	transition: 0.3s ease;
	margin: 0 2px;
	&:hover {
		cursor: pointer;
		transform: translateY(-1px);
		box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
	}
	${props =>
		props.selected &&
		css`
			background-color: ${secondaryColor};
			box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
				0 3px 6px rgba(0, 0, 0, 0.08);
		`};
`