"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { ABOUT_IMAGES } from "@/lib/image-data";

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full bg-white">
      <PageHeader
        title="About Us"
        subtitle="Our Sweet Story"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Intro Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="font-serif text-brand-primary text-xl italic mb-2">
              Welcome to Dookiee.s
            </h3>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-text mb-6">
              Best Cookies in Town
            </h2>
            <div className="w-16 h-1 bg-brand-secondary rounded-full mb-8"></div>

            <div className="space-y-6 text-gray-600 leading-relaxed font-light">
              <p>
                Founded in 2024, we started as a small home kitchen with a big
                dream: to create the most delicious soft cookies using only the
                finest organic ingredients.
              </p>
              <p>
                We believe that baking is an art form. Every cookie that leaves
                our kitchen is handcrafted with passion and attention to detail.
              </p>
              <blockquote className="border-l-4 border-brand-primary pl-6 italic text-gray-700 my-8">
                "Baking is love made edible. We put our heart into every
                recipe."
              </blockquote>
            </div>
          </motion.div>

          {/* Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-cream rounded-full -z-10 translate-x-10 -translate-y-10" />
            <img
              src={ABOUT_IMAGES[0]}
              alt="Baker working"
              className="rounded-custom-lg shadow-xl w-full object-cover aspect-[4/5]"
            />
            <div className="absolute bottom-[-30px] left-[-30px] bg-white p-6 rounded-xl shadow-lg max-w-[200px] hidden md:block">
              <p className="font-serif text-4xl text-brand-primary mb-0">5+</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                Years of Experience
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-24 bg-brand-cream/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-text mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-500 italic">
              The masterminds behind our delicious creations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Head Baker", image: ABOUT_IMAGES[0] },
              {
                name: "Jane Smith",
                role: "Flavor Expert",
                image: ABOUT_IMAGES[1],
              },
              {
                name: "Michael Cole",
                role: "Pastry Chef",
                image: ABOUT_IMAGES[2],
              },
            ].map((chef, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-md group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-2xl text-brand-text mb-1">
                    {chef.name}
                  </h3>
                  <span className="text-brand-primary uppercase text-xs font-bold tracking-widest">
                    {chef.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
