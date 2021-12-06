class BaseCustomControl {
	constructor({element, container, cap, attrs}) {
		this.element = document.createElement(element);

		cap && (this.element.innerText = cap);
		
		this.container = container;

		if (this.container instanceof HTMLElement) {
			this.container.append(this.element);
		} else {
			this.container && this.container.element.append(this.element);
		}

		// console.log(this.container);
		// console.log(this.container.element);

		if (attrs) {
			for(let attr in attrs) {
				attrs[attr] && this.element.setAttribute(attr, attrs[attr]);
			}
		}
	}
}