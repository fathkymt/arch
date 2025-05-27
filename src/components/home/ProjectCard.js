"use client";
import React, { useState } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
import Link from "next/link";

const ProjectCard = ({ project, isVisible }) => {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)");

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };

  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <Link
      href={`/projects/${project.category}/${project.id}`}
      className="relative group/pin z-50 cursor-pointer block h-[600px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 top-1/2 w-[450px] md:w-[450px] w-[calc(100vw-3rem)] rounded-xl overflow-hidden transition-all duration-700 bg-gradient-to-b from-neutral-900 to-neutral-800 border border-white/10 shadow-lg shadow-black/20"
        >
          <div className="relative z-50">
            <div className="relative w-full h-[300px] group-hover/pin:opacity-90 transition-opacity duration-300">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
            </div>
            <div className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400/80 text-sm font-medium">Active Project</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover/pin:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {project.description}
              </p>
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.div className="pointer-events-none w-full h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
        <div className="w-full h-full -mt-7 flex-none inset-0">
          <div className="absolute top-0 inset-x-0 flex justify-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-6 ring-1 ring-white/10"
            >
              <span className="text-white text-base font-medium">
                {project.title}
              </span>
            </motion.span>
          </div>

          <div
            style={{
              perspective: "1000px",
              transform: "rotateX(70deg) translateZ(0)",
            }}
            className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
          >
            {[0, 2, 4].map((delay) => (
              <motion.div
                key={delay}
                initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
                transition={{ duration: 6, repeat: Infinity, delay: delay }}
                className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-emerald-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              />
            ))}
          </div>

          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-emerald-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-emerald-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;