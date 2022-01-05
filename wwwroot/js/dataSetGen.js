//Code to generate data sets via APIs used by the website.


class project{
    constructor(projString){
    this.name = projString[0];
    this.desc = projString[1];
    this.url = projString[2];
    }
}

//Code to pull repositories marked as portfolio projects from github api and store them in local storage
//Takes as input a function to run once the list of projects has been pulled and constructed.
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

//Takes the stored list of projects, parses them into an array of 'project' objects - then creates html elements to represent the list
//Callback function called by projectSetConstruct after it has created a list of projects.
function projHTMLStruct(projString){
    //First, we parse the list into an array of objects
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
    //Generates html elements for each project - on the main page. Will have separate codeblock to generate html for projects page.
    projList.forEach(project => {
        const newProjDiv = document.createElement("div");
        newProjDiv.classList.add("proj");
        const projName = document.createTextNode(project.name);
        const projContent = document.createTextNode(project.desc);
        newProjDiv.appendChild(projName);
        newProjDiv.appendChild(projContent);
        newProjDiv.addEventListener("click", function(){
            window.open(project.url);
        });
        const projHolderDiv = document.getElementById("projectContainer");
        projHolderDiv.appendChild(newProjDiv);
    });
}


//Checks whether the project set needs to be constructed.
if(!sessionStorage.getItem('projFlag')){
    projectSetConstruct(projHTMLStruct);
    sessionStorage.setItem('projFlag', 'true');
}
