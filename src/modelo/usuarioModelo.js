let usuarios = [
    {id: 1, nombre: 'Juan', correo: 'juan@example.com'},
    {id: 2, nombre: 'María', correo: 'maria@example.com'}
];

class UsuarioModelo {
    static obtenerUsuarios() {
        return usuarios;
    }

    static obtenerUsuarioPorId(id) {
        return usuarios.find(u => u.id === parseInt(id));
    }

    static crear(datos) {
        const nuevoUsuario = {
            id: usuarios.length + 1,
            nombre: datos.nombre,
            correo: datos.correo
        };
        usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    static actualizar(id, datos) 
    {
        const usuario = this.obtenerUsuarioPorId(id); // Reutilizamos el método para obtener el usuario por ID
        if (!usuario) return null;

        // Actualizamos los campos del usuario
        usuario.nombre = datos.nombre || usuario.nombre;
        usuario.correo = datos.correo || usuario.correo;
        return usuario;
    }

    static eliminar(id)
    {
        const indice = usuarios.findIndex(u => u.id === parseInt(id));
        if (indice === -1) return false; // Usuario no encontrado

        usuarios.splice(indice, 1);
        return true; // Usuario eliminado correctamente
    }

}


module.exports = UsuarioModelo;