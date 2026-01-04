const express=require("express") // express is not global but dotenv is. This is the reason why express has to be imported here but dotenv need not be imported in the task.js file in model folder
const router=express.Router()
const taskController=require("../controllers/taskController")
const authMiddleware=require("../middleware/authMiddleware")

router.use(express.json()) //express.json is a global middleware

router.post('/', authMiddleware, taskController.addTask) 
router.get('/', authMiddleware, taskController.getTask)
router.delete('/:id', authMiddleware, taskController.deleteTask)
router.patch('/query', authMiddleware, taskController.updateStatus)
router.put('/:id', authMiddleware, taskController.updateTask)

module.exports=router