import { MainNav, NavLink } from '@/components/main-nav';

export const dynmaic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </MainNav>
      <div className="container my-6">{children}</div>
    </>
  );
}
