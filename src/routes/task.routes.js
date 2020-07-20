'use strict';
const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('db-tasks', ['tasks']);
router.get('/task', (req, res, next) => {
    db.tasks.find((error, tasks) => {
        if (error) return next(error);
        res.json(tasks);
    })
});

router.get('/task/:id', (req, res, next) => {
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},(error, task) => {
        if (error) return next(error);
        res.status(202).send(task )
    })
});

router.post('/task', async(req, res, next) => {
    const body = req.body;
    if (!body.title || !(body.isDone + '')) res.status(400).send({ error: 'Bad Data' });
    await db.tasks.save(body,(error, task) => {
        if (error) return next(error);
        res.status(202).send(task)
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
    let updateTask = {};
    
    if(task.isDone) {
        updateTask.isDone = task.isDone;
    }
    if(task.title) {
        updateTask.title = task.title;
    }
    if(!updateTask) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, {}, (err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    }
});


module.exports = router;