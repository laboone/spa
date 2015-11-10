/// <reference path="../typings/jquery/jquery.d.ts" />
import $ = require('jquery');

export class Spa {

	private configMap = {
		extended_height: 434,
		extended_title: 'Click to retract',
		retracted_height: 16,
		retracted_title: 'Click to extend',
		template_html: '<div class="spa-slider"></div>'
	}
	private chatSlider: JQuery;
	/**
	 * コンストラクタ
	 */
	constructor(area : JQuery) {
		this.initModule(area);
	}
	
	/**
	 * 初期処理
	 */
	private initModule(container: JQuery) {
		// HTMLをレンダリング
		container.html(this.configMap.template_html);
		this.chatSlider = container.find('.spa-slider');
		this.chatSlider.attr('title', this.configMap.retracted_title)
					   .click(this, this.onClickSlider);
		return true;					   
	}
	
	/**
	 * スライダーの高さ切り替え
	 */
	private toggleSlider() {
		var slider_height = this.chatSlider.height();
		
		// 格納されている場合はスライダーを拡大
		if (slider_height == this.configMap.retracted_height) {
			this.chatSlider
				.animate({ height: this.configMap.extended_height })
				.attr('title', this.configMap.extended_title);
			return true;
		}
		// 拡大されている場合は格納する
		else if (slider_height == this.configMap.extended_height) {
			this.chatSlider
				.animate( {height : this.configMap.retracted_height})
				.attr('title', this.configMap.retracted_title);
			return true;				
		}
		// スライダーが移行中の場合は何もしない
		return false;
	}
	
	/**
	 * クリック時の振る舞い
	 */
	private onClickSlider(event :JQueryEventObject){
		event.data.toggleSlider();
		return false;
	}
}