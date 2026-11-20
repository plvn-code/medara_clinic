import Link from "next/link";
import { concerns } from "@/lib/concerns";
import { legal, nav, site, wa } from "@/lib/site";
import { Brand, Icon } from "./Icons";
import { Logo } from "./Shared";

export function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-about">
            <Logo />
            <p>Дерматологическая клиника доказательной медицины в Алматы. Лечим кожу по клиническим протоколам — с диагнозом, планом и контролем результата.</p>
          </div>
          <div>
            <h3>Проблемы кожи</h3>
            <ul>
              {concerns.map((c) => (
                <li key={c.slug}>
                  <Link href={`/problemy/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Клиника</h3>
            <ul>
              {nav.slice(1).map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Связаться</h3>
            <ul>
              <li>
                <a href={wa("Здравствуйте! Хочу записаться на консультацию.")} target="_blank" rel="noopener noreferrer">
                  <Brand name="whatsapp" size={16} /> {site.phone}
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  <Brand name="instagram" size={16} /> {site.handle}
                </a>
              </li>
              <li>
                <a href={site.twogis} target="_blank" rel="noopener noreferrer">
                  <Icon name="pin" size={16} /> {site.address}
                </a>
              </li>
              <li>
                <span>
                  <Icon name="clock" size={16} /> {site.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <p className="ft-big" aria-hidden="true">
          MEDARA
        </p>
        <div className="ft-bottom">
          <span>
            © {new Date().getFullYear()} MEDARA CLINIC · Лицензия № {site.licence.number} от {site.licence.date}
          </span>
          <span>{legal}</span>
        </div>
      </div>
    </footer>
  );
}
