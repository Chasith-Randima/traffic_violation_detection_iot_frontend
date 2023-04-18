import React from "react";
import Link from "next/link";

const register = () => {
  return (
    <>
      <main className="">
        <div class="container py-16">
          <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 class="text-2xl uppercase font-medium mb-1 text-center">
              SignUp
            </h2>
            <p class="text-gray-600 mb-6 text-sm text-center">
              SignUp if you are a new user
            </p>
            <div className="w-full  text-center my-1">
              <div className="my-2 h-max">
                <h2 className="w-1/2 pd-10 text-xl bg-blue-400 rounded-full mx-auto">
                  <Link
                    href={`/auth/patients/SignUp`}
                    className="w-2/3 pd-10 text-xl bg-blue-400 rounded-full mx-auto"
                  >
                    Patient SignUp
                  </Link>
                </h2>
              </div>
              <div className="my-2 h-max">
                <h2 className="w-1/2 pd-10 text-xl bg-blue-400 rounded-full mx-auto">
                  <Link
                    href={`/auth/doctors/SignUp`}
                    className="w-2/3 pd-10 text-xl bg-blue-400 rounded-full mx-auto"
                  >
                    Doctor's SignUp
                  </Link>
                </h2>
              </div>

              <div className="my-2 h-max">
                <h2 className="w-1/2 pd-10 text-xl bg-blue-400 rounded-full mx-auto">
                  <Link
                    href={`/auth/users/SignUp`}
                    className="w-2/3 pd-10 text-xl bg-blue-400 rounded-full mx-auto"
                  >
                    Staff SignUp
                  </Link>
                </h2>
              </div>
            </div>

            {/* <form action="">
              <div class="space-y-4">
                <div>
                  <label class="text-gray-600 mb-2 block">Email Address</label>
                  <input
                    type="text"
                    // value={email}
                    // onChange={handleChange("email")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block">Password</label>
                  <input
                    type="text"
                    // value={password}
                    // onChange={handleChange("password")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your Password"
                  />
                </div>

                <div class="mt-4">
                  <button
                    class="block w-full py-2 text-center text-black bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                    // onClick={handleSubmit}
                  >
                    LOGIN
                  </button>
                </div>
              </div>
            </form> */}
            <p class="mt-4 text-gray-600 text-center">
              Already have an account?
              <Link href={`/`} class="text-primary">
                LogIn Now
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default register;
