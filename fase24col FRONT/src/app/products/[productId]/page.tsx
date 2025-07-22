import { notFound } from "next/navigation"
import { Product, ProductService } from "@/app/(services)/Products/products"
import { ProductDetailClient } from "./ProductDetailClient"

interface ProductPageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params

  // Fetch the product details
  const response = await ProductService.getSingleProduct(productId)
  if (response.error || !response.data) notFound()
  const product: Product = response.data as Product

  // The following line is for client-side hooks;
  // since this is an async server component, you need to render a client component for cart actions:
  return <ProductDetailClient product={product} />
}
