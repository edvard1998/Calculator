class OutputBar extends BaseBar {
	constructor(container) {
		super({
			element: 'output-bar',
			container: container,
			attrs: {
				class: 'output_bar'
			}
		});
	
		this.historyBar = new HistoryBar(this);
		this.displayBar = new DisplayBar(this);

		console.log(this.container.element);
	}
}