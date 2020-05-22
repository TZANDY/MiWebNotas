const notesController = {};
const Note = require('../Models/Note');

notesController.renderNoteForm = (req, res) => {

    res.render('notes/new-note');
}
notesController.crearNuevaNota = async(req, res) => {
    //EXTRAYENDO LOS CAMPOS
    const { title, descripcion } = req.body;
    const newNote = new Note({ titulo: title, descripcion: descripcion });
    newNote.user = req.user.id;
    await newNote.save();
    //console.log(newNote);
    req.flash('success_msg', 'Nota creada satisfactoriamente');
    res.redirect('/notes');
}
notesController.renderNotes = async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).lean();
    res.render('notes/all-note', { notes });
}
notesController.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash('error_msg', 'No esta autorizado para visualizar');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note });

}
notesController.updateNote = async(req, res) => {
    const { titulo, descripcion } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { titulo: titulo, descripcion: descripcion });
    req.flash('success_msg', 'Nota actualizada satisfactoriamente');
    res.redirect('/notes');
}
notesController.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada satisfactoriamente');
    res.redirect('/notes');
}

module.exports = notesController;