const {
    Router
} = require('express');
const router = Router();

const {
    renderNoteForm,
    crearNuevaNota,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');
const {
    isAuthenticated
} = require('../Helpers/auth');

router.get('/notes/add', isAuthenticated, renderNoteForm);
router.post('/notes/new-note', isAuthenticated, crearNuevaNota);

// Obteniendo todas las notas
router.get('/notes', isAuthenticated, renderNotes);

//Editar notas
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
router.put('/notes/edit/:id', isAuthenticated, updateNote);

router.delete('/notes/delete/:id', isAuthenticated, deleteNote);



module.exports = router;