import {
  bakery,
  bakingNeeds,
  freshFruit,
  beautyHealth,
  beverages,
  cooking,
  diabeticFood,
  freshVegetables,
  MeatFish,
  oil,
  snacks,
  dishDetergents,
} from '../../assets/images/topCategory/topCategoryImg';

const categories = [
  {
    name: 'Fresh Fruit',
    img: freshFruit,
    path: '/category/freshFruit',
  },
  {
    name: 'bakery',
    img: bakery,
    path: '/category/bakery',
  },

  {
    name: 'baking',
    img: bakingNeeds,
    path: '/category/baking',
  },
  {
    name: 'beauty & health',
    img: beautyHealth,
    path: '/category/beautyHealth',
  },
  {
    name: 'beverages',
    img: beverages,
    path: '/category/beverages',
  },
  {
    name: 'cooking',
    img: cooking,
    path: '/category/cooking',
  },
  {
    name: 'diabetic Food',
    img: diabeticFood,
    path: '/category/diabetic',
  },
  {
    name: 'dish Detergents',
    img: dishDetergents,
    path: '/category/detergent',
  },
  {
    name: 'snacks',
    img: snacks,
    path: '/category/snacks',
  },
  {
    name: 'oil',
    img: oil,
    path: '/category/oil',
  },
  {
    name: 'Meat Fish',
    img: MeatFish,
    path: '/category/fish',
  },
  {
    name: 'fresh Vegetables',
    img: freshVegetables,
    path: '/category/freshVegetables',
  },
];

export default categories;
