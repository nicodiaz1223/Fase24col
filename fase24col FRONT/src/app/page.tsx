import { BrandStory } from "./components/Home/BrandStory"
import { FeaturedCollections } from "./components/Home/FeaturedCollections"
import { Hero } from "./components/Home/Hero"
import { NewsletterSignup } from "./components/Home/NewsletterSignup"
import { ProductHighlights } from "./components/Home/ProductHighlights"
import { PromoBanner } from "./components/Home/PromoBanner"
import { SocialProof } from "./components/Home/SocialProof"

const Home = () => {
  return (
    <>
      <PromoBanner />
      <Hero />
      <FeaturedCollections />
      <ProductHighlights />
      <BrandStory />
      <SocialProof />
      <NewsletterSignup />
    </>
  )
}
export default Home
