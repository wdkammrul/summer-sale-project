let isCouponApplied = false;

function handleClick(card) {
  if (isCouponApplied) {
    return;
  }

  const productName = card.querySelector(".card-name-price.font-semibold").innerText;
  const productPrice = parseFloat(
    card.querySelector(".card-name-price.font-normal").innerText.replace(" TK", "")
  );

  const selectedItemsContainer = document.getElementById("selected-items");
  const totalText = document.getElementById("total-text");

  const newItem = document.createElement("li");
  newItem.innerText = productName

  selectedItemsContainer.appendChild(newItem);

  let total = parseFloat(totalText.innerText.replace("Total Price:", ""));
  total += productPrice;
  totalText.innerText = `Total Price: ${total.toFixed(2)} TK`;

  const makePurchaseButton = document.querySelector(".make-purchase-btn");
  if (total > 0) {
    makePurchaseButton.removeAttribute("disabled");
  } else {
    makePurchaseButton.setAttribute("disabled", true);
  }

   const applyButton = document.getElementById("apply-btn");

   if (total > 200) {
     applyButton.removeAttribute("disabled");
   } else {
     applyButton.setAttribute("disabled", true);
   }

    const totalElement = document.querySelector(".total");
    totalElement.innerText = `Total: ${total.toFixed(2)} TK`;
}

function applyCoupon() {
  if (isCouponApplied) {
    return;
  }

  const couponCode = document.querySelector(".coupon-input").value;
  const totalText = document.getElementById("total-text");
  let total = parseFloat(totalText.innerText.replace("Total Price:", ""));


  if (couponCode === "SELL200") {
    const discount = total * 0.2;
    const discountedTotal = total - discount;

    const discountElement = document.querySelector(".discount");
    const totalElement = document.querySelector(".total");

    discountElement.innerText = `Discount: ${discount.toFixed(2)} TK`;
    totalElement.innerText = `Total: ${discountedTotal.toFixed(2)} TK`;
    isCouponApplied = true;
  }
}


document.querySelector(".apply-btn").addEventListener("click", applyCoupon);

const cardElements = document.querySelectorAll(".card");
cardElements.forEach((card) => {
  card.addEventListener("click", (card) => {
    handleClick(card);
  });
});


function resetBtn() {
  isCouponApplied = false;

  const selectedItemsContainer = document.getElementById("selected-items");
  selectedItemsContainer.innerHTML = "";

  const totalText = document.getElementById("total-text");
  totalText.innerText = "Total Price: 0.00 TK";

  const discountElement = document.querySelector(".discount");
  const totalElement = document.querySelector(".total");

  discountElement.innerText = "Discount: 0.00 TK";
  totalElement.innerText = "Total: 0.00 TK";

  const makePurchaseButton = document.querySelector(".make-purchase-btn");
  makePurchaseButton.setAttribute("disabled", true);

  const applyButton = document.getElementById("apply-btn");
  applyButton.setAttribute("disabled", true);

  modal.close();
}
