

export const encode = (object: any) => {
    const raw = JSON.stringify(object);
    return Buffer.from(raw).toString("base64");
}


export const decode = (token: any) : any => {
    const raw =  Buffer.from(token, "base64").toString();
    return JSON.parse(raw);
}