import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-light">
      <div className="container text-col" style={{ textAlign: "center" }}>
        <h1>404</h1>
        <p className="intro">Page introuvable · Page not found · הדף לא נמצא</p>
        <Link className="work-link" href="/">
          ← jeremie-nabet.com
        </Link>
      </div>
    </section>
  );
}
