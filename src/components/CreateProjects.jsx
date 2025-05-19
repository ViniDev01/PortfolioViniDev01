// src/components/CreateProject.jsx
import React, { useState } from "react";
import { createProject } from "../firebase/projects";
import { uploadImage } from "../firebase/projects";


const CreateProjectPage = () => {
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    demo: "",
    github: "",
  });

  const [imageFile, setImageFile] = useState(null);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Armazena o arquivo de imagem
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile); // Faz o upload da imagem e obtém a URL
        console.log("Imagem URL:", imageUrl);
      }
      const newProject = { ...form, image: imageUrl }; // Inclui a URL da imagem no objeto de projeto
      await createProject(newProject); // Cria o projeto no Firestore
      alert("Projeto criado com sucesso!");
      setForm({ title: "", description: "", image: "", demo: "", github: "" });
      setImageFile(null); // Limpa o campo de imagem
    } catch (err) {
      console.error("Erro ao criar projeto:", err);
      alert("Erro ao criar projeto.");
    }
  
  };

  return (
    <div className="create-project-container">
      <h2>Criar Novo Projeto</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required/>
        <input name="description" placeholder="Descrição" value={form.description} onChange={handleChange} required/>
        <label htmlFor="imageUpload" className="upload-button">
          Selecionar imagem
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
          required
        />
        {imageFile && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Prévia da imagem"
              className="preview-img"
            />
          </div>
        )}

        <input name="demo" placeholder="Link do Projeto" value={form.demo} onChange={handleChange} required/>
        <input name="github" placeholder="Link do GitHub" value={form.github} onChange={handleChange} required/>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
