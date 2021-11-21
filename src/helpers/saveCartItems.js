// ******************************************************************************************************
// localStorage - salva os dados sem data de expiração.😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
// Os dados não serão removidos quando o browser for fechado,
// ou seja, eles ficarão disponíveis enquanto não forem explicitamente removidos.
// link course: https://app.betrybe.com/course/fundamentals/javascript-dom-eventos-e-web-storage/javascript-web-storage/b332393f-7548-4075-83e3-f632735efb95/conteudos/a69f590a-b7be-4821-959e-75204430d057/local-e-session-storage/6da4a8cf-1a42-47c9-b271-a4df5f2ba5a3?use_case=next_button
// ******************************************************************************************************
const saveCartItems = (item) => {
  localStorage.setItem('cartItems', item); // ✅ 🤚🤚🤚 setItem função que salva info. no localStorage essa função precisa de 2 parâmentro chave valor
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
