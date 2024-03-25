const express = require("express");
const path = require("path");
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.get('/users/delete/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await axios.delete(`http://localhost:8080/users/${userId}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Erro ao deletar o usuário com ID ${userId}:`, error.message);
    res.status(500).json({ message: "Erro interno do servidor ao tentar deletar o usuário." });
  }
});

// Gets
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "landing.html"));
})

app.post('/api/add-user', async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    role: 'USER'
  };

  try {
    const response = await axios.post('http://localhost:8080/users', userData);
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao encaminhar os dados do usuário:", error.message);
    res.status(500).json({ message: "Erro ao encaminhar os dados do usuário para o servidor." });
  }
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(publicPath, "admin.html"));
});
app.get("/add_user", (req, res) => {
  res.sendFile(path.join(publicPath, "add_user.html"));
});
app.get("/view_users", (req, res) => {
  res.sendFile(path.join(publicPath, "view_users.html"));
});
app.get("/edit_product", (req, res) => {
  res.sendFile(path.join(publicPath, "edit_product.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});
app.get("/view_products", (req, res) => {
  res.sendFile(path.join(publicPath, "view_product.html"));
});
app.get("/add_product", (req, res) => {
  res.sendFile(path.join(publicPath, "add_product.html"));
});
app.get("/view_sales", (req, res) => {
  res.sendFile(path.join(publicPath, "view_sales.html"));
});
app.get('/editar-produto', (req, res) => {
  res.sendFile(path.join(__dirname, '/test_axios.html'));
});
app.get("/sale", (req, res) => {
  res.sendFile(path.join(publicPath, "sales.html"));
});

// post de produto
app.post("/post", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8080/products", req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error making POST request to API:", error.message);
    if (error.response && error.response.data) {
      console.error("Full error response:", error.response.data);
    } else if (error.request) {
      console.error("No response received");
    } else {
      console.error("Error", error.message);
    }

    res.status(500).json({ error: "Internal Server Error when calling API" });
  }
});

app.post('/api/update-product/:productId', async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = req.body;
  try {
    const response = await axios.post(`http://localhost:8080/products/${productId}`, updatedProduct);
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao atualizar o produto no servidor 8080:", error.message);
    res.status(error.response ? error.response.status : 500).json({ message: "Erro ao atualizar o produto." });
  }
});


// posts
app.post("/sales", async (req, res) => {
  const saleData = req.body;
  console.log("Forwarding sale data to API:", saleData);

  try {
    const response = await axios.post("http://localhost:8080/sales", saleData, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding sale request to API:", error.message);
    if (error.response) {
      console.error("API response error:", error.response.data);
    }
    res.status(500).json({ error: "Internal Server Error when forwarding sale request" });
  }
});


app.delete("/delete-product/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    await axios.delete(`http://localhost:8080/products/${productId}`);
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error("Error making DELETE request to API:", error.message);
    res.status(500).json({ error: "Internal Server Error when calling API" });
  }
});


app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, './public/erro.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
