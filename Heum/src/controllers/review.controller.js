import { StatusCodes } from "http-status-codes";

//services
import { listMyStoreReviews } from "../services/review.service.js";



export const handleMyStoreReviewList = async(req, res, next) =>{
    console.log("나의 리뷰 조회를 요청했습니다!");
    console.log("body:", req.body, "\nparams:", req.params, "\nquery:", req.query);

    try{
        const reviews = await listMyStoreReviews(
            parseInt(req.params.userId),
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).success(data);
    }catch(err){
        next(err);
    }
}