var Helper = function (){

    var basePath =  window.location.protocol + "//" + window.location.host +"/desarrollo/custodias_svn_funciona/public/";

    this.basePath = basePath;


    this.resetForm =  function (formulario) {
        $(formulario).each(function(){
            this.reset();
        });
        
    }

     var ajax = function(token,method,url,data,callback){
        $.ajax({
            type:method,
            url:url,
            data:data,
            success:function(response){
               callback(response);
            }
        });

    }

    this.ajax  = function (token,method,url,data,callback){
        ajax(token,method,url,data,callback);
    }

    this.sendForm = function(idFrm,callback,extraData){
        $(idFrm).on('submit',function(e){
            e.preventDefault();
            var form   = $(this);
            var method = form.find('input[name="_method"]').val() || "POST";
            var url    = form.prop('action');
            var token  = form.find('input[name="_token"]').val();
            var values = form.serializeArray();
            extraData  = extraData || false;
            if(extraData){
                values.push(extraData);
            }
            var data = $.param(values);
            //var data   = form.serialize();
            ajax(token,method,url,data,callback);


        });
    }

    this.ErrorMsg = function(rta,divShow,delay){
            var stemplate = $("#erroresTpl").html();
            var tmpl = Handlebars.compile(stemplate);
            var html = tmpl(rta);
            $(divShow).html(html).fadeIn(3000).delay(delay||1500).slideUp(3000);
            return false;
    }
    this.SuccessMsg = function(rta,divShow){
        var stemplate = $("#successTpl").html();
        var tmpl = Handlebars.compile(stemplate);
        var html = tmpl(rta);
        $(divShow).html(html).fadeIn(3000).delay(1500).slideUp(3000);
        return false;
    }

    this.ActualizarCombo = function (select,ruta,metodo,data){
            var url    = basePath+ruta;
            var method = metodo || "POST";
            var combo  = $(select);
            var option = $(select+" option");
            var datos  = data || null;
            option.remove();
            ajax(null,method,url,datos,function(html){
                combo.append(html);
            });

    }
}