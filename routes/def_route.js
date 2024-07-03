const express = require("C:/Users/a1/AppData/Roaming/npm/node_modules/express")
const router=express.Router()

const {homePage,allNews,idNews,postNews,updateNews,deleteNews} = require("../controlles/route_controll")


router.route('/').get(homePage)

router.route('/news').get(allNews)

router.route('/news/:num_id').get(idNews)

router.route('/news').post(postNews)

router.route("/news").put(updateNews)

router.route("/news").delete(deleteNews)

module.exports=router;