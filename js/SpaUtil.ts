export class SpaUtil{
	
	private static makeError(name_text: string, msg_text: string): Error{
		var error = new Error();
		error.name = name_text;
		error.message = msg_text;
		return error;
	}

	public static setConfigMap(arg_map){
		var input_map: Object = arg_map.input_map;
		var settable_map: Object = arg_map.settable_map;
		var config_map = arg_map.config_map;
		
		for(var key_name in input_map){
			if(input_map.hasOwnProperty(key_name)){
				if(settable_map.hasOwnProperty(key_name)){
					config_map[key_name] = input_map[key_name];
				}else{
					var error = this.makeError('Bad Input', 'Setting config key |' + key_name + '| is not supported');
					throw error;
				}
			}
		}
	}
	
}