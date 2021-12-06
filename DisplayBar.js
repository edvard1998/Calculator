class DisplayBar extends BaseBar {
	constructor(container) {
		super({
			element: 'display-bar',
			container: container,
			cap: '0',
			attrs: {
				class: 'display_bar'
			}
		});
		
		console.log(this.container);
	}
}