/* eslint-disable no-restricted-globals */
/* eslint-disable no-eval */
import React, { Component } from 'react';
import CalcButton from './CalcButton';

class Calculator extends Component {
	state = {
		currentOperation: '',
		memory: ''
	};

	changeSignal = () => {
		const { currentOperation } = this.state;
		const newValue = eval(currentOperation) * -1;
		this.setState({
			currentOperation: newValue
		});
	};

	clear = option => {
		switch (option) {
			case 'CE': {
				this.setState({
					currentOperation: '',
					memory: ''
				});
				break;
			}
			case 'C': {
				this.setState({
					currentOperation: ''
				});
				break;
			}
			case 'X': {
				const { currentOperation } = this.state;
				if (currentOperation.length > 0) {
					const newP = currentOperation.substr(
						0,
						currentOperation.length - 1
					);
					this.setState({ currentOperation: newP });
				}
				break;
			}
			default:
		}
	};

	findResult = () => {
		const { currentOperation, memory } = this.state;
		const lastSimbol = memory.substr(-1);

		let stringToEval = `${memory}${currentOperation}`;

		if (isNaN(lastSimbol) && currentOperation.length === 0) {
			stringToEval = memory.substr(0, memory.length - 1);
		}

		const solution = eval(stringToEval);

		this.setState({ currentOperation: solution, memory: '' });
	};

	numberOperationHandler = (data, newOp) => {
		const { currentOperation, memory } = this.state;
		const lastSimbol = memory.substr(-1);

		if (
			currentOperation.toString() === 'NaN' ||
			currentOperation.toString() === 'Infinity' ||
			currentOperation.toString() === '-Infinity'
		) {
			this.setState({
				currentOperation: ''
			});
			return;
		}

		if (newOp) {
			if (isNaN(lastSimbol) && currentOperation.length === 0) {
				return;
			}

			this.setState({
				currentOperation: '',
				memory: `${memory} ${currentOperation} ${data}`
			});
			return;
		}

		this.setState({
			currentOperation: currentOperation + data
		});
	};

	render() {
		const { currentOperation, memory } = this.state;

		const {
			numberOperationHandler: op,
			findResult,
			changeSignal,
			clear
		} = this;

		return (
			<div className='calculator'>
				<span className='memory'>{memory.toString()}</span>
				<span className='visor'>{currentOperation.toString()}</span>
				<CalcButton name='CE' type='option' click={clear} />
				<CalcButton name='C' type='option' click={clear} />
				<CalcButton name='X' type='option' click={clear} />
				<CalcButton name='/' type='operation' click={op} />
				<CalcButton name='7' click={op} />
				<CalcButton name='8' click={op} />
				<CalcButton name='9' click={op} />
				<CalcButton name='*' type='operation' click={op} />
				<CalcButton name='4' click={op} />
				<CalcButton name='5' click={op} />
				<CalcButton name='6' click={op} />
				<CalcButton name='-' type='operation' click={op} />
				<CalcButton name='1' click={op} />
				<CalcButton name='2' click={op} />
				<CalcButton name='3' click={op} />
				<CalcButton name='+' type='operation' click={op} />
				<CalcButton name='±' type='option' click={changeSignal} />
				<CalcButton name='0' click={op} />
				<CalcButton name='.' type='option' click={op} />
				<CalcButton name='=' type='operation' click={findResult} />
			</div>
		);
	}
}

export default Calculator;
