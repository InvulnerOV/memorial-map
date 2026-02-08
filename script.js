const map = L.map('map').setView([49.4229, 26.9871], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);


const infoTitle = document.getElementById('infoTitle');
const infoText  = document.getElementById('infoText');
const infoImg   = document.getElementById('infoImg');

function setInfo(title, text, imgUrl){
  infoTitle.textContent = title || 'Оберіть обʼєкт';
  infoText.textContent  = text  || 'Натисніть кнопку — зʼявиться опис.';
  const url = (imgUrl || '').trim();
  if(url){
    infoImg.src = url;
    infoImg.style.display = 'block';
  }else{
    infoImg.src = '';
    infoImg.style.display = 'none';
  }
}


const LINE_NORMAL = { color: '#2563eb', weight: 5, opacity: 0.9 };
const LINE_ACTIVE = { color: '#f59e0b', weight: 9, opacity: 1 };

const POINT_NORMAL = { radius: 9, color: '#2563eb', fillColor:'#2563eb', fillOpacity:0.9, weight:2 };
const POINT_ACTIVE = { radius: 12, color:'#f59e0b', fillColor:'#f59e0b', fillOpacity:1, weight:3 };


const PLACE_DATA = {
  heroes_mariupol_st:   { type: 'line',  coords: [[49.41916226846609, 26.975522429021073],[49.4190022748568, 26.976030293475755],[49.41835319122851, 26.981818500515082],[49.41851022837743, 26.98185068702318],[49.41920467552266, 26.975799623501068],[49.41916226846609, 26.975522429021073],[49.41995714988958, 26.970927057548202],[49.41989259213708, 26.96948671131089],[49.41986293043855, 26.969060240078612],[49.41967100136754, 26.968620357801296],[49.41945523170166, 26.96840814777761],[49.41900332102858, 26.968292812790267],[49.41893991548876, 26.96807809107193],[49.41900086329653, 26.967827823749033],[49.42035161167313, 26.96430023485379],[49.420432057675114, 26.964281001191505],[49.42050541683868, 26.964319344010484],[49.42104973840651, 26.964903508134892]] },
  heroes_mariupol_prov: { type: 'line',  coords: [[49.42008966328338, 26.965089787964114],[49.42125166765251, 26.966406976568962],[49.4216301934372, 26.96693475419488],[49.422082073108605, 26.96777829621237]] },
  kushniruk:            { type: 'line',  coords: [[49.40660783193626, 26.9920613042654],[49.40663424868671, 26.991700430675028],[49.40663278108982, 26.991506461120206],[49.406577012376104, 26.99141398726267],[49.406867792290576, 26.987932356785397],[49.40696651947624, 26.98780718064564],[49.40733180833699, 26.987822353511064],[49.407413257509724, 26.987784421347502],[49.40749717469785, 26.98758338088062],[49.40759343247231, 26.98703715772531]] },
  oksanchenko_prov:     { type: 'line',  coords: [[49.41163787310965, 27.00440063080185],[49.413190160880774, 27.00586151433447],[49.41489181032288, 27.006939633622725]] },
  petrakivskyi:         { type: 'line',  coords: [[49.415244194831466, 26.97621890294343],[49.41511346138064, 26.97667822003665],[49.414955750722534, 26.978607989768594],[49.41582522817784, 26.97925230957992],[49.41603066332221, 26.97927144779214]] },
  vasyliev:             { type: 'line',  coords: [[49.401873280964075, 27.05425797261607],[49.39796303043978, 27.051629208694568],[49.39785282534294, 27.05145275494344],[49.39715140893621, 27.051014228201474],[49.39700431424836, 27.051030284509384],[49.396443908940505, 27.050582308889908]] },
  skoblia_st:           { type: 'line',  coords: [[49.418658059757874, 26.991270836795508],[49.417278741296414, 26.981685015233605],[49.41697578373918, 26.97769150828419],[49.41724969065281, 26.974635773733443]] },
  skoblia_prov:         { type: 'line',  coords: [[49.41848640283567, 26.98024326991321],[49.41712078404061, 26.979825231506858]] },
  ruf_st:               { type: 'line',  coords: [[49.41354014121684, 26.970585323439053],[49.41375854516161, 26.969809610694195],[49.41409293575898, 26.969007345434846],[49.41433018696621, 26.96806442363936],[49.415607839775305, 26.964739212732418]] },
  ruf_prov:             { type: 'line',  coords: [[49.41402620889486, 26.9660167051133],[49.41536636122651, 26.967239792420962],[49.41606085285772, 26.96534615286129]] },
  kramar:               { type: 'line',  coords: [[49.41712979154767, 27.017104394046637],[49.43049090641756, 27.02636990445885]] },
  ato:                  { type: 'line',  coords: [[49.401463279738216, 27.05553002836946],[49.39524824735931, 27.051405731670332],[49.394517418798245, 27.05104206615736]] },
  dudchenko:            { type: 'line',  coords: [[49.395032825444126, 27.048976194078957],[49.39358532733438, 27.05419995519642],[49.39330218286106, 27.05464397596313],[49.39098921837123, 27.061152826209348],[49.390871773074366, 27.06126108828646],[49.39064275393785, 27.061418970482244],[49.39048326222003, 27.061687512857674],[49.38908639853827, 27.06578561323809],[49.38911576317986, 27.06621418308508],[49.388933702118905, 27.066917939886444]] },
  dashko_st:            { type: 'line',  coords: [[49.41960504756132, 27.01183806623782],[49.41874590900643, 27.014093455912736]] },
  dashko_prov:          { type: 'line',  coords: [[49.41808038464365, 27.013583043098002],[49.41950360104325, 27.01458446731128]] },

  alea_heroiv_proskurivska: { type: 'line',  coords: [[49.42313361846331, 26.987055718989744],[49.42612131417011, 26.981452140657364]] },
  alea_slavy_rakove:        { type: 'point', coords: [49.38548161762351, 27.055473266048097] },

  lyceum2:          { type: 'point', coords: [49.41043194000057, 26.985561563300813] },
  lyceum3:          { type: 'point', coords: [49.40685076408426, 26.954983806052883] },
  lyceum15:         { type: 'point', coords: [49.42373604256696, 26.974002569742236] },
  lyceum27:         { type: 'point', coords: [49.412797214454166, 26.950599079464343] },
  lyceum4:          { type: 'point', coords: [49.43874970526059, 26.993278572898745] },
  gym12:            { type: 'point', coords: [49.39770952380365, 27.049583430639505] },
  lyceum10:         { type: 'point', coords: [49.42666504098241, 26.993766525109855] },
  lyceum11:         { type: 'point', coords: [49.43530315978254, 27.01005184605037] },
  gym30:            { type: 'point', coords: [49.41820096345254, 27.015214538601423] },
  lyceum5:          { type: 'point', coords: [49.4306454915611, 26.975576870159184] },
  pro_lyceum:       { type: 'point', coords: [49.44631434100331, 26.999520830585585] },
  vpu4:             { type: 'point', coords: [49.410004374563584, 26.96061281161742] },
  vpu11:            { type: 'point', coords: [49.40637232059583, 26.949558684633583] },
  fire_ozerna:      { type: 'point', coords: [49.41597941516371, 26.96730935301169] },
  polytech_college: { type: 'point', coords: [49.433105048760645, 27.004598426962172] }
};


const places = {};
for (const [id, item] of Object.entries(PLACE_DATA)) {
  if (item.type === 'line') {
    places[id] = L.polyline(item.coords, LINE_NORMAL).addTo(map);
  } else {
    places[id] = L.circleMarker(item.coords, POINT_NORMAL).addTo(map);
  }
}


function resetAll(){
  for (const layer of Object.values(places)) {
    // line
    if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
      layer.setStyle(LINE_NORMAL);
    }
    // point
    if (layer instanceof L.CircleMarker) {
      layer.setStyle(POINT_NORMAL);
      layer.setRadius(POINT_NORMAL.radius);
    }
  }
}


function focusPlace(id){
  const layer = places[id];
  if (!layer) return;

  resetAll();

  if (layer instanceof L.Polyline) {
    layer.setStyle(LINE_ACTIVE);
    map.fitBounds(layer.getBounds(), { padding:[20,20] });
  } else if (layer instanceof L.CircleMarker) {
    layer.setStyle(POINT_ACTIVE);
    layer.setRadius(POINT_ACTIVE.radius);
    map.setView(layer.getLatLng(), 16);
  }
}


function setActiveButton(btn){
  document.querySelectorAll('.btn').forEach(b => b.classList.remove('active-btn'));
  btn.classList.add('active-btn');
}


document.querySelectorAll('button[data-id]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id    = btn.dataset.id;
    const title = btn.dataset.title || btn.textContent.trim();
    const full  = btn.dataset.full || '';
    const img   = btn.dataset.img  || '';

    setActiveButton(btn);
    setInfo(title, full, img);
    focusPlace(id);

 
    document.getElementById('infoBox').scrollIntoView({behavior:'smooth', block:'nearest'});
  });
});


setInfo(
  'Оберіть обʼєкт',
  'Натисніть кнопку — підсвітиться лише один обʼєкт на карті, а тут зʼявиться опис і фото.',
  ''
);

map.on('click', (e) => {
  const coord = `[${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}],`;
  console.log(coord);
  if (navigator.clipboard) navigator.clipboard.writeText(coord);
});