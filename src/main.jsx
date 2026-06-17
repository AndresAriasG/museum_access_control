import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Icon = ({ size = 20, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const AreaChart = (props) => <Icon {...props}><path d="M3 18 8 11l4 4 5-8 4 11" /><path d="M3 21h18" /></Icon>;
const BadgeCheck = (props) => <Icon {...props}><path d="m8 12 2.4 2.4L16 9" /><path d="M12 2.8 14.8 5l3.6.2.2 3.6 2.2 2.8-2.2 2.8-.2 3.6-3.6.2-2.8 2.2-2.8-2.2-3.6-.2-.2-3.6-2.2-2.8 2.2-2.8.2-3.6L9.2 5 12 2.8Z" /></Icon>;
const BarChart3 = (props) => <Icon {...props}><path d="M4 20V10" /><path d="M12 20V4" /><path d="M20 20v-7" /></Icon>;
const Bell = (props) => <Icon {...props}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" /><path d="M10 21h4" /></Icon>;
const CalendarDays = (props) => <Icon {...props}><path d="M7 2v4" /><path d="M17 2v4" /><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /></Icon>;
const CheckCircle2 = (props) => <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></Icon>;
const ChevronRight = (props) => <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>;
const Clock3 = (props) => <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
const Database = (props) => <Icon {...props}><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" /></Icon>;
const DoorOpen = (props) => <Icon {...props}><path d="M14 3h5v18h-5" /><path d="M14 21V5L6 3v18l8-2" /><path d="M11 12h.01" /></Icon>;
const Fingerprint = (props) => <Icon {...props}><path d="M7 10a5 5 0 0 1 10 0" /><path d="M6 14a6 6 0 0 1 12 0" /><path d="M8 18a4 4 0 0 0 8 0v-4a4 4 0 0 0-8 0v2" /><path d="M12 14v5" /></Icon>;
const Gauge = (props) => <Icon {...props}><path d="M4 14a8 8 0 0 1 16 0" /><path d="M12 14l4-5" /><path d="M6 20h12" /></Icon>;
const History = (props) => <Icon {...props}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /><path d="M12 7v5l4 2" /></Icon>;
const LayoutDashboard = (props) => <Icon {...props}><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="5" rx="2" /><rect x="13" y="10" width="8" height="11" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /></Icon>;
const LockKeyhole = (props) => <Icon {...props}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 15v2" /></Icon>;
const LogIn = (props) => <Icon {...props}><path d="M14 3h5v18h-5" /><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /></Icon>;
const Menu = (props) => <Icon {...props}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></Icon>;
const QrCode = (props) => <Icon {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3z" /><path d="M21 14v7h-4" /></Icon>;
const Railway = (props) => <Icon {...props}><path d="M4 17 12 3l8 14" /><path d="M7 17h10" /><path d="M9 21h6" /></Icon>;
const ScanLine = (props) => <Icon {...props}><path d="M4 7V5a2 2 0 0 1 2-2h2" /><path d="M16 3h2a2 2 0 0 1 2 2v2" /><path d="M20 17v2a2 2 0 0 1-2 2h-2" /><path d="M8 21H6a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /></Icon>;
const Search = (props) => <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>;
const ShieldCheck = (props) => <Icon {...props}><path d="M12 3 20 6v6c0 5-3.4 8.5-8 9-4.6-.5-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.2 2.2L16 9" /></Icon>;
const TicketCheck = (props) => <Icon {...props}><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7Z" /><path d="m9 12 2 2 4-4" /></Icon>;
const UserRound = (props) => <Icon {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>;
const UsersRound = (props) => <Icon {...props}><path d="M16 21a6 6 0 0 0-12 0" /><circle cx="10" cy="8" r="4" /><path d="M22 21a5 5 0 0 0-4-4.9" /><path d="M16 4.1a4 4 0 0 1 0 7.8" /></Icon>;
const X = (props) => <Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>;

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'entrada', label: 'Registrar Entrada', icon: DoorOpen },
  { id: 'qr', label: 'Validar QR', icon: QrCode },
  { id: 'historial', label: 'Historial', icon: History },
  { id: 'reportes', label: 'Reportes', icon: BarChart3 }
];

const kpis = [
  { label: 'Visitantes hoy', value: '1,284', delta: '+18.4%', icon: UsersRound, tone: 'cyan' },
  { label: 'Entradas validadas', value: '968', delta: '+12.1%', icon: TicketCheck, tone: 'green' },
  { label: 'Capacidad ocupada', value: '74%', delta: 'Sala Norte', icon: Gauge, tone: 'amber' },
  { label: 'Alertas activas', value: '03', delta: '2 leves', icon: ShieldCheck, tone: 'rose' }
];

const visitors = [
  { name: 'Camila Rojas', type: 'General', room: 'Galeria Colonial', time: '09:42', status: 'Validado' },
  { name: 'Andres Morales', type: 'VIP', room: 'Arte Moderno', time: '10:05', status: 'Dentro' },
  { name: 'Lucia Benitez', type: 'Estudiante', room: 'Ciencias Naturales', time: '10:18', status: 'Pendiente' },
  { name: 'Mateo Vargas', type: 'Grupo', room: 'Auditorio', time: '10:31', status: 'Validado' }
];

const reports = [
  { label: 'Pico de acceso', value: '10:00 - 11:00', icon: Clock3 },
  { label: 'Sala mas visitada', value: 'Arte Moderno', icon: AreaChart },
  { label: 'Conversion QR', value: '96.8%', icon: BadgeCheck }
];

function Login({ onLogin }) {
  return (
    <section className="login-shell">
      <div className="login-art" aria-hidden="true">
        <div className="orbital orbital-one" />
        <div className="orbital orbital-two" />
        <div className="museum-mark">
          <Fingerprint size={58} />
          <span>Museum Access Control</span>
        </div>
      </div>
      <div className="login-panel glass">
        <div className="brand-row">
          <div className="brand-icon">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="eyebrow">Control ejecutivo</p>
            <h1>museum_access_control</h1>
          </div>
        </div>
        <form className="login-form" onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
          <label>
            Usuario
            <div className="input-wrap">
              <UserRound size={18} />
              <input type="email" placeholder="admin@museo.gov" defaultValue="admin@museo.gov" />
            </div>
          </label>
          <label>
            Contrasena
            <div className="input-wrap">
              <LockKeyhole size={18} />
              <input type="password" placeholder="••••••••" defaultValue="museum2026" />
            </div>
          </label>
          <div className="login-meta">
            <label className="checkline">
              <input type="checkbox" defaultChecked />
              Mantener sesion
            </label>
            <a href="#recuperar">Recuperar acceso</a>
          </div>
          <button className="primary-btn" type="submit">
            <LogIn size={18} />
            Entrar al sistema
          </button>
        </form>
        <div className="integration-strip">
          <span><Database size={15} /> PostgreSQL ready</span>
          <span><Railway size={15} /> Railway deploy</span>
        </div>
      </div>
    </section>
  );
}

function Sidebar({ active, onChange, open, onClose }) {
  return (
    <>
      <aside className={`sidebar glass ${open ? 'is-open' : ''}`}>
        <div className="sidebar-head">
          <div className="brand-icon">
            <Fingerprint size={24} />
          </div>
          <div>
            <strong>Museum AC</strong>
            <span>Security Suite</span>
          </div>
          <button className="icon-btn close-btn" onClick={onClose} aria-label="Cerrar menu">
            <X size={18} />
          </button>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={active === item.id ? 'active' : ''}
                onClick={() => { onChange(item.id); onClose(); }}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-card">
          <p>Integracion</p>
          <strong>API lista para backend</strong>
          <span>Variables de entorno, PostgreSQL y Railway preparados.</span>
        </div>
      </aside>
      <button className={`scrim ${open ? 'is-visible' : ''}`} onClick={onClose} aria-label="Cerrar menu" />
    </>
  );
}

function Header({ active, onMenu }) {
  const title = navItems.find((item) => item.id === active)?.label ?? 'Dashboard';
  return (
    <header className="topbar glass">
      <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Abrir menu">
        <Menu size={21} />
      </button>
      <div>
        <p className="eyebrow">Panel administrativo</p>
        <h2>{title}</h2>
      </div>
      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />
          <input placeholder="Buscar visitante, sala o QR" />
        </div>
        <button className="icon-btn" aria-label="Notificaciones">
          <Bell size={19} />
        </button>
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <div className="view-grid">
      <section className="kpi-grid">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <article className={`kpi-card glass tone-${kpi.tone}`} key={kpi.label}>
              <div className="kpi-icon"><Icon size={22} /></div>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small>{kpi.delta}</small>
            </article>
          );
        })}
      </section>
      <section className="panel glass wide">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Flujo en tiempo real</p>
            <h3>Accesos por hora</h3>
          </div>
          <button className="ghost-btn">Exportar</button>
        </div>
        <div className="chart-bars" aria-label="Grafico de accesos">
          {[42, 58, 74, 91, 68, 84, 63, 77, 55, 69].map((height, index) => (
            <div className="bar-wrap" key={index}>
              <span style={{ height: `${height}%` }} />
            </div>
          ))}
        </div>
      </section>
      <section className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Estado operacional</p>
            <h3>Salas activas</h3>
          </div>
        </div>
        <div className="room-list">
          {['Arte Moderno', 'Galeria Colonial', 'Auditorio', 'Ciencias Naturales'].map((room, index) => (
            <div className="room-row" key={room}>
              <span>{room}</span>
              <div><i style={{ width: `${[82, 63, 49, 71][index]}%` }} /></div>
              <strong>{[82, 63, 49, 71][index]}%</strong>
            </div>
          ))}
        </div>
      </section>
      <VisitorTable />
    </div>
  );
}

function VisitorTable() {
  return (
    <section className="panel glass wide">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Registro vivo</p>
          <h3>Ultimos ingresos</h3>
        </div>
        <button className="ghost-btn">Ver todos</button>
      </div>
      <div className="table">
        {visitors.map((visitor) => (
          <div className="table-row" key={visitor.name}>
            <div>
              <strong>{visitor.name}</strong>
              <span>{visitor.type}</span>
            </div>
            <span>{visitor.room}</span>
            <span>{visitor.time}</span>
            <mark>{visitor.status}</mark>
          </div>
        ))}
      </div>
    </section>
  );
}

function EntryModule() {
  return (
    <section className="module-layout">
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Nuevo visitante</p>
            <h3>Registrar Entrada</h3>
          </div>
        </div>
        <form className="stack-form">
          <input placeholder="Nombre completo" />
          <select defaultValue="General">
            <option>General</option>
            <option>VIP</option>
            <option>Estudiante</option>
            <option>Grupo</option>
          </select>
          <input placeholder="Documento / ID" />
          <select defaultValue="Arte Moderno">
            <option>Arte Moderno</option>
            <option>Galeria Colonial</option>
            <option>Ciencias Naturales</option>
            <option>Auditorio</option>
          </select>
          <button className="primary-btn" type="button">
            <CheckCircle2 size={18} />
            Registrar acceso
          </button>
        </form>
      </div>
      <div className="panel glass accent-panel">
        <CalendarDays size={34} />
        <h3>Turno actual</h3>
        <p>Control de capacidad, horario de visita y trazabilidad de entrada en una sola operacion.</p>
        <div className="metric-line"><span>Capacidad disponible</span><strong>326</strong></div>
        <div className="metric-line"><span>Tiempo promedio</span><strong>38 min</strong></div>
      </div>
    </section>
  );
}

function QrModule() {
  return (
    <section className="module-layout">
      <div className="scanner-card glass">
        <div className="scan-frame">
          <ScanLine size={88} />
          <span />
        </div>
        <h3>Validar QR</h3>
        <p>Escaneo preparado para conectar camara, lector externo o endpoint de validacion.</p>
        <button className="primary-btn" type="button">
          <QrCode size={18} />
          Iniciar escaneo
        </button>
      </div>
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Resultado</p>
            <h3>Ticket #MAC-92814</h3>
          </div>
          <mark>Aprobado</mark>
        </div>
        <div className="detail-list">
          <div><span>Visitante</span><strong>Sofia Herrera</strong></div>
          <div><span>Tipo</span><strong>VIP</strong></div>
          <div><span>Valido hasta</span><strong>17 Jun 2026, 18:00</strong></div>
          <div><span>Firma</span><strong>QR-SHA256</strong></div>
        </div>
      </div>
    </section>
  );
}

function HistoryModule() {
  return (
    <section className="panel glass full">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Auditoria</p>
          <h3>Historial de accesos</h3>
        </div>
        <button className="ghost-btn">Filtrar</button>
      </div>
      <VisitorTable />
    </section>
  );
}

function ReportsModule() {
  return (
    <section className="view-grid">
      {reports.map((report) => {
        const Icon = report.icon;
        return (
          <article className="report-card glass" key={report.label}>
            <Icon size={26} />
            <span>{report.label}</span>
            <strong>{report.value}</strong>
            <ChevronRight size={19} />
          </article>
        );
      })}
      <section className="panel glass wide">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Reportes ejecutivos</p>
            <h3>Resumen semanal</h3>
          </div>
          <button className="ghost-btn">Descargar PDF</button>
        </div>
        <div className="insight-grid">
          <div><strong>8,946</strong><span>Visitantes totales</span></div>
          <div><strong>4.7/5</strong><span>Satisfaccion</span></div>
          <div><strong>99.2%</strong><span>Disponibilidad</span></div>
        </div>
      </section>
    </section>
  );
}

function IntegrationStatus() {
  return (
    <div className="integration-card glass">
      <span><Database size={16} /> PostgreSQL schema ready</span>
      <span><Railway size={16} /> Railway env vars</span>
      <span><ShieldCheck size={16} /> JWT auth layer</span>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  const content = useMemo(() => {
    if (active === 'entrada') return <EntryModule />;
    if (active === 'qr') return <QrModule />;
    if (active === 'historial') return <HistoryModule />;
    if (active === 'reportes') return <ReportsModule />;
    return <Dashboard />;
  }, [active]);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <main className="app-shell">
      <Sidebar active={active} onChange={setActive} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <section className="content-shell">
        <Header active={active} onMenu={() => setMenuOpen(true)} />
        {content}
        <IntegrationStatus />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
