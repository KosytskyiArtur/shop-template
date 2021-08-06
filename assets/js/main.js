const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = () => {
  cartCounterLabel.innerHTML = `${++cartCounter}`;
  if (cartCounter === 1) cartCounterLabel.style.display = 'block';
};

const getMockData = (t) => +t.parentElement
  .previousElementSibling
  .innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const disableControls = (t, fn) => {
  contentContainer.removeEventListener('click', fn);
  t.disabled = true;
};

const enableControls = (t, fn) => {
  contentContainer.addEventListener('click', fn);
  t.disabled = false;
};

const btnClickHandler = (e) => {
  const target = e.target;
  
  if (target && target.matches('.item-actions__cart')) {
    incrementCounter();

    cartPrice = getPrice(target, cartPrice);
    const restoreHTML = target.innerHTML;

    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
    disableControls(target, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      enableControls(target, btnClickHandler);
    }, 2000);
  }
};

contentContainer.addEventListener('click', btnClickHandler);
