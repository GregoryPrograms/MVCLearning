//Code to generate data sets via APIs used by the website.
class project{
    constructor(projString){
    this.name = projString[0];
    this.desc = projString[1];
    this.url = projString[2];
    }
}

function projectSetConstruct(callback){
    var projectsPF = [];
    $.getJSON("https://api.github.com/users/GregoryPrograms/repos", function(data){
        for(var projectIndex = 0; projectIndex < data.length; projectIndex++){          
            if(data[projectIndex].name.includes("SC2")){
                projectsPF.push(data[projectIndex].name);
                projectsPF.push(data[projectIndex].description);
                projectsPF.push(data[projectIndex].html_url);
            }
        }
        sessionStorage.setItem('projects', JSON.stringify(projectsPF));
        callback(sessionStorage.getItem('projects'));
    });
}

function projHTMLStruct(projString){
    projString = JSON.parse(projString);
    projList = [];
    projDescriptors = [];
    for(projectIndex = 0; projectIndex < projString.length; projectIndex++){
        projDescriptors.push(projString[projectIndex]);
        if(projectIndex % 3 == 2){
            projList.push(new project(projDescriptors));
            projDescriptors = [];
        }
    }
    console.log(projList);
}



if(!sessionStorage.getItem('projFlag')){
    projectSetConstruct(projHTMLStruct);
    sessionStorage.setItem('projFlag', 'true');
}
