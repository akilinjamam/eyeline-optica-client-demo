'use client';

import Image from 'next/image';
import { Eye, Sparkles, ShoppingBag, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import aboutus from '../../public/aboutus/about-us-eye.jpg'
import { useRouter } from 'next/navigation';

export default function AboutSection() {
    const navigate = useRouter();
  return (
    <section className="relative bg-gradient-to-b from-white to-blue-50 py-20 px-6 lg:px-16 overflow-hidden">
      {/* Subtle background gradient blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12 relative z-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <Image
            src={aboutus}
            alt="Eyeline Optica Eyewear"
            width={600}
            
            className="rounded-3xl shadow-2xl object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            Eyeline Optica – <span className="text-blue-600">Redefining Eyewear in Bangladesh</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Born in <strong>2024</strong>, Eyeline Optica is one of Bangladesh’s most exciting eyewear start-ups—dedicated
            to delivering a <span className="font-medium text-blue-600">top-notch experience</span> to every customer.  
            We believe everyone deserves <strong>premium eyeglasses</strong> paired with <strong>top-branded lenses</strong>—all
            at the right price.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            As your one-stop online destination for eyewear and accessories, we bring you <strong>style, comfort,</strong> and <strong>convenience</strong> straight to your doorstep.
            With flexible payment options and doorstep delivery, we make eyewear shopping simple, fun, and reliable.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">Premium Quality</p>
                <p className="text-sm text-gray-500">Top-notch frames & branded lenses</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">Trendy Collections</p>
                <p className="text-sm text-gray-500">Eyeglasses, sunglasses & contacts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all">
              <Truck className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">Fast Delivery</p>
                <p className="text-sm text-gray-500">Get your eyewear delivered fast</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all">
              <Eye className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">Clear Vision, Bold Style</p>
                <p className="text-sm text-gray-500">Confidence starts with how you see</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate.push('/allglasses/brand')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
