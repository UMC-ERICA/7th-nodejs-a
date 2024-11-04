export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
    const create_at=new Date();
    return {
        nickname: body.nickname,
        create_at,
        name: body.name,
        phone: body.phone,
        birth,
        address: body.address || "",
        state: body.state || "accession",
        point: body.point || "0",
        food: body.food || ""
    };
  };
