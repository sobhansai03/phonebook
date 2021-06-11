const { request, response } = require("express");
const express = require("express");
var morgan = require("morgan");
const app = express();

app.use(express.static("build"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);

const cors = require("cors");

app.use(cors());

app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5165165",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-659876",
    },
    {
        id: 4,
        name: "snc cjbcu",
        number: "12-258259876",
    },
];

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/info", (request, response) => {
    const currentTime = new Date();
    const text = `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentTime}</p>
    </div>`;
    response.send(text);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

const generateId = () => {
    return Math.floor(Math.random() * Math.random() * 100);
};

app.post("/api/persons", (request, response) => {
    const { name, number } = request.body;
    if (!name || !number) {
        return response.status(400).json({ error: "missing name or number" });
    }

    person1 = persons.filter((person) => person.name === name);
    if (person1.length > 0) {
        return response.status(400).json({ error: "name must be unique" });
    }

    const person = {
        id: generateId(),
        name: name,
        number: number,
    };

    persons = persons.concat(person);

    response.json(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
