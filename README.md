# Bayern Land Use Land Cover (LULC) Classification

## Project Overview

This repository contains code and documentation for Land Use Land Cover (LULC) classification of Bavaria (Bayern), Germany using Google Earth Engine (GEE) and Sentinel-2 imagery. The classification employs a Random Forest machine learning algorithm to identify six distinct land cover classes across the region.

## Features

- Automated processing of Sentinel-2 imagery for summer months
- Calculation of multiple spectral indices (NDVI, NDWI, MNDWI, NDBI, BSI)
- Random Forest classification with 100 trees
- Area calculation for each land cover class
- Interactive visualization with legend and map elements

## Land Cover Classes

The classification includes six primary land cover classes:

1. Coniferous Forest
2. Deciduous Forest
3. Cropland
4. Urban/Built-up
5. Water Bodies
6. Bare Soil

## Technical Implementation

### Data Sources

- **Imagery**: Sentinel-2 Level-2A Surface Reflectance (Harmonized)
- **Time Period**: Summer 2024 (June 1 - August 15)
- **Cloud Filter**: Less than 10% cloud cover

### Spectral Indices

The classification incorporates the following spectral indices:

- **NDVI** (Normalized Difference Vegetation Index): Vegetation health and density
- **NDWI** (Normalized Difference Water Index): Water content in vegetation
- **MNDWI** (Modified Normalized Difference Water Index): Enhanced water detection
- **NDBI** (Normalized Difference Built-up Index): Urban and built-up areas
- **BSI** (Bare Soil Index): Exposed soil surfaces

### Classification Workflow

1. Image collection and preprocessing
2. Spectral indices calculation
3. Training data collection for each class
4. Random Forest classifier training
5. Image classification
6. Area calculation and statistics
7. Visualization and export

## Usage

### Prerequisites

- Google Earth Engine account
- Access to the GEE Code Editor

### Running the Classification

1. Copy the script to the GEE Code Editor
2. Define your study area (`study_area`)
3. Collect training data for each class
4. Run the classification
5. View results and export as needed

## Results

The classification produces:

- A classified image with six land cover classes
- Area statistics for each class (in hectares)
- Visualizations with legend and map elements

## Export Options

- GeoTIFF for use in desktop GIS software
- PNG/JPEG for direct visualization
- CSV of area statistics

## Visualization

The repository includes code for enhanced visualization directly in GEE, including:

- Custom color palette for each class
- Interactive legend
- Scale bar
- Title and description
- North arrow

