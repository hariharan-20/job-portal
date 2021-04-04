const { findOneAndUpdate } = require('../models/job/govjob');
const GovJob = require('../models/job/govjob')
const {
    successResponse,
    errorResponse
} = require('../utils/responseHandler')


const createGovJob = async (req, res) => {
    let govJob = new GovJob(req.body.data)
    govJob.postedby=req.user._id;

    try {
        await govJob.save()

        return successResponse(res, {
            msg: "Gov Job Added Successfuly!"
        }, 200)
    } catch (e) {
        return errorResponse(res, [{
            msg: "Something went wrong!"
        }], 500)

    }
}


const getAllGovJobs = async (req, res) => {
    try{
        const searchParameter={};
        if(req.query.location){
            searchParameter.city={
                '$regex': req.query.location.trim(),
                $options: "i"
            }
        }

        if(req.query.title){
            searchParameter.title={
                '$regex': req.query.title.trim(),
                $options: "i"
            }
        }

        const pageOption = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10
        }


        const govtJobs= await GovJob.find(searchParameter).skip(pageOption.page * pageOption.limit)
        .limit(pageOption.limit).sort({
            createdAt:-1
        });
        successResponse(res, {
            govtJobs
        }, 200)

    }catch(e){
        return errorResponse(res, [{
            msg: "Something went wrong!"
        }], 500)

    }
    


}

const editGovJob = async (req, res) => {
    const {id}=req.params;
    try{
        const govtJob= await GovJob.findOne({_id:id});
        if(!govtJob){
            return errorResponse(res, [{
                msg: "No govt job found!"
            }], 404)

        }
        if(govtJob.postedby!=req.user._id.toString()){
            return errorResponse(res, [{
                msg: "Sorry you don't have the rights!"
            }], 400)

        }
        await GovJob.findOneAndUpdate({_id:id},req.body,{new:true});
        successResponse(res, {
            msg:"Updated GovtJob Successfully!"
        }, 200)

    }catch(e){
        return errorResponse(res, [{
            msg: "Something went wrong!"
        }], 500)
    }

}

const deactivateGovJob = async (req, res) => {
    const {id}=req.params;
    try{
        const govtJob= await GovJob.findOne({_id:id});
        if(!govtJob){
            return errorResponse(res, [{
                msg: "No govt job found!"
            }], 404)

        }
        if(govtJob.postedby!=req.user._id.toString()){
            return errorResponse(res, [{
                msg: "Sorry you don't have the rights!"
            }], 400)

        }
        let status=true;
        if(govtJob.isActive){
            status=false;
        }
        const updatedGovtJob= await findOneAndUpdate({_id:id},{isActive:status},{new:true})
        successResponse(res, {
            status:updatedGovtJob.isActive
        }, 200)

    }catch(e){
        return errorResponse(res, [{
            msg: "Something went wrong!"
        }], 500)

    }


}

module.exports = {
    createGovJob,
    getAllGovJobs,
    editGovJob,
    deactivateGovJob
}