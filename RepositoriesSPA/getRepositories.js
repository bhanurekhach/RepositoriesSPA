var repositoriesList = [];
function find() {
    var repo_url;   
    var website = "https://api.github.com/search/users?q="; 
    var name = $('#userName').val();

    ClearFields();

    //Call GitHub API to get details of the user.
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: website + name,
        type: "GET",
        data: JSON.stringify(name),
        success: function (result) {
            if (result.total_count > 0){
                repo_url = result.items[0].repos_url;
                //Call GitHub API to get details of repositories.
                $.ajax({
                    contentType: "application/json; charset=utf-8",
                    url: repo_url,
                    type: "GET",
                    data: JSON.stringify(name),
                    success: function (response) {
                        if (response.length > 0) {
                            $("#showDetails").removeClass("noDetails");
                            $("#showDetails").addClass("showDetails");
                            $("#noDetails").addClass("noDetails");                            
                            for (i = 0; i < response.length; i++) {
                                repositoriesList[i] = response[i].html_url;
                                document.getElementById('response').innerHTML += '<li>' + response[i].html_url + '</li>';
                            }
                        } else {
                            $("#showDetails").addClass("noDetails");
                            $("#noDetails").removeClass("noDetails");
                            $("#noDetails").addClass("showDetails");
                        }
                    },
                    error: function () {
                        alert("Fail");
                    }
                });
            } else {
                $("#showDetails").addClass("noDetails");
                $("#noDetails").removeClass("noDetails");
                $("#noDetails").addClass("showDetails");
            }
            
        },
        error: function () {
            alert("Fail");
        }
    });    
}

//Clear the previous text search
function ClearFields() {
    $("#showDetails").addClass("noDetails");
    while (repositoriesList.length > 0) {
        repositoriesList.pop();       
    }
    document.getElementById('response').innerHTML = '';
}