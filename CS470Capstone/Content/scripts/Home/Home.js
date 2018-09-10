var home = {

    Initialize: function () {
        home.GetHelloWorld();
    },

    GetHelloWorld: function () {
        var str = "Hello ";

        HomeAPI.GetHelloWorld(str, function (response) {
            console.log(response);
            $("#hello").append(response);
        });
    }
}

$(document).ready(home.Initialize());