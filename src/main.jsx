import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import QRCode from 'qrcode';
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
const DoorOpen = (props) => <Icon {...props}><path d="M14 3h5v18h-5" /><path d="M14 21V5L6 3v18l8-2" /><path d="M11 12h.01" /></Icon>;
const Fingerprint = (props) => <Icon {...props}><path d="M7 10a5 5 0 0 1 10 0" /><path d="M6 14a6 6 0 0 1 12 0" /><path d="M8 18a4 4 0 0 0 8 0v-4a4 4 0 0 0-8 0v2" /><path d="M12 14v5" /></Icon>;
const Gauge = (props) => <Icon {...props}><path d="M4 14a8 8 0 0 1 16 0" /><path d="M12 14l4-5" /><path d="M6 20h12" /></Icon>;
const History = (props) => <Icon {...props}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /><path d="M12 7v5l4 2" /></Icon>;
const LayoutDashboard = (props) => <Icon {...props}><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="5" rx="2" /><rect x="13" y="10" width="8" height="11" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /></Icon>;
const LockKeyhole = (props) => <Icon {...props}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 15v2" /></Icon>;
const LogIn = (props) => <Icon {...props}><path d="M14 3h5v18h-5" /><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /></Icon>;
const Menu = (props) => <Icon {...props}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></Icon>;
const QrCode = (props) => <Icon {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3z" /><path d="M21 14v7h-4" /></Icon>;
const Signal = (props) => <Icon {...props}><path d="M4 17 12 3l8 14" /><path d="M7 17h10" /><path d="M9 21h6" /></Icon>;
const Search = (props) => <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>;
const ShieldCheck = (props) => <Icon {...props}><path d="M12 3 20 6v6c0 5-3.4 8.5-8 9-4.6-.5-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.2 2.2L16 9" /></Icon>;
const TicketCheck = (props) => <Icon {...props}><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7Z" /><path d="m9 12 2 2 4-4" /></Icon>;
const UserRound = (props) => <Icon {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>;
const UsersRound = (props) => <Icon {...props}><path d="M16 21a6 6 0 0 0-12 0" /><circle cx="10" cy="8" r="4" /><path d="M22 21a5 5 0 0 0-4-4.9" /><path d="M16 4.1a4 4 0 0 1 0 7.8" /></Icon>;
const X = (props) => <Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>;

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'entrada', label: 'Registrar Entrada', icon: DoorOpen },
  { id: 'salas', label: 'Salas', icon: Gauge },
  { id: 'qr', label: 'QR generados', icon: QrCode },
  { id: 'historial', label: 'Historial', icon: History },
  { id: 'reportes', label: 'Reportes', icon: BarChart3 }
];

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Error de conexion');
  return data;
}

function withSearch(path, query) {
  if (!query.trim()) return path;
  return `${path}?search=${encodeURIComponent(query.trim())}`;
}

function matchesSearch(item, query) {
  if (!query.trim()) return true;
  const value = query.toLowerCase();
  return [
    item.full_name,
    item.visitor_type,
    item.phone,
    item.room,
    item.ticket_code,
    item.country,
    item.city,
    item.entered_at,
    item.time,
    item.status
  ].some((field) => String(field || '').toLowerCase().includes(value));
}

function exportCsv(rows) {
  const headers = ['Nombre', 'Tipo', 'Telefono', 'Sala', 'Fecha/Hora', 'Estado', 'QR', 'Ciudad', 'Pais', 'Validado por'];
  const escape = (value) => `"${String(value || '').replace(/"/g, '""')}"`;
  const csv = [
    headers.join(','),
    ...rows.map((row) => [
      row.full_name,
      row.visitor_type,
      row.phone,
      row.room,
      row.entered_at || row.time,
      row.status,
      row.ticket_code,
      row.city,
      row.country,
      row.validated_by
    ].map(escape).join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ingresos-museo-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function qrPayload(ticket) {
  return JSON.stringify({
    ticketId: ticket.ticketId || ticket.ticket_id || ticket.id,
    ticketCode: ticket.code || ticket.ticket_code,
    entryId: ticket.entryId || ticket.entry_id,
    visitor: ticket.visitor || ticket.full_name,
    phone: ticket.phone,
    issuedAt: ticket.entered_at || ticket.issuedAt
  });
}

async function printQr(ticket) {
  const code = ticket.code || ticket.ticket_code;
  const visitor = ticket.visitor || ticket.full_name || 'Visitante';
  const phone = ticket.phone || '';
  const payload = qrPayload(ticket);
  const qrSrc = await QRCode.toDataURL(payload, {
    width: 260,
    margin: 2,
    color: { dark: '#071014', light: '#ffffff' }
  });
  const printWindow = window.open('', '_blank', 'width=420,height=620');
  if (!printWindow) return;
  printWindow.document.write(`
    <html>
      <head>
        <title>QR ${code}</title>
        <style>
          body { font-family: Arial, sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0; color: #071014; }
          main { text-align: center; border: 1px solid #d8dee4; border-radius: 16px; padding: 24px; width: 320px; }
          img { width: 260px; height: 260px; }
          h1 { font-size: 20px; margin: 0 0 8px; }
          p { margin: 6px 0; }
          strong { font-size: 18px; }
        </style>
      </head>
      <body>
        <main>
          <h1>Museo del Zocalo</h1>
          <img src="${qrSrc}" alt="QR ${code}" />
          <strong>${code}</strong>
          <p>${visitor}</p>
          <p>${phone}</p>
          <p>${ticket.room || ''}</p>
        </main>
        <script>window.onload = () => { window.print(); window.close(); };</script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

function QRCodeImage({ value, label }) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value, {
      width: 220,
      margin: 2,
      color: {
        dark: '#071014',
        light: '#f3f7f8'
      }
    }).then((dataUrl) => {
      if (active) setSrc(dataUrl);
    });
    return () => {
      active = false;
    };
  }, [value]);

  if (!src) return <div className="qr-placeholder">Generando QR...</div>;

  return (
    <figure className="qr-figure">
      <img src={src} alt={`QR ${label || value}`} />
      <figcaption>{label || value}</figcaption>
    </figure>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('admin@museo.gov');
  const [password, setPassword] = useState('museum2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-shell">
      <div className="login-art" aria-hidden="true">
        <div className="orbital orbital-one" />
        <div className="orbital orbital-two" />
        <div className="museum-mark">
          <Fingerprint size={58} />
          <span>Museo del Zocalo Control de Acceso</span>
        </div>
      </div>
      <div className="login-panel glass">
        <div className="brand-row">
          <div className="brand-icon"><ShieldCheck size={24} /></div>
          <div>
            <p className="eyebrow">Control ejecutivo</p>
            <h1>Museo del Zocalo Control de Acceso</h1>
          </div>
        </div>
        <form className="login-form" onSubmit={submit}>
          <label>
            Usuario
            <div className="input-wrap">
              <UserRound size={18} />
              <input type="email" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
          </label>
          <label>
            Contrasena
            <div className="input-wrap">
              <LockKeyhole size={18} />
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
          </label>
          {error && <p className="form-message error">{error}</p>}
          <div className="login-meta">
            <label className="checkline">
              <input type="checkbox" defaultChecked />
              Mantener sesion
            </label>
            <a href="#recuperar">Recuperar acceso</a>
          </div>
          <button className="primary-btn" type="submit" disabled={loading}>
            <LogIn size={18} />
            {loading ? 'Validando...' : 'Entrar al sistema'}
          </button>
        </form>
        <div className="integration-strip">
          <span><ShieldCheck size={15} /> Sesion protegida</span>
          <span><Signal size={15} /> Operacion segura</span>
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
          <div className="brand-icon"><Fingerprint size={24} /></div>
          <div>
            <strong>Museo del Zocalo</strong>
            <span>Security Suite</span>
          </div>
          <button className="icon-btn close-btn" onClick={onClose} aria-label="Cerrar menu"><X size={18} /></button>
        </div>
        <nav>
          {navItems.map((item) => {
            const NavIcon = item.icon;
            return (
              <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => { onChange(item.id); onClose(); }}>
                <NavIcon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-card">
          <p>Integracion</p>
          <strong>Operacion activa</strong>
          <span>Accesos, validaciones, historial y reportes actualizados.</span>
        </div>
      </aside>
      <button className={`scrim ${open ? 'is-visible' : ''}`} onClick={onClose} aria-label="Cerrar menu" />
    </>
  );
}

function Header({
  active,
  onMenu,
  user,
  searchQuery,
  searchDraft,
  onSearchDraft,
  onSearchSubmit,
  onClearSearch,
  notifications,
  notificationsOpen,
  onToggleNotifications
}) {
  const title = navItems.find((item) => item.id === active)?.label ?? 'Dashboard';
  return (
    <header className="topbar glass">
      <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Abrir menu"><Menu size={21} /></button>
      <div>
        <p className="eyebrow">Panel administrativo</p>
        <h2>{title}</h2>
      </div>
      <div className="topbar-actions">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <div className="search-box">
            <Search size={17} />
            <input value={searchDraft} onChange={(event) => onSearchDraft(event.target.value)} placeholder="Buscar visitante, sala o QR" />
          </div>
          <button className="ghost-btn search-action" type="submit">Buscar</button>
          {searchQuery && <button className="ghost-btn search-action" type="button" onClick={onClearSearch}>Limpiar</button>}
        </form>
        <span className="session-label">Sesion: {user?.first_name || 'Usuario'}</span>
        <div className="notification-wrap">
          <button className="icon-btn" type="button" onClick={onToggleNotifications} aria-label="Notificaciones"><Bell size={19} /></button>
          {notificationsOpen && (
            <div className="notification-panel glass">
              <p className="eyebrow">Alertas</p>
              {notifications.map((item) => (
                <div className="notification-item" key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function VisitorTable({ visitors = [], wide = false }) {
  return (
    <section className={`panel glass ${wide ? 'wide' : 'full'} visitor-panel`}>
      <div className="panel-head">
        <div>
          <p className="eyebrow">Registro vivo</p>
          <h3>Ultimos ingresos</h3>
        </div>
      </div>
      <div className="table">
        {visitors.length === 0 && <p className="empty-state">No hay registros todavia.</p>}
        {visitors.map((visitor) => (
          <div className="table-row" key={visitor.id}>
            <div>
              <strong>{visitor.full_name}</strong>
              <span>{[visitor.visitor_type, visitor.phone, [visitor.city, visitor.country].filter(Boolean).join(', ')].filter(Boolean).join(' · ') || 'Sin datos'}</span>
            </div>
            <span>{visitor.room}</span>
            <span>{visitor.time || visitor.entered_at}</span>
            <mark>{visitor.status}</mark>
          </div>
        ))}
      </div>
    </section>
  );
}

function Dashboard({ data }) {
  const kpis = [
    { label: 'Visitantes hoy', value: data.kpis.visitorsToday, delta: 'Actualizado', icon: UsersRound, tone: 'cyan' },
    { label: 'QR validados hoy', value: data.kpis.qrValidationsToday, delta: 'Tickets usados', icon: TicketCheck, tone: 'green' },
    { label: 'Visitantes dentro', value: data.kpis.visitorsInside, delta: `${data.kpis.totalCapacity} capacidad`, icon: Gauge, tone: 'amber' },
    { label: 'Salas activas', value: data.rooms.length, delta: 'Operativas', icon: ShieldCheck, tone: 'rose' }
  ];
  const max = Math.max(...data.hourly.map((item) => Number(item.value)), 1);
  const weeklyMax = Math.max(...data.weekly.map((item) => Number(item.value)), 1);

  return (
    <div className="view-grid">
      <section className="kpi-grid">
        {kpis.map((kpi) => {
          const KpiIcon = kpi.icon;
          return (
            <article className={`kpi-card glass tone-${kpi.tone}`} key={kpi.label}>
              <div className="kpi-icon"><KpiIcon size={22} /></div>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small>{kpi.delta}</small>
            </article>
          );
        })}
      </section>
      <section className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Estado operacional</p>
            <h3>Salas activas</h3>
          </div>
        </div>
        <div className="room-list">
          {data.rooms.map((room) => (
            <div className="room-row" key={room.id}>
              <span>{room.name}</span>
              <div><i style={{ width: `${room.occupancy || 0}%` }} /></div>
              <strong>{room.occupancy || 0}%</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="panel glass full">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Resumen semanal</p>
            <h3>Ingresos por dia</h3>
          </div>
        </div>
        <div className="weekly-chart">
          {data.weekly.map((item) => (
            <div className="weekly-item" key={item.date}>
              <div className="weekly-bar">
                <span style={{ height: `${Math.max(8, (Number(item.value) / weeklyMax) * 100)}%` }} />
              </div>
              <strong>{item.value}</strong>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="panel glass full">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Detalle horario</p>
            <h3>Accesos por hora</h3>
          </div>
        </div>
        <div className="hourly-chart" aria-label="Grafico de accesos por hora">
          {data.hourly.map((item) => (
            <div className="hourly-item" key={item.label} title={`${item.label}: ${item.value}`}>
              <div className="bar-wrap">
                <span style={{ height: `${Math.max(8, (Number(item.value) / max) * 100)}%` }} />
              </div>
              <strong>{item.value}</strong>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </section>
      <VisitorTable visitors={data.recent} />
    </div>
  );
}

function EntryModule({ rooms, user, onSaved }) {
  const [form, setForm] = useState({
    fullName: '',
    documentNumber: '',
    visitorType: 'General',
    email: '',
    phone: '',
    country: 'Colombia',
    city: '',
    roomId: rooms[0]?.id || ''
  });
  const [message, setMessage] = useState('');
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!form.roomId && rooms[0]?.id) setForm((current) => ({ ...current, roomId: rooms[0].id }));
  }, [rooms, form.roomId]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const data = await api('/api/entries', {
        method: 'POST',
        body: JSON.stringify({ ...form, validatedBy: user?.id })
      });
      setMessage(`Entrada registrada. QR: ${data.ticket.ticket_code}`);
      setGeneratedTicket({
        code: data.ticket.ticket_code,
        ticketId: data.ticket.id,
        entryId: data.entry.id,
        visitor: data.visitor.full_name,
        phone: data.visitor.phone,
        issuedAt: data.entry.entered_at
      });
      setForm({
        fullName: '',
        documentNumber: '',
        visitorType: 'General',
        email: '',
        phone: '',
        country: 'Colombia',
        city: '',
        roomId: rooms[0]?.id || ''
      });
      onSaved();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="module-layout">
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Nuevo visitante</p>
            <h3>Registrar Entrada</h3>
          </div>
        </div>
        <form className="stack-form" onSubmit={submit}>
          {rooms.length === 0 && <p className="form-message error">Primero registra una sala en el modulo Salas.</p>}
          <input
            required
            pattern="[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+"
            title="Solo letras y espacios"
            placeholder="Nombre completo"
            value={form.fullName}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
          />
          <select required value={form.visitorType} onChange={(event) => setForm({ ...form, visitorType: event.target.value })}>
            <option>General</option>
            <option>VIP</option>
            <option>Estudiante</option>
            <option>Grupo</option>
          </select>
          <input required placeholder="Documento / ID" value={form.documentNumber} onChange={(event) => setForm({ ...form, documentNumber: event.target.value })} />
          <input required type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input
            required
            type="tel"
            pattern="[0-9+\s()-]{7,20}"
            title="Usa entre 7 y 20 caracteres: numeros, espacios, +, guiones o parentesis"
            placeholder="Telefono"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
          <div className="form-grid">
            <input required placeholder="Pais" value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} />
            <input required placeholder="Ciudad" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
          </div>
          <select required value={form.roomId} onChange={(event) => setForm({ ...form, roomId: event.target.value })}>
            <option value="" disabled>Selecciona una sala</option>
            {rooms.map((room) => <option value={room.id} key={room.id}>{room.name}</option>)}
          </select>
          {message && <p className="form-message">{message}</p>}
          <button className="primary-btn" type="submit" disabled={loading || rooms.length === 0}>
            <CheckCircle2 size={18} />
            {loading ? 'Registrando...' : 'Registrar acceso'}
          </button>
          {generatedTicket && (
            <div className="generated-qr-card">
              <p className="eyebrow">QR generado</p>
              <QRCodeImage value={qrPayload(generatedTicket)} label={`${generatedTicket.visitor} · ${generatedTicket.code}`} />
              <button className="ghost-btn" type="button" onClick={() => printQr(generatedTicket)}>Imprimir QR</button>
            </div>
          )}
        </form>
      </div>
      <div className="panel glass accent-panel">
        <CalendarDays size={34} />
        <h3>Turno actual</h3>
        <p>Control de capacidad, horario de visita y trazabilidad de entrada en una sola operacion.</p>
        <div className="metric-line"><span>Salas disponibles</span><strong>{rooms.length}</strong></div>
        <div className="metric-line"><span>Operador</span><strong>{user?.first_name || 'Activo'}</strong></div>
      </div>
    </section>
  );
}

function RoomsModule({ rooms, onSaved }) {
  const [form, setForm] = useState({ name: '', capacity: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const data = await api('/api/rooms', {
        method: 'POST',
        body: JSON.stringify({ name: form.name, capacity: Number(form.capacity) })
      });
      setMessage(`Sala guardada: ${data.room.name}`);
      setForm({ name: '', capacity: '' });
      onSaved();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="module-layout">
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Administracion</p>
            <h3>Registrar Sala</h3>
          </div>
        </div>
        <form className="stack-form" onSubmit={submit}>
          <input required placeholder="Nombre de la sala" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input required min="1" type="number" placeholder="Capacidad" value={form.capacity} onChange={(event) => setForm({ ...form, capacity: event.target.value })} />
          {message && <p className="form-message">{message}</p>}
          <button className="primary-btn" type="submit" disabled={loading}>
            <CheckCircle2 size={18} />
            {loading ? 'Guardando...' : 'Guardar sala'}
          </button>
        </form>
      </div>
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Disponibles</p>
            <h3>Salas registradas</h3>
          </div>
        </div>
        <div className="room-admin-list">
          {rooms.length === 0 && <p className="empty-state">No hay salas registradas todavia.</p>}
          {rooms.map((room) => (
            <div className="room-admin-row" key={room.id}>
              <div>
                <strong>{room.name}</strong>
                <span>Capacidad {room.capacity}</span>
              </div>
              <mark>Activa</mark>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QrModule({ history }) {
  const tickets = history.filter((item) => item.ticket_code).slice(0, 12);
  return (
    <section className="panel glass full">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Emision</p>
          <h3>QR generados por ingreso</h3>
        </div>
      </div>
      {tickets.length === 0 && <p className="empty-state">Aun no hay QR generados. Registra una entrada para crear el primero.</p>}
      <div className="qr-list">
        {tickets.map((item) => (
          <article className="qr-list-row" key={item.id}>
            <QRCodeImage value={qrPayload(item)} label={item.ticket_code} />
            <div className="qr-list-info">
              <strong>{item.full_name}</strong>
              <span>{[item.phone, item.room].filter(Boolean).join(' · ') || 'Sin datos'}</span>
              <span>{[item.city, item.country].filter(Boolean).join(', ') || 'Sin origen'}</span>
              <small>{item.entered_at}</small>
            </div>
            <button className="ghost-btn" type="button" onClick={() => printQr(item)}>Imprimir QR</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function HistoryModule({ history, searchQuery, searchDraft, onSearchDraft, onSearchSubmit, onClearSearch }) {
  return (
    <section className="panel glass full">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Auditoria</p>
          <h3>Historial de accesos</h3>
        </div>
      </div>
      <form className="history-toolbar" onSubmit={onSearchSubmit}>
        <div className="search-box history-search">
          <Search size={17} />
          <input value={searchDraft} onChange={(event) => onSearchDraft(event.target.value)} placeholder="Buscar por nombre, telefono, QR, sala, ciudad, pais o estado" />
        </div>
        <button className="ghost-btn" type="submit">Buscar</button>
        {searchQuery && <button className="ghost-btn" type="button" onClick={onClearSearch}>Limpiar</button>}
        <button className="primary-btn export-btn" type="button" onClick={() => exportCsv(history)}>
          Exportar CSV
        </button>
      </form>
      <p className="empty-state">
        {searchQuery ? `${history.length} resultado(s) para "${searchQuery}"` : `${history.length} ingreso(s) recientes`}
      </p>
      <div className="table">
        {history.length === 0 && <p className="empty-state">No hay registros que coincidan con la busqueda.</p>}
        {history.map((item) => (
          <div className="table-row history-row" key={item.id}>
            <div>
              <strong>{item.full_name}</strong>
              <span>{[item.ticket_code || 'Sin QR', item.phone, [item.city, item.country].filter(Boolean).join(', ')].filter(Boolean).join(' · ') || 'Sin datos'}</span>
            </div>
            <span>{item.room}</span>
            <span>{item.entered_at}</span>
            <mark>{item.status}</mark>
          </div>
        ))}
      </div>
    </section>
  );
}

function RankingList({ title, items }) {
  return (
    <div className="ranking-list">
      <h3>{title}</h3>
      {items.length === 0 && <p className="empty-state">Sin datos en el rango.</p>}
      {items.map((item) => (
        <div className="ranking-row" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

function ReportsModule({ data, reports, accessReport, reportRange, onRangeChange, onRefreshReport }) {
  const cards = [
    { label: 'Pico de acceso', value: data.reports.peakAccess, icon: Clock3 },
    { label: 'Sala mas visitada', value: data.reports.topRoom, icon: AreaChart },
    { label: 'Origen principal', value: data.reports.topOrigin, icon: UsersRound }
  ];
  const summary = accessReport.summary || {};

  return (
    <section className="view-grid">
      {cards.map((report) => {
        const ReportIcon = report.icon;
        return (
          <article className="report-card glass" key={report.label}>
            <ReportIcon size={26} />
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
            <h3>Resumen general</h3>
          </div>
        </div>
        <div className="insight-grid">
          <div><strong>{reports.total_entries || 0}</strong><span>Entradas totales</span></div>
          <div><strong>{reports.countries_count || 0}</strong><span>Paises registrados</span></div>
          <div><strong>{reports.cities_count || 0}</strong><span>Ciudades registradas</span></div>
        </div>
      </section>
      <section className="panel glass full">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Exportacion</p>
            <h3>Lista de accesos</h3>
          </div>
          <button className="primary-btn export-btn" type="button" onClick={() => exportCsv(accessReport.accesses || [])}>
            Exportar CSV
          </button>
        </div>
        <div className="report-filters">
          <label>
            Desde
            <input type="date" value={reportRange.from} onChange={(event) => onRangeChange({ ...reportRange, from: event.target.value })} />
          </label>
          <label>
            Hasta
            <input type="date" value={reportRange.to} onChange={(event) => onRangeChange({ ...reportRange, to: event.target.value })} />
          </label>
          <button className="ghost-btn" type="button" onClick={onRefreshReport}>Actualizar</button>
        </div>
        <div className="insight-grid report-summary">
          <div><strong>{summary.total_entries || 0}</strong><span>Accesos del rango</span></div>
          <div><strong>{summary.unique_visitors || 0}</strong><span>Visitantes unicos</span></div>
          <div><strong>{summary.qr_entries || 0}</strong><span>Accesos con QR</span></div>
        </div>
        <div className="ranking-grid">
          <RankingList title="Top paises" items={accessReport.rankings?.countries || []} />
          <RankingList title="Top ciudades" items={accessReport.rankings?.cities || []} />
          <RankingList title="Top salas" items={accessReport.rankings?.rooms || []} />
        </div>
        <div className="table report-table">
          {(accessReport.accesses || []).length === 0 && <p className="empty-state">No hay accesos en el rango seleccionado.</p>}
          {(accessReport.accesses || []).slice(0, 10).map((item) => (
            <div className="table-row history-row" key={item.id}>
              <div>
                <strong>{item.full_name}</strong>
                <span>{[item.ticket_code || 'Sin QR', item.phone, [item.city, item.country].filter(Boolean).join(', ')].filter(Boolean).join(' · ') || 'Sin datos'}</span>
              </div>
              <span>{item.room}</span>
              <span>{item.entered_at}</span>
              <mark>{item.status}</mark>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function IntegrationStatus() {
  return (
    <div className="integration-card glass">
      <span><ShieldCheck size={16} /> Sesion protegida</span>
      <span><Signal size={16} /> Operacion activa</span>
      <span><ShieldCheck size={16} /> Revision al dia</span>
    </div>
  );
}

const emptyDashboard = {
  kpis: { visitorsToday: 0, qrValidationsToday: 0, visitorsInside: 0, totalCapacity: 0 },
  hourly: [],
  weekly: [],
  rooms: [],
  recent: [],
  reports: { peakAccess: 'Sin datos', topRoom: 'Sin datos', topOrigin: 'Sin datos', qrConversion: '0%', totalVisitors: 0 }
};

const today = new Date().toISOString().slice(0, 10);
const weekAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const emptyAccessReport = {
  summary: {},
  accesses: [],
  rankings: { countries: [], cities: [], rooms: [] }
};

function App() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [history, setHistory] = useState([]);
  const [reports, setReports] = useState({});
  const [accessReport, setAccessReport] = useState(emptyAccessReport);
  const [reportRange, setReportRange] = useState({ from: weekAgo, to: today });
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDraft, setSearchDraft] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  async function loadAccessReport(range = reportRange) {
    const params = new URLSearchParams({ from: range.from, to: range.to });
    const data = await api(`/api/reports/accesses?${params.toString()}`);
    setAccessReport(data);
  }

  async function loadData() {
    setError('');
    try {
      const [dashboardData, historyData, reportData] = await Promise.all([
        api(withSearch('/api/dashboard', searchQuery)),
        api(withSearch('/api/history', searchQuery)),
        api('/api/reports')
      ]);
      setDashboard(dashboardData);
      setHistory(historyData.history || []);
      setReports(reportData.reports || {});
      await loadAccessReport();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  useEffect(() => {
    if (!user) return undefined;
    const timer = window.setTimeout(() => {
      loadData();
    }, 100);
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  function applySearch(event) {
    event?.preventDefault();
    const nextSearch = searchDraft.trim();
    if (nextSearch === searchQuery) {
      loadData();
      return;
    }
    setSearchQuery(nextSearch);
  }

  function clearSearch() {
    setSearchDraft('');
    setSearchQuery('');
  }

  const notifications = useMemo(() => {
    const items = [];
    if (dashboard.rooms.length === 0) {
      items.push({ title: 'Sin salas registradas', body: 'Crea al menos una sala para registrar entradas.' });
    }
    if (dashboard.kpis.visitorsInside > 0) {
      items.push({ title: 'Visitantes dentro', body: `${dashboard.kpis.visitorsInside} visitante(s) permanecen en el museo.` });
    }
    if (items.length === 0) {
      items.push({ title: 'Sin alertas criticas', body: 'La operacion se encuentra estable.' });
    }
    return items;
  }, [dashboard]);

  const content = useMemo(() => {
    const filteredRecent = dashboard.recent.filter((item) => matchesSearch(item, searchQuery));
    const filteredHistory = history.filter((item) => matchesSearch(item, searchQuery));
    const filteredDashboard = { ...dashboard, recent: filteredRecent };
    if (active === 'entrada') return <EntryModule rooms={dashboard.rooms} user={user} onSaved={loadData} />;
    if (active === 'salas') return <RoomsModule rooms={dashboard.rooms} onSaved={loadData} />;
    if (active === 'qr') return <QrModule history={history} />;
    if (active === 'historial') {
      return (
        <HistoryModule
          history={filteredHistory}
          searchQuery={searchQuery}
          searchDraft={searchDraft}
          onSearchDraft={setSearchDraft}
          onSearchSubmit={applySearch}
          onClearSearch={clearSearch}
        />
      );
    }
    if (active === 'reportes') {
      return (
        <ReportsModule
          data={dashboard}
          reports={reports}
          accessReport={accessReport}
          reportRange={reportRange}
          onRangeChange={setReportRange}
          onRefreshReport={() => loadAccessReport(reportRange)}
        />
      );
    }
    return <Dashboard data={filteredDashboard} />;
  }, [active, dashboard, history, reports, user, searchQuery, searchDraft, accessReport, reportRange, notifications]);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <main className="app-shell">
      <Sidebar active={active} onChange={setActive} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <section className="content-shell">
        <Header
          active={active}
          onMenu={() => setMenuOpen(true)}
          user={user}
          searchQuery={searchQuery}
          searchDraft={searchDraft}
          onSearchDraft={setSearchDraft}
          onSearchSubmit={applySearch}
          onClearSearch={clearSearch}
          notifications={notifications}
          notificationsOpen={notificationsOpen}
          onToggleNotifications={() => setNotificationsOpen((open) => !open)}
        />
        {error && <p className="form-message error">{error}</p>}
        {content}
        <IntegrationStatus />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
