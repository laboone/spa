/// <reference path="../typings/jquery/jquery.d.ts" />

export class SpaShell {

	private configMap = {
		anchor_shema_map : {
			chat : { open : true, closed : true }	
		},
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
	private stateMap: { $container?: JQuery, anchor_map?: any, is_chat_retracted: boolean} = {is_chat_retracted: true};
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
			
		$.uriAnchor.configModule({
			schema_map : this.configMap.anchor_shema_map
		});
		
		$(window).bind('hashchange', this, this.onHashchange)
				 .trigger('hashchange');
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
		var _this: SpaShell = event.data;
		_this.changeAnchorPart({
			chat: (_this.stateMap.is_chat_retracted ? 'open' : 'closed')
		});

		return false
	}
	
	private onHashchange(event: JQueryEventObject): boolean{
		var _this: SpaShell = event.data; 
		var anchor_map_previous = _this.copyAnchorMap();
		
		try{
			// アンカーの解析
			var anchor_map_proposed = $.uriAnchor.makeAnchorMap(); 
		}catch(error){
			$.uriAnchor.setAnchor(anchor_map_previous, null, true);
			return false;
		}
		_this.stateMap.anchor_map = anchor_map_proposed;
		
		var _s_chat_previous = anchor_map_previous._s_chat;
		var _s_chat_proposed = anchor_map_proposed._s_chat;
		
		if(!anchor_map_previous || _s_chat_previous != _s_chat_proposed){
			var s_chat_proposed = anchor_map_proposed.chat;
			switch(s_chat_proposed){
				case 'open' :
					_this.toggleChat(true);
					break;
				case 'closed':
					_this.toggleChat(false);
					break;
				default :
					_this.toggleChat(false);
					delete anchor_map_proposed.chat;	
					$.uriAnchor.setAnchor(anchor_map_proposed, null, true);
			}
		}
		return false;
	}
	
	private copyAnchorMap(){
		return $.extend(true, {}, this.stateMap.anchor_map);
	}
	
	private changeAnchorPart(arg_map:  {[key: string]: string}){
		var anchor_map_revise = this.copyAnchorMap();
		var bool_return: boolean = true;
		
		KEYVAL:
		for( var key_name in arg_map){
			if(arg_map.hasOwnProperty(key_name)){
				// 従属キーを飛ばす
				if(key_name.indexOf('_') == 0){ continue KEYVAL; }
				// 独立キーを更新
				anchor_map_revise[key_name] = arg_map[key_name];
				// 合致する独立キーを更新する
				var key_name_dep = '_' + key_name;
				if(arg_map[key_name_dep]){
					anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
				}else{
					delete anchor_map_revise[key_name_dep];
					delete anchor_map_revise['_s' + key_name_dep]
				}
			}
		}
		
		try{
			$.uriAnchor.setAnchor(anchor_map_revise);
		}
		catch(error){
			$.uriAnchor.setAnchor(this.stateMap.anchor_map, null, true);
			bool_return = false;
		}
		return bool_return;		
	}
	

}