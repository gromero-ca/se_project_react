import cap from '../assets/clothing-cap.png'
import sneakers from '../assets/clothing-sneakers.png'
import shorts from '../assets/clothing-shorts.png'
import tShirt from '../assets/clothing-t-shirt.png'

const defaultClothingItems = [
  { _id: 1, name: 'T-Shirt', weather: 'warm', link: tShirt },
  { _id: 2, name: 'Shorts', weather: 'warm', link: shorts },
  { _id: 3, name: 'Cap', weather: 'warm', link: cap },
  { _id: 4, name: 'Sneakers', weather: 'warm', link: sneakers },
  {
    _id: 5,
    name: 'Boot',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Boot.png?etag=0953a2ea59f1c6ebc832fabacdc9c70e',
  },
  {
    _id: 6,
    name: 'Coat',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4',
  },
  {
    _id: 7,
    name: 'Dress',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Dress.png?etag=1f9cd32a311ab139cab43494883720bf',
  },
  {
    _id: 8,
    name: 'Hoodie',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8',
  },
  {
    _id: 9,
    name: 'Jacket',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad',
  },
  {
    _id: 10,
    name: 'Jeans',
    weather: 'warm',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jeans.png?etag=58345e8bef1ce5f95ac882e71d309e6c',
  },
  {
    _id: 11,
    name: 'Loafers',
    weather: 'warm',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Loafers.png?etag=dc2d6e1ca7b297597406e35c40aef030',
  },
  {
    _id: 12,
    name: 'Sandals',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sandals.png?etag=9bea85a77c0306586d2b71a33b626d41',
  },
  {
    _id: 13,
    name: 'Scarf',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Scarf.png?etag=74efbee93810c926b5507e862c6cb76c',
  },
  {
    _id: 14,
    name: 'Skirt',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Skirt.png?etag=27a6bea7e1b63218820d615876fa31d1',
  },
  {
    _id: 15,
    name: 'Sunglasses',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sunglasses.png?etag=a1bced9e331d36cb278c45df51150432',
  },
  {
    _id: 16,
    name: 'Sweatshirt',
    weather: 'warm',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sweatshirt.png?etag=008a9674757bea2e0bdb31242e364be0',
  },
]

export { defaultClothingItems }
