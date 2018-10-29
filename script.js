var products = [
  {name: "Wonder Woman Figurine", price: "12", image: "https://s3.amazonaws.com/mernbook/marketplace/wonder-woman-2977918_960_720.jpg"},
  {name: "Darth Vader Figurine", price: "19", image: "https://s3.amazonaws.com/mernbook/marketplace/star-wars-2463926_960_720.png"},
  {name: "Joker Figurine", price: "51", image: "https://s3.amazonaws.com/mernbook/marketplace/joker-1225051_960_720.jpg"},
  {name: "Tardis Figurine", price: "14", image: "https://s3.amazonaws.com/mernbook/marketplace/tardis.png"},
  {name: "Old Ford Car Model", price: "46", image: "https://s3.amazonaws.com/mernbook/marketplace/Ford.jpg"},
  {name: "Storm Trooper Figurine", price: "23", image: "https://s3.amazonaws.com/mernbook/marketplace/stormtrooper-1995015_960_720.jpg"}
];

var cart = localStorage.getItem('cart') 
  ? JSON.parse(localStorage.getItem('cart')) :
  {
    items: [],
    total: 0
  };

localStorage.setItem('cart', JSON.stringify(cart)); //need to stringify or else shows as object; not the actual names/values

$(document).ready(function(){
  products.forEach(function(product,index){ //products page
    var colDiv = $('<div>').addClass('col-md-4');
    var cardDiv = $('<div>').addClass('card');//addClass and attr(Attribute) do the same thing
    
    var productImage = $('<img>').addClass("card-img-top");
    productImage.attr('src', product.image);
    cardDiv.append(productImage);
    
    var cardBody = $('<div>').addClass('card-body');
    cardDiv.append(cardBody);
    
    var productTitle = $('<h5>').addClass('card-title').text(product.name);
    cardBody.append(productTitle);
    
    var productPrice = $('<p>').addClass('card-text').text("$" + product.price);
    cardBody.append(productPrice);
    
    var addToCartButton = $('<button>').addClass('btn btn-primary').text('Add to Cart').attr('id',index);
    addToCartButton.click(function(event){
      //console.log(event.target.id);
      var cartItem = products[event.target.id];
      cartItem.quantity = 1;
      cart.items.push(cartItem);
      cart.total = cart.items.length * cartItem.price;
      $("#itemNo").text(cart.items.length);
      $("#total").text(cart.total);
      localStorage.setItem('cart', JSON.stringify(cart)); //when add to cart button is clicked, saved to local storage, so when you refresh the data is still there
    });
    cardBody.append(addToCartButton);
    
    colDiv.append(cardDiv);
    $('#products-row').append(colDiv);
  });
  
  $("#itemNo").text(cart.items.length); //shows number of items in cart
  $("#total").text(cart.total);
  
  cart.items.forEach(function(item, index){
    var colDiv = $('<div>').addClass('col-md-4');
  
    var cardDiv = $('<div>').addClass('card');//addClass and attr(Attribute) do the same thing
    
    var productImage = $('<img>').addClass("card-img-top");
    productImage.attr('src', item.image);
    cardDiv.append(productImage);
    
    var cardBody = $('<div>').addClass('card-body');
    cardDiv.append(cardBody);
    
    var productTitle = $('<h5>').addClass('card-title').text(item.name);
    cardBody.append(productTitle);
    
    var productPrice = $('<p>').addClass('card-text').text("$"+item.price + " x ");
    cardBody.append(productPrice);
    
    var noOfProduct = $('<input type=number id=numOfProduct value=1 min=0>').bind('keyup mouseup', function(){
      item.quantity = $('#numOfProduct').val();
      //localStorage.setItem('cart', JSON.stringify(cart));
    });
    productPrice.append(noOfProduct);
    
    var addNewProduct =  $('<button>').addClass('btn btn-primary').text('Add').attr('id',index);
    addNewProduct.click(function(event){
      for (var i=0; i<item.quantity; i++){
        var cartItem = products[event.target.id];
        cart.items.push(cartItem); 
      }
      
      cart.total = cart.total + (item.price * item.quantity);
      
      $('#itemNo').text(cart.items.length);
      $('#total').text(cart.total);
      localStorage.setItem('cart', JSON.stringify(cart));
    });
    cardBody.append(addNewProduct);
    
    colDiv.append(cardDiv);
    $('#cart-row').append(colDiv);
  });
  
  $("#showCartBtn").click(function(){
    $("#cart").show();
    $("#products").hide();
    $("#showCartBtn").hide();
  });
  
  $("#close").click(function(){
    $("#cart").hide();
    $("#products").show();
    $("#showCartBtn").show();
  });
  
  console.log("Start here");
  // Basic tasks
  // 1. Show / hide cart section on button click (Cart button / close cutton)
  // 2. Dynamically load products to view
  // 3. Dynamically show total items in Cart
  // 4. Add to cart button functionality
  // 5. Dynamically load cart items
  // 6. Implement quantity update for each cart item and update total cost dynamically.
  // 7. Store and load cart from localStorage
});
