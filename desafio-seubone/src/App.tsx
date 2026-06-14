import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import './App.css';

type Status = 'backlog' | 'doing' | 'review' | 'done';
type Priority = 'Alta' | 'Media' | 'Baixa';
type AttendanceStatus = 'No ponto' | 'Em pausa' | 'Atrasado' | 'Encerrado';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  shift: string;
  checkIn: string;
  checkOut?: string;
  attendanceStatus: AttendanceStatus;
};

type Activity = {
  id: number;
  title: string;
  customer: string;
  ownerId: string;
  dueDate: string;
  status: Status;
  priority: Priority;
  objective: string;
  estimate: number;
  blocked: boolean;
};

const team: TeamMember[] = [
  { id: 'marina', name: 'Marina Lopes', role: 'Tech Lead', shift: '08:00 - 17:00', checkIn: '07:56', attendanceStatus: 'No ponto' },
  { id: 'rafael', name: 'Rafael Nunes', role: 'Back-end', shift: '09:00 - 18:00', checkIn: '09:08', attendanceStatus: 'Atrasado' },
  { id: 'bianca', name: 'Bianca Reis', role: 'Front-end', shift: '08:00 - 17:00', checkIn: '08:01', attendanceStatus: 'No ponto' },
  { id: 'lucas', name: 'Lucas Martins', role: 'DevOps', shift: '07:00 - 16:00', checkIn: '06:58', attendanceStatus: 'No ponto' },
  { id: 'camila', name: 'Camila Torres', role: 'QA', shift: '08:00 - 17:00', checkIn: '08:00', attendanceStatus: 'Em pausa' },
  { id: 'henrique', name: 'Henrique Alves', role: 'Product Owner', shift: '09:00 - 18:00', checkIn: '08:52', attendanceStatus: 'No ponto' },
  { id: 'isabela', name: 'Isabela Rocha', role: 'UX/UI Designer', shift: '08:00 - 17:00', checkIn: '08:04', attendanceStatus: 'No ponto' },
  { id: 'matheus', name: 'Matheus Costa', role: 'Suporte N2', shift: '10:00 - 19:00', checkIn: '10:00', attendanceStatus: 'No ponto' },
  { id: 'priscila', name: 'Priscila Lima', role: 'Data Analyst', shift: '08:00 - 17:00', checkIn: '07:59', checkOut: '16:58', attendanceStatus: 'Encerrado' },
  { id: 'thiago', name: 'Thiago Barros', role: 'Analista de Seguranca', shift: '09:00 - 18:00', checkIn: '09:03', attendanceStatus: 'No ponto' },
];

const columns: { id: Status; title: string; helper: string }[] = [
  { id: 'backlog', title: 'A fazer', helper: 'Planejado para a semana' },
  { id: 'doing', title: 'Em andamento', helper: 'Limite WIP: 4 tarefas' },
  { id: 'review', title: 'Em revisao', helper: 'Aguardando validacao' },
  { id: 'done', title: 'Concluido', helper: 'Entregas da sprint' },
];

const initialActivities: Activity[] = [
  {
    id: 1,
    title: 'Criar API de autenticacao com refresh token',
    customer: 'Portal do Cliente',
    ownerId: 'rafael',
    dueDate: '2026-06-14',
    status: 'doing',
    priority: 'Alta',
    objective: 'Aumentar seguranca no acesso',
    estimate: 6,
    blocked: false,
  },
  {
    id: 2,
    title: 'Validar deploy azul-verde em homologacao',
    customer: 'Infraestrutura',
    ownerId: 'lucas',
    dueDate: '2026-06-15',
    status: 'review',
    priority: 'Alta',
    objective: 'Reduzir indisponibilidade em releases',
    estimate: 4,
    blocked: true,
  },
  {
    id: 3,
    title: 'Refatorar tela de chamados do service desk',
    customer: 'Atendimento interno',
    ownerId: 'bianca',
    dueDate: '2026-06-18',
    status: 'backlog',
    priority: 'Media',
    objective: 'Diminuir tempo de triagem',
    estimate: 8,
    blocked: false,
  },
  {
    id: 4,
    title: 'Corrigir falha no relatorio de SLA',
    customer: 'Operacoes de TI',
    ownerId: 'priscila',
    dueDate: '2026-06-13',
    status: 'doing',
    priority: 'Alta',
    objective: 'Dar confiabilidade aos indicadores',
    estimate: 5,
    blocked: false,
  },
  {
    id: 5,
    title: 'Publicar dashboard semanal de incidentes',
    customer: 'Diretoria de TI',
    ownerId: 'henrique',
    dueDate: '2026-06-14',
    status: 'done',
    priority: 'Media',
    objective: 'Dar visibilidade para decisoes tecnicas',
    estimate: 3,
    blocked: false,
  },
  {
    id: 6,
    title: 'Escrever testes automatizados do checkout',
    customer: 'E-commerce B2B',
    ownerId: 'camila',
    dueDate: '2026-06-20',
    status: 'backlog',
    priority: 'Baixa',
    objective: 'Reduzir regressao em producao',
    estimate: 7,
    blocked: false,
  },
  {
    id: 7,
    title: 'Revisar prototipo do app mobile interno',
    customer: 'RH Tech',
    ownerId: 'isabela',
    dueDate: '2026-06-17',
    status: 'doing',
    priority: 'Media',
    objective: 'Melhorar adesao dos colaboradores',
    estimate: 6,
    blocked: true,
  },
  {
    id: 8,
    title: 'Auditar permissoes de acesso ao banco',
    customer: 'Seguranca da Informacao',
    ownerId: 'thiago',
    dueDate: '2026-06-19',
    status: 'backlog',
    priority: 'Alta',
    objective: 'Reduzir risco de acesso indevido',
    estimate: 5,
    blocked: false,
  },
  {
    id: 9,
    title: 'Organizar fila de chamados criticos',
    customer: 'Service Desk',
    ownerId: 'matheus',
    dueDate: '2026-06-16',
    status: 'doing',
    priority: 'Alta',
    objective: 'Atacar incidentes com maior impacto',
    estimate: 4,
    blocked: false,
  },
  {
    id: 10,
    title: 'Planejar sprint tecnica da squad',
    customer: 'Squad Plataforma',
    ownerId: 'marina',
    dueDate: '2026-06-15',
    status: 'review',
    priority: 'Media',
    objective: 'Alinhar capacidade e prioridades',
    estimate: 3,
    blocked: false,
  },
];

const today = new Date('2026-06-14T12:00:00');

function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(`${date}T12:00:00`));
}

function getOwner(ownerId: string) {
  return team.find((member) => member.id === ownerId) ?? team[0];
}

function daysUntilDue(date: string) {
  const dueDate = new Date(`${date}T12:00:00`);
  return Math.ceil((dueDate.getTime() - today.getTime()) / 86_400_000);
}

function getAttendanceClass(status: AttendanceStatus) {
  return status.toLowerCase().replaceAll(' ', '-');
}

function App() {
  const [activities, setActivities] = useState(initialActivities);
  const [ownerFilter, setOwnerFilter] = useState('todos');
  const [priorityFilter, setPriorityFilter] = useState('todas');

  const visibleActivities = useMemo(
    () =>
      activities.filter((activity) => {
        const matchesOwner = ownerFilter === 'todos' || activity.ownerId === ownerFilter;
        const matchesPriority = priorityFilter === 'todas' || activity.priority === priorityFilter;
        return matchesOwner && matchesPriority;
      }),
    [activities, ownerFilter, priorityFilter],
  );

  const metrics = useMemo(() => {
    const activeActivities = activities.filter((activity) => activity.status !== 'done');
    const overdue = activeActivities.filter((activity) => daysUntilDue(activity.dueDate) < 0).length;
    const dueSoon = activeActivities.filter((activity) => {
      const days = daysUntilDue(activity.dueDate);
      return days >= 0 && days <= 2;
    }).length;
    const wip = activities.filter((activity) => activity.status === 'doing').length;
    const completed = activities.filter((activity) => activity.status === 'done').length;
    const blocked = activeActivities.filter((activity) => activity.blocked).length;
    const deliveryRate = Math.round((completed / activities.length) * 100);
    const onClock = team.filter((member) => member.attendanceStatus === 'No ponto').length;
    const latePunches = team.filter((member) => member.attendanceStatus === 'Atrasado').length;
    const workload = team.map((member) => ({
      ...member,
      total: activeActivities.filter((activity) => activity.ownerId === member.id).length,
    }));
    const busiest = workload.reduce((current, member) => (member.total > current.total ? member : current), workload[0]);

    return { overdue, dueSoon, wip, blocked, deliveryRate, busiest, workload, onClock, latePunches };
  }, [activities]);

  function moveActivity(activityId: number, direction: -1 | 1) {
    setActivities((currentActivities) =>
      currentActivities.map((activity) => {
        if (activity.id !== activityId) return activity;
        const currentIndex = columns.findIndex((column) => column.id === activity.status);
        const nextColumn = columns[currentIndex + direction];
        return nextColumn ? { ...activity, status: nextColumn.id } : activity;
      }),
    );
  }

  function toggleBlocked(activityId: number) {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === activityId ? { ...activity, blocked: !activity.blocked } : activity,
      ),
    );
  }

  function handleCreateActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newActivity: Activity = {
      id: Date.now(),
      title: String(formData.get('title')),
      customer: String(formData.get('customer')),
      ownerId: String(formData.get('ownerId')),
      dueDate: String(formData.get('dueDate')),
      status: 'backlog',
      priority: String(formData.get('priority')) as Priority,
      objective: String(formData.get('objective')),
      estimate: Number(formData.get('estimate')),
      blocked: false,
    };

    setActivities((currentActivities) => [newActivity, ...currentActivities]);
    event.currentTarget.reset();
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Quatro5 Board</span>
          <h1>Gestao de atividades do time</h1>
          <p>
            Kanban para uma empresa de TI, com prazos, carga do time, bloqueios e ponto dos
            colaboradores em uma unica visao operacional.
          </p>
        </div>

        <div className="sprint-card">
          <span>Sprint atual</span>
          <strong>10 a 21 jun</strong>
          <small>{activities.length} atividades e {team.length} pessoas monitoradas</small>
        </div>
      </header>

      <section className="metrics-grid" aria-label="Indicadores do time">
        <article className="metric-card danger">
          <span>Prazo estourado</span>
          <strong>{metrics.overdue}</strong>
          <small>{metrics.dueSoon} vencem em ate 2 dias</small>
        </article>
        <article className="metric-card">
          <span>Em andamento</span>
          <strong>{metrics.wip}/4</strong>
          <small>{metrics.wip > 4 ? 'Acima do limite WIP' : 'Dentro do limite WIP'}</small>
        </article>
        <article className="metric-card">
          <span>Entrega da sprint</span>
          <strong>{metrics.deliveryRate}%</strong>
          <small>Concluidas sobre total</small>
        </article>
        <article className="metric-card warning">
          <span>Bloqueios ativos</span>
          <strong>{metrics.blocked}</strong>
          <small>Maior carga: {metrics.busiest.name}</small>
        </article>
        <article className="metric-card">
          <span>No ponto agora</span>
          <strong>{metrics.onClock}/{team.length}</strong>
          <small>{metrics.latePunches} registro com atraso</small>
        </article>
      </section>

      <section className="controls-panel">
        <div className="filters">
          <label>
            Responsavel
            <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}>
              <option value="todos">Todos</option>
              {team.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Prioridade
            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
              <option value="todas">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baixa">Baixa</option>
            </select>
          </label>
        </div>

        <form className="activity-form" onSubmit={handleCreateActivity}>
          <input name="title" placeholder="Nova atividade" required />
          <input name="customer" placeholder="Cliente ou area" required />
          <select name="ownerId" defaultValue="marina" aria-label="Responsavel">
            {team.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
          <select name="priority" defaultValue="Media" aria-label="Prioridade">
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baixa">Baixa</option>
          </select>
          <input name="dueDate" type="date" defaultValue="2026-06-19" required />
          <input name="estimate" type="number" min="1" max="40" defaultValue="4" aria-label="Horas estimadas" />
          <input name="objective" placeholder="Objetivo conectado" required />
          <button type="submit">Adicionar</button>
        </form>
      </section>

      <section className="time-clock-panel" aria-label="Ponto dos funcionarios">
        <header>
          <div>
            <span className="panel-kicker">Ponto dos funcionarios</span>
            <h2>Controle de jornada da equipe de TI</h2>
          </div>
          <button type="button">Marcar ponto</button>
        </header>

        <div className="time-clock-grid">
          {team.map((member) => (
            <article className="time-clock-card" key={member.id}>
              <div className="avatar">{member.name.slice(0, 2)}</div>
              <div>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </div>
              <div className={`attendance-badge attendance-${getAttendanceClass(member.attendanceStatus)}`}>
                {member.attendanceStatus}
              </div>
              <dl>
                <div>
                  <dt>Entrada</dt>
                  <dd>{member.checkIn}</dd>
                </div>
                <div>
                  <dt>Saida</dt>
                  <dd>{member.checkOut ?? '--:--'}</dd>
                </div>
                <div>
                  <dt>Jornada</dt>
                  <dd>{member.shift}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="workload-panel" aria-label="Carga por pessoa">
        {metrics.workload.map((member) => (
          <div className="workload-item" key={member.id}>
            <div>
              <strong>{member.name}</strong>
              <span>{member.role}</span>
            </div>
            <div className="workload-bar" aria-label={`${member.total} atividades ativas`}>
              <span style={{ width: `${Math.min(member.total * 28, 100)}%` }} />
            </div>
            <em>{member.total}</em>
          </div>
        ))}
      </section>

      <section className="board" aria-label="Quadro Kanban">
        {columns.map((column) => {
          const columnActivities = visibleActivities.filter((activity) => activity.status === column.id);

          return (
            <div className="kanban-column" key={column.id}>
              <header>
                <div>
                  <h2>{column.title}</h2>
                  <p>{column.helper}</p>
                </div>
                <span>{columnActivities.length}</span>
              </header>

              <div className="cards-stack">
                {columnActivities.map((activity) => {
                  const owner = getOwner(activity.ownerId);
                  const dueDistance = daysUntilDue(activity.dueDate);
                  const isLate = dueDistance < 0 && activity.status !== 'done';

                  return (
                    <article className={`task-card ${isLate ? 'late' : ''}`} key={activity.id}>
                      <div className="card-topline">
                        <span className={`priority priority-${activity.priority.toLowerCase()}`}>
                          {activity.priority}
                        </span>
                        {activity.blocked && <span className="blocked">Bloqueada</span>}
                      </div>
                      <h3>{activity.title}</h3>
                      <p>{activity.objective}</p>
                      <dl>
                        <div>
                          <dt>Cliente</dt>
                          <dd>{activity.customer}</dd>
                        </div>
                        <div>
                          <dt>Prazo</dt>
                          <dd>{formatDate(activity.dueDate)}</dd>
                        </div>
                        <div>
                          <dt>Esforco</dt>
                          <dd>{activity.estimate}h</dd>
                        </div>
                      </dl>
                      <footer>
                        <div className="avatar" aria-label={`Responsavel ${owner.name}`}>
                          {owner.name.slice(0, 2)}
                        </div>
                        <span>{owner.name}</span>
                        <div className="card-actions">
                          <button
                            type="button"
                            onClick={() => moveActivity(activity.id, -1)}
                            disabled={activity.status === 'backlog'}
                            aria-label="Mover para coluna anterior"
                          >
                            &lt;
                          </button>
                          <button type="button" onClick={() => toggleBlocked(activity.id)}>
                            {activity.blocked ? 'Liberar' : 'Bloquear'}
                          </button>
                          <button
                            type="button"
                            onClick={() => moveActivity(activity.id, 1)}
                            disabled={activity.status === 'done'}
                            aria-label="Mover para proxima coluna"
                          >
                            &gt;
                          </button>
                        </div>
                      </footer>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
