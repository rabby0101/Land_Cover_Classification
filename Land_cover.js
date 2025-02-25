
// Load Sentinel-2 Level-2A image collection and filter by date
var sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(study_area)
    .filterDate("2024-06-01", "2024-08-15")  // Summer imagery
    .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // Filter by cloud cover
    .median()
    .clip(study_area);
// Function to calculate all indices
function addIndices(image) {
  // NDVI (Normalized Difference Vegetation Index)
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');

  // NDWI (Normalized Difference Water Index)
  var ndwi = image.normalizedDifference(['B3', 'B8']).rename('NDWI');

  // MNDWI (Modified Normalized Difference Water Index)
  var mndwi = image.normalizedDifference(['B3', 'B11']).rename('MNDWI');

  // NDBI (Normalized Difference Built-up Index)
  var ndbi = image.normalizedDifference(['B11', 'B8']).rename('NDBI');

  // BSI (Bare Soil Index)
  var bsi = image.expression(
    '((B11 + B4) - (B8 + B2)) / ((B11 + B4) + (B8 + B2))', {
      'B11': image.select('B11'),
      'B4': image.select('B4'),
      'B8': image.select('B8'),
      'B2': image.select('B2')
    }).rename('BSI');
  // Add all indices to the image
  return image.addBands([ndvi, ndwi, mndwi, ndbi, bsi]);
}
// Add indices to the image
var imageWithIndices = addIndices(sentinel2);
// Select relevant bands for classification
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12', 'NDVI', 'NDWI', 'MNDWI', 'NDBI', 'BSI'];
var image = imageWithIndices.select(bands);
// Display the image on the map
var rgbVis = {bands: ['B4', 'B3', 'B2'], max: 3000};
var ndviVis = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(sentinel2, rgbVis, 'RGB Image');
Map.addLayer(imageWithIndices.select('NDVI'), ndviVis, 'NDVI', false);
Map.addLayer(study_area, {}, "Study Area");
Map.centerObject(study_area, 8);
// Define classification classes for Bayern
var classNames = [
  'Coniferous Forest', 
  'Deciduous Forest',
  'Cropland' ,
  'Urban/Built-up',
  'Water Bodies',
  'Bare Soil',

];
 var trainingFeatures = urban.merge(water_bodies).merge(coniferous_forest).merge(deciduous_forest).merge(crop_land).merge(bare_soil)
// 4. Sample the input imagery to get training data
var training = image.sampleRegions({
  collection: trainingFeatures,
  properties: ['class'],
  scale: 10
});
// 5. Train a Random Forest classifier (example - enable after collecting training data)
var classifier = ee.Classifier.smileRandomForest(100)
  .train({
    features: training,
    classProperty: 'class',
    inputProperties: bands
  });
// 6. Classify the image
var classified = image.classify(classifier);
// 7. Display classification
var classVis = {
  min: 1,
  max: 6,
  palette: [
    'ff0000', // Urban/Built-up - red
    '0000ff', // Water Bodies - blue
    '005e00', // Coniferous Forest - dark green
    '00cc00', // Deciduous Forest - green
    'e6e600', // Cropland - yellow
    'e6e6e6' // Bare Soil - light grey
  ]
};
Map.addLayer(classified, classVis, 'LULC Classification');
// 8. Calculate area statistics
var calculateArea = function(classification) {
  var areaImage = ee.Image.pixelArea().divide(10000); // Convert to hectares
  var areas = ee.List.sequence(1, 6);

  areas = areas.map(function(classNum) {
    var classImage = classification.eq(ee.Number(classNum));
    var classArea = classImage.multiply(areaImage).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: study_area,
      scale: 10,
      maxPixels: 1e10
    }).get('area');

    return ee.Feature(null, {
      'class': classNames[classNum],
      'area_ha': classArea
    });
  });

  return ee.FeatureCollection(areas);
};


// 9. Export classification and area statistics
Export.image.toDrive({
  image: classified,
  description: 'Bayern_LULC_Classification',
  scale: 10,
  region: study_area,
  maxPixels: 1e10
});