import PageTransition from "../components/loadingPage/PageTransition";


export default function IndexLayout({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
