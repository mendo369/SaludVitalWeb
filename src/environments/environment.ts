export const environment = {
    backendUrl: 'http://localhost:8082/api/',
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
