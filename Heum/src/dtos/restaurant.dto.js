export const bodyToRes = (body) =>{
    return{
        name: body.name,
        phone: body.phone || "",
        address: body.address,
    };
}

