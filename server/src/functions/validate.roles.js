export const validate_roles = (res, allowed_roles = [], id_rol_user) => {
    if (allowed_roles.length === 0) return;

    if (!allowed_roles.includes(id_rol_user)) {
        return res.status(401).json({
            error: 'No autorizado para acceder a este recurso.',
        });
    }
}