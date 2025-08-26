import Image from "next/image";
import eyeTestImg from '../../public/images/telemedicine/telemedicine-eye-test.png';

const TelemedicineEyeTest = () => {
    return (
        <section className="bg-blue-50 py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
            Consult with an <br />
            <span className="text-blue-600">OPTOMETRIST</span>
          </h2>
          <p className="text-gray-600 mt-4 text-sm md:text-base font-bold">
            Consult with an Optometrist for a physical eye test at our outlet or
            meet online.
          </p>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-md transition">
            Book an Eye Test
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={eyeTestImg} 
            alt="Eye test consultation"
            width={500}
            height={350}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </section>
    );
};

export default TelemedicineEyeTest;