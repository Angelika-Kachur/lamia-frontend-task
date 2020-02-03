"use strict";


//Render All Places
const doc = document;
let elemPlaces = doc.querySelector('#places__list');
let elemForm = doc.querySelector('#places__form-holder');
let btnAddPlace = doc.querySelector('.btn--add-place');
let btnEditPlace = doc.querySelector('#btn--add-place');
let getBtn = doc.querySelector('#get-button');

function renderPlaces(places) {
    elemPlaces.innerHTML = '';
    for (let place of places) {
        let li = doc.createElement('li');
        li.setAttribute('data-placeid', place.id);
        li.classList.add('place');
        li.innerHTML = `<div class="place__box>
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
// renderPlaces();

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
    // form.setAttribute('enctype', 'multipart/form-data');
    form.classList.add('places__form');
    form.innerHTML = `<input name="title" type="text" placeholder="${place.title}" class="input place__title">
                    <textarea name="description" type="text" placeholder="${place.description}" class="textarea place__description"></textarea>
                    <div class="inputs-holder">
                        <input name="open-hours-start" type="text" placeholder="${place.openHours} - start" class="input place__open-hours-start">
                        <input name="open-hours-end" type="text" placeholder="${place.openHours} - end" class="input place__open-hours-end">
                    </div>
                    <div class="inputs-holder">
                        <input name="lat" type="text" placeholder="${place.location}" class="input place__lat">
                        <input name="lng" type="text" placeholder="${place.location}" class="input place__lng">
                    </div>
                    <button class="btn btn--save-edited-place">Save adding place</button>`;
    elemForm.appendChild(form);
}

//Create Editing Form
function createEditingForm(index) {
    let place = places[index];
    elemForm.innerHTML = '';
    let form = doc.createElement('form');
    form.setAttribute('action', '#');
    form.setAttribute('data-placeId', place);
    form.classList.add('places__form');
    form.innerHTML = `<input type="text" placeholder="${place.title}" class="input                          place__title">
                    <textarea type="text" placeholder="${place.description}" class="textarea place__description"></textarea>
                    <div class="inputs-holder">
                        <input type="text" placeholder="${place.openHours} - start" class="input place__open-hours-start">
                        <input type="text" placeholder="${place.openHours} - end" class="input place__open-hours-end">
                    </div>
                    <div class="inputs-holder">
                        <input type="text" placeholder="${place.location}" class="input place__lat">
                        <input type="text" placeholder="${place.location}" class="input place__lng">
                    </div>
                    <button id="place__edit" class="btn btn--save-edit-place">Save editing place</button>`;
    elemForm.appendChild(form);
}

//Add New Place
function createNewPlace() {
    event.preventDefault();
    let form = doc.querySelector('.places__form');
    let title = form.querySelector('.place__title').value;
    let description = form.querySelector('.place__description').value;
    let hoursStart = form.querySelector('.place__open-hours-start').value;
    let hoursEnd = form.querySelector('.place__open-hours-end').value;
    let lat = form.querySelector('.place__lat').value;
    let lng = form.querySelector('.place__lng').value;

    postPlace();
    
    // renderPlaces();
}

//Create Editing Form on Btn Click
elemPlaces.addEventListener('click', function() {
    if (event.target.classList.contains('btn--edit-place')) {
        let specificPlace = event.target.parentElement;
        let placeId = specificPlace.getAttribute('data-placeid');
        createEditingForm(placeId)
    }
});

//Create Adding Form on Btn Click
btnAddPlace.addEventListener('click', createAddingForm);

//Create New Place and Send it to the Server
doc.addEventListener('click', function() {
    if (event.target.classList.contains('btn--save-edited-place')) {
        createNewPlace();
    }
});

// btnSaveAddedPlace.addEventListener('click', createNewPlace, false);

//Delete Specefic Place
// function deleteSpecificPlace(e) {
//     console.log('Delete Specific Place');
//     event.preventDefault();
//     if (event.target.classList.contains('btn--delete-place')) {
//         let specificPlace = event.target.parentElement;
//         let specificPlaceId = specificPlace.getAttribute('data-placeid');
//         places.splice(specificPlaceId, 1); //remove place from array places
//         renderPlaces();
//     }
// }
// doc.addEventListener('click', deleteSpecificPlace);

// Edit Specefic Place
// function editSpecificPlace(e) {
//     console.log('Edit Specific Place');
//     event.preventDefault();
//     if (event.target.classList.contains('btn--edit-place')) {
//         let specificPlace = event.target.parentElement;
//         let specificPlaceId = specificPlace.getAttribute('data-placeid');
//         let elemEditPlaceBox = specificPlace.querySelector('.edit-place__box');
//         places[specificPlaceId].title = 'New Title';
//         places[specificPlaceId].description = 'New Description';
//         places[specificPlaceId].openHours = [10, 11];
//         places[specificPlaceId].location = [10.000, 11.000];
//         places[specificPlaceId].online = true;
//         places[specificPlaceId].keyWords =  ['sushi','fish'];
//         renderPlaces();
//         testSend();
//     }
// }
// doc.addEventListener('click', editSpecificPlace);

// Edit Specific Place
// function editSpecificPlace() {
//     console.log('Edit Specific Place');
//     event.preventDefault();
//     let form = doc.querySelector('.places__form');
//     let title = form.querySelector('.place__title').value;
//     let description = form.querySelector('.place__description').value;
//     let hoursStart = form.querySelector('.place__open-hours-start').value;
//     let hoursEnd = form.querySelector('.place__open-hours-end').value;
//     let lat = form.querySelector('.place__lat').value;
//     let lng = form.querySelector('.place__lng').value;
//     places[0] = {
//     }
//     renderPlaces();
// }
// doc.addEventListener('click', function() {
//     if (event.target.classList.contains('btn--edit-place')) {
//         editSpecificPlace();
//     }
// });

let xhr = new XMLHttpRequest();

//GET Places
function getPlace() {
    xhr.open('GET', '/places');
    xhr.responseType = 'json';
    xhr.send();
    console.log('get');
    console.log(xhr.response)

    xhr.onload = function() {
        // alert(`Загружено: ${xhr.status} ${xhr.response}`);
        let responseObj = xhr.response;
        console.log(xhr.response);
        renderPlaces(responseObj.places);
    };
}

getBtn.addEventListener('click', getPlace)
//POST Places
function postPlace() {
    let formData = new FormData(document.forms.addingForm)
    let object = {};
    formData.forEach((value, key) => {object[key] = value});
    let json = JSON.stringify(object);
    // fetch('/place', {
    //     method: 'post',
    //     body: json
    // }).then(function(res) {
    //     return res.text();
    // }).then(function(text) {
    //     console.log(text)
    // }).catch(function(error) {
    //     console.log(error)
    // })
    xhr.open('POST', '/places');
    // xhr.setRequestHeader('Content-type', 'application/form-data; charset=utf-8');
    // xhr.send(formData);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    xhr.onload = function() {
        alert(`Загружено: ${xhr.status} ${xhr.response}`);
    };
}