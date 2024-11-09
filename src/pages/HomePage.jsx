// HomePage Images
import landingPageDoctor from "../assets/images/landingPageDoctor.png";
import clientOne from "../assets/images/clientOne.png";
import clientTwo from "../assets/images/clientTwo.png";
import clientThree from "../assets/images/clientThree.png";
// CSS
import "../css/HomePage.css";

const HomePage = () => {
  return (
    <div>
      {/* Landing Page And Welcome Text */}
      <div className="flex items-center lg:gap-20 gap-0 lg:mt-0 mt-10">
        <section className="w-4/5 lg:w-3/5 lg:px-10 xl:px-28 md:px-8 sm:ps-6 ps-4">
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl text-sky-blue font-bold">
            Welcome to Patient Hub,
          </h1>
          <p className="text-dark-blue-800 font-semibold lg:md:text-xl  text-base lg:w-5/6 my-3">
            your trusted online destination for all things health and wellness.
            We connect you with expert insights, personalized health resources,
            and essential services to support your journey to better health.
          </p>
        </section>
        <section className="w-1/2">
          <div className="ellipse"></div>
          <img
            src={landingPageDoctor}
            alt="A Doctor Picture"
            className="image"
          />
        </section>
      </div>
      {/* Brief About US */}
      <div className="about-us bg-sky-blue p-6 pt-10">
        <h1 className="text-center text-white text-2xl md:text-3xl lg:text-4xl font-semibold word-space">
          Perks for choosing Patient Hub
        </h1>
        {/* Perks */}
        <section className="perks">
          <div>
            <h3>Your Health, Simplified:</h3>
            <p>
              Access trusted medical resources, expert insights, and
              personalized care—all in one convenient platform.
            </p>
          </div>
          <div>
            <h3>Care at Your Fingertips</h3>
            <p>
              Get 24/7 access to healthcare support, virtual consultations, and
              wellness resources tailored to your needs.
            </p>
          </div>
          <div>
            <h3>Access to Specialist Referrals:</h3>
            <p>
              Receive easy referrals to specialized healthcare providers,
              ensuring timely and expert care when needed.
            </p>
          </div>
          <div>
            <h3>Telehealth Consultations:</h3>
            <p>
              Connect with healthcare professionals anytime, anywhere, for
              virtual consultations and follow-ups.
            </p>
          </div>
          <div>
            <h3>Easy Appointment Scheduling:</h3>
            <p>
              Book and manage appointments seamlessly, reducing wait times and
              optimizing access to healthcare providers.
            </p>
          </div>
          <div>
            <h3>Emergency Resources:</h3>
            <p>
              Access a quick guide for handling health emergencies, with
              contacts for urgent care and virtual ER consultations.
            </p>
          </div>
        </section>
      </div>

      {/* Client Stories */}
      <div>
        <h1 className="text-dark-blue-800 text-center text-3xl font-bold md:text-5xl mt-10 md:mt-20">
          Client Stories
        </h1>
        {/* Curve Arrow */}
        <article>
          <svg
            className="w-full md:w-[676px] px-10 mx-auto  md:px-0 mt-4"
            height="22"
            viewBox="0 0 676 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L333 21L675 1" stroke="#02B3BD" strokeWidth="2" />
          </svg>
        </article>
        <section className="client-stories">
          <div>
            <section className="flex items-center gap-5 mb-5">
              <img src={clientOne} alt="A lady image" className="w-14" />
              <p className="text-dark-blue-800 font-bold lg:text-3xl text-2xl">Maria P.</p>
            </section>
            <article className="font-medium ms-2">
              My experience with Patient Hub was excellent! I scheduled a
              telehealth consultation to discuss some health concerns, and it
              was seamless. The doctor was thorough, attentive, and gave me
              clear next steps. I also appreciated the quick access to my health
              records. It’s so convenient to have everything in one place!"
            </article>
          </div>
          <div>
            <section className="flex items-center gap-5 mb-5">
              <img src={clientTwo} alt="A guy image" className="w-14" />
              <p className="text-dark-blue-800 font-bold lg:text-3xl text-2xl">James R.</p>
            </section>
            <article className="font-medium ms-2">
            I needed to manage my chronic condition better, and the tools on Patient Hub have been a game changer. The medication reminders keep me on track, and I can monitor my blood pressure with their tracking tools. Plus, the articles and tips have helped me stay informed. Highly recommend for anyone managing long-term health issues
            </article>
          </div>
          <div>
            <section className="flex items-center gap-5 mb-5">
              <img src={clientThree} alt="A lady image" className="w-14" />
              <p className="text-dark-blue-800 font-bold lg:text-3xl text-2xl">Elena S.</p>
            </section>
            <article className="font-medium ms-2">
            I had been feeling a bit anxious lately, so I looked up mental health resources on Patient Hub. The platform connected me with a counselor who really understood my needs, and I could even access meditation exercises and stress-relief tips. It's comforting to know I have a support system right here at my fingertips.
            </article>
          </div>
        </section>
      </div>

    </div>
  );
};

export default HomePage;
