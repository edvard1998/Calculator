class LocalizationList extends BaseCustomControl {
	constructor(container) {
		super({
			element: 'select',
			container: container,
			attrs: {
				class: 'language_list'
			}
		});

		let dataSource = [
			[
				{value: 'English', cap: 'ENG'}
			],
			[
				{value: 'Arabic', cap: 'UAE'}
			],
			[
				{value: 'Persian', cap: 'PER'}
			]
		];

		for(let i = 0; i < dataSource.length; i++) {
			for(let j = 0; j < dataSource[i].length; j++) {
				this.localizationItems = new LocalizationItems({
				   container: this.element,
				   cap: dataSource[i][j].cap
				});

				// console.log(this);
				
				this.localizationItems.element.value = dataSource[i][j].value;

				// console.log(this.localizationItems.element);
			}
		}

		console.log(this.container);
	}
}