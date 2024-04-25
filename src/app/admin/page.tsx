import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import db from '@/db/client';
import { formatCurrency, formatNumber } from '@/lib/formatters';

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    amout: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getCustomerData() {
  const [customerCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    customerCount,
    averageOrderValue:
      customerCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / 100 / customerCount,
  };
}

async function getProductData() {
  const [activeProducts, inactiveProducts] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return { activeProducts, inactiveProducts };
}

export default async function page() {
  const [salesData, customerData, productData] = await Promise.all([
    getSalesData(),
    getCustomerData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashBoardCard
        title="Sales"
        description={formatNumber(salesData.numberOfSales)}
        body={formatCurrency(salesData.amout)}
      />
      <DashBoardCard
        title="Customers"
        description={`${formatCurrency(
          customerData.averageOrderValue
        )} Average Value`}
        body={formatNumber(customerData.customerCount)}
      />
      <DashBoardCard
        title="Active Products"
        description={`${formatNumber(
          productData.inactiveProducts
        )} Inactive Products`}
        body={formatNumber(productData.activeProducts)}
      />
    </div>
  );
}

type DashBoardCardProps = {
  title: string;
  description: string;
  body: string;
};

function DashBoardCard({ title, description, body }: DashBoardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
