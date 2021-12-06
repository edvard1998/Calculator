class Calc extends BaseCustomControl {
	constructor(container = document.body) {
		super({
			element: 'calculator',
			container: container,
			attrs: {
				class: 'calc'
			}
		});

		this.localizationBar = new LocalizationBar(this);
		this.outputBar = new OutputBar(this);
		this.buttonBar = new ButtonBar(this);

		this.clear();
	}

	clear() {
		this.currentOperand = String.EMPTY;
		this.prevOperand = String.EMPTY;
		this.tempCurrentOperand = String.EMPTY;
		this.tempPrevOperand = String.EMPTY;
		this.result = undefined;
		this.content = [];
		this.outputBar.displayBar.element.style.fontSize = '35px';
		this.elemInitClientWidth = 243; //224;		/*243 (244)*/
	}
	
	percent() {
		if (this.prevOperand.includes('+') || this.prevOperand.includes('−')) {
			let percent0 = (parseFloat(this.prevOperand) * parseFloat(this.currentOperand)) / 100;
	
			this.prevOperand += ` ${percent0}`;

			if (0 == this.currentOperand) {
				let percent1 = parseFloat(this.prevOperand) ** 2 /100;
				
				this.currentOperand = percent1;
			} else {
				this.currentOperand = percent0;
			}
		}

		if (this.prevOperand.includes('˟') || this.prevOperand.includes('÷')) {
			let percent2 = parseFloat(this.currentOperand) / 100;
	
			this.prevOperand += ` ${percent2}`;

			if (0 == this.currentOperand) {
				let percent3 = parseFloat(this.prevOperand) /100;
	
				this.currentOperand = percent3;
			} else {
				this.currentOperand = percent2;
			}
		}

		 this.updateDisplay();
	}
	
	squareRoot() {
		this.prevOperand = `√(${this.currentOperand})`;
		this.currentOperand = Math.sqrt(this.currentOperand);

		this.updateDisplay();
	}

	exponent() {
		this.prevOperand = `sqr(${this.currentOperand})`;
		this.currentOperand = this.currentOperand ** 2;

		//console.log(this.currentOperand.clientWidth);

		this.updateDisplay();
	}
	
	fraction() {
		if (0 < this.currentOperand) {
			this.currentOperand = 1 / this.currentOperand;
		} else if (0 == this.currentOperand) {
			this.currentOperand = 'Cannot divide by zero';			
		}		
		
		this.Answer();
	}
	
	clearEntry() {
		this.currentOperand = 0;

		this.updateDisplay();
		// this.currentOperand = String.EMPTY;
		
		//this.getNumSize();
	}

	allClear() {
		this.currentOperand = String.EMPTY;
		this.prevOperand = String.EMPTY;
		
		this.updateDisplay();
		this.getNumSize();
	}
	
	backspace() {
		let displayBar = this.outputBar.displayBar.element;
		let	width = this.currentOperand.length - 1;
		
		this.currentOperand = this.currentOperand.substr(0, width);

		this.updateDisplay();
		
		if (243 > displayBar.clientWidth) {
			// this.currentOperand = this.currentOperand.substr(0, width);

			// this.updateDisplay();

			displayBar.style.fontSize = `${parseFloat(displayBar.style.fontSize) * this.elemInitClientWidth / displayBar.clientWidth}px`;
			
			// displayBar.style.fontSize = `${parseFloat(displayBar.style.fontSize) * displayBar.clientWidth / this.elemInitClientWidth}px`;
			
			console.log(displayBar.clientWidth);
			console.log(displayBar.style.fontSize);
		}

		// this.currentOperand = this.currentOperand.substr(0, width);
		
		// this.updateDisplay();

		// console.log(displayBar.style.fontSize);
		// console.log(displayBar.clientWidth);
		// console.log(this.elemInitClientWidth);
	}

	operations(sign) {
		this.prevOperand = `${this.currentOperand} ${sign}`;

		// console.log(ButtonBar.dataSource[0][0]);
		// console.log(this.buttonBar.arr);
		// console.log(this.prevOperand);

		this.content.push(sign);

		this.updateDisplay();
	}

	appendNum(number) {
		let displayBar = this.outputBar.displayBar.element;

		if (16 <= this.currentOperand.length) {
			return;
		}
		
		this.currentOperand += number;
	
		console.log(displayBar.clientWidth);
		
		if (this.prevOperand.includes('+') || this.prevOperand.includes('−') || this.prevOperand.includes('˟') || this.prevOperand.includes('÷')) {			
			this.tempCurrentOperand += number;
						
			this.Reset();
		} else {
			this.updateDisplay();
		}
		
		if (243 < parseFloat(displayBar.clientWidth)) {
			this.getFontSize();
		}

		// console.log(this.outputBar.displayBar.element.offsetWidth);
		// console.log(this.outputBar.displayBar.element.clientWidth);
	}
	
	changeSign() {
		let num = this.currentOperand;

		if (0 < num) {
			this.currentOperand = -num;
		} else {
			this.currentOperand = num / -1;
		}

		this.updateDisplay();
	}

	decimal_point(sign) {
		if (-1 == this.currentOperand.indexOf(sign)) {
			this.currentOperand = sign;			
			
			this.updateDisplay();

			// this.resultSum();
		}
	}

	totalSum(sign) {
		// this.prevOperand += ` ${this.currentOperand} ${sign}`;

		this.prevOperand += ` ${this.tempCurrentOperand} ${sign}`;

		//console.log(this.tempCurrentOperand);

		this.content.forEach((slot) => {
			switch(slot) {
				case '+':
					this.currentOperand = parseFloat(this.prevOperand) + parseFloat(this.tempCurrentOperand);// ????????????
					// this.currentOperand = parseFloat(this.prevOperand) + parseFloat(this.currentOperand);
				break;
				case '−':
					this.currentOperand = parseFloat(this.prevOperand) - parseFloat(this.tempCurrentOperand);// ????????????
					// this.currentOperand = parseFloat(this.prevOperand) - parseFloat(this.currentOperand);
				break;
				case '˟':
					this.currentOperand = parseFloat(this.prevOperand) * parseFloat(this.tempCurrentOperand);// ????????????
					//this.currentOperand = parseFloat(this.prevOperand) * parseFloat(this.currentOperand);
				break;
				case '÷':
					this.currentOperand = parseFloat(this.prevOperand) / parseFloat(this.tempCurrentOperand);// ????????????
					//this.currentOperand = parseFloat(this.prevOperand) / parseFloat(this.currentOperand);
				break;
			}
		});

		this.updateDisplay();
		
		this.tempCurrentOperand = String.EMPTY;

		this.content.pop(0);

		// console.log(this.currentOperand);
		// console.log(this.temPrevOperand);
	}

	// resultSum() {
	// 	this.outputBar.displayBar.element.innerText += this.currentOperand;
	// }
	
	Reset() {
		if (16 < this.tempCurrentOperand.length) {
			return;
		}
		
		this.outputBar.displayBar.element.innerText = 0;
		this.outputBar.displayBar.element.innerText = parseFloat(this.tempCurrentOperand).toLocaleString();

		//console.log(this.outputBar.displayBar.element.innerText);
	}

	Answer() {
		this.outputBar.displayBar.element.innerText = this.currentOperand;
		this.outputBar.displayBar.element.style.zoom = '60%';
	}

	getFontSize() {
		let displayBar = this.outputBar.displayBar.element;
		displayBar.style.fontSize = `${parseFloat(displayBar.style.fontSize) * this.elemInitClientWidth / displayBar.clientWidth}px`;
		
		console.log(displayBar.clientWidth);
		console.log(displayBar.style.fontSize);
	}

	getNumSize() {
		this.outputBar.displayBar.element.innerText = 0;
		this.outputBar.displayBar.element.style.fontSize = '35px';
		this.outputBar.displayBar.element.style.zoom = '100%';
	}

	updateDisplay() {
		this.outputBar.historyBar.element.innerText = this.prevOperand;
		this.outputBar.displayBar.element.innerText = parseFloat(this.currentOperand).toLocaleString();

		//console.log(this.currentOperand);

		if (0 == this.currentOperand.length) {
			this.outputBar.displayBar.element.innerText = 0;
		}

		if (16 <= this.currentOperand.length) {			// ?????????????????????///
			return;
			
			//this.currentOperand = String.EMPTY;
		}
	}
}