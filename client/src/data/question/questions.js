export const questionData = [
    {
        id: 1,
        formId: 1,
        questionOrderId: 3,
        masterId: 1,
        grpId: 1,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "Specify the main processor manufacturer.",
    },
    {
        id: 2,
        formId: 1,
        questionOrderId: 2,
        masterId: "",
        grpId: 1,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "Specify the processor clock speed (in GHz) if known",
    },
    {
        id: 3,
        formId: 2,
        questionOrderId: 4,
        masterId: "",
        grpId: 3,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "Specify the number of cores per processor in known",
    },
    {
        id: 4,
        formId: 1,
        questionOrderId: 1,
        masterId: "",
        grpId: 3,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "Specify the number of physical CPU provisioned in each development environment",
    },
    {
        id: 5,
        formId: 2,
        questionOrderId: 2,
        masterId: "",
        grpId: 3,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "If applicable, specify the number of vCPU provisioned in each development environment",
    },
    {
        id: 6,
        formId: 1,
        questionOrderId: 5,
        masterId: 2,
        grpId: 2,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "State the server type used - please select",
    },
    {
        id: 7,
        formId: 1,
        questionOrderId: 4,
        masterId: 3,
        grpId: 2,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "State the operating system used - please select ",
    },
    {
        id: 8,
        formId: 2,
        questionOrderId: 1,
        masterId: "",
        grpId: 1,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "Specify the number of development environments installed",
    },
    {
        id: 9,
        formId: 2,
        questionOrderId: 3,
        masterId: "",
        grpId: 2,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "State the location country where the development environments are installed",
    },
    {
        id: 10,
        formId: 1,
        questionOrderId: 6,
        masterId: 4,
        grpId: 1,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "State the normal working hours per day - please select",
    },
    {
        id: 11,
        formId: 6,
        questionOrderId: 1,
        masterId: "",
        grpId: 4,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "State the number of Developer, Test/Quality and directly associated product FTE in location",
    },
    {
        id: 12,
        formId: 6,
        questionOrderId: 2,
        masterId: "",
        grpId: 5,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "State the number of Developer, Test/Quality and directly associated product FTE in location",
    },
    {
        id: 13,
        formId: 6,
        questionOrderId: 3,
        masterId: "",
        grpId: 4,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "State the number of Developer, Test/Quality and directly associated product FTE in location",
    },
    {
        id: 14,
        formId: 6,
        questionOrderId: 4,
        masterId: "",
        grpId: 5,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "State the number of Developer, Test/Quality and directly associated product FTE in location",
    },
    {
        id: 15,
        formId: 6,
        questionOrderId: 5,
        masterId: "",
        grpId: 4,
        attributeId: ["1", "2", "4", "3", "5"],
        title: "State the number of Developer, Test/Quality and directly associated associated product FTE in location",
    },
    {
        id: 16,
        formId: 6,
        questionOrderId: 6,
        masterId: "",
        grpId: 5,
        attributeId: ["1", "2", "3", "4", "5"],
        title: "State the number of Developer, Test/Quality and directly associated product FTE in location",
    },
];

export const questionMasterData = [
    {
        id: 1,
        formId: 1,
        orderId: 2,
        attributeId: ["1", "2", "3", "4", "5"],
        masterId: 2,
        title: "Specify the main processor manufacturer."
    },
    {
        id: 2,
        formId: 1,
        orderId: 3,
        attributeId: ["1", "2", "3", "4", "5"],
        masterId: 4,
        title: "Specify the processor clock speed (in GHz) if known."
    },
    {
        id: 3,
        formId: 1,
        orderId: 1,
        attributeId: ["1", "2", "3", "4", "5"],
        masterId: 1,
        title: "Specify the number of physical CPU provisioned in each development environment."
    },
    {
        id: 4,
        formId: 1,
        orderId: 4,
        attributeId: ["1", "2", "3", "4", "5"],
        masterId: 1,
        title: "If applicable, specify the number of vCPU provisioned in each development environment."
    },
    {
        id: 5,
        formId: 1,
        orderId: 5,
        attributeId: ["1", "2", "3", "4", "5"],
        masterId: 1,
        title: "Specify the number of cores per processor in known."
    },
]