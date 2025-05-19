import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref as storageRef, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/firebase'; // Ajuste se necessário
import upload from '../assets/upload.jpg'; // Ajuste o caminho da imagem de upload	

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const fetchedProjects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(fetchedProjects);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId, imageUrl) => {
    const confirm = window.confirm("Tem certeza que deseja excluir este projeto?");
    if (!confirm) return;

    try {
      // 1. Deleta o projeto do Firestore
      await deleteDoc(doc(db, 'projects', projectId));      

      // 2. Deleta a imagem do Firebase Storage (se houver)
      if (imageUrl) {
        const imageRef = storageRef(storage, getStoragePathFromUrl(imageUrl));
        await deleteObject(imageRef);
      }

      // 3. Atualiza o estado
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (err) {
      console.error("Erro ao excluir projeto:", err);
      alert("Erro ao excluir projeto.");
    }
  };

  // Função para extrair o caminho do arquivo a partir da URL pública da imagem
  const getStoragePathFromUrl = (url) => {
    const decoded = decodeURIComponent(url.split('?')[0]);
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/`;
    return decoded.replace(baseUrl, '');
  };

  const startEditing = (project) => {
    setEditingId(project.id);
    setEditData({ title: project.title, description: project.description, demo: project.demo, github: project.github });
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveEdit = async (project) => {
    const projectRef = doc(db, 'projects', project.id);
    let imageUrl = project.image; // valor atual
  
    try {
      // Se o usuário selecionou uma nova imagem
      if (editData.newImage) {
        const imageFile = editData.newImage;
  
        // Cria referência e faz upload da nova imagem
        const imagePath = `projects/images/${Date.now()}_${imageFile.name}`;
        const imageStorageRef = storageRef(storage, imagePath);
        await uploadBytes(imageStorageRef, imageFile);
  
        // Pega a nova URL
        imageUrl = await getDownloadURL(imageStorageRef);
  
        // Deleta a imagem antiga (opcional)
        if (project.image?.includes('firebasestorage.googleapis.com')) {
          const oldRef = storageRef(storage, getStoragePathFromUrl(project.image));
          await deleteObject(oldRef).catch((err) => {
            console.warn('Falha ao remover imagem antiga:', err.message);
          });
        }
      }
  
      // Atualiza o Firestore com novos dados
      await updateDoc(projectRef, {
        title: editData.title,
        description: editData.description,
        demo: editData.demo,
        github: editData.github,
        image: imageUrl,
        updatedAt: serverTimestamp(),
      });
  
      // Atualiza localmente a lista
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id
            ? {
                ...p,
                title: editData.title,
                description: editData.description,
                demo: editData.demo,
                github: editData.github,
                image: imageUrl,
              }
            : p
        )
      );
  
      setEditingId(null);
    } catch (err) {
      console.error('Erro ao salvar edição:', err);
      alert('Erro ao salvar edição');
    }
  };

  if (loading) return <p>Carregando projetos...</p>;

  return (
    <div className="manage-projects-container">
      <h1>Gerenciar Projetos</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            
            {editingId === project.id ? (
              <div className="edit-form">
                <label htmlFor="editImageUpload" className="upload-image-button">
                  <img src={upload} alt="Upload" className="upload-icon" />
                </label>
                <input 
                  id="editImageUpload"
                  type='file'
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => setEditData((prev) => ({ ...prev, newImage: e.target.files[0] }))}
                />
                <input
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  placeholder="Título"
                  className='edit-input'
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  placeholder="Descrição"
                  className='edit-textarea'
                />
                <input
                  name="demo"
                  value={editData.demo}
                  onChange={handleEditChange}
                  placeholder="Link do Demo"
                  className='edit-input'
                />
                <input
                  name="github"
                  value={editData.github}
                  onChange={handleEditChange}
                  placeholder="Link do GitHub"
                  className='edit-input'
                />
                <button onClick={() => saveEdit(project)}>Salvar</button>
                <button onClick={() => setEditingId(null)}>Cancelar</button>
              </div>
            ) : (
              <div className="project-info">
                {project.image ? (
                  <img src={project.image} alt={project.title} className='project-image' />
                ) : (
                  <p>Sem imagem</p>
                )}
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <button onClick={() => startEditing(project)}>Editar</button>
                <button
                  onClick={() => handleDelete(project.id, project.image)}
                  className="delete-button"
                >
                  Excluir
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProjects;
