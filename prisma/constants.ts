export const categories = [
  {
    name: 'Pizzas',
  },
  {
    name: 'Breakfast',
  },
  {
    name: 'Snacks',
  },
  {
    name: 'Cocktails',
  },
  {
    name: 'Drinks',
  },
];

export const ingredients = [
  {
    name: 'Cheese board',
    price: 3,
    imageUrl:
      '/assets/images/ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Creamy mozzarella',
    price: 2,
    imageUrl:
      '/assets/images/ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Cheddar and Parmesan cheeses',
    price: 1,
    imageUrl: '/assets/images/ingredients/000D3A22FA54A81411E9AFA69C1FE796.png',
  },
  {
    name: 'Hot jalapeño peppers',
    price: 1,
    imageUrl:
      '/assets/images/ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Tender chicken',
    price: 1,
    imageUrl: '/assets/images/ingredients/000D3A39D824A82E11E9AFA5B328D35A.png',
  },
  {
    name: 'Champignons',
    price: 2,
    imageUrl: '/assets/images/ingredients/000D3A22FA54A81411E9AFA67259A324.png',
  },
  {
    name: 'Ham',
    price: 3,
    imageUrl: '/assets/images/ingredients/000D3A39D824A82E11E9AFA61B9A8D61.png',
  },
  {
    name: 'Spicy pepperoni',
    price: 1,
    imageUrl: '/assets/images/ingredients/000D3A22FA54A81411E9AFA6258199C3.png',
  },
  {
    name: 'Spicy chorizo',
    price: 2,
    imageUrl: '/assets/images/ingredients/000D3A22FA54A81411E9AFA62D5D6027.png',
  },
  {
    name: 'Pickles',
    price: 2,
    imageUrl: '/assets/images/ingredients/Ingredients/000D3A21DA51A81211E9EA89958D782B.png',
  },
  {
    name: 'Fresh tomatoes',
    price: 3,
    imageUrl: '/assets/images/ingredients/000D3A39D824A82E11E9AFA7AC1A1D67.png',
  },
  {
    name: 'Red onion',
    price: 1,
    imageUrl: '/assets/images/ingredients/000D3A22FA54A81411E9AFA60AE6464C.png',
  },
  {
    name: 'Juicy pineapples',
    price: 2,
    imageUrl: '/assets/images/ingredients/000D3A21DA51A81211E9AFA6795BA2A0.png',
  },
  {
    name: 'Italian herbs',
    price: 3,
    imageUrl:
      '/assets/images/ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Sweet peppers',
    price: 3,
    imageUrl: '/assets/images/ingredients/000D3A22FA54A81411E9AFA63F774C1B.png',
  },
  {
    name: 'Diced bryndza',
    price: 2,
    imageUrl: '/assets/images/ingredients/000D3A39D824A82E11E9AFA6B0FFC349.png',
  },
  {
    name: 'Mitballs',
    price: 3,
    imageUrl:
      '/assets/images/ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Ham-Mush Omelette',
    imageUrl:
      '/assets/images/products/11EE7970321044479C1D1085457A36EB.webp',
    categoryId: 2,
  },
  {
    name: 'Omelette with pepperoni',
    imageUrl:
      '/assets/images/products/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
    categoryId: 2,
  },
  {
    name: 'Caffe Latte',
    imageUrl:
      '/assets/images/products/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    categoryId: 2,
  },
  {
    name: 'Danwich ham and cheese',
    imageUrl:
      '/assets/images/products/11EE796FF0059B799A17F57A9E64C725.webp',
    categoryId: 3,
  },
  {
    name: 'Chicken nuggets',
    imageUrl:
      '/assets/images/products/11EE7D618B5C7EC29350069AE9532C6E.webp',
    categoryId: 3,
  },
  {
    name: 'Oven Potatoes & Gravy 🌱',
    imageUrl:
      '/assets/images/products/11EED646A9CD324C962C6BEA78124F19.webp',
    categoryId: 3,
  },
  {
    name: 'Dodster',
    imageUrl:
      '/assets/images/products/11EE796F96D11392A2F6DD73599921B9.webp',
    categoryId: 3,
  },
  {
    name: 'Sharp Dodster 🌶️🌶️',
    imageUrl:
      '/assets/images/products/11EE796FD3B594068F7A752DF8161D04.webp',
    categoryId: 3,
  },
  {
    name: 'Banana milkshake',
    imageUrl:
      '/assets/images/products/11EEE20B8772A72A9B60CFB20012C185.webp',
    categoryId: 4,
  },
  {
    name: 'Caramel apple milkshake',
    imageUrl:
      '/assets/images/products/11EE79702E2A22E693D96133906FB1B8.webp',
    categoryId: 4,
  },
  {
    name: 'Oreo Milkshake',
    imageUrl:
      '/assets/images/products/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
    categoryId: 4,
  },
  {
    name: 'Classic milkshake 👶',
    imageUrl:
      '/assets/images/products/11EE796F93FB126693F96CB1D3E403FB.webp',
    categoryId: 4,
  },
  {
    name: 'Caramel Cappuccino',
    imageUrl:
      '/assets/images/products/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
    categoryId: 5,
  },
  {
    name: 'Coconut Latte',
    imageUrl:
      '/assets/images/products/11EE7D61B19FA07090EE88B0ED347F42.webp',
    categoryId: 5,
  },
  {
    name: 'Americano',
    imageUrl:
      '/assets/images/products/11EE7D61B044583596548A59078BBD33.webp',
    categoryId: 5,
  },
  {
    name: 'Latte',
    imageUrl:
      '/assets/images/products/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    categoryId: 5,
  },
];