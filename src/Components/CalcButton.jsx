import React from 'react';

const CalcButton = props => {
	const { name, type, click } = props;

	function getClassName() {
		let baseName = 'button--base ';
		switch (type) {
			case 'operation': {
				baseName += 'button-operation';
				break;
			}

			case 'option': {
				baseName += 'button-option';
				break;
			}
			default:
				baseName += 'button-number';
		}
		return baseName;
	}

	return (
		<button
			type='button'
			className={getClassName()}
			onClick={() => click(name, type === 'operation')}
		>
			{name}
		</button>
	);
};

export default CalcButton;
