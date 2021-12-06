class LocalizationBar extends BaseBar {
	constructor(container) {
		super({
			element: 'localization-bar',
			container: container,
			attrs: {
				class: 'drop_down_list'
			}
		});

		this.localizationList = new LocalizationList(this.element);
	}
}