'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const OrganizationalChart = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const orgStructure = {
    managingDirector: {
      title: "Managing Director",
      support: "Executive Secretary"
    },
    technicalDirector: {
      title: "Technical Director",
      support: "Secretary"
    },
    departments: [
      {
        head: "Project Manager",
        team: [
          "Construction Manager",
          "Architect",
          "Interior Designer",
          "Draftsman"
        ]
      },
      {
        head: "Design Manager",
        team: [
          "Architect",
          "Resident Engg",
          "Construction Manager",
          "Civil Engg",
          "Mep Engg",
          "Site Attendents",
          "3D Modeler"
        ]
      },
      {
        head: "Procurement Manager",
        team: [
          "Commercial Manager",
          "Contracts Manager",
          "Accounts",
          "Tender Manager",
          "Civil Engg",
          "Mep Engg"
        ]
      },
      {
        head: "Project Control Manager",
        team: [
          "Planning Engg (2nos)",
          "Cost Control Engg",
          "Contract administrator (2 nos)",
          "QA/QC",
          "QS",
          "Document Control"
        ]
      },
      {
        head: "Accounts Manager",
        team: [
          "Business Development"
        ]
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-black py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&display=swap');

        .heading-font {
          font-family: 'Archivo', sans-serif;
        }

        .body-font {
          font-family: 'Archivo', sans-serif;
        }

        .director-card {
          background: linear-gradient(135deg, #ed1b24 0%, #c41119 100%);
          position: relative;
          overflow: hidden;
        }

        .director-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .director-card:hover::before {
          left: 100%;
        }

        .support-badge {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .department-head {
          background: linear-gradient(135deg, rgba(237, 27, 36, 0.2) 0%, rgba(237, 27, 36, 0.05) 100%);
          border: 2px solid rgba(237, 27, 36, 0.4);
          transition: all 0.3s ease;
        }

        .department-head:hover {
          border-color: #ed1b24;
          background: linear-gradient(135deg, rgba(237, 27, 36, 0.3) 0%, rgba(237, 27, 36, 0.1) 100%);
          transform: translateY(-4px);
        }

        .team-member {
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .team-member:hover {
          border-color: rgba(237, 27, 36, 0.5);
          background: rgba(20, 20, 20, 0.9);
          transform: translateX(4px);
        }

        .vertical-line {
          width: 2px;
          background: linear-gradient(180deg, #ed1b24, rgba(237, 27, 36, 0.3));
        }

        .horizontal-line {
          height: 2px;
          background: linear-gradient(90deg, rgba(237, 27, 36, 0.3), #ed1b24, rgba(237, 27, 36, 0.3));
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .connection-dot {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(237, 27, 36, 0.15) 1px, transparent 0)',
          backgroundSize: '50px 50px',
          height: '100%'
        }}></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-5"
          >
            <div className="px-5 py-2.5 rounded-full border-2 border-[#ed1b24] bg-[#ed1b24]/5">
              <span className="text-[#ed1b24] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase body-font">
                Our Structure
              </span>
            </div>
          </motion.div>

          <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
            Company{" "}
            <span className="text-[#ed1b24] font-normal">Organogram</span>
          </h2>
        </motion.div>

        {/* Organization Chart */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Managing Director */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-8 sm:mb-12">
            <div className="director-card rounded-2xl px-8 sm:px-12 py-6 sm:py-8 text-center min-w-[280px] sm:min-w-[320px] cursor-pointer hover:scale-105 transition-transform duration-300">
              <h3 className="heading-font text-xl sm:text-2xl font-bold text-white">
                {orgStructure.managingDirector.title}
              </h3>
            </div>
            
            {/* Support Badge */}
            <motion.div 
              variants={itemVariants}
              className="support-badge rounded-xl px-6 py-3 mt-4 text-center"
            >
              <p className="body-font text-white text-sm font-semibold">
                {orgStructure.managingDirector.support}
              </p>
            </motion.div>

            {/* Connection Line */}
            <div className="vertical-line h-12 sm:h-16 my-4 connection-dot"></div>
          </motion.div>

          {/* Technical Director */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-8 sm:mb-12">
            <div className="director-card rounded-2xl px-8 sm:px-12 py-6 sm:py-8 text-center min-w-[280px] sm:min-w-[320px] cursor-pointer hover:scale-105 transition-transform duration-300">
              <h3 className="heading-font text-xl sm:text-2xl font-bold text-white">
                {orgStructure.technicalDirector.title}
              </h3>
            </div>

            {/* Support Badge */}
            <motion.div 
              variants={itemVariants}
              className="support-badge rounded-xl px-6 py-3 mt-4 text-center"
            >
              <p className="body-font text-white text-sm font-semibold">
                {orgStructure.technicalDirector.support}
              </p>
            </motion.div>

            {/* Connection Line */}
            <div className="vertical-line h-12 sm:h-16 my-4 connection-dot"></div>
          </motion.div>

          {/* Horizontal Connector */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="horizontal-line w-full max-w-5xl"></div>
          </motion.div>

          {/* Departments Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8"
          >
            {orgStructure.departments.map((dept, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col"
              >
                {/* Department Head */}
                <div className="department-head rounded-xl px-5 py-6 text-center mb-6 cursor-pointer">
                  <h4 className="heading-font text-base sm:text-lg font-bold text-white leading-tight">
                    {dept.head}
                  </h4>
                </div>

                {/* Team Members */}
                <div className="space-y-3 flex-1">
                  {dept.team.map((member, memberIndex) => (
                    <motion.div
                      key={memberIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 + memberIndex * 0.05 }}
                      className="team-member rounded-lg px-4 py-3 cursor-pointer"
                    >
                      <p className="body-font text-gray-300 text-sm font-medium text-center">
                        {member}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default OrganizationalChart;