import { initializeApp } from
"https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs
}
from
"https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "API_KEY",
authDomain: "PROJECT.firebaseapp.com",
projectId: "PROJECT_ID"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

loadProducts();

async function loadProducts(){

const grid =
document.getElementById("productGrid");

grid.innerHTML = "Loading...";

const snapshot =
await getDocs(collection(db,"products"));

grid.innerHTML = "";

snapshot.forEach(doc=>{

const p = doc.data();

grid.innerHTML += `

<div class="card">

<img src="${p.photo}">

<div class="card-body">

<div class="product-name">
${p.productName}
</div>

<div class="price">
Rp ${Number(p.price).toLocaleString('id-ID')}
</div>

<div class="store">
${p.storeName}
</div>

<button
class="buy-btn"
onclick="orderProduct(
'${p.productName}',
'${p.phone}'
)">
Pesan
</button>

</div>

</div>

`;

});

}

window.orderProduct =
function(product,phone){

const text =
`Halo, saya ingin memesan ${product}`;

const wa =
`https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

window.open(wa,'_blank');

}
