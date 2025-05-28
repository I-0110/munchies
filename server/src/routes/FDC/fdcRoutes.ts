import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()
const API_KEY = process.env.FDC_API_KEY

// GET FDC ID from ingredient name

// Example response:
// [
//   {
//     "fdcId": 1662203,
//     "description": "GARLIC",
//     "dataType": "Branded",
//     "publicationDate": "2021-03-19",
//     "brandOwner": "Spice World, Inc.",
//     "gtinUpc": "070969001462",
//     "foodNutrients": [
//       {
//         "number": "203",
//         "name": "Protein",
//         "amount": 0E-8,
//         "unitName": "G",
//         "derivationCode": "LCCS",
//         "derivationDescription": "Calculated from value per serving size measure"
//       },
//       {
//         "number": "204",
//         "name": "Total lipid (fat)",
//         "amount": 0E-8,
//         "unitName": "G",
//         "derivationCode": "LCCD",
//         "derivationDescription": "Calculated from a daily value percentage per serving size measure"
//       },
//       {
//         "number": "205",
//         "name": "Carbohydrate, by difference",
//         "amount": 33.3,
//         "unitName": "G",
//         "derivationCode": "LCCS",
//         "derivationDescription": "Calculated from value per serving size measure"
//       },
//       {
//         "number": "208",
//         "name": "Energy",
//         "amount": 167,
//         "unitName": "KCAL",
//         "derivationCode": "LCCS",
//         "derivationDescription": "Calculated from value per serving size measure"
//       },
//       {
//         "number": "301",
//         "name": "Calcium, Ca",
//         "amount": 667,
//         "unitName": "MG",
//         "derivationCode": "LCCD",
//         "derivationDescription": "Calculated from a daily value percentage per serving size measure"
//       },
//       {
//         "number": "307",
//         "name": "Sodium, Na",
//         "amount": 0E-8,
//         "unitName": "MG",
//         "derivationCode": "LCCD",
//         "derivationDescription": "Calculated from a daily value percentage per serving size measure"
//       },
//       {
//         "number": "401",
//         "name": "Vitamin C, total ascorbic acid",
//         "amount": 80.0,
//         "unitName": "MG",
//         "derivationCode": "LCCD",
//         "derivationDescription": "Calculated from a daily value percentage per serving size measure"
//       },
//       {
//         "number": "605",
//         "name": "Fatty acids, total trans",
//         "amount": 0E-8,
//         "unitName": "G",
//         "derivationCode": "LCCS",
//         "derivationDescription": "Calculated from value per serving size measure"
//       }
//     ]
//   }
// ]

router.get('/:ingredient', async (req: Request, res: Response) => {
    const { ingredient } = req.query
    if (!ingredient) {
        return res.status(400).json({ error: 'Ingredient name is required' })
    }
    try {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${API_KEY}&query=${ingredient}&pageSize=1`)

        if (response.ok) {
            const data = await response.json()
            if (Array.isArray(data) && data.length > 0) {
                return res.json({ fdcId: String(data[0].fdcId) })
            } else {
                return res.status(404).json({ error: 'item not found' })
            }
        } else {
            return res.status(response.status).json({ error: 'Error fetching FDC data' })
        }
    }
    catch (err) {
        console.error('Error fetching FDC data:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
})


// GET single food item details by FDC ID

// Example response:
// {
//   "discontinuedDate": "",
//   "foodComponents": [],
//   "foodAttributes": [
//     {
//       "id": 1709610,
//       "value": 10,
//       "name": "Added Brand/Sub Brand Information"
//     }
//   ],
//   "foodPortions": [],
//   "fdcId": 1662203,
//   "description": "GARLIC",
//   "publicationDate": "3/19/2021",
//   "foodNutrients": [
//     {
//       "type": "FoodNutrient",
//       "nutrient": {
//         "id": 1087,
//         "number": "301",
//         "name": "Calcium, Ca",
//         "rank": 5300,
//         "unitName": "mg"
//       },
//       "foodNutrientDerivation": {
//         "id": 75,
//         "code": "LCCD",
//         "description": "Calculated from a daily value percentage per serving size measure"
//       },
//       "id": 17394815,
//       "amount": 667.0
//     },
//     {
//       "type": "FoodNutrient",
//       "nutrient": {
//         "id": 1004,
//         "number": "204",
//         "name": "Total lipid (fat)",
//         "rank": 800,
//         "unitName": "g"
//       },
//       "foodNutrientDerivation": {
//         "id": 75,
//         "code": "LCCD",
//         "description": "Calculated from a daily value percentage per serving size measure"
//       },
//       "id": 17394812,
//       "amount": 0E-8
//     },
//     {
//       "type": "FoodNutrient",
//       "nutrient": {
//         "id": 1162,
//         "number": "401",
//         "name": "Vitamin C, total ascorbic acid",
//         "rank": 6300,
//         "unitName": "mg"
//       },
//       "foodNutrientDerivation": {
//         "id": 75,
//         "code": "LCCD",
//         "description": "Calculated from a daily value percentage per serving size measure"
//       },
//       "id": 17394817,
//       "amount": 80.0
//     },
//     {
//       "type": "FoodNutrient",
//       "nutrient": {
//         "id": 1008,
//         "number": "208",
//         "name": "Energy",
//         "rank": 300,
//         "unitName": "kcal"
//       },
//       "foodNutrientDerivation": {
//         "id": 70,
//         "code": "LCCS",
//         "description": "Calculated from value per serving size measure"
//       },
//       "id": 17394814,
//       "amount": 167.0
//     },
//     {
//       "type": "FoodNutrient",
//       "nutrient": {
//         "id": 1093,
//         "number": "307",
//         "name": "Sodium, Na",
//         "rank": 5800,
//         "unitName": "mg"
//       },
//       "foodNutrientDerivation": {
//         "id": 75,
//         "code": "LCCD",
//         "description": "Calculated from a daily value percentage per serving size measure"
//       },
//       "id": 17394816,
//       "amount": 0E-8
//     },
//     {
//       "type": "FoodNutrient",
//       "nutrient": {
//         "id": 1005,
//         "number": "205",
//         "name": "Carbohydrate, by difference",
//         "rank": 1110,
//         "unitName": "g"
//       },
//       "foodNutrientDerivation": {
//         "id": 70,
//         "code": "LCCS",
//         "description": "Calculated from value per serving size measure"
//       },
//       "id": 17394813,
//       "amount": 33.33
//     },
//     {
//       "type": "FoodNutrient",
//       "nutrient": {
//         "id": 1003,
//         "number": "203",
//         "name": "Protein",
//         "rank": 600,
//         "unitName": "g"
//       },
//       "foodNutrientDerivation": {
//         "id": 70,
//         "code": "LCCS",
//         "description": "Calculated from value per serving size measure"
//       },
//       "id": 17394811,
//       "amount": 0E-8
//     },
//     {
//       "type": "FoodNutrient",
//       "nutrient": {
//         "id": 1257,
//         "number": "605",
//         "name": "Fatty acids, total trans",
//         "rank": 15400,
//         "unitName": "g"
//       },
//       "foodNutrientDerivation": {
//         "id": 70,
//         "code": "LCCS",
//         "description": "Calculated from value per serving size measure"
//       },
//       "id": 17394818,
//       "amount": 0E-8
//     }
//   ],
//   "dataType": "Branded",
//   "foodClass": "Branded",
//   "modifiedDate": "10/12/2017",
//   "availableDate": "10/12/2017",
//   "brandOwner": "Spice World, Inc.",
//   "brandName": "SPICE WORLD",
//   "dataSource": "LI",
//   "brandedFoodCategory": "Pre-Packaged Fruit & Vegetables",
//   "gtinUpc": "070969001462",
//   "householdServingFullText": "1 CLOVE",
//   "ingredients": "",
//   "marketCountry": "United States",
//   "servingSize": 3.0,
//   "servingSizeUnit": "g",
//   "foodUpdateLog": [
//     {
//       "discontinuedDate": "",
//       "foodAttributes": [],
//       "fdcId": 1662203,
//       "description": "GARLIC",
//       "publicationDate": "3/19/2021",
//       "dataType": "Branded",
//       "foodClass": "Branded",
//       "modifiedDate": "10/12/2017",
//       "availableDate": "10/12/2017",
//       "brandOwner": "Spice World, Inc.",
//       "brandName": "SPICE WORLD",
//       "dataSource": "LI",
//       "brandedFoodCategory": "Pre-Packaged Fruit & Vegetables",
//       "gtinUpc": "070969001462",
//       "householdServingFullText": "1 CLOVE",
//       "ingredients": "",
//       "marketCountry": "United States",
//       "servingSize": 3.0,
//       "servingSizeUnit": "g"
//     },
//     {
//       "discontinuedDate": "",
//       "foodAttributes": [],
//       "fdcId": 1369994,
//       "description": "GARLIC",
//       "publicationDate": "2/26/2021",
//       "dataType": "Branded",
//       "foodClass": "Branded",
//       "modifiedDate": "10/12/2017",
//       "availableDate": "10/12/2017",
//       "brandOwner": "Spice World, Inc.",
//       "brandName": "SPICE WORLD",
//       "subbrandName": "",
//       "dataSource": "LI",
//       "brandedFoodCategory": "Pre-Packaged Fruit & Vegetables",
//       "gtinUpc": "070969001462",
//       "householdServingFullText": "1 CLOVE",
//       "ingredients": "",
//       "marketCountry": "United States",
//       "servingSize": 3.0,
//       "servingSizeUnit": "g",
//       "packageWeight": "",
//       "notaSignificantSourceOf": ""
//     }
//   ],
//   "labelNutrients": {
//     "fat": { "value": 0.0 },
//     "transFat": { "value": 0.0 },
//     "sodium": { "value": 0.0 },
//     "carbohydrates": { "value": 1.0 },
//     "protein": { "value": 0.0 },
//     "calcium": { "value": 20.0 },
//     "calories": { "value": 5.01 }
//   }
// }
router.get('/food/:fdcId', async (req: Request, res: Response) => {
    const { fdcId } = req.params
    if (!fdcId) {
        return res.status(400).json({ error: 'FDC ID is required' })
    }
    try {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${API_KEY}`)

        if (response.ok) {
            const data = await response.json()
            return res.json(data)
        } else {
            return res.status(response.status).json({ error: 'Food item not found' })
        }
    }
    catch (err) {
        console.error('Error fetching FDC data:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
})


export default router