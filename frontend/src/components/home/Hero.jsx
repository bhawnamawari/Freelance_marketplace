import SearchBar from "./SearchBar";

const Hero = () => {
    return (
        <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-24">

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

                <div>

                    <h1 className="text-5xl font-bold leading-tight">

                        Hire the Best Freelancers
                        <br />
                        For Any Job.

                    </h1>

                    <p className="mt-6 text-lg text-gray-200">

                        Find talented developers, designers,
                        writers and experts for your projects.

                    </p>

                    <div className="mt-8">
                        <SearchBar />
                    </div>

                </div>

                <div>

                    <img
                        src="/hero.png"
                        alt="hero"
                        className="w-full"
                    />

                </div>

            </div>

        </section>
    );
};

export default Hero;