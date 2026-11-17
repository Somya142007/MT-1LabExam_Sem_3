import http from 'http'
import fs from 'fs'

let foods = [
    {
        id: 1,
        foodName: "Pizza",
        category: "Fast Food",
        price: 250,
        availability: true
    },
    {
        id: 2,
        foodName: "Burger",
        category: "Fast Food",
        price: 120,
        availability: true
    },
    {
        id: 3,
        foodName: "Pasta",
        category: "Fast Food",
        price: 450,
        availability: true
    }
];

function sendJSON(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });

        req.on("error", reject);
    });
}


const server = http.createServer(async (req, res) => {
    try {
        if (req.url === "/" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`
                <div>
                    <h1>Welcome to Food ordering Application</h1>
                    <p>Order your favourite food here! </p>
                </div>
            `);
        } else if (req.url === "/foods" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(foods));
        } else if (req.url === "/foods" && req.method === "POST") {
            const newFood = await sendJSON(req);
            foods.push(newFood);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newFood));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Not Found" }));
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        } else {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    }
});








        

