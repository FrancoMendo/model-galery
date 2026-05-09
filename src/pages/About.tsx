/**
 * Página Acerca - Información sobre el modelo/actriz
 */

import { useEffect, useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { profileConfig } from '../config/profile.config';
import apiClient from '../services/api';

export const About = () => {
  const [aboutMeData, setAboutMeData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const encodedEmail = encodeURIComponent(profileConfig.social.email.address);
        const data = await apiClient.get<{ profile: { aboutMe: any } }>(`/users/profile?email=${encodedEmail}`);
        if (data?.profile?.aboutMe) {
          // Si el JSON es string (por si acaso), lo parseamos
          const parsed = typeof data.profile.aboutMe === 'string'
            ? JSON.parse(data.profile.aboutMe)
            : data.profile.aboutMe;
          setAboutMeData(parsed);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const skills = aboutMeData?.skills;

  const experience = aboutMeData?.experience;

  const currentBio = aboutMeData?.bio || profileConfig.bio;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9f7',
    }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        backgroundColor: 'white',
        padding: '60px 20px',
        borderBottom: '1px solid #e3e6df',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          {/* Foto de perfil grande */}
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #467e03',
            marginBottom: '24px',
          }}>
            <img
              src={profileConfig.photo}
              alt={profileConfig.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.style.backgroundColor = '#467e03';
                  target.parentElement.style.display = 'flex';
                  target.parentElement.style.alignItems = 'center';
                  target.parentElement.style.justifyContent = 'center';
                  target.parentElement.innerHTML = `<span style="color: white; font-size: 60px; font-weight: 700;">${profileConfig.name.charAt(0)}</span>`;
                }
              }}
            />
          </div>

          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#1a1a18',
            marginBottom: '12px',
          }}>
            {profileConfig.name}
          </h1>

          <p style={{
            fontSize: '20px',
            color: '#467e03',
            fontWeight: '600',
            marginBottom: '24px',
          }}>
            {profileConfig.role}
          </p>

          <p style={{
            fontSize: '16px',
            color: '#3f3f39',
            lineHeight: '1.8',
            maxWidth: '700px',
          }}>
            {currentBio}
          </p>
        </div>
      </section>

      {/* Habilidades y Especialidades */}
      {skills?.length > 0 && <section style={{
        padding: '60px 20px',
        backgroundColor: 'white',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a1a18',
            marginBottom: '32px',
            textAlign: 'center',
          }}>
            Especialidades
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}>
            {skills?.map((skill: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#f8f9f7',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '2px solid #e3e6df',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#467e03';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(70, 126, 3, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e3e6df';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{
                  fontSize: '24px',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  ✨
                </span>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1a1a18',
                  margin: 0,
                }}>
                  {skill}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* Experiencia */}
      {experience?.length > 0 && <section style={{
        padding: '60px 20px',
        backgroundColor: '#f8f9f7',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a1a18',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Experiencia Reciente
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            {experience?.map((item: { year: any; title: any; description: any }, index: any) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: '32px',
                  borderRadius: '12px',
                  borderLeft: '4px solid #467e03',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#467e03',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {item.year}
                  </span>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#1a1a18',
                    margin: 0,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#3f3f39',
                    lineHeight: '1.6',
                    margin: 0,
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* Redes Sociales */}
      <section style={{
        padding: '60px 20px',
        backgroundColor: 'white',
        borderTop: '1px solid #e3e6df',
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a1a18',
            marginBottom: '24px',
          }}>
            Sígueme
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '32px',
          }}>
            <a
              href={profileConfig.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '24px',
                backgroundColor: '#f8f9f7',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.3s',
                minWidth: '150px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#467e03';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9f7';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: '#467e03' }}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1a1a18',
              }}>
                Instagram
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;


