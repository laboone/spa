/// <reference path="../typings/jquery/jquery.d.ts" />
import util = require('./SpaUtil')

export class SpaChat {
	private configMap = {
		main_html:
		`
		<div style="padding:1em; color:#fff;">
			Say hello to chat
		</div>	
		`,
		settable_map : {}
	};
	
	private stateMap: { $container?: JQuery} = { $container : null};
	
	private jqueryMap: { $container?: JQuery} = {};
	
	
	/**
	 *
	 */
	constructor() {
				
	}
	
	public configModule(inputMap){
		util.SpaUtil.setConfigMap({
			input_map : inputMap,
			settable_map : this.configMap.settable_map,
			config_map : this.configMap
			});
	}
	
	public initModule($container: JQuery): boolean {
		$container.html(this.configMap.main_html);
		this.stateMap.$container = $container;
		this.setJqueryMap();
		return true;
	}
	
	private setJqueryMap(): void {
		var $container = this.stateMap.$container;
		this.jqueryMap.$container = $container;
	}
}
