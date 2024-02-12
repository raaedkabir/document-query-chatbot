import { Suspense } from 'react'
import StoreProvider from '@/app/StoreProvider'
import WorkerProvider from '@/app/WorkerProvider'
import NavbarWrapper from '@/components/Dashboard/NavbarWrapper'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <WorkerProvider>
        <Suspense fallback={<div className="fixed m-4">Loading...</div>}>
          <NavbarWrapper />
        </Suspense>

        <main
          id="main-content"
          data-sidebar-open="true"
          className={`transition-all sm:pl-20 data-[sidebar-open=false]:lg:ml-0 data-[sidebar-open=true]:lg:ml-64 data-[sidebar-open=false]:lg:pl-20 data-[sidebar-open=true]:lg:pl-4`}
        >
          {children}
        </main>
      </WorkerProvider>
    </StoreProvider>
  )
}
