import Link from "next/link";

export default function NotFound() {
  return (
    <section className="nf">
      <div className="nf-in">
        <b aria-hidden="true">404</b>
        <p className="lbl no-dash">Страница не найдена</p>
        <h1 className="h2">Здесь пусто</h1>
        <p className="lead">Возможно, страницу перенесли. Начните с главной или посмотрите прайс.</p>
        <div className="hero-cta">
          <Link href="/" className="btn btn-lg">
            На главную
          </Link>
          <Link href="/ceny" className="btn btn-line btn-lg">
            Цены
          </Link>
        </div>
      </div>
    </section>
  );
}
