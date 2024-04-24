const permissions = [
    {
        id: "1",
        permission: "create class",
    },
    {
        id: "2",
        permission: "create room",
    },
    {
        id: "3",
        permission: "create course",
    },
    {
        id: "4",
        permission: "create event",
    },
    {
        id: "10",
        permission: "create teacher",
    },
    {
        id: "5",
        permission: "view timetable",
    },
    {
        id: "6",
        permission: "give room permission",

    },
    {
        id: "7",
        permission: "view booked room details",

    },
    {
        id: "8",
        permission: "send room permission requests",

    },
    {
        id: "9",
        permission: "admin portal access",

    },
]

const roleBasedPermissions = [
    {
        id: "30",
        role: "user",
        permissions: [
            {
                id: "5",
                permission: "view timetable",
            },
            {
                id: "8",
                permission: "send room permission requests",
            },
        ]
    },
    {
        id: "31",
        role: "teacher",
        permissions: [
            {
                id: "1",
                permission: "create class",
            },
        ]
    },
    {
        id: "31",
        role: "admin",
        permissions: [
            {
                id: "2",
                permission: "create room",
            },
            {
                id: "3",
                permission: "create course",
            },
            {
                id: "4",
                permission: "create event",
            },
            {
                id: "10",
                permission: "create teacher",
            },
        ]
    },
]