//Code to generate data sets via APIs used by the website.


function projectSetConstruct(){
     var projectsPF = [];
    $.getJSON("https://api.github.com/users/GregoryPrograms/repos", function(data){
        for(var projectIndex = 0; projectIndex < data.length; projectIndex++){
            if(data[projectIndex].name.includes("P")){
                projectsPF.push(data[projectIndex].name);
            }
        }
        sessionStorage.setItem('projects', JSON.stringify(projectsPF));
    });
}
if(sessionStorage.getItem('projects')){
    projectSetConstruct();
}
