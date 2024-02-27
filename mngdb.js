const pipeline = [
    {
        $unset: [
            'email',
            'tel',
            'fullName',
            'disadvantagedBackgroundDescription',
            'availableOnWhatsApp',
            'phoneCalls',
            'workshops',
            'dateOfBirth'
        ]
    }, {
        $match: {
            createdAt: {
                $gte: new Date(2021, 5, 1),
                $lt: new Date(2023, 5, 1)
            }
        }
    }, {
        $addFields: {
            cityOid: {
                $toObjectId: '$cityId'
            }
        }
    }, {
        $lookup: {
            from: 'cities',
            localField: 'cityOid',
            foreignField: '_id',
            as: 'city'
        }
    }, {
        $unwind: {
            path: '$city'
        }
    }, {
        $match: {
            'city.name': {
                $in: [
                    'Birmingham',
                    'Glasgow',
                    'London',
                    'Manchester'
                ]
            }
        }
    }, {
        $lookup: {
            from: 'steps',
            localField: 'steps.stepId',
            foreignField: '_id',
            as: 'stepObjects'
        }
    }, {
        $project: {
            cityName: '$city.name',
            applicationAccepted: 1,
            archived: 1,
            experience: 1,
            createdAt: 1,
            stepStatus: '$steps.status',
            stepNumber: '$stepObjects.number'
        }
    }
];

const data = require("./students.json");

const steps = [1, 2, 3, 4.1, 4.2, 5];

function processStudent(student) {
    return {
        applicationAccepted: student.applicationAccepted,
        experience: student.experience,
        city: student.cityName,
        steps: Object.fromEntries(steps.map((stepNumber) => {
            const index = student.stepNumber.indexOf(stepNumber);
            if (index === -1) {
                return [stepNumber, null];
            }
            return [stepNumber, student.stepStatus[index]];
        })),
    }
}

function padN(n, width) {
    return `${n}`.padStart(width, "0");
}

["Birmingham", "Glasgow", "London", "Manchester"].forEach((city) => {
    const cityData = data.filter((student) => student.cityName === city);

    console.log(`${city.padEnd(15, " ")}\tTotal: ${cityData.length}`);

    ["None", "Basic", "Intermediate", "Advanced"].forEach((experience) => {
        const all = cityData.filter((student) => student.experience === experience).map(processStudent);

        const approvedStep5 = all.filter((student) => student.steps[5] === "Approved");
        const submittedStep5 = all.filter((student) => student.steps[5] !== null);

        console.log(`${experience.padEnd(15, " ")}\tTotal: ${padN(all.length, 3)}\tSubmitted step 5: ${padN(submittedStep5.length, 2)}\tApproved step 5: ${padN(approvedStep5.length, 2)}`)
    });

    console.log("\n");
});