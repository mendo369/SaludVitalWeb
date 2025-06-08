export const environment = {
    backendUrl: 'http://localhost:8080/api/',
    roles:[
        {
            value:1,
            rol:'ADMIN',
            route:'/admin'
        },
        {
            value:2,
            rol:'MEDICO',
            route:'/doctor'
        },
        {
            value:3,
            rol:'RECEPCIONISTA',
            route:'/recepcionist'
        },
    ]
};
