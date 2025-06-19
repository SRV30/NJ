import MetaData from "../extras/MetaData";
import BannerProduct from "./BannerProduct";
import BestSeller from "./Bestseller";
import JewelleryType from "./JewelleryType";
import LuxuryExperience from "./LuxuryExperience";
import ProductCategory from "./ProductCategory";
import Testimonials from "./Testimonals";

const Home = () => {
  return (
    <div>
      <MetaData
        title="Nandani Jewellers | Fine Gold & Diamond Jewellery"
        description="Explore Nandani Jewellers' exclusive collection of gold, diamond, and silver jewelry. Shop premium necklaces, rings, bangles, and bridal jewelry for every occasion."
        keywords="gold jewelry, diamond rings, silver necklaces, bridal jewelry, engagement rings, Nandani Jewellers, fine jewelry"
      />
      <BannerProduct />
      <JewelleryType />
      <ProductCategory />
      <BestSeller />
      <LuxuryExperience />
      <Testimonials />
    </div>
  );
};

export default Home;
