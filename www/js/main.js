/**
 * Created by Andrew on 12/16/13.
 */

var init_angular = function(){

    js_loader([
        '/js/controllers/site.js',
    ], function(){
        app.ng = angular.module('VPropApp', []);
    });




}
function js_loader(srces, fn){
    if(typeof srces == 'string'){
        load(srces, fn);
        return;
    }
    var src = srces.shift();
    load(src, function(){
        if(srces.length){
            window.js_loader(srces, fn);
        } else {
            fn && fn();
        }
    });
};