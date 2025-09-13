import React from "react";
import { motion } from "framer-motion";
import { experiences, skills } from "../constants/Index";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <section className="max-container">
      {/* Intro */}
      <h1 className="head-text">
        Hello, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Yash
        </span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          I am currently a final year Information Technology student at Maharaja Agrasen Institute 
          of Technology, Delhi. I have a strong passion for web development and love creating beautiful,
          functional websites. I enjoy learning new technologies and continuously improving my skills.
        </p>
      </div>

      {/* Skills Section */}
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="block-container w-20 h-20"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            I've worked on many projects, levelling up my skills and teaming up
            with smart people.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-blue-500 transform -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`mb-16 flex w-full ${
                index % 2 === 0 ? "justify-start pr-8" : "justify-end pl-8"
              }`}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <div className="relative w-1/2">
                {/* Timeline Dot */}
                <div className="absolute top-2 -left-8 w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-blue-500 shadow-md transform -translate-x-1/2">
                  <img
                    src={exp.icon}
                    alt={exp.company_name}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                {/* Experience Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
                  <h3 className="text-lg font-bold text-gray-800">
                    {exp.title}
                  </h3>
                  <h4 className="text-sm text-blue-600">{exp.company_name}</h4>
                  <p className="text-xs text-gray-500">{exp.date}</p>
                  <ul className="mt-3 list-disc ml-5 text-gray-600">
                    {exp.points?.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
