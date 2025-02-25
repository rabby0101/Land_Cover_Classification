# Bayern Land Cover Classification

## Project Overview

This repository contains code and documentation for Land Use Land Cover (LULC) classification of Bavaria (Bayern), Germany using Google Earth Engine (GEE) and Sentinel-2 imagery. The classification employs a Random Forest machine learning algorithm to identify six distinct land cover classes across the region.

## Features

- Automated processing of Sentinel-2 imagery for summer months
- Calculation of multiple spectral indices (NDVI, NDWI, MNDWI, NDBI, BSI)
- Random Forest classification with 100 trees


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
- **Time Period**: Summer 2024 (June 15 - August 15)
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
2. Define study area (`study_area.zip`)
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
## Results

<img width="1440" alt="Screenshot 2025-02-25 at 23 38 18" src="https://github.com/user-attachments/assets/87fb6141-0523-4b27-a2be-7b98fd7794c6" />


