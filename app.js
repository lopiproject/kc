import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
getFirestore,
collection,
getDocs
}
from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT_ID"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const container =
document.getElementById("productContainer");

const searchInput =
document.getElementById("searchInput");

let allProducts = [];

loadProducts();

async function loadProducts(){

const snapshot =
await getDocs(collection(db,"products"));

allProducts = [];

snapshot.forEach(doc=>{

allProducts.push({
id:doc.id,
...doc.data()
});

});

renderProducts(allProducts);
}

function renderProducts(products){

container.innerHTML="";

products.forEach(product=>{

const whatsapp =
`https://wa.me/${product.phone}?text=Saya ingin pesan ${product.productName}`;

container.innerHTML += `
<div class="card">

<img src="${product.photo}" alt="">

<div class="card-body">

<h3>${product.productName}</h3>

<div class="price">
Rp ${Number(product.price).toLocaleString()}
</div>

<div class="store">
${product.storeName}
</div>

<a
class="btn"
href="${whatsapp}"
target="_blank">
Pesan via WhatsApp
</a>

</div>
</div>
`;

});
}

searchInput.addEventListener("keyup",()=>{

const keyword =
searchInput.value.toLowerCase();

const filtered =
allProducts.filter(item=>

item.productName.toLowerCase().includes(keyword)

||

item.storeName.toLowerCase().includes(keyword)

);

renderProducts(filtered);

});
