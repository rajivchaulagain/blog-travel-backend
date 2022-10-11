import jwt from 'jsonwebtoken';

//generate token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export const transform = (r) => {
    return {
        fileName: r.file_name,
        mimeType: r.mime_type,
        url: `${process.env.BASE_URL}/${r.destination}/${r.file_name}`,
        // url: `${process.env.APP_URL}:${process.env.PORT}/${r.destination}/${r.file_name}`,
    };
};