var cache = CacheService.getPublicCache();

function TransitMeters(origin, destination) {
  var keyName = makeKeyname(origin, destination);
  var cachedValue = getCachedValue(keyName);
  if (cachedValue != null) {
    return cachedValue;
  }

  origin = convertStationNameToLatLong(origin);
  destination = convertStationNameToLatLong(destination);

  var directions = Maps.newDirectionFinder()
  .setOrigin(origin)
  .setDestination(destination)
  .setMode("transit")
  .getDirections();
  var distance = directions.routes[0].legs[0].distance.value;
  addToCache(keyName, distance);
  return distance;
}

function TransitMiles(origin, destination) {
  return TransitMeters(origin, destination)/1609.34;
}

function makeKeyname(origin, destination) {
  var combined = origin + destination;
  combined = combined.replace(/\s+/g, '').toLowerCase();
  combined = combined.split('').sort().join('')
}

function getCachedValue(keyName) {
  var cached = cache.get(keyName);
  if (cached == null) {
    return null;
  } else {
    return Number(cached);
  }
}

function addToCache(key, numericValue) {
  var stringVaule = numericValue.toString();
  cache.put(key, stringVaule);
}

function convertStationNameToLatLong(input) {
  var toTest = input.replace(/\s+/g, '').toLowerCase();
  if (toTest == "mineral") {
    input = "39.580168, -105.024770";
  } else if (toTest == "sportsauthorityfield") {
    input = "39.743563, -105.013451";
  } else if (toTest == "unionstation") {
    input = "39.755099, -105.003250";
  } else if (toTest == "jeffcogovernmentcenter") {
    input = "39.726421, -105.200905";
  } else if (toTest == "colfaxatauraria") {
    input = "39.740273, -105.002002";
  } else if (toTest == "du") {
    input = "39.685180, -104.964736";
  } else if (toTest == "16thandcalifornia") {
    input = "39.744677, -104.992750";
  }  else if (toTest == "decatur/federal") {
    input = "39.737162, -105.024401";
  }  else if (toTest == "broadway") {
    input = "39.701904, -104.990057";
  }  else if (toTest == "sheridan") {
    input = "39.735000, -105.053333";
  }  else if (toTest == "perry") {
    input = "39.734693, -105.039567";
  }  else if (input == "knox") {
    input = "39.735700, -105.033280";
  }  else if (toTest == "aurariawest") {
    input = "39.741302, -105.010696";
  }  else if (toTest == "16thandstout") {
    input = "39.746081, -104.992838";
  }  else if (toTest == "littleton") {
    input = "39.611957, -105.014938";
  }  else if (toTest == "englewood") {
    input = "39.655316, -104.999952";
  } else if (toTest == "countyline") {
    input = "39.561854, -104.872301";
  }  else {
    throw "Station \"" + input + "\" not found. Use code \"" + toTest + "\".";  // Simplify adding new stations
  }  // Add more when they are used.

  return input;
}
