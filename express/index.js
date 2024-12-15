import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const tea = { id: nextId++, name, price };
  teaData.push(tea);
  res.status(201).send(tea);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

app.get("/teas/:id", (req, res) => {
  const id = req.params.id;
  const tea = teaData.find((tea) => tea.id === parseInt(id));
  if (tea) {
    res.status(200).send(tea);
  } else {
    res.status(404).send({ message: "Tea not found" });
  }
});

app.put("/teas/:id", (req, res) => {
  const id = req.params.id;
  const tea = teaData.find((tea) => tea.id === parseInt(id));
  if (!tea) {
    res.status(404).send({ message: "Tea not found" });
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

app.delete('/teas/:id',(req,res)=>{
    const id = req.params.id;
    const tea = teaData.findIndex((tea) => tea.id === parseInt(id));
    if (tea === -1) {
        return res.status(404).send({ message: "Tea not found" });
    }
    teaData.splice(tea, 1);
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
