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
const LogOut = (props) => <Icon {...props}><path d="M10 17 5 12l5-5" /><path d="M5 12h12" /><path d="M14 3h5v18h-5" /></Icon>;
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
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'registrar', 'operator'] },
  { id: 'entrada', label: 'Registrar Entrada', icon: DoorOpen, roles: ['admin', 'registrar', 'operator'] },
  { id: 'salas', label: 'Servicios', icon: Gauge, roles: ['admin'] },
  { id: 'usuarios', label: 'Usuarios', icon: UserRound, roles: ['admin'] },
  { id: 'validar_qr', label: 'Validar QR', icon: TicketCheck, roles: ['admin', 'registrar', 'operator'] },
  { id: 'qr', label: 'QR generados', icon: QrCode, roles: ['admin', 'registrar', 'operator'] },
  { id: 'historial', label: 'Historial', icon: History, roles: ['admin'] },
  { id: 'reportes', label: 'Reportes', icon: BarChart3, roles: ['admin', 'registrar', 'operator'] },
  { id: 'auditoria', label: 'Auditoria', icon: ShieldCheck, roles: ['admin'] }
];

const roleOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'registrar', label: 'Registro' }
];

function roleLabel(role, roleName) {
  if (roleName) return roleName;
  if (role === 'admin') return 'Administrador';
  if (role === 'registrar' || role === 'operator') return 'Registro';
  return 'Usuario';
}

function canAccess(item, user) {
  if (Array.isArray(user?.allowed_modules) && user.allowed_modules.length > 0) {
    return user.allowed_modules.includes(item.id);
  }

  return item.roles.includes(user?.role);
}

const documentTypes = [
  'Cedula de ciudadania',
  'Pasaporte',
  'Tarjeta de identidad',
  'Cedula de extranjeria'
];

async function api(path, options = {}) {
  const { headers = {}, ...rest } = options;
  const response = await fetch(path, {
    ...rest,
    headers: { 'Content-Type': 'application/json', ...headers }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Error de conexion');
  return data;
}

function authHeaders(user) {
  return {
    'X-User-Id': user?.id || '',
    'X-Username': user?.username || '',
    'X-User-Role': user?.role || ''
  };
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
    item.document_type,
    item.document_number,
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
  const headers = ['Nombre', 'Tipo visitante', 'Tipo documento', 'Documento', 'Telefono', 'Servicio', 'Fecha/Hora', 'Estado', 'QR', 'Ciudad', 'Pais', 'Validado por'];
  const escape = (value) => `"${String(value || '').replace(/"/g, '""')}"`;
  const csv = [
    headers.join(','),
    ...rows.map((row) => [
      row.full_name,
      row.visitor_type,
      row.document_type,
      row.document_number,
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
  const ticketCode = ticket.code || ticket.ticket_code;
  if (typeof window !== 'undefined' && window.location?.origin && ticketCode) {
    return `${window.location.origin}/?qr=${encodeURIComponent(ticketCode)}`;
  }

  return JSON.stringify({
    ticketId: ticket.ticketId || ticket.ticket_id || ticket.id,
    ticketCode,
    entryId: ticket.entryId || ticket.entry_id,
    visitor: ticket.visitor || ticket.full_name,
    documentType: ticket.documentType || ticket.document_type,
    documentNumber: ticket.documentNumber || ticket.document_number,
    phone: ticket.phone,
    issuedAt: ticket.entered_at || ticket.issuedAt,
    validUntil: ticket.validUntil || ticket.valid_until
  });
}

async function printQr(ticket) {
  const code = ticket.code || ticket.ticket_code;
  const visitor = ticket.visitor || ticket.full_name || 'Visitante';
  const documentType = ticket.documentType || ticket.document_type || '';
  const documentNumber = ticket.documentNumber || ticket.document_number || '';
  const phone = ticket.phone || '';
  const validUntil = ticket.validUntil || ticket.valid_until || '';
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
          <p>${[documentType, documentNumber].filter(Boolean).join(': ')}</p>
          <p>${phone}</p>
          <p>${ticket.room || ''}</p>
          <p>Valido hasta: ${validUntil || '3 horas desde emision'}</p>
          <p>Escanea con la camara del celular para validar.</p>
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
              <input type="email" autoComplete="username" placeholder="usuario@dominio.com" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
          </label>
          <label>
            Contrasena
            <div className="input-wrap">
              <LockKeyhole size={18} />
              <input type="password" autoComplete="current-password" placeholder="Ingresa tu contrasena" value={password} onChange={(event) => setPassword(event.target.value)} />
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

function Sidebar({ active, onChange, open, onClose, items }) {
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
          {items.map((item) => {
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
          <p>Operacion</p>
          <strong>Sesion activa</strong>
          <span>Panel de control y registro listo para el turno actual.</span>
        </div>
      </aside>
      <button className={`scrim ${open ? 'is-visible' : ''}`} onClick={onClose} aria-label="Cerrar menu" />
    </>
  );
}

function Header({
  active,
  title,
  onMenu,
  user,
  searchQuery,
  searchDraft,
  onSearchDraft,
  onSearchSubmit,
  onClearSearch,
  notifications,
  notificationsOpen,
  onToggleNotifications,
  onLogout
}) {
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
            <input value={searchDraft} onChange={(event) => onSearchDraft(event.target.value)} placeholder="Buscar visitante, servicio o QR" />
          </div>
          <button className="ghost-btn search-action" type="submit">Buscar</button>
          {searchQuery && <button className="ghost-btn search-action" type="button" onClick={onClearSearch}>Limpiar</button>}
        </form>
        <span className="session-label">{user?.first_name || 'Usuario'} · {roleLabel(user?.role, user?.role_name)}</span>
        <button className="ghost-btn logout-btn" type="button" onClick={onLogout}>
          <LogOut size={17} />
          Cerrar sesion
        </button>
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
              <span>{[visitor.visitor_type, [visitor.document_type, visitor.document_number].filter(Boolean).join(': '), visitor.phone, [visitor.city, visitor.country].filter(Boolean).join(', ')].filter(Boolean).join(' · ') || 'Sin datos'}</span>
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
    { label: 'Servicios activos', value: data.rooms.length, delta: 'Operativos', icon: ShieldCheck, tone: 'rose' }
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
            <h3>Servicios activos</h3>
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
    documentType: 'Cedula de ciudadania',
    documentNumber: '',
    visitorType: 'General',
    email: '',
    phone: '',
    country: '',
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
        headers: authHeaders(user),
        body: JSON.stringify({ ...form, validatedBy: user?.id })
      });
      setMessage(`Entrada registrada. QR: ${data.ticket.ticket_code}`);
      setGeneratedTicket({
        code: data.ticket.ticket_code,
        ticketId: data.ticket.id,
        entryId: data.entry.id,
        visitor: data.visitor.full_name,
        documentType: data.visitor.document_type,
        documentNumber: data.visitor.document_number,
        phone: data.visitor.phone,
        issuedAt: data.entry.entered_at,
        validUntil: data.ticket.valid_until
      });
      setForm({
        fullName: '',
        documentType: 'Cedula de ciudadania',
        documentNumber: '',
        visitorType: 'General',
        email: '',
        phone: '',
        country: '',
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
          {rooms.length === 0 && <p className="form-message error">Primero registra un servicio en el modulo Servicios.</p>}
          <input
            required
            pattern="[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+"
            title="Solo letras y espacios"
            placeholder="Nombre completo"
            value={form.fullName}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
          />
          <select value={form.visitorType} onChange={(event) => setForm({ ...form, visitorType: event.target.value })}>
            <option>General</option>
            <option>VIP</option>
            <option>Estudiante</option>
            <option>Grupo</option>
          </select>
          <select required value={form.documentType} onChange={(event) => setForm({ ...form, documentType: event.target.value })}>
            {documentTypes.map((type) => <option value={type} key={type}>{type}</option>)}
          </select>
          <input required placeholder="Documento / ID" value={form.documentNumber} onChange={(event) => setForm({ ...form, documentNumber: event.target.value })} />
          <input type="email" placeholder="Email opcional" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input
            type="tel"
            pattern="[0-9+\s()-]{7,20}"
            title="Usa entre 7 y 20 caracteres: numeros, espacios, +, guiones o parentesis"
            placeholder="Telefono opcional"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
          <div className="form-grid">
            <input required placeholder="Pais" value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} />
            <input required placeholder="Ciudad" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
          </div>
          <select required value={form.roomId} onChange={(event) => setForm({ ...form, roomId: event.target.value })}>
            <option value="" disabled>Selecciona un servicio</option>
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
        <div className="metric-line"><span>Servicios disponibles</span><strong>{rooms.length}</strong></div>
        <div className="metric-line"><span>Operador</span><strong>{user?.first_name || 'Activo'}</strong></div>
      </div>
    </section>
  );
}

function RoomsModule({ rooms, user, onSaved }) {
  const [form, setForm] = useState({ name: '', capacity: '' });
  const [draftRooms, setDraftRooms] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState('');

  useEffect(() => {
    setDraftRooms((current) => {
      const next = {};
      rooms.forEach((room) => {
        next[room.id] = current[room.id] || { name: room.name, capacity: String(room.capacity) };
      });
      return next;
    });
  }, [rooms]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const data = await api('/api/rooms', {
        method: 'POST',
        headers: authHeaders(user),
        body: JSON.stringify({ name: form.name, capacity: Number(form.capacity) })
      });
      setMessage(`Servicio guardado: ${data.room.name}`);
      setForm({ name: '', capacity: '' });
      onSaved();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  function updateDraft(roomId, values) {
    setDraftRooms((current) => ({
      ...current,
      [roomId]: { ...(current[roomId] || {}), ...values }
    }));
  }

  async function updateRoom(roomId) {
    const draft = draftRooms[roomId] || {};
    setBusyId(roomId);
    setMessage('');
    try {
      const data = await api(`/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: authHeaders(user),
        body: JSON.stringify({ name: draft.name, capacity: Number(draft.capacity) })
      });
      setMessage(`Servicio actualizado: ${data.room.name}`);
      onSaved();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusyId('');
    }
  }

  async function deleteRoom(room) {
    const confirmed = window.confirm(`Eliminar "${room.name}" de los servicios disponibles?`);
    if (!confirmed) return;
    setBusyId(room.id);
    setMessage('');
    try {
      await api(`/api/rooms/${room.id}`, { method: 'DELETE', headers: authHeaders(user) });
      setMessage(`Servicio eliminado: ${room.name}`);
      onSaved();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusyId('');
    }
  }

  return (
    <section className="module-layout">
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Administracion</p>
            <h3>Registrar servicio</h3>
          </div>
        </div>
        <form className="stack-form" onSubmit={submit}>
          <input required placeholder="Nombre del servicio" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input required min="1" type="number" placeholder="Capacidad" value={form.capacity} onChange={(event) => setForm({ ...form, capacity: event.target.value })} />
          {message && <p className="form-message">{message}</p>}
          <button className="primary-btn" type="submit" disabled={loading}>
            <CheckCircle2 size={18} />
            {loading ? 'Guardando...' : 'Guardar servicio'}
          </button>
        </form>
      </div>
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Disponibles</p>
            <h3>Servicios registrados</h3>
          </div>
        </div>
        <div className="room-admin-list">
          {rooms.length === 0 && <p className="empty-state">No hay servicios registrados todavia.</p>}
          {rooms.map((room) => {
            const draft = draftRooms[room.id] || { name: room.name, capacity: String(room.capacity) };
            return (
              <div className="room-admin-row editing" key={room.id}>
                <div className="room-edit-grid">
                  <input
                    required
                    aria-label={`Nombre de ${room.name}`}
                    value={draft.name}
                    onChange={(event) => updateDraft(room.id, { name: event.target.value })}
                  />
                  <input
                    required
                    min="1"
                    type="number"
                    aria-label={`Capacidad de ${room.name}`}
                    value={draft.capacity}
                    onChange={(event) => updateDraft(room.id, { capacity: event.target.value })}
                  />
              </div>
                <div className="row-actions">
                  <mark>Activo</mark>
                  <button className="primary-btn compact-btn" type="button" disabled={busyId === room.id} onClick={() => updateRoom(room.id)}>Actualizar</button>
                  <button className="ghost-btn danger-btn" type="button" disabled={busyId === room.id} onClick={() => deleteRoom(room)}>Eliminar</button>
                </div>
              </div>
            );
          })}
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
              <span>{[[item.document_type, item.document_number].filter(Boolean).join(': '), item.phone, item.room].filter(Boolean).join(' · ') || 'Sin datos'}</span>
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

function extractTicketCode(value) {
  const clean = String(value || '').trim();
  if (!clean) return '';
  try {
    const url = new URL(clean);
    return url.searchParams.get('qr') || clean;
  } catch (_error) {
    // Continue with plain code or JSON payload.
  }
  if (!clean.startsWith('{')) return clean;
  try {
    const payload = JSON.parse(clean);
    return payload.ticketCode || payload.code || '';
  } catch (_error) {
    return clean;
  }
}

function loadJsQr() {
  if (window.jsQR) return Promise.resolve(window.jsQR);
  const existingScript = document.getElementById('jsqr-loader');
  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener('load', () => resolve(window.jsQR), { once: true });
      existingScript.addEventListener('error', reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = 'jsqr-loader';
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
    script.async = true;
    script.onload = () => resolve(window.jsQR);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function QrValidationModule({ user, initialCode, onInitialCodeUsed }) {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const scannerFrameRef = React.useRef(null);
  const scannerActiveRef = React.useRef(false);

  function stopScanner() {
    scannerActiveRef.current = false;
    if (scannerFrameRef.current) {
      window.cancelAnimationFrame(scannerFrameRef.current);
      scannerFrameRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setScanning(false);
  }

  async function validate(nextCode = code) {
    const ticketCode = extractTicketCode(nextCode);
    setLoading(true);
    setMessage('');
    setResult(null);
    try {
      const data = await api('/api/qr/validate', {
        method: 'POST',
        headers: authHeaders(user),
        body: JSON.stringify({ ticketCode })
      });
      setResult(data);
      setMessage(data.approved ? 'QR valido para ingreso.' : 'QR vencido o no disponible.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function startScanner() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMessage('No se pudo abrir la camara en este navegador. Pega el codigo o el enlace del QR manualmente.');
      return;
    }

    try {
      setMessage('');
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      scannerActiveRef.current = true;
      setScanning(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      if ('BarcodeDetector' in window) {
        const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
        const scanWithDetector = async () => {
          if (!scannerActiveRef.current || !videoRef.current || !streamRef.current) return;
          const codes = await detector.detect(videoRef.current).catch(() => []);
          if (codes.length > 0) {
            const rawValue = codes[0].rawValue || '';
            setCode(rawValue);
            stopScanner();
            validate(rawValue);
            return;
          }
          scannerFrameRef.current = window.requestAnimationFrame(scanWithDetector);
        };
        scanWithDetector();
        return;
      }

      const jsQR = await loadJsQr();
      const scanWithCanvas = () => {
        if (!scannerActiveRef.current || !videoRef.current || !canvasRef.current || !streamRef.current) return;
        const video = videoRef.current;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          const canvas = canvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext('2d', { willReadFrequently: true });
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const qr = jsQR(imageData.data, imageData.width, imageData.height);
          if (qr?.data) {
            setCode(qr.data);
            stopScanner();
            validate(qr.data);
            return;
          }
        }
        scannerFrameRef.current = window.requestAnimationFrame(scanWithCanvas);
      };
      scanWithCanvas();
    } catch (_error) {
      stopScanner();
      setMessage('No se pudo leer el QR con camara. Verifica permisos de camara o pega el codigo manualmente.');
    }
  }

  useEffect(() => () => stopScanner(), []);

  useEffect(() => {
    if (!initialCode) return;
    setCode(initialCode);
    validate(initialCode);
    onInitialCodeUsed?.();
  }, [initialCode]);

  const ticket = result?.ticket;

  return (
    <section className="module-layout">
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Control de ingreso</p>
            <h3>Validar QR</h3>
          </div>
        </div>
        <form className="stack-form" onSubmit={(event) => { event.preventDefault(); validate(); }}>
          <textarea
            required
            rows="5"
            placeholder="Pega aqui el codigo, el enlace o el contenido del QR"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <p className="qr-helper">Usa la camara para escanear el QR o pega aqui el codigo MAC/enlace si necesitas validarlo manualmente.</p>
          {message && <p className={`form-message ${result?.approved === false ? 'error' : ''}`}>{message}</p>}
          <div className="row-actions">
            <button className="primary-btn" type="submit" disabled={loading}>
              <TicketCheck size={18} />
              {loading ? 'Validando...' : 'Validar ingreso'}
            </button>
            <button className="ghost-btn" type="button" onClick={scanning ? stopScanner : startScanner}>
              <QrCode size={17} />
              {scanning ? 'Detener camara' : 'Escanear con camara'}
            </button>
          </div>
          {scanning && <video className="qr-video" ref={videoRef} muted playsInline />}
          <canvas className="qr-canvas" ref={canvasRef} aria-hidden="true" />
        </form>
      </div>
      <div className={`panel glass accent-panel ${result ? (result.approved ? 'qr-approved' : 'qr-rejected') : ''}`}>
        <ShieldCheck size={34} />
        <h3>{result ? (result.approved ? 'Ingreso aprobado' : 'Ingreso rechazado') : 'Esperando lectura'}</h3>
        <p>{result ? 'Verifica la informacion antes de permitir el acceso.' : 'El QR tiene vigencia de 3 horas desde su emision.'}</p>
        {ticket && (
          <>
            <div className="metric-line"><span>Visitante</span><strong>{ticket.full_name || 'Sin nombre'}</strong></div>
            <div className="metric-line"><span>Documento</span><strong>{[ticket.document_type, ticket.document_number].filter(Boolean).join(': ') || 'Sin documento'}</strong></div>
            <div className="metric-line"><span>Codigo</span><strong>{ticket.ticket_code}</strong></div>
            <div className="metric-line"><span>Valido hasta</span><strong>{ticket.valid_until}</strong></div>
            <div className="metric-line"><span>Estado</span><strong>{ticket.status}</strong></div>
          </>
        )}
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
          <input value={searchDraft} onChange={(event) => onSearchDraft(event.target.value)} placeholder="Buscar por nombre, documento, telefono, QR, servicio, ciudad, pais o estado" />
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
              <span>{[item.ticket_code || 'Sin QR', [item.document_type, item.document_number].filter(Boolean).join(': '), item.phone, [item.city, item.country].filter(Boolean).join(', ')].filter(Boolean).join(' · ') || 'Sin datos'}</span>
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
    { label: 'Servicio mas visitado', value: data.reports.topRoom, icon: AreaChart },
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
          <RankingList title="Top servicios" items={accessReport.rankings?.rooms || []} />
        </div>
        <div className="table report-table">
          {(accessReport.accesses || []).length === 0 && <p className="empty-state">No hay accesos en el rango seleccionado.</p>}
          {(accessReport.accesses || []).slice(0, 10).map((item) => (
            <div className="table-row history-row" key={item.id}>
              <div>
                <strong>{item.full_name}</strong>
                <span>{[item.ticket_code || 'Sin QR', [item.document_type, item.document_number].filter(Boolean).join(': '), item.phone, [item.city, item.country].filter(Boolean).join(', ')].filter(Boolean).join(' · ') || 'Sin datos'}</span>
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

function UsersModule({ user }) {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState(roleOptions);
  const [draftUsers, setDraftUsers] = useState({});
  const [form, setForm] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'registrar'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState('');

  const adminHeaders = authHeaders(user);

  async function loadUsers() {
    const [usersData, profilesData] = await Promise.all([
      api('/api/auth-users', { headers: adminHeaders }),
      api('/api/role-profiles', { headers: adminHeaders })
    ]);
    setUsers(usersData.users || []);
    const profileOptions = (profilesData.profiles || []).map((profile) => ({
      value: profile.code,
      label: profile.name
    }));
    setProfiles(profileOptions.length ? profileOptions : roleOptions);
  }

  useEffect(() => {
    loadUsers().catch((err) => setMessage(err.message));
  }, []);

  useEffect(() => {
    setDraftUsers((current) => {
      const next = {};
      users.forEach((item) => {
        next[item.id] = current[item.id] || {
          firstName: item.first_name,
          lastName: item.last_name || '',
          role: item.role === 'operator' ? 'registrar' : item.role,
          isActive: item.is_active,
          password: ''
        };
      });
      return next;
    });
  }, [users]);

  function updateDraft(userId, values) {
    setDraftUsers((current) => ({
      ...current,
      [userId]: { ...(current[userId] || {}), ...values }
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const data = await api('/api/auth-users', {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify(form)
      });
      setMessage(`Usuario guardado: ${data.user.username}`);
      setForm({ username: '', password: '', firstName: '', lastName: '', role: 'registrar' });
      await loadUsers();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(item) {
    const draft = draftUsers[item.id] || {};
    setBusyId(item.id);
    setMessage('');
    try {
      const data = await api(`/api/auth-users/${item.id}`, {
        method: 'PATCH',
        headers: adminHeaders,
        body: JSON.stringify(draft)
      });
      setMessage(`Usuario actualizado: ${data.user.username}`);
      await loadUsers();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusyId('');
    }
  }

  async function deactivateUser(item) {
    const confirmed = window.confirm(`Desactivar el usuario ${item.username}?`);
    if (!confirmed) return;
    setBusyId(item.id);
    setMessage('');
    try {
      await api(`/api/auth-users/${item.id}`, { method: 'DELETE', headers: adminHeaders });
      setMessage(`Usuario desactivado: ${item.username}`);
      await loadUsers();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusyId('');
    }
  }

  return (
    <section className="module-layout">
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Privilegios</p>
            <h3>Crear usuario</h3>
          </div>
        </div>
        <form className="stack-form" onSubmit={submit}>
          <input required type="email" placeholder="Correo de acceso" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
          <input required minLength="8" type="password" placeholder="Contrasena temporal" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          <div className="form-grid">
            <input required placeholder="Nombre" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} />
            <input placeholder="Apellido" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} />
          </div>
          <select required value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
            {profiles.map((role) => <option value={role.value} key={role.value}>{role.label}</option>)}
          </select>
          {message && <p className="form-message">{message}</p>}
          <button className="primary-btn" type="submit" disabled={loading}>
            <CheckCircle2 size={18} />
            {loading ? 'Guardando...' : 'Guardar usuario'}
          </button>
        </form>
      </div>
      <div className="panel glass wide">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Control de acceso</p>
            <h3>Usuarios del sistema</h3>
          </div>
        </div>
        <div className="user-admin-list">
          {users.length === 0 && <p className="empty-state">No hay usuarios registrados.</p>}
          {users.map((item) => {
            const draft = draftUsers[item.id] || {
              firstName: item.first_name,
              lastName: item.last_name || '',
              role: item.role === 'operator' ? 'registrar' : item.role,
              isActive: item.is_active,
              password: ''
            };
            return (
              <article className="user-admin-row" key={item.id}>
                <div className="user-admin-head">
                  <div>
                    <strong>{item.username}</strong>
                    <span>{roleLabel(item.role, item.role_name)} · {item.is_active ? 'Activo' : 'Inactivo'}</span>
                  </div>
                  <mark>{item.is_active ? 'Activo' : 'Inactivo'}</mark>
                </div>
                <div className="user-edit-grid">
                  <input required value={draft.firstName} onChange={(event) => updateDraft(item.id, { firstName: event.target.value })} />
                  <input value={draft.lastName} onChange={(event) => updateDraft(item.id, { lastName: event.target.value })} />
                  <select value={draft.role} onChange={(event) => updateDraft(item.id, { role: event.target.value })}>
                    {profiles.map((role) => <option value={role.value} key={role.value}>{role.label}</option>)}
                  </select>
                  <input minLength="8" type="password" placeholder="Nueva contrasena" value={draft.password} onChange={(event) => updateDraft(item.id, { password: event.target.value })} />
                </div>
                <div className="row-actions">
                  <label className="checkline status-check">
                    <input type="checkbox" checked={Boolean(draft.isActive)} onChange={(event) => updateDraft(item.id, { isActive: event.target.checked })} />
                    Activo
                  </label>
                  <button className="primary-btn compact-btn" type="button" disabled={busyId === item.id} onClick={() => updateUser(item)}>Actualizar</button>
                  <button className="ghost-btn danger-btn" type="button" disabled={busyId === item.id || item.id === user?.id} onClick={() => deactivateUser(item)}>Desactivar</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const actionLabels = {
  access_user_initialized: 'Usuario operativo inicializado',
  auth_user_saved: 'Usuario guardado',
  auth_user_updated: 'Usuario actualizado',
  auth_user_deactivated: 'Usuario desactivado',
  login_failed: 'Login fallido',
  login_success: 'Login exitoso',
  logout: 'Cierre de sesion',
  service_saved: 'Servicio guardado',
  service_updated: 'Servicio actualizado',
  service_deactivated: 'Servicio desactivado',
  access_entry_created: 'Entrada registrada',
  qr_validation_approved: 'QR aprobado',
  qr_validation_rejected: 'QR rechazado',
  qr_validation_not_found: 'QR no encontrado'
};

function auditDetails(details = {}) {
  const values = [
    details.username,
    details.visitorName,
    details.ticketCode,
    details.name,
    details.role,
    details.documentNumber
  ].filter(Boolean);

  if (values.length > 0) return values.join(' · ');
  const keys = Object.keys(details || {});
  return keys.length ? keys.slice(0, 4).map((key) => `${key}: ${details[key]}`).join(' · ') : 'Sin detalle adicional';
}

function AuditModule({ user }) {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadLogs(nextSearch = search) {
    setLoading(true);
    setMessage('');
    try {
      const data = await api(withSearch('/api/audit-logs', nextSearch), { headers: authHeaders(user) });
      setLogs(data.logs || []);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs().catch((err) => setMessage(err.message));
  }, []);

  function submit(event) {
    event.preventDefault();
    const nextSearch = draft.trim();
    setSearch(nextSearch);
    loadLogs(nextSearch);
  }

  function clear() {
    setDraft('');
    setSearch('');
    loadLogs('');
  }

  return (
    <section className="panel glass full">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Auditoria del sistema</p>
          <h3>Actividad de usuarios</h3>
        </div>
        <button className="ghost-btn" type="button" onClick={() => loadLogs(search)} disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>
      <form className="history-toolbar" onSubmit={submit}>
        <div className="search-box history-search">
          <Search size={17} />
          <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Buscar usuario, accion, entidad, fecha o detalle" />
        </div>
        <button className="ghost-btn" type="submit">Buscar</button>
        {search && <button className="ghost-btn" type="button" onClick={clear}>Limpiar</button>}
      </form>
      {message && <p className="form-message error">{message}</p>}
      <p className="empty-state">{search ? `${logs.length} evento(s) para "${search}"` : `${logs.length} evento(s) recientes`}</p>
      <div className="table audit-table">
        {logs.length === 0 && <p className="empty-state">No hay eventos registrados.</p>}
        {logs.map((item) => (
          <div className="table-row audit-row" key={item.id}>
            <div>
              <strong>{actionLabels[item.action] || item.action}</strong>
              <span>{auditDetails(item.details)}</span>
            </div>
            <span>{item.actor_username}</span>
            <span>{item.entity_type}{item.entity_id ? ` · ${item.entity_id.slice(0, 8)}` : ''}</span>
            <span>{item.created_at}</span>
            <mark>{roleLabel(item.actor_role)}</mark>
          </div>
        ))}
      </div>
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

function qrCodeFromUrl() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('qr') || '';
}

function App() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('dashboard');
  const [pendingQrCode, setPendingQrCode] = useState(qrCodeFromUrl);
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
    if (!user || !pendingQrCode) return;
    const qrItem = navItems.find((item) => item.id === 'validar_qr');
    if (qrItem && canAccess(qrItem, user)) {
      setActive('validar_qr');
    }
  }, [user, pendingQrCode]);

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

  function consumePendingQrCode() {
    setPendingQrCode('');
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.delete('qr');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  async function logout() {
    const currentUser = user;
    if (currentUser) {
      api('/api/audit-events', {
        method: 'POST',
        headers: authHeaders(currentUser),
        body: JSON.stringify({ action: 'logout', entityType: 'session', entityId: currentUser.id })
      }).catch(() => {});
    }
    setUser(null);
    setActive('dashboard');
    setMenuOpen(false);
    setSearchDraft('');
    setSearchQuery('');
    setNotificationsOpen(false);
    setDashboard(emptyDashboard);
    setHistory([]);
    setReports({});
    setAccessReport(emptyAccessReport);
    setError('');
    setPendingQrCode('');
  }

  const notifications = useMemo(() => {
    const items = [];
    if (dashboard.rooms.length === 0) {
      items.push({ title: 'Sin servicios registrados', body: 'Crea al menos un servicio para registrar entradas.' });
    }
    if (dashboard.kpis.visitorsInside > 0) {
      items.push({ title: 'Visitantes dentro', body: `${dashboard.kpis.visitorsInside} visitante(s) permanecen en el museo.` });
    }
    if (items.length === 0) {
      items.push({ title: 'Sin alertas criticas', body: 'La operacion se encuentra estable.' });
    }
    return items;
  }, [dashboard]);

  const visibleNavItems = useMemo(() => navItems.filter((item) => canAccess(item, user)), [user]);
  const activeTitle = visibleNavItems.find((item) => item.id === active)?.label ?? 'Dashboard';

  useEffect(() => {
    if (!user) return;
    if (!visibleNavItems.some((item) => item.id === active)) {
      setActive(visibleNavItems[0]?.id || 'dashboard');
    }
  }, [user, active, visibleNavItems]);

  const content = useMemo(() => {
    const filteredRecent = dashboard.recent.filter((item) => matchesSearch(item, searchQuery));
    const filteredHistory = history.filter((item) => matchesSearch(item, searchQuery));
    const filteredDashboard = { ...dashboard, recent: filteredRecent };
    const currentItem = navItems.find((item) => item.id === active);
    if (currentItem && !canAccess(currentItem, user)) return <Dashboard data={filteredDashboard} />;
    if (active === 'entrada') return <EntryModule rooms={dashboard.rooms} user={user} onSaved={loadData} />;
    if (active === 'salas') return <RoomsModule rooms={dashboard.rooms} user={user} onSaved={loadData} />;
    if (active === 'usuarios') return <UsersModule user={user} />;
    if (active === 'validar_qr') {
      return <QrValidationModule user={user} initialCode={pendingQrCode} onInitialCodeUsed={consumePendingQrCode} />;
    }
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
    if (active === 'auditoria') return <AuditModule user={user} />;
    return <Dashboard data={filteredDashboard} />;
  }, [active, dashboard, history, reports, user, searchQuery, searchDraft, accessReport, reportRange, notifications]);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <main className="app-shell">
      <Sidebar active={active} onChange={setActive} open={menuOpen} onClose={() => setMenuOpen(false)} items={visibleNavItems} />
      <section className="content-shell">
        <Header
          active={active}
          title={activeTitle}
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
          onLogout={logout}
        />
        {error && <p className="form-message error">{error}</p>}
        {content}
        <IntegrationStatus />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
