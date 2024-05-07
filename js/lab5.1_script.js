// task 1
let id_counter = 0;
function logProduct(product) {
    console.log(product);
}
function logTotalPrice(product) {
    console.log(product.price * product.quantity);
}
function createProduct(obj, callback) {
    obj.id = id_counter;
    ++id_counter;
    callback(obj);
}
function generateProduct() {
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);
    const logType = document.querySelector('input[name="logType"]:checked').value;

    const product_obj = { name, price, quantity };
    createProduct(product_obj, logType==="logProduct" ? logProduct : logTotalPrice);
}

// task 3
const displaySortedMedicines = () => {
    const medicines = {
        "Агалгін": new Date("2022-05-01"),
        "Ношпа": new Date("2025-07-02"),
        "Альфахолін": new Date("2024-12-21"),
        "Аспірин": new Date("2022-08-15"),
        "Аспаркам": new Date("2024-04-18"),
    };

    const sortedMedicines = getSortedMedicines(medicines);
    console.log(sortedMedicines);
};

const getSortedMedicines = (medicines) => {
    const currentDate = new Date();
    const medicineNames = Object.keys(medicines);
    const validMedicines = medicineNames.filter(medicine => medicines[medicine] > currentDate);
    const sortedMedicines = validMedicines.sort((a, b) => medicines[a] - medicines[b]);

    return sortedMedicines;
};

// task 5

const fruits = [
        { name: "apple", price: 200 },
        { name: "orange", price: 300 },
        { name: "grapes", price: 750 },
    ];
const getDiscount = (fruits) => {
    const discountedFruits = applyDiscountAndAssignId(fruits);
    console.log(discountedFruits);
};
const applyDiscountAndAssignId = (fruits) => {
    return fruits.map((fruit, index) => {
        const discountedPrice = fruit.price * 0.8;
        return {
            id: index + 1,
            name: fruit.name,
            price: discountedPrice
        };
    });
};

// task 7
class Client {
    #login;
    #email;
    constructor(login, email) {
        this.#login = login;
        this.#email = email;
    }
    get getLogin() {return this.#login;}
    set setLogin(newLogin) {this.#login = newLogin;}
    get getEmail() {return this.#email;}
    set setEmail(newEmail) {this.#email = newEmail;}
}
function generateClient() {
    const login = document.getElementById("login").value;
    const email = document.getElementById("email").value;

    const client = new Client(login, email);
    console.log(`login: ${client.getLogin}\nemail: ${client.getEmail}`);
}
// task 9
const tweets = [
    { id: "000", likes: 5, tags: ["js", "nodejs"] },
    { id: "001", likes: 2, tags: ["html", "css"] },
    { id: "002", likes: 17, tags: ["html", "js", "nodejs"] },
    { id: "003", likes: 8, tags: ["css", "react"] },
    { id: "004", likes: 0, tags: ["js", "nodejs", "react"] },
];
function calculateTagCount() {
    console.log(tweets);
    const tagCount = tweets.reduce((acc, tweet) => {
        tweet.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {});
    console.log(tagCount);
}
// task 10
const code1 = 'function someFn() { return true; }';
function checkBrackets(str) {
    const stack = [];
    const bracketsMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            const lastOpenBracket = stack.pop();
            if (!lastOpenBracket || bracketsMap[lastOpenBracket] !== char) {
                return false;
            }
        }
    }
    console.log(stack.length === 0);
}