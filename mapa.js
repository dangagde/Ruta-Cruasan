mapboxgl.accessToken = 'pk.eyJ1IjoibWp2YWxlbnp1ZWxhIiwiYSI6ImNrb2Fmdm9zZDBpM28ybnFtYTQ2Z2MwMnYifQ.ZY3jTw0-6tjUSOOJXJHsdw'


const geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-5.991762524340241,37.39429296276351]
        },
        'properties': {
          'title': 'La Crème de La Créme',
          'location': 'Calle Regina 1, local 9',
          'description': 'Parada 1'
          
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-5.996193533633623,37.393367060002944]
        },
        'properties': {
          'title': 'Manu Jara',
          'location': 'Gourmet Experience Plaza del Duque',
          'description': 'Parada 2'
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates':  [-5.996209626885887,37.39219927681635]
        },
        'properties': {
          'title': 'Collete',
          'location': 'Calle San Eloy 13',
          'description': 'Parada 3'
          
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-5.993908291560091, 37.39109114457191]
        },
        'properties': {
          'title': 'Crustum',
          'location': 'Calle Cerrajería 23',
          'description': 'Parada 4'
          
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-5.992347245906594,37.3898252965034]
        },
        'properties': {
          'title': 'Chök',
          'location': 'Plaza Jesús de la Pasión 8',
          'description': 'Parada 5'
          
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates':  [-5.98971868108226,37.389880704440266]
        },
        'properties': {
          'title': 'Pan y Piu',
          'location': 'Calle Cabeza del Rey Don Pedro 15',
          'description': 'Parada 6'
          
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates':  [-5.971562965062213,37.38552987006818]
        },
        'properties': {
          'title': 'Croissance',
          'location': 'Calle Benito Mas y Prat 6',
          'description': 'Parada 7'
          
        }
      },
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates':   [-5.9811636153168495,37.37729513457981]
        },
        'properties': {
          'title': 'Tarta Home',
          'location': 'Calle Dr. Pedro de Castro 7',
          'description': 'Parada 8'
          
        }
      }
    ]
  };

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-5.986042900992137,37.38719702355517],
	zoom: 12
});

for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h2>${feature.properties.title}</h2><h3>${feature.properties.location}</h3><p>${feature.properties.description}</p>`
          )
      )
      .addTo(map);
  }



  map.on('load', function() {
    // Coordenadas de la ruta
    var coordinates = [
      [-5.991762524340241, 37.39429296276351],
      [-5.996193533633623, 37.393367060002944],
      [-5.996209626885887, 37.39219927681635],
      [-5.993908291560091, 37.39109114457191],
      [-5.992347245906594, 37.3898252965034],
      [-5.98971868108226, 37.389880704440266],
      [-5.971562965062213, 37.38552987006818],
      [-5.9811636153168495, 37.37729513457981]
    ];
  
    var route = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    };
  
    map.addSource('route', {
      type: 'geojson',
      data: route
    });
  
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': 'blue',
        'line-width': 3
      }
    });
  
    var bounds = coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  
    map.fitBounds(bounds, {
      padding: 50
    });
  });


 
  map.addControl(
    new MapboxDirections({
    accessToken: mapboxgl.accessToken
    }),
    'bottom-right'
    );