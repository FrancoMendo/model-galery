/**
 * Componente Header - Navegación principal con perfil
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profileConfig } from '../../config/profile.config';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleEmailClick = () => {
    const subject = encodeURIComponent(profileConfig.social.email.subject);
    window.location.href = `mailto:${profileConfig.social.email.address}?subject=${subject}`;
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e3e6df',
      padding: '16px 20px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '32px',
      }}>
        {/* Sección izquierda: Perfil */}
        <Link 
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          {/* Foto de perfil */}
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #467e03',
            flexShrink: 0,
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(70, 126, 3, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <img 
              src={profileConfig.photo}
              alt={profileConfig.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 0%',
                transform: 'scale(1.3)',
              }}
              onError={(e) => {
                // Fallback si no hay imagen
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.style.backgroundColor = '#467e03';
                  target.parentElement.style.display = 'flex';
                  target.parentElement.style.alignItems = 'center';
                  target.parentElement.style.justifyContent = 'center';
                  target.parentElement.innerHTML = `<span style="color: white; font-size: 20px; font-weight: 700;">${profileConfig.name.charAt(0)}</span>`;
                }
              }}
            />
          </div>

          {/* Nombre y rol */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h1 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#1a1a18',
              margin: 0,
              lineHeight: '1.2',
            }}>
              {profileConfig.name}
            </h1>
            <span style={{
              fontSize: '12px',
              color: '#707066',
              lineHeight: '1.2',
            }}>
              {profileConfig.role}
            </span>
          </div>
        </Link>

        {/* Sección centro: Navegación */}
        <nav style={{
          display: 'flex',
          gap: '28px',
          fontSize: '15px',
          fontWeight: '500',
        }}
        className="nav-desktop"
        >
          <Link 
            to="/" 
            style={{ 
              color: isActive('/') ? '#467e03' : '#707066', 
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#467e03'}
            onMouseLeave={(e) => e.currentTarget.style.color = isActive('/') ? '#467e03' : '#707066'}
          >
            Inicio
          </Link>
          <Link 
            to="/about" 
            style={{ 
              color: isActive('/about') ? '#467e03' : '#707066', 
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#467e03'}
            onMouseLeave={(e) => e.currentTarget.style.color = isActive('/about') ? '#467e03' : '#707066'}
          >
            Acerca
          </Link>
          <Link 
            to="/contact" 
            style={{ 
              color: isActive('/contact') ? '#467e03' : '#707066', 
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#467e03'}
            onMouseLeave={(e) => e.currentTarget.style.color = isActive('/contact') ? '#467e03' : '#707066'}
          >
            Contacto
          </Link>
        </nav>

        {/* Sección derecha: Redes sociales */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          {/* Instagram */}
          <a
            href={profileConfig.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#f0f2ed',
              transition: 'all 0.3s',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#467e03';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f2ed';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{
                color: '#467e03',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as SVGElement).style.color = 'white';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as SVGElement).style.color = '#467e03';
              }}
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* Email */}
          <button
            onClick={handleEmailClick}
            aria-label="Email"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#f0f2ed',
              transition: 'all 0.3s',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#467e03';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f2ed';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{
                color: '#467e03',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as SVGElement).style.color = 'white';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as SVGElement).style.color = '#467e03';
              }}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </button>

          {/* Botón menú móvil */}
          {/* <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '4px',
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
            }}
            className="mobile-menu-btn"
          >
            <span style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#467e03',
              borderRadius: '2px',
              transition: 'all 0.3s',
            }}></span>
            <span style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#467e03',
              borderRadius: '2px',
              transition: 'all 0.3s',
            }}></span>
            <span style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#467e03',
              borderRadius: '2px',
              transition: 'all 0.3s',
            }}></span>
          </button> */}
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderBottom: '1px solid #e3e6df',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        className="mobile-menu"
        >
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <Link to="/" style={{ color: isActive('/') ? '#467e03' : '#707066', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }} onClick={() => setMobileMenuOpen(false)}>
              Inicio
            </Link>
            <Link to="/about" style={{ color: isActive('/about') ? '#467e03' : '#707066', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }} onClick={() => setMobileMenuOpen(false)}>
              Acerca
            </Link>
            <Link to="/contact" style={{ color: isActive('/contact') ? '#467e03' : '#707066', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }} onClick={() => setMobileMenuOpen(false)}>
              Contacto
            </Link>
          </nav>
        </div>
      )}

      {/* Estilos responsive */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

