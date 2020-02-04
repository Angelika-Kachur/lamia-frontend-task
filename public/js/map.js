// var map;

// function createMap () {
//   var options = {
//     center: { lat: 60.192059, lng: 24.945831 },
//     zoom: 10
//   };

//   map = new google.maps.Map(document.getElementById('map'), options);

//   var input = document.getElementById('search');
//   var searchBox = new google.maps.places.SearchBox(input);

//   map.addListener('bounds_changed', function() {
//     searchBox.setBounds(map.getBounds());
//   });

//   var markers = [];
  
//   searchBox.addListener('places_changed', function () {
//     var places = searchBox.getPlaces();

//     if (places.length == 0)
//       return;

//     markers.forEach(function (m) { m.setMap(null); });
//     markers = [];

//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(p) {
//       if (!p.geometry)
//         return;

//       markers.push(new google.maps.Marker({
//         map: map,
//         title: p.name,
//         position: p.geometry.location
//       }));

//       if (p.geometry.viewport)
//         bounds.union(p.geometry.viewport);
//       else
//         bounds.extend(p.geometry.location);
//     });
    
//     map.fitBounds(bounds);
//   });
// }  






// function createMap() {
//   var myLatLng = { lat: 60.16901644495906, lng: 24.93797779083252 };

//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 13,
//     center: myLatLng
//   });

//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     title: 'Arnolds'
//   });
// }