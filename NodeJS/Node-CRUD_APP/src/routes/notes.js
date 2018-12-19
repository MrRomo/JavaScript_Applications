const router = require('express').Router()
const Note = require('../models/Note')
const {isAuthenticated} =  require('../helpers/auth')
const User = require('../models/User')

router.get('/notes/add', isAuthenticated,(req,res)=>{
    res.render('notes/new-note')    
})
router.get('/notes', isAuthenticated,async (req,res)=>{
    const author = await User.find({"_id" :(req.user.id)})
    const notes = await Note.find({author: author[0].name}).sort({date:'desc'}) 
    res.render('notes/all-notes',{notes})
})
router.get('/notes/edit/:id', isAuthenticated,async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', { note });
});
router.put('/notes/edit-note/:id', isAuthenticated, async (req,res)=>{
    const {title, description} = req.body
    await Note.findByIdAndUpdate(req.params.id, {title,description})
    console.log(req)
    console.log(req.flash())
    req.flash('success_msg', 'Note Update Successfull')
    res.redirect('/notes')
})
router.delete('/notes/delete/:id', isAuthenticated, async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note Delete Successfull')
    res.redirect('/notes')
})
router.post('/notes/new-note', isAuthenticated, async (req, res) =>{
    const {title, description} = req.body
    const errors = []
    const author = await User.find({"_id" :(req.user.id)})
    if(!title) {
        errors.push({text: 'Please Write a Tittle'})
    }
    if(!description) {
        errors.push({text: 'Please Write a Description'})
    }
    if(errors.length>0){
        res.render('notes/new-note',{
            errors,
            title,
            description
        })
    } else {
        const newNote = new Note({title, description})
        newNote.author = author[0].name
        await newNote.save()
        req.flash('success_msg','Note Added Successfull')
        res.redirect('/notes')
    }
})


module.exports = router
