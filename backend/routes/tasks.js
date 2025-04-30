const express=require("express") // express is not global but dotenv is. This is the reason why express has to be imported here but dotenv need not be imported in the task.js file in model folder
const router=express.Router()
const taskController=require("../controllers/taskController")

router.use(express.json()) //express.json is a global middleware

router.post('/', taskController.addTask) 
router.get('/', taskController.getTask)
router.delete('/:id', taskController.deleteTask)

module.exports=router