const express = require('express');
const cors = require('cors');
const { obtenerPosts, agregarPost, incrementarLikes, eliminarPost } = require('./consultas');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//ruta GET
app.get('/posts', async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los posts');
  }
});

//ruta POST
app.post('/posts', async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  try {
    const post = await agregarPost(titulo, url, descripcion);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el post');
  }
});

//ruta PUT
app.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await incrementarLikes(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Post no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al incrementar los likes');
  }
});

//ruta DELETE 
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await eliminarPost(id);
    if (post) {
      res.json({ message: 'Post eliminado' });
    } else {
      res.status(404).send('Post no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el post');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});