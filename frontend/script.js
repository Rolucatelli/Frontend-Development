const registerForm = document.querySelector("#registerForm");

const loginForm = document.querySelector("#login-form");
const errorMsgLogin = document.querySelector("#error-message");
const rememberMe = document.querySelector("#remember-me");

const userName = document.querySelector("#user-name");
const logoutBtn = document.querySelector("#logoutBtn");
const resetProductsBtn = document.querySelector("#resetProductsBtn");
const addProductBtn = document.querySelector("#addProductBtn");
const productList = document.querySelector("#productList");

const createProductForm = document.querySelector("#createProductForm");
const productDetailsList = document.querySelector("#productDetailsList");

const productDetails = document.querySelector("#product-details");

const editProductForm = document.querySelector("#editProductForm");

let oldProducts = [];
let products = [];
let users = [];

let userLoggedIn =
	JSON.parse(localStorage.getItem("userLoggedIn")) ||
	JSON.parse(sessionStorage.getItem("userLoggedIn")) ||
	{};

// This section is for the registration form
if (registerForm) {
	registerForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = document.querySelector("#name").value;
		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;
		const role = document.querySelector("#role").value;

		const user = {
			name,
			email,
			password,
			role,
		};

		users = JSON.parse(localStorage.getItem("users")) || [];
		const userExists = users.find((u) => u.email === user.email);
		if (userExists) {
			alert("User already exists!");
			throw new Error("User already exists!");
		} else {
			users.push(user);
			localStorage.setItem("users", JSON.stringify(users));
			alert("User registered successfully!");
			window.location.href = "index.html";
		}
	});
}

// This section is for the login form

if (loginForm) {
	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;

		const user = {
			email,
			password,
		};

		users = JSON.parse(localStorage.getItem("users")) || [];
		const userExists = users.find(
			(u) => u.email === user.email && u.password === user.password
		);
		if (userExists) {
			if (rememberMe.checked) {
				localStorage.setItem(
					"userLoggedIn",
					JSON.stringify(userExists)
				);
			} else {
				sessionStorage.setItem(
					"userLoggedIn",
					JSON.stringify(userExists)
				);
			}

			localStorage.setItem(
				"products",
				localStorage.getItem("oldProducts")
			);
			window.location.href = "dashboard.html";
		} else {
			errorMsgLogin.style.display = "block";
		}
	});
}

// This section is for the dashboard

if (userName && userLoggedIn.email) {
	userName.innerHTML = userLoggedIn.name + " (" + userLoggedIn.role + ")";
} else if (userName && !userLoggedIn.email) {
	window.location.href = "index.html";
}

if (logoutBtn) {
	logoutBtn.addEventListener("click", (e) => {
		localStorage.setItem("oldProducts", localStorage.getItem("products"));
		localStorage.removeItem("products");

		localStorage.removeItem("userLoggedIn");
		sessionStorage.removeItem("userLoggedIn");
		window.location.href = "index.html";
	});
	window.addEventListener("close", (e) => {
		localStorage.setItem("oldProducts", localStorage.getItem("products"));
		localStorage.removeItem("products");
	});
}

if (addProductBtn) {
	addProductBtn.addEventListener("click", (e) => {
		window.location.href = "create-product.html";
	});
}

if (resetProductsBtn) {
	resetProductsBtn.addEventListener("click", (e) => {
		if (confirm("Are you sure you want to reset all products?")) {
			localStorage.setItem("products", localStorage.getItem("oldProducts"));
			location.reload();
		}
	});
}

if (productList) {
	products = JSON.parse(localStorage.getItem("products")) || [];
	products.forEach((product) => {
		const tr = document.createElement("tr");
		tr.innerHTML = `
		<td>${product.id}</td>
		<td><img src="${product.mainImage}"/></td>
		<td>${product.name}</td>
		<td>${product.brand}</td>
		<td>${product.category}</td>
		<td>
			<button class="view-btn" onclick="viewProduct('${product.id}')">View Details</button>
			<button class="edit-btn" onclick="editProduct('${product.id}')">Edit</button>
			<button class="delete-btn" onclick="deleteProduct('${product.id}')">Delete</button>
		</td>
	`;
		productList.appendChild(tr);
	});
}

function viewProduct(id) {
	const product = products.find((p) => p.id == id);
	localStorage.setItem("product", JSON.stringify(product));
	window.location.href = "view-product.html";
}

function editProduct(id) {
	const product = products.find((p) => p.id == id);
	localStorage.setItem("product", JSON.stringify(product));
	window.location.href = "edit-product.html";
}

function deleteProduct(id) {
	const productIndex = products.findIndex((p) => p.id == id);
	if (confirm("Are you sure you want to delete this product?")) {
		products.splice(productIndex, 1);
		localStorage.setItem("products", JSON.stringify(products));
		location.reload();
	}
}

// This section is for the create product form

if (productDetailsList) {
	const details = JSON.parse(localStorage.getItem("details")) || [];
	details.forEach((detail) => {
		const dName = document.createElement("input");
		const dValue = document.createElement("input");
		dName.type = "text";
		dValue.type = "text";
		dName.disabled = true;
		dValue.disabled = true;
		dName.value = detail.detailName;
		dValue.value = detail.detailValue;
		productDetailsList.appendChild(dName);
		productDetailsList.appendChild(dValue);
	});
}

if (createProductForm) {
	const addDetailBtn = document.querySelector("#addDetailBtn");

	addDetailBtn.addEventListener("click", (e) => {
		e.preventDefault();

		const details = JSON.parse(localStorage.getItem("details")) || [];

		const detailName = document.querySelector("#detailName").value;
		const detailValue = document.querySelector("#detailValue").value;

		const detail = {
			detailName,
			detailValue,
		};
		details.push(detail);
		localStorage.setItem("details", JSON.stringify(details));

		const dName = document.createElement("input");
		const dValue = document.createElement("input");
		dName.type = "text";
		dValue.type = "text";
		dName.disabled = true;
		dValue.disabled = true;
		dName.value = detailName;
		dValue.value = detailValue;
		productDetailsList.appendChild(dName);
		productDetailsList.appendChild(dValue);
		document.querySelector("#detailName").value = "";
		document.querySelector("#detailValue").value = "";
	});

	createProductForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const products = JSON.parse(localStorage.getItem("products")) || [];

		const name = document.querySelector("#name").value;
		const shortDescription =
			document.querySelector("#shortDescription").value;
		const fullDescription =
			document.querySelector("#fullDescription").value;
		const brand = document.querySelector("#brand").value;
		const category = document.querySelector("#category").value;
		const mainImage = document.querySelector("#mainImage").value;
		const featuredImages = document.querySelector("#featuredImages").value;
		const listPrice = document.querySelector("#listPrice").value;
		const discountPercent =
			document.querySelector("#discountPercent").value;
		const enabled = document.querySelector("#enabled").value;
		const inStock = document.querySelector("#inStock").value;

		const length = document.querySelector("#length").value;
		const width = document.querySelector("#width").value;
		const height = document.querySelector("#height").value;

		const dimensions = {
			length,
			width,
			height,
		};

		const weight = document.querySelector("#weight").value;
		const cost = document.querySelector("#cost").value;
		const creationDate = new Date()
			.toISOString()
			.replace(/T/, " ")
			.replace(/\..+/, "");
		const updateDate = new Date()
			.toISOString()
			.replace(/T/, " ")
			.replace(/\..+/, "");

		const details = JSON.parse(localStorage.getItem("details")) || [];

		const product = {
			id: products.length + 1,
			name,
			shortDescription,
			fullDescription,
			brand,
			category,
			mainImage,
			featuredImages,
			listPrice,
			discountPercent,
			enabled,
			inStock,
			dimensions,
			weight,
			cost,
			details,
			creationDate,
			updateDate,
		};

		console.log(products);
		products.push(product);
		localStorage.setItem("products", JSON.stringify(products));
		localStorage.removeItem("details");
		alert("Product created successfully!");
		window.location.href = "dashboard.html";
		window.addEventListener("beforeunload", (e) => {
			localStorage.removeItem("details");
		});
	});
}

// This section is for the view product page

if (productDetails) {
	const product = JSON.parse(localStorage.getItem("product"));

	const productID = document.querySelector("#product-id");
	const productName = document.querySelector("#product-name");
	const productCategory = document.querySelector("#category");
	const productBrand = document.querySelector("#brand");
	const productMainImage = document.querySelector("#main-image");
	const shortDescription = document.querySelector("#short-description");
	const fullDescription = document.querySelector("#full-description");
	const listPrice = document.querySelector("#list-price");
	const discount = document.querySelector("#discount");
	const enabled = document.querySelector("#enabled");
	const inStock = document.querySelector("#in-stock");
	const creationTime = document.querySelector("#creation-time");
	const updateTime = document.querySelector("#update-time");
	const dimensions = document.querySelector("#dimensions");
	const weight = document.querySelector("#weight");
	const cost = document.querySelector("#cost");
	const productDetailsList = document.querySelector("#product-details-list");

	productID.innerHTML = product.id;
	productName.innerHTML = product.name;
	productCategory.innerHTML = product.category;
	productBrand.innerHTML = product.brand;
	productMainImage.src = product.mainImage;
	shortDescription.innerHTML = product.shortDescription;
	fullDescription.innerHTML = product.fullDescription;
	listPrice.innerHTML = product.listPrice;
	discount.innerHTML = product.discountPercent;
	enabled.innerHTML = product.enabled;
	inStock.innerHTML = product.inStock;
	creationTime.innerHTML = product.creationDate;
	updateTime.innerHTML = product.updateDate;
	dimensions.innerHTML = `Length: ${product.dimensions.length} inches, Width: ${product.dimensions.width} inches, Height: ${product.dimensions.height} inches`;
	weight.innerHTML = product.weight;
	cost.innerHTML = product.cost;

	const details = product.details;
	details.forEach((detail) => {
		const li = document.createElement("li");
		li.innerHTML = `${detail.detailName}: ${detail.detailValue}`;
		productDetailsList.appendChild(li);
	});
}

// This section is for the edit product page

if (editProductForm) {
	// Load the product information

	const product = JSON.parse(localStorage.getItem("product"));

	const productID = document.querySelector("#productId");
	const productName = document.querySelector("#name");
	const productCategory = document.querySelector("#category");
	const productBrand = document.querySelector("#brand");
	const productMainImage = document.querySelector("#currentMainImage em");
	const shortDescription = document.querySelector("#shortDescription");
	const fullDescription = document.querySelector("#fullDescription");
	const featuredImages = document.querySelector("#currentFeaturedImages em");
	const listPrice = document.querySelector("#listPrice");
	const discount = document.querySelector("#discountPercent");
	const enabled = document.querySelector("#enabled");
	const inStock = document.querySelector("#inStock");
	const length = document.querySelector("#length");
	const width = document.querySelector("#width");
	const height = document.querySelector("#height");
	const weight = document.querySelector("#weight");
	const cost = document.querySelector("#cost");
	const creationDate = document.querySelector("#creationDate");
	const updateDate = document.querySelector("#updateDate");
	const productDetailsList = document.querySelector("#productDetails");

	productID.value = product.id;
	productName.value = product.name;
	productCategory.value = product.category;
	productBrand.value = product.brand;
	productMainImage.innerHTML = product.mainImage;
	shortDescription.value = product.shortDescription;
	fullDescription.value = product.fullDescription;
	featuredImages.innerHTML = product.featuredImages;
	listPrice.value = product.listPrice;
	discount.value = product.discountPercent;
	enabled.value = product.enabled;
	inStock.value = product.inStock;
	length.value = product.dimensions.length;
	width.value = product.dimensions.width;
	height.value = product.dimensions.height;
	weight.value = product.weight;
	cost.value = product.cost;
	creationDate.value = product.creationDate;
	updateDate.value = product.updateDate;

	// Load the product details

	const details = product.details;
	details.forEach((detail) => {
		const dName = document.createElement("input");
		const dValue = document.createElement("input");
		const deleteDetailBtn = document.createElement("button");
		dName.type = "text";
		dValue.type = "text";
		deleteDetailBtn.innerHTML = "Remove";
		deleteDetailBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const details = JSON.parse(localStorage.getItem("details")) || [];
			const detailIndex = details.findIndex(
				(d) =>
					d.detailName == detail.detailName &&
					d.detailValue == detail.detailValue
			);
			details.splice(detailIndex, 1);
			localStorage.setItem("details", JSON.stringify(details));
			productDetailsList.removeChild(dName);
			productDetailsList.removeChild(dValue);
			productDetailsList.removeChild(deleteDetailBtn);
		});
		dName.value = detail.detailName;
		dValue.value = detail.detailValue;
		productDetailsList.appendChild(dName);
		productDetailsList.appendChild(dValue);
		productDetailsList.appendChild(deleteDetailBtn);
		localStorage.setItem("details", JSON.stringify(details));
	});

	// Add new product details

	const addDetailBtn = document.querySelector("#addDetailBtn");

	addDetailBtn.addEventListener("click", (e) => {
		e.preventDefault();

		const details = JSON.parse(localStorage.getItem("details")) || [];

		const detailName = document.querySelector("#detailName").value;
		const detailValue = document.querySelector("#detailValue").value;

		const detail = {
			detailName,
			detailValue,
		};
		console.log(detail);
		console.log(details);
		details.push(detail);
		localStorage.setItem("details", JSON.stringify(details));

		const dName = document.createElement("input");
		const dValue = document.createElement("input");
		const deleteDetailBtn = document.createElement("button");
		dName.type = "text";
		dValue.type = "text";
		deleteDetailBtn.innerHTML = "Remove";
		deleteDetailBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const details = JSON.parse(localStorage.getItem("details")) || [];
			const detailIndex = details.findIndex(
				(d) =>
					d.detailName == detail.detailName &&
					d.detailValue == detail.detailValue
			);
			details.splice(detailIndex, 1);
			localStorage.setItem("details", JSON.stringify(details));
			productDetailsList.removeChild(dName);
			productDetailsList.removeChild(dValue);
			productDetailsList.removeChild(deleteDetailBtn);
		});
		dName.value = detailName;
		dValue.value = detailValue;
		productDetailsList.appendChild(dName);
		productDetailsList.appendChild(dValue);
		productDetailsList.appendChild(deleteDetailBtn);
		document.querySelector("#detailName").value = "";
		document.querySelector("#detailValue").value = "";
	});

	// Update the product

	editProductForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const id = document.querySelector("#productId").value;
		const name = document.querySelector("#name").value;
		const shortDescription =
			document.querySelector("#shortDescription").value;
		const fullDescription =
			document.querySelector("#fullDescription").value;
		const brand = document.querySelector("#brand").value;
		const category = document.querySelector("#category").value;
		const mainImage = document.querySelector("#mainImage").value;
		const featuredImages = document.querySelector("#featuredImages").value;
		const listPrice = document.querySelector("#listPrice").value;
		const discountPercent =
			document.querySelector("#discountPercent").value;
		const enabled = document.querySelector("#enabled").value;
		const inStock = document.querySelector("#inStock").value;
		const creationDate = document.querySelector("#creationDate").value;

		const length = document.querySelector("#length").value;
		const width = document.querySelector("#width").value;
		const height = document.querySelector("#height").value;

		const dimensions = {
			length,
			width,
			height,
		};

		const weight = document.querySelector("#weight").value;
		const cost = document.querySelector("#cost").value;
		const updateDate = new Date()
			.toISOString()
			.replace(/T/, " ")
			.replace(/\..+/, "");

		const details = JSON.parse(localStorage.getItem("details")) || [];

		const product = {
			id,
			name,
			shortDescription,
			fullDescription,
			brand,
			category,
			mainImage,
			featuredImages,
			listPrice,
			discountPercent,
			enabled,
			inStock,
			dimensions,
			weight,
			cost,
			details,
			updateDate,
			creationDate,
		};

		const productIndex = products.findIndex((p) => p.id == id);
		products.splice(productIndex, 1, product);
		localStorage.setItem("products", JSON.stringify(products));
		localStorage.removeItem("details");
		alert("Product updated successfully!");
		window.location.href = "dashboard.html";
		window.addEventListener("beforeunload", (e) => {
			localStorage.removeItem("details");
		});
	});
}
