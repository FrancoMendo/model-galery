/**
 * Configuración del perfil de usuario/modelo
 */

export const profileConfig = {
  name: 'Magalí Matas',
  photo: '/images/models/user_avatar.JPG',
  role: 'Modelo & Actriz Profesional',
  social: {
    instagram: {
      url: 'https://www.instagram.com/magalimatas/',
      username: '@magalimatas',
    },
    email: {
      address: 'magalimatas22@gmail.com',
      subject: 'Consulta desde Model Gallery',
    },
  },

  bio: 'Modelo y actriz profesional especializada en moda, editorial y comercial.',
} as const;

export default profileConfig;

