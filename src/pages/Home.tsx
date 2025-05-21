import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Helmet>
        <title>NextShop Dashboard</title>
      </Helmet>
      <header className="py-4 sticky top-0 bg-gray-200 z-10">
        <div className="container flex gap-2 justify-between items-center">
          <h1 className="text-[2rem] font-semibold">NextShop</h1>
          <Button
            className="hover:cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Access Dashboard
          </Button>
        </div>
      </header>
      <main>
        <section id="hero" className="bg-gray-200 py-8">
          <div className="container flex flex-col gap-4 lg:flex-row lg:gap-0 items-center">
            <div className="flex-1/2 space-y-8">
              <h2 className="text-[4rem] leading-[4rem] font-semibold">
                Create a NextShop Seller Account
              </h2>
              <Button
                className="hover:cursor-pointer"
                onClick={() => navigate("/auth")}
              >
                Become a Seller
              </Button>
            </div>
            <div className="flex-1/2">
              <img src="./hero.png"></img>
            </div>
          </div>
        </section>
        <section id="features" className="py-8">
          <div className="container flex flex-col lg:flex-row gap-4">
            <img
              src="./man-mobile.png"
              className="rounded-md w-[100%] lg:w-[30%] mx-auto"
            ></img>
            <div className="flex-2/3 space-y-4 flex flex-col justify-center">
              <h2 className="text-[2rem] font-semibold">
                Why sell on NextShop?
              </h2>
              <div>
                <h3 className="text-[1.5rem] font-semibold">
                  🛍️ List Your Products in Minutes
                </h3>
                <p>
                  Know what’s working. View orders, revenue, and product
                  performance instantly so you can make smarter decisions and
                  grow faster.
                </p>
              </div>
              <div>
                <h3 className="text-[1.5rem] font-semibold">
                  📊 Track Sales & Growth in Real Time
                </h3>
                <p>
                  Get notified the moment an order is placed. Stay in control of
                  fulfillment and monitor your payouts without needing to chase
                  anything.
                </p>
              </div>
              <div>
                <h3 className="text-[1.5rem] font-bold">
                  🧾 Instant Order & Payout Updates
                </h3>
                <p>
                  Your business and customer data are protected by
                  industry-standard security through Supabase. Trust is built
                  in.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-200 py-4">
        <div className="container flex justify-center">
          <p>&copy; NextShop {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
