'use strict';
const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('db-tasks', ['tasks']);
router.get('/task', (req, res, next) => {
    db.tasks.find((error, tasks) => {
        if (error) return next(error);
        res.status(202).send({ tasks: tasks })
    })
});

router.get('/task/:id', (req, res, next) => {
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},(error, task) => {
        if (error) return next(error);
        res.status(202).send({ tasks: task })
    })
});

router.post('/task', (req, res, next) => {
    const body = req.params;
    if (!body.title || !(body.isDone + '')) res.status(400).send({ error: 'Bad Data' });
    db.tasks.save((error, tasks) => {
        if (error) return next(error);
        res.status(202).send(tasks)
    });
});

router.delete('/task/:id', (req, res, next) => {
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},(error,result)=>{
        if (error) return next(error);
        res.send(result);
    })
});

router.put('/task/:id', (req, res, next) => {
    const task = req.body;
    const updateTask = {};
    
    if (body.isDone) updateTask.isDone = task.isDone;
    if (body.title) updateTask.title = task.title;
    
    if(!updateTask) return res.send.status(400).send({error:'Bad Request'})
    
    db.tasks.update({_id:mongojs.ObjectId(req.params.id)},(error,task)=>{
        if (error) return next(error);
        res.send(202).send(task);
    })
});

module.exports = router;