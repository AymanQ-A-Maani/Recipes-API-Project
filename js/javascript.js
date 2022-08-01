let navLinks = document.querySelectorAll(".nav-link");
let matrix=[];
let httpRequest;
let detailsBtn;
let recipeHttpRequest;
let recipeDetails;
let recipeArray;
let index;

async function getrecipes(meal){
    httpRequest = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    matrix = await httpRequest.json();
    matrix = matrix.recipes;
    displayData();
}

for(let i =0;i<navLinks.length;i++){
    navLinks[i].addEventListener('click',function(e){
        getrecipes(e.target.text);    
    })
}
function displayData(){
    let result="";
    for(let i=0;i<matrix.length;i++){
        result+=` 
        <div class=" col-4">
            <img src="${matrix[i].image_url}" class=" w-100 h-75">
            <a href=" ${matrix[i].source_url}" class=" btn btn-info">Source</a>
            <a onclick="updateDetails(${matrix[i].recipe_id})" class=" detailsBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</a>
        </div>
        `;
    }
    
document.getElementById("postRow").innerHTML = result;
}
async function updateDetails(id){
    recipeHttpRequest = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeIdObject = await recipeHttpRequest.json();
    recipeArray = recipeIdObject.recipe
    let recipeImg =recipeArray.image_url
    let recipeIngre = recipeArray.ingredients
    document.getElementById("modalImg").src=recipeImg
    recipeDetails="";
    for(let i =0 ; i<recipeIngre.length;i++){
        recipeDetails+=`<li>${recipeIngre[i]}</li>`;
    }
    document.getElementById("recipeDetails").innerHTML=recipeDetails
}

function displayDataFirstTime(){
    getrecipes("pizza");
}
displayDataFirstTime();

function test1(){
    console.log("test1")
}
function test2(){
    console.log("test2")
}

/*let p = new Promise(function(){
    console.log("first action")
});

p.then(function(){
    console.log("second action")
});*/

