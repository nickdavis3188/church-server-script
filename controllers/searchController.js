const membersModel = require("../models/membersModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const rexSeach = require("../utils/searchExp");


module.exports = {
    //get product by name
    getSearchResult: catchAsync(async (req,res,next) => {
        //get the search word from client with req.body.word
        const {search} = req.query;

        if (search) {

            const regex = new RegExp(rexSeach.escapeRegex(search),'gi');

            //search by name or category or keyFeatures
           await  membersModel.find({$or:[{ "Firstname": regex },{"Surname":regex},{"Email":regex},{"RegNumber":regex},{'PhoneNo':regex},{'MemberID':regex}]}, function(err, data) {

                if(err){

                    new AppError("sorry somthing went wrong", 401)
                    // console.log(err);
                }else{

                    if(data.length < 1){

                        new AppError("item not found", 404)

                    }else{
                        
                        res.status(201).json({
                            status:"success",
                            data:data
                        })
                    }
                }
            }); 
         }
    })
}