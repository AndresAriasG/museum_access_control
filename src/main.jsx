import React, { useEffect, useMemo, useState } from 'react';
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
  { id: 'salas', label: 'Salas', icon: Gauge },
  { id: 'qr', label: 'Validar QR', icon: QrCode },
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

function matchesSearch(item, query) {
  if (!query.trim()) return true;
  const value = query.toLowerCase();
  return [
    item.full_name,
    item.visitor_type,
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
  const headers = ['Nombre', 'Tipo', 'Sala', 'Fecha/Hora', 'Estado', 'QR', 'Ciudad', 'Pais', 'Validado por'];
  const escape = (value) => `"${String(value || '').replace(/"/g, '""')}"`;
  const csv = [
    headers.join(','),
    ...rows.map((row) => [
      row.full_name,
      row.visitor_type,
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
          <span><Database size={15} /> PostgreSQL conectado</span>
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
          <strong>Datos en vivo</strong>
          <span>Login, entradas, QR, historial y reportes usan PostgreSQL.</span>
        </div>
      </aside>
      <button className={`scrim ${open ? 'is-visible' : ''}`} onClick={onClose} aria-label="Cerrar menu" />
    </>
  );
}

function Header({ active, onMenu, user, searchQuery, onSearch }) {
  const title = navItems.find((item) => item.id === active)?.label ?? 'Dashboard';
  return (
    <header className="topbar glass">
      <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Abrir menu"><Menu size={21} /></button>
      <div>
        <p className="eyebrow">Panel administrativo</p>
        <h2>{title}</h2>
      </div>
      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />
          <input value={searchQuery} onChange={(event) => onSearch(event.target.value)} placeholder="Buscar visitante, sala o QR" />
        </div>
        <span className="user-chip">{user?.first_name || 'Usuario'}</span>
        <button className="icon-btn" aria-label="Notificaciones"><Bell size={19} /></button>
      </div>
    </header>
  );
}

function VisitorTable({ visitors = [], wide = true }) {
  return (
    <section className={`panel glass ${wide ? 'wide' : 'full'}`}>
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
              <span>{visitor.visitor_type} · {[visitor.city, visitor.country].filter(Boolean).join(', ') || 'Sin origen'}</span>
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
    { label: 'Visitantes hoy', value: data.kpis.visitorsToday, delta: 'Desde PostgreSQL', icon: UsersRound, tone: 'cyan' },
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
      <section className="panel glass wide">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Flujo en tiempo real</p>
            <h3>Accesos por hora</h3>
          </div>
        </div>
        <div className="chart-bars" aria-label="Grafico de accesos">
          {data.hourly.map((item) => (
            <div className="bar-wrap" key={item.label} title={`${item.label}: ${item.value}`}>
              <span style={{ height: `${Math.max(8, (Number(item.value) / max) * 100)}%` }} />
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
            <p className="eyebrow">Tendencia semanal</p>
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
    country: 'Colombia',
    city: '',
    roomId: rooms[0]?.id || ''
  });
  const [message, setMessage] = useState('');
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
      setForm({
        fullName: '',
        documentNumber: '',
        visitorType: 'General',
        email: '',
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
          <input required placeholder="Nombre completo" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
          <select required value={form.visitorType} onChange={(event) => setForm({ ...form, visitorType: event.target.value })}>
            <option>General</option>
            <option>VIP</option>
            <option>Estudiante</option>
            <option>Grupo</option>
          </select>
          <input required placeholder="Documento / ID" value={form.documentNumber} onChange={(event) => setForm({ ...form, documentNumber: event.target.value })} />
          <input required type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
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
        </form>
      </div>
      <div className="panel glass accent-panel">
        <CalendarDays size={34} />
        <h3>Turno actual</h3>
        <p>Control de capacidad, horario de visita y trazabilidad de entrada conectado a PostgreSQL.</p>
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

function QrModule() {
  const [ticketCode, setTicketCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function validate() {
    setError('');
    setResult(null);
    try {
      const data = await api('/api/qr/validate', {
        method: 'POST',
        body: JSON.stringify({ ticketCode })
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="module-layout">
      <div className="scanner-card glass">
        <div className="scan-frame">
          <ScanLine size={88} />
          <span />
        </div>
        <h3>Validar QR</h3>
        <p>Ingresa el codigo del ticket generado al registrar una entrada.</p>
        <input placeholder="MAC-XXXXXXXX" value={ticketCode} onChange={(event) => setTicketCode(event.target.value.toUpperCase())} />
        <button className="primary-btn" type="button" onClick={validate}>
          <QrCode size={18} />
          Validar codigo
        </button>
      </div>
      <div className="panel glass">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Resultado</p>
            <h3>{result?.ticket?.ticket_code || 'Sin ticket seleccionado'}</h3>
          </div>
          {result && <mark>{result.approved ? 'Aprobado' : 'Rechazado'}</mark>}
        </div>
        {error && <p className="form-message error">{error}</p>}
        {result && (
          <div className="detail-list">
            <div><span>Visitante</span><strong>{result.ticket.full_name || 'Sin visitante'}</strong></div>
            <div><span>Tipo</span><strong>{result.ticket.visitor_type || 'N/A'}</strong></div>
            <div><span>Origen</span><strong>{[result.ticket.city, result.ticket.country].filter(Boolean).join(', ') || 'N/A'}</strong></div>
            <div><span>Valido hasta</span><strong>{new Date(result.ticket.valid_until).toLocaleString()}</strong></div>
            <div><span>Firma</span><strong>{result.ticket.signature || 'N/A'}</strong></div>
          </div>
        )}
      </div>
    </section>
  );
}

function HistoryModule({ history, searchQuery }) {
  return (
    <section className="panel glass full">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Auditoria</p>
          <h3>Historial de accesos</h3>
        </div>
        <button className="ghost-btn" type="button" onClick={() => exportCsv(history)}>
          Exportar CSV
        </button>
      </div>
      {searchQuery && <p className="empty-state">Filtro activo: {searchQuery}</p>}
      <div className="table">
        {history.length === 0 && <p className="empty-state">No hay registros que coincidan con la busqueda.</p>}
        {history.map((item) => (
          <div className="table-row history-row" key={item.id}>
            <div>
              <strong>{item.full_name}</strong>
              <span>{item.ticket_code || 'Sin QR'} · {[item.city, item.country].filter(Boolean).join(', ') || 'Sin origen'}</span>
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

function ReportsModule({ data, reports }) {
  const cards = [
    { label: 'Pico de acceso', value: data.reports.peakAccess, icon: Clock3 },
    { label: 'Sala mas visitada', value: data.reports.topRoom, icon: AreaChart },
    { label: 'Origen principal', value: data.reports.topOrigin, icon: UsersRound }
  ];

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
            <h3>Resumen conectado a PostgreSQL</h3>
          </div>
        </div>
        <div className="insight-grid">
          <div><strong>{reports.total_entries || 0}</strong><span>Entradas totales</span></div>
          <div><strong>{reports.countries_count || 0}</strong><span>Paises registrados</span></div>
          <div><strong>{reports.cities_count || 0}</strong><span>Ciudades registradas</span></div>
        </div>
      </section>
    </section>
  );
}

function IntegrationStatus() {
  return (
    <div className="integration-card glass">
      <span><Database size={16} /> PostgreSQL live</span>
      <span><Railway size={16} /> Railway env vars</span>
      <span><ShieldCheck size={16} /> API conectada</span>
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

function App() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [history, setHistory] = useState([]);
  const [reports, setReports] = useState({});
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  async function loadData() {
    setError('');
    try {
      const [dashboardData, historyData, reportData] = await Promise.all([
        api('/api/dashboard'),
        api('/api/history'),
        api('/api/reports')
      ]);
      setDashboard(dashboardData);
      setHistory(historyData.history || []);
      setReports(reportData.reports || {});
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const content = useMemo(() => {
    const filteredRecent = dashboard.recent.filter((item) => matchesSearch(item, searchQuery));
    const filteredHistory = history.filter((item) => matchesSearch(item, searchQuery));
    const filteredDashboard = { ...dashboard, recent: filteredRecent };
    if (active === 'entrada') return <EntryModule rooms={dashboard.rooms} user={user} onSaved={loadData} />;
    if (active === 'salas') return <RoomsModule rooms={dashboard.rooms} onSaved={loadData} />;
    if (active === 'qr') return <QrModule />;
    if (active === 'historial') return <HistoryModule history={filteredHistory} searchQuery={searchQuery} />;
    if (active === 'reportes') return <ReportsModule data={dashboard} reports={reports} />;
    return <Dashboard data={filteredDashboard} />;
  }, [active, dashboard, history, reports, user, searchQuery]);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <main className="app-shell">
      <Sidebar active={active} onChange={setActive} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <section className="content-shell">
        <Header active={active} onMenu={() => setMenuOpen(true)} user={user} searchQuery={searchQuery} onSearch={setSearchQuery} />
        {error && <p className="form-message error">{error}</p>}
        {content}
        <IntegrationStatus />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
