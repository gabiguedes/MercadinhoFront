function setToken(token){		
    if(typeof(Storage) !== "undefined") {
        localStorage.setItem("token_mercadinho", token);
    } else {
        alert("Seu navegador não suporta LocalStorage");
    }
}

function getToken(){		
    return localStorage.getItem("token_mercadinho");
}

$(function () {	
    // submit do formulario
    $("#login").submit(function (event) {
    
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': "http://localhost:8080/login",
            'data': JSON.stringify(
                {
                    "email": $("#email").val(),
                    "senha": $("#senha").val()
                }
            ),
            success: function (response, textStatus, request) {
            // setToken(); coloca aqui request do Authorization	
                localStorage.setItem("token_mercadinho", request.getResponseHeader('Authorization'));
                localStorage.setItem("user_mercadinho", $("#email").val());
                window.location = "../perfil/perfil.html";
            },
            error: function (error) {
                alert("Usuário inválido");
            }
        });

        event.preventDefault();
    });
});