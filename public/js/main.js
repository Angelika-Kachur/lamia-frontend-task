"use strict";

//Variables
let xhr = new XMLHttpRequest();
const doc = document;
let elemPlaces = doc.querySelector('#places__list');
let elemForm = doc.querySelector('#places__form-holder');
let elemPopup = doc.querySelector('.popup');
let btnClosePopup = doc.querySelector('.close-popup');
let btnAddPlace = doc.querySelector('.btn--add-place');
let btnGetPlaces = doc.querySelector('#get-button');


//Render All Places
function renderPlaces(places) {
    elemPlaces.innerHTML = '';
    for (let place of places) {
        let li = doc.createElement('li');
        li.setAttribute('data-placeid', place.id);
        li.setAttribute('data-isdeleted', place.isDeleted);
        li.classList.add('place');
        li.innerHTML = `<div class="place__box">
                            <div class="place__name">${place.title}</div>
                            <div class="place__description">${place.description}</div>
                            <div class="place__location">${place.location}</div>
                            <div class="place__openHours">${place.openHours}</div>
                            <div class="place__keywords">${place.keyWords}</div> 
                            <div class="place__btns">
                                <button class="btn btn--delete-place">Delete place</button>
                                <button class="btn btn--edit-place">Edit place</button>
                            </div>
                        </div>
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
    form.setAttribute('data-placeId', -1);
    form.setAttribute('name', 'addingForm');
    form.setAttribute('action', 'POST');
    form.classList.add('places__form');
    form.innerHTML = `<input name="title" type="text" placeholder="${place.title}" class="input place__title">
                    <textarea name="description" type="text" placeholder="${place.description}" class="textarea place__description"></textarea>
                    <div class="inputs-holder">
                        <input name="hoursStart" type="number" min="1" max="24" placeholder="${place.openHours} - start" class="input place__hoursStart">
                        <input name="hoursEnd" type="number" min="1" max="24" placeholder="${place.openHours} - end" class="input place__hoursEnd">
                    </div>
                    <div class="inputs-holder">
                        <input name="lat" type="text" placeholder="${place.location}" class="input place__lat">
                        <input name="lng" type="text" placeholder="${place.location}" class="input place__lng">
                    </div>
                    <button class="btn btn--save-added-place">Save adding place</button>`;
    elemForm.appendChild(form);
}

//Create Editing Form
function createEditingForm(index, places) {
    let place = places[index];
    elemForm.innerHTML = '';
    let form = doc.createElement('form');
    form.setAttribute('data-placeId', place.id);
    form.setAttribute('name', 'editingForm');
    form.setAttribute('action', 'POST');
    form.classList.add('places__form');
    form.innerHTML = `<input name="title" type="text" value="${place.title}" class="input                          place__title">
                    <textarea name="description" type="text" class="textarea place__description">${place.description}</textarea>
                    <div class="inputs-holder">
                        <input name="hoursStart" type="number" min="1" max="24" value="${place.openHours} - start" class="input place__hoursStart">
                        <input name="hoursEnd" type="number" min="1" max="24" value="${place.openHours} - end" class="input place__hoursEnd">
                    </div>
                    <div class="inputs-holder">
                        <input name="lat" type="text" value="${place.location}" class="input place__lat">
                        <input name="lng" type="text" value="${place.location}" class="input place__lng">
                    </div>
                    <button type="button" class="btn btn--save-edited-place">Save editing place</button>`;
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
function saveEditedPlace(places, placeId) {
    // event.preventDefault();
    console.log('Edit Specific Place');
    console.log('placeId ', placeId)
    console.log('Specific Edeted Place ', places[placeId])
    // renderPlaces();
}







//GET all Places to render on the page
function getPlaces() {
    xhr.open('GET', '/places');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        let responseObj = xhr.response;
        // console.log(responseObj.places);
        renderPlaces(responseObj.places);
    };
}
getPlaces();

//POST New Place to Places
function postPlace() {
    let formData = new FormData(document.forms.addingForm);
    let object = {};
    formData.forEach((value, key) => {object[key] = value});
    let json = JSON.stringify(object);
    xhr.open('POST', '/place');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    console.log(json)
}

//GET Specific Place to edit it
function getSpecificPlace(placeId) {
    xhr.open('GET', '/place');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        console.log('xhr.response ', xhr.response);
        let responseObj = xhr.response;
        console.log('specific place: ', responseObj.places[placeId])
        createEditingForm(placeId, responseObj.places)
    };
}

//PUT Specific Place to save it after editing
function putSpecificPlace(placeId) {
    let formData = new FormData(document.forms.editingForm);
    formData.append('placeId', placeId);
    let object = {};
    formData.forEach((value, key) => {object[key] = value});
    let json = JSON.stringify(object);
    console.log(json)

    xhr.open('PUT', '/place', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.responseType = 'json';
    
    xhr.onload = function() {
        let responseObj = xhr.response;
        // console.log('xhr.response ', xhr.response);
        console.log('xhr.response ', xhr.response);
        console.log('specific place: ', responseObj.places[placeId])
        saveEditedPlace(responseObj, placeId)
        renderPlaces(responseObj.places);
        // console.log('responseObj ', responseObj);
    };
    xhr.send(json);
}

//DELETE Specific Place
function deleteSpecificPlace(placeId) {
    console.log(placeId);
    xhr.open('DELETE', '/place/'+placeId);
    xhr.responseType = 'json';
    xhr.send();
}

// function deleteSpecificPlace(placeId) {
//     console.log(placeId);
//     xhr.open('GET', '/placed?id='+placeId);
//     xhr.responseType = 'json';
//     xhr.send();
// }









//Create 'Adding Form' on Btn Click
btnAddPlace.addEventListener('click', function() {
    createAddingForm()
    showPopup()
});

//Create New Place and Send it to the Server
doc.addEventListener('click', function() {
    if (event.target.classList.contains('btn--save-added-place')) {
        createNewPlace();
        hidePopup();
    }
});

//Create 'Editing Form' on Btn Click
elemPlaces.addEventListener('click', function() {
    if (event.target.classList.contains('btn--edit-place')) {
        let specificPlace = event.target.closest('.place');
        let placeId = specificPlace.getAttribute('data-placeid');
        getSpecificPlace(placeId);
        showPopup();
    }
});

//Save Edited Place and Send it to the Server
doc.addEventListener('click', function() {
    if (event.target.classList.contains('btn--save-edited-place')) {
        let specificPlace = event.target.closest('.places__form');
        let placeId = specificPlace.getAttribute('data-placeid');
        console.log('You clicked on save edeted btn');
        putSpecificPlace(placeId);
        hidePopup();
    }
});

//Delete Specific Place
doc.addEventListener('click', function() {
    if (event.target.classList.contains('btn--delete-place')) {
        console.log("Delete Specific Place");
        let specificPlace = event.target.closest('.place');
        let placeId = specificPlace.getAttribute('data-placeid');
        deleteSpecificPlace(placeId);
    }
});

btnGetPlaces.addEventListener('click', getPlaces);

// elemPopup
function showPopup() {
    elemPopup.classList.add('popup--open');
}

function hidePopup() {
    elemPopup.classList.remove('popup--open');
}

btnClosePopup.addEventListener('click', function() {
    hidePopup();
});