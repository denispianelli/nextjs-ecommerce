import db from '@/db/client';
import PageHeader from '../../../_components/page-header';
import ProductForm from '../../_components/product-form';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
