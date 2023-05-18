$(document).ready(function(){
    $("#updatedata").on("click",function(){
        console.log("click");
        $("#updatedata").prop('disabled', true).find('a').replaceWith(
                '<a class="nav-link active" style="color: #ffffff;">Loading</a>'+
                '<div class="spinner-border text-secondary" role="status">'+
                '<span class="sr-only">Loading...</span>'+
                '</div>'
            );
        $.ajax({
            type: 'POST',
            url: '/scraperdata',
            success: function(data) {
                $("#updatedata").replaceWith(
                    '<button class="button_nav" id="updatedata">'+
                        '<a class="nav-link active" style="color: #ffffff;">Update Completed</a>'+
                    '</button>'
                    );
                console.log(data);
            },
            error: function(xhr, status, error) {
                // Display an error message to the user
                alert("There was an error with the AJAX request: " + error);
            }
        })
    });
});