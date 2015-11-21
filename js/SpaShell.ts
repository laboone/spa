/// <reference path="../typings/jquery/jquery.d.ts" />
import $ = require('jquery');

export class SpaShell {

	private configMap = {
		main_html:
		`
		<div class="spa-shell-head">
			<div class="spa-shell-head-logo"></div>
			<div class="spa-shell-head-acct"></div>
			<div class="spa-shell-head-search"></div>
		</div>
		<div class="spa-shell-main">
			<div class="spa-shell-main-nav"></div>
			<div class="spa-shell-main-content"></div>
		</div>
		<div class="spa-shell-foot"></div>
		<div class="spa-shell-chat"></div>
		<div class="spa-shell-modal"></div>
		`};
	stateMap = { $container: null };
	jqueryMap = {};
		
	/**
	 * コンストラクタ
	 */
	constructor($container :JQuery) {
		this.initModule($container)
	}

	private setJqueryMap(): void {
		var $container = this.stateMap.$container;
		this.jqueryMap = { $contaier: $container };
	}

	private initModule($container: JQuery): void {
		this.stateMap.$container = $container;
		$container.html(this.configMap.main_html);
		this.setJqueryMap();
	}

}