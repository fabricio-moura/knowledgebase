const express = require('express');
//Transforma a string e otimiza para url
const slugify = require('slugify');
const router = express.Router();
const Category = require('./Category');


router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

//Rota Criar
router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined) {

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        });

    } else {
        res.redirect("/admin/categories/new");
    }
});

//Rota listar
router.get("/admin/categories/", (req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/categories/index", {
            categories: categories
        });

    });

});

//Rota deletar
router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });
        } else { // NÃO FOR UM NÚMERO
            res.redirect("/admin/categories");
        }
    } else { // NULL
        res.redirect("/admin/categories");
    }
});

//Rota editar
router.get('/admin/categories/edit/:id', (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect('/admin/categories');
    }

    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render('admin/categories/edit', {
                category: category
            });

        } else {
            res.redirect('/admin/categories');

        }

    }).catch(error => {
        res.redirect('/admin/categories')
    });

});

//Rota update 
router.post('/categories/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({ title: title, slug:slugify(title)}, {       
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect('/admin/categories');

    });

});

module.exports = router;