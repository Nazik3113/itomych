const Users = new Map([
    [1, new Map([
        ["user_id", 1],
        ["first_name", "Nazarii"],
        ["second_name", "Spikhalskyi"],
        ["email", "someEmail@gmail.com"],
        ["backet", new Map([])]
    ])],
    [2, new Map([
        ["user_id", 2],
        ["first_name", "Andriy"],
        ["second_name", "Dobrobolskyi"],
        ["email", "someEmail2@gmail.com"],
        ["backet", new Map([])]
    ])]
]);

const Products = new Map([
    [1, new Map([
        ["product_id", 1],
        ["name", "Laptop"],
        ["price", 19999],
        ["image", "some_url..."]
    ])],
    [2, new Map([
        ["product_id", 2],
        ["name", "Phone"],
        ["price", 9999],
        ["image", "some_url..."]
    ])]
]);

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
};

function createOrder(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(randomInt(1, Math.max()));
        }, 1000);
    });
};

function createOrderCallBack(userId, callback) {
    setTimeout(() => {
        callback(randomInt(1, Math.max()));
    }, 1000);
};

function sendSuccessOrderEmail(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
};

function sendSuccessOrderEmailCallback(userId, callback) {
    setTimeout(() => {
        callback(true);
    }, 1000);
};

function clearBacket(userId) {
    return new Promise((resolve, reject) => {
        const user = Users.get(userId);
        if (user) {
            const backet = user.get("backet");
            backet.clear();
            return resolve(true);
        }
        return reject(false);
    });
};

function clearBacketCallBack(userId, callback) {
    const user = Users.get(userId);
    if (user) {
        const backet = user.get("backet");
        backet.clear();
        return callback(true);
    }
    return callback(false);
};

function getUserInfo(userId) {
    const userInfo = Object.fromEntries(Users.get(userId));
    userInfo.backet = Object.fromEntries(userInfo.backet);
    return userInfo;
};
console.log(JSON.stringify(getUserInfo(1), null, 4));

function addProductToBacket(productId, userId) {
    const product = Products.get(productId);
    const user = Users.get(userId);
    const backet = user.get("backet");

    const productCount = backet.get(productId);
    if (productCount) {
        backet.set(productId, Number(productCount) + 1);
    } else {
        backet.set(productId, 1);
    }
};
addProductToBacket(1, 1);
addProductToBacket(1, 1);

function getBacketPlusPrice(userId) {
    const user = Users.get(userId);
    const backet = user.get("backet");
    const backetObj = [];
    let price = 0;
    
    backet.forEach((count, productId) => {
        const product = Products.get(productId);
        backetObj.push({count: count, product: Object.fromEntries(product)});
        price += Number(product.get("price")) * count;
    });

    return { backet: backetObj, price: price };
};    
console.log(JSON.stringify(getBacketPlusPrice(1), null, 4));
console.log(JSON.stringify(getUserInfo(1), null, 4));

async function makeASellPromise(userId) {
    const orderId = await createOrder(userId);
    const emailStatus = await sendSuccessOrderEmail(userId);
    const backetStatus = await clearBacket(userId);  
    console.log(JSON.stringify(getUserInfo(userId), null, 4));
};
makeASellPromise(1);

function makeASellCallback(userId) {
    createOrderCallBack(userId, (orderId) => {
        sendSuccessOrderEmailCallback(userId, (emailStatus) => {
            clearBacketCallBack(userId, (clearBacketStatus) => {
                console.log(JSON.stringify(getUserInfo(userId), null, 4));
            });
        });
    });
};
makeASellCallback(1);