var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require("url");


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var getPeersData = function(euiType, keepOutliers,numberOfBins, autoBin, classType, facilityType, floorArea, yearBuilt, hoursOcc, numPeople, climateZone, state, zipCode, lighting, heating, cooling, windowGlassType, windowGlassLayer,airFlowControl,wallInsulation,roofCeil){

    var payload = JSON.stringify({
    "filters": {
      "classification_type": classType,
      "facility_type":facilityType,
      "floor_area":floorArea,
      "year_built":yearBuilt,
      "hours_occupied":hoursOcc,
      "number_of_people":numPeople,
      "climate_zone": climateZone,
      "state":state,
      "zip_code": zipCode,
      "lighting":lighting,
      "heating":heating,
      "cooling":cooling,
      "window_glass_type":windowGlassType,
      "window_glass_layers":windowGlassLayer,
      "air_flow_control":airFlowControl,
      "wall_insulation_r_value":wallInsulation,
      "roof_ceiling":roofCeil },
    "eui_type": euiType,
    "keep_outliers":keepOutliers,
    "number_of_bins": numberOfBins,
    "auto_bin":autoBin
    });

    var requestOpt = {
        host: 'https://bpd.lbl.gov/api/v1',
        path: '/analyze/peers/',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'ApiKey jmyers2@umbc.edu:280986460473094ea2e6ab513a9858d13be6bcd3',
        method: 'POST'
    }};

   var post_req = http.request(requestOpt, function(res) {  
      res.setEncoding('utf8');  
      res.on('data', function (chunk) {  
        console.log('Response: ' + chunk);
        console.log(chunk); 
      });  
      }).on('error',function(e){
          console.log("Error: " + e.message); 
      }); ;  

      console.log("SENT PEERS DATA");
      post_req.write(payload);  
      post_req.end(); 

};

var getCountsPerState = function(classType, facilityType, floorArea, yearBuilt, hoursOcc, numPeople, climateZone, state, zipCode, lighting, heating, cooling, windowGlassType, windowGlassLayer,airFlowControl,wallInsulation,roofCeil){

    var payload = JSON.stringify({
      "filters": {
        "classification_type": classType,
        "facility_type":facilityType,
        "floor_area":floorArea,
        "year_built":yearBuilt,
        "hours_occupied":hoursOcc,
        "number_of_people":numPeople,
        "climate_zone": climateZone,
        "state":state,
        "zip_code": zipCode,
        "lighting":lighting,
        "heating":heating,
        "cooling":cooling,
        "window_glass_type":windowGlassType,
        "window_glass_layers":windowGlassLayer,
        "air_flow_control":airFlowControl,
        "wall_insulation_r_value":wallInsulation,
        "roof_ceiling":roofCeil }});

    var requestOpt = {
        host: 'https://bpd.lbl.gov/api/v1',
        path: '/analyze/counts-per-state/',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'ApiKey jmyers2@umbc.edu:280986460473094ea2e6ab513a9858d13be6bcd3',
        method: 'POST'
        }};

   var post_req = http.request(requestOpt, function(res) {  
      res.setEncoding('utf8');  
      res.on('data', function (chunk) {  
        console.log('Response: ' + chunk);
      });  
      }).on('error',function(e){
          console.log("Error: " + e.message); 
      }); ;  
      post_req.write(payload);  
      post_req.end(); 

};

var getCompareEUI = function(buildingSystem, from, to, confidence, classType, facilityType, floorArea, yearBuilt, hoursOcc, numPeople, climateZone, state, zipCode, lighting, heating, cooling, windowGlassType, windowGlassLayer,airFlowControl,wallInsulation,roofCeil){

    var payload = JSON.stringify({
      "filters": {
        "classification_type": classType,
        "facility_type":facilityType,
        "floor_area":floorArea,
        "year_built":yearBuilt,
        "hours_occupied":hoursOcc,
        "number_of_people":numPeople,
        "climate_zone": climateZone,
        "state":state,
        "zip_code": zipCode,
        "lighting":lighting,
        "heating":heating,
        "cooling":cooling,
        "window_glass_type":windowGlassType,
        "window_glass_layers":windowGlassLayer,
        "air_flow_control":airFlowControl,
        "wall_insulation_r_value":wallInsulation,
        "roof_ceiling":roofCeil },
      "building_system": buildingSystem,
      "from":from,
      "to":to,
      "confidence": confidence
      });

    var requestOpt = {
        host: 'https://bpd.lbl.gov/api/v1',
        path: '/analyze/compare/eui/',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'ApiKey jmyers2@umbc.edu:280986460473094ea2e6ab513a9858d13be6bcd3',
        method: 'POST'
        }};

   var post_req = http.request(requestOpt, function(res) {  
      res.setEncoding('utf8');  
      res.on('data', function (chunk) {  
        console.log('Response: ' + chunk);
      });  
      }).on('error',function(e){
          console.log("Error: " + e.message); 
      }); ;  
      post_req.write(payload);  
      post_req.end(); 

};
exports.handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
   var userRequestUrl =  request.url;
   //if the request is for signing up a user
   if(userRequestUrl === '/peer/'){

     if(request.method === 'POST'){
        var body = '';
        request.on('data', function (data) {
          body += data;
        });
        request.on('end', function () {
          var peerData = JSON.parse(body);

          var getPeersResponse = getPeersData(peerData.euiType, peerData.keepOutliers,peerData.numberOfBins, peerData.autoBin, peerData.classType, peerData.facilityType, peerData.floorArea, peerData.yearBuilt, peerData.hoursOcc, peerData.numPeople,, peerData.climateZone, peerData.state, peerData.zipCode, peerData.lighting, peerData.heating, peerData.cooling, peerData.windowGlassType, peerData.windowGlassLayer,peerData.airFlowControl,peerData.wallInsulation,peerData.roofCeil);

           response.end(getPeersResponse);
        });
        //check if username is already in the database, if it isn't add it
        response.end("No Object");
     }

   } else if (userRequestUrl === '/counts-per-state/'){

        if(request.method === 'POST'){
          var body = '';
          request.on('data', function (data) {
          body += data;
        });
        request.on('end', function () {
          var countObj = JSON.parse(body);

          var getCountsResponse = getCountsPerState(countObj.classType,countObj.facilityType, countObj.floorArea, countObj.yearBuilt, countObj.hoursOcc, countObj.numPeople, countObj.climateZone, countObj.state, countObj.zipCode, countObj.lighting, countObj.heating, countObj.cooling, countObj.windowGlassType, countObj.windowGlassLayer,countObj.airFlowControl,countObj.wallInsulation,countObj.roofCeil);

           response.end(getCountsResponse);
        });
        //check if username is already in the database, if it isn't add it
        response.end("No Object");
     }

   } else if (userRequestUrl === '/compare/') {
      if(request.method === 'POST'){
        var body = '';
        request.on('data', function (data) {
          body += data;
        });
        request.on('end', function () {
          var compareData = JSON.parse(body);

          var getCompareResponse = getCompareEUI(compareData.buildingSystem, compareData.from, compareData.to, compareData.confidence, compareData.classType, compareData.facilityType, compareData.floorArea, compareData.yearBuilt, compareData.hoursOcc, compareData.numPeople,compareData.climateZone, compareData.state, compareData.zipCode,compareData.lighting, compareData.heating, compareData.cooling, compareData.windowGlassType, compareData.windowGlassLayer,compareData.airFlowControl,compareData.wallInsulation,compareData.roofCeil);

           response.end(getCompareResponse);
        });
        //check if username is already in the database, if it isn't add it
        response.end("No Object");
     }
     }
      
   } else {
    /* "Status code" and "headers" are HTTP concepts that you can
     * research on the web as and when it becomes necessary. */
    var statusCode = 200;
    var filePath = '.' + request.url;
      if(filePath === './'){
        filePath = './index.html';
      }
    var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch(extname){
          case '.js':
            contentType = 'text/javascript';
            break;
          case '.css':
            contentType = 'text/css';
            break;
        }
    console.log("FILEPATH: " + filePath);
    path.exists(filePath, function(exists){
    if(exists){
      fs.readFile(filePath, function(error, content){
        if(error){
          response.writeHead(500);
          response.end();
        } else {
          response.writeHead(200, {'Content-Type': contentType});
          response.end(content, 'utf-8');
        }
      });
      } else {
        response.writeHead(404);
        response.end();
        }
      });
  }
};
