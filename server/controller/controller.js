var Userdb = require('../model/model');

//create and save new user
exports.create = (req,res)=>{
    //validate request//
    if(!req.body){
        res.status(400).send({message:"content cannot be empty"});
        return;
    }
    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    user
      .save(user)
      .then(data=>{
          //res.send(data)//
          res.redirect('/add-user');
      })
      .catch(err=>{
          res.status(500).send({
              message:err.message || "some error occurred"
          });
      });


}
//retrive and return all users 
exports.find = (req,res)=>{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message : err.message || "error occured while retriving data"
        });
    });

}
//update a new users
exports.update = (req,res)=>{
    if(!req.body){
        return res
          .status(400)
          .send({message: "The data is empty"})

    }
    const id = req.body.id;
    var dataToUpdate = {    
        status: req.body.status,
        gender: req.body.gender ,
        email: req.body.email,
        name: req.body.name,
    }
     Userdb.findByIdAndUpdate(id, dataToUpdate,{userFindAndModify:true})
      .then(data=>{
          if(!data){
              res.status(404).send({message: `cannot update user ${id}.Mayby user not available`})
          }else{
              res.send(data)
          }

      })
      .catch(err=>{
          res.status(500).send({message:"Error update user information"})
      })

}
//delete a user with spercified user id in the require
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

