export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
    const create_at=new Date();
    return {
        nickname: body.nickname,
        create_at,
        name: body.name,
        phone: body.phone,
        birth,
        address: body.address ?? null,
        state: body.state || "accession",
        delete_at: new Date(body.delete_at) ?? null,
        point: body.point || 0,
        food: body.food ?? null
    };
  };
