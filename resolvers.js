const db = require('./db')
const Query = {
    test: () => 'Test Success, GraphQL server is up & running !!',
    student:() => db.students.list()[2],
    students: () => db.students.list(),
    colleges: () => db.colleges.list(),
    college: () => db.colleges.list()[0],
    studentById:(root,args,context,info) => {
        return db.students.get(args.id);
     },
     setFavouriteColor:(root,args) => {
        return  "Your Fav Color is :"+args.color;
     }
 }

 const Student = {
    fullName:(root,args,context,info) => {
       return root.firstName+":"+root.lastName
    },
    college:(root) => {
       return db.colleges.get(root.collegeId);
    }
 }

 const Mutation = {
    addStudent:(root,args,context,info) => {
       return db.students.create({collegeId:args.collegeId,
       firstName:args.firstName,
       lastName:args.lastName})
    }
 }

 module.exports = {Query, Student, Mutation}