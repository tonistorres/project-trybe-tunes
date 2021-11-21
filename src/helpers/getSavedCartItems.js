// *****************
// Local Storage //😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
// ***************************************************************/
// ✅ 🤚🤚🤚 Pontuar: para ficar uma explicação mais explicita
// antes de esplicar sobre o getSavedCartItems  gostaria de pedir
// permissão para explicar saveCartItem.js  ficará mais claro
// após essa explicação elucidar getSavedCartItems
// ***************************************************************
const getSavedCartItems = () => localStorage.getItem('cartItems'); // ✅ 🤚🤚🤚 getItem - busca info. no localStorage essa função precisa 
// de um único parâmetor para capturar a info. que é a chave salva.

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
