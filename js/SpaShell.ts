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
		`,
		chat_extend_time: 1000,
		chat_retract_time: 300,
		chat_extedn_height: 450,
		chat_retract_height: 15
	};
	private stateMap: { $container?: JQuery } = {};
	private jqueryMap: { $container?: JQuery, $chat?: JQuery } = {};
		
	/**
	 * コンストラクタ
	 */
	constructor($container: JQuery) {
		this.initModule($container)
	}

	private setJqueryMap(): void {
		var $container = this.stateMap.$container;
		this.jqueryMap.$container = $container;
		this.jqueryMap.$chat = $container.find('.spa-shell-chat');
	}

	private initModule($container: JQuery): void {
		this.stateMap.$container = $container;
		$container.html(this.configMap.main_html);
		this.setJqueryMap();
	}

	public toggleChat(do_extend: boolean, callback?: Function): boolean {
		var px_chat_ht = this.jqueryMap.$chat.height();
		var is_open = px_chat_ht == this.configMap.chat_extedn_height;
		var is_closed = px_chat_ht == this.configMap.chat_retract_height;
		var is_sliding = !is_open && !is_closed;
		
		if (is_sliding) return false;

		if (do_extend) {
			this.jqueryMap.$chat.animate(
				{ height: this.configMap.chat_extedn_height },
				this.configMap.chat_extend_time,
				() => { if (callback) { callback(this.jqueryMap.$chat); } }
			);
			return true;
		}
		this.jqueryMap.$chat.animate(
			{ height: this.configMap.chat_retract_height },
			this.configMap.chat_retract_time,
			() => { if (callback) { callback(this.jqueryMap.$chat); } }
		);
		return true;
	}

}