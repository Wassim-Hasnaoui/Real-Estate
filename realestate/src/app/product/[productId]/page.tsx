export default function productDetails({ params }: { 
    params: { productId: string } 
}) {
    return <h1>Details about product {params.productId}</h1>;
  }
  