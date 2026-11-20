import { site, wa } from "@/lib/site";
import { Brand, Icon } from "./Icons";

/** Stylised map (no third-party embed, so no tracking and no CSP exceptions) + contact cards. */
export function Contacts() {
  return (
    <div className="ct">
      <div className="ct-map" data-reveal>
        <svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="800" height="520" fill="#f3ede4" />
          <g fill="#e9e0d3">
            <rect x="40" y="40" width="200" height="140" rx="10" />
            <rect x="270" y="40" width="160" height="140" rx="10" />
            <rect x="470" y="40" width="290" height="140" rx="10" />
            <rect x="40" y="240" width="200" height="120" rx="10" />
            <rect x="270" y="240" width="160" height="120" rx="10" />
            <rect x="470" y="240" width="130" height="120" rx="10" />
            <rect x="630" y="240" width="130" height="120" rx="10" />
            <rect x="40" y="420" width="390" height="80" rx="10" />
            <rect x="470" y="420" width="290" height="80" rx="10" />
          </g>
          <rect x="300" y="268" width="90" height="62" rx="8" fill="#cbbfae" />
          <g stroke="#fbf8f3" strokeWidth="26" strokeLinecap="round">
            <path d="M0 210h800" />
            <path d="M0 390h800" />
            <path d="M450 0v520" />
          </g>
          <g stroke="#dfe3d6" strokeWidth="8">
            <path d="M255 0v520" />
          </g>
          <g fontFamily="sans-serif" fontSize="13" fill="#8b7b6f" letterSpacing="2">
            <text x="60" y="203">УЛ. ЖЕЛТОКСАН</text>
            <text x="60" y="383">ПР. АБЫЛАЙ ХАНА</text>
            <text x="462" y="505" transform="rotate(-90 462 505)">УЛ. КАБАНБАЙ БАТЫРА</text>
          </g>
        </svg>
        <div className="ct-pin">
          <b>MEDARA · Желтоксан 138</b>
          <i />
        </div>
        <div className="ct-btns">
          <a className="btn btn-sm" href={site.twogis} target="_blank" rel="noopener noreferrer">
            Открыть в 2ГИС
          </a>
          <a className="btn btn-sm btn-light" href={site.gmaps} target="_blank" rel="noopener noreferrer">
            Google Maps
          </a>
        </div>
      </div>
      <div className="ct-cards" data-reveal style={{ ["--d" as string]: ".1s" }}>
        <a className="ct-card" href={site.twogis} target="_blank" rel="noopener noreferrer">
          <span className="ic">
            <Icon name="pin" />
          </span>
          <span>
            <small>Адрес</small>
            <b>
              {site.city}, {site.address}
            </b>
            <p>Между Абылай хана и Кабанбай батыра</p>
          </span>
          <Icon name="arrowUp" size={18} />
        </a>
        <div className="ct-card">
          <span className="ic">
            <Icon name="car" />
          </span>
          <span>
            <small>Парковка</small>
            <b>Своя, бесплатная</b>
            <p>Предупредите заранее, что приедете на машине</p>
          </span>
        </div>
        <div className="ct-card">
          <span className="ic">
            <Icon name="clock" />
          </span>
          <span>
            <small>Приём</small>
            <b>Пн–Сб, 11:00–17:00</b>
            <p>Только по предварительной записи</p>
          </span>
        </div>
        <a className="ct-card" href={wa("Здравствуйте! Хочу записаться на консультацию.")} target="_blank" rel="noopener noreferrer">
          <span className="ic">
            <Brand name="whatsapp" size={20} />
          </span>
          <span>
            <small>WhatsApp</small>
            <b>{site.phone}</b>
            <p>Запись и вопросы</p>
          </span>
          <Icon name="arrowUp" size={18} />
        </a>
        <a className="ct-card" href={site.instagram} target="_blank" rel="noopener noreferrer">
          <span className="ic">
            <Brand name="instagram" size={20} />
          </span>
          <span>
            <small>Instagram · {site.followers}</small>
            <b>{site.handle}</b>
            <p>Советы, клинические случаи, отзывы</p>
          </span>
          <Icon name="arrowUp" size={18} />
        </a>
      </div>
    </div>
  );
}
