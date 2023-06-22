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
	zoom: 14
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


     
    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });
     
    map.on('mouseenter', 'places', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
     
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
     
    map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
    });
    
