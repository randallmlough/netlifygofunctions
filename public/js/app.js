$(document).ready(function () {
    $("#ajax").submit(function (e) {
        e.preventDefault();
        var $form = $(this);
        $.post($form.attr("action"), $form.serialize()).done(function (data) {
            console.log(data)
            alert("Hello, " + data["name"][0])
        });
    })
    $("#envButton").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: '/.netlify/functions/env',
            contentType: 'application/json',
            crossDomain: true,
            success: function (data) {
                console.log(data)
                var $env = data["ENV_KEY"]
                var $envName = data["NAME"]
                $("#envButton").data('env', $env)
                var $modal = $('#envModal')
                $modal.find('.modal-body').text($envName)
                $modal.modal('toggle')
            },
            error: function () {
                alert('fail');
            }
        });
    })
});