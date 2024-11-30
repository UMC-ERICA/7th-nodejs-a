export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
    const create_at = new Date();
    const delete_at = body.delete_at ? new Date(body.delete_at) : null;
    
    return {
        nickname: body.nickname,
        create_at,
        name: body.name,
        email: body.email,
        phone: body.phone,
        birth,
        address: body.address ?? null,
        state: body.state || "accession",
        delete_at,
        point: body.point || 0,
        food: body.food ?? null
    };
};