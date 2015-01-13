/**
 * Created by Raiam 
 */
services.service('Payment', ['$window', '$http', '$q', function ($window, $http, $q) {
    
    this.sendWeight = function(h){
        var defer = $q.defer();

        $.ajax({
            url: "http://www.gn-digital.info/services/tarifario_courier/api/?method=t_paqueteporpeso&params[peso]="+h+"&params[is_gam]=0",
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            jsonpCallback:'tarifario_callback',
            success: function(response) { defer.resolve(response);},
            error: function(error){defer.resolve(error);}
        });

        return defer.promise;
    };

    this.makePay = function(order_id, name, last, emisor, tarjeta, month, year, price, envio){
         var defer = $q.defer();
         console.log("http://www.gn-digital.com/pago_por_api/?sel=save&order_id=3619&ccname="+name+"%20"+last+"&ccnumber=12345&ccissuer="+emisor+"&ccmonth="+month+"&ccyear="+year+"&products[0][id]=2&products[0][name]=CobroFotos&products[0][price]="+price+"&products[0][qty]=1&products[1][id]=3&products[1][name]=Envio&products[1][price]="+envio+"&products[1][qty]=1&callback=jason");
        
        $.ajax({
            url: "http://www.gn-digital.com/pago_por_api/?sel=save&order_id=3619&ccname="+name+"%20"+last+"&ccnumber="+tarjeta+"&ccissuer="+emisor+"&ccmonth="+month+"&ccyear="+year+"&products[0][id]=2&products[0][name]=CobroFotos&products[0][price]="+price+"&products[0][qty]=1&products[1][id]=3&products[1][name]=Envio&products[1][price]="+envio+"&products[1][qty]=1&callback=jason",
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            jsonpCallback:'gnpaymentcallback',
            success: function(response) { defer.resolve(response);},
            error: function(error){defer.resolve(error);}
        });

        return defer.promise;
    };


}]);