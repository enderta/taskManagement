const MongoClient = require('mongodb').MongoClient;

async function run() {
    const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('CYFDevDB');
        const collection = db.collection('applicant_progresses');

        const pipeline = [
            {
                $lookup: {
                    from: "students",
                    localField: "userId",
                    foreignField: "userId",
                    as: "student"
                }
            },
            {
                $addFields: {
                    stepOid: { $toObjectId: "$stepId" }
                }
            },
            {
                $lookup: {
                    from: "steps",
                    localField: "stepOid",
                    foreignField: "_id",
                    as: "step"
                }
            },
            {
                $unwind: {
                    path: "$student"
                }
            },
            {
                $match: {
                    "student.cityId": { $regex: /^[\da-f]{24}$/ }
                }
            },
            {
                $addFields: {
                    cityOid: { $toObjectId: "$student.cityId" }
                }
            },
            {
                $lookup: {
                    from: "cities",
                    localField: "cityOid",
                    foreignField: "_id",
                    as: "city"
                }
            },
            {
                $unwind: {
                    path: "$city"
                }
            },
            {
                $unwind: {
                    path: "$step"
                }
            },
            {
                $group: {
                    _id: "$student._id",
                    cityName: { $first: "$city.name" },
                    createdAt: { $first: "$student.createdAt" },
                    experience: { $first: "$student.experience" },
                    stepNumbers: { $push: "$step.number" },
                    stepStatuses: { $push: "$status" },
                }
            }, {
                $match: {
                    createdAt: {
                        $gte: new Date(2021, 5, 1),  // 2021-06-01
                        $lt: new Date(2023, 5, 1)  // 2023-06-01
                    },
                    cityName: {
                        $in: [
                            "Glasgow",
                            "London",
                            "Manchester",
                            "Birmingham"
                        ]
                    }
                }
            },
        ];

        const result = await collection.aggregate(pipeline).toArray();
        console.log(result.length);
    } finally {
        await client.close();
    }
}
let arr;
run().then(data => {
    arr = data;
    console.log(arr);
    console.log(arr.length);
}).catch(console.error);