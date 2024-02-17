export const formData = [
    {
        id: 1,
        productValId: 1,   // For this product (eg. CEDAR) we can have multiple forms associated with it
        forms: [
            {
                id: 1,
                grouping: ["1", "4", "5"],
                name: "CEDAR v1.0",
                statusId: 3,
                desc: "This contains all the questions for CEDAR v1.0"
            },
            {
                id: 2,
                grouping: ["1", "6", "3"],
                name: "CEDAR v1.1",
                statusId: 7,
                desc: "This contains all the questions for CEDAR v1.1"
            }
        ]
    },
    {
        id: 2,
        productValId: 2,   // For this product (eg. PRODUCT-II) we can have multiple forms associated with it
        forms: [
            {
                id: 1,
                grouping: ["3", "5"],
                name: "PRODUCT-II v1.0",
                statusId: 2,
                desc: "This contains all the questions for PRODUCT-II v1.0"
            }
        ]
    },
    {
        id: 3,
        productValId: 3,   // For this product (eg. PRODUCT-III) we have can multiple forms associated with it
        forms: [
            {
                id: 1,
                grouping: ["5", "6", "2"],
                name: "PRODUCT-III v1.0",
                statusId: 6,
                desc: "This contains all the questions for PRODUCT-III v1.0"
            },
            {
                id: 2,
                grouping: ["5", "1", "3"],
                name: "PRODUCT-III v1.1",
                statusId: 4,
                desc: "This contains all the questions for PRODUCT-III v1.1"
            }
        ]
    },
    {
        id: 4,
        productValId: 4,   // For this product (eg. PRODUCT-IV) we have can multiple forms associated with it
        forms: [
            {
                id: 1,
                grouping: ["1", "2", "3"],
                name: "PRODUCT-IV v1.0",
                statusId: 6,
                desc: "This contains all the questions for PRODUCT-IV v1.0"
            },
            {
                id: 2,
                grouping: ["3", "4", "5"],
                name: "PRODUCT-IV v1.1",
                statusId: 4,
                desc: "This contains all the questions for PRODUCT-IV v1.1"
            },
            {
                id: 3,
                grouping: ["1", "3", "5", "6", "2"],
                name: "PRODUCT-IV v1.2",
                statusId: 4,
                desc: "This contains all the questions for PRODUCT-IV v1.1"
            }
        ]
    },
];

export const forms = [
    {
        id: 1,
        formName: "",
        productId: 1,
        statusId: 1,
        desc: "These are the form for Cedar v1.0"
    },
    {
        id: 2,
        formName: "",
        productId: 2,
        statusId: 4,
        desc: "These are the form for PRODUCT-II v1.0"
    },
    {
        id: 3,
        formName: "",
        productId: 3,
        statusId: 7,
        desc: "These are the form for PRODUCT-III v1.0"
    },
    {
        id: 4,
        formName: "",
        productId: 4,
        statusId: 3,
        desc: "These are the form for PRODUCT-IV v1.0"
    },
    {
        id: 5,
        formName: "",
        productId: 5,
        statusId: 6,
        desc: "These are the form for Cedar v1.1"
    },
    {
        id: 6,
        formName: "",
        productId: 6,
        statusId: 2,
        desc: "These are the form for Cedar v1.1"
    }
];