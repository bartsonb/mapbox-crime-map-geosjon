mapboxgl.accessToken = 'pk.eyJ1IjoiYmFydHNvbmIiLCJhIjoiY2pycTd4Z3EyMW0wMzQzbGEzbWdrNmphMSJ9.ma7qvafj6YZ3vsPNM0kINQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-78.830543, 35.786962],
  zoom: 11
});

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const crimeLabels = {
  'id': 'crime-labels',
  'type': 'symbol',
  'source': 'crimes',
  'layout': {
    'text-field': ['format',
      ['downcase', ['get', 'crime']], {
        'font-scale': 1
      }
    ],
    'text-font': ['Arial Unicode MS Regular', 'Arial Unicode MS Bold'],
    'text-size': 10,
    'text-offset': [0, 1]
  },
  'paint': {
    'text-color': '#000'
  }
}

const crimeCircles = {
  'id': 'crime-circles',
  'type': 'circle',
  'source': 'crimes',
  'paint': {
    'circle-color': '#0092fe',
    'circle-radius': 2.5
  }
}

const filterBy = (month) => {
  map.setFilter('crime-circles', ['==', 'month', month]);
  map.setFilter('crime-labels', ['==', 'month', month]);

  document.getElementById('month').textContent = months[month];
}

const extractMonthIndex = (d) => {
  return parseInt(d.split('/')[0], 10) - 1;
}

map.on('load', function () {
  d3.json('http://localhost:5000/api/crime-mapping', (err, data) => {
    if (err) throw err;

    data.features = data.features.map((d) => {
      d.properties.crime = d.properties.crime_type.split(' - ')[0];
      d.properties.month = extractMonthIndex(d.properties.date_to);
      return d;
    });

    map.addSource('crimes', {'type': 'geojson', data: data});

    map.addLayer(crimeCircles);
    map.addLayer(crimeLabels);

    filterBy(0);

    document.querySelector('#slider').addEventListener('input', (e) => {
      filterBy(parseInt(e.target.value, 10));
    });

    document.querySelector('#checkbox').addEventListener('input', (e) => {
      !e.target.checked ? map.removeLayer('crime-labels') : map.addLayer(crimeLabels);
    });
  });
});