"use strict";

//Variables
let xhr = new XMLHttpRequest();
const doc = document;
let elemPlaces = doc.querySelector('#places__list');
let elemForm = doc.querySelector('#places__form-holder');
let btnAddPlace = doc.querySelector('.btn--add-place');

//Render All Places
function renderPlaces(places) {
    elemPlaces.innerHTML = '';
    for (let place of places) {
        let li = doc.createElement('li');
        li.setAttribute('data-placeid', place.id);
        li.classList.add('place');
        li.innerHTML = `<div class="place__box is-deleted-${place.isDeleted}" data-isdeleted="${place.isDeleted}">
                            <div class="place__name">${place.title}</div>
                            <div class="place__description">${place.description}</div>
                            <div class="place__location">${place.location}</div>
                            <div class="place__openHours">${place.openHours}</div>
                            <div class="place__keywords">${place.keyWords}</div> 
                            </div>
                        </div>
                        <button class="btn btn--delete-place">Delete place</button>
                        <button class="btn btn--edit-place">Edit place</button>
                        `;
        elemPlaces.appendChild(li);
    };
}

//Create Adding Form
function createAddingForm() {
    let place = {}
    place.title = "Title"
    place.description = "Description"
    place.location = "Location"
    place.openHours =  [
        'Open Hours - start',
        'Open Hours - end'
    ]
    place.location = [
        'Latitude',
        'Longitude'
    ]
    place.keyWords = "Your keywords here"

    elemForm.innerHTML = '';
    let form = doc.createElement('form');
    form.setAttribute('action', '/create-post');
    form.setAttribute('data-placeId', place);
    form.setAttribute('name', 'addingForm');
    form.setAttribute('action', 'POST');
    form.classList.add('places__form');
    form.innerHTML = `<input name="title" type="text" placeholder="${place.title}" class="input place__title">
                    <textarea name="description" type="text" placeholder="${place.description}" class="textarea place__description"></textarea>
                    <div class="inputs-holder">
                        <input name="hoursStart" type="text" placeholder="${place.openHours} - start" class="input place__hoursStart">
                        <input name="hoursEnd" type="text" placeholder="${place.openHours} - end" class="input place__hoursEnd">
                    </div>
                    <div class="inputs-holder">
                        <input name="lat" type="text" placeholder="${place.location}" class="input place__lat">
                        <input name="lng" type="text" placeholder="${place.location}" class="input place__lng">
                    </div>
                    <button class="btn btn--save-edited-place">Save adding place</button>`;
    elemForm.appendChild(form);
}

//Create Editing Form
function createEditingForm(index, places) {
    let place = places[index];
    elemForm.innerHTML = '';
    let form = doc.createElement('form');
    form.setAttribute('action', '#');
    form.setAttribute('data-placeId', place);
    form.classList.add('places__form');
    form.innerHTML = `<input type="text" value="${place.title}" class="input                          place__title">
                    <textarea type="text" class="textarea place__description">${place.description}</textarea>
                    <div class="inputs-holder">
                        <input type="text" value="${place.openHours} - start" class="input place__hoursStart">
                        <input type="text" value="${place.openHours} - end" class="input place__hoursEnd">
                    </div>
                    <div class="inputs-holder">
                        <input type="text" value="${place.location}" class="input place__lat">
                        <input type="text" value="${place.location}" class="input place__lng">
                    </div>
                    <button id="place__edit" class="btn btn--save-edit-place">Save editing place</button>`;
    elemForm.appendChild(form);
}

//Add New Place
function createNewPlace() {
    event.preventDefault();
    console.log('createNewPlace');
    postPlace();
    // getPlaces();
}

//Edit Specific Place
function saveEditedPlace(placeId) {
    event.preventDefault();
    console.log('Edit Specific Place');
    console.log('placeId ', placeId)
    // renderPlaces();
}







//GET all Places to render on the page
function getPlaces() {
    xhr.open('GET', '/places');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        let responseObj = xhr.response;
        console.log(responseObj);
        renderPlaces(responseObj.places);
    };
}
getPlaces();

//POST New Place to Places
function postPlace() {
    let formData = new FormData(document.forms.addingForm)
    let object = {};
    formData.forEach((value, key) => {object[key] = value});
    let json = JSON.stringify(object);
    xhr.open('POST', '/place');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
}

//GET Specific Place to edit it
function getSpecificPlace(placeId) {
    xhr.open('GET', '/place');
    xhr.responseType = 'json';
    xhr.send();
    console.log('Get specific place: ', placeId)
    xhr.onload = function() {
        let responseObj = xhr.response;
        createEditingForm(placeId, responseObj.places)
    };
}

//PUT Specific Place to save it after editing
function putSpecificPlace(placeId) {
    xhr.open('PUT', '/place');
    xhr.responseType = 'json';
    xhr.send();
    saveEditedPlace(placeId)
    xhr.onload = function() {
        let responseObj = xhr.response;
        saveEditedPlace(placeId)
        console.log('responseObj ', responseObj);
    };
    getPlaces();
}

//DELETE Specific Place
function putSpecificPlace(placeId) {
    xhr.open('DELETE', '/place');
    xhr.responseType = 'json';
    xhr.send();
    // saveEditedPlace(placeId)
    // xhr.onload = function() {
    //     let responseObj = xhr.response;
    //     saveEditedPlace(placeId)
    //     console.log('responseObj ', responseObj);
    // };
    // getPlaces();
}







//Create 'Adding Form' on Btn Click
btnAddPlace.addEventListener('click', createAddingForm);

//Create New Place and Send it to the Server
doc.addEventListener('click', function() {
    if (event.target.classList.contains('btn--save-edited-place')) {
        createNewPlace();
    }
});

//Create 'Editing Form' on Btn Click
elemPlaces.addEventListener('click', function() {
    if (event.target.classList.contains('btn--edit-place')) {
        let specificPlace = event.target.parentElement;
        let placeId = specificPlace.getAttribute('data-placeid');
        getSpecificPlace(placeId);
    }
});

//Save Edited Place and Send it to the Server
doc.addEventListener('click', function() {
    if (event.target.classList.contains('btn--save-edit-place')) {
        let specificPlace = event.target.parentElement;
        let placeId = specificPlace.getAttribute('data-placeid');
        putSpecificPlace(placeId);
    }
});

//Delete Specific Place
doc.addEventListener('click', function() {
    if (event.target.classList.contains('btn--delete-place')) {
        console.log("Delete Specific Place");
        // let specificPlace = event.target.parentElement;
        // let placeId = specificPlace.getAttribute('data-placeid');
        // getSpecificPlace(placeId);
    }
});