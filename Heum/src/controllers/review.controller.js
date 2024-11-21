import { StatusCodes } from "http-status-codes";

//services
import { listMyStoreReviews } from "../services/review.service.js";



export const handleMyStoreReviewList = async(req, res, next) =>{
    /*
    #swagger.summary = '나의 리뷰 조회 API'
    #swagger.responses[200] = {
        $ref: "#/components/reviewSchemas/review_200"
      };
    #swagger.responses[404_1] = {
        $ref: "#/components/reviewSchemas/review_404_user",
        };
    #swagger.responses[404_2] = {
        $ref: "#/components/reviewSchemas/review_404_store"
     };
    #swagger.responses[500] = {
        $ref: "#/components/reviewSchemas/review_500"
        };
    */
    console.log("나의 리뷰 조회를 요청했습니다!");
    console.log("body:", req.body, "\nparams:", req.params, "\nquery:", req.query);

    try{
        const reviews = await listMyStoreReviews(
            parseInt(req.params.userId),
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        
        res.status(StatusCodes.OK).success(reviews);
    }catch(err){
        console.log("error: ", err);
        next(err);
    }
}