/// <reference path="../typings/jquery/jquery.d.ts" />

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
		chat_extend_time: 100,
		chat_retract_time: 100,
		chat_extedn_height: 450,
		chat_retract_height: 15,
		chat_extended_title: 'Click to retract',
		chat_retracted_title: 'Click to exted'
	};
	private stateMap: { $container?: JQuery, is_chat_retracted: boolean} = {is_chat_retracted: true};
	private jqueryMap: { $container?: JQuery, $chat?: JQuery } = {};
		
	/**
	 * コンストラクタ
	 */
	constructor($container: JQuery) {
		this.initModule($container)
	}

	private initModule($container: JQuery): void {
		this.stateMap.$container = $container;
		$container.html(this.configMap.main_html);
		this.setJqueryMap();
		this.stateMap.is_chat_retracted = true;
		this.jqueryMap.$chat
			.attr('title', this.configMap.chat_retracted_title)
			.click(this, this.onClickChat);
	}
	
	private setJqueryMap(): void {
		var $container = this.stateMap.$container;
		this.jqueryMap.$container = $container;
		this.jqueryMap.$chat = $container.find('.spa-shell-chat');
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
				() => {
					this.jqueryMap.$chat.attr('title', this.configMap.chat_extended_title);
					this.stateMap.is_chat_retracted = false;
					if (callback) {
						callback(this.jqueryMap.$chat);
					} }
			);
			return true;
		}
		this.jqueryMap.$chat.animate(
			{ height: this.configMap.chat_retract_height },
			this.configMap.chat_retract_time,
			() => {
				this.jqueryMap.$chat.attr('title', this.configMap.chat_retracted_title);
					this.stateMap.is_chat_retracted = true;
				if (callback) {
					callback(this.jqueryMap.$chat); 
				} 
			}
		);
		return true;
	}
	
	private onClickChat(event: JQueryEventObject) :boolean{
		var _this = event.data;
		if(_this.toggleChat(_this.stateMap.is_chat_retracted)){
			console.log("---" + $.uriAnchor);
			$.uriAnchor.setAnchor({chat: _this.stateMap.is_chat_retracted ? 'open' : 'close'})
		}
		return false
	}
}