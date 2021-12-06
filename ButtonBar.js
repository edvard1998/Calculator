class ButtonBar extends BaseBar {
	static dataSource = [
		[
			{value: '%', title: 'Percent', class: 'percent', type: OPERATIONTYPES.PERCENT},
			{value: '√x', title: 'Square Root', class: 'square_root', type: OPERATIONTYPES.SQUARE_ROOT},
			{value: 'x²', title: 'Exponent', class: 'exponent', type: OPERATIONTYPES.EXPONENT},
			{value: '1/x', title: 'Fraction', class: 'fraction', type: OPERATIONTYPES.FRACTION}
		],
		[
			{value: 'CE', title: 'Clear Entry', class: 'clear_entry', type: OPERATIONTYPES.CLEAR_ENTRY},
			{value: 'C', title: 'All Clear', class: 'all_clear', type: OPERATIONTYPES.CLEAR_ALL},
			{value: '⌫', title: 'Backsapce', class: 'backspace', type: OPERATIONTYPES.BACKSPACE},
			{value: '÷', title: 'Division', class: 'operator', type: OPERATIONTYPES.OPERATIONS}
		],
		[
			{value: '7', title: 'Seven', class: 'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '8', title: 'Eight', class: 'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '9', title: 'Nine', class: 'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '˟', title: 'Multiplication', class: 'operator', type: OPERATIONTYPES.OPERATIONS}
		],
		[
			{value: '4', title: 'Four', class: 'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '5', title: 'Five', class: 'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '6', title: 'Six', class: 'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '−', title: 'Minus', class: 'operator', type: OPERATIONTYPES.OPERATIONS}
		],
		[
			{value: '1', title: 'One', class:'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '2', title: 'Two', class: 'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '3', title: 'Three', class: 'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '+', title: 'Plus', class: 'operator', type: OPERATIONTYPES.OPERATIONS}
		],
		[
			{value: '+/−', title: 'Change Sign', class: 'change_sign', type: OPERATIONTYPES.CHANGE_SIGN},
			{value: '0', title: 'Zero', class: 'calc_number', type: OPERATIONTYPES.NUMBER},
			{value: '.', title: 'Decimal Point', class: 'decimal_point', type: OPERATIONTYPES.DECIMAL_POINT},
			{value: '=', title: 'Result', class: 'result', type: OPERATIONTYPES.RESULT}
		]
	];

	constructor(container) {
		super({
			element: 'button-bar',
			container: container,
			attrs: {
				class: 'button_bar'
			}
		});

		console.log(ButtonBar.dataSource);

		this.arr = [];
		this.opSign = [];

		for (let row of ButtonBar.dataSource) {
			this.buttonContainer = new ButtonContainer(this);

			for (let data of row) {
				this.calcButton = new CalcButton({
					container: this.buttonContainer,
					cap: data.value,
					attrs: {
						title: data.title,
						class: data.class,
						type: data.type
					}
				});

				this.arr.push(this.calcButton.element);

				if (OPERATIONTYPES.OPERATIONS === data.type) {
					this.opSign.push(data.value);

					// console.log(this.opSign);
				}

				let func;
					switch (data.type) {
						case OPERATIONTYPES.PERCENT:
							func = () => {
								this.container.percent();

								console.log(this.calcButton.element);
							}
						break;
						case OPERATIONTYPES.SQUARE_ROOT:
							func = () => {
								this.container.squareRoot();

								console.log(this.calcButton.element);
							}
						break;    
						case OPERATIONTYPES.EXPONENT:
							func = () => {
								this.container.exponent(data.value);

								console.log(this.calcButton.element);
							}
						break;
						case OPERATIONTYPES.FRACTION:
							func = () => {
								this.container.fraction();

								console.log(this.calcButton.element);
							}
						break;        
						case OPERATIONTYPES.CLEAR_ALL:
							func = () => {
								this.container.allClear();

								console.log(this.calcButton.element);
							}
						break;
						case OPERATIONTYPES.BACKSPACE:
							func = () => {
								this.container.backspace(data.value);

								console.log(this.calcButton.element);
							}
						break;       
						case OPERATIONTYPES.NUMBER:
							func = () => {
								this.container.appendNum(data.value);

								console.log(data.value);
							} 
						break;
						case OPERATIONTYPES.OPERATIONS:
							func = () => {
								this.container.operations(data.value);

								console.log(this.calcButton.element);
							}
						break;
						case OPERATIONTYPES.CLEAR_ENTRY:
							func = () => {
								this.container.clearEntry();

								console.log(this.calcButton.element);
							}
						break;
						case OPERATIONTYPES.CHANGE_SIGN:
							func = () => {
								this.container.changeSign();

								console.log(this.calcButton.element);
							}
						break;
						case OPERATIONTYPES.RESULT:
							func = () => {
								this.container.totalSum(data.value);

								console.log(this.calcButton.element);
							}
							break;
						case OPERATIONTYPES.DECIMAL_POINT:
							func = () => {
								this.container.decimal_point(data.value);

								console.log(this.calcButton.element);
							}
						break;
						}

				this.calcButton.element.addEventListener('click', func);
			}
		}
	}
}