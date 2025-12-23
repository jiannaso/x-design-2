import React from 'react';
import '../App.css';
import selinImage from '../assets/about/selindursun.jpg';
import jiannaImage from '../assets/about/jiannaso.jpeg';
import joyImage from '../assets/about/joywu.jpeg';
import seasLogo from '../assets/about/seas.avif';
import coopLogo from '../assets/about/coop.avif';
import gsdLogo from '../assets/about/gsd.avif';
import bemyeyesLogo from '../assets/about/bemyeyes.avif';
import sloanLogo from '../assets/about/sloan.avif';

const About = ({ onBack }) => {
  const teamMembers = [
    {
      name: "Selin DURSUN",
      role: "Lead Creative Technologist",
      description: "Selin Dursun is a creative technologist and designer currently working at Samsung Research America. She is an alumna of the Harvard MDes, where her work focused on the intersection of design, computation, and emerging technologies. Her practice centers on designing and prototyping interactive systems that combine visual, spatial, and computational elements. She has contributed to research–driven installations and exhibitions supported by academic and cultural institutions, working across disciplines including creative coding, human–computer interaction, and experiential design.",
      technicalRole: "Computational Flower Design – Concept",
      stack: "react three fiber, GLSL – shaders",
      image: selinImage
    },
    {
      name: "Jianna SO",
      role: "Full Stack Design Engineer",
      description: "Jianna So is a PhD student in Computer Science at Harvard University, where she brings together design, technology, and social justice to build a more accessible and inclusive future. With a background that spans Stanford University Product Design and Human Computer Interaction programs, Jianna's work centers on a fundamental question: 'who can we better include?'Jianna has shaped Stanford's approach to accessibility–focused HCI, teaching courses on designing for disability and educational equity. She is also a co–founder of the Stanford Design for All Lab, a research lab that explores the intersection of design, technology, and social justice.",
      technicalRole: "Frontend – Backend implementation",
      stack: "Full Stack Development",
      image: jiannaImage
    },
    {
      name: "Joy WU",
      role: "UI Designer",
      description: "Joy Wu is a graphic designer graduated from Harvard Graduate School of Design (MDes) and School of Visual Arts (BFA). She's featured in NYC Type Directors Club, Art Directors Club, SVA.edu, SVA Spring Show, Asia Pacific APC13, CO2 Competition, The Light City, South Korea IOAF, Pentagram Design, and Graphis New Talents. Hosted HarvardxDesign Annual Conference, Workshops collaborated with IDEO, participated at MIT delta v and Sloan Design Club. Previously worked in United Nations as a project manager and chief designer, Pentagram as a designer, The Egg House as a senior designer, and RYF Creative as a creative director.",
      technicalRole: "Graphic – Wireframe Design",
      stack: "UI–UX Design",
      image: joyImage
    }
  ];

  return (
    <div style={{ 
      width: "100vw", 
      minHeight: "100vh", 
      backgroundColor: "#000000",
      color: "#FFFFFF",
      padding: "40px",
      overflow: "auto",
      position: "relative"
    }}>
      {/* Back button */}
      <button 
        onClick={onBack}
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          background: "none",
          border: "2px solid white",
          color: "white",
          padding: "10px 20px",
          fontFamily: "balgin-regular",
          fontSize: "16px",
          borderRadius: "20px",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        back
      </button>


      {/* Main Content Container */}
      <div style={{
        paddingTop: "180px",
        maxWidth: "1400px",
        margin: "0 auto",
        paddingRight: "390px"
      }}>
        
        {/* Main Content */}
        <div>
          {/* Titles - Centered at top */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            marginBottom: "80px"
          }}>
            <h1 style={{
              fontFamily: "balgin-bold",
              fontSize: "4rem",
              marginBottom: "20px",
              color: "#FFFFFF",
              textAlign: "center"
            }}>
              CO–garden
            </h1>
            <h2 style={{
              fontFamily: "balgin-regular",
              fontSize: "2rem",
              color: "#FFFFFF",
              textAlign: "center"
            }}>
              About Team
            </h2>
          </div>

          {/* Team Members - Vertical layout */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "80px",
            marginBottom: "100px"
          }}>
          {teamMembers.map((member, index) => (
            <div key={index} style={{ 
              display: "flex",
              flexDirection: "row",
              gap: "50px",
              alignItems: "flex-start"
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                flexShrink: 0
              }}>
                <h2 style={{
                  fontFamily: "balgin-bold",
                  fontSize: "2rem",
                  marginBottom: "20px",
                  color: "#FFFFFF"
                }}>
                  {member.name}
                </h2>
                
                {member.image && (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: "450px",
                      height: "450px",
                      borderRadius: "8px",
                      objectFit: "cover"
                    }}
                  />
                )}
              </div>
              
              <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                paddingTop: "0"
              }}>
                <div style={{
                  height: "2rem",
                  marginBottom: "20px"
                }}></div>
                <h3 style={{
                  fontFamily: "balgin-bold",
                  fontSize: "1.2rem",
                  marginBottom: "15px",
                  color: "#FFFFFF",
                  marginTop: "0",
                  textAlign: "left"
                }}>
                  {member.role}
                </h3>
                
                <p style={{
                  fontFamily: "balgin-regular",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  color: "#FFFFFF",
                  textAlign: "left"
                }}>
                  {member.description}
                </p>
                
                <div style={{ marginTop: "20px" }}>
                  <p style={{
                    fontFamily: "balgin-regular",
                    fontSize: "0.9rem",
                    marginBottom: "8px",
                    color: "#FFFFFF",
                    textAlign: "left"
                  }}>
                    <strong>Role:</strong> {member.technicalRole}
                  </p>
                  <p style={{
                    fontFamily: "balgin-regular",
                    fontSize: "0.9rem",
                    color: "#FFFFFF",
                    textAlign: "left"
                  }}>
                    <strong>Stack:</strong> {member.stack}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

      {/* Right Side - White Vertical Div with Sponsors - Positioned at right edge */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "350px",
        height: "100vh",
        backgroundColor: "#FFFFFF",
        padding: "40px",
        paddingTop: "180px",
        display: "flex",
        flexDirection: "column",
        gap: "60px",
        overflowY: "auto",
        zIndex: 1
      }}>
          {/* Sponsored by */}
          <div>
            <p style={{
              fontFamily: "balgin-regular",
              fontSize: "1rem",
              marginBottom: "30px",
              color: "#000000",
              textTransform: "uppercase"
            }}>
              sponsored by
            </p>
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px"
            }}>
              {/* Harvard SEAS */}
              <div>
                <img 
                  src={seasLogo} 
                  alt="Harvard SEAS"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginBottom: "10px",
                    objectFit: "contain"
                  }}
                />
                <p style={{
                  fontFamily: "balgin-regular",
                  fontSize: "0.8rem",
                  color: "#000000"
                }}>
                  Office for Diversity, Inclusion, and Belonging
                </p>
              </div>

              {/* THE COOP HARVARD */}
              <div>
                <img 
                  src={coopLogo} 
                  alt="THE COOP HARVARD"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginBottom: "10px",
                    objectFit: "contain"
                  }}
                />
                <p style={{
                  fontFamily: "balgin-regular",
                  fontSize: "0.8rem",
                  color: "#000000"
                }}>
                  www.thecoop.com
                </p>
              </div>

              {/* Harvard GSD */}
              <div>
                <img 
                  src={gsdLogo} 
                  alt="Harvard GSD"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginBottom: "10px",
                    objectFit: "contain"
                  }}
                />
                <p style={{
                  fontFamily: "balgin-regular",
                  fontSize: "0.8rem",
                  color: "#000000"
                }}>
                  GRADUATE SCHOOL OF DESIGN
                </p>
              </div>
            </div>
          </div>

          {/* Supported by */}
          <div>
            <p style={{
              fontFamily: "balgin-regular",
              fontSize: "1rem",
              marginBottom: "30px",
              color: "#000000",
              textTransform: "uppercase"
            }}>
              supported by
            </p>
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px"
            }}>
              {/* Be My Eyes */}
              <div>
                <img 
                  src={bemyeyesLogo} 
                  alt="Be My Eyes"
                  style={{
                    width: "200px",
                    height: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>

              {/* MIT Sloan Design Club */}
              <div>
                <img 
                  src={sloanLogo} 
                  alt="MIT Sloan Design Club"
                  style={{
                    width: "200px",
                    height: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
