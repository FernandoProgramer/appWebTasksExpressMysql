import jwt from 'jsonwebtoken'
import { SECRET_KEY_JWT } from '../key.js';

export const validate_token = (req, res, next) => {

    const token = req.headers.cookie?.split('=')[1];
    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token requerido.' });
    }

    try {
        const data = jwt.verify(token, SECRET_KEY_JWT); // Verifica el token
        if (data) req.user = data; next(); // Continúa con el siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado.' }); // Responde si el token no es válido
    }
};