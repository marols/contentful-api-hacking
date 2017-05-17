var contentfulClient = contentful.createClient({
accessToken: '0d6b205ef44d41d94eb9bea4e3bc5dea5d1f24c9df5c65d46fa3ddae4cf770fc',
  space: 'ittp51qu53jg'
})

var container = document.getElementById('content')

contentfulClient.getAssets({ limit: 1000 })
  .then(function (assets) {
    container.innerHTML = renderProducts(assets.items)
 })
  .catch(function (e) {
    console.log(e);
  });

function renderProducts(products) {
  return '<h1>Contentful API Hacking</h1>' +
    '<div class="images">' +
    products.sort(sortArray).map(renderSingleProduct).join("") +
    '</div>'
}

function sortArray(a, b) {
  var nameA = a.fields.title.toUpperCase();
  var nameB = b.fields.title.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;  
}

function renderSingleProduct(product) {
  var imageURL = 'https:' + product.fields.file.url;      
  return '<div class="image-list">' +
    '<div class="image">' +
    '<img src="' + imageURL + '" width="15" height="15" />' +
    '</div>' +
    '</div>'
}