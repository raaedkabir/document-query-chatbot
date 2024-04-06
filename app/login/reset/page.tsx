import NavbarWrapper from '@/components/NavbarWrapper'
import Footer from '@/components/Footer'
import LoginResetForm from '@/components/Forms/LoginResetForm'

export default async function LoginReset() {
  return (
    <>
      <NavbarWrapper />
      <main className="container mx-auto px-4">
        <div className="my-24 text-center md:px-20">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">
              Forgot your password?
            </h1>
          </div>
          <div className="mx-auto my-12 mb-8 max-w-lg rounded-2xl bg-white shadow-lg">
            <div className="flex min-h-full flex-1 flex-col justify-center p-6 lg:p-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginResetForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
