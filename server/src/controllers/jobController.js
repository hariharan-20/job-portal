const Job = require('../models/job/job')
const JobApplication = require('../models/job/jobapplication')
const {
    reducePicSize
} = require('../utils/sharpHandler');

const {
    successResponse,
    errorResponse
} = require('../utils/responseHandler');
const jobapplication = require('../models/job/jobapplication');


const gettingArraySkills = (skills) => {
    const skillsArr = [];
    const skillsArrObj = JSON.parse(skills);

    skillsArrObj.forEach(skill => {
        skillsArr.push(skill.value);
    });
    return skillsArr;
}

// Post new job by employer
const postNewJob = async (req, res) => {
    console.log('posted job--------------------------------------------------------------------');
    console.log('REQ BODY-----------------------------------------------------------  ', req.body);
    console.log('req file---------------------------------------------------------- ', req.file);
    //console.log(req.user)

    //console.log('body----------  ',req.body);


    // Get Data
    const data = req.body
    const {
        skills,
        minsalary,
        maxsalary
    } = req.body;
    //console.log(data)
    if (parseInt(minsalary) > parseInt(maxsalary)) {
        return errorResponse(res, [{
            msg: "Min Salary cannot be more than Max Salary"
        }], 400)

    }

    if (skills) {
        const skillsArr = gettingArraySkills(skills);
        data.skills = skillsArr;
    }
    // Verify Data

    let buffer;
    if (req.file) {
        data.companylogo = req.file.buffer
        // buffer = await reducePicSize(req.file.buffer);
        // data.companylogo = {
        //     data:buffer,
        //     contentType: 'image/png'
        // }
    }
    const newPost = new Job(data)
    newPost.postedby = req.user._id
    // Save Data
    try {
        await newPost.save()
        return successResponse(res, {
            msg: "Job added successfully!"
        }, 201)
    } catch (e) {
        console.log(e)
        return errorResponse(res, [{
            msg: "Error Posting"
        }], 500)
    }
}


// Edit Jobs
const editJob = async (req, res) => {
    console.log('REQ BODY-----------------------------------------------------------  ', req.body);
    console.log('req file---------------------------------------------------------- ', req.file);
    const data = req.body;
    const {
        skills,
        minsalary,
        maxsalary
    } = req.body;
    if (parseInt(minsalary) > parseInt(maxsalary)) {
        return errorResponse(res, [{
            msg: "Min Salary cannot be more than Max Salary"
        }], 400)

    }

    if (skills) {
        const skillsArr = gettingArraySkills(skills);
        data.skills = skillsArr;
    }
    let buffer;
    if (req.file) {
        data.companylogo = req.file.buffer
    }
    // Check if owner or admin
    try {

        const validJob = await Job.findOne({
            _id: req.body.id
        });

        if (!validJob) {
            return errorResponse(res, [{
                msg: "No job found!"
            }], 404)
        }

        if (validJob.postedby != req.user._id.toString()) {

            return errorResponse(res, [{
                msg: "Sorry! you haven't posted this job"
            }], 400)
        }


        await Job.findOneAndUpdate({
            _id: req.body.id
        }, data, {
            new: true
        })

        successResponse(res, {
            msg: "Job Edit Success!"
        }, 200)


    } catch (e) {
        return errorResponse(res, [{
            msg: "Something went wrong"
        }], 500)
    }

}

// Get Job Details
const getJobDetails = async (req, res) => {
    try {
        let jobDetails = await Job.findOne({
            _id: req.body.id
        })
        return successResponse(res, jobDetails, 200)
    } catch (e) {
        return errorResponse(res, [{
            msg: "Error Posting"
        }], 500)
    }


}

// Change Job Status
const editJobStatus = async (req, res) => {
    // Check if owner or admin
    // Check if owner or admin
    let status;
    if (req.body.status) {
        status = "Open"
    } else {
        status = "Close"
    }

    Job.findOneAndUpdate({
        _id: req.body.id
    }, {
        $set: {
            status: status
        }
    }, {
        new: true
    }, (err, doc) => {
        console.log(err)
        console.log(doc)
        if (err) {
            return errorResponse(res, [{
                msg: "Error Posting"
            }], 500)
        } else {
            if (doc) {
                return successResponse(res, {
                    msg: "Job Status Changes Successfuly!"
                }, 200)
            } else {
                return errorResponse(res, [{
                    msg: "Job not found"
                }], 500)
            }
        }
    })

}

// Deactive Job
const deactivateJob = async (req, res) => {
    // Check if owner or admin
    Job.findOneAndUpdate({
        _id: req.body.id
    }, {
        $set: {
            isActive: false
        }
    }, {
        new: true
    }, (err, doc) => {
        console.log(err)
        console.log(doc)
        if (err) {
            return errorResponse(res, [{
                msg: "Error Posting"
            }], 500)
        } else {
            if (doc) {
                return successResponse(res, {
                    msg: "Job Deactivated successfully!"
                }, 200)
            } else {
                return errorResponse(res, [{
                    msg: "Job not found"
                }], 500)
            }
        }
    })
}

// Get All Active Jobs without any filter
const getAllJobs = async (req, res) => {

    try {
        const searchParameter = {};
        if(!req.user || req.user.userrole.roletype !== 'A'){
            searchParameter.isActive = true
        }
        if (req.query.location) {
            searchParameter.location = {
                '$regex': req.query.location.trim(),
                $options: "i"
            }
        }

        // const searchKeyword={};
        // if (req.query.keyword) {
        //     searchKeyword.title = {
        //         '$regex': req.query.keyword.trim(),
        //         $options: "i"
        //     }
        //     searchKeyword.companyname = {
        //         '$regex': req.query.keyword.trim(),
        //         $options: "i"
        //     }

        // }
        // if (req.query.company) {
        //     searchParameter.companyname = {
        //         '$regex': req.query.company.trim(),
        //         $options: "i"
        //     }

        // }

        const pageOption = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10
        }



        if (req.query.keyword) {
            const searchKeyword = {};

            searchKeyword.title = {
                '$regex': req.query.keyword.trim(),
                $options: "i"
            }
            searchKeyword.companyname = {
                '$regex': req.query.keyword.trim(),
                $options: "i"
            }

            const jobs = await Job.find(searchParameter).or([{
                        companyname: searchKeyword.companyname
                    },
                    {
                        title: searchKeyword.title
                    }
                ]).skip(pageOption.page * pageOption.limit)
                .limit(pageOption.limit).sort({
                    createdAt: -1
                })


            console.log("Working One");
            return successResponse(res, jobs, 200, "Success")
        }


        let jobs = await Job.find(searchParameter).skip(pageOption.page * pageOption.limit)
            .limit(pageOption.limit).sort({
                createdAt: -1
            })


        if (req.user) {
            const UserSave = require('../models/user/usersave')
            // const testUser = await UserSave.find({
            //     userid: req.user._id
            // })
            // {
            //     $match: searchParameter
            // }, 
            // const test = await Job.aggregate([{
            //     "$lookup": {
            //         "from": "usersaves",
            //         "localField": "_id",
            //         "foreignField": "userid",
            //         "as": "saved"
            //     }
            // }])
            // console.log(test);

            let tempSavedJobs = []
            for (let i = 0; i < jobs.length; i++) {
                let tempdata = await UserSave.findOne({
                    userid: req.user._id,
                    jobid: jobs[i]._id
                })



                if (tempdata) {
                    tempSavedJobs.push({
                        _id: jobs[i]._id,
                        isSaved: true,
                        name: jobs[i].name,
                        title: jobs[i].title,
                        companyname: jobs[i].companyname,
                        companylogo: jobs[i].companylogo,
                        category: jobs[i].category,
                        location: jobs[i].location,
                        qualification: jobs[i].qualification,
                        skills: jobs[i].skills,
                        minsalary: jobs[i].minsalary,
                        maxsalary: jobs[i].maxsalary,
                        isActive: jobs[i].isActive,
                        lastDate: jobs[i].lastDate,
                        description: jobs[i].description,
                        maxexperience: jobs[i].maxexperience,
                        minexperience: jobs[i].minexperience,
                        jobType: jobs[i].jobType,
                        summery: jobs[i].summery,
                        status: jobs[i].status,
                        ismassrecruiter: jobs[i].ismassrecruiter,
                        createdAt: jobs[i].createdAt,
                        updatedAt: jobs[i].updatedAt,
                    })
                } else {
                    tempSavedJobs.push({
                        _id: jobs[i]._id,
                        isSaved: false,
                        name: jobs[i].name,
                        title: jobs[i].title,
                        companyname: jobs[i].companyname,
                        companylogo: jobs[i].companylogo,
                        category: jobs[i].category,
                        location: jobs[i].location,
                        qualification: jobs[i].qualification,
                        skills: jobs[i].skills,
                        minsalary: jobs[i].minsalary,
                        maxsalary: jobs[i].maxsalary,
                        isActive: jobs[i].isActive,
                        lastDate: jobs[i].lastDate,
                        description: jobs[i].description,
                        maxexperience: jobs[i].maxexperience,
                        minexperience: jobs[i].minexperience,
                        jobType: jobs[i].jobType,
                        summery: jobs[i].summery,
                        status: jobs[i].status,
                        ismassrecruiter: jobs[i].ismassrecruiter,
                        createdAt: jobs[i].createdAt,
                        updatedAt: jobs[i].updatedAt,
                    })
                }


            }

            console.log(tempSavedJobs);
            return successResponse(res, tempSavedJobs, 200, "Success")

        }


        // console.log("Working Two");
        // console.log(req.user._id);
        successResponse(res, jobs, 200, "Success")
    } catch (e) {
        // Log for further investigation
        console.log(e);
        return errorResponse(res, [{
            msg: "Error getting data"
        }], 500)
    }
}


const getAllJobsCount=async(req,res)=>{

    try {
        const searchParameter = {};
        if (req.query && req.query.location) {
            searchParameter.location = {
                '$regex': req.query.location.trim(),
                $options: "i"
            }
        }
        const searchKeyword = {};
        if (req.query && req.query.keyword) {
            

            searchKeyword.title = {
                '$regex': req.query.keyword.trim(),
                $options: "i"
            }
            searchKeyword.companyname = {
                '$regex': req.query.keyword.trim(),
                $options: "i"
            }
            const jobCount = await Job.find(searchParameter).or([{
                companyname: searchKeyword.companyname
            },
            {
                title: searchKeyword.title
            }
        ]).count()
        //console.log(jobCount)
    
    
    return successResponse(res, jobCount, 200)
           
        }
        const jobCount = await Job.find(searchParameter).count()
    // console.log(jobCount)


return successResponse(res, jobCount, 200)
    }
        catch(e){
                // Log for further investigation
                return errorResponse(res, [{
                    msg: "Error getting data"
                }], 500)
            
        }

}


// Get All Jobs Posted by employer
const getMyJobs = async (req, res) => {
    console.log(req.user)
    console.log("Get all jobs without filter working")
    const searchParameter = {
        postedby: req.user._id
    };
    if (req.query.location) {
        searchParameter.location = {
            '$regex': req.query.location.trim(),
            $options: "i"
        }
    }
    // if (req.query.title) {
    //     searchParameter.title = {
    //         '$regex': req.query.title.trim(),
    //         $options: "i"
    //     }

    // }
    // if (req.query.company) {
    //     searchParameter.companyname = {
    //         '$regex': req.query.company.trim(),
    //         $options: "i"
    //     }

    // }
    try {
        const pageOption = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10
        }

        // if (req.query.limit || req.query.page) {
        //     const jobs = await Job.find(searchParameter).skip(pageOption.page * pageOption.limit)
        //         .limit(pageOption.limit).sort({createdAt: -1})

        //     return successResponse(res, jobs, 200, "Success")

        // }

        if (req.query.keyword) {
            const searchKeyword = {};

            searchKeyword.title = {
                '$regex': req.query.keyword.trim(),
                $options: "i"
            }
            searchKeyword.companyname = {
                '$regex': req.query.keyword.trim(),
                $options: "i"
            }
            const jobs = await Job.find(searchParameter).or([{
                        companyname: searchKeyword.companyname
                    },
                    {
                        title: searchKeyword.title
                    }
                ]).skip(pageOption.page * pageOption.limit)
                .limit(pageOption.limit).sort({
                    createdAt: -1
                })


            return successResponse(res, jobs, 200, "Success")
        }

        const jobs = await Job.find(searchParameter).skip(pageOption.page * pageOption.limit)
            .limit(pageOption.limit).sort({
                createdAt: -1
            });
        successResponse(res, jobs, 200, "Success")
    } catch (e) {
        // Log for further investigation
        return errorResponse(res, [{
            msg: "Error getting data"
        }], 500)
    }
}

// Apply for job
const jobApplication = async (req, res) => {
    // Check weather job corresponding to id (req.body.id) has owner equal to authenticated user

    let job = await Job.findOne({
        _id: req.body.id
    })

    if (!job) {
        // Save the error in log
        return errorResponse(res, [{
            msg: "Job not found"
        }], 404)
    }

    // Check if user already applied


    // If needed check if user allowed to apply for the job or not.


    let jobApply = await new JobApplication()
    jobApply.userid = req.user._id
    jobApply.jobid = job.id

    try {
        await jobApply.save()
        successResponse(res, {
            msg: "Success"
        }, 200, "Success")
    } catch (e) {
        // TODO Log the error
        return errorResponse(res, [{
            msg: "Internal Server Error"
        }], 500)
    }
}


// Get Applications sent by users to a particular job
// For owner to see the applications for a job
// getMyJobApplication
const getMyJobApplication = async (req, res) => {
    // Check if employeer is the owner of posted job 
    // only show application if job id posted by value matches with user id
    let returnJobApplications = []
    const UserPersonalData = require('../models/user/userpersonaldata')

    let value = await JobApplication.find({
        jobid: req.body.id
    }).populate('userid', 'name email phone')


    for (let i = 0; i < value.length; i++) {
        let temp_data = await UserPersonalData.findOne({
            userid: value[i].userid._id
        })
        console.log(value[i]);
        returnJobApplications.push({
            _id: value[i]._id,
            name: value[i].userid.name,
            email: value[i].userid.email,
            phone: value[i].userid.phone,
            displayimage: temp_data.displayimage,
        })
    }



    successResponse(res, returnJobApplications, 200, "Success")

}





// Applications send by users
// For user to see the sent application
const getMyApplications = async (req, res) => {

    let myJobApplication = await JobApplication.find({
        userid: req.user._id
    }).populate('jobid')

    successResponse(res, myJobApplication, 200, "Success")
}

// Get My Job Application Count
const getJobApplicationCount = async (req, res) => {
    //   TODO Check if userid match with owner id
    const job = await Job.findOne({
        _id: req.body.id
    });
    if (job.postedby != req.user._id.toString()) {
        return errorResponse(res, [{
            msg: "Sorry! you don't have rights"
        }], 401)
    }

    let jobCount = await JobApplication.find({
        jobid: req.body.id
    }).count()

    console.log(jobCount)

    successResponse(res, {
        cout: jobCount
    }, 200, "Success")
}

// Create and donwload user CV
const downloadUserCV = async (req, res) => {

}

const getAllJobApplicationCount = async (req, res) => {
    try {
        const myJobs = await Job.find({
            postedby: req.user._id
        });
        let allCandidateCount = [];
        let candidateCount;

        for (let jobNo = 0; jobNo < myJobs.length; jobNo++) {

            candidateCount = await JobApplication.find({
                jobid: myJobs[jobNo]._id
            }).count();

            const countObj = {
                jobid: myJobs[jobNo]._id,
                count: candidateCount
            }
            allCandidateCount.push(countObj);
        }

        successResponse(res, allCandidateCount, 200)

    } catch (e) {
        return errorResponse(res, [{
            msg: "Something went wrong!"
        }], 500)

    }



}



module.exports = {
    postNewJob,
    getAllJobs,
    getAllJobsCount,
    getMyJobs,
    jobApplication,
    getMyJobApplication,
    getMyApplications,
    editJob,
    editJobStatus,
    deactivateJob,
    getJobDetails,
    getJobApplicationCount,
    getAllJobApplicationCount,
    downloadUserCV
}