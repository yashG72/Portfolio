import { Link } from "react-router-dom";

// import { CTA } from "../components/CTA.jsx";
import CTA from "../components/CTA.jsx";
import { projects } from "../constants/Index";
import { arrow } from "../assets/icons";

const Projects = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        My{" "}
        <span className='blue-gradient_text drop-shadow font-semibold'>
          Projects
        </span>
      </h1>

      <p className='text-slate-500 mt-2 leading-relaxed'>
        I’ve worked on several projects during my learning journey, and these are the
         ones I’m most proud of. They’ve helped me
          build my skills and explore new ideas. Some of them are open-source, so if something catches your eye, feel free to check out the code and share your thoughts!
      </p>

      <div className='flex flex-wrap my-20 gap-16'>
        {projects.map((project) => (
          <div className='lg:w-[400px] w-full' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={project.iconUrl}
                  alt='threads'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>

            <div className='mt-5 flex flex-col'>
              <h4 className='text-2xl font-poppins font-semibold'>
                {project.name}
              </h4>
              <p className='mt-2 text-slate-500'>{project.description}</p>
              <div className='mt-5 flex items-center gap-2 font-poppins'>
                <Link
                  to={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-semibold text-blue-600'
                >
                  Live Link
                </Link>
                <img
                  src={arrow}
                  alt='arrow'
                  className='w-4 h-4 object-contain'
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default Projects;