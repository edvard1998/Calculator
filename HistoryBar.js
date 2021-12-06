class HistoryBar extends BaseBar {
	constructor(container) {
		super({
			element: 'history-bar',
			container: container,
			attrs: {
				class: 'history_bar'
			}
		});

		// console.log(this.element);
		// console.log(this);
		// console.log(this.container);
		// console.log(this.container.element);

		console.log(this.container.container);
	}
}