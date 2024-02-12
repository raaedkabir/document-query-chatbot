export default function FacebookLogin() {
  return (
    <a href={process.env.NEXT_PUBLIC_OAUTH_LOGIN_URL + 'Facebook'}>
      <svg
        className="size-10 rounded bg-gray-light p-2.5 text-gray-dark"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M13.1 6H15V3h-1.9A4.1 4.1 0 0 0 9 7.1V9H7v3h2v10h3V12h2l.6-3H12V6.6a.6.6 0 0 1 .6-.6h.5Z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  )
}
